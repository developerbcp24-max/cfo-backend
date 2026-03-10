import express from "express";
import cors from "cors";
import * as router from "./routes/index";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

// Crear carpeta uploads si no existe
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());

// Ruta principal que envía el index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.use("/uploads", express.static(uploadDir));

// Rutas
app.use("/report", router.routerReport);
app.use("/account", router.accountRouter);
app.use("/upload", router.uploadRouter);
app.use("/file", router.fileRouter);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
