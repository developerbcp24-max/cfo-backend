"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = exports.routerReport = void 0;
const reports_routes_1 = __importDefault(require("./reports.routes"));
exports.routerReport = reports_routes_1.default;
const account_route_1 = __importDefault(require("./account.route"));
exports.accountRouter = account_route_1.default;
