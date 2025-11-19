import { zp_GameConfig } from "./zp_GameConfig";
import zp_ball_action from "./zp_ball_action";

const { ccclass, property } = cc._decorator;

@ccclass
export default class zp_Zhuanpan extends cc.Component {

    c = [0, 14, 31, 2, 33, 18, 27, 6, 21, 10, 19, 23, 4, 25, 12, 35, 16, 29, 8, 34, 13, 32, 9, 20, 17, 30, 1, 26, 5, 7, 22, 11, 36, 15, 28, 3, 24];

    @property(cc.Node)
    turn_arrow: cc.Node = null;

    @property(cc.Label)
    area: cc.Label = null;

    @property(cc.Node)
    ball: cc.Node = null;

    @property([cc.Node])
    ballSlots: cc.Node[] = [];

    private _preIndex: number = 0;

    init(e: any, t: Function) {
        console.log(" - ZhuanPanAni init - ");
        this.act1(e, t);
    }

    // act1(e, t) {
    //     var o = this,
    //         n = this,
    //         i = e.diceCase;
    //     this._preIndex = (this.c[i] + parseInt(Math.random() * (this.c.length - 1) + "")) % this.c.length;
    //     var s = (this.c[i] + this._preIndex) % this.c.length,
    //         l = Math.sqrt(Math.pow(this.ballSlots[s].x, 2) + Math.pow(this.ballSlots[s].y, 2)),
    //         p = 360 / this.c.length * this._preIndex;
    //     this.rotaInit(), this.turn_arrow.runAction(cc.spawn(cc.sequence(cc.rotateTo(10, -(3600 + p)).easing(cc.easeSineOut()), cc.callFunc(function () {
    //         o.ballSlots[s].active = !0
    //     }, this)), cc.sequence(cc.delayTime(2), cc.callFunc(function () {
    //         audioMgr.playEffect(zp_GameConfig.AudioData.fly_zp, !1);
    //         var i, p = [],
    //             u = 176,
    //             h = 2700 + parseInt(360 * Math.random() + ""),
    //             d = 1080 + parseInt(360 * Math.random() + ""),
    //             f = 180 + parseInt(360 * Math.random() + ""),
    //             g = parseInt(10 * Math.random() + 20 + "") / 30;
    //         p.push(new zp_ball_action(3, cc.v2(0, 0), u, 0, !0, h, 0));
    //         for (var _ = 0; _ < 30; ++_) p.push(new zp_ball_action(1 / 360, cc.v2(0, 0), u, (0 + h) % 360, !0, 1, 0)), u -= g, h++;
    //         p.push(new zp_ball_action(2, cc.v2(0, 0), u, (0 + h) % 360, !0, d, 0)), i = (u - 133) / 30;
    //         for (_ = 0; _ < 30; ++_) p.push(new zp_ball_action(1 / 360, cc.v2(0, 0), u, (0 + h + d) % 360, !0, 1, 0)), u -= i, d++;
    //         var y = Math.acos((0 * (o.ballSlots[s].x - 0) + (o.ballSlots[s].y - 0) * (l - 0)) / (l * l));
    //         o.ballSlots[s].x < 0 && (y = 2 * Math.PI - y), (y = (0 + h + d + f) % 360 < (y *= 180 / Math.PI) ? 360 - (y - (0 + h + d + f) % 360) : (0 + h + d + f) % 360 - y) < 360 / this.c.length * 3 && (y += 360), p.push(new zp_ball_action(1, cc.v2(0, 0), 133, (0 + h + d) % 360, !0, f, 0)), p.push(new zp_ball_action(2 - 60 / 360, cc.v2(0, 0), 133, 360 - (0 + h + d + f) % 360, !1, y, 1)), p.push(cc.callFunc(function () {
    //             n.ball.position = cc.v2(0, 720), t(e)
    //         }, o)), o.ball.runAction(cc.sequence(p))
    //     }, this))))
    // }

    act1_old(e, t) {
        var o = this,
            n = this,
            i = e.diceCase;
        this._preIndex = (this.c[i] + parseInt(Math.random() * (this.c.length - 1) + "")) % this.c.length;
        var s = (this.c[i] + this._preIndex) % this.c.length,
            l = Math.sqrt(Math.pow(this.ballSlots[s].x, 2) + Math.pow(this.ballSlots[s].y, 2)),
            p = 360 / this.c.length * this._preIndex;
        this.rotaInit(), this.turn_arrow.runAction(cc.spawn(cc.sequence(cc.rotateTo(10, -(3600 + p)).easing(cc.easeSineOut()), cc.callFunc(function () {
            o.ballSlots[s].active = !0
        }, this)), cc.sequence(cc.delayTime(2), cc.callFunc(function () {
            audioMgr.playEffect(zp_GameConfig.AudioData.fly_zp, !1);
            var i, p = [],
                u = 176,
                h = 2700 + parseInt(360 * Math.random() + ""),
                d = 1080 + parseInt(360 * Math.random() + ""),
                f = 180 + parseInt(360 * Math.random() + ""),
                g = parseInt(10 * Math.random() + 20 + "") / 30;
            p.push(cc.delayTime(3));
            for (var _ = 0; _ < 30; ++_) p.push(cc.delayTime(1/360)), u -= g, h++;
            p.push(cc.delayTime(2)), i = (u - 133) / 30;
            for (_ = 0; _ < 30; ++_) p.push(cc.delayTime(1/360)), u -= i, d++;
            var y = Math.acos((0 * (o.ballSlots[s].x - 0) + (o.ballSlots[s].y - 0) * (l - 0)) / (l * l));
            o.ballSlots[s].x < 0 && (y = 2 * Math.PI - y), (y = (0 + h + d + f) % 360 < (y *= 180 / Math.PI) ? 360 - (y - (0 + h + d + f) % 360) : (0 + h + d + f) % 360 - y) < 360 / this.c.length * 3 && (y += 360), p.push(cc.delayTime(1)), p.push(cc.delayTime(2 - 60 / 360)), p.push(cc.callFunc(function () {
                n.ball.position = new cc.Vec3(0, 720, 0), t(e)
            }, o)), o.ball.runAction(cc.sequence(p))
        }, this))))
    }

