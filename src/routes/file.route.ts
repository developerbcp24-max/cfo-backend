import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";

const fileRoute = Router();
const uploadDir = path.join(__dirname, "../../uploads");


fileRoute.get("/", (req, res) => {

    const dirPath = path.join(uploadDir);

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


// Ruta para borrar archivo
fileRoute.delete("/:filename", (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).json({ error: "Archivo no encontrado" });
        }
        res.json({ message: "Archivo eliminado correctamente" });
    });
});

export default fileRoute;
