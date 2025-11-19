import { takeRightWhile } from "lodash";
import { CSetData, CStartData, CXiazhuData, ERRCODE, formatData, subGameMSG } from "./sl_SubGameMSG";
import { AudioControl } from "./sl_Audio";

const {ccclass, property} = cc._decorator;

/**
 * 卡牌种类
 */
enum CardType {
    iconNormal = 0, 
    iconRed = 1,
    iconGoldPick = 2,
    iconGold = 3,
    iconBoomPick = 4,
    iconBoom = 5,
}

@ccclass
export default class sl_Game extends cc.Component {

    /**
     * 游戏说明框
     */
    @property(cc.Node)
    minesHelp : cc.Node = null;

    /**
     * 游戏说明
     */
    @property(cc.PageView)
    minesHelpPageView = null;

    /**
     * 总金额
     */
    @property(cc.Label)
    totalMoneyString = null;

    /**
     * 用户名称
     */
    @property(cc.Label)
    nickname = null;

    /**
     * 头像
     */
    @property(cc.Sprite)
    head = null;

    /**
     * 卡牌
     */
    @property(cc.Node)
    mines = null;

    /**
     * 倍数栏框
     */
    @property(cc.Node)
    betScaleNode = null;

    /**
     * 倍数栏
     */
    @property(cc.Node)
    pageItem = null;

    /**
     * 赌注输入栏
     */
    @property(cc.EditBox)
    manualBaseInput = null;

    /**
     * 提醒输入赌注，要求大于1
     */
    @property(cc.Node)
    redWarnBase = null;

    /**
     * 雷数选框
     */
    @property(cc.Node)
    minesNumBtn = null;

    /**
     * 提醒输入雷数，要求大于1
     */
    @property(cc.Node)
    redWarnMines = null;

    /**
     * 雷数content
     */
    @property(cc.Node)
    minesNumContent = null;

    /**
     * 雷数label
     */
    @property(cc.Label)
    minesLabel = null;

    /**
     * 赢时动画
     */
    @property(cc.Node)
    awardAni = null;

    /**
     * 赢时金币
     */
    @property(cc.Label)
    awardLabel = null;

    /**
     * 点击赢时动画隐藏
     */
    @property(cc.Node)
    winPanelBg = null;



    /**
     * 普通模式下的开始按钮
     */
    @property(cc.Node)
    betBtn = null;

    /**
     * 普通模式下的开始按钮文字
     */
    @property(cc.Label)
    betBtnLabel = null;

    /**
     * 普通模式下的自动选择按钮
     */
    @property(cc.Node)
    autoPickBtn = null;

    /**
     * 开启后阻拦输入事件
     */
    @property(cc.Node)
    inputBlock = null;

    /**
     * 开启后阻拦自动输入事件
     */
    @property(cc.Node)
    toggleBlock = null;
    

    /**
     * 自动模式下的开始按钮
     */
    @property(cc.Node)
    manualAutoBetBtn = null;

    /**
     * 自动模式下的开始按钮字体
     */
    @property(cc.Label)
    AutoBetBtnString = null;

    /**
     * 自动模式的轮数输入框
     */
    @property(cc.Node)
    manualRounds = null;

    /**
     * 自动模式的轮数
     */
    @property(cc.EditBox)
    autoMaxRoundInput = null;

    /**
     * 自动模式下的各种输入框
     */
    @property(cc.Node)
    panelAuto = null;

    /**
     * 赢时停止
     */
    @property(cc.EditBox)
    autoWinNumInput = null;

    /**
     * 输时停止
     */
    @property(cc.EditBox)
    autoFailNumInput = null;

    /**
     * 增加赢时赌注
     */
    @property(cc.EditBox)
    autoWinAddNumInput = null;

    /**
     * 增加输时赌注
     */
    @property(cc.EditBox)
    autoFailAddNumInput = null;

    /**
     * 自定义赢时赌注
     */
    @property(cc.Toggle)
    autoWinAddNumToggle1 = null;

    /**
     * 自定义输时赌注
     */
    @property(cc.Toggle)
    autoFailAddNumToggle1 = null;

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

    /**
     * 倍数数组
     */
    oddsData = [];

    /**
     * 翻牌后
     */
    minesArray = [];

    /**
     * 翻牌前
     */
    autoBeforArray = [];

    /**
     * 已选牌数
     */
    minesArrayNum : number;

    /**
     * 最后一次选的倍数
     */
    lastPagechild : any;

    /**
     * 已赢数额
     */
    winNum : number;

    /**
     * 已输数额
     */
    loseNum : number;

    /**
     * 总金额（萬）
     */
    totalMoney : any;

