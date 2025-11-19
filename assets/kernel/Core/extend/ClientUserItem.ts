let gameConst = require("KernelDefine").gameConst;

//游戏中的玩家数据
export class ClientUserItem {
    userID = null;
    gameID = null;
    tableID = null;
    chairID = null;
    nickname = null;
    sex = 0;
    score: 0;
    goldBean:0;
    userStatus = gameConst.US_NULL;
    vipLevel = 0;
    otherInfo = null; //其它信息
    agreeDismiss = -1; //同意解散 -1 未投票， 0 不同意，1同意
    head = ""; //玩家的头像URL;如果是微信用户就有。
    online = 0;

    init(userInfo) {
        this.userID = userInfo.userID;
        this.gameID = userInfo.gameID;
        this.tableID = userInfo.tableID;
        this.chairID = userInfo.chairID;
        this.nickname = userInfo.nickname;
        this.sex = userInfo.sex;
        this.score = userInfo.score;
        this.goldBean = userInfo.goldBean;
        this.userStatus = userInfo.userStatus;
        this.vipLevel = userInfo.vipLevel;
        this.head = userInfo.head;
        this.otherInfo = userInfo.otherInfo; //其它信息
        this.online = userInfo.online;
    }

    /*
     * 属性信息
     */

    //用户性别
    getGender() {
        return this.sex;
    }
    //用户ID
    getUserID() {
        return this.userID;
    }
    //游戏ID
    getGameID() {
        return this.gameID;
    }
    //头像ID
    getHead() {
        return this.head;
    }
    //头像ID
    getFaceID() {
        return 1;
    }
    //用户昵称
    getNickname() {
        return this.nickname;
    }
    //用户桌子
    getTableID() {
        return this.tableID;
    }
    //用户椅子
    getChairID() {
        return this.chairID;
    }
    //用户状态
    getUserStatus() {
        return this.userStatus;
    }
    //积分信息
    getUserScore() {
        return this.score;
    }
    //vip等级
    getVipLevel() {
        return this.vipLevel;
    }

    //vip等级
    getMemberOrder() {
        return 0;
    }
    //其它信息
    getOtherInfo() {
        return this.otherInfo;
    }

    isOnline() {
        return this.online == 1;
    }
}