    act1(event, callback) {
        let self = this;
        let rotationIndex; // 旋转索引
        let finalPositionIndex; // 最终位置索引
        let diceCase = event.diceCase;
    
        // 计算旋转索引
        rotationIndex = (this.c[diceCase] + parseInt(Math.random() * (this.c.length - 1) + "")) % this.c.length;
        // 计算最终位置索引
        finalPositionIndex = (this.c[diceCase] + rotationIndex) % this.c.length;
    
        // 计算球槽位置的距离
        let distance = Math.sqrt(Math.pow(this.ballSlots[finalPositionIndex].x, 2) + Math.pow(this.ballSlots[finalPositionIndex].y, 2));
        let rotationAngle = 360 / this.c.length * rotationIndex;
    
        this.rotaInit(); // 初始化旋转
    
        // 执行箭头旋转动作
        this.turn_arrow.runAction(cc.spawn(
            cc.sequence(
                cc.rotateTo(10, -(3600 + rotationAngle)).easing(cc.easeSineOut()),
                cc.callFunc(function () {
                    self.ballSlots[finalPositionIndex].active = true;
                }, this)
            ),
            cc.sequence(
                cc.delayTime(2),
                cc.callFunc(function () {
                    audioMgr.playEffect(zp_GameConfig.AudioData.fly_zp, false);
                    var speedAdjustment, rotationSteps = [],
                        initialSpeed = 176,
                        horizontalRotation = 2700 + parseInt(360 * Math.random() + ""),
                        verticalRotation = 1080 + parseInt(360 * Math.random() + ""),
                        finalRotation = 180 + parseInt(360 * Math.random() + ""),
                        speedDecrement = parseInt(10 * Math.random() + 20 + "") / 30;
    
                    rotationSteps.push(cc.delayTime(3));
                    for (var i = 0; i < 30; ++i) {
                        rotationSteps.push(cc.delayTime(1/360));
                        initialSpeed -= speedDecrement;
                        horizontalRotation++;
                    }
    
                    rotationSteps.push(cc.delayTime(2));
                    speedAdjustment = (initialSpeed - 133) / 30;
                    for (i = 0; i < 30; ++i) {
                        rotationSteps.push(cc.delayTime(1/360));
                        initialSpeed -= speedAdjustment;
                        verticalRotation++;
                    }
    
                    var angleDifference = Math.acos((0 * (self.ballSlots[finalPositionIndex].x - 0) + (self.ballSlots[finalPositionIndex].y - 0) * (distance - 0)) / (distance * distance));
                    if (self.ballSlots[finalPositionIndex].x < 0) {
                        angleDifference = 2 * Math.PI - angleDifference;
                    }
    
                    angleDifference = (0 + horizontalRotation + verticalRotation + finalRotation) % 360 < (angleDifference *= 180 / Math.PI) ? 360 - (angleDifference - (0 + horizontalRotation + verticalRotation + finalRotation) % 360) : (0 + horizontalRotation + verticalRotation + finalRotation) % 360 - angleDifference;
    
                    if (angleDifference < 360 / this.c.length * 3) {
                        angleDifference += 360;
                    }
    
                    rotationSteps.push(cc.delayTime(1));
                    rotationSteps.push(cc.delayTime(2 - 60 / 360));
                    rotationSteps.push(cc.callFunc(function () {
                        self.ball.position = new cc.Vec3(0, 720, 0);
                        callback(event);
                    }, self));
    
                    self.ball.runAction(cc.sequence(rotationSteps));
                }, this)
            )
        ));
    }

    rotaInit() {
        this.ball.position = new cc.Vec3(0, 720, 0);
        for (var e = 0; e < this.ballSlots.length; ++e) this.ballSlots[e].active = !1;
        this.area.string = "", this.turn_arrow.stopAllActions(), this.turn_arrow.rotation %= 360
    }

    showResultBall(index) {
        var t = (this.c[index] + this._preIndex) % this.c.length;
        this.rotaInit(), this.ballSlots[t].active = !0
    }
}