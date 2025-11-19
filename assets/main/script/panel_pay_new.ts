/**
 * 商城页面
 */

import Utils, { KWAI_EVENT_TYPES } from "../../kernel/Core/extend/Utils";
import { i18nMgr } from "../../kernel/i18n/i18nMgr";
import { AudioControl } from "./AudioControl";
import { ExternGameModule } from "./ExternGame";
import { EM_DISPLAY_TYPE, EM_PAY_TYPE, GameData } from "./GameData";
import panel_pay_new_cash from "./panel_pay_new_cash";
import panel_pay_new_rechargeItem from "./panel_pay_new_rechargeItem";

const { ccclass, property } = cc._decorator;



@ccclass
export default class panel_user_new extends cc.Component {

    @property(cc.Node)
    rechargeNode: cc.Node = null;
    @property(cc.Node)
    cashNode: cc.Node = null;
    @property(cc.Node)
    rechargeContainerNode: cc.Node = null;
    @property(cc.Node)
    toggleContainerNode: cc.Node = null;
    @property(cc.Node)
    rechargeToggleNodes: cc.Node[] = [];


    @property(cc.Node)
    parentNode_score: cc.Node = null;

    @property(cc.Label)
    rechargeCount: cc.Label = null;

    @property(cc.EditBox)
    editboxChargeAmount: cc.EditBox = null;

    @property(cc.Label)
    extraCount: cc.Label = null;

    @property(cc.Prefab)
    pay_item: cc.Prefab = null;

    @property(cc.EditBox)  //身份证
    cpfId: cc.EditBox = null;
    @property(cc.Node)
    chargeRecordNode: cc.Node = null;
    @property(cc.Node)
    chargeRecordScrollView: cc.Node = null;

    public pay_itemData: any = null;
    public firstFiveTimesCharge: number = 0;

    public displayType: EM_DISPLAY_TYPE = EM_DISPLAY_TYPE.NORMAL;

    private WebExternGame: ExternGameModule.ExternGame = null;

    //服务器返回的支付列表
    m_payList: any = undefined;
    m_curPayType: string = "pay1";


    //onLoad () {}

    start() {
        this.WebExternGame = new ExternGameModule.ExternGame();
        this.m_payList = undefined;
        this.m_curPayType = "pay1";

        NetHelp.getDailyRecharge(this.refreshChargeTimes.bind(this));
        let btnS = this.rechargeContainerNode.getComponentsInChildren(cc.Toggle);
        for (let i = 0; i < btnS.length; i++) {
            btnS[i].node.on(cc.Node.EventType.TOUCH_END, this.btnOnClick, this);
        }
        let toggleBtns = this.toggleContainerNode.getComponentsInChildren(cc.Toggle);
        for (let i = 0; i < toggleBtns.length; i++) {
            toggleBtns[i].node.on(cc.Node.EventType.TOUCH_END, this.togglebtnOnClick, this);
        }
        this.extraCount.node.parent.active = false;

        if (this.displayType == EM_DISPLAY_TYPE.PAY
            || this.displayType == EM_DISPLAY_TYPE.NORMAL) {
            this.cashNode.active = false;
            this.rechargeNode.active = true;
            this.toggleContainerNode.getChildByName("Cash").getComponent(cc.Toggle).isChecked = false;
            this.toggleContainerNode.getChildByName("Recharge").getComponent(cc.Toggle).isChecked = true;
        } else if (this.displayType == EM_DISPLAY_TYPE.CASH) {
            this.cashNode.active = true;
            this.rechargeNode.active = false;
            this.toggleContainerNode.getChildByName("Cash").getComponent(cc.Toggle).isChecked = true;
            this.toggleContainerNode.getChildByName("Recharge").getComponent(cc.Toggle).isChecked = false;
        }

        this.chargeRecordNode.getChildByName("close").getComponent(cc.Button).node.on(cc.Node.EventType.TOUCH_END, () => {
            AudioControl.playClick();
            this.chargeRecordNode.active = false;
        });
        this.chargeRecordNode.active = false;
        // 自动填充cpf
        // this.cpfId.string = KernelData.bankaccount?.cpf || "";
        //    //this.editboxChargeAmount.string = Math.max(5, Math.min(20000, parseInt(this.editboxChargeAmount.string))).toString();
        //     this.editboxChargeAmount.node.on('text-changed', (event) => {
        //         let value = Math.floor(event.string);
        //         if (isNaN(value) || value < 5 || value > 20000) {
        //             value = 5;
        //         }
        //         this.editboxChargeAmount.string = value.toString();
        //     });
    }

