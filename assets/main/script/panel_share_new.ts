/**
 * 商城页面
 */

import { share_url, share_url_test } from "../../kernel/Core/extend/ConstDefine";
import { i18nMgr } from "../../kernel/i18n/i18nMgr";
import { AudioControl } from "./AudioControl";
import { EM_BONUS_TYPE, EM_DISPLAY_TYPE } from "./GameData";
import panel_pay_new from "./panel_pay_new";
import panel_pay_new_rechargeItem from "./panel_pay_new_rechargeItem";

const { ccclass, property } = cc._decorator;

declare var FB: any;

@ccclass
export default class panel_share_new extends cc.Component {


    @property(cc.Node)
    rewardBtnNodeList: cc.Node[] = [];


    @property(cc.Node)
    boxesNode: cc.Node = null;

    @property(cc.Node)
    helpNode: cc.Node = null;

    @property(cc.ProgressBar)
    reward_progressBar: cc.ProgressBar = null;

    @property(cc.Label)
    bonusStr: cc.Label = null;

    @property(cc.Label)
    shareUrl: cc.Label = null;

    _displayKeys: any = null;
    _inviteeRewardsRewardConfig: any = null;

    public pay_itemData: any = null;
    private referralConfigData: any = {}
    bindObj = [];

    start() {
        this.loadFacebookSDK().then(() => {
            this.initFacebookSDK();
        })

        NetHelp.getReferralConfig(this.refresh.bind(this));
        let btnS = this.boxesNode.getComponentsInChildren(cc.Button);
        for (let i = 0; i < btnS.length; i++) {
            btnS[i].node.on(cc.Node.EventType.TOUCH_END, this.btnOnClick, this);
        }
        this.bindEvent();
        this.bonusStr.string = "₹" + KernelData.referralAmount;
        //this.shareUrl.string = share_url+KernelData.userID;
        this.shareUrl.string = share_url_test + KernelData.userID;
        this.helpNode.active = false;
    }

