// import { CONNECTION_CONFIG, GET_ANDROID_APK_ID, GET_SERVICE_LINK, SAVE_FAVORITE_GAME, SAVE_RECENT_GAME, other_game_get_token } from "../../kernel/Core/extend/ConstDefine";
// import { EM_COMMOM_CFG } from "../../kernel/Core/extend/User";
// import NativeCall from "../../kernel/NativeCall";
// import { AudioControl } from "./AudioControl";
// import Panel_createRoom from "./panel/Panel_createRoom";
// import { CN_ITEM_TYPE } from "./shop/shop_defind";
// import panel_loginSign from "./panel_loginSign";
// import panel_task_new from "./panel_task_new";
// import { ExternGameModule } from "./ExternGame";
// import { E_language, GAME_TYPE, GameData, GameInfo } from "./GameData";
// import SFGameItem from "./SFGameItem";
// import { i18nMgr } from "../../kernel/i18n/i18nMgr";
// import Utils, { KWAI_EVENT_TYPES } from "../../kernel/Core/extend/Utils";
// //let NoSleep = require("../../sdk/NoSleep");
// import * as ConstDefine from "../../kernel/Core/extend/ConstDefine";
// import { uiManager } from "../../core/UIManager";
// import { UIID } from "../texture/hotupdate/HallHotUpdate";

// declare global {
//     interface Window {
//         myAppWebView: any;
//     }
// }

// interface Navigator {
//     getInstalledRelatedApps: any;
// }

// enum EM_PAGEVIEW_TYPE {
//     LocalGame,
//     PG,
//     Slots,
//     Arcade,
//     Favorito
// }

// interface pageLoadData {
//     loadCount: number;
//     loadIncrement: number;
// }

// interface pageLoadDataDict {
//     [index: number]: pageLoadData;
// }

// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class Hall extends cc.Component {

//     //by_009:头像
//     @property(cc.Node)
//     avatar: cc.Node = null;
//     //by_009:昵称
//     @property(cc.Label)
//     nickname: cc.Label = null;
//     //by_009:游戏id
//     @property(cc.Label)
//     gameID: cc.Label = null;
//     //by_009:钻石
//     @property(cc.Label)
//     diamond: cc.Label = null;

//     // 金币
//     @property(cc.Label)
//     score: cc.Label = null;

//     // 金豆
//     @property(cc.Label)
//     goldBean: cc.Label = null;

//     //足迹
//     @property(cc.Label)
//     zuji: cc.Label = null;

//     //贡献
//     @property(cc.Label)
//     gongxian: cc.Label = null;

//     //足迹
//     @property(cc.Label)
//     vip: cc.Label = null;

//     @property(cc.Node)
//     vip_icon: cc.Node = null;

//     @property([cc.SpriteFrame])
//     email_Img: cc.SpriteFrame[] = [];

//     @property(cc.Node)
//     email_btnNode: cc.Node = null;

//     @property(cc.Node)
//     playerInfoNode: cc.Node = null;
//     @property(cc.Node)
//     loginNode: cc.Node = null;

//     @property(cc.Button)
//     firstLoginBtn: cc.Button = null;
//     @property(cc.Node)
//     exitNode: cc.Node = null;

//     @property(cc.ScrollView)
//     hall_scrollview: cc.ScrollView = null;

//     @property(cc.PageView)
//     game_pageView: cc.PageView = null;

//     bindObj = [];

//     @property(cc.Prefab)
//     login_panel: cc.Prefab = null;

//     private WebExternGame: ExternGameModule.ExternGame = null;

//     @property(cc.Prefab)
//     gamePartnerPrefab: cc.Prefab = null;

//     @property(cc.Prefab)
//     sfGameItem: cc.Prefab = null;

//     @property(cc.Prefab)
//     recentGameItem: cc.Prefab = null;

//     @property(cc.ToggleContainer)
//     panel_navigationBar: cc.ToggleContainer = null;

//     @property([cc.Prefab])
//     arrayResGroup: [] = [];

//     noSleep: any = null;


//     @property({ visible: false })
//     private nowLanguage: E_language = E_language.pt;

//     @property(cc.Button)
//     btnDownload: cc.Button = null;

//     @property(cc.Node)
//     nodeDownload: cc.Node = null;

//     @property(cc.Button)
//     btnServiceLink: cc.Button = null;

//     @property(cc.Prefab)
//     loadMoreprefab: cc.Prefab = null;

//     @property(cc.Node)
//     searchNode: cc.Node = null;

//     @property(cc.ScrollView)
//     recentGamesScrollView: cc.ScrollView = null;

//     oldScrollContentHeight: number = 0;

//     //当前pageview显示的页数
//     //curPageIndex:EM_PAGEVIEW_TYPE = EM_PAGEVIEW_TYPE.LocalGame;

//     curPageIndex: number = 0;
//     pageLoadDataDict: pageLoadDataDict = {};

//     @property(cc.Node)
//     sideBarNode: cc.Node = null;

//     //打开侧边栏的按钮
//     @property(cc.Button)
//     btnSideBar: cc.Button = null;

//     @property([cc.SpriteFrame])
//     sideBarBtnSpriteFrames: cc.SpriteFrame[] = [];

//     @property(cc.Label)
//     jackpotLabel: cc.Label = null;

//     gameData = {
//         2: GameData.Instance.pgsoftUrls,
//         3: GameData.Instance.slotsUrls,
//         4: GameData.Instance.arcadeUrls,
//         5: GameData.Instance.blockchainUrls,
//         6: GameData.Instance.liveCasinoUrls,
//     };

//     @property({ type: cc.Enum(E_language), displayName: "语言" })
//     get language() {
//         return this.nowLanguage;
//     }
//     set language(value: E_language) {
//         this.nowLanguage = value;
//         i18nMgr.setLanguage(E_language[value]);
//     }

//     onLoad() {
//         cc.sys.localStorage.setItem("firstIn", true);
//         Utils.Instance.AdjustInit("bpzsbx3rz0g0");

//         // this.noSleep  = new NoSleep();
//         // var b = cc.director.getWinSizeInPixels()
//         // var by = b.height
//         // var heightDelt = by-210;
//         // this.hall_scrollview.node.setContentSize(cc.size(this.hall_scrollview.node.getContentSize().width,heightDelt));
//         // this.hall_scrollview.node.getChildByName("view").setContentSize(cc.size(this.hall_scrollview.node.getContentSize().width,heightDelt));
//         // console.log("===屏幕高度====",by,heightDelt)
//     }

//     async receiveMessage(event) {
//         console.log('Message from Node A:', event.detail);
//         this.writePlayerInfo();

//         await this.getThirdToken(KernelData.userID, false);
//         if (KernelData.userID && this.curPageIndex == EM_PAGEVIEW_TYPE.LocalGame) {
//             this.searchNode.active = true;
//             this.game_pageView.scheduleOnce(() => {
//                 cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
//                     this.hall_scrollview.content.height = this.hall_scrollview.content.height + this.searchNode.height;
//                 }, this);
//             }, 0);
//         }
//         this.saveRecentGamesList(KernelData.userID, "");
//         this.getFavoriteGamesList(KernelData.userID, "");

//         //await this.getAndroidApkId(KernelData.agent1Code || "");
//     }

//     async loadServiceLink() {
//         if (GameData.Instance.serviceLink && GameData.Instance.serviceLink.trim().length > 0) {
//             this.btnServiceLink.node.active = true;
//             return;
//         }
//         let url = CONNECTION_CONFIG.yanzhengAddr + GET_SERVICE_LINK(KernelData.agent1Code || "");
//         let self = this;
//         let response: any = await this.httpRequest(url, 'GET', null);
//         console.log('Service Link:', response);
//         if (response.code === 20000 && response.data) {
//             self.btnServiceLink.node.active = true;
//             GameData.Instance.serviceLink = response.data;
//         } else {
//             self.btnServiceLink.node.active = false;
//         }
//     }

//     loadok() {
//         this.loadServiceLink();
//         // Preload resources
//         const resources = [
//             "hall/panel/panel_loginSign",
//             "hall/panel/panel_Share_new",
//             "hall/panel/panel_Gifts_new",
//             "hall/panel/panel_pay_new",
//             "hall/panel/panel_email_new",
//             "hall/panel/panel_forgetPassword"
//         ];