    //by_009:按钮点击事件
    btnOnClick(event) {
        AudioControl.playClick();
        switch (event.currentTarget.name) {
            case "pay1"://
                this.m_curPayType = "pay1";
                this.refresh(null);
                break
            case "pay2"://
                this.m_curPayType = "pay2";
                this.refresh(null);
                break
            case "pay3"://

                break
            case "pay4"://

                break
        }
    }
    //by_009:按钮点击事件
    togglebtnOnClick(event) {
        AudioControl.playClick();
        this.rechargeNode.active = false;
        this.cashNode.active = false;
        switch (event.currentTarget.name) {
            case "Recharge"://
                this.rechargeNode.active = true;
                break
            case "Cash"://
                this.cashNode.active = true;
                break
        }
    }

    changeToCash() {
        this.cashNode.active = true;
        this.rechargeNode.active = false;
        this.toggleContainerNode.getChildByName("Cash").getComponent(cc.Toggle).isChecked = true;
        this.toggleContainerNode.getChildByName("Recharge").getComponent(cc.Toggle).isChecked = false;
    }

    refresh(ret) {
        if (ret != null && ret != undefined) {
            this.m_payList = ret;
        }
        if (this.m_payList == undefined) return;

        console.log("====payList===", this.m_payList)
        if (this.m_payList.length <= 0) return;

        //先清空parentNode_score的子节点
        this.parentNode_score.removeAllChildren();

        for (let i = 0; i < this.m_payList.length; i++) {
            let data: any = this.m_payList[i];
            if (data.payType != this.m_curPayType) continue;

            data.firstFiveTimesCharge = this.firstFiveTimesCharge;
            let comp = cc.instantiate(this.pay_item).getComponent(panel_pay_new_rechargeItem);
            comp.initItemUI(data);
            switch (data.type) {
                case "score":
                    this.parentNode_score.addChild(comp.node);
                    break;
            }
        }
        let pay_items = this.parentNode_score.getComponentsInChildren(cc.Button);
        for (let i = 0; i < pay_items.length; i++) {
            pay_items[i].node.on(cc.Node.EventType.TOUCH_END, this.pay_itembtnOnClick, this);
        }
    }

    /** 刷新充值记录按钮 */
    onRefreshChargeRecordBtn() {
        NetHelp.getChargeRecord("charge", this.refreshRecord.bind(this));
    }
    /** 刷新提现记录按钮 */
    onRefreshWithdrawRecordBtn() {
        NetHelp.getChargeRecord("withdraw", this.refreshRecord.bind(this));
    }
    /** 刷新充值记录 */
    refreshRecord(ret) {
        let scrollViewNode = this.chargeRecordScrollView;

        for (let i = 0; i < scrollViewNode.children.length; i++) {
            scrollViewNode.children[i].active = false;;
        }

        if (ret == null || ret == undefined) {
            return;
        }
        console.log("====refreshRecord===", ret.data);
        let childItem: cc.Node = scrollViewNode.children[0]; //scrollViewNode.getChildByName("item");
        for (let i = 0; i < ret.data.length; i++) {
            let record: any = ret.data[i];
            let child = scrollViewNode.children[i];
            if (!child) {
                child = cc.instantiate(childItem); 
                scrollViewNode.addChild(child);
            }
            //时间戳转换为印度时间
            let timestamp = record.createdAt;
            let date = new Date(timestamp * 1000);
            child.getChildByName("time").getComponent(cc.Label).string = date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            child.getChildByName("amount").getComponent(cc.Label).string = record.amount;
            let statusString: string = ""; 
            if (record.status == 1) {//玩家发起申请
                statusString = "Apply";
            } else if (record.status == 2) {//拒绝
                statusString = "Reject";
            } else if (record.status == 3) {//忽略
                statusString = "Ignore";
            } else if (record.status == 4) {//支付中
                statusString = "Paying";
            } else if (record.status == 5) {//支付成功
                statusString = "Success";
            } else if (record.status == 6) {//支付失败
                statusString = "Fail";
            }
            child.getChildByName("state").getComponent(cc.Label).string = statusString;
            child.active = true;
        }

        this.chargeRecordNode.active = true;
        this.chargeRecordScrollView.height = ret.data.length * childItem.height;
    }

