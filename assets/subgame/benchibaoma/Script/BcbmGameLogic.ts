const { ccclass } = cc._decorator;

@ccclass
export default class BcbmGameLogic {
    getCardValue = function (e) {
        return e & this.MASK_VALUE
    }

    getCardColor = function (e) {
        return (e & this.MASK_COLOR) >> 4
    }

    MASK_COLOR = 240;
    MASK_VALUE = 15;
    cardData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 78, 79]
}