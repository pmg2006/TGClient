//下推坐下消息
export  interface DATA_SITDOWN {
    chairID:number;
    moduleID:number;
    roomID:number;
    tableID:number;
    moduleEnName:string;
}
//游戏内消息
export  interface DATA_GAME_MSG{
    mainCMD:number;//主命令
    subCMD:number;//子命令
    data?:any;// 内容

}
export  interface DATA_ROOM_INFO{
    roomCard:boolean;//是否房卡
    sortID:number;//排序ID
    moduleID:number;//模块ID
    roomID:number;//房间ID
    enterScore:number;//进入分数
    androidScoreBase:number;//机器人进入分数基准
    presetAndroidCount:number;//预定机器人数量
    FreeMode:boolean; //是否体验房
    cheatMode:boolean;//防作弊模式
    AndroidNum:number;//单机启动安卓数量
    moduleEnName:string;//游戏名(英文)
    moduleName:string;//游戏名(中文)
    GameMode:number;//房间模式(0=所有准备,1=椅子坐满且全准备则开始 ,2=百人游戏)
    TableCount:number;//最大桌子数
    ChairCount:number;//ChairCount
}
//游戏列表
export  interface  DATA_GAME_LIST {
    [mouleID:number]:DATA_ROOM_INFO[]
}