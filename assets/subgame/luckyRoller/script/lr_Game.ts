const {ccclass, property} = cc._decorator;
import { AudioControl } from "./lr_Audio";
import { CSetData, HISTORY, SData, formatData, subGameMSG } from "./lr_SubGameMSG";

@ccclass
export default class lr_Game extends cc.Component {

    /**
     * 用户信息
     */
    @property(cc.Node)
    userNode = null;

    /**
     * 游戏说明
     */
    @property(cc.Node)
    help = null;

    /**
     * 界面滑动
     */
    @property(cc.ScrollView)
    s_content = null;

    /**
     * 进度条
     */
    @property(cc.Node)
    random_p = null;

    /**
     * 进度数字
     */
    @property(cc.Label)
    progressLabel = null;

    /**
     * 概率
     */
    @property(cc.Label)
    chanceLabel = null;

    /**
     * 收益
     */
    @property(cc.Label)
    payoutLabel = null;

    /**
     * 下注
     */
    @property(cc.Node)
    quantia = null;

    @property(cc.Node)
    manualBtn = null;

    /**
     * 游戏进行中
     */
    @property(cc.Node)
    block = null;

    @property(cc.Node)
    gameContent1 = null;

    @property(cc.Node)
    gameContent2 = null;

    @property(cc.Node)
    gameContent3 = null;

    /**
     * 结果1
     */
    @property(cc.Node)
    resultNum1 = null;

    /**
     * 结果2
     */
    @property(cc.Node)
    resultNum2 = null;

    /**
     * 结果3
     */
    @property(cc.Node)
    resultNum3 = null;

    /**
     * 赢时效果
     */
    @property(cc.Node)
    winView = null;

    /**
     * 赢得金币
     */
    @property(cc.Label)
    winLabel = null;

    /**
     * 历史记录
     */
    @property(cc.Node)
    history = null;

    /**
     * 历史记录
     */
    @property(cc.Node)
    historyitem = null;



    moneyNode = null;

    moneyNum = null;

    amount = null;

    toggleNum = 1;

    gameStartNode = []


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let t = this;
        t.usershow();
        t.handleTouch();
        this.onHandleSlider();
        GameTools.addBtnOnClick(this.node, this.onBtnClick, this);
        this.quantia.getChildByName("amount").getComponent(cc.EditBox).string = 1;
        t.onEditeEnd();

