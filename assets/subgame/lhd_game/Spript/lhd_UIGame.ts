import { lhd_SubGameMSG } from "../GameData/lhd_SubGameMSG";
import { lhd_GameConfig } from "./lhd_GameConfig";
import { lhd_GameData } from "./lhd_GameData";
import lhd_GameLogic from "./lhd_GameLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class lhd_UIGame extends cc.Component {
 
    @property(cc.Label)
    lbl_areaBet: cc.Label[] = [];
    @property(cc.Label)
    lbl_myAreaBet: cc.Label[] = [];
    @property(cc.Node)
    top6Player: cc.Node[] = [];
    @property(cc.Node)
    btn_Alljetton: cc.Node[] = [];
    @property(cc.Node)
    btn_jetton: cc.Node = null;
    @property(cc.Node)
    jetton_100: cc.Node[] = [];
    @property(cc.Node)
    jetton_500: cc.Node[] = [];
    @property(cc.Node)
    jetton_2000: cc.Node[] = [];
    @property(cc.Node)
    jetton_5000: cc.Node[] = [];
    @property(cc.Node)
    jetton_10000: cc.Node[] = [];
    @property(cc.Node)
    jetton_50000: cc.Node[] = [];
    @property(cc.Node)
    jetton_long: cc.Node[] = [];
    @property(cc.Node)
    jetton_he: cc.Node[] = [];
    @property(cc.Node)
    jetton_hu: cc.Node[] = [];
    @property(cc.SpriteAtlas)
    atl: cc.SpriteAtlas = null;
    @property(cc.Node)
    setatl: cc.Node = null;
    @property(cc.Node)
    startFapai: cc.Node = null;
    @property(cc.Node)
    stopFapai: cc.Node = null;
    @property(cc.Sprite)
    donwList: cc.Sprite = null;
    @property(cc.Sprite)
    xiahzuOrkaij: cc.Sprite = null;
    @property(cc.Label)
    countDown: cc.Label = null;
    @property(cc.Node)
    uiBet: cc.Node = null;
    @property(cc.Node)
    top6_uiBet: cc.Node = null;
    New_betToUser: number = 0;
    top6UserLocation: cc.Vec2[] = [];
    @property(cc.SpriteAtlas)
    cardAtl: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas)
    cardbeimian: cc.SpriteAtlas = null;
    @property(cc.Sprite)
    long_guang: cc.Sprite = null;
    @property(cc.Sprite)
    he_guang: cc.Sprite = null;
    @property(cc.Sprite)
    hu_guang: cc.Sprite = null;
    @property(cc.Node)
    leftCard: cc.Node = null;
    @property(cc.Node)
    rightCard: cc.Node = null;
    @property(cc.Node)
    corede: cc.Node = null;
    @property(cc.Prefab)
    caredfab: cc.Prefab = null;
    @property(cc.Prefab)
    bankerInfofab: cc.Prefab = null;
    @property(cc.Prefab)
    userAllInfo: cc.Prefab = null;
    @property(cc.Node)
    showAllUserInfo: cc.Node = null;
    @property(cc.Node)
    showAllUser_node: cc.Node = null;
    @property(cc.Node)
    showAllUser: cc.Node = null;
    @property(cc.Prefab)
    top6userAllInfo_pfb: cc.Prefab = null;
    @property(cc.Node)
    showTop6AllUserInfo: cc.Node[] = [];
    @property(cc.Node)
    top6UserInfo: cc.Node = null;
    @property(cc.Node)
    bankerInfo: cc.Node = null;
    @property(cc.Node)
    bankerNode: cc.Node = null;
    @property(cc.Node)
    bankerName: cc.Node = null;
    @property(cc.Node)
    bankerMoney: cc.Node = null;
    @property(cc.Node)
    villageMaskNode: cc.Node = null;
    @property(cc.Label)
    villageCount: cc.Label = null;
    @property(cc.Sprite)
    villageVip: cc.Sprite = null;
    @property(cc.Node)
    bankerRusultMoney: cc.Node = null;
    @property(cc.Node)
    bankerRusultJianMoney: cc.Node = null;
    @property(cc.Node)
    top6ScoreNodes: cc.Node = null;
    @property(cc.Node)
    village_rtate: cc.Node = null;
    @property(cc.Node)
    betRemind: cc.Node = null;
    isYN_Remind: number = 0;
    isVillage: number = 0;
    betay: any[] = [];
    num_long: number = 0;
    num_he: number = 0;
    num_hu: number = 0;
    isShut: number = 0;
    isshuts: number = 0;
    jetton_numCount: number[] = [0, 0, 0];
    num: number = 0;
    @property(cc.Node)
    gainNode: cc.Node = null;
    @property(cc.Node)
    allgainNode: cc.Node = null;

    @property(cc.Node)
    top6gainNode: cc.Node = null;
    
    @property(cc.Node)
    allNode: cc.Node = null;
    index: number = 0;
    // @property(cc.Node)
    // pop: cc.Node = null;
    // @property(cc.Node)
    // pop1: cc.Node = null;
    top0Score: number = 0;
    top3Score: number = 0;
    is_xutou: number = 0;
    igameStatus: number = 0;
    @property(cc.Label)
    myname: cc.Label = null;
    @property(cc.Label)
    mymony: cc.Label = null;
    @property(cc.Sprite)
    myVip: cc.Sprite = null;
    @property(cc.SpriteAtlas)
    userVipAll: cc.SpriteAtlas = null;
    @property(cc.Node)
    mymony_jia: cc.Node = null;
    @property(cc.Node)
    mymony_jian: cc.Node = null;
    @property(cc.Node)
    btn_continueTouch: cc.Node = null;
    @property(cc.Node)
    btn_continueTouch_mask: cc.Node = null;
    @property(cc.Sprite)
    treasureVip: cc.Sprite = null;
    @property(cc.Label)
    treasureNickname: cc.Label = null;
    @property(cc.Label)
    treasureUserScore: cc.Label = null;
    @property(cc.Sprite)
    treasureVip1: cc.Sprite = null;
    @property(cc.Label)
    treasureNickname1: cc.Label = null;
    @property(cc.Sprite)
    treasureVip2: cc.Sprite = null;
    @property(cc.Label)
    treasureNickname2: cc.Label = null;
    @property(cc.Sprite)
    budgetVip: cc.Sprite = null;
    @property(cc.Label)
    budgetNickname: cc.Label = null;
    @property(cc.Label)
    budgetUserScore: cc.Label = null;
    @property(cc.Sprite)
    budgetVip1: cc.Sprite = null;
    @property(cc.Label)
    budgetNickname1: cc.Label = null;
    @property(cc.Sprite)
    budgetVip2: cc.Sprite = null;
    @property(cc.Label)
    budgetNickname2: cc.Label = null;
    @property(cc.Sprite)
    allbet: cc.Sprite = null;
    @property(cc.Node)
    anim_long: cc.Node = null;
    @property(cc.Node)
    anim_he: cc.Node = null;
    @property(cc.Node)
    anim_hu: cc.Node = null;
    @property(cc.Node)
    brideCared: cc.Node = null;
    @property(cc.Node)
    anim_gameStatu: cc.Node = null;
    @property(cc.Sprite)
    village: cc.Sprite = null;
    @property(cc.Node)
    waitingStart: cc.Node = null;
    @property(cc.Node)
    rule_content: cc.Node = null;
    @property(cc.Node)
    music_content: cc.Node = null;
    @property(cc.Node)
    sound_content: cc.Node = null;
    @property(cc.Label)
    userCount: cc.Label = null;
    @property(cc.Node)
    user_mask: cc.Node = null;
    @property(cc.SpriteFrame)
    heSelect_sprite: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    heUnSelect_sprite: cc.SpriteFrame = null;
    @property(cc.Node)
    avatar: cc.Node = null;
    music_YN: number = 0;
    suond_YN: number = 0;
    isClose: number = 0;
    betSum: number = 0;
    ScoreDetail: any[] = [];
    @property(cc.SpriteFrame)
    cared: cc.SpriteFrame[] = [];

    islhh: number = 0;

    pop: number = 0;
    pop1: number = 0;

    onLoad () {
        this.btn_Alljetton[0].opacity = 255;
        this.btn_jetton.active = true;
        this.btn_jetton.setPosition(this.btn_Alljetton[0].position);
        var fadeOut = cc.fadeOut(.5);
        var fadeIn = cc.fadeIn(.5);
        var action = cc.repeatForever(cc.sequence(fadeIn, fadeOut));
        this.btn_jetton.runAction(action);
        cc.game.on(cc.game.EVENT_HIDE, function () { }, this);
        cc.game.on(cc.game.EVENT_SHOW, function () {
            location.reload();
        }, this);
        GameTools.loadWxHead(this.avatar, KernelData.head);
    }

    update (e) { }

    showCard (e) {
        var t = this;
        this.pop = Array.isArray(e[0]) ? e[0][0] : e[0];
        this.pop1 = Array.isArray(e[1]) ? e[1][0] : e[1];
        
        var o = lhd_GameLogic.getCardValue(this.pop);
        var n = lhd_GameLogic.getCardValue(this.pop1);

        console.log("Value of o: ", o);
        console.log("Value of n: ", n);

        if (e.length === 2) {
            this.leftCard.rotationX = 0;
            this.leftCard.rotationY = 0;
            var i = cc.scaleTo(.8, 1, 1);
            var c = cc.scaleTo(.3, 0, 1);
            var s = cc.scaleTo(.1, 1, 1);
            var l = cc.scaleTo(.2, .5, .5);
            this.leftCard.runAction(cc.sequence(i, c, cc.callFunc(function () {
                t.leftCard.getComponent(cc.Sprite).spriteFrame = t.cardAtl.getSpriteFrame(t.pop+"");
            }), s, l, cc.callFunc(function () {
                audioMgr.playEffect(lhd_GameConfig.AudioData.fanpai);
                audioMgr.playEffect(lhd_GameConfig.AudioPukeData.pukep[o - 1]);
            })));

            this.scheduleOnce(function () {
                var e = this;
                this.rightCard.rotationX = 0;
                this.rightCard.rotationY = 0;
                var t = cc.scaleTo(.8, 1, 1);
                var o = cc.scaleTo(.3, 0, 1);
                var i = cc.scaleTo(.1, 1, 1);
                var r = cc.scaleTo(.2, .5, .5);
                this.rightCard.runAction(cc.sequence(t, o, cc.callFunc(function () {
                    e.rightCard.getComponent(cc.Sprite).spriteFrame = e.cardAtl.getSpriteFrame(e.pop1);
                }), i, r, cc.callFunc(function () {
                    audioMgr.playEffect(lhd_GameConfig.AudioPukeData.puke[n - 1]);
                    audioMgr.playEffect(lhd_GameConfig.AudioData.fanpai);
                })));
            }, 1);

            this.scheduleOnce(function () {
                if (o > n) {
                    console.log("龙");
                    this.leftCard.getChildByName("guang").active = !0;
                    audioMgr.playEffect(lhd_GameConfig.AudioData.long_shengxiao);
                    this.scheduleOnce(function () {
                        audioMgr.playEffect(lhd_GameConfig.AudioData.long_yinxiao);
                    }, .5);
                    this.anim_long.active = !0;
                    this.anim_long.getComponent(dragonBones.ArmatureDisplay).playAnimation("Animation1", 1);
                    this.long_guang.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-zj-bet-1");
                    this.islhh = 1;
                } else if (o === n) {
                    console.log("1V1");

                    this.leftCard.getChildByName("guang").active = !0;
                    this.rightCard.getChildByName("guang").active = !0;
                    audioMgr.playEffect(lhd_GameConfig.AudioData.he_yingxiao);
                    this.anim_he.active = !0;
                    this.anim_he.getComponent(dragonBones.ArmatureDisplay).playAnimation("Animation2", 1);
                    this.he_guang.spriteFrame = this.heSelect_sprite;
                    this.islhh = 3;
                } else {
                    console.log("虎");

                    this.rightCard.getChildByName("guang").active = !0;
                    audioMgr.playEffect(lhd_GameConfig.AudioData.tiger_shengxiao);
                    this.scheduleOnce(function () {
                        audioMgr.playEffect(lhd_GameConfig.AudioData.tiger_yinxiao);
                    }, .5);
                    this.anim_hu.active = !0;
                    this.anim_hu.getComponent(dragonBones.ArmatureDisplay).playAnimation("Animation3", 1);
                    this.islhh = 2;
                    this.hu_guang.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-zj-bet-2");
                }
            }, 3.5);

            this.scheduleOnce(function () {
                if (this.islhh === 1) {
                    this.anim_long.active = false;
                } else if (this.islhh === 2) {
                    this.anim_hu.active = false;
                } else {
                    this.anim_he.active = false;
                }

                if (this.corede.children.length < 17) {
                    this.cared = cc.instantiate(this.caredfab);
                    this.corede.addChild(this.cared);
                    console.log("1 this.islhh - 1=", this.islhh - 1);
                    this.cared.getComponent("lhd_caredArray").setH(this.islhh - 1);
                } else {
                    this.corede.children[0].destroy();
                    this.cared = cc.instantiate(this.caredfab);
                    this.corede.addChild(this.cared);
                    console.log("2 this.islhh - 1=", this.islhh - 1);
                    this.cared.getComponent("lhd_caredArray").setH(this.islhh - 1);
                }
            }, 6);

            this.scheduleOnce(function () {
                this.leftCard.getChildByName("guang").active = !1;
                this.rightCard.getChildByName("guang").active = !1;
                this.long_guang.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-bet-1");
                this.he_guang.spriteFrame = this.heUnSelect_sprite;
                this.hu_guang.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-bet-2");
            }, 7);
        } else {
            console.error("获取牌组异常");
        }
    }


    clickShowBanckInfo () {
        if (this.isshuts === 0) {
            this.villageMaskNode.active = true;
            this.villageMaskNode.setScale(0);
            this.villageMaskNode.runAction(cc.sequence(
                cc.scaleTo(.25, 1).easing(cc.easeBackInOut()),
                cc.callFunc(function () {})
            ));
            this.isshuts = 1;
        } else {
            this.villageMaskNode.active = false;
            this.isshuts = 0;
        }
    }

    clickCloseGame () {
        clientKernel.dismissGame()
    }


    updateMyMoney (e, t) {
        this.scheduleOnce(function () {
            if (Number(e + 1) < 0) {
                this.mymony_jian.active = true;
                this.mymony_jian.getComponent(cc.Label).string = "" + e;
                this.mymony_jian.runAction(cc.moveTo(1, -70, -100));
                this.scheduleOnce(function () {
                    this.mymony_jian.active = false;
                    this.mymony_jian.y = 0;
                }, 3);
            } else {
                if (Number(e) !== 0) {
                    this.mymony_jia.active = true;
                    this.mymony_jia.runAction(cc.moveTo(1, -70, -100));
                    this.mymony_jia.getComponent(cc.Label).string = "+" + e;
                    audioMgr.playEffect(lhd_GameConfig.AudioData.mymone_win);
                }
                this.scheduleOnce(function () {
                    this.mymony_jia.active = false;
                    this.mymony_jia.y = 0;
                }, 3);
            }
    
            this.scheduleOnce(function () {
                var t = Number(lhd_GameData.GameData.mymoney) + Number(e);
                this.mymony.string = t.toFixed(2);
            }, 1.5);
    
            this.getUserScore6(t);
    
            this.scheduleOnce(function () {
                this.top6ScoreNodes.active = false;
            }, 3);
        }, 4);
    }

    getUserScore6 (e) {
        var self = this;
        this.ScoreDetail = [];
        
        // Clear previous score labels
        for (var i = 0; i < this.top6ScoreNodes.children.length; i++) {
            this.top6ScoreNodes.children[i].getComponent(cc.Label).string = "";
        }
        
        var scoreIndex = -1;
        if (e && e.length > 0) {
            for (var j = 0; j < e.length; j++) {
                for (var k = 0; k < lhd_GameData.GameData.userInfo.length; k++) {
                    if (e && e[j].chairID == lhd_GameData.GameData.userInfo[k].chairID && e[j].money > 1 && e[j].money != null) {
                        scoreIndex++;
                        this.ScoreDetail[scoreIndex] = k;
                    }
                }
            }
        }
        
        this.showUserBetArray(this.islhh);
        
        this.scheduleOnce(function () {
            // 设置新的用户投注数
            self.New_betToUser = e.length;
            // 激活顶部6的分数节点
            self.top6ScoreNodes.active = true;
            
            // 遍历用户数据
            for (var m = 0; m < e.length; m++) {
                // 遍历游戏用户信息
                for (var n = 0; n < lhd_GameData.GameData.userInfo.length; n++) {
                    // 如果用户数据存在并且用户的椅子ID等于游戏用户信息的椅子ID
                    if (e && e[m].chairID == lhd_GameData.GameData.userInfo[n].chairID) {
                        // 如果用户的金钱大于-1并且用户的金钱不为空
                        if (e[m].money > -1 && e[m].money != null) {
                            // 设置用户的位置
                            this.top6UserLocation[m] = n;
                            // 设置用户的分数
                            this.top6ScoreNodes.children[2 * n].getComponent(cc.Label).string = "+" + e[m].money;
                            // 激活用户的分数节点
                            this.top6ScoreNodes.children[2 * n].active = true;
                            // 隐藏用户的分数节点
                            this.top6ScoreNodes.children[2 * n + 1].active = false;
                        } else {
                            // 设置用户的分数
                            this.top6ScoreNodes.children[2 * n + 1].getComponent(cc.Label).string = "" + e[m].money;
                            // 隐藏用户的分数节点
                            this.top6ScoreNodes.children[2 * n].active = false;
                            // 激活用户的分数节点
                            this.top6ScoreNodes.children[2 * n + 1].active = true;
                        }
                        // 播放音效
                        audioMgr.playEffect(lhd_GameConfig.AudioData.ying_yinxiao);
                    }
                }
            }
            
            this.scheduleOnce(function () {
                var top0Score = Number(this.top6ScoreNodes.children[0].getComponent(cc.Label).string) + Number(this.top6ScoreNodes.children[1].getComponent(cc.Label).string);
                var top3Score = Number(this.top6ScoreNodes.children[6].getComponent(cc.Label).string) + Number(this.top6ScoreNodes.children[7].getComponent(cc.Label).string);
                this.treasureUserScore.string = "" + (Number(this.top0Score) + Number(top0Score));
                this.budgetUserScore.string = "" + (Number(this.top3Score) + Number(top3Score));
            }, 0.5);
            
            this.scheduleOnce(function () {
                this.top6ScoreNodes.active = false;
            }, 3.7);
        }, 3.5);
        
        console.log("====111==this.ScoreDetail======", this.ScoreDetail);
    }

    updateBanckMoney (e) {
        this.scheduleOnce(function () {
            Number(e + 1) < 0 ? (this.bankerRusultJianMoney.active = !0, this.bankerRusultJianMoney.getComponent(cc.Label).string = "" + e, this.scheduleOnce(function () {
                this.bankerRusultJianMoney.active = !1
            }, 3)) : (this.bankerRusultMoney.active = !0, this.bankerRusultMoney.getComponent(cc.Label).string = "+" + e, this.scheduleOnce(function () {
                this.bankerRusultMoney.active = !1
            }, 3)), this.scheduleOnce(function () {
                var t = Number(this.bankerMoney.getComponent(cc.Label).string) + e;
                this.bankerMoney.getComponent(cc.Label).string = "" + t
            }, 1.5)
        }, 4)
    }

    showbanck (e) {
        if (null != e && e && e.length > 0) {
            this.villageCount.string = "" + Number(e.length - 1);
            var t = e[0].bondMoney,
                o = e[0].nickname;
            this.villageVip.spriteFrame = this.userVipAll.getSpriteFrame("hall-plist-vip-img-vip" + lhd_GameData.GameData.bankerVip);
            this.bankerMoney.getComponent(cc.Label).string = t ? "" + t : "" + 2e8;
            this.bankerName.getComponent(cc.Label).string = o ? "" + o : "无人上庄";
            for (var n = 1; n < e.length; n++) {
                this.bankerInfo = cc.instantiate(this.bankerInfofab);
                this.bankerNode.addChild(this.bankerInfo);
                this.bankerInfo.children[0].getComponent(cc.Label).string = e[n].nickname;
            }
        } else {
            console.error("没有有效的庄家信息!");
        }
    }

    showAllUserInfos (e) {
        var userInfo = lhd_GameData.GameData.userInfo;
        if (e === 1) {
            this.userCount.string = "" + userInfo.length;
        } else if (this.showAllUserInfo.active == false) {
            this.showAllUserInfo.children[1].children[0].getComponent(cc.ScrollView).scrollToTop(0, true);
            this.showAllUser_node.removeAllChildren();
            this.showAllUserInfo.active = true;
            
            for (var i = 0; i < userInfo.length; i++) {
                var user = cc.instantiate(this.userAllInfo);
                this.showAllUser_node.addChild(user);
                var name = user.getChildByName("name").getComponent(cc.Label);
                var bottomLabel = user.getChildByName("bottom_label").getComponent(cc.Label);
                var moneyLabel = user.getChildByName("money_label").getComponent(cc.Label);
                var vip = user.getChildByName("vip").getComponent(cc.Sprite);
                
                name.string = userInfo[i].nickname;
                bottomLabel.string = userInfo[i].score;
                moneyLabel.string = userInfo[i].score;
                vip.spriteFrame = this.userVipAll.getSpriteFrame("hall-plist-vip-img-vip" + userInfo[i].userVip);
            }
            
            this.isClose = 1;
            audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_open);
        } else {
            this.showAllUserInfo.active = false;
            this.isClose = 0;
            audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_close);
        }
    }

    getBet (e) {
        var t, o = this,
            n = (t = this.getWorldPositon(this.bankerName)).x,
            i = t.y;
        this.scheduleOnce(function () {
            audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.bethigh_banck), o.uiBet.children[e].runAction(cc.moveTo(.03 + e % 80 / 80, n, i))
        }, .03), this.scheduleOnce(function () {
            o.uiBet.children[e].active = !1
        }, 1), this.scheduleOnce(function () {
            var t = null;
            t = 1 == o.islhh ? o.getWorldPositon(o.jetton_long) : 2 == o.islhh ? o.getWorldPositon(o.jetton_hu) : o.getWorldPositon(o.jetton_he), o.uiBet.children[e].active = !0;
            var n = o.randNum(0, 50, !0),
                i = o.randNum(0, 50, !0);
            n % 2 == 0 && (n *= -1), i % 2 == 0 && (i *= -1);
            var r = t.x + n,
                c = t.y + i;
            o.scheduleOnce(function () {
                audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.bethigh_banck), o.uiBet.children[e].runAction(cc.moveTo(.03 + e % 80 / 80, r, c))
            }, .03)
        }, 1.5)
    }


    instanBit () {
        var position;
        if (this.islhh === 1) {
            position = this.getWorldPositon(this.jetton_long);
        } else if (this.islhh === 2) {
            position = this.getWorldPositon(this.jetton_hu);
        } else {
            position = this.getWorldPositon(this.jetton_he);
        }
        
        for (var t = 0; t < 6; t++) {
            let top6gainNode;
            switch (t) {
                case 0:
                    top6gainNode = cc.instantiate(this.jetton_100);
                    break;
                case 1:
                    top6gainNode = cc.instantiate(this.jetton_500);
                    break;
                case 2:
                    top6gainNode = cc.instantiate(this.jetton_2000);
                    break;
                case 3:
                    top6gainNode = cc.instantiate(this.jetton_5000);
                    break;
                case 4:
                    top6gainNode = cc.instantiate(this.jetton_10000);
                    break;
                case 5:
                    top6gainNode = cc.instantiate(this.jetton_50000);
                    break;
                default:
                    console.error("Invalid index:", t);
                    break;
            }
            top6gainNode.zIndex = t;
            this.top6_uiBet.addChild(top6gainNode);
            top6gainNode.setPosition(position);
        }
    }

    betToAllUser () {
        // 遍历所有的子节点
        for (let t = 0; t < this.uiBet.childrenCount; t++) {
            // 激活子节点
            this.uiBet.children[t].active = true;
            // 获取子节点的位置
            let position = this.getWorldPositon(this.userCount.node);
            let x = position.x;
            let y = position.y;
            // 延迟执行
            this.scheduleOnce(function () {
                // 播放音效
                audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.bethigh_banck);
                // 移动子节点
                this.uiBet.children[t].runAction(cc.moveTo(.03 + t % 80 / 80, x, y));
            }, .03);
        }
        // 打印分数详情长度
        console.log("========this.ScoreDetail.length=========", this.ScoreDetail.length);
        if (this.ScoreDetail.length > 0) {
            let i = 0;
            this.scheduleOnce(function () {
                // 播放音效
                audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.bethigh_banck);
                // 遍历分数详情
                for (let t = 0; t < this.ScoreDetail.length; t++) {
                    // 实例化
                    this.instanBit();
                    // 获取位置
                    let position = this.getWorldPositon(this.top6Player[this.ScoreDetail[t]]);
                    let x = position.x;
                    let y = position.y;
                    console.log("======xy===========", x, y);
                    if (i < this.ScoreDetail.length) {
                        for (let c = 6 * i; c < 6 * i + 6; c++) {
                            this.top6_uiBet.active = true;
                            // 播放音效
                            audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.bethigh_banck);
                            // 移动子节点
                            this.top6_uiBet.children[c].runAction(cc.moveTo(.11, x, y));
                            this.top6_uiBet.children[c].runAction(cc.moveTo(.1 + .02, x, y));
                            this.top6_uiBet.children[c].runAction(cc.moveTo(.13, x, y));
                            this.top6_uiBet.children[c].runAction(cc.moveTo(.14, x, y));
                            this.top6_uiBet.children[c].runAction(cc.moveTo(.1 + .05, x, y));
                            this.top6_uiBet.children[c].runAction(cc.moveTo(.16, x, y));
                        }
                    }
                    i++;
                }
            }, .05);
            // 延迟执行
            this.scheduleOnce(function () {
                // 隐藏节点
                this.top6_uiBet.active = false;
                this.uiBet.active = false;
            }, .5);
        }
    }

    // showUserBetArray (e) {
    //     var t = this;
    //     if (this.uiBet.childrenCount > 0) {
    //         for (var o = 0; o < this.uiBet.childrenCount; o++)(1 != e || 2 != this.uiBet.children[o].zIndex && 3 != this.uiBet.children[o].zIndex) && (2 != e || 1 != this.uiBet.children[o].zIndex && 3 != this.uiBet.children[o].zIndex) && (3 != e || 1 != this.uiBet.children[o].zIndex && 2 != this.uiBet.children[o].zIndex) || this.getBet(o);
    //         this.scheduleOnce(function () {
    //             t.betToAllUser()
    //         }, 2.55)
    //     }
    // }

    showUserBetArray (e) {
        if (this.uiBet.childrenCount > 0) {
            for (var o = 0; o < this.uiBet.childrenCount; o++) {
                var child = this.uiBet.children[o];
                if (!((e === 1 && (child.zIndex === 2 || child.zIndex === 3)) || (e === 2 && (child.zIndex === 1 || child.zIndex === 3)) || (e === 3 && (child.zIndex === 1 || child.zIndex === 2)))) {
                    this.getBet(o);
                }
            }
            var t = this;
            this.scheduleOnce(function () {
                t.betToAllUser();
            }, 2.55);
        }
    }

    userclickTop6Info (e) {
        var t = this,
            o = 0;
        switch (e.currentTarget.name) {
            case "userimg1":
                o = 0;
                break;
            case "userimg2":
                o = 1;
                break;
            case "userimg3":
                o = 2;
                break;
            case "userimg4":
                o = 3;
                break;
            case "userimg5":
                o = 4;
                break;
            case "userimg6":
                o = 5
        }
        this.showTop6AllUserInfo[o].active = !0, this.showTop6AllUserInfo[o].opacity = 255;
        var n = cc.fadeOut(7);
        this.showTop6AllUserInfo[o].runAction(n), this.scheduleOnce(function () {
            t.showTop6AllUserInfo[o].active = !1
        }, 5)
    }

    // clickTop6Info () {
    //     for (var e = lhd_GameData.GameData.userInfo, t = 0; t < 6; t++) e[t] && (this.top6UserInfo = cc.instantiate(this.top6userAllInfo_pfb), this.top6UserInfo.getChildByName("vip").getComponent(cc.Sprite).spriteFrame = this.userVipAll.getSpriteFrame("hall-plist-vip-img-vip" + e[t].userVip), this.top6UserInfo.getChildByName("name").getComponent(cc.Label).string = e[t].nickname, this.top6UserInfo.getChildByName("score").getComponent(cc.Label).string = e[t].score, this.showTop6AllUserInfo[t].addChild(this.top6UserInfo))
    // }

    clickTop6Info () {
        var userInfo = lhd_GameData.GameData.userInfo;
        for (var t = 0; t < 6; t++) {
            if (userInfo[t]) {
                var top6UserInfo = cc.instantiate(this.top6userAllInfo_pfb);
                var vipSprite = top6UserInfo.getChildByName("vip").getComponent(cc.Sprite);
                vipSprite.spriteFrame = this.userVipAll.getSpriteFrame("hall-plist-vip-img-vip" + userInfo[t].userVip);
                var nameLbl = top6UserInfo.getChildByName("name").getComponent(cc.Label);
                nameLbl.string = userInfo[t].nickname;
                var scoreLbl = top6UserInfo.getChildByName("score").getComponent(cc.Label);
                scoreLbl.string = userInfo[t].score;
                this.showTop6AllUserInfo[t].addChild(top6UserInfo);
            }
        }
    }

    showGetBet () {
        for (var e = 0; e < lhd_GameData.GameData.playersBet.length; e++) {
            var t = lhd_GameData.GameData.playersBet[e];
            this.lbl_areaBet[e].string = "" + t
        }
        for (e = 0; e < lhd_GameData.GameData.myBet.length; e++) {
            t = lhd_GameData.GameData.myBet[e];
            this.lbl_myAreaBet[e].string = "" + t
        }
        this.myname.string = lhd_GameData.GameData.myname, this.myVip.spriteFrame = this.userVipAll.getSpriteFrame("hall-plist-vip-img-vip" + lhd_GameData.GameData.myVip)
    }

    showAllPlayBet (e, t, o) {
        var n = this.getgainlimit(o, e);
        if (n) {
            var i = this.randNum(0, 30, !0),
                r = this.randNum(0, 30, !0);
            i % 2 == 0 && (i *= -1), r % 2 == 0 && (r *= -1);
            var c = [this.jetton_long, this.jetton_hu, this.jetton_he],
                s = this.getWorldPositon(c[t]);
            n.zIndex = 0 == t ? 1 : 1 == t ? 2 : 3;
            var l = s.x + i,
                p = s.y + r;
            audioMgr.playEffect(lhd_GameConfig.AudioData.bethigh_yinxiao);
            var u = cc.moveTo(.4, l, p);
            n.runAction(u)
        }
    }

    // getgainlimit (e, t) {
    //     if (e === lhd_GameData.GameData.betType2Money[0]) this.allgainNode = cc.instantiate(this.jetton_100);
    //     else if (e === lhd_GameData.GameData.betType2Money[1]) this.allgainNode = cc.instantiate(this.jetton_500);
    //     else if (e === lhd_GameData.GameData.betType2Money[2]) this.allgainNode = cc.instantiate(this.jetton_2000);
    //     else if (e === lhd_GameData.GameData.betType2Money[3]) this.allgainNode = cc.instantiate(this.jetton_5000);
    //     else if (e === lhd_GameData.GameData.betType2Money[4]) this.allgainNode = cc.instantiate(this.jetton_10000);
    //     else {
    //         if (e !== lhd_GameData.GameData.betType2Money[5]) return void console.error("\u684c\u9762\u73a9\u5bb6\u7b79\u7801\u9519\u8bef!!!!!");
    //         this.allgainNode = cc.instantiate(this.jetton_50000)
    //     }
    //     return this.uiBet.addChild(this.allgainNode), this.allgainNode.setPosition(this.getWorldPositon(this.top6Player[t])), 0 == t && (this.treasureUserScore.string = "" + (Number(this.treasureUserScore.string) - Number(e))), 3 == t && (this.budgetUserScore.string = "" + (Number(this.budgetUserScore.string) - Number(e))), this.allgainNode
    // }

    // 重构后的代码，增加了中文注释
    getgainlimit (e, t) {
        let allgainNode = null;
        // 根据不同的筹码类型，实例化对应的筹码
        if (e === lhd_GameData.GameData.betType2Money[0]) {
            allgainNode = cc.instantiate(this.jetton_100);
        } else if (e === lhd_GameData.GameData.betType2Money[1]) {
            allgainNode = cc.instantiate(this.jetton_500);
        } else if (e === lhd_GameData.GameData.betType2Money[2]) {
            allgainNode = cc.instantiate(this.jetton_2000);
        } else if (e === lhd_GameData.GameData.betType2Money[3]) {
            allgainNode = cc.instantiate(this.jetton_5000);
        } else if (e === lhd_GameData.GameData.betType2Money[4]) {
            allgainNode = cc.instantiate(this.jetton_10000);
        } else if (e === lhd_GameData.GameData.betType2Money[5]) {
            allgainNode = cc.instantiate(this.jetton_50000);
        } else {
            console.error("桌面玩家筹码错误!!!!!");
            return;
        }
        
        // 将筹码添加到uiBet节点下
        this.uiBet.addChild(allgainNode);
        // 设置筹码的位置
        allgainNode.setPosition(this.getWorldPositon(this.top6Player[t]));
        
        // 如果是第0个玩家，更新treasureUserScore的值
        if (t == 0) {
            this.treasureUserScore.string = "" + (Number(this.treasureUserScore.string) - Number(e));
        } 
        // 如果是第3个玩家，更新budgetUserScore的值
        else if (t == 3) {
            this.budgetUserScore.string = "" + (Number(this.budgetUserScore.string) - Number(e));
        }
        
        // 返回筹码节点
        return allgainNode;
    }

    showAllsPlayBet (e, t) {
        var o = this.getAllgainlimit(e, t);
        if (o) {
            var n = this.randNum(0, 30, !0),
                i = this.randNum(0, 30, !0);
            n % 2 == 0 && (n *= -1), i % 2 == 0 && (i *= -1);
            var r = [this.jetton_long, this.jetton_hu, this.jetton_he],
                c = this.getWorldPositon(r[t]),
                s = c.x + n,
                l = c.y + i;
            o.zIndex = 0 == t ? 1 : 1 == t ? 2 : 3, audioMgr.playEffect(lhd_GameConfig.AudioData.bethigh_yinxiao);
            var p = cc.moveTo(.4, s, l);
            o.runAction(p)
        }
    }

    // getAllgainlimit (e, t) {
    //     if (1 === e) this.allNode = cc.instantiate(this.jetton_100);
    //     else if (e === lhd_GameData.GameData.betType2Money[0]) this.allNode = cc.instantiate(this.jetton_100);
    //     else if (e === lhd_GameData.GameData.betType2Money[1]) this.allNode = cc.instantiate(this.jetton_500);
    //     else if (e === lhd_GameData.GameData.betType2Money[2]) this.allNode = cc.instantiate(this.jetton_2000);
    //     else if (e === lhd_GameData.GameData.betType2Money[3]) this.allNode = cc.instantiate(this.jetton_5000);
    //     else if (e === lhd_GameData.GameData.betType2Money[4]) this.allNode = cc.instantiate(this.jetton_10000);
    //     else {
    //         if (e !== lhd_GameData.GameData.betType2Money[5]) return void console.error("\u7b79\u7801\u9519\u8bef", e, t);
    //         this.allNode = cc.instantiate(this.jetton_50000)
    //     }
    //     return this.uiBet.addChild(this.allNode), this.allNode.setPosition(this.getWorldPositon(this.allbet.node)), this.allNode
    // }

    getAllgainlimit (e, t) {
        var allNode;
        if (1 === e) {
            allNode = cc.instantiate(this.jetton_100);
        } else if (e === lhd_GameData.GameData.betType2Money[0]) {
            allNode = cc.instantiate(this.jetton_100);
        } else if (e === lhd_GameData.GameData.betType2Money[1]) {
            allNode = cc.instantiate(this.jetton_500);
        } else if (e === lhd_GameData.GameData.betType2Money[2]) {
            allNode = cc.instantiate(this.jetton_2000);
        } else if (e === lhd_GameData.GameData.betType2Money[3]) {
            allNode = cc.instantiate(this.jetton_5000);
        } else if (e === lhd_GameData.GameData.betType2Money[4]) {
            allNode = cc.instantiate(this.jetton_10000);
        } else if (e === lhd_GameData.GameData.betType2Money[5]) {
            allNode = cc.instantiate(this.jetton_50000);
        } else {
            console.error("筹码错误", e, t);
            return;
        }
        this.allNode = allNode;
        this.uiBet.addChild(this.allNode);
        this.allNode.setPosition(this.getWorldPositon(this.allbet.node));
        return this.allNode;
    }

    // xutou (e, t) {
    //     var o;
    //     return 1 === e ? (this.index = 0, o = cc.instantiate(this.jetton_100)) : e === lhd_GameData.GameData.betType2Money[0] ? (this.index = 0, o = cc.instantiate(this.jetton_100)) : e === lhd_GameData.GameData.betType2Money[1] ? (this.index = 1, o = cc.instantiate(this.jetton_500)) : e === lhd_GameData.GameData.betType2Money[2] ? (this.index = 2, o = cc.instantiate(this.jetton_2000)) : e === lhd_GameData.GameData.betType2Money[3] ? (this.index = 3, o = cc.instantiate(this.jetton_5000)) : e === lhd_GameData.GameData.betType2Money[4] ? (this.index = 4, o = cc.instantiate(this.jetton_10000)) : e === lhd_GameData.GameData.betType2Money[5] && (this.index = 5, o = cc.instantiate(this.jetton_50000)), this.uiBet.addChild(o), o.setPosition(this.getWorldPositon(this.btn_Alljetton[this.index])), o
    // }

    xutou (e, t) {
        var o;
        if (1 === e) {
            this.index = 0;
            o = cc.instantiate(this.jetton_100);
        } else if (e === lhd_GameData.GameData.betType2Money[0]) {
            this.index = 0;
            o = cc.instantiate(this.jetton_100);
        } else if (e === lhd_GameData.GameData.betType2Money[1]) {
            this.index = 1;
            o = cc.instantiate(this.jetton_500);
        } else if (e === lhd_GameData.GameData.betType2Money[2]) {
            this.index = 2;
            o = cc.instantiate(this.jetton_2000);
        } else if (e === lhd_GameData.GameData.betType2Money[3]) {
            this.index = 3;
            o = cc.instantiate(this.jetton_5000);
        } else if (e === lhd_GameData.GameData.betType2Money[4]) {
            this.index = 4;
            o = cc.instantiate(this.jetton_10000);
        } else if (e === lhd_GameData.GameData.betType2Money[5]) {
            this.index = 5;
            o = cc.instantiate(this.jetton_50000);
        }
        this.uiBet.addChild(o);
        o.setPosition(this.getWorldPositon(this.btn_Alljetton[this.index]));
        return o;
    }

    // gainlimit () {
    //     if (0 === this.num) this.index = 0, this.gainNode = cc.instantiate(this.jetton_100), this.num = lhd_GameData.GameData.betType2Money[0];
    //     else if (this.num === lhd_GameData.GameData.betType2Money[0]) this.index = 0, this.gainNode = cc.instantiate(this.jetton_100);
    //     else if (this.num === lhd_GameData.GameData.betType2Money[1]) this.index = 1, this.gainNode = cc.instantiate(this.jetton_500);
    //     else if (this.num === lhd_GameData.GameData.betType2Money[2]) this.index = 2, this.gainNode = cc.instantiate(this.jetton_2000);
    //     else if (this.num === lhd_GameData.GameData.betType2Money[3]) this.index = 3, this.gainNode = cc.instantiate(this.jetton_5000);
    //     else if (this.num === lhd_GameData.GameData.betType2Money[4]) this.index = 4, this.gainNode = cc.instantiate(this.jetton_10000);
    //     else {
    //         if (this.num !== lhd_GameData.GameData.betType2Money[5]) return void console.error("\u6ca1\u6709\u9009\u62e9\u4e0b\u6ce8\u7b79\u7801" + this.gainNode);
    //         this.index = 5, this.gainNode = cc.instantiate(this.jetton_50000)
    //     }
    //     return this.uiBet.addChild(this.gainNode), this.gainNode.setPosition(this.getWorldPositon(this.btn_Alljetton[this.index])), this.gainNode
    // }

    gainlimit () {
        var index;
        var gainNode;
        if (this.num === 0) {
            index = 0;
            gainNode = cc.instantiate(this.jetton_100);
            this.num = lhd_GameData.GameData.betType2Money[0];
        } else if (this.num === lhd_GameData.GameData.betType2Money[0]) {
            index = 0;
            gainNode = cc.instantiate(this.jetton_100);
        } else if (this.num === lhd_GameData.GameData.betType2Money[1]) {
            index = 1;
            gainNode = cc.instantiate(this.jetton_500);
        } else if (this.num === lhd_GameData.GameData.betType2Money[2]) {
            index = 2;
            gainNode = cc.instantiate(this.jetton_2000);
        } else if (this.num === lhd_GameData.GameData.betType2Money[3]) {
            index = 3;
            gainNode = cc.instantiate(this.jetton_5000);
        } else if (this.num === lhd_GameData.GameData.betType2Money[4]) {
            index = 4;
            gainNode = cc.instantiate(this.jetton_10000);
        } else if (this.num === lhd_GameData.GameData.betType2Money[5]) {
            index = 5;
            gainNode = cc.instantiate(this.jetton_50000);
        } else {
            console.error("没有选择下注筹码" + this.gainNode);
            return;
        }
        this.index = index;
        this.gainNode = gainNode;
        this.uiBet.addChild(this.gainNode);
        this.gainNode.setPosition(this.getWorldPositon(this.btn_Alljetton[this.index]));
        return this.gainNode;
    }

    // click_jettonArray (e) {
    //     (!this.btn_Alljetton[0].active || lhd_GameData.GameData.betType2Money[0] > Number(this.mymony.string)) && (this.btn_jetton.active = !1, this.infotxt("\u91d1\u5e01\u4e0d\u8db3\uff0c\u8bf7\u5145\u503c\uff01")), 0 == this.num && Number(this.mymony.string) > lhd_GameData.GameData.betType2Money[0] && (this.num = lhd_GameData.GameData.betType2Money[0]), this.cotateBetRemind(2), "long" == e.currentTarget.name ? (this.num_long = this.num, clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
    //         areaType: lhd_SubGameMSG.AreaType.LONG,
    //         money: this.num_long
    //     }])) : "he" == e.currentTarget.name ? (this.num_he = this.num, clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
    //         areaType: lhd_SubGameMSG.AreaType.HE,
    //         money: this.num_he
    //     }])) : "hu" == e.currentTarget.name && (this.num_hu = this.num, clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
    //         areaType: lhd_SubGameMSG.AreaType.HU,
    //         money: this.num_hu
    //     }])), this.scheduleOnce(function () {
    //         this.jetton_active()
    //     }, 1)
    // }

    click_jettonArray (e) {
        if (!this.btn_Alljetton[0].active || lhd_GameData.GameData.betType2Money[0] > Number(this.mymony.string)) {
            this.btn_jetton.active = false;
            this.infotxt("金币不足，请充值！");
        }
        
        if (this.num == 0 && Number(this.mymony.string) > lhd_GameData.GameData.betType2Money[0]) {
            this.num = lhd_GameData.GameData.betType2Money[0];
        }
        
        this.cotateBetRemind(2);
        
        if (e.currentTarget.name == "long") {
            this.num_long = this.num;
            clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                areaType: lhd_SubGameMSG.AreaType.LONG,
                money: this.num_long
            }]);
        } else if (e.currentTarget.name == "he") {
            this.num_he = this.num;
            clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                areaType: lhd_SubGameMSG.AreaType.HE,
                money: this.num_he
            }]);
        } else if (e.currentTarget.name == "hu") {
            this.num_hu = this.num;
            clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                areaType: lhd_SubGameMSG.AreaType.HU,
                money: this.num_hu
            }]);
        }
        
        this.scheduleOnce(function () {
            this.jetton_active();
        }, 1);
    }

    // showbtn_ContinueTouch (e) {
    //     this.num = 0, this.btn_jetton.setPosition(this.btn_Alljetton[0].position), this.btn_jetton.active = !0, this.btn_continueTouch_mask.active = !1, this.user_mask.active = 1 == e
    // }

    showbtn_ContinueTouch (e) {
        this.num = 0;
        this.btn_jetton.setPosition(this.btn_Alljetton[0].position);
        this.btn_jetton.active = true;
        this.btn_continueTouch_mask.active = false;
        this.user_mask.active = (1 == e);
    }

    InitializeBetSum () {
        this.btn_jetton.active = false;
        this.betSum = 0;
    }

    // btn_ContinueTouch (e) {
    //     this.betSum = lhd_GameData.GameData.lastBet.length, console.error("\u73a9\u5bb6\u4e0b\u6ce8\u6570\u91cf\uff1a" + lhd_GameData.GameData.lastBet.length);
    //     for (var t = Number(this.mymony.string), o = 0; o < lhd_GameData.GameData.lastBet.length; o++) {
    //         var n = lhd_GameData.GameData.lastBet[o];
    //         if (t < n.money) {
    //             this.infotxt("\u91d1\u5e01\u4e0d\u8db3\uff01\u8bf7\u91cd\u65b0\u4e0b\u6ce8....."), lhd_GameData.GameData.lastBet = [], this.btn_continueTouch_mask.active = !0;
    //             break
    //         }
    //         if (this.betSum >= 30) {
    //             this.infotxt("\u4e0b\u6ce8\u7b79\u7801\u592a\u591a,\u8bf7\u91cd\u65b0\u4e0b\u6ce8\uff01"), this.btn_continueTouch_mask.active = !0;
    //             break
    //         }
    //         clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
    //             areaType: n.areaType,
    //             money: n.money
    //         }]), this.is_xutou = 1
    //     }
    // }

    btn_ContinueTouch (e) {
        this.betSum = lhd_GameData.GameData.lastBet.length;
        console.error("玩家下注数量：" + lhd_GameData.GameData.lastBet.length);
        for (let t = Number(this.mymony.string), o = 0; o < lhd_GameData.GameData.lastBet.length; o++) {
            let n = lhd_GameData.GameData.lastBet[o];
            if (t < n.money) {
                this.infotxt("金币不足！请重新下注.....");
                lhd_GameData.GameData.lastBet = [];
                this.btn_continueTouch_mask.active = true;
                break;
            }
            if (this.betSum >= 30) {
                this.infotxt("下注筹码太多，请重新下注！");
                this.btn_continueTouch_mask.active = true;
                break;
            }
            clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_ADD_JETTON, [{
                areaType: n.areaType,
                money: n.money
            }]);
            this.is_xutou = 1;
        }
    }

    // infotxt (e) {
    //     this.betRemind.getComponent(cc.Label).string = e, this.betRemind.color = cc.color(0, 255, 127), this.betRemind.active = !0, this.scheduleOnce(function () {
    //         this.betRemind.active = !1
    //     }, 2)
    // }

    infotxt (e) {
        this.betRemind.getComponent(cc.Label).string = e;
        this.betRemind.color = cc.color(0, 255, 127);
        this.betRemind.active = true;
        this.scheduleOnce(function () {
            this.betRemind.active = false;
        }, 2);
    }

    // my_bet (e, t) {
    //     var o;
    //     this.user_jetton(), o = 1 == this.is_xutou ? this.xutou(e, t) : this.gainlimit();
    //     var n = this.randNum(0, 50, !0),
    //         i = this.randNum(0, 50, !0);
    //     n % 2 == 0 && (n *= -1), i % 2 == 0 && (i *= -1);
    //     var r = [this.jetton_long, this.jetton_hu, this.jetton_he],
    //         c = this.getWorldPositon(r[t]),
    //         s = c.x + n,
    //         l = c.y + i;
    //     o.zIndex = 0 == t ? 1 : 1 == t ? 2 : 3, audioMgr.playEffect(lhd_GameConfig.AudioData.bethigh_yinxiao);
    //     var p = cc.moveTo(.15, s, l);
    //     o.runAction(p)
    // }

    my_bet (e, t) {
        var o;
        this.user_jetton();
        o = 1 == this.is_xutou ? this.xutou(e, t) : this.gainlimit();
        var n = this.randNum(0, 50, true),
            i = this.randNum(0, 50, true);
        n % 2 == 0 && (n *= -1);
        i % 2 == 0 && (i *= -1);
        var r = [this.jetton_long, this.jetton_hu, this.jetton_he],
            c = this.getWorldPositon(r[t]),
            s = c.x + n,
            l = c.y + i;
        o.zIndex = 0 == t ? 1 : 1 == t ? 2 : 3;
        audioMgr.playEffect(lhd_GameConfig.AudioData.bethigh_yinxiao);
        var p = cc.moveTo(0.15, s, l);
        o.runAction(p);
    }

    jetton_active (e) {
        var t = Number(this.mymony.string);
        0 == e && t < lhd_GameData.GameData.betType2Money[0] ? this.btn_jetton.active = !1 : this.btn_jetton.active = !0
    }

    // user_jetton () {
    //     var e = Number(this.mymony.string) - this.num;
    //     console.error("\u73a9\u5bb6\u91d1\u5e01:" + e);
    //     for (var t = 0; t < lhd_GameData.GameData.betType2Money.length; t++) lhd_GameData.GameData.betType2Money[t] > e ? (this.btn_Alljetton[t].active = !1, !this.btn_Alljetton[t].active && this.num == lhd_GameData.GameData.betType2Money[t] && this.btn_Alljetton[0].active && (this.btn_jetton.setPosition(this.btn_Alljetton[0].position), this.num = lhd_GameData.GameData.betType2Money[0]), (!this.btn_Alljetton[0].active || lhd_GameData.GameData.betType2Money[0] > e) && (this.btn_jetton.active = !1, this.infotxt("\u91d1\u5e01\u4e0d\u8db3\uff0c\u8bf7\u5145\u503c\uff01"))) : (this.btn_Alljetton[t].active = !0, this.btn_jetton.active = !0)
    // }

    user_jetton () {
        var e = Number(this.mymony.string) - this.num;
        console.error("玩家金币:" + e);
        for (var t = 0; t < lhd_GameData.GameData.betType2Money.length; t++) {
            if (lhd_GameData.GameData.betType2Money[t] > e) {
                this.btn_Alljetton[t].active = false;
                if (!this.btn_Alljetton[t].active && this.num == lhd_GameData.GameData.betType2Money[t] && this.btn_Alljetton[0].active) {
                    this.btn_jetton.setPosition(this.btn_Alljetton[0].position);
                    this.num = lhd_GameData.GameData.betType2Money[0];
                }
                if (!this.btn_Alljetton[0].active || lhd_GameData.GameData.betType2Money[0] > e) {
                    this.btn_jetton.active = false;
                    this.infotxt("金币不足，请充值！");
                }
            } else {
                this.btn_Alljetton[t].active = true;
                this.btn_jetton.active = true;
            }
        }
    }

    // click_jetton_effect (e) {
    //     var t = e.currentTarget;
    //     this.btn_jetton.setPosition(t.position);
    //     var o = cc.fadeOut(.5),
    //         n = cc.fadeIn(.5),
    //         i = cc.repeatForever(cc.sequence(n, o));
    //     if (this.btn_jetton.runAction(i), null != t.name) switch (t.name) {
    //         case "game-jetton-100":
    //             this.num = lhd_GameData.GameData.betType2Money[0];
    //             break;
    //         case "game-jetton-500":
    //             this.num = lhd_GameData.GameData.betType2Money[1];
    //             break;
    //         case "game-jetton-2000":
    //             this.num = lhd_GameData.GameData.betType2Money[2];
    //             break;
    //         case "game-jetton-5000":
    //             this.num = lhd_GameData.GameData.betType2Money[3];
    //             break;
    //         case "game-jetton-10000":
    //             this.num = lhd_GameData.GameData.betType2Money[4];
    //             break;
    //         case "game-jetton-50000":
    //             this.num = lhd_GameData.GameData.betType2Money[5]
    //     } else console.error("\u4e0b\u6ce8\u9ed8\u8ba4\u503c\u4e3a 1"), this.num = 1
    // }

    click_jetton_effect (e) {
        var t = e.currentTarget;
        this.btn_jetton.setPosition(t.position);
        var o = cc.fadeOut(.5),
            n = cc.fadeIn(.5),
            i = cc.repeatForever(cc.sequence(n, o));
        this.btn_jetton.runAction(i);
    
        if (null != t.name) {
            switch (t.name) {
                case "game-jetton-100":
                    this.num = lhd_GameData.GameData.betType2Money[0];
                    break;
                case "game-jetton-500":
                    this.num = lhd_GameData.GameData.betType2Money[1];
                    break;
                case "game-jetton-2000":
                    this.num = lhd_GameData.GameData.betType2Money[2];
                    break;
                case "game-jetton-5000":
                    this.num = lhd_GameData.GameData.betType2Money[3];
                    break;
                case "game-jetton-10000":
                    this.num = lhd_GameData.GameData.betType2Money[4];
                    break;
                case "game-jetton-50000":
                    this.num = lhd_GameData.GameData.betType2Money[5];
                    break;
                default:
                    console.error("下注默认值为 1");
                    this.num = 1;
            }
        } else {
            console.error("下注默认值为 1");
            this.num = 1;
        }
    }

    click_settingList () {
        if (0 === this.isShut) {
            this.setatl.active = !0, this.setatl.setScale(0), this.setatl.runAction(cc.sequence(cc.scaleTo(.25, 1).easing(cc.easeBackInOut()), cc.callFunc(function () { })));
            this.donwList.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-pop1"), audioMgr.playEffect(lhd_GameConfig.AudioData.button_open), this.isShut = 1
        } else {
            this.setatl.active = !1;
            this.donwList.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-push"), audioMgr.playEffect(lhd_GameConfig.AudioData.button_close), this.isShut = 0
        }
    }

    // countDown_Xiazhu (e) {
    //     var t = 15 - Math.floor((15 - (e.statusStartTime - Date.now())) / 1e3);
    //     this.xiahzuOrkaij.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-status-bet");
    //     var o = 10;
    //     this.schedule(function () {
    //         if (this.countDown.string = t--, "0" == this.countDown.string) {
    //             this.stopFapai.active = !0, audioMgr.playEffect(lhd_GameConfig.AudioData.stop_xiazhu), this.stopFapai.getComponent(sp.Skeleton).setAnimation(0, "animation2", !1), this.countDown.string = "10";
    //             this.xiahzuOrkaij.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-status-lottery"), this.schedule(function () {
    //                 if (this.countDown.string = o--, "0" == this.kaijiang) {
    //                     this.xiahzuOrkaij.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-status-bet")
    //                 }
    //             }, 1, 10, 1)
    //         }
    //     }, 1, t, 1)
    // }

    countDown_Xiazhu (e) {
        var t = 15 - Math.floor((15 - (e.statusStartTime - Date.now())) / 1e3);
        this.xiahzuOrkaij.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-status-bet");
        var o = 10;
        this.schedule(function () {
            if (this.countDown.string = t--, "0" == this.countDown.string) {
                this.stopFapai.active = !0;
                audioMgr.playEffect(lhd_GameConfig.AudioData.stop_xiazhu);
                this.stopFapai.getComponent(sp.Skeleton).setAnimation(0, "animation2", !1);
                this.countDown.string = "10";
                this.xiahzuOrkaij.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-status-lottery");
                this.schedule(function () {
                    if (this.countDown.string = o--, "0" == this.kaijiang) {
                        this.xiahzuOrkaij.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-status-bet");
                    }
                }, 1, 10, 1);
            }
        }, 1, t, 1);
    }

    // countDown_Start (e) {
    //     audioMgr.playEffect(lhd_GameConfig.AudioData.game_start), this.anim_gameStatu.active = !0, this.anim_gameStatu.getComponent(sp.Skeleton).setAnimation(0, "animation3", !1), this.countDown_Xiazhu(e), this.scheduleOnce(function () {
    //         audioMgr.playEffect(lhd_GameConfig.AudioData.start_xiazhu), this.startFapai.active = !0, this.startFapai.getComponent(sp.Skeleton).setAnimation(0, "animation1", !1)
    //     }, 1.5)
    // }

    countDown_Start (e) {
        audioMgr.playEffect(lhd_GameConfig.AudioData.game_start);
        this.anim_gameStatu.active = !0;
        this.anim_gameStatu.getComponent(sp.Skeleton).setAnimation(0, "animation3", !1);
        this.countDown_Xiazhu(e);
        this.scheduleOnce(function () {
            audioMgr.playEffect(lhd_GameConfig.AudioData.start_xiazhu);
            this.startFapai.active = !0;
            this.startFapai.getComponent(sp.Skeleton).setAnimation(0, "animation1", !1);
        }, 1.5);
    }

    theBetLoadgame (e) {
        for (var t = 0; t < e.areaBetArray.length; t++) {
            var o = e.areaBetArray[t];
            this.lbl_areaBet[t].string = "" + o
        }
        this.countDown_Xiazhu(e)
    }

    getGameStatus (e) {
        this.igameStatus = e.gameStatus
    }

    // loadBetStatus (e) {
    //     audioMgr.playEffect(lhd_GameConfig.AudioData.game_start);
    //     this.xiahzuOrkaij.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-status-lottery"), this.waitingStart.active = !0, console.error("me:", Date.now() - e.statusStartTime);
    //     var t = 9 - Math.floor((10 - (e.statusStartTime - Date.now())) / 1e3);
    //     console.error("\u5269\u4f59\u65f6\u95f4\uff1a" + t), this.schedule(function () {
    //         this.countDown.string = "" + t--
    //     }, 1, t, 1);
    //     for (var o = 0; o < e.areaBetArray.length; o++) {
    //         var n = e.areaBetArray[o];
    //         this.lbl_areaBet[o].string = "" + n
    //     }
    // }

    loadBetStatus (e) {
        audioMgr.playEffect(lhd_GameConfig.AudioData.game_start);
        this.xiahzuOrkaij.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-status-lottery");
        this.waitingStart.active = true;
        console.error("me:", Date.now() - e.statusStartTime);
        var t = 9 - Math.floor((10 - (e.statusStartTime - Date.now())) / 1000);
        console.error("剩余时间：" + t);
        this.schedule(function () {
            this.countDown.string = "" + t--;
        }, 1, t, 1);
    
        for (var o = 0; o < e.areaBetArray.length; o++) {
            var n = e.areaBetArray[o];
            this.lbl_areaBet[o].string = "" + n;
        }
    }

    // getUserAll (e) {
    //     if (lhd_GameData.GameData.userInfo.length > 0 && null != lhd_GameData.GameData.userInfo && lhd_GameData.GameData) {
    //         var t = "hall-plist-vip-img-vip";
    //         this.treasureNickname.string = lhd_GameData.GameData.userInfo[0].nickname, this.treasureUserScore.string = lhd_GameData.GameData.userInfo[0].score, this.treasureVip.spriteFrame = this.userVipAll.getSpriteFrame(t + lhd_GameData.GameData.userInfo[0].userVip), this.treasureNickname1.string = lhd_GameData.GameData.userInfo[1].nickname, this.treasureVip1.spriteFrame = this.userVipAll.getSpriteFrame(t + lhd_GameData.GameData.userInfo[1].userVip), this.treasureNickname2.string = lhd_GameData.GameData.userInfo[2].nickname, this.treasureVip2.spriteFrame = this.userVipAll.getSpriteFrame(t + lhd_GameData.GameData.userInfo[2].userVip), this.budgetNickname.string = lhd_GameData.GameData.userInfo[3].nickname, this.budgetUserScore.string = lhd_GameData.GameData.userInfo[3].score, this.budgetVip.spriteFrame = this.userVipAll.getSpriteFrame(t + lhd_GameData.GameData.userInfo[3].userVip), this.budgetNickname1.string = lhd_GameData.GameData.userInfo[4].nickname, this.budgetVip1.spriteFrame = this.userVipAll.getSpriteFrame(t + lhd_GameData.GameData.userInfo[4].userVip), this.budgetNickname2.string = lhd_GameData.GameData.userInfo[5].nickname, this.budgetVip2.spriteFrame = this.userVipAll.getSpriteFrame(t + lhd_GameData.GameData.userInfo[5].userVip), this.top3Score = Number(this.budgetUserScore.string), this.top0Score = Number(this.treasureUserScore.string)
    //     } else console.error("\u4e0d\u5b58\u5728\u6709\u6548\u7684\u73a9\u5bb6\u6570\u636e\uff01")
    // }

    // 获取所有用户信息
    getUserAll (e) {
        // 如果用户信息存在且有效
        if (lhd_GameData.GameData.userInfo.length > 0 && null != lhd_GameData.GameData.userInfo && lhd_GameData.GameData) {
            var t = "hall-plist-vip-img-vip";
            // 设置各个用户的昵称、分数和VIP等级
            // for (var i = 0; i < lhd_GameData.GameData.userInfo.length && i <= 4; i++) {
            //     this['treasureNickname' + (i > 0 ? i : '')].string = lhd_GameData.GameData.userInfo[i].nickname;
            //     this['treasureUserScore' + (i > 0 ? i : '')].string = lhd_GameData.GameData.userInfo[i].score;
            //     this['treasureVip' + (i > 0 ? i : '')].spriteFrame = this.userVipAll.getSpriteFrame(t + lhd_GameData.GameData.userInfo[i].userVip);
            // }
            // 计算并设置顶部3分数和顶部0分数```
            this.top3Score = Number(this.budgetUserScore.string);
            this.top0Score = Number(this.treasureUserScore.string);
        } else {
            // 如果不存在有效的用户数据，打印错误信息
            console.error("不存在有效的玩家数据！");
        }
    }

    // 更新顶部6的信息
    updateTop6Info () {
        // 设置等待开始的活动状态为false
        this.waitingStart.active = false;
        // 获取所有用户信息
        this.getUserAll(1);
        // 遍历顶部6的玩家
        for (let i = 0; i < this.top6Player.length; i++) {
            // 获取动画节点
            let animationNode = this.top6Player[i].getChildByName("donghua");
            // 设置动画节点为活动状态
            animationNode.active = true;
            // 安排一次函数调用
            this.scheduleOnce(function () {
                // 播放动画
                animationNode.getComponent(dragonBones.ArmatureDisplay).playAnimation("Animation2", 1);
            }, 0.7);
            // 再次安排一次函数调用
            this.scheduleOnce(function () {
                // 播放动画并设置动画节点为非活动状态
                animationNode.getComponent(dragonBones.ArmatureDisplay).playAnimation("Animation1", 1);
                animationNode.active = false;
            }, 1);
        }
    }

    // 获取卡片信息
    getcardInfo (e) {
        var t = 0;
        // 如果e的长度小于t
        if (e.length < t) {
            // 遍历e
            for (; t < e.length; t++) {
                var o = e[t];
                // 实例化caredfab并添加到corede节点下
                var cared = cc.instantiate(this.caredfab);
                this.corede.addChild(cared);
                // 设置cared的H值
                cared.getComponent("lhd_caredArray").setH(o - 1);
            } 
        } else {
            // 如果e的长度大于等于t，从43开始遍历e
            for (t = 43; t < e.length; t++) {
                o = e[t];
                // 实例化caredfab并添加到corede节点下
                cared = cc.instantiate(this.caredfab);
                this.corede.addChild(cared);
                // 设置cared的H值
                cared.getComponent("lhd_caredArray").setH(o - 1);
            }
        }
    }

    // clearAllJetton () {
    //     console.error("\u6e05\u9664\u6240\u6709\u4e0b\u6ce8\u7b79\u7801\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002"), this.leftCard.getComponent(cc.Sprite).spriteFrame = this.cardbeimian.getSpriteFrame("paibei"), this.leftCard.setScale(1), this.rightCard.getComponent(cc.Sprite).spriteFrame = this.cardbeimian.getSpriteFrame("paibei"), this.rightCard.setScale(1), this.uiBet.removeAllChildren(), this.top6_uiBet.removeAllChildren(), this.uiBet.active = !0
    // }

    clearAllJetton () {
        console.error("清除所有下注码........"), 
        this.leftCard.getComponent(cc.Sprite).spriteFrame = this.cardbeimian.getSpriteFrame("paibei");
        this.leftCard.setScale(1);
        this.rightCard.getComponent(cc.Sprite).spriteFrame = this.cardbeimian.getSpriteFrame("paibei");
        this.rightCard.setScale(1);
        this.uiBet.removeAllChildren();
        this.top6_uiBet.removeAllChildren();
        this.uiBet.active = true;
    }

    randNum (e, t, o) {
        e = e || 0;
        var n = (t = t || 0) - e,
            i = e + Math.random() * n;
        return o ? Math.floor(i) : i
    }

    getWorldPositon (e) {
        return e.convertToWorldSpaceAR(cc.Vec2.ZERO)
    }

    removeAllChildrens () {
        this.bankerNode.removeAllChildren()
    }

    // clickbanker () {
    //     0 == this.isVillage ? (clientKernel.sendGameMsg(s.subGameMSG.SUB_C_APPLY_BANKER, {});
    //     this.village.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-downBanker"), this.isVillage = 1) : (clientKernel.sendGameMsg(s.subGameMSG.SUB_C_CANCEL_BANKER, {}), this.village.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-upBanker"), this.isVillage = 0)
    // }

    clickbanker () {
        if (this.isVillage === 0) {
            clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_APPLY_BANKER, {});
            this.village.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-downBanker");
            this.isVillage = 1;
        } else {
            clientKernel.sendGameMsg(lhd_SubGameMSG.subGameMSG.SUB_C_CANCEL_BANKER, {});
            this.village.spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-upBanker");
            this.isVillage = 0;
        }
    }

    refreshMyScore () {
        this.isYN_Remind = 1, this.mymony.string = (clientKernel.getMeUserItem().getUserScore() - lhd_GameData.GameData.betThisRound).toFixed(2).toString(), console.log("==this.mymony.string==", this.mymony.string)
    }

    // showVillagecotate (e, t) {
    //     2 == e ? (console.error("\u6362\u5e84\u5bb6\u5566\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002"), audioMgr.playEffect(lhd_GameConfig.AudioData.banker_new), this.village_rtate.active = !0, this.scheduleOnce(function () {
    //         this.village_rtate.active = !1
    //     }, 2)) : 3 == e && this.infotxt("\u4e0b\u6ce8\u5df2\u8fbe\u5e84\u5bb6\u4e0a\u9650,\u8bf7\u91cd\u65b0\u4e0b\u6ce8\uff01")
    // }

    showVillagecotate (e, t) {
        if (2 == e) {
            console.error("换庄家啦........");
            audioMgr.playEffect(lhd_GameConfig.AudioData.banker_new);
            this.village_rtate.active = true;
            this.scheduleOnce(function () {
                this.village_rtate.active = false;
            }, 2);
        } else if (3 == e) {
            this.infotxt("下注已达庄家上限，请重新下注！");
        }
    }

    cotateBetRemind (e) {
        1 == e ? this.isYN_Remind = 1 : 0 == e ? this.isYN_Remind = 0 : 1 == this.isYN_Remind ? this.isYN_Remind = 1 : (this.infotxt("Wait for the bet..."), this.isYN_Remind = 0)
    }

    rule_close () {
        this.rule_content.active = false;
        audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_close)
    }

    rule_open () {
        this.rule_content.active = true;
        audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_open)
    }

    // music_close () {
    //     0 == this.music_YN ? (this.music_content.getComponent(cc.Sprite).spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-music-off"), this.music_YN = 1, audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_close), audioMgr.setMusicVolume(0)) : (this.music_content.getComponent(cc.Sprite).spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-music-on"), this.music_YN = 0, audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_open), audioMgr.setMusicVolume(1))
    // }

    music_close () {
        if (0 == this.music_YN) {
            this.music_content.getComponent(cc.Sprite).spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-music-off");
            this.music_YN = 1;
            audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_close);
            audioMgr.setMusicVolume(0);
        } else {
            this.music_content.getComponent(cc.Sprite).spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-music-on");
            this.music_YN = 0;
            audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_open);
            audioMgr.setMusicVolume(1);
        }
    }


    sound_close () {
        if (0 == this.suond_YN) {
            this.sound_content.getComponent(cc.Sprite).spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-effect-off");
            this.suond_YN = 1;
            audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_close);
            audioMgr.setEffectsVolume(0);
        } else {
            this.sound_content.getComponent(cc.Sprite).spriteFrame = this.atl.getSpriteFrame("game-longhudazhan-gui-longhudazhan-main-gui-lhdz-btn-effect-on");
            this.suond_YN = 0;
            audioMgr.playEffect(lhd_GameConfig.gameConfig.AudioData.button_open);
            audioMgr.setEffectsVolume(1);
        }
    }

    onSubGameStart (e) {
        console.log("game start")
    }
    start () { }

    onDestroy () { }
}