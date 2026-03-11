import { Router, Request, Response } from "express";
import { BinanceService } from "../services/binance.service";

const binanceRoute = Router();
const service = new BinanceService();


binanceRoute.get("/:type", async (req: Request<{ type: string }>, res: Response) => {
    const tradeType = req.params.type.toUpperCase() as "BUY" | "SELL";
    const data = await service.getBinance(tradeType, "BOB");
    res.json(data);
});


export default binanceRoute;
