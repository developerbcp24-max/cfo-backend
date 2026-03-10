"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fileRoute = (0, express_1.Router)();
const uploadDir = path_1.default.join(__dirname, "../../uploads");
fileRoute.get("/", (req, res) => {
    const dirPath = path_1.default.join(uploadDir);
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
// Ruta para borrar archivo
fileRoute.delete("/:filename", (req, res) => {
    const filePath = path_1.default.join(uploadDir, req.params.filename);
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).json({ error: "Archivo no encontrado" });
        }
        res.json({ message: "Archivo eliminado correctamente" });
    });
});
exports.default = fileRoute;
