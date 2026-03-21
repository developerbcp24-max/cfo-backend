import express from "express";
import cors from "cors";
import * as router from "./routes/index";
import path from "path";
import fs from "fs";
import { Server } from "socket.io";
import http from "http"
import { BinanceService } from "./services/binance.service";

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
            // Emitir a todos los clientes conectados
            io.emit("binancePrices", { buy: buyData, sell: sellData });
        } catch (error) {
            console.error("Error consultando Binance:", error);
        }
    }, 3000);
});


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

server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});