    /**
     * 已选红色数
     */
    iconRedNum : number;

        /**
     * 总下注
     */
    totalXiazhu : number;


    onLoad () {
        let t = this;
        this.panelAuto.active = false;
        this.inputBlock.active = false;
        this.minesNumBtn.active = false;
        this.minesHelp.active = false;
        this.awardAni.active = false;
        this.toggleBlock.active = false;
        this.totalXiazhu = 0;
        this.OnStartDefault();
        this.onMinesNumSelect();
        this.onOddsShow(4);
        this.onCardPick();
        this.onNormalBtn();
        
        this.history.removeChild(this.historyitem);
        GameTools.addBtnOnClick(this.node, this.onBtnClick, this);
        this.winPanelBg.on(cc.Node.EventType.TOUCH_END, function(){
            t.awardAni.active = false;
        }, this);
        // 加载用户信息
        let myUserItem = clientKernel.getMeUserItem();
        console.log('myUserItem : ', JSON.stringify(myUserItem));
        this.changeMoney(myUserItem.getUserScore());
        this.nickname.string = myUserItem.getNickname();
        GameTools.loadWxHead(this.head, myUserItem.getHead());
    }

    // start () {}

    // update (dt) {}

    onBtnClick(event: cc.Event.EventTouch) {
        let touchNode = event.getCurrentTarget();
        let btn_name = touchNode.name;
        switch (btn_name) {
            case "btn_back":
                clientKernel.dismissGame();
                AudioControl.playClick();
                break;
            case "btn_close":
                this.onHelpHide();
                break;
            case "help":
                AudioControl.playClick();
                break;
            case "toggle1":
                AudioControl.playClick();
                break;
            case "toggle2":
                AudioControl.playClick();
                break;
            default:
                break;
        }
    };

    onMinesNumSelectBtn () {
        this.minesNumBtn.active = true;
    }

    onMinesNumSelectHide () {
        this.minesNumBtn.active = false;
    }

    onHelpHide () {
        this.minesHelp.active = false;
    }

    onTextChange () {
        let inputString = this.autoMaxRoundInput.string;
        inputString = inputString.replace(/\./g, '');
        this.autoMaxRoundInput.string = inputString;
    }

    /**
     * 普通模式
     */
    onNormalBtn () {
        this.manualRounds.active = false;
        this.autoPickBtn.active = true;
        let btn = this.autoPickBtn.getComponent(cc.Button);
        btn.interactable = false;
        this.manualAutoBetBtn.active = false;
        this.betBtn.active = true;
        this.panelAuto.active = false;
        this.awardAni.active = false;
        this.autoBeforArray = [];
        this.onCardNormal();
        this.revertpage();
        this.onSetData();
    }

    /**
     * 自动模式
     */
    onAutoBtn () {
        this.autoPickBtn.active = false;
        this.manualRounds.active = true;
        this.manualAutoBetBtn.active = true;
        this.betBtn.active = false;
        this.panelAuto.active = true;
        this.awardAni.active = false;
        this.autoBeforArray = [];
        this.revertpage();
        this.onrevertCard();
        this.onSetData();
    }

    /**
     * 下注提示
     */
    onEditingDidEnded () {
        let manualBaseInputString = this.manualBaseInput.string;
        console.log("manualBaseInput : " + Number(manualBaseInputString));
        if (1 > manualBaseInputString) {
            this.redWarnBase.active = true;
        } else {
            this.redWarnBase.active = false;
        }
    }

    /**
     * 帮助按钮
     */
    onMinesHelp () {
        this.minesHelp.active = true;
        this.minesHelpPageView.scrollToPage(0, 0.01);
    }

