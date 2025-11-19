const { ccclass, property } = cc._decorator;

@ccclass
export default class lhd_GameLogic {

    static MASK_COLOR = 240;
    static MASK_VALUE = 15;
    static cardData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 78, 79];

    // 0-12 黑桃 13-25 红桃 26-38 梅花 39-51 方块 52 小王 53 大王
    static getCardValue = function (e) {
        console.log("getCardValue", e, e & this.MASK_VALUE);
        return e & this.MASK_VALUE
    }


    static getCardColor = function (e) {
        return (e & this.MASK_COLOR) >> 4
    }

}