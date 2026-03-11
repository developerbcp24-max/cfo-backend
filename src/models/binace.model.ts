export class BinanceClass {
    precio: string;
    nombre: string;
    minimo: string;
    maximo: string;
    tipo: string;
    buyerBtcPositionLimit!: number;
    buyerRegDaysLimit!: any;
    buyerKycLimit!: any;
    takerAdditionalKycRequired!: number;

    constructor(item: any) {
        this.precio = item.adv.price;
        this.nombre = item.advertiser.nickName;
        this.minimo = item.adv.minSingleTransAmount;
        this.maximo = item.adv.maxSingleTransAmount;
        this.tipo = item.adv.tradeType;
        this.buyerBtcPositionLimit = item.adv.buyerBtcPositionLimit;
        this.buyerRegDaysLimit = item.adv.buyerRegDaysLimit;
        this.buyerKycLimit = item.adv.buyerKycLimit;
        this.takerAdditionalKycRequired = item.adv.takerAdditionalKycRequired;
    }
}