    /**
     * 下注倍数
     */
    OnStartDefault () {
        this.oddsData[0] = [1.04, 1.08, 1.12, 1.17, 1.23, 1.28, 1.35, 1.42, 1.51, 1.6, 
            1.71, 1.83, 1.98, 2.15, 2.35, 2.6, 2.91, 3.31, 3.85, 4.6, 5.72, 7.6, 11.35, 22.6];
        this.oddsData[1] = [1.08, 1.17, 1.27, 1.39, 1.52, 1.68, 1.86, 2.09, 2.35, 2.67, 
            3.07, 3.56, 4.19, 5.01, 6.1, 7.6, 9.74, 12.96, 18.1, 27.1, 45.1, 90.1, 270.1];
        this.oddsData[2] = [1.12, 1.27, 1.44, 1.66, 1.92, 2.224, 2.64, 3.14, 3.8, 4.65, 
            5.79, 7.34, 9.51, 12.65, 17.35, 24.74, 37.06, 59.24, 103.6, 207.1, 517.6, 2070];
        this.oddsData[3] = [1.17, 1.39, 1.66, 2, 2.45, 3.04, 3.82, 4.88, 6.36, 8.44, 
            11.47, 16.02, 23.1, 34.6, 54.31, 90.46, 162.74, 325.39, 759.1, 2277, 11385];
        this.oddsData[4] = [1.23, 1.52, 1.92, 2.45, 3.18, 4.21, 5.68, 7.83, 11.05, 16.02, 
            23.98, 37.25, 60.48, 103.6, 189.85, 379.6, 853.98, 2277, 7969.5, 47817];
        this.oddsData[5] = [1.28, 1.68, 2.24, 3.04, 4.21, 5.97, 8.69, 12.98, 20, 31.95, 
            53.18, 92.98, 172.6, 345.1, 759.1, 1897.5, 5692.5, 22770, 159390];
        this.oddsData[6] = [1.35, 1.86, 2.64, 3.82, 5.68, 8.69, 13.69, 22.35, 37.92, 67.33, 
            126.16, 252.22, 546.35, 1311, 3605.25, 12017.5, 54078.75, 432630];
        this.oddsData[7] = [1.42, 2.09, 3.14, 4.88, 7.83, 12.98, 22.35, 40.14, 75.73, 151.37, 324.25, 756.45, 1966.5, 5899.5, 21631.5, 108157.5, 973417.5];
        this.oddsData[8] = [1.51, 2.35, 3.8, 6.36, 11.05, 20, 37.92, 75.73, 160.82, 367.47, 918.52, 2571.58, 8357.62, 33430.5, 183867.75, 1838677.5];
        this.oddsData[9] = [1.6, 2.67, 4.65, 8.44, 16.02, 31.95, 67.33, 151.37, 367.47, 979.75, 2938.95, 10286.31, 44574, 267444, 2941884];
        this.oddsData[10] = [1.71, 3.07, 5.79, 11.47, 23.98, 53.18, 126.16, 324.25, 918.52, 2938.95, 11021.04, 51431.54, 334305, 4011660];
        this.oddsData[11] = [1.83, 3.56, 7.34, 16.02, 37.25, 92.98, 252.22, 756.45, 2571.58, 10286.31, 51431.54, 360020.77, 4680270];
        this.oddsData[12] = [1.98, 4.19, 9.51, 23.1, 60.48, 172.6, 546.35, 1966.5, 8357.6344574, 334305, 4680270];
        this.oddsData[13] = [2.15, 5.01, 12.65, 34.6, 103.6, 345.1, 1311, 5899.5, 33430.5, 267444, 4011660];
        this.oddsData[14] = [2.35, 6.1, 17.35, 54.31, 189.85, 3605.25, 21631.5, 183867.75, 2941884];
        this.oddsData[15] = [2.6, 7.6, 24.74, 90.46, 379.6, 1897.5, 12017.5, 108157.5, 1838677.5];
        this.oddsData[16] = [2.91, 9.74, 37.06, 162.74, 853.98, 5692.5, 54078.75, 973417.5];
        this.oddsData[17] = [3.31, 12.96, 59.24, 325.39, 2277, 22770, 432630];
        this.oddsData[18] = [3.85, 18.1, 103.6, 759.1, 7969.5, 159390];
        this.oddsData[19] = [4.6, 27.1, 207.1, 2277, 47817];
        this.oddsData[20] = [5.73, 45.1, 517.6, 11385];
        this.oddsData[21] = [7.6, 90.1, 2070];
        this.oddsData[22] = [11.35, 270.1];
        this.oddsData[23] = [22.6];
    }

    /**
     * 显示倍数
     * @param minesNum 雷数
     */
    onOddsShow (minesNum : number) {
        console.log("minesNum : " + minesNum);
        let oddsData = this.oddsData[minesNum - 1];
        if (0 != this.oddsData.length) {
            let pageViewCom = this.betScaleNode.getComponent(cc.PageView);  
            pageViewCom.removeAllPages();
            for (let pageItemChild = this.pageItem.childrenCount, o = 0, i = Math.ceil(this.oddsData.length / pageItemChild), a = 0; a < i; a++) {
                let pageItem = cc.instantiate(this.pageItem);
                pageViewCom.addPage(pageItem), pageItem.children.forEach(function(e) {
                    // !0为TRUE，0为FALSE
                    oddsData[o] ? (
                        e.active = true,
                        e.children[0].getComponent(cc.Label).string = oddsData[o] + "x"
                    ) : e.active = false, 
                    o++
                }), pageItem.active = !0
            }
        }
    }

