const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class ClockBase extends cc.Component {

    private timeEscape = 0
    private secondsEscape = 0
    private timeThisRound = 0

    update(dt) {

        this.timeEscape += dt;
        let secondsEscape = Math.floor(this.timeEscape)
        if (secondsEscape > this.secondsEscape) {
            this.secondsEscape = secondsEscape
            let secondLeft = this.timeThisRound - this.secondsEscape
            if (secondLeft < 0) {
                secondLeft = 0
            }
            this.showTimer(secondLeft, this.timeThisRound)
        }
    }

    /**
     *倒计时
     *
     * @param {number} secondLeft //还剩下多少时间
     * @param {number} [secondMax] //本轮时间
     */
    setTimer(secondLeft:number, secondMax?:number) {
         console.warn("当前游戏状态：", secondLeft, secondMax)

         secondMax = secondMax|| secondLeft         
         this.timeEscape = this.secondsEscape = secondMax - secondLeft
         this.timeThisRound = secondMax
         this.showTimer(secondLeft, secondMax)
      
    }

    /**
     * 子游戏实现这个函数
     *
     * @abstract
     * @param {number} secondLeft  //本轮还剩下多少时间
     * @param {number} secondThisRound //本轮时间
     */
    abstract showTimer(secondLeft:number, secondThisRound:number)

    // update (dt) {}
}
