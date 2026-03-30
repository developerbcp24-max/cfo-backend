import { Router, Request, Response } from "express";
import { BinanceService } from "../services/binance.service";
import { AppDataSource } from "../db/data-source";
import { BinancePrice } from "../models/binancePrice.model";
import { Between } from "typeorm";

const binanceRoute = Router();
const service = new BinanceService();


binanceRoute.get("/:type", async (req: Request<{ type: string }>, res: Response) => {
    const tradeType = req.params.type.toUpperCase() as "BUY" | "SELL";
    const data = await service.getBinance(tradeType, "BOB");
    res.json(data);
});

binanceRoute.get("/stats/:type", async (req, res) => {
    const tradeType = req.params.type.toUpperCase() as "BUY" | "SELL";

    const repo = AppDataSource.getRepository(BinancePrice);
    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    const prices = await repo.find({
        where: {
            tradeType,
            timestamp: Between(lastWeek, now),
        },
        order: { timestamp: "ASC" },
    });

    const valores = prices.map(p => Number(p.precio));

    const promedio3 = movingAverage(valores, 3);
    const promedio4 = movingAverage(valores, 4);
    const max = Math.max(...valores);
    const min = Math.min(...valores);
    const volatilidad = standardDeviation(valores);

    res.json({
        fechas: prices.map(p => p.timestamp),
        valores,
        promedio3,
        promedio4,
        max,
        min,
        volatilidad
    });

});


export default binanceRoute;

function movingAverage(data: number[], windowSize: number): (number | null)[] {
    return data.map((_, idx, arr) => {
        if (idx < windowSize) return null;
        const slice = arr.slice(idx - windowSize, idx);
        const sum = slice.reduce((a, b) => a + b, 0);
        return sum / windowSize;
    });
}

function standardDeviation(data: number[]): number {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
}