    /**
     * 雷数选框数字
     */
    onMinesNumSelect () {
        let a : any = this;
        let t = this.minesNumContent;
        if (2 == t.childrenCount) {
            let n = t.children[1];
            for (let e = 2; e < 25; e++) {
                let o = null;
                n && (o = cc.instantiate(n)), o && (t.addChild(o), o.getChildByName("label_num").getComponent(cc.Label).string = String(e));
                o.on(cc.Node.EventType.TOUCH_END, function () {
                    a.onMinesTouchEnd(o);
                });
            }
            n.on(cc.Node.EventType.TOUCH_END, function () {
                a.onMinesTouchEnd(n);
            });
        }
    }

    onMinesTouchEnd (minesNode : any) {
        AudioControl.playClick();
        let minesLabel = minesNode.getChildByName("label_num").getComponent(cc.Label).string;
        this.minesLabel.string = minesLabel;
        this.minesNumBtn.active = false;
        this.redWarnMines.active = false;
        this.onOddsShow(minesLabel);
    }

    /**
     * 生成卡牌
     */
    onCardPick () {
        let t : any = this;
        let mines = this.mines;
        let line = mines.children[0];
        let card = line.children[0];
        mines.removeAllChildren();
        line.removeAllChildren();
        for (let x = 0; x < 5; x++) {
            let lineItem = cc.instantiate(line);
            for (let j = 0; j < 5; j++) {
                let cardItem = cc.instantiate(card);
                let cardCon = cardItem.getComponent("sl_Card");
                cardCon.init(CardType.iconNormal); // 未选中反面
                cardItem.on(cc.Node.EventType.TOUCH_END, function () {
                    if (t.betBtn.active) { // 普通模式
                        // t.onNormal(cardCon, x, y);
                        t.onSendCStart(x, j);
                    } else if (t.manualAutoBetBtn.active) { // 自动模式
                        t.onManualAuto(cardCon, x, j);
                    }
                });
                lineItem.addChild(cardItem);
            }
            mines.addChild(lineItem);
        }
    }  

    /**
     * 开牌
     */
    // 开牌函数
    openCard () {
        let num = 0;
        // 遍历所有卡牌
        for (let x = 0; x < 5; x++) {
            for (let j = 0; j < 5; j++) {
                let cardItem = this.mines.children[x].children[j];
                let cardItemCon = cardItem.getComponent("sl_Card");
                // 如果卡牌是普通类型
                if (cardItemCon.cardType == CardType.iconNormal) {
                    cardItemCon.init(this.minesArray[num]);
                    num++;
                } 
                // 如果卡牌是红色类型
                else if (cardItemCon.cardType == CardType.iconRed) {
                    let cardType = this.minesArray[num];
                    // 如果卡牌是金色类型
                    if (cardType == CardType.iconGold) {
                        cardItemCon.init(CardType.iconGoldPick);
                    } 
                    // 否则卡牌是爆炸类型
                    else {
                        cardItemCon.init(CardType.iconBoomPick);
                    }
                    num++;
                }
                
            }
        }
        // 设置下注按钮的标签为"Bet"
        this.betBtnLabel.string = "Bet";
        // 设置输入阻塞为非活动状态
        this.inputBlock.active = false;
        // 获取自动选择按钮的组件
        let btn = this.autoPickBtn.getComponent(cc.Button);
        // 设置按钮为不可交互状态
        btn.interactable = false;
        // 发送游戏消息
        clientKernel.sendGameMsg(subGameMSG.C_HISTORY, "");
    }
    
    /**
     * 合牌
     */
    closeCard () {
        clientKernel.sendGameMsg(subGameMSG.C_HISTORY, "");
        if (this.autoBeforArray.length > 0) {
            let i = 0;
            for (let x = 0; x < 5; x++) {
                for (let j = 0; j < 5; j++) {
                    let cardItem = this.mines.children[x].children[j];
                    let cardItemCon = cardItem.getComponent("sl_Card");
                    cardItemCon.init(this.autoBeforArray[i]);
                    i++;
                }
            }
            this.awardAni.active = false;
        }
    }

    /**
     * 自动开牌
     */
    autoOpenCard () {
        this.onXiazhu();
        let i = 0;
        // let isBoom = false;
        this.onMinesArray(0, 25);
        this.iconRedNum = 0;
        for (let x = 0; x < 5; x++) {
            for (let j = 0; j < 5; j++) {
                let cardItem = this.mines.children[x].children[j];
                let cardItemCon = cardItem.getComponent("sl_Card");
                if (cardItemCon.cardType == CardType.iconNormal) {
                    this.autoBeforArray[i] = CardType.iconNormal;
                    // cardItemCon.init(this.minesArray[i]);
                } else 
                if (cardItemCon.cardType == CardType.iconRed) {
                    this.onSendCStart(x, j);
                    this.autoBeforArray[i] = CardType.iconRed;
                    this.iconRedNum++;
                    // let cardType = this.minesArray[i];
                    // if (cardType == CardType.iconGold) {
                    //     cardItemCon.init(CardType.iconGoldPick);
                    // } else {
                    //     cardItemCon.init(CardType.iconBoomPick);
                    //     isBoom = true;
                    // }
                }
                i++;
            }
        }
        clientKernel.sendGameMsg(subGameMSG.C_CALC, "");
    }

