import express from "express";
import cors from "cors";
import * as router from "./routes/index";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/reports", router.routerReport);
app.use("/account", router.accountRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
