"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const date_utils_1 = require("../utils/date.utils");
const reports = require("../../data/reports.json");
const reportRoute = (0, express_1.Router)();
reportRoute.post("/", (req, res) => {
    const { startDate, endDate } = req.body;
    const start = (0, date_utils_1.normalizeDate)(startDate);
    const end = (0, date_utils_1.normalizeDate)(endDate);
    const parsed = reports.map((r) => (Object.assign(Object.assign({}, r), { date: (0, date_utils_1.normalizeDate)(r.date) })));
    const filtered = parsed.filter((r) => r.date >= start && r.date <= end).map((r) => (Object.assign(Object.assign({}, r), { fecha: (0, date_utils_1.formatDate)(r.date) })));
    console.log(`${filtered.length} registros encontrados.`);
    res.json(filtered);
});
exports.default = reportRoute;