    onChangeAuto (isBoom) {
        // let manualNum = Number(this.manualBaseInput.string)
        // let num = Number(this.totalMoney) - manualNum;
        let manualNum = Number(this.manualBaseInput.string); //改变下注金额
        if (!isBoom) { // 赢
            AudioControl.playWin();
            let awardNum = this.getAwardNum();
            this.awardLabel.string = awardNum.toFixed(2);
            // num = Number(awardNum) + num;
            this.awardAni.active = true;
            this.winNum = this.winNum - Number(awardNum) + manualNum;
            if (!this.autoWinAddNumToggle1.isChecked) {
                manualNum = manualNum * Number(this.autoWinAddNumInput.string) * 0.01 + manualNum;
            }
        } else { // 输
            this.loseNum = this.loseNum - manualNum;
            if (!this.autoFailAddNumToggle1.isChecked) {
                manualNum = manualNum * Number(this.autoFailAddNumInput.string) * 0.01 + manualNum;
            }
        }
        console.log("winString : " + this.autoWinNumInput.string);
        console.log("winNum : " + this.winNum);
        console.log("loseString : " + this.autoFailNumInput.string);
        console.log("loseNum : " + this.loseNum);
        if (this.autoWinNumInput.string > 0 && this.winNum <= 0) {
            console.log("win");
            this.onStopAuto();
        } else if (this.autoFailNumInput.string > 0 && this.loseNum <= 0) {
            console.log("lose");
            this.onStopAuto();
        }
        this.manualBaseInput.string = manualNum.toFixed(2);
    }

    /**
     * 倍数标黄
     */
    onPageView () {
        let pageView = this.betScaleNode.getComponent(cc.PageView);
        let pageNum = Math.ceil(this.minesArrayNum / 5) - 1;
        pageView.scrollToPage(pageNum)
        let targetPage = pageView.content.children[pageNum];
        console.log("pageNum : " + pageNum);
        let num = this.minesArrayNum % 5 - 1;
        if (num == -1) {
            num = 4;
        }
        console.log("num : " + num + pageNum + this.minesArrayNum);
        this.revertpage();
        if (pageNum >= 0) {
            console.log("lastPagechild");
            this.lastPagechild = targetPage.children[num];
            this.lastPagechild.color = cc.color(255, 200, 0); // 黄
        }
    }

    onSendCStart (x : number, y : number) {
        AudioControl.playClick();
        CStartData.idx = x + y * 5;
        clientKernel.sendGameMsg(subGameMSG.C_START, CStartData);
    }

    onNOXIAZHU () {
        AudioControl.playBet();
        let action1 = cc.rotateTo(.05, 5);
        let action2 = cc.rotateTo(.1, -5);
        let action3 = cc.rotateTo(.05, 0);
        // 串行执行三个动作
        let sequence1 = cc.sequence(action1, action2, action3); 
        // 重复执行三次sequence1，达到抖动的目的，然后delay3秒
        let sequence2 = cc.sequence(cc.repeat(sequence1, 3), cc.delayTime(3));
        // 重复执行sequence2，每间3秒抖动一次
        // this.node.runAction(cc.repeatForever(sequence2));
        this.betBtn.runAction(sequence2);
    }

    /**
     * 自动模式
     * @param cardCon card的component
     */
    onManualAuto (cardCon : any) {
        AudioControl.playClick();
        if (this.AutoBetBtnString.string == "Start") {
            console.log("cardType : " + cardCon.cardType);
            if (cardCon.cardType == CardType.iconNormal) {
                cardCon.init(CardType.iconRed);
                this.minesArrayNum++;
            } else {
                cardCon.init(CardType.iconNormal);
                this.minesArrayNum--;
            }
            this.onPageView();
        }
    }

