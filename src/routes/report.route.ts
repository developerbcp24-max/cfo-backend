import { Router, Request, Response } from "express";
import { ReportClass } from "../models/report.model";
import { normalizeDate, formatDate } from "../utils/date.utils";

const reports = require("../../data/reports.json");

const reportRoute = Router();

reportRoute.post("/", (req: Request, res: Response) => {
    const { startDate, endDate } = req.body;

    const start = normalizeDate(startDate);
    const end = normalizeDate(endDate);

    const parsed = reports.map((r: any) => ({
        ...r,
        fecha: normalizeDate(r.fecha)
    }));

    const filtered = parsed.filter((r: ReportClass) =>
        r.fecha >= start && r.fecha <= end
    ).map((r: ReportClass) => ({
        ...r,
        fecha: formatDate(r.fecha)
    }));

    console.log(`${filtered.length} registros encontrados.`);
    res.json(filtered);
});

export default reportRoute;
