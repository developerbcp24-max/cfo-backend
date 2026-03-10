import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const fileRoute = Router();

fileRoute.get("/", (req, res) => {
    
    const dirPath = path.join(__dirname, "../../uploads");

    fs.readdir(dirPath, (err, files) => {
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

export default fileRoute;
