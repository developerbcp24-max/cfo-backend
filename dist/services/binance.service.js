"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceService = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const binace_model_1 = require("../models/binace.model");
const agent = new https_1.default.Agent({
    rejectUnauthorized: false, // ⚠️ ignora validación SSL
});
class BinanceService {
    getBinance(tradeType_1) {
        return __awaiter(this, arguments, void 0, function* (tradeType, fiat = "BOB") {
            const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";
            const body = {
                page: 1,
                rows: 10,
                payTypes: [],
                asset: "USDT",
                tradeType,
                fiat,
            };
            const response = yield axios_1.default.post(url, body, {
                httpsAgent: agent,
                headers: { "Content-Type": "application/json" },
            });
            return response.data.data
                .map((item) => new binace_model_1.BinanceClass(item));
            // .filter((item: any) => !item.adv.isRestricted)
        });
    }
}
exports.BinanceService = BinanceService;