    refreshChargeTimes(ret) {
        console.log("====refreshChargeTimes===", ret);
        if (ret.firstFiveTimesCharge) {
            this.firstFiveTimesCharge = ret.firstFiveTimesCharge;
        }
        NetHelp.getShop(this.refresh.bind(this));
    }

    pay_itembtnOnClick(event) {
        AudioControl.playClick();
        console.log("event.currentTarget== ", event.currentTarget.getComponent(panel_pay_new_rechargeItem).getItemInfo());
        this.pay_itemData = event.currentTarget.getComponent(panel_pay_new_rechargeItem).getItemInfo();
        if ((this.pay_itemData.cnt == 50 || this.pay_itemData.cnt == 100) && this.firstFiveTimesCharge <= 5) {
            this.extraCount.node.parent.active = true;
            this.extraCount.string = this.pay_itemData.givePercent * this.pay_itemData.cnt / 100 + '';
        } else {
            this.extraCount.node.parent.active = false;
        }
        this.rechargeCount.string = this.pay_itemData.cnt;
        //this.editboxChargeAmount.string = this.pay_itemData.cnt;
    }

    /** 充值按钮 */
    rechargeOnClick() {
        if (!KernelData.mail && !KernelData.mobile) {
            UIHelper.MessageBox(i18nMgr._getLabel("bind before recharge", []), () => { });
            return;
        }

        //let cpfId = this.cpfId.string;
        //if (!panel_pay_new_cash.checkCPF(cpfId)) return;

        if (this.pay_itemData == null) return;
        UIHelper.showWaitLayer(true);
        NetHelp.buyShop(this.pay_itemData.goodID, this.pay_itemData.buyTypeId, 'XDpay', this.pay_itemData.type, (ret) => {
            UIHelper.showWaitLayer(false);
            console.log("====ret===", ret)
            let { code, info } = ret;
            if (code != 0 && info) {
                UIHelper.showTips(i18nMgr._getLabel("recharge error", []) + " " + code);
                return;
            }
            let url = "";
            if (GameData.Instance.payType == EM_PAY_TYPE.payone) {
                url = ret.data.data.payContent;
            } else {
                url = ret.data.data.data.pay_url;
            }

            this.WebExternGame.init({ base_url: url }, true, false);
            // 唤醒支付 
            Utils.Instance.AdjustEvent(Utils.Instance.getAdjustEvent().Rouse, 0);
            Utils.Instance.sendKwaiEvent(KWAI_EVENT_TYPES.EVENT_INITIATED_CHECKOUT);
            Utils.Instance.FBTrace("Pay");

            // GD.GameTool.createPanel("hall/panel/panel_player_yinsi",(node)=>{
            //     node.getComponent("panel_player_yinsi").URL = url;
            // });
            // cc.sys.openURL(url)

            //UIHelper.showTips("購買成功");
            AudioControl.playFinish();
        })
    }

    onClickClose() {
        this.node.destroy();
    }


    // update (dt) {}
}
