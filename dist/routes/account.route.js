"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account = require("../../data/account.json");
const accountRoute = (0, express_1.Router)();
accountRoute.post("/", (req, res) => {
    res.json(account);
});
exports.default = accountRoute;