//         resources.forEach(resource => {
//             cc.loader.loadRes(resource, (err, prefab) => {
//                 cc.loader.setAutoRelease(prefab, true);
//             });
//         });
//     }

//     freshfavorito() {
//         let pageNode = this.game_pageView.node.getChildByName("view").getChildByName("content").getChildByName(`page_7`).getChildByName("OldGame");
//         // Remove existing children
//         pageNode.removeAllChildren();
//         // Add new children from favoriteGamesList
//         for (let i = GameData.Instance.favoriteGamesList.length - 1; i >= 0; i--) {
//             let info = GameData.Instance.favoriteGamesList[i];
//             let item = cc.instantiate(this.sfGameItem);
//             let itemName = "game_" + info.gameCode;
//             item.name = itemName;
//             let sfGameItemScript = item.getComponent(SFGameItem);
//             sfGameItemScript.favorite.active = true;
//             sfGameItemScript.initData(info);

//             item.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
//             pageNode.addChild(item);
//         }

//         let page_1_Node = this.game_pageView.node.getChildByName("view").getChildByName("content").getChildByName(`page_1`);
//         for (let pageIndex of ["1", "2", '3', '4', '5', '6']) {
//             let gameListNode = page_1_Node.getChildByName(`Game${pageIndex}`).getChildByName("gameList");
//             let children = gameListNode.children;
//             for (let i = 0; i < children.length; i++) {
//                 let child = children[i];
//                 let sfGameItemScript = child.getComponent(SFGameItem);
//                 sfGameItemScript.favorite.active = true;
//                 if (GameData.Instance.favoriteGamesList.find(game => game.gameCode === sfGameItemScript.gameInfo.gameCode)) {
//                     sfGameItemScript.favorite.getComponent(cc.Toggle).isChecked = true;
//                 } else {
//                     sfGameItemScript.favorite.getComponent(cc.Toggle).isChecked = false;
//                 }
//             }
//         }
//     }

//     close() {
//         this.node.off('loginSucceed', this.receiveMessage, this);
//         this.node.off('loadok', this.loadok, this);
//         this.node.off('freshfavorito', this.freshfavorito, this);

//         console.error("Hall onClose");
//     }

//     onCloseDownload() {
//         this.nodeDownload.active = false;
//         //this.sideBarNode.y = this.btnSideBar.node.y - 100;
//     }

//     start() {
//         if (cc.sys.isMobile) {
//             //console.log("当前是移动端");
//             //cc.view.setDesignResolutionSize(cc.winSize.width, cc.winSize.width / 16 * 9, cc.ResolutionPolicy.FIXED_WIDTH);
//         } else {
//             console.log("当前是PC端");
//         }

//         this.hall_scrollview.scrollToTop();

//         if (!cc.sys.isMobile) {
//             // 如果是PC端，隐藏侧边栏并将界面放大2倍
//             // this.sideBarNode.active = false;
//             // this.btnSideBar.node.active = false;
//             this.nodeDownload.active = false;
//             //cc.view.setDesignResolutionSize(750, 1334, cc.ResolutionPolicy.FIXED_WIDTH);
//         }


//         let urlParams = new URLSearchParams(window.location.search);
//         let agentCode = urlParams.get('agentCode') || "";
//         GameData.Instance.agentCode = agentCode;
//         this.btnServiceLink.node.active = false;
//         // 关闭apk下载 
//         this.btnDownload.node.active = false;

//         let url = CONNECTION_CONFIG.yanzhengAddr + ConstDefine.SUBMIT_LOGS;
//         let msg = {
//             userID: KernelData.userID,
//             msg: window.location.href
//         };
//         Utils.httpRequest(url, 'POST', msg);

//         console.error("Hall onStart");

//         console.log("注册事件", "loginSucceed");
//         this.node.on('loginSucceed', this.receiveMessage, this);
//         this.node.on('loadok', this.loadok, this);
//         this.node.on('freshfavorito', this.freshfavorito, this);

//         this.WebExternGame = new ExternGameModule.ExternGame();

//         let btnS = this.node.getComponentsInChildren(cc.Button);
//         for (let i = 0; i < btnS.length; i++) {
//             btnS[i].node.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
//             if (btnS[i].node.name == "btn_zhuanpan") {
//                 cc.tween(btnS[i].node)
//                     .sequence(cc.tween().to(0.75, { scale: 1.2 }), cc.tween().to(0.75, { scale: 0.8 }))
//                     .repeatForever()
//                     .start()
//             }
//         }

//         this.bindEvent();

//         this.writePlayerInfo();

//         //this.getPropCfg();
//         if (NetHelp.firstNotice) {
//             NetHelp.firstNotice = false;
//             // GD.GameTool.createPanel("hall/panel/panel_notice");
//         }
//         if (GD.clubID) {
//             GD.GameTool.createPanel("hall/panel/panel_club_hall");
//         }
//         // if(!KernelData.hasRealNameAuthorized && cc.sys.isNative){
//         //     GD.GameTool.createPanel("hall/panel/panel_certification",(node:cc.Node)=>{
//         //         node.getComponent(panel_certification).cancelCloseFunc();
//         //     });
//         //     return;
//         // }
//         this.getReward();
//         if (!GD.isVisitor) {
//             //this.createADPopLayer();
//         }

//         //点击任意地方关闭侧边栏

//         this.oldScrollContentHeight = 700;

//         if (KernelData.userID && this.curPageIndex == EM_PAGEVIEW_TYPE.LocalGame) {
//             this.searchNode.active = true;
//         } else {
//             this.searchNode.active = false;
//         }

//         let pageNode = this.game_pageView.node.getChildByName("view").getChildByName("content").getChildByName(`page_1`).getChildByName("OldGame");
//         let itemsArray = [];
//         for (let i = 0; i < Math.min(10, pageNode.childrenCount); i++) {
//             itemsArray.push(pageNode.children[i]);
//         }
//         let pagesDict = itemsArray;

//         const gameData = {
//             1: GameData.Instance.localGameUrls,
//             2: GameData.Instance.pgsoftUrls,
//             3: GameData.Instance.slotsUrls,
//             4: GameData.Instance.arcadeUrls,
//             5: GameData.Instance.blockchainUrls,
//             6: GameData.Instance.liveCasinoUrls,
//         };

//         let page_1_Node = this.game_pageView.node.getChildByName("view").getChildByName("content").getChildByName(`page_1`);
//         let contentHeight = 0;
//         for (let pageIndex of ["1", "2", '3', '4', '5', '6']) {
//             let gameNode = page_1_Node.getChildByName(`Game${pageIndex}`)
//             let gameListNode = page_1_Node.getChildByName(`Game${pageIndex}`).getChildByName("gameList");
//             {
//                 let number = 6;
//                 if (pageIndex === '1') {
//                     number = 6;
//                 } else {
//                     number = 6;
//                 }
//                 let gameItem = gameData[pageIndex].slice(0, number);
//                 gameItem.forEach((info: GameInfo, index) => {
//                     let item = cc.instantiate(this.sfGameItem);
//                     let itemName = "game_" + info.gameCode;
//                     item.name = itemName;
//                     let sfGameItemScript = item.getComponent(SFGameItem);
//                     sfGameItemScript.initData(info);

//                     item.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
//                     gameListNode.addChild(item);
//                 });
//             }

//             gameNode.getComponent(cc.Layout).updateLayout();
//             contentHeight += gameNode.height;
//         }


//         // 加载合作厂商信息
//         // for (let i = 1; i <= 5; i++) {
//         //     let pageNode = this.game_pageView.node.getChildByName("view").getChildByName("content").getChildByName(`page_${i}`);
//         //     let gamePartnerInstance = cc.instantiate(this.gamePartnerPrefab);
//         //     gamePartnerInstance.active = true;
//         //     pageNode.addChild(gamePartnerInstance);
//         //     if (i == 1) {
//         //         pageNode.getComponent(cc.Layout).updateLayout();
//         //         contentHeight += pageNode.height ;
//         //     }
//         // }

//         if (this.searchNode.active) {
//             this.hall_scrollview.content.height = this.hall_scrollview.content.height + contentHeight + this.searchNode.height + GameData.Instance.JackpotHeight;
//         } else {
//             this.hall_scrollview.content.height = this.hall_scrollview.content.height + contentHeight + GameData.Instance.JackpotHeight;
//         }

