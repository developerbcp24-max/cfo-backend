import axios from "axios";
import https from "https";
import { BinanceClass } from "../models/binace.model";

const agent = new https.Agent({
  rejectUnauthorized: false, // ⚠️ ignora validación SSL
});

export class BinanceService {

  async getBinance(tradeType: "BUY" | "SELL", fiat: string = "BOB") {
    const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";

    const body = {
      page: 1,
      rows: 10,
      payTypes: [],
      asset: "USDT",
      tradeType,
      fiat,
    };

    const response = await axios.post(url, body, {
      httpsAgent: agent,
      headers: { "Content-Type": "application/json" },
    });

    return response.data.data
      .map((item: any) => new BinanceClass(item));
  }


}
