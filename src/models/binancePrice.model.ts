import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class BinancePrice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tradeType!: string; // BUY o SELL

  @Column("decimal", { precision: 12, scale: 2 })
  precio!: number;

  @Column("int")
  contador!: number;

  @CreateDateColumn()
  timestamp!: Date;
}