    /**
     * X2
     */
    onBetUp () {
        AudioControl.playClick();
        let totalMoney = Number(this.totalMoney);
        if (totalMoney >= 1) {
            let manualBaseInput = Number(this.manualBaseInput.string);
            console.log(manualBaseInput + "," + totalMoney);
            if (manualBaseInput < totalMoney && manualBaseInput >= 1) {
                manualBaseInput = manualBaseInput * 2;
                if (manualBaseInput > totalMoney) {
                    console.log(">");
                    manualBaseInput = totalMoney;
                }
                this.manualBaseInput.string = manualBaseInput;
            } else if (manualBaseInput < 1) {
                this.manualBaseInput.string = 1;
            }
            this.redWarnBase.active = false;
        }
    }

    /**
     * /2
     */
    onBetDown () {
        AudioControl.playClick();
        if (this.totalMoney >= 1) { 
            if (this.manualBaseInput.string >= 1) {
                this.manualBaseInput.string = this.manualBaseInput.string / 2;
            }
            if (this.manualBaseInput.string < 1) {
                this.manualBaseInput.string = 1;
            }
            this.redWarnBase.active = false;
        }
    }

    /**
     * 普通模式游戏
     */
    onBet () {
        this.onSetData();
        let betNum = this.manualBaseInput.string;
        let numMoney = Number(this.totalMoney);
        console.log("totalMoney : " + numMoney + ", betNum : " + betNum);
        if (numMoney >= 1 && betNum >= 1 && !this.redWarnMines.active) {
            console.log("onBet1");
            let btn = this.autoPickBtn.getComponent(cc.Button);
            if (this.betBtnLabel.string == "Bet") { // 开始游戏
                AudioControl.playSartplay();
                AudioControl.playWin();
                console.log("开始游戏");
                this.onXiazhu();
                this.awardAni.active = false;
                console.log("onBet2");
                this.inputBlock.active = true;
                let num = Number(betNum);
                this.betBtnLabel.string = "CASHOUT\n" + num.toFixed(2);
                numMoney = numMoney - num;
                btn.interactable = true;
                this.betScaleNode.getComponent(cc.PageView).scrollToPage(0);
                this.onrevertCard();
                this.revertpage();
                this.changeMoney(numMoney);
            } else { // 结束游戏
                if (this.minesArrayNum > 0) {
                    clientKernel.sendGameMsg(subGameMSG.C_CALC, "");
                    AudioControl.playWin();
                    console.log("结束游戏");
                    this.awardAni.active = true;
                    this.betBtnLabel.string = "Bet";
                    this.inputBlock.active = false;
                    let awardNum = this.getAwardNum();
                    this.awardLabel.string = awardNum.toFixed(2);
                }
            }
        }
    }

    onStopFun (num : number) {
        if (num == -1) {
            let t = this;
            t.onStopAuto();
        }
    }

    onXiazhu () {
        this.initCXiazhuData();
        clientKernel.sendGameMsg(subGameMSG.C_XIAZHU, CXiazhuData);
    }

    onSetData () {
        this.initCSetData();
        clientKernel.sendGameMsg(subGameMSG.C_SET, CSetData);
    }

    /**
     * 开始自动模式游戏
     */
    onStartAuto () {
        AudioControl.playClick();
        let t = this;
        t.onSetData();
        let betNum = this.manualBaseInput.string;
        console.log("manualAutoBetBtn: " + this.AutoBetBtnString.string);
        if (this.totalMoney >= 1 && betNum >= 1 && this.lastPagechild != null && !this.redWarnMines.active) {
            this.inputBlock.active = true;
            this.toggleBlock.active = true;
            this.winNum = this.autoWinNumInput.string;
            this.loseNum = this.autoFailNumInput.string;
            if (this.AutoBetBtnString.string == "Start") {
                AudioControl.playSartplay();
                let roundNum = this.autoMaxRoundInput.string;
                if (roundNum > 0) {
                    roundNum--;
                    t.schedule(function () {
                        this.AutoBetBtnString.string = "STOP\n" + roundNum--;
                        t.autoOpenCard();
                        console.log("stop" + roundNum);
                        setTimeout(function () {
                            t.closeCard();
                            t.onStopFun(roundNum);
                        }, 3000);
                    }, 6, roundNum, 0.1);
                } else {
                    console.log("∞");
                    this.AutoBetBtnString.string = "STOP\n∞";
                    t.schedule(function () {
                        t.autoOpenCard();
                        setTimeout(function () {
                            t.closeCard();
                        }, 2000);
                    }, 4);
                }
            } else { //结束游戏
                this.onStopAuto();
                AudioControl.playClick();
            }
        }
    }

    onStopAuto () {
        let t = this;
        t.inputBlock.active = false;
        this.toggleBlock.active = false;
        t.AutoBetBtnString.string = "Start";
        setTimeout(function () {
            t.closeCard();
        }, 3000);
        t.unscheduleAllCallbacks();
    }

