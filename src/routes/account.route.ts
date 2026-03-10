import { Router, Request, Response } from "express";
const account = require("../../data/account.json");

const accountRoute = Router();

accountRoute.post("/", (req: Request, res: Response) => {
    res.json(account);
});

export default accountRoute;
