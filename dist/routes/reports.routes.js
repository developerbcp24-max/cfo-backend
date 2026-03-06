"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const date_utils_1 = require("../utils/date.utils");
const reports = require("../../data/reports.json");
const routerReport = (0, express_1.Router)();
routerReport.post("/", (req, res) => {
    const { startDate, endDate } = req.body;
    const start = (0, date_utils_1.normalizeDate)(startDate);
    const end = (0, date_utils_1.normalizeDate)(endDate);
    const parsed = reports.map((r) => ({
        ...r,
        fecha: (0, date_utils_1.normalizeDate)(r.fecha)
    }));
    const filtered = parsed.filter((r) => r.fecha >= start && r.fecha <= end).map((r) => ({
        ...r,
        fecha: (0, date_utils_1.formatDate)(r.fecha)
    }));
    console.log(`${filtered.length} registros encontrados.`);
    res.json(filtered);
});
exports.default = routerReport;
