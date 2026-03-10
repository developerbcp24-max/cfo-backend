import express from "express";
import cors from "cors";
import * as router from "./routes/index";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta principal que envía el index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas
app.use("/report", router.routerReport);
app.use("/account", router.accountRouter);
app.use("/upload", router.uploadRouter);
app.use("/file", router.fileRouter);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
