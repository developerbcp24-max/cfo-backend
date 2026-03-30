import axios from "axios";
import https from "https";
import { BinanceClass } from "../models/binace.model";
import { AppDataSource } from "../db/data-source";
import { BinancePrice } from "../models/binancePrice.model";
import { Between } from "typeorm";

const agent = new https.Agent({
  rejectUnauthorized: false, // ⚠️ ignora validación SSL
});

// export class BinanceService {
//   async getBinance(tradeType: "BUY" | "SELL", fiat: string = "BOB") {
//     const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";

//     const body = {
//       page: 1,
//       rows: 10,
//       payTypes: [],
//       asset: "USDT",
//       tradeType,
//       fiat,
//     };

//     const response = await axios.post(url, body, {
//       httpsAgent: agent,
//       headers: { "Content-Type": "application/json" },
//     });

//     return response.data.data
//       .map((item: any) => new BinanceClass(item));
//     // .filter((item: any) => !item.adv.isRestricted)
//   }
// }

export class BinanceService {

  async getBinance(tradeType: "BUY" | "SELL", fiat: string = "BOB") {
    const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";

    const body = { page: 1, rows: 10, payTypes: [], asset: "USDT", tradeType, fiat };
    const response = await axios.post(url, body, { headers: { "Content-Type": "application/json" } });

    const prices = response.data.data.map((item: any) => ({
      tradeType,
      precio: parseFloat(item.adv.price),
      minimo: parseFloat(item.adv.minSingleTransAmount),
      maximo: parseFloat(item.adv.maxSingleTransAmount),
      fiat,
    }));

    // Guardar en MySQL
    const repo = AppDataSource.getRepository(BinancePrice);

    // Paso 1: contar
    const conteo: Record<string, number> = {};
    for (const p of prices) {
      const precio = parseFloat(p.precio).toFixed(2);
      conteo[precio] = (conteo[precio] || 0) + 1;
    }

    // Paso 2: ordenar y tomar top 3
    const preciosOrdenados = Object.keys(conteo).sort((a, b) => parseFloat(b) - parseFloat(a));
    const top3 = preciosOrdenados.slice(0, 3);

    // Paso 3: rellenar con 0 si faltan
    while (top3.length < 3) {
      top3.push("0.00");
    }

    // Paso 4: guardar
    for (const precio of top3) {
      // const contador = conteo[precio] || 0;
      // const priceEntity = repo.create({
      //   tradeType,
      //   precio: parseFloat(precio),
      //   contador
      // });
      // await repo.save(priceEntity);
    }

    return prices;
  }
}

