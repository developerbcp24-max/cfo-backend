"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileRoute = (0, express_1.Router)();
fileRoute.get("/", (req, res) => {
    const dirPath = path_1.default.join(__dirname, "../../uploads");
    fs_1.default.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo leer la carpeta uploads" });
        }
        // Generar URLs de descarga
        const fileList = files.map((f) => ({
            name: f,
            url: `/uploads/${f}`,
        }));
        res.json(fileList);
    });
});
exports.default = fileRoute;
