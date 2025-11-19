/**
 * 全局对象保存
 **
 */
declare const window: any;
export let KernelData = {
	advNum:0,
	socketLog:true,//是否开启socket日志
	nickname: "",
	password:"",
	head:"",
	openid:"",
	clubID:0,
	userID: 0,
	gameID: 0,
	diamond: 0,
	score: 0,
	goldBean: 0,
	roomID:0,
	bankScore: 0,
	hasRealNameAuthorized:false,
	chairID: 0xFFFF,
	tableID: 0xFFFF,
	gamelistData: [], //游戏列表信息
	uuid: "", //uuid 用来id登录
	phone: 0, //手机号
	gameSink:null,//游戏钩子
	moduleEnName:"",
	clubData:{}, //俱乐部数据{[clubID:number]:CLUB_INFO} 
	tables:{}, //自己相关联的桌子数据{[房间号]]:{tableSetting,players}}
	inviteeRewards:{},
    invitees:[],
	realWin:0,
    referralAmount:0,
    withdrawalAmount:0,
	depositAmount:0,
	mail:'',
    mobile:'',
}



