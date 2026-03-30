import express from "express";
import cors from "cors";
import * as router from "./routes/index";
import path from "path";
import fs from "fs";
import { Server } from "socket.io";
import http from "http"
import { BinanceService } from "./services/binance.service";
import dotenv from 'dotenv';

// reutilizas tu repositorio de TypeORM
import { AppDataSource } from "../src/db/data-source";
import { BinancePrice } from "../src/models/binancePrice.model";
import { Between } from "typeorm";

// Detecta si estás en desarrollo o producción
const envFile = process.env.NODE_ENV === "production" ? "env.prod" : "env.dev";
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.PORT || 3000;
const service = new BinanceService();


// Crear carpeta uploads si no existe
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());
// Crear servidor HTTP a partir de Express
const server = http.createServer(app);
// Inicializar Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // permitir conexiones desde cualquier origen
    },
});
// Escuchar conexiones de clientes
// io.on("connection", (socket) => {
//     console.log("Cliente conectado:", socket.id);
// });

io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Cada 10 segundos consultamos Binance y emitimos precios
    setInterval(async () => {
        try {
            const buyData = await service.getBinance("BUY", "BOB");
            const sellData = await service.getBinance("SELL", "BOB");

            // Emitir precios en tiempo real
            io.emit("binancePrices", { buy: buyData, sell: sellData });

            // Calcular estadísticas con datos históricos de la base
            const buyHistory = await getWeeklyPrices("BUY");
            const sellHistory = await getWeeklyPrices("SELL");

            // const valoresBuy = buyHistory.map(p => Number(p.precio));
            // const valoresSell = sellHistory.map(p => Number(p.precio));

            // const statsBuy = {
            //     type: "BUY",
            //     fechas: buyHistory.map(p => p.timestamp),
            //     valores: valoresBuy,
            //     promedio3: movingAverage(valoresBuy, 3),
            //     promedio4: movingAverage(valoresBuy, 4),
            //     max: Math.max(...valoresBuy),
            //     min: Math.min(...valoresBuy),
            //     volatilidad: standardDeviation(valoresBuy),
            // };

            // const statsSell = {
            //     type: "SELL",
            //     fechas: sellHistory.map(p => p.timestamp),
            //     valores: valoresSell,
            //     promedio3: movingAverage(valoresSell, 3),
            //     promedio4: movingAverage(valoresSell, 4),
            //     max: Math.max(...valoresSell),
            //     min: Math.min(...valoresSell),
            //     volatilidad: standardDeviation(valoresSell),
            // };

            // Emitir estadísticas en tiempo real
            // io.emit("binanceStats", statsBuy);
            // io.emit("binanceStats", statsSell);

        } catch (error) {
            console.error("Error consultando Binance:", error);
        }
    }, 3000);
});

export function movingAverage(data: number[], windowSize: number): (number | null)[] {
    return data.map((_, idx, arr) => {
        if (idx < windowSize) return null;
        const slice = arr.slice(idx - windowSize, idx);
        const sum = slice.reduce((a, b) => a + b, 0);
        return sum / windowSize;
    });
}

export function standardDeviation(data: number[]): number {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
}

export async function getWeeklyPrices(tradeType: "BUY" | "SELL") {
    const repo = AppDataSource.getRepository(BinancePrice);
    const now = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(now.getDate() - 7);

    return await repo.find({
        where: { tradeType, timestamp: Between(lastWeek, now) },
        order: { timestamp: "ASC" },
    });
}



// Middleware para devolver 404 en todas las rutas
// app.use((req, res) => {
//   res.status(404).send("Página no disponible temporalmente");
// });

// Ruta principal que envía el index.html
app.use(express.static(path.join(__dirname, "../public")));

app.use("/uploads", express.static(uploadDir));

// Rutas
app.use("/report", router.routerReport);
app.use("/account", router.accountRouter);
app.use("/upload", router.uploadRouter);
app.use("/file", router.fileRouter);
app.use("/binance", router.binanceRouter);

AppDataSource.initialize()
    .then(() => {
        console.log("Conectado a MySQL con TypeORM");
    })
    .catch((error) => console.log(error));

server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