//         this.hall_scrollview.node.on('scroll-to-bottom', () => {
//             console.log('下滑到底了');
//             this.loadMoreItems();
//         });

//         this.node.emit('loadok', { detail: 'Hello, Node B!' });

//         if (window.myAppWebView && window.myAppWebView.getWebViewIdentifier() === "myAppWebView") {
//             console.log("在H5打包成的APP的WebView中运行");
//             this.btnDownload.node.active = false;
//             //this.nodeDownload.active = false;
//         } else if (cc.sys.os === cc.sys.OS_IOS) {
//             console.log("在苹果手机中运行");
//             this.btnDownload.node.active = false;
//             //this.nodeDownload.active = false;
//         } else {
//             console.log("在安卓浏览器APP中运行");
//         }

//         //if (this.nodeDownload.active) 
//         {
//             // this.sideBarNode.y = this.btnSideBar.node.y - 100;
//         }

//         panel_loginSign.autoLoginIfPossible();

//     }

//     onEnable() {
//         this.scheduleOnce(() => {
//             this.game_pageView.node.off(cc.Node.EventType.TOUCH_START);
//             this.game_pageView.node.off(cc.Node.EventType.TOUCH_MOVE);
//             this.game_pageView.node.off(cc.Node.EventType.TOUCH_END);
//             this.game_pageView.node.off(cc.Node.EventType.TOUCH_CANCEL);
//             this.game_pageView.node.off(cc.Node.EventType.MOUSE_WHEEL);
//         })
//     }

//     getPropCfg() {
//         if (!GD.propCfg) {
//             NetHelp.getPropCfg((ret) => {
//                 if (ret.code != 0) {
//                     console.log(ret);
//                     this.getPropCfg();
//                     return;
//                 }
//             });
//         }
//     }

//     getReward() {
//         NetHelp.getRewardInfo(this.onGetRewardInfo.bind(this));
//     }

//     randomZxrs(start: number, end: number) {
//         return Math.floor(Math.random() * (end - start)) + start;
//     }

//     //by_009:获取奖赏信息
//     onGetRewardInfo(data) {
//         if (typeof data != "object") { data = JSON.parse(data) };
//         console.log('❤获取奖赏信息', data);
//         let { code, info, errMsg } = data;

//         // !info.todayReward && GD.GameTool.createPanel("hall/panel/panel_sign_in");//今天的奖励 

//     }

//     bindEvent() {
//         this.bindObj = [];
//         this.bindObj.push(onfire.on("S_USER_PROP_CHANGED", this.onS_USER_PROP_CHANGED.bind(this)));
//         this.bindObj.push(onfire.on("RealName", this.getReward.bind(this)));
//         this.bindObj.push(onfire.on("readEmail", this.readEmail_alreadly.bind(this)));
//         this.bindObj.push(onfire.on("onEventUserScore", this.onEventUserScore.bind(this)));
//     }

//     onDestroy() {
//         for (let i = 0; i < this.bindObj.length; i++) {
//             onfire.un(this.bindObj[i]);
//         }
//     }
//     //by_009:玩家属性变化通知
//     onS_USER_PROP_CHANGED(data) {
//         console.log("玩家属性变化通知 hall", JSON.stringify(data));
//         if ("diamond" in data)
//             // this.diamond.string = data.diamond;
//             this.diamond.string = GameTools.convertInfo(KernelData.diamond);
//         if ("score" in data)
//             // this.score.string = data.score;
//             this.score.string = GameTools.convertInfo(KernelData.score);
//         if ("goldBean" in data)
//             // this.goldBean.string = data.goldBean;
//             this.goldBean.string = GameTools.convertInfo(KernelData.goldBean);
//         if ("footprint" in data)
//             // this.zuji.string = data.footprint;
//             this.zuji.string = GameTools.convertInfo(KernelData.footprint);
//         if ("contribution" in data)
//             // this.gongxian.string = data.contribution;
//             this.gongxian.string = GameTools.convertInfo(KernelData.contribution);
//         if ("nickname" in data)
//             this.nickname.string = KernelData.nickname;
//         if ("unReadEmail" in data)
//             //this.nickname.string = KernelData.nickname;
//             this.email_btnNode.getComponent(cc.Sprite).spriteFrame = this.email_Img[1];
//         if ("advNum" in data)
//             KernelData.advNum = data.advNum;
//         this.refreshVipIcon();
//     }

//     onEventUserScore(data) {
//         console.log("====data===hall=====", data)
//         this.score.string = data.score;
//     }

//     //by_009:写入玩家信息
//     writePlayerInfo() {
//         console.log("===666=777==", KernelData)

//         GameTools.loadWxHead(this.avatar, KernelData.head);
//         this.nickname.string = KernelData.nickname;
//         this.gameID.string = "ID:" + KernelData.gameID;
//         this.diamond.string = GameTools.convertInfo(KernelData.diamond);
//         this.score.string = GameTools.convertInfo(KernelData.score);
//         this.goldBean.string = GameTools.convertInfo(KernelData.goldBean);
//         this.gongxian.string = GameTools.convertInfo(KernelData.contribution);
//         this.zuji.string = GameTools.convertInfo(KernelData.footprint);
//         this.refreshVipIcon();
//         this.playerInfoNode.active = GD.isVisitor;
//         this.loginNode.active = !GD.isVisitor;
//         this.firstLoginBtn.node.active = !GD.isVisitor;
//         this.exitNode.active = GD.isVisitor;
//     }

//     refreshVipIcon() {
//         if (KernelData && KernelData.vipLv > 0) {
//             for (let i = 0; i < this.vip_icon.childrenCount; i++) {
//                 if (KernelData.vipLv - 1 == i) {
//                     this.vip_icon.children[i].active = true;
//                 } else {
//                     this.vip_icon.children[i].active = false;
//                 }
//             }
//             // this.vip_icon.children[0].active = true;//只显示vip1
//             this.vip_icon.active = true;
//             this.nickname.node.color = cc.color(0, 255, 0, 255);
//         }
//     }

//     readEmail_alreadly() {
//         this.email_btnNode.getComponent(cc.Sprite).spriteFrame = this.email_Img[0];
//     }

//     loadedPages: any = [];

//     onChooseGameType(event) {
//         let toggleContainer = event.target.parent.getComponent(cc.ToggleContainer);
//         let index = toggleContainer.toggleItems.indexOf(event);
//         console.log(index);
//         if (index == EM_PAGEVIEW_TYPE.LocalGame && KernelData.userID) {
//             this.searchNode.active = true;
//         } else {
//             this.searchNode.active = false;
//         }

//         let pageIndex = index + 1;

//         // Print the number of child nodes for each OldGame in the page before scrolling
//         let pageView = this.game_pageView.node.getChildByName("view").getChildByName("content").getChildByName(`page_${pageIndex}`);
//         let pageNode = pageView.getChildByName("OldGame");
//         console.log(`Page ${index + 1} OldGame has ${pageNode.childrenCount} items.`);
//         //this.game_pageView 根据index 切换不同的page
//         this.game_pageView.scrollToPage(index, 1);
//         this.curPageIndex = index;


//         const gameData = {
//             2: GameData.Instance.pgsoftUrls,
//             3: GameData.Instance.slotsUrls,
//             4: GameData.Instance.arcadeUrls,
//             5: GameData.Instance.blockchainUrls,
//             6: GameData.Instance.liveCasinoUrls,
//         };

//         if (pageIndex == 2 || pageIndex == 3 || pageIndex == 4 || pageIndex == 5 || pageIndex == 6) {
//             if (!this.loadedPages.includes(pageIndex)) {
//                 this.pageLoadDataDict[pageIndex] = {
//                     loadCount: 0,
//                     loadIncrement: 18
//                 };
//                 let firstTwentyUrls = gameData[pageIndex].slice(0, this.pageLoadDataDict[pageIndex].loadIncrement);
//                 for (let i = 0; i < firstTwentyUrls.length; i++) {
//                     let gameItem = firstTwentyUrls[i] as GameInfo;
//                     let item = cc.instantiate(this.sfGameItem);
//                     let itemName = "game_" + gameItem.gameCode;
//                     item.name = itemName;
//                     let sfGameItemScript = item.getComponent(SFGameItem);
//                     pageNode.addChild(item);
//                     sfGameItemScript.initData(gameItem);
//                     if (GameData.Instance.favoriteGamesList.find(game => game.gameCode === sfGameItemScript.gameInfo.gameCode)) {
//                         sfGameItemScript.favorite.getComponent(cc.Toggle).isChecked = true;
//                     } else {
//                         sfGameItemScript.favorite.getComponent(cc.Toggle).isChecked = false;
//                     }
//                     item.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
//                 }
//                 this.loadedPages.push(pageIndex);
//                 this.pageLoadDataDict[pageIndex].loadCount += firstTwentyUrls.length;

