"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceClass = void 0;
class BinanceClass {
    constructor(item) {
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
exports.BinanceClass = BinanceClass;
