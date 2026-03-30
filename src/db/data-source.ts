import "reflect-metadata";
import { DataSource } from "typeorm";
import { BinancePrice } from "../models/binancePrice.model";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "binance_db",
  synchronize: true, // crea tablas automáticamente en desarrollo
  logging: false,
  entities: [BinancePrice],
});