//                 if (gameData[pageIndex].length > this.pageLoadDataDict[pageIndex].loadCount) {
//                     let loadMore = cc.instantiate(this.loadMoreprefab);
//                     loadMore.name = "loadMore";
//                     let childrenCount = pageView.childrenCount;
//                     pageView.insertChild(loadMore, childrenCount - 1);
//                 }
//             }
//         }

//         this.game_pageView.scheduleOnce(() => {
//             cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
//                 let pageIndexHeight = this.game_pageView.node.getChildByName("view").getChildByName("content").getChildByName(`page_${pageIndex}`).height;
//                 this.hall_scrollview.content.height = this.oldScrollContentHeight + pageIndexHeight + 100;
//             }, this);
//         }, 0);

//     }

//     loadMoreItems() {
//         let pageIndex = this.curPageIndex + 1;
//         if (pageIndex == 2 || pageIndex == 3 || pageIndex == 4 || pageIndex == 5 || pageIndex == 6) {
//             let pageView = this.game_pageView.node.getChildByName("view").getChildByName("content").getChildByName(`page_${pageIndex}`);
//             let pageNode = pageView.getChildByName("OldGame");

//             let moreLabel = pageView.getChildByName('loadMore');
//             if (moreLabel) {
//                 moreLabel.removeFromParent();
//             }
//             let loadCount = this.pageLoadDataDict[pageIndex].loadCount;
//             let loadIncrement = this.pageLoadDataDict[pageIndex].loadIncrement;
//             let gameInfos = this.gameData[pageIndex].slice(loadCount, loadCount + loadIncrement);
//             for (let i = 0; i < gameInfos.length; i++) {
//                 let gameItem = gameInfos[i];
//                 let item = cc.instantiate(this.sfGameItem);
//                 let itemName = "game_" + gameItem.gameCode;
//                 item.name = itemName;
//                 let sfGameItemScript = item.getComponent(SFGameItem);
//                 pageNode.addChild(item);
//                 sfGameItemScript.initData(gameItem);

//                 item.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
//             }
//             if (gameInfos.length > 0) {
//                 this.pageLoadDataDict[pageIndex].loadCount += gameInfos.length;

//                 if (this.gameData[pageIndex].length > this.pageLoadDataDict[pageIndex].loadCount) {
//                     let loadMore = cc.instantiate(this.loadMoreprefab);
//                     loadMore.name = "loadMore";
//                     let childrenCount = pageView.childrenCount;
//                     pageView.insertChild(loadMore, childrenCount - 1);
//                 }
//             }
//         }

//         this.game_pageView.scheduleOnce(() => {
//             cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
//                 let pageIndexHeight = this.game_pageView.node.getChildByName("view").getChildByName("content").getChildByName(`page_${pageIndex}`).height;
//                 if (this.searchNode.active) {
//                     this.hall_scrollview.content.height = this.oldScrollContentHeight + pageIndexHeight + this.searchNode.height + GameData.Instance.JackpotHeight;
//                 } else {
//                     this.hall_scrollview.content.height = this.oldScrollContentHeight + pageIndexHeight + GameData.Instance.JackpotHeight;
//                 }
//             }, this);
//         }, 0);
//     }

//     onChooseGameTypeByIndex(event, index) {
//         console.log(index);

//         index = Number(index);
//         let currentPageIndex = this.game_pageView.getCurrentPageIndex();
//         if (currentPageIndex === index) {
//             return;
//         }

//         // Switch to the corresponding index in the navigation bar
//         this.panel_navigationBar.toggleItems[index].isChecked = true;
//         // Scroll the hall_scrollview to the top
//         this.hall_scrollview.scrollToTop();
//     }

//     scorllPage(res) {

//     }

//     httpRequest(url, method, data) {
//         return new Promise((resolve, reject) => {
//             let xhr = new XMLHttpRequest();
//             xhr.open(method, url, true);
//             xhr.setRequestHeader("Content-Type", "application/json");
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
//                     let response = JSON.parse(xhr.responseText);
//                     resolve(response);
//                 } else if (xhr.readyState == 4) {
//                     reject('Error with status code ' + xhr.status);
//                 }
//             };
//             xhr.send(JSON.stringify(data));
//         });
//     }
//     async getThirdToken(userID, loading = true) {
//         let url = other_game_get_token;
//         let thirdToken = "";
//         let data = {
//             userID: userID
//         };
//         if (loading) {
//             UIHelper.showWaitLayer(true);
//         }
//         let response: any = await this.httpRequest(url, 'POST', data);
//         if (loading) {
//             UIHelper.showWaitLayer(false);
//         }
//         if (response.code === 0 && response.data) {
//             thirdToken = response.data.thirdToken;
//         }
//         GameData.Instance.thirdToken = thirdToken;
//         return thirdToken;
//     }




//     async getAndroidApkId(agentCode) {
//         let url = CONNECTION_CONFIG.yanzhengAddr + GET_ANDROID_APK_ID(agentCode);
//         let androidApkId = "";
//         let response: any = await this.httpRequest(url, 'GET', null);
//         if (response.code === 0 && response.data) {
//             androidApkId = response.data.androidApkId;
//         }
//         GameData.Instance.androidApkId = androidApkId;
//         return androidApkId;
//     }

//     // Method to get or store the list of games the user has recently played
//     async saveRecentGamesList(userID, gameCode) {
//         // if (GameData.Instance.recentGamesList.indexOf(gameCode) != -1) {
//         //     return;
//         // }

//         let url = CONNECTION_CONFIG.yanzhengAddr + SAVE_RECENT_GAME;
//         let recentGamesList = [];
//         let data = {
//             userID: userID,
//             gameCode: gameCode
//         };
//         let response: any = await this.httpRequest(url, 'POST', data);
//         if (response.code === 20000 && response.data) {
//             recentGamesList = response.data;
//         }

//         console.log("保存最近游戏列表:" + recentGamesList);
//         recentGamesList = Array.from(new Set(recentGamesList));
//         GameData.Instance.recentGamesList = recentGamesList;

//         if (recentGamesList.length > 0) {
//             this.recentGamesScrollView.content.removeAllChildren();
//         }
//         // Create new items in recentGamesScrollView based on recentGamesList
//         for (let i = 0; i < recentGamesList.length; i++) {
//             let gameCode = recentGamesList[i];
//             let gameInfo = GameData.Instance.localGameUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.arcadeUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.pgsoftUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.slotsUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.blockchainUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.liveCasinoUrls.find(game => game.gameCode === gameCode);


//             if (gameInfo) {
//                 let item = cc.instantiate(this.recentGameItem);
//                 let itemName = "game_" + gameInfo.gameCode;
//                 item.name = itemName;
//                 let sfGameItemScript = item.getComponent(SFGameItem);
//                 sfGameItemScript.initData(gameInfo);
//                 this.recentGamesScrollView.content.addChild(item);
//                 this.recentGamesScrollView.scrollToLeft();
//                 item.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
//             }
//         }

//         console.log("recentGamesList:", recentGamesList);
//         return recentGamesList;
//     }

//     async getFavoriteGamesList(userID, gameCode) {
//         let url = CONNECTION_CONFIG.yanzhengAddr + SAVE_FAVORITE_GAME;
//         let favoriteGamesList = [];
//         let data = {
//             userID: userID,
//             gameCode: gameCode
//         };
//         let response: any = await this.httpRequest(url, 'POST', data);
//         if (response.code === 20000 && response.data) {
//             favoriteGamesList = response.data;
//         }

//         favoriteGamesList = Array.from(new Set(favoriteGamesList));

//         // 清空
//         GameData.Instance.favoriteGamesList = [];
//         for (let i = 0; i < favoriteGamesList.length; i++) {
//             let gameCode = favoriteGamesList[i];
//             let gameInfo = GameData.Instance.localGameUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.arcadeUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.pgsoftUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.slotsUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.blockchainUrls.find(game => game.gameCode === gameCode)
//                 || GameData.Instance.liveCasinoUrls.find(game => game.gameCode === gameCode);