        this.gameStartNode.push(this.gameContent1), this.gameStartNode.push(this.gameContent2), this.gameStartNode.push(this.gameContent3);
    }

    start () {}

    // update (dt) {}

    /**
     * 点击事件
     * @param event 点击事件
     */
    onBtnClick(event: cc.Event.EventTouch) {
        let touchNode = event.getCurrentTarget();
        let btn_name = touchNode.name;
        switch (btn_name) {
            case "back":
                AudioControl.playClick();
                clientKernel.dismissGame();
                // AudioControl.playClick();
                break;
            case "background_help":
                AudioControl.playClick();
                this.onHelpHide();
                break;
            case "btn_close":
                AudioControl.playClick();
                this.onHelpHide();
                break;
            case "help":
                AudioControl.playClick();
                this.onHelpShow();
                break;
            case "toggle1":
                AudioControl.playClick();
                this.toggleNum = 1;
                this.onCompareToggle();
                break;
            case "toggle2":
                AudioControl.playClick();
                this.toggleNum = 2;
                this.onCompareToggle();
                break;
            case "up":
                AudioControl.playClick();
                this.onAmountUp();
                break;
            case "down":
                AudioControl.playClick();
                this.onAmountDown();
                break;
            case "btn_1":
                AudioControl.playClick();
                this.onAmountNum(1);
                break;
            case "btn_5":
                AudioControl.playClick();
                this.onAmountNum(5);
                break;
            case "btn_10":
                AudioControl.playClick();
                this.onAmountNum(10);
                break;
            case "btn_50":
                AudioControl.playClick();
                this.onAmountNum(50);
                break;
            case "btn_100":
                AudioControl.playClick();
                this.onAmountNum(100);
                break;
            default:
                break;
        }
    };

    /**
     * 游戏消息事件
     * @param subCMD 消息号
     * @param data 数据
     */
    onEventGameMessage(subCMD, data) {
        let t = this;
        console.log('游戏消息事件', subCMD, data);
        switch (subCMD) {
            case subGameMSG.S_CALC : {
                console.log("789结算", JSON.stringify(data));
                setTimeout(function () {
                    t.setSCALC(data);
                }, 1000);
            }
            case subGameMSG.S_HISTORY : {
                console.log("历史记录", JSON.stringify(data));
                t.setHistory(data[0]);
            }
            break;
        }
    }

    /**
     * 场景消息事件
     * @param subCMD 消息号
     * @param data 数据
     */
    onEventSceneMessage(gameStatus, data) {
        let t = this;
        console.log('场景消息事件', gameStatus, data);
        // this.initSSceneData(data);
        switch (gameStatus) {
            case subGameMSG.GS_TK_FREE:{
                console.log('空闲状态', JSON.stringify(data));
            }
            break;
            case subGameMSG.GS_TK_CALL:{
                console.log('玩家状态', JSON.stringify(data));
            }
            break;
            case subGameMSG.GS_TK_SCORE:{
                console.log('下注状态', JSON.stringify(data));
            }
            break;
        }
    }

    startGame () {
        let amount = this.quantia.getChildByName("amount").getComponent(cc.EditBox).string;
        let red = this.quantia.getChildByName("red");
        let rest = this.moneyNum - amount;
        console.log("moneyNum : " + this.moneyNum + "- amount : " + amount + " = rest : " + rest);
        if (amount != null && amount >= 1 && this.moneyNum >=1 && rest >= 0) { // 游戏开始
            AudioControl.playClick();
            this.resultNum1.active = false;
            this.resultNum2.active = false;
            this.resultNum3.active = false;
            this.block.active = true;
            this.winView.active = false;
            red.active = false;
            clientKernel.sendGameMsg(subGameMSG.C_START, CSetData);
        } else {
            red.active = true;
            AudioControl.playClick();
        }
    }

    onAmountUp () {
        let amount = this.quantia.getChildByName("amount").getComponent(cc.EditBox);
        amount.string = amount.string * 2;
        this.onEditeEnd();
    }

    onAmountDown () {
        let amount = this.quantia.getChildByName("amount").getComponent(cc.EditBox);
        amount.string = amount.string / 2;
        this.onEditeEnd();
    }

    onAmountNum (num : number) {
        let amount = this.quantia.getChildByName("amount").getComponent(cc.EditBox);
        let sum = Number(amount.string) + Number(num);
        amount.string = sum;
        this.onEditeEnd();
    }

    /**
     * 显示说明
     */
    onHelpShow () {
        this.help.active = true;
    }

    /**
     * 隐藏说明
     */
    onHelpHide () {
        this.help.active = false;
    }

    toFixed (e, t) {
        void 0 === t && (t = 2);
        let n = Math.pow(10, t), o = e * n + .5;
        return (o = parseInt(o.toString(), 10) / n) + "";
    }

    setScrollRun () {
        for (let m = 0; m < 3; m++) {
            let content = this.gameStartNode[m];
            for (let i = 0; i < 3; i++) {
                for (let n = 0; n < 10; n++) {
                    let name = "image" + n;
                    let item = cc.instantiate(content.getChildByName(name));
                    content.addChild(item);
                    // content.removeChild[0];
                }
            }
        }

        let digitHeight = 155;
        const targetY1: number = digitHeight * 9;  // 个位数字的目标位置
        const targetY2: number = digitHeight * 9;  // 十位数字的目标位置
        const targetY3: number = digitHeight * 9;  // 百位数字的目标位置

        const moveAction1: cc.ActionInterval = cc.moveBy(8, cc.v2(0, targetY1));
        const moveAction2: cc.ActionInterval = cc.moveBy(10, cc.v2(0, targetY2));
        const moveAction3: cc.ActionInterval = cc.moveBy(12, cc.v2(0, targetY3));
        
        this.gameContent1.runAction(cc.repeat(moveAction1, 3));
        this.gameContent2.runAction(cc.repeat(moveAction2, 3));
        this.gameContent3.runAction(cc.repeat(moveAction3, 3));
    }

    removeContent () {
        for (let m = 0; m < 3; m++) {
            let content = this.gameStartNode[m];
            for (let i = 0; i < 30; i++) {
                content.removeChild[0];
            }
        }
    }

    setSCALC (data : SData) {
        this.block.active = false;
        this.resultNum1.active = true;
        this.resultNum2.active = true;
        this.resultNum3.active = true;
        this.resultNum1.getComponent("lr_Num").init(Number(data.resultNum.charAt(0)));
        this.resultNum2.getComponent("lr_Num").init(Number(data.resultNum.charAt(1)));
        this.resultNum3.getComponent("lr_Num").init(Number(data.resultNum.charAt(2)));
        // this.setScrollRun();
        // this.removeContent();
        if (data.win > 0) {
            AudioControl.playWin();
            this.winView.active = true;
            this.winLabel.string = data.win.toFixed(3);
            this.resultNum1.color = cc.color(79, 254, 128);
            this.resultNum2.color = cc.color(79, 254, 128);
            this.resultNum3.color = cc.color(79, 254, 128);
        } else if (data.win < 0) {
            AudioControl.playBlow();
            this.resultNum1.color = cc.color(254, 79, 79);
            this.resultNum2.color = cc.color(254, 79, 79);
            this.resultNum3.color = cc.color(254, 79, 79);
        }
        this.changeMoney(data.score);
        this.onEditeEnd();
        clientKernel.sendGameMsg(subGameMSG.C_HISTORY, "");
    }

    setHistory (lastData : HISTORY) {
        if (lastData != null) {
            let history = this.history;
            let item = cc.instantiate(this.historyitem)
            item.active = true;
            let content = item.children[0];
            content.getChildByName("Times").children[0].getComponent(cc.Label).string = formatData(lastData.time, "yyyy-MM-dd HH:mm:ss");
            let fuhao = "<";
            if (lastData.higher == 1) {
                fuhao = ">";
            }
            content.getChildByName("Multiplier").children[0].getComponent(cc.Label).string = fuhao + lastData.handerNum;
            content.getChildByName("Result").children[0].getComponent(cc.Label).string = lastData.resultNUm;
            content.getChildByName("Bets").children[0].getComponent(cc.Label).string = lastData.difen;
            let winNum = lastData.win.toFixed(3);
            content.getChildByName("Profit").children[0].getComponent(cc.Label).string = winNum;
            if (lastData.win < 0) {
                content.getChildByName("Profit").children[0].color = cc.color(255, 0, 0);
            }
            history.insertChild(item, 2);
        } else {
            console.log("lastData == null")
        }
    }

    /**
     * 修改金额
     * @param num 金额
     */
    changeMoney (num) {
        this.moneyNum = num;
        this.moneyNode.string = GameTools.convertInfo(num);
    }

    /**
     * 加载用户信息
     */
    usershow () {
        this.moneyNode = this.userNode.getChildByName("money").getComponent(cc.Label);
        let name = this.userNode.getChildByName("name").getComponent(cc.Label);
        let head = this.userNode.getChildByName("head_mask").getChildByName("head").getComponent(cc.Sprite);
        let myUserItem = clientKernel.getMeUserItem();  
        console.log('lr.myUserItem : ', JSON.stringify(myUserItem));
        this.changeMoney(myUserItem.getUserScore());
        name.string = myUserItem.getNickname();
        GameTools.loadWxHead(head, myUserItem.getHead());
    }

    /**
     * 解决滑动冲突
     */
    handleTouch () {
        let t = this;
        let handle = this.random_p.getChildByName("Handle");
        handle.on(cc.Node.EventType.TOUCH_START, function(){
            t.s_content.enabled = false;
        }, this);
        handle.on(cc.Node.EventType.TOUCH_CANCEL, function(){
            t.s_content.enabled = true;
        }, this);
        handle.on(cc.Node.EventType.TOUCH_END, function(){
            t.s_content.enabled = true;
        }, this);
    }

    /**
     * 进度条显示
     */
    onHandleSlider () {
        let progressbar = this.random_p.getComponent(cc.ProgressBar);
        let slider = this.random_p.getComponent(cc.Slider);
        progressbar.progress = slider.progress;
        let num = Math.floor(slider.progress * 999);
        this.progressLabel.string = (1 > num ? 1 : num);
        CSetData.handerNum = this.progressLabel.string;
        this.onCompareToggle();
    }

    /**
     * 更大更小选择
     */
    onCompareToggle () {
        let t = 0;
        t = 1 == this.toggleNum ? (999 - this.progressLabel.string) / 999 : this.progressLabel.string / 999;
        let e = 300;
        e = 1 / t;
        e = e >= 300 ? 300 : e;
        
        let beishu = Math.floor(100 * e) / 100;
        CSetData.higher = this.toggleNum;
        CSetData.beishu = beishu;
        this.chanceLabel.getComponent(cc.Label).string = this.toFixed(100 * t, 2) + "%";
        this.payoutLabel.getComponent(cc.Label).string = beishu + "x";
    }

    /**
     * 更改下注金额
     */
    onEditeEnd () {
        let amount = this.quantia.getChildByName("amount").getComponent(cc.EditBox);
        let red = this.quantia.getChildByName("red");
        red.active = false;
        if (this.moneyNum < 1) {
            red.active = true;
        } else if (amount.string < 1) {
            amount.string = 1;
        } else if (amount.string > this.moneyNum) {
            amount.string = Math.floor(this.moneyNum);
        }
        CSetData.difen = amount.string;
    }
}
