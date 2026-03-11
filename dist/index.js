"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router = __importStar(require("./routes/index"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const binance_service_1 = require("./services/binance.service");
const app = (0, express_1.default)();
const PORT = 3000;
const service = new binance_service_1.BinanceService();
// Crear carpeta uploads si no existe
const uploadDir = path_1.default.join(__dirname, "../uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Crear servidor HTTP a partir de Express
const server = http_1.default.createServer(app);
// Inicializar Socket.IO
const io = new socket_io_1.Server(server, {
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
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const buyData = yield service.getBinance("BUY", "BOB");
            const sellData = yield service.getBinance("SELL", "BOB");
            // Emitir a todos los clientes conectados
            io.emit("binancePrices", { buy: buyData, sell: sellData });
        }
        catch (error) {
            console.error("Error consultando Binance:", error);
        }
    }), 2000);
});
// Middleware para devolver 404 en todas las rutas
app.use((req, res) => {
    res.status(404).send("Página no disponible temporalmente");
});
// Ruta principal que envía el index.html
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/index.html"));    
// });
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/uploads", express_1.default.static(uploadDir));
// Rutas
app.use("/report", router.routerReport);
app.use("/account", router.accountRouter);
app.use("/upload", router.uploadRouter);
app.use("/file", router.fileRouter);
app.use("/binance", router.binanceRouter);
// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