//             if (gameInfo) {
//                 GameData.Instance.favoriteGamesList.push(gameInfo);
//             }
//         }
//         cc.find("Canvas/UI").emit('freshfavorito', {});

//         console.log("favoriteGamesList:", favoriteGamesList);
//         return favoriteGamesList;
//     }

//     //by_009:按钮点击事件
//     async onBtnClick(event) {
//         // this.noSleep.enable();
//         panel_loginSign.promptPWAInstallation();


//         AudioControl.playClick();
//         this.closeSideBar();

//         console.log(event.currentTarget.name)
//         let notSupportGames = ["game_unkown"]
//         // 如果event.currentTarget.name是notSupportGames，返回暂未开放
//         if (notSupportGames.indexOf(event.currentTarget.name) != -1) {
//             GD.GameTool.showTextTips("Not yet open!");
//             return;
//         }

//         if (event.currentTarget.name.indexOf("game_") != -1
//             || event.currentTarget.name.indexOf("page_") != -1
//         ) {
//             //点击了游戏 game_bgaming_AllLuckyClover5
//             console.log("点击了游戏", event.currentTarget.name);
//             if (!GD.isVisitor) {
//                 this.firstLoginClick();
//                 return;
//             }

//             let gameName = event.currentTarget.name.split("_").slice(1).join("_");
//             if (gameName === "pstar_777") {
//                 gameName += ".0";
//             }
//             this.saveRecentGamesList(KernelData.userID, gameName);
//         }

//         // 如果event.currentTarget.name包含pgsoft,从例如game_pgsoft_106中获取pgsoft_106
//         if (event.currentTarget.name.indexOf("pgsoft") != -1
//             || event.currentTarget.name.indexOf("bgaming") != -1
//             || event.currentTarget.name.indexOf("pstar") != -1
//             || event.currentTarget.name.indexOf("spb") != -1
//             || event.currentTarget.name.indexOf("sw") != -1
//             || event.currentTarget.name.indexOf("itg") != -1
//             || event.currentTarget.name.indexOf("jili") != -1
//             || event.currentTarget.name.indexOf("SkyWind") != -1) {

//             if (event.currentTarget.name.indexOf("spb") != -1) {
//                 if (KernelData.score <= 0) {
//                     GD.GameTool.showTextTips(i18nMgr._getLabel("not enough score", []));
//                     return;
//                 }
//             }
//             let gameName = event.currentTarget.name.split("_").slice(1).join("_");
//             if (gameName === "pstar_777") {
//                 gameName += ".0";
//             }

//             //如果pg游戏 且 游戏类型为vintebet
//             if (event.currentTarget.name.indexOf("pgsoft") != -1 && GameData.Instance.gameType == GAME_TYPE.VINTEBET) {
//                 // 提取游戏编号，例如从"pgsoft_126"中提取出"126"
//                 let pureGameCode = gameName.replace("pgsoft_", "");
//                 //let gameCode = GameData.Instance.getNewPgGameCode(pureGameCode);
//                 let gameCode = pureGameCode;
//                 console.log("提取的游戏编号为:", gameCode, " 原来的编号为:", pureGameCode);
//                 UIHelper.showWaitLayer(true);
//                 NetHelp.enterThirdGame(gameCode, (ret) => {
//                     UIHelper.showWaitLayer(false);
//                     console.log("进入三方游戏:", ret);
//                     if (ret.code != 0) {
//                         UIHelper.showTips(ret.errMsg);
//                         return;
//                     }
//                     let url = ret.data.gameUrl;
//                     this.WebExternGame.init({ base_url: url });
//                 });
//             } else if (event.currentTarget.name.indexOf("pgsoft") != -1 && GameData.Instance.gameType == GAME_TYPE.EGAME) {
//                 // 提取游戏编号，例如从"pgsoft_126"中提取出"126"
//                 let pureGameCode = gameName.replace("pgsoft_", "");
//                 let gameCode = GameData.Instance.getNewPgGameCode(pureGameCode);
//                 //let gameCode = pureGameCode;
//                 console.log("提取的游戏编号为:", gameCode, " 原来的编号为:", pureGameCode);
//                 UIHelper.showWaitLayer(true);
//                 NetHelp.enterThirdGame2(gameCode, (ret) => {
//                     UIHelper.showWaitLayer(false);
//                     console.log("进入三方游戏:", ret);
//                     if (ret.code != 0) {
//                         UIHelper.showTips(ret.errMsg);
//                         return;
//                     }
//                     let url = ret.data.gameUrl;
//                     this.WebExternGame.init({ base_url: url });
//                 });
//             }
//             else {
//                 let userID = KernelData.userID;
//                 let thirdToken = GameData.Instance.thirdToken || await this.getThirdToken(userID);
//                 let url = `https://game.gmgiantgold.com/launcher?gameCode=${gameName}&token=${thirdToken}&platform=mobile&language=PT&playerId=${userID}&brandId=${GameData.Instance.brandId}&mode=1`;
//                 console.log(url);
//                 this.WebExternGame.init({ base_url: url });
//             }

//             return;
//         }

//         switch (event.currentTarget.name) {
//             case "hall_leitai"://擂台赛
//                 GD.GameTool.showTextTips("暂未开放");
//                 break;
//             case "btn_notice"://公告
//                 GD.GameTool.createPanel("hall/panel/panel_notice");
//                 break;
//             case "btn_fuli"://福利
//                 GD.GameTool.createPanel("hall/panel/panel_sign_in");
//                 break;
//             case "btn_share"://分享
//                 if (!GD.isVisitor) {
//                     this.firstLoginClick();
//                 } else {
//                     GD.GameTool.createPanel("hall/panel/panel_share");
//                 }
//                 break;
//             case "btn_service"://排行榜
//                 // GD.GameTool.createPanel("hall/panel/panel_club_paihangbang");
//                 // GD.GameTool.createPanel("hall/panel/panel_club_paihangbangxc");
//                 let parent = cc.find("Canvas/UI/panelNode");
//                 parent && parent.removeAllChildren();
//                 break;
//             case "btn_set"://设置
//                 if (!GD.isVisitor) {
//                     this.firstLoginClick();
//                 } else {
//                     if (cc.sys.isMobile) {
//                         GD.GameTool.createPanel("hall/panel/panel_Gifts_new");
//                     }
//                     else {
//                         GD.GameTool.createFullScreenPanel("hall/panel/panel_Gifts_new_h");
//                     }
//                 }
//                 break;
//             case "btn_generalize"://好友
//                 if (!GD.isVisitor) {
//                     this.firstLoginClick();
//                 } else {
//                     if (cc.sys.isMobile) {
//                         GD.GameTool.createPanel("hall/panel/panel_Share_new");
//                     }
//                     else {
//                         GD.GameTool.createFullScreenPanel("hall/panel/panel_Share_new_h");
//                     }
//                 }
//                 // if(!gamelistData){
//                 //     UIHelper.showTips("暂未开放");
//                 //     return;