    /**
     * 还原倍数页
     */
    revertpage () {
        if (this.lastPagechild != null) {
            this.lastPagechild.color = cc.color(112, 94, 226);
            console.log("revertpage");
        }
    }

    /**
     * 获取赢时金额
     * @returns 赢时金额
     */
    getAwardNum () : Number {
        let s = this.lastPagechild.children[0].getComponent(cc.Label).string;
        let num = s.slice(0, s.length - 1);
        return num * this.manualBaseInput.string;
    }

    // setMinesArray () {
    //     let minesNum = this.minesLabel.string;
    //     let minesArray = [];
    //     for (let x = 0; x < minesNum - 1; x++) {
    //         minesArray[x] = CardType.iconBoom;
    //     }
    //     for (let x = minesNum - 1; x < 24 - this.minesArrayNum; x++) {
    //         minesArray[x] = CardType.iconGold;
    //     }
    //     minesArray.sort(function() { 
    //         return 0.5 - Math.random(); 
    //     });
    //     this.minesArray = minesArray;
    // }

    onMinesArray (minesX : number, arrayY : number) {
        console.log("onMinesArray : " + minesX, arrayY);
        let minesNum = this.minesLabel.string;
        let minesArray = [];
        for (let x = 0; x < minesNum - minesX; x++) {
            minesArray[x] = CardType.iconBoom;
        }
        for (let x = minesNum - minesX; x < 25 - arrayY - minesX; x++) {
            minesArray[x] = CardType.iconGold;
        }
        minesArray.sort(function() { 
            return 0.5 - Math.random(); 
        });
        this.minesArray = minesArray;
    }

    /**
     * 洗牌
     */
    onrevertCard () {
        // this.setMinesArray();
        this.minesArrayNum = 0;
        this.onCardNormal();
    }

    /**
     * 所有卡牌恢复原样
     */
    onCardNormal () {
        for (let x = 0; x < 5; x++) {
            for (let j = 0; j < 5; j++) {
                let cardItem = this.mines.children[x].children[j];
                let cardItemCon = cardItem.getComponent("sl_Card");
                cardItemCon.init(CardType.iconNormal);
            }
        }
    }

    scrollToLeft (): void {
        let pageView = this.betScaleNode.getComponent(cc.PageView);
        let pageviewNum = pageView.getCurrentPageIndex();
        console.log("pageviewNum : " + pageviewNum);
        if (pageviewNum > 0) {
            pageView.scrollToPage(pageviewNum - 1);
        }
    }

    scrollToRight () {
        let pageView = this.betScaleNode.getComponent(cc.PageView);
        let pageviewNum = pageView.getCurrentPageIndex();
        console.log("pageviewNum : " + pageviewNum);
        if (pageviewNum < Math.ceil(this.oddsData.length / 5) ) {
            pageView.scrollToPage(pageviewNum + 1);
        }
    }

    /**
     * 普通模式下的自动选择
     */
    onAutoPick () {
        AudioControl.playClick();
        let x = Math.floor(Math.random() * 5);
        let y = Math.floor(Math.random() * 5);
        let cardItem = this.mines.children[x].children[y];
        let cardItemCon = cardItem.getComponent("sl_Card");
        if (cardItemCon.cardType == CardType.iconNormal) {
            // this.onNormal(cardItemCon, x + y * 5);
            this.onSendCStart(x, y);
        } else {
            this.onAutoPick();
        }
    }

    onWinChange () {
        if (this.autoWinAddNumToggle1.isChecked) {
            this.autoWinAddNumInput.string = ""; // 数据重置
        }
    }

    onFailChange () {
        if (this.autoFailAddNumToggle1.isChecked) {
            this.autoFailAddNumInput.string = ""; // 数据重置
        }
    }

    onEventGameMessage(subCMD, data) {
        console.log('游戏消息事件', subCMD, data);
        switch (subCMD) {
            case subGameMSG.S_CALC:{
                console.log('结算', JSON.stringify(data));
                this.initSCalcData(data);
            }
            break;
            case subGameMSG.S_SET:{
                console.log('参数变更', JSON.stringify(data));
                this.initSSetData(data);
            }
            break;
            case subGameMSG.S_XIAZHU:{
                console.log('下注回调', JSON.stringify(data));
                this.initSXiazhuData(data);
            }
            break;
            case subGameMSG.S_ERR:{
                console.log('错误提示', JSON.stringify(data));
                this.initSErrorCodeData(data);
            }
            break;
            case subGameMSG.S_HISTORY:{
                console.log('历史记录', JSON.stringify(data));
                this.initSHistoryData(data);
            }
            break;
        }
    }

