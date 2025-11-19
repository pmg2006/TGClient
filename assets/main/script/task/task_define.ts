import { EM_ITEM_TYPE } from "../shop/shop_defind";

export enum EM_TASK_TYPE {
    Day=0,//日常
    Vip=1,//vip
    Forever=1,//活动
}

export enum EM_TASK_STATE{
    Unreceive = 0,//已领取
    Reject = 1,  //未完成
    Receive = 2,//可领取
}

export class task_mg {
    sort:number;//:排序
    taskID:number//: 任务Id;
    pro:number//: 任务当前进度数值;
    count:number//:任务目标值
    state:EM_TASK_STATE//: 任务状态2可领取1未完成0已经领取;
    name:string//:任务名称
    field:string//:奖励字段名称
    gifCnt:number//:奖励数量
    taskType:EM_ITEM_TYPE;//任务类型
}