//                 break;
//             case "btn_exit"://退出
//                 GD.GameTool.messageBox("您确定要关闭该游戏吗?", () => {
//                     cc.game.end();
//                 }, () => { })
//                 break;
//             case "btn_sign_in"://签到
//                 GD.GameTool.createPanel("hall/panel/panel_sign_in");
//                 break;
//             case "btn_video"://视频
//                 cc.sys.openURL("http://baidu.com");
//                 break;
//             case "btn_chongti"://点击充提
//                 GD.GameTool.createPanel("hall/panel/panel_chongti");
//                 break
//             case "btn_dw"://APP下载页面
//                 {
//                     let timestamp = new Date().getTime();
//                     let url = "";
//                     //if (!KernelData.agent1Code || KernelData.agent1Code === "") {
//                     url = "https://down.betrab.com/fxgz.apk?time=" + timestamp;
//                     // }else {
//                     //     url = "https://down.betrab.com/"+GameData.Instance.agentCode+".apk?time=" + timestamp;
//                     //     console.log(url);
//                     // }
//                     cc.sys.openURL(url);
//                     Utils.Instance.sendKwaiEvent(KWAI_EVENT_TYPES.EVENT_DOWNLOAD);
//                 }
//                 break
//             case "playAD":
//                 // cc.sys.openURL("https://down.betrab.com/");
//                 // UIHelper.showTips("敬请期待");
//                 NetHelp.getCommonConfig(EM_COMMOM_CFG.Adv, (ret) => {
//                     if (ret.code != 0) {
//                         UIHelper.showTips(ret.info);
//                         return;
//                     }
//                     let advNum = ret.data.advNum;
//                     if (advNum <= KernelData.advNum) {
//                         UIHelper.showTips("今日观看次数已达上限");
//                         //关闭红点
//                         event.currentTarget.children[0].active = false;
//                         return;
//                     }
//                     //判断原生
//                     if (!cc.sys.isNative) {
//                         UIHelper.showTips("非原生平台，不可观看广告");
//                         return;
//                     }
//                     //调用原生广告      
//                     NativeCall.inst.adShow(0, (status) => {
//                         if (status != 1) {
//                             UIHelper.showTips("观看广告失败");
//                             return;
//                         }
//                         NetHelp.advAward((ret) => {
//                             if (ret.code != 0) {
//                                 UIHelper.showTips(ret.info);
//                                 return;
//                             }
//                             KernelData.advNum = ret.data.advNum;
//                             let RewardData = {};
//                             ret.data["fields"].forEach(element => {
//                                 RewardData[element] = null;
//                             });
//                             let RewardDataKey = Object.keys(RewardData);
//                             for (let i = 0; i < RewardDataKey.length; i++) {
//                                 RewardData[i] = ret.data["adds"][i];
//                                 UIHelper.showTips(`获得${CN_ITEM_TYPE[RewardDataKey[i]]}:${RewardData[i]}`);
//                             }
//                         });
//                     });
//                 });
//                 break
//             case "btn_certification"://实名
//                 GD.GameTool.createPanel("hall/panel/panel_certification");
//                 break;
//             case "btn_shop"://商城
//                 // UIHelper.showTips("请联系客服");
//                 GD.GameTool.createPanel("hall/panel/panel_shop");
//                 break;
//             case "btn_createRoom"://创建房间
//                 this.createGamePanel("13shui")
//                 break;
//             case "btn_joinRoom"://加入房间
//                 GD.GameTool.createPanel("hall/panel/panel_joinRoom");
//                 break;
//             case "btn_help_old"://帮助
//                 GD.GameTool.createPanel("hall/panel/panel_help");
//                 break;
//             case "btn_report"://客服链接
//                 let url = GameData.Instance.serviceLink;
//                 if (KernelData.userID) {
//                     url += "?userId=" + KernelData.userID;
//                     if (KernelData.nickname) {
//                         url += "&nickname=" + KernelData.nickname;
//                     }
//                 } else if (KernelData.nickname) {
//                     url += "?nickname=" + KernelData.nickname;
//                 }
//                 if (url) {
//                     //Utils.Instance.sendKwaiEvent(KWAI_EVENT_TYPES.EVENT_CONTACT);
//                     //this.WebExternGame.init({base_url: url});
//                     // 使用cc.sys.openURL打开链接
//                     cc.sys.openURL(url);
//                 }
//                 break;
//             case "btn_statement"://声明
//                 GD.GameTool.createPanel("hall/panel/panel_statement");
//                 break;
//             case "btn_gongGao"://公告
//                 GD.GameTool.createPanel("hall/panel/panel_gongGao");
//                 break;
//             case "btn_prop"://背包
//                 GD.GameTool.createPanel("hall/panel/panel_prop");
//                 break;
//             case "btn_email"://邮件
//                 if (!GD.isVisitor) {
//                     this.firstLoginClick();
//                 } else {
//                     // GD.GameTool.createPanel("hall/panel/panel_user_bind",(node)=>{
//                     //     node.getComponent("panel_user_bind").onChangeToEmailClick();
//                     // });
//                     GD.GameTool.createPanel("hall/panel/panel_email_new");
//                 }
//                 break;
//             case "btn_recruitment"://招募
//                 GD.GameTool.createPanel("hall/panel/panel_recruitment");
//                 break;
//             case "btn_message"://信息
//                 if (!GD.isVisitor) {
//                     this.firstLoginClick();
//                 } else {
//                     GD.GameTool.createPanel("hall/panel/panel_User_new");
//                 }
//                 break;

//             case "game_hzmj"://游戏入口（现在是血流麻将）
//                 if (!NetHelp.gamelistData[11]) {
//                     UIHelper.showTips("暂未开放");
//                     return;
//                 }
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_hzmj", function (node) {
//                     node.moduleData = NetHelp.gamelistData[11];
//                 });
//                 break;
//             case "game_ddz"://游戏入口(现在是斗地主)
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_ddz", function (node) {
//                     node.moduleData = NetHelp.gamelistData[12];
//                 });
//                 break;

//             case "game_lzddz"://癞子斗地主
//                 //癞子斗地主
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_lzddz", function (node) {
//                     node.moduleData = NetHelp.gamelistData[16];
//                 });
//                 break;

//             case "game_gdmj"://游戏入口（现在是更多玩法）
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_more");
//                 break;


//             case "game_xiangqi1": {//游戏入口
//                 //象棋
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_xiangqi",function (node) {
//                 //     node.moduleData = NetHelp.gamelistData[13-1];
//                 // });
//                 const gamelist = NetHelp.gamelistData[13];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);
//                 break;
//             }

//             case "game_crash": {//游戏入口
//                 //象棋
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_xiangqi",function (node) {
//                 //     node.moduleData = NetHelp.gamelistData[13-1];
//                 // });
//                 const gamelist = NetHelp.gamelistData[1012];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);
//                 break;
//             }
//             case "game_789": {//游戏入口
//                 //象棋
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_xiangqi",function (node) {
//                 //     node.moduleData = NetHelp.gamelistData[13-1];
//                 // });
//                 const gamelist = NetHelp.gamelistData[1015];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);
//                 break;
//             }

//             case "game_xiangqi3": {//游戏入口
//                 //象棋
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_xiangqi",function (node) {
//                 //     node.moduleData = NetHelp.gamelistData[13-1];
//                 // });
//                 const gamelist = NetHelp.gamelistData[13];
//                 NetHelp.enterGame(gamelist[2].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[2].roomID);
//                 break;
//             }

//             case "game_sgj": {//游戏入口（现在是水果机）
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_sgj",(node)=>{
//                 // node.moduleData = NetHelp.gamelistData[1004];
//                 // });//這段注釋掉的是進入轉盤預製體，然后再進入游戲。

//                 const gamelist = NetHelp.gamelistData[1004];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);

//                 break;
//             }

//             case "game_zp": {//游戏入口（现在是轉盤）
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_zhuanpan",(node)=>{
//                 //     node.moduleData = NetHelp.gamelistData[1005];
//                 // });//這段注釋掉的是進入轉盤預製體，然后再進入游戲。

//                 const gamelist = NetHelp.gamelistData[1005];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);

//                 break;
//             }

//             case "game_sl": {//游戏入口
//                 //象棋
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_xiangqi",function (node) {
//                 //     node.moduleData = NetHelp.gamelistData[13-1];
//                 // });
//                 console.log("扫雷入口")
//                 const gamelist = NetHelp.gamelistData[1011];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);
//                 break;
//             }

//             case "game_bs": {//游戏入口
//                 //象棋
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_xiangqi",function (node) {
//                 //     node.moduleData = NetHelp.gamelistData[13-1];
//                 // });
//                 const gamelist = NetHelp.gamelistData[1013];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);
//                 break;
//             }

//             case "game_lhd": {//游戏入口（现在是龍湖）
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_lhd",(node)=>{
//                 //     node.moduleData = NetHelp.gamelistData[1003];
//                 // });//這段注釋掉的是進入預製體，然后再進入游戲。

//                 const gamelist = NetHelp.gamelistData[1003];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);

//                 break;
//             }

//             case "game_bcbm": {//游戏入口（现在是奔馳）
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_bcbm",(node)=>{
//                 //     node.moduleData = NetHelp.gamelistData[1006];
//                 // });//這段注釋掉的是進入預製體，然后再進入游戲。

//                 const gamelist = NetHelp.gamelistData[1006];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);

//                 break;
//             }

//             case "game_saima": {//游戏入口（现在是赛马）
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_saima",(node)=>{
//                 //     node.moduleData = NetHelp.gamelistData[1007];
//                 // });//這段注釋掉的是進入預製體，然后再進入游戲。