    onEventSceneMessage(gameStatus, data) {
        let t = this;
        console.log('场景消息事件', gameStatus, data);
        this.initSSceneData(data);
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

    initSSceneData (data) {
        this.initSSetData(data);
        this.initSXiazhuData(data);
        this.minesArrayNum = data["bets"].length;
        data["allWins"];
    }

    // 初始化计算数据
    initSCalcData (data) {
        // 设置雷的数量
        this.minesArrayNum = data["bets"].length;
        // 计算卡牌的位置
        let x = data["idx"] % 5;
        let y = Math.floor(data["idx"] / 5);
        // 获取卡牌对象
        let cardItem = this.mines.children[x].children[y];
        let cardItemCon = cardItem.getComponent("sl_Card");
        // 获取赢的金额
        let win = data["win"];
        // 如果赢的金额小于0，表示输了
        if (win < 0) {
            cardItemCon.init(CardType.iconBoomPick);
            // 播放爆炸音效
            AudioControl.playBlow();
        } else {
            // 如果赢的金额大于0，表示赢了
            cardItemCon.init(CardType.iconGoldPick);
            // 更新赢的金额显示
            this.betBtnLabel.string = "CASHOUT\n" + data["win"].toFixed(2);
        }
        // 如果是最后一次，更新分数和状态
        if (data["final"]) {
            this.changeMoney(data["score"]);
            if (win < 0) { //输
                this.onMinesArray(1, this.minesArrayNum -1);
            } else {
                this.onMinesArray(0, this.minesArrayNum);
            }
            // 开牌
            this.openCard();
            // 如果是自动下注，更新状态
            if (this.manualAutoBetBtn.active) {
                this.onChangeAuto(win < 0);
                this.minesArrayNum = this.iconRedNum;
            }
        }
        // 更新页面视图
        this.onPageView();
        // 更新所有赢的金额
        data["allWins"];
    }

    initSSetData (data) {
        this.manualAutoBetBtn.active = data["autoStart"];
        this.autoFailNumInput.string = data["lossOver"];
        this.autoWinNumInput.string = data["winOver"];
        this.autoFailAddNumInput.string = data["lossInr"];
        this.autoWinAddNumInput.string = data["winInc"];
    }

    initSXiazhuData (data) {
        if (1 > data["difen"]) {
            this.manualBaseInput.string = 1; // 默认
        } else {
            this.manualBaseInput.string = data["difen"];
        }
        if (data["lei"] == 0) {
            this.minesLabel.string = 4; // 默认
        } else {
            this.minesLabel.string = data["lei"];
        }
    }

    initSErrorCodeData (data) {
        let code = data["code"];
        switch (code) {
            case ERRCODE.PARAMERR : {
                console.log('参数错误', JSON.stringify(data));
            }
            break;
            case ERRCODE.NOXIAZHU : {
                console.log('未下注', JSON.stringify(data));
                this.onNOXIAZHU();
            }
            break;
            case ERRCODE.OPEND : {
                console.log('已经翻过这个雷', JSON.stringify(data));
            }
            break;
        }
    }

    initSHistoryData (data) {
        let history = this.history;
        let item = cc.instantiate(this.historyitem)
        let content = item.children[0];
        let lastData = data[0];
        content.getChildByName("time").children[0].getComponent(cc.Label).string = formatData(lastData["time"], "yyyy-MM-dd HH:mm:ss");
        content.getChildByName("id").children[0].getComponent(cc.Label).string = lastData["time"];
        content.getChildByName("mines").children[0].getComponent(cc.Label).string = lastData["lei"];
        content.getChildByName("bets").children[0].getComponent(cc.Label).string = lastData["difen"];
        let winNum = lastData["win"].toFixed(2);
        content.getChildByName("status").children[0].getComponent(cc.Label).string = winNum;
        if (winNum > 0) {
            content.getChildByName("status").children[0].color = cc.color(0, 255, 0);
        }
        history.insertChild(item, 1);
        this.totalXiazhu = this.totalXiazhu + lastData["difen"];
    }

    initCSetData () {
        CSetData.lossOver = this.autoFailNumInput.string;
        CSetData.winOver = this.autoWinNumInput.string;
        CSetData.lossInr = this.autoFailAddNumInput.string;
        CSetData.winInc = this.autoWinAddNumInput.string;
        CSetData.autoStart = this.manualAutoBetBtn.active;
    }

    initCXiazhuData () {
        CXiazhuData.difen = this.manualBaseInput.string;
        CXiazhuData.lei = this.minesLabel.string;
    }

    changeMoney (num) {
        this.totalMoney = num;
        this.totalMoneyString.string = GameTools.convertInfo(this.totalMoney);
    }
}
