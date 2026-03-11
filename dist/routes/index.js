"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.binanceRouter = exports.fileRouter = exports.uploadRouter = exports.accountRouter = exports.routerReport = void 0;
const report_route_1 = __importDefault(require("./report.route"));
exports.routerReport = report_route_1.default;
const account_route_1 = __importDefault(require("./account.route"));
exports.accountRouter = account_route_1.default;
const upload_route_1 = __importDefault(require("./upload.route"));
exports.uploadRouter = upload_route_1.default;
const file_route_1 = __importDefault(require("./file.route"));
exports.fileRouter = file_route_1.default;
const binance_route_1 = __importDefault(require("./binance.route"));
exports.binanceRouter = binance_route_1.default;