//                 const gamelist = NetHelp.gamelistData[1007];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);

//                 break;
//             }

//             case "game_honghei": {//游戏入口（现在是红黑）
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_saima",(node)=>{
//                 //     node.moduleData = NetHelp.gamelistData[1007];
//                 // });//這段注釋掉的是進入預製體，然后再進入游戲。

//                 const gamelist = NetHelp.gamelistData[1000];
//                 NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelist[0].roomID);

//                 break;
//             }

//             case "game_sl": {//游戏入口（现在是扫雷）
//                 GD.GameTool.createPanel("mines/mines.fire");
//                 break;
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_saima",(node)=>{
//                 //     node.moduleData = NetHelp.gamelistData[1007];
//                 // });//這段注釋掉的是進入預製體，然后再進入游戲。

//                 // const gamelist = NetHelp.gamelistData[1012];
//                 // NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                 //     let { code, info } = data
//                 //     if (code != 0 && info) {
//                 //         UIHelper.showTips(info);
//                 //     }
//                 // }, gamelist[0].roomID);         

//                 // break;
//             }


//             case "game_ps"://游戏入口（现在是拼十）
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_ps", (node) => {
//                     node.moduleData = NetHelp.gamelistData[6];
//                 });//這段注釋掉的是進入龍湖預製體，然后再進入游戲。
//                 break;



//             case "game_13z"://游戏入口（现在是十三张）
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_13z", (node) => {
//                     node.moduleData = NetHelp.gamelistData[17];
//                 });//這段注釋掉的是進入龍湖預製體，然后再進入游戲。
//                 break;



//             case "game_dzpk"://游戏入口（现在是德州撲克）
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_dzpk", (node) => {
//                     node.moduleData = NetHelp.gamelistData[8];
//                 });
//                 break;

//             case "game_sangong"://游戏入口（现在是三公）
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_sangong", (node) => {
//                     node.moduleData = NetHelp.gamelistData[7];
//                 });
//                 break;



//                 // case "game_honghei"://游戏入口（现在是紅黑）
//                 //     GD.GameTool.createPanel("hall/panel/panel_club_game_honghei",(node)=>{
//                 //         node.moduleData = NetHelp.gamelistData[1008];
//                 //     });
//                 //     break;

//                 // break;
//                 // UIHelper.showTips("敬请期待");
//                 // if(!NetHelp.gamelistData[1006]){
//                 //     UIHelper.showTips("暂未开放");
//                 //     return;
//                 // }
//                 // GD.GameTool.createPanel("hall/panel/panel_club_game_bcbm",function (node) {
//                 //     node.moduleData = NetHelp.gamelistData[1006];
//                 // });
//                 break;


//             case "game_whmj"://游戏入口
//                 //武汉麻将
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_whmj", function (node) {
//                     node.moduleData = NetHelp.gamelistData[14];
//                 });
//                 // UIHelper.showTips("敬请期待");
//                 // let pdk = NetHelp.gamelistData[15];
//                 // NetHelp.enterGame(pdk[0].moduleID, (data) => {
//                 //     let { code, info } = data
//                 //     if (code != 0 && info) {
//                 //         UIHelper.showTips(info);
//                 //         return;
//                 //     }
//                 // },pdk[0].roomID);
//                 break;
//                 // case "game_xiangqi1"://游戏入口
//                 //     //象棋
//                 //     // GD.GameTool.createPanel("hall/panel/panel_club_game_xiangqi",function (node) {
//                 //     //     node.moduleData = NetHelp.gamelistData[13-1];
//                 //     // });
//                 //     const gamelist = NetHelp.gamelistData[13];
//                 //     NetHelp.enterGame(gamelist[0].moduleID, (data) => {
//                 //         let { code, info } = data
//                 //         if (code != 0 && info) {
//                 //             UIHelper.showTips(info);
//                 //         }
//                 //     }, gamelist[0].roomID);                
//                 //     break;
//                 // UIHelper.showTips("敬请期待");
//                 // let pdk = NetHelp.gamelistData[15];
//                 // NetHelp.enterGame(pdk[0].moduleID, (data) => {
//                 //     let { code, info } = data
//                 //     if (code != 0 && info) {
//                 //         UIHelper.showTips(info);
//                 //         return;
//                 //     }
//                 // },pdk[0].roomID);
//                 break;

//             case "game_pdk":
//                 //跑得快
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_pdk", function (node) {
//                     node.moduleData = NetHelp.gamelistData[15];
//                 });
//                 break;
//             case "game_pdkjd":
//                 //跑得快金豆场
//                 GD.GameTool.createPanel("hall/panel/panel_club_game_pdkjd", function (node) {
//                     node.moduleData = NetHelp.gamelistData[102];
//                 });
//                 break;
//             case "btn_tdk"://牛牛
//                 this.createGamePanel("niuniu")
//                 break;
//             case "btn_mj"://麻将
//                 this.createGamePanel("ddz4")
//                 break;
//             case "btn_13shui":
//                 this.createGamePanel("13shui")
//                 break;
//             case "btn_guandan"://掼蛋
//                 this.createGamePanel("guandan")
//                 break;
//             case "btn_fzmj"://
//                 this.createGamePanel("fzmj")
//                 break;
//             case "btn_hzmj"://
//                 this.createGamePanel("hzmj")
//                 // this.test("hzmj");
//                 break;
//             case "btn_moreGame"://更多游戏
//                 GD.GameTool.showTextTips("待开发");
//                 break;
//             case "btn_shop"://钻石入口
//                 GD.GameTool.createPanel("hall/panel/panel_shop");
//                 break;
//             case "btn_shop_jinbi"://金币入口
//                 if (cc.sys.isMobile) {
//                     GD.GameTool.createFullScreenPanel("hall/panel/panel_pay_new");
//                 }
//                 else {
//                     GD.GameTool.createFullScreenPanel("hall/panel/panel_pay_new_h");
//                 }
//                 break;
//             case "btn_shop_jindou"://金豆入口
//                 GD.GameTool.createPanel("hall/panel/panel_shop");
//                 break;
//             case "btn_club"://俱乐部
//                 NetHelp.getMyClubInfo((retData) => {
//                     let { code, info } = retData;
//                     if (code == 0) {
//                         GD.GameTool.createPanel("hall/panel/panel_club_list");
//                     }
//                 });
//                 break;
//             case "btn_moreClub"://更多俱乐部
//                 break;
//             case "btn_quick_start"://快速开始按钮，先接入红中麻将
//                 let gamelistData = NetHelp.gamelistData[11];
//                 if (!gamelistData) {
//                     UIHelper.showTips("暂未开放");
//                     return;
//                 }
//                 let fastIndex = 0;
//                 for (let i = gamelistData.length - 1; i > 0; i--) {
//                     if (KernelData.score >= gamelistData[i].enterScore) {
//                         fastIndex = i;
//                         break;
//                     }
//                 }
//                 NetHelp.enterGame(gamelistData[fastIndex].moduleID, (data) => {
//                     let { code, info } = data
//                     if (code != 0 && info) {
//                         UIHelper.showTips(info);
//                     }
//                 }, gamelistData[fastIndex].roomID);
//                 break;
//             // case "avatar":  //点击头像
//             //     GD.GameTool.createPanel("hall/panel/panel_player_info");
//             //     break;
//             case "zuji":    //点击足迹
//                 // UIHelper.showTips("这是足迹");
//                 GD.GameTool.createPanel("hall/panel/helpPrefab");
//                 break;
//             case "gongxian"://点击贡献值
//                 GD.GameTool.createPanel("hall/panel/helpPrefab");
//                 break

//             case "btn_help"://点击帮助
//                 GD.GameTool.createPanel("hall/panel/helpPrefab");
//                 break
//             case "btn_zhuanpan"://新春活动
//                 // UIHelper.showTips("敬请期待");
//                 // GD.GameTool.createPanel("hall/panel/panel_zhuanpan")
//                 GD.GameTool.createPanel("hall/panel/panel_club_paihangbangxc");
//                 break
//             case "btn_zhuanpan1"://转盘
//                 // UIHelper.showTips("敬请期待");
//                 GD.GameTool.createPanel("hall/panel/panel_zhuanpan")
//                 break
//             case "btnLogin"://登录
//                 if (cc.sys.isMobile) {
//                     GD.GameTool.createPanel("hall/panel/panel_loginSign", (node) => {
//                         node.getComponent(panel_loginSign).onInitLoginSignUI(false);
//                     });
//                 }
//                 else {
//                     GD.GameTool.createFullScreenPanel("hall/panel/panel_loginSign_h", (node) => {
//                         node.getComponent(panel_loginSign).onInitLoginSignUI(false);
//                     });
//                 }