    loadFacebookSDK() {
        return new Promise((resolve) => {
            var script = document.createElement('script');
            script.src = 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v15.0&appId=910506179990403&autoLogAppEvents=1';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    initFacebookSDK() {
        if (typeof FB === 'undefined') {
            cc.error('These services are based on the Facebook SDK for JavaScript. ' +
                'You should load https://connect.facebook.net/en_US/all.js before using the FB API.');
        };
        FB.init({
            appId: '910506179990403',
            autoLogAppEvents: true,
            status: true,
            xfbml: true,
            version: 'v17.0'
        });
    }


    bindEvent() {
        this.bindObj = [];
        this.bindObj.push(onfire.on("S_USER_PROP_CHANGED", this.onS_USER_PROP_CHANGED.bind(this)));
    }

    onS_USER_PROP_CHANGED(data) {
        console.log("share玩家属性变化通知", JSON.stringify(data));
        let i = 0; let j = 0; let totalRewards = 0;
        let curRewards = KernelData.invitees.length || 0;
        //"inviteeRewards": {
        //     "2": true,
        //     "3": true
        // }
        if ("inviteesRechargeTaskRewards" in data) {
            KernelData.inviteesRechargeTaskRewards = data.inviteesRechargeTaskRewards;
            this.initReward(this._inviteeRewardsRewardConfig);
            // for (var k in this.referralConfigData) {
            //     let rewardItem = this.rewardBtnNodeList[i];
            //     totalRewards = Number(k);
            //     let share = rewardItem.getChildByName("share");
            //     if (Number(k) > curRewards) {
            //         share.getChildByName("label").getComponent(cc.Label).string = curRewards + "/" + totalRewards;
            //     } else {
            //         share.getChildByName("label").getComponent(cc.Label).string = k + "/" + totalRewards;
            //     }
            //     i++;
            // }
            // this.reward_progressBar.progress = curRewards / totalRewards;
        }
        if ("inviteesRechargeTask" in data) {
            KernelData.inviteesRechargeTask = data.inviteesRechargeTask;
            this.initReward(this._inviteeRewardsRewardConfig);
        }
    }

    //by_009:按钮点击事件
    btnOnClick(event) {
        AudioControl.playClick();
        switch (event.currentTarget.name) {
            case "box1"://
                console.log("click box1");
                this.withDrawOnClick(this._displayKeys && this._displayKeys[0]);
                break
            case "box2"://
                console.log("click box2");
                this.withDrawOnClick(this._displayKeys && this._displayKeys[1]);
                break
            case "box3"://
                console.log("click box3");
                this.withDrawOnClick(this._displayKeys && this._displayKeys[2]);
                break
            case "box4"://
                console.log("click box4");
                this.withDrawOnClick(this._displayKeys && this._displayKeys[3]);
            case "btn_fb":
                // if (typeof FBInstant === 'undefined') return;
                // FBInstant.shareAsync({
                //     intent: 'SHARE',
                //     image: '',
                //     text: share_url_test +"userid="+KernelData.userID,
                //     data: {myReplayData: '...'},
                // }).then(() => {
                //     // continue with the game.
                // });
                if (typeof FB === 'undefined') return;
                FB.ui({
                    method: 'share',
                    href: share_url_test + "userid=" + KernelData.userID,   //'https://developers.facebook.com/docs/',
                }, (response) => {
                    console.log(response);
                    UIHelper.showTips(i18nMgr._getLabel("Share successes", []) + JSON.stringify(response));//分享成功
                });
                break
        }
    }
    //by_009:按钮点击事件
    togglebtnOnClick(event) {
        AudioControl.playClick();

    }

    refresh(ret: any) {
        if (ret && ret.code == 0) {
            this.referralConfigData = ret.data;
            this.initReward(ret.data);
        }
    }

    onShareBtnClick() {
        AudioControl.playClick();
        if (typeof FB === 'undefined') return;
        FB.ui({
            method: 'share',
            href: share_url_test + "userId=" + KernelData.userID,
        }, (response) => {
            console.log(response);
            UIHelper.showTips(i18nMgr._getLabel("Share successes", []) + JSON.stringify(response));//分享成功
        });
    }

    // {3: 3, 10: 10, 20: 15, 40: 30, 60: 50, 100: 100, 500: 750, 1000: 1200};
    // 奖励规则是到达指定人数，就可以领取相应的奖励，不是累计的
    initReward(data) {
        let inviteeRewards = KernelData.inviteeRewards || {};
        let invitees = KernelData.invitees;
        let i = 0; let j = 0; let totalRewards = 0;
        let inviteePerson = invitees.length || 0;
        this._inviteeRewardsRewardConfig = data;
        let dataKeys = Object.keys(data);
        let displayKeys = dataKeys.slice(0, 4);
        if (inviteeRewards[displayKeys[0]] && inviteeRewards[displayKeys[1]] && inviteeRewards[displayKeys[2]] && inviteeRewards[displayKeys[3]]) {
            displayKeys = dataKeys.slice(4, 8);
        }
        this._displayKeys = displayKeys;
        for (let k of displayKeys) {
            let rewardItem = this.rewardBtnNodeList[i];
            totalRewards = Number(k);
            let share = rewardItem.getChildByName("share");
            rewardItem.getChildByName("label_gold").getComponent(cc.Label).string = "₹" + data[k];
            if (Number(k) > inviteePerson) {
                share.getChildByName("label").getComponent(cc.Label).string = inviteePerson + "/" + totalRewards;
            } else {
                share.getChildByName("label").getComponent(cc.Label).string = k + "/" + totalRewards;
            }
            i++;
        }
        for (let k of displayKeys) {
            if (inviteeRewards.hasOwnProperty(k)) {
                let rewardItem = this.rewardBtnNodeList[j];
                rewardItem.getChildByName("box02").active = inviteeRewards[k];
                j++;
            }
        }
        
        let rewardAmounts = data;//{3: 3, 10: 10, 20: 15, 40: 30, 60: 50, 100: 100, 500: 750, 1000: 1200};
        let bonus = 0;
        for (let k in rewardAmounts) {
            if (inviteePerson >= Number(k) && !inviteeRewards[k]) {
                bonus += rewardAmounts[k];
            }
        }
        this.bonusStr.string = "₹" + (bonus + KernelData.referralAmount);
        
        let progress = 0;
        for (let k of displayKeys) {
            if (inviteePerson >= Number(k)) {
                progress += 0.25;
            } else {
                break;
            }
        }
        this.reward_progressBar.progress = progress;
    }

    withDrawOnClick(index) {
        NetHelp.getReferralReward(index, (ret) => {
            let { code, info } = ret;
            if (code != 0 && info) {
                UIHelper.showTips(info);
                return;
            }
            console.log("ret==", ret)
            // this.bonusStr.string = "₹" + ((Number(index) / 2) * 10 + KernelData.referralAmount);
            // if (this.rewardBtnNodeList && this.rewardBtnNodeList[index / 2 - 1]) {
            //     this.rewardBtnNodeList[index / 2 - 1].getChildByName("box02").active = true;
            // }
        })
    }

    // 点击转化推荐奖励
    onConvertReferralRewardBtnClick() {
        AudioControl.playClick();
       if (KernelData.referralAmount <= 0) {
            return;
       }
       NetHelp.convertReferralReward(EM_BONUS_TYPE.SCORE, (ret) => {
            let { code, info } = ret;
            if (code != 0 && info) {
                UIHelper.showTips(info);
                return;
            }
            console.log("ret==", ret)
            // 提示转换奖励为积分成功
            UIHelper.showTips(i18nMgr._getLabel("Convert referral reward success", []));
        });
    }

    // 点击提现按钮
    onWithdrawBtnClick() {
        AudioControl.playClick();
        NetHelp.convertReferralReward(EM_BONUS_TYPE.CASH, (ret) => {
            let { code, info } = ret;
            if (code != 0 && info) {
                UIHelper.showTips(info);
                return;
            }
            console.log("ret==", ret)
            GD.GameTool.createPanel("hall/panel/panel_pay_new", (node) => {
                node.getComponent(panel_pay_new).displayType = EM_DISPLAY_TYPE.CASH;
                //node.getComponent(panel_pay_new).changeToCash();
            });
        });
    }

    toCashOnClick() {
        AudioControl.playClick();
        GD.GameTool.createPanel("hall/panel/panel_pay_new", (node) => {
            node.getComponent(panel_pay_new).displayType = EM_DISPLAY_TYPE.CASH;
            //node.getComponent(panel_pay_new).changeToCash();
        });
    }

    copyBtnOnClick() {
        //let url = share_url+"?userid="+KernelData.userID;
        AudioControl.playClick();
        let url = share_url_test + "userid=" + KernelData.userID;
        GD.GameTool.copyTextToClipboard(url)
    }

    onDestroy() {
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i])
        }
    }

    onHelpClick() {
        AudioControl.playClick();
        this.helpNode.active = true;
    }
    onHelpCloseClick() {
        AudioControl.playClick();
        this.helpNode.active = false;
    }

    onClickClose(){
        this.node.destroy();
    }
}
