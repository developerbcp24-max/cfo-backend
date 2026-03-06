"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account = require("../../data/account.json");
const accountRouter = (0, express_1.Router)();
accountRouter.post("/", (req, res) => {
    res.json(account);
});
exports.default = accountRouter;