//                 //uiManager.open(UIID.Login);
//                 break;
//             case "btnSignUp"://注册
//                 if (cc.sys.isMobile) {
//                     GD.GameTool.createPanel("hall/panel/panel_loginSign", (node) => {
//                         node.getComponent(panel_loginSign).onInitLoginSignUI(true);
//                     });
//                 }
//                 else {
//                     GD.GameTool.createFullScreenPanel("hall/panel/panel_loginSign_h", (node) => {
//                         node.getComponent(panel_loginSign).onInitLoginSignUI(true);
//                     });
//                 }
//                 break;
//             case "btnExit":
//                 NetHelp.disConnect(true);
//                 GD.isVisitor = false;
//                 this.playerInfoNode.active = GD.isVisitor;
//                 this.loginNode.active = !GD.isVisitor;
//                 this.firstLoginBtn.node.active = !GD.isVisitor;
//                 this.exitNode.active = GD.isVisitor;
//                 //缓存中设置不要自动登录
//                 localStorage.setItem("autoLogin", "false");
//                 break;
//             case "page_1":
//             case "page_2":
//             case "page_3":
//             case "page_4":
//                 if (cc.sys.isMobile) {
//                     GD.GameTool.createPanel("hall/panel/panel_Gifts_new", (node) => {
//                         node.getComponent(panel_task_new).initTaskNode(1);
//                     });
//                 }
//                 else {
//                     GD.GameTool.createFullScreenPanel("hall/panel/panel_Gifts_new_h", (node) => {
//                         node.getComponent(panel_task_new).initTaskNode(1);
//                     });
//                 }
//                 break;
//             case "btn_my":
//                 if (cc.sys.isMobile) {
//                     GD.GameTool.createPanel("hall/panel/panel_User_new");
//                 }
//                 else {
//                     GD.GameTool.createFullScreenPanel("hall/panel/panel_User_new_h");
//                 }
//                 break;
//             default:
//                 console.error("事件待处理：", event.currentTarget.name);
//                 break;

//         }
//     }

//     //创建游戏面板
//     createGamePanel(gameName: string) {
//         GD.GameTool.createPanel("hall/panel/panel_createRoom", (newNode) => {
//             let panel_createRoom = newNode.getComponent(Panel_createRoom);
//             panel_createRoom.iniPanel(gameName, 2, 1);
//         });
//     }

//     //by_009:滚动通知

//     //创建广告界面
//     createADPopLayer() {
//         GD.GameTool.createPanel("hall/panel/panel_notice", (newNode) => {
//             newNode.scale = 0.2;
//         });
//     }



//     test(name = "hzmj") {
//         let config = null;
//         switch (name) {
//             case "hzmj"://
//                 config = {
//                     playerCount: 4,
//                     createRoomType: 1,   // 开房模式
//                     baseScore: 1,        //底分
//                     juShu: 1000,           // 局数
//                     pei: 1              //赔付模式
//                 };
//                 break;
//             case ""://
//                 break;
//             default:
//                 console.error("事件待处理：", name);
//                 break;
//         }

//         NetHelp.createNormalRoom(name, config, (retData) => {
//             let { code, info } = retData;
//             if (code == 0) {
//                 let roomCode = info.roomCode;
//                 NetHelp.joinRoom(roomCode, (retData) => {
//                     let { code, info } = retData;
//                     if (code == 0) {
//                         // this.onCloseClick() //成功则关闭窗口 准备切换
//                     } else {
//                         UIHelper.showTips(info);
//                     }
//                 });
//             } else {
//                 GD.GameTool.showTextTips(info);
//             }
//         })
//     }

//     //支付测试
//     paytest() {

//         // let url = "https://c588-47-57-240-47.ngrok.io/charge";
//         // let xhr = new XMLHttpRequest();
//         // xhr.onreadystatechange = function () {
//         //     console.log("xhr.readyState  " + xhr.readyState);
//         //     console.log("xhr.status  " + xhr.status);
//         //     if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
//         //         console.log(xhr.responseText);
//         //         NativeCall.inst.aliWebViewPay(xhr.responseText,(result)=>{

//         //         });
//         //     }
//         // }.bind(this);
//         // xhr.open("GET", url, true);
//         // xhr.send();
//         UIHelper.showWaitLayer(true, "等待测试", 30);
//     }

//     firstLoginClick() {
//         AudioControl.playClick();
//         GD.GameTool.createPanel("hall/panel/panel_loginSign", (node) => {
//             node.getComponent(panel_loginSign).onInitLoginSignUI(true);
//         });
//     }

//     // update (dt) {}

//     // 侧边栏打开或收起
//     onSideBarBtnClick() {
//         AudioControl.playClick();
//         if (this.sideBarNode.x == -1124) {
//             //节点下的mask图片激活
//             //this.sideBarNode.getChildByName("mask").active = true;
//             // 按钮的图片改成sideBarBtnSpriteFrames[1]
//             this.btnSideBar.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this.sideBarBtnSpriteFrames[1];
//             cc.tween(this.sideBarNode)
//                 .to(0.5, { position: cc.v3(-798, this.sideBarNode.y, 0) })
//                 .start();
//         } else {
//             this.btnSideBar.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this.sideBarBtnSpriteFrames[0];
//             //this.sideBarNode.getChildByName("mask").active = false;
//             cc.tween(this.sideBarNode)
//                 .to(0.5, { position: cc.v3(-1124, this.sideBarNode.y, 0) })
//                 .start();
//         }
//     }

//     // 关闭侧边栏
//     closeSideBar() {
//         // if (this.sideBarNode.x = -798) {
//         //     this.btnSideBar.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this.sideBarBtnSpriteFrames[0];
//         //     //this.sideBarNode.getChildByName("mask").active = false;
//         //     cc.tween(this.sideBarNode)
//         //         .to(0.5, { position: cc.v3(-1124, this.sideBarNode.y, 0) })
//         //         .start();
//         // }
//     }

//     // update(dt) {
//     //     this.jackpotLabel.string = GameData.Instance.JackpotNumber.toFixed(2)
//     //         .replace(/\B(?=(\d{3})+(?!\d))/g, ".");  // 使用点作为千位分隔符

//     //     // this.jackpotLabel.string 最后面一个.改为,
//     //     this.jackpotLabel.string = this.jackpotLabel.string.replace(/\.(?=[^.]*$)/, ',');;

//     //     // 根据时间戳生成一个大于100000000,00的基础值
//     //     if (GameData.Instance.JackpotNumber == 0) {
//     //         let baseJackpot = 100000000.00 + Date.now() % 1000000;
//     //         GameData.Instance.JackpotNumber = baseJackpot;
//     //     }

//     //     // 每隔5秒，随机在总分数上增加5000~50000中间的数
//     //     this.schedule(() => {
//     //         let increment = Math.floor(Math.random() * (50000 - 5000 + 1)) + 5000;
//     //         let currentJackpot = GameData.Instance.JackpotNumber;
//     //         let targetJackpot = currentJackpot + increment;
//     //         let duration = 2; // 动画持续时间为2秒

//     //         // 动画逐渐增加到目标值
//     //         cc.tween(GameData.Instance)
//     //             .to(duration, { JackpotNumber: targetJackpot }, {
//     //                 progress: (start, end, current, ratio) => {
//     //                     let currentValue = start + (end - start) * ratio;
//     //                     this.jackpotLabel.string = currentValue.toFixed(2)
//     //                         .replace(/\B(?=(\d{3})+(?!\d))/g, ".");  // 使用点作为千位分隔符
//     //                         // .replace(/\./g, "#")  // 先将所有点替换为临时字符，例如 '#'
//     //                         // .replace(",", ".")  // 将逗号替换为点
//     //                         // .replace(/#/g, ",");  // 最后将临时字符替换为逗号
//     //                     this.jackpotLabel.string = this.jackpotLabel.string.replace(/\.(?=[^.]*$)/, ',');;
//     //                     return currentValue;
//     //                 }
//     //             })
//     //             .start();
//     //     }, 5);
//     // }
// }
