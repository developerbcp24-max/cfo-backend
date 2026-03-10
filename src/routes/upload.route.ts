import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";

const uploadRoute = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads")); // carpeta donde se guardan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });


uploadRoute.post("/", upload.array("file"), (req: Request, res: Response) => {

    res.json({ message: "Archivos subidos correctamente", files: req.files });

});

export default uploadRoute;
