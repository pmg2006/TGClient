import GameTools from "../../../kernel/GameTools";
import { CrashAudioControl } from "./crashAudioControl";
import { CrashDefine } from "./crashDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CrashScene extends cc.Component {

    @property(cc.Node)
    hengLayout: cc.Node = null;

    @property(cc.Node)
    hengItem: cc.Node = null;

    @property(cc.Node)
    zongLayout: cc.Node = null;

    @property(cc.Node)
    zongItem: cc.Node = null;

    @property(cc.Node)
    rockNode: cc.Node = null;

    @property(cc.Node)
    peiLvNode: cc.Node = null;

    @property(cc.EditBox)
    betEditbox: cc.EditBox = null;

    @property(cc.Node)
    betNode: cc.Node = null;

    @property(cc.Node)
    autoNode: cc.Node = null;

    @property(cc.Node)
    timeNode: cc.Node = null;

    @property(cc.Node)
    userNode: cc.Node = null;

    @property(cc.Node)
    waitNode: cc.Node = null;

    @property(cc.Node)
    oldNode: cc.Node = null;

    @property(cc.Node)
    oldItem: cc.Node = null;

    @property(cc.Node)
    awardNode: cc.Node = null;

    @property(cc.Node)
    listContent: cc.Node = null;

    @property(cc.Node)
    listItem: cc.Node = null;

    private hengMinTime = 8;
    private hengTimer = 0;

    private zongMinTime = 180;
    private zongTimer = 0;
    private beishuList = [];

    private rockTimer = 0;
    private rockBomb: cc.Animation = null;
    private rockDown: cc.Animation = null;
    private rock: cc.Node = null;
    private hong: cc.Node = null;
    private userResut: cc.Node = null;

    private peiLvTimer = 0;

    private startTimer = 0;

    private beishuBox: cc.EditBox = null;
    private autobeishuBox: cc.EditBox = null;
    private roundBox: cc.EditBox = null;
    private betLab: cc.Label = null;
    private autoLab: cc.Label = null;

    private autoScore = 1;
    private autoBeishu = 101;
    private bAuto = false;
    private curRound = 1000000000;
    private haveBet = false;
    private nextBetScore = 0;
    private nextBeishu = 0;
    private bEnd = false;
    private bShowAward = false;
    private betData: { beishu: number, award: number, bet: number } = { beishu: 0, award: 0, bet: 0 };
    private myBetList: CrashDefine.History[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.rockBomb = this.rockNode.getChildByName("huojian").getChildByName("bao").getComponent(cc.Animation);
        this.rockDown = this.rockNode.getChildByName("sui").getComponent(cc.Animation);
        this.rock = this.rockNode.getChildByName("huojian").getChildByName("rocketimg");
        this.hong = this.rockNode.getChildByName("hong");
        this.userResut = this.rockNode.getChildByName("peilv");
        this.rockNode.active = false;
        this.userResut.active = false;
        this.peiLvNode.active = false;
        this.betNode.active = true;
        this.autoNode.active = false;
        this.timeNode.active = false;
        this.oldItem.active = false;
        this.awardNode.active = false;
        this.listItem.active = false;

        this.beishuBox = this.betNode.getChildByName("editbox").getComponent(cc.EditBox);
        this.betLab = this.betNode.getChildByName("manualBetBtn").getComponentInChildren(cc.Label);

        this.autobeishuBox = this.autoNode.getChildByName("Sqque").getChildByName("editbox").getComponent(cc.EditBox);
        this.roundBox = this.autoNode.getChildByName("Rounds").getChildByName("Apostas").getChildByName("editbox").getComponent(cc.EditBox);
        this.autoLab = this.autoNode.getChildByName("auto").getComponentInChildren(cc.Label);

        GameTools.addBtnOnClick(this.node, this.btnOnClick, this);

        GameTools.loadWxHead(this.userNode.getChildByName("head"), KernelData.head);
        this.userNode.getChildByName("score").getComponent(cc.Label).string = "R$ " + KernelData.score.toFixed(2);
    }

    reset() {
        this.peiLvNode.active = false;
        this.waitNode.active = false;
        this.resetRock();
        this.haveBet = false;
        this.nextBetScore = 0;
        this.nextBeishu = 0;
        this.bEnd = false;
        this.awardNode.active = false;
        this.bShowAward = false;
        this.betData.award = 0;
    }

    createHengTime(time: number) {
        this.clearHengTimer();
        this.hengLayout.x = 0;
        time = Math.max(this.hengMinTime, time);
        const count = Math.ceil(time / 2) + 1;
        const hengCount = this.hengLayout.childrenCount;
        if (hengCount < count) {
            const needCount = count - hengCount;
            let startTime = hengCount * 2;

            for (let i = 0; i < needCount; i++) {
                const item = cc.instantiate(this.hengItem);
                item.getChildByName("label").getComponent(cc.Label).string = startTime + "s";
                startTime += 2;
                this.hengLayout.addChild(item);
            }
        }
    }

    moveHeng(time: number) {
        this.clearHengTimer();
        if (time <= this.hengMinTime) return;

        let leftTime = time - this.hengMinTime;
        const oneTime = 0.1;
        const oneMove = 130 / 20;
        this.hengTimer = setInterval(() => {
            this.clearHengTimer();
            this.hengTimer = setInterval(() => {
                if (leftTime <= 0) {
                    this.clearHengTimer();
                    return;
                }

                this.hengLayout.x -= oneMove;
                leftTime -= oneTime;
            }, oneTime * 1000);
        }, 8000);
    }

    clearHengTimer() {
        if (this.hengTimer) clearInterval(this.hengTimer);
    }

    createZongBeiShu(beishu: number) {
        this.clearZongTimer();
        this.zongLayout.y = 0;
        beishu = Math.max(this.zongMinTime, beishu);

        let curBeishu = 100;
        this.beishuList.length = 0;
        this.beishuList.push(curBeishu);
        while (curBeishu < beishu) {
            if (curBeishu < 200) curBeishu += 20;
            else if (curBeishu < 1000) curBeishu += 100;
            else if (curBeishu < 10000) curBeishu += 1000;
            else curBeishu += 10000;

            this.beishuList.push(curBeishu);
        }

        const zongCount = this.zongLayout.childrenCount;
        if (zongCount < this.beishuList.length) {
            const needCount = this.beishuList.length - zongCount;
            let curIndex = zongCount;

            for (let i = 0; i < needCount; i++) {
                const item = cc.instantiate(this.zongItem);
                item.getChildByName("label").getComponent(cc.Label).string = (this.beishuList[curIndex] / 100).toFixed(1) + "x";
                curIndex++
                this.zongLayout.addChild(item);
            }
        }
    }

    moveZong(beishu: number) {
        this.clearZongTimer();
        if (beishu <= this.zongMinTime) return;

        let curIndex = -1;
        for (let i = 0; i < this.beishuList.length; i++) {
            if (this.beishuList[i] > this.zongMinTime) {
                curIndex = i;
                break;
            }
        }

        if (curIndex < 0) return;

        let leftTime = (this.beishuList.length - curIndex) * 2;
        let firstTime = (curIndex - 1) * 2;
        let oneTime = 0.1;
        const oneMove = 100 / 20;
        this.zongTimer = setInterval(() => {
            this.clearZongTimer();
            this.zongTimer = setInterval(() => {
                if (leftTime <= 0) {
                    this.clearZongTimer();
                    return;
                }

                this.zongLayout.y -= oneMove;
                leftTime -= oneTime;
            }, oneTime * 1000);
        }, firstTime * 1000);
    }

    clearZongTimer() {
        if (this.zongTimer) clearInterval(this.zongTimer);
    }

    resetRock() {
        this.rockNode.active = false;
        this.rockNode.getComponent(cc.Animation).stop();
        this.rockBomb.stop();
        this.rockDown.stop();
        this.clearRockTimer();
        this.rock.active = false;
        this.hong.active = false;
    }

    startRock(time: number) {
        this.rockNode.active = true;
        this.rock.active = true;
        this.hong.active = true;
        this.clearRockTimer();
        this.rockNode.getComponent(cc.Animation).play();

        this.rockTimer = setTimeout(() => {
            this.showBetList();
            this.rock.active = false;
            this.hong.active = false;
            this.rockBomb.play();
            CrashAudioControl.playBomb();
            this.rockBomb.once("stop", () => {
                this.rockDown.node.position = this.rock.parent.position;
                this.rockDown.play();
            });
        }, time * 1000);
    }

    clearRockTimer() {
        if (this.rockTimer) clearTimeout(this.rockTimer);
    }

    startPeiLv(time: number, beishu: number) {
        let curBeishu = 100;
        this.peiLvNode.active = true;
        const peiLvLab = this.peiLvNode.getComponentInChildren(cc.Label);
        peiLvLab.string = (curBeishu / 100).toFixed(2) + "x";

        this.clearPeiLvTimer();
        const oneTime = 0.1;
        let curTime = 0;
        this.peiLvTimer = setInterval(() => {
            if (curTime >= time || curBeishu >= beishu) {
                peiLvLab.string = (beishu / 100).toFixed(2) + "x";
                this.clearPeiLvTimer();
                this.createOld(beishu);
                return;
            }

            if (curBeishu < 200) curBeishu += 1;
            else if (curBeishu < 1000) curBeishu += 5;
            else if (curBeishu < 10000) curBeishu += 50;
            else curBeishu += 500;

            if (curBeishu > beishu) curBeishu = beishu;
            peiLvLab.string = (curBeishu / 100).toFixed(2) + "x";
            curTime += oneTime;
            if (this.haveBet) this.betLab.string = ((curBeishu * this.betData.bet) / 100).toFixed(2) + "x(Withdraw)";

            if (!this.bShowAward && curBeishu >= this.betData.beishu && this.haveBet && this.betData.award > 0) {
                this.bShowAward = true;
                CrashAudioControl.playWin();
                this.awardNode.active = true;
                this.awardNode.getChildByName("label").getComponent(cc.Label).string = this.betData.award.toFixed(2);
                cc.tween(this.awardNode)
                    .delay(2)
                    .call(() => {
                        this.awardNode.active = false;
                    })
                    .start()
            }

        }, oneTime * 1000);
    }

    clearPeiLvTimer() {
        if (this.peiLvTimer) clearInterval(this.peiLvTimer);
    }

    startGameTimer(time: number) {
        this.timeNode.active = true;
        time = Math.ceil(time);
        this.clearStartTimer();
        const timeLab = this.timeNode.getChildByName("num").getComponent(cc.Label);
        timeLab.string = time.toString();

        this.startTimer = setInterval(() => {
            time--;
            timeLab.string = time.toString();
            if (time <= 0) {
                this.clearStartTimer();
                this.timeNode.active = false;
            }
        }, 1000)
    }

    clearStartTimer() {
        if (this.startTimer) clearInterval(this.startTimer);
    }

    createOld(beishu: number) {
        if (this.oldNode.childrenCount >= 6) this.oldNode.children[0].destroy();
        for (let i = 0; i < this.oldNode.childrenCount; i++) {
            this.oldNode.children[i].getChildByName("new").active = false;
        }


        const old = cc.instantiate(this.oldItem);
        old.active = true;
        old.y = 0;
        old.getChildByName("label").getComponent(cc.Label).string = (beishu / 100).toFixed(2) + "x";
        this.oldNode.addChild(old);
        old.getChildByName("new").active = true;
        if (beishu < 200) old.color = cc.color(40, 51, 67);
    }

    showBetList() {
        this.listContent.destroyAllChildren();
        for (let i = this.myBetList.length - 1; i >= 0; i--) {
            const timeStr = this.getDateTime(this.myBetList[i].time);
            const item = cc.instantiate(this.listItem);
            item.active = true;
            item.getChildByName("time").getComponentInChildren(cc.Label).string = timeStr;
            item.getChildByName("boombet").getComponentInChildren(cc.Label).string
                = this.myBetList[i].bet + "/" + (this.myBetList[i].beishu / 100).toFixed(2);
            // item.getChildByName("sysboom").getComponentInChildren(cc.Label).string
            //     = (this.myBetList[i].endBeishu / 100).toFixed(2) + "x";
            // if (this.myBetList[i].endBeishu < 200) {
            //     item.getChildByName("sysboom").getChildByName("di").color = cc.color(40, 51, 67);
            // }
            item.getChildByName("sysboom").getComponentInChildren(cc.Label).string
                = (this.myBetList[i].score).toFixed(2);
            item.getChildByName("status").getComponentInChildren(cc.Label).string = this.myBetList[i].bWin ? "win" : "lose";
            this.listContent.addChild(item);
        }
    }

    onEventSceneMessage(gameStatus: number, data: any) {
        this.waitNode.active = true;
        const { beishuList } = data;

        for (let i = 0; i < beishuList.length; i++) {
            this.createOld(beishuList[i]);
        }
    }

    onEventGameMessage(subCMD: number, data: any) {
        switch (subCMD) {
            case CrashDefine.msgEvent.StartBet: {
                this.onStartBet(data);
                break;
            }
            case CrashDefine.msgEvent.UserBet: {
                this.onUserBet(data);
                break;
            }
            case CrashDefine.msgEvent.End: {
                this.onGameEnd(data);
                break;
            }
        }
    }

    onStartBet(data) {
        CrashAudioControl.playSartPlay();
        this.betLab.string = "bet";
        const { leftTime } = data;
        if (this.bAuto && this.curRound > 0) {
            this.curRound--;
            clientKernel.sendGameMsg(CrashDefine.msgEvent.UserBet, { beishu: this.autoBeishu, score: this.autoScore });
        }
        else if (this.nextBetScore) {
            clientKernel.sendGameMsg(CrashDefine.msgEvent.UserBet, { beishu: this.nextBeishu, score: this.nextBetScore });
        }
        this.reset();
        this.startGameTimer(leftTime);
    }

    onUserBet(data) {
        CrashAudioControl.playBet();
        const { score, beishu } = data;
        this.haveBet = true;
        this.betLab.string = "succeed";
        this.betNode.getChildByName("manualBetBtn").color = cc.Color.RED;
    }

    onGameEnd(data) {
        const { beishu, leftTime, userList } = data;
        this.betNode.getChildByName("manualBetBtn").color = cc.color(71, 187, 168);

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].chairID == KernelData.chairID) {
                this.betData.award = userList[i].score;
                this.betData.beishu = userList[i].beishu;
                this.betData.bet = userList[i].curBet;
                if (this.myBetList.length >= 60) this.myBetList.splice(0, 1);
                this.myBetList.push({
                    bWin: userList[i].score > 0,
                    time: Date.now(),
                    bet: userList[i].curBet,
                    beishu: userList[i].beishu,
                    endBeishu: beishu,
                    score: userList[i].score
                });
                break;
            }
        }

        this.startRock(leftTime);
        this.createHengTime(leftTime);
        this.moveHeng(leftTime);
        this.startPeiLv(leftTime, beishu);
        this.createZongBeiShu(beishu);
        this.moveZong(beishu);



        this.bEnd = true;
        if (!this.haveBet) {
            this.betLab.string = "bet(Next Round)";
        }
    }

    onEventUserEnter(userItem: ClientUserItem) {

    }

    onEventUserLeave(userItem: ClientUserItem) {

    }

    UserOnlineOffline(userItem: ClientUserItem) {

    }

    UserStatusChanged(statusData: any) {

    }

    onEventUserScore(userItem: ClientUserItem) {
        if (userItem.chairID != KernelData.chairID) return;
        this.userNode.getChildByName("score").getComponent(cc.Label).string = "R$ " + userItem.score.toFixed(2);
    }

    onCostTick(data) {
        if (data.chairID != KernelData.chairID) return;
        this.userNode.getChildByName("score").getComponent(cc.Label).string = "R$ " + data.score.toFixed(2);
    }

    onBoxReturn(event, customEventData: string) {
        switch (customEventData) {
            case "betScore": {
                const score = parseInt(this.betEditbox.string);
                if (!(score >= 1)) {
                    this.betEditbox.string = "1";
                    break;
                }

                if (score > KernelData.score) this.betEditbox.string = KernelData.score.toFixed(0);
                break;
            }
            case "beishu": {
                const beishu = parseFloat(this.beishuBox.string);
                if (!(beishu >= 1.5)) this.beishuBox.string = "1.5";
                break;
            }
            case "autobeishu": {
                const beishu = parseFloat(this.autobeishuBox.string);
                if (!(beishu >= 1.5)) this.autobeishuBox.string = "1.5";
                break;
            }
            case "round": {
                if (!this.roundBox.string) return;
                const round = parseInt(this.roundBox.string);
                if (!(round > 0)) this.roundBox.string = "1";
                break;
            }
        }
    }

    btnOnClick(event) {
        CrashAudioControl.playClick();
        const btn_name = event.currentTarget.name;
        switch (btn_name) {
            case "btn_Manual1": {//+1
                let score = parseInt(this.betEditbox.string) > 0 ? parseInt(this.betEditbox.string) : 1;
                this.betEditbox.string = (score + 1).toString();
                break;
            }
            case "btn_Manual10": {//+10
                let score = parseInt(this.betEditbox.string) > 0 ? parseInt(this.betEditbox.string) : 1;
                this.betEditbox.string = (score + 10).toString();
                break;
            }
            case "manualHalfScale": {//1/2
                let score = parseInt(this.betEditbox.string) > 0 ? parseInt(this.betEditbox.string) : 1;
                this.betEditbox.string = Math.ceil(score / 2).toString();
                break;
            }
            case "manualDoubleScale": {//x2
                let score = parseInt(this.betEditbox.string) > 0 ? parseInt(this.betEditbox.string) : 1;
                this.betEditbox.string = (score * 2).toString();
                break;
            }
            case "btn_SqqueDel": {//-
                let score = parseFloat(this.beishuBox.string) > 1.5 ? parseFloat(this.beishuBox.string) : 2.5;
                this.beishuBox.string = (score - 1).toFixed(2);
                break;
            }
            case "btn_SqqueAdd": {//+
                let score = parseFloat(this.beishuBox.string) > 1.5 ? parseFloat(this.beishuBox.string) : 1.5;
                this.beishuBox.string = (score + 1).toFixed(2);
                break;
            }
            case "btn_Auto_SqqueAdd": {//+
                let score = parseFloat(this.autobeishuBox.string) > 1.5 ? parseFloat(this.autobeishuBox.string) : 2.5;
                this.autobeishuBox.string = (score + 1).toFixed(2);
                break;
            }
            case "btn_Auto_SqqueDel": {//-
                let score = parseFloat(this.autobeishuBox.string) > 1.5 ? parseFloat(this.autobeishuBox.string) : 1.5;
                this.autobeishuBox.string = (score - 1).toFixed(2);
                break;
            }
            case "manualBetBtn": {//下注
                if (this.haveBet) return;
                let score = parseInt(this.betEditbox.string) > 0 ? parseInt(this.betEditbox.string) : 1;
                let beishu = parseFloat(this.beishuBox.string) > 1 ? parseFloat(this.beishuBox.string) : 1.5;
                beishu *= 100;
                if (score > KernelData.score) {
                    GD.GameTool.showTextTips("underscore");
                    return;
                }

                if (this.bEnd) {
                    if (this.nextBeishu > 0) {
                        this.betLab.string = "bet(Next Round)";
                        this.nextBeishu = 0;
                        this.nextBetScore = 0;
                        return;
                    }

                    this.nextBeishu = beishu;
                    this.nextBetScore = score;
                    this.betLab.string = "cancel";
                    return;
                }

                clientKernel.sendGameMsg(CrashDefine.msgEvent.UserBet, { beishu: beishu, score: score });
                break;
            }
            case "AutoPlay": {//自动
                if (this.bAuto) {
                    this.autoBeishu = 0;
                    this.autoScore = 0;
                    this.bAuto = false;
                    this.autoLab.string = "Auto Play";
                    this.curRound = 1000000000;
                    return;
                }

                this.bAuto = true;
                const score = parseInt(this.betEditbox.string);
                const beishu = parseFloat(this.autobeishuBox.string);
                this.autoBeishu = beishu * 100;
                this.autoScore = score;
                this.autoLab.string = "Cancel";
                if (!this.roundBox.string) return;
                const round = parseInt(this.roundBox.string);
                if (!(round > 0)) this.curRound = 1;
                else this.curRound = round;
                break;
            }
            case "back": {
                clientKernel.dismissGame(false);
                break;
            }
            case "btnHelp": {
                break;
            }
            case "btnManual": {
                this.autoNode.active = false;
                this.betNode.active = true;
                break;
            }
            case "btnAuto": {
                this.autoNode.active = true;
                this.betNode.active = false;
                break;
            }
        }
    }

    /**
     * 获取日期文本 格式"年-月-日 时:分:秒"
     * @param {datetime} time           需要转换的时间
     * @return {string}                 返回文本
     */
    getDateTime(time?: number) {
        let date = time > 0 ? new Date(time) : new Date();
        let y = date.getFullYear();
        let m: number | string = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d: number | string = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h: number | string = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute: number | string = date.getMinutes();
        let second: number | string = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    };

    onDestroy() {
        this.clearHengTimer();
        this.clearZongTimer();
        this.clearRockTimer();
        this.clearPeiLvTimer();
        this.clearStartTimer();
    }

    // update (dt) {}
}
