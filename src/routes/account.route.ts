import { Router, Request, Response } from "express";
const account = require("../../data/account.json");

const accountRouter = Router();

accountRouter.post("/", (req: Request, res: Response) => {
    res.json(account);
});

export default accountRouter;
