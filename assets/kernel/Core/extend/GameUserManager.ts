import {SGNetKernel} from "./SGNetKernel";
import {ClientUserItem} from "./ClientUserItem";
let gameConst = require("KernelDefine").gameConst;

export class GameUserManager {
    tableWatcher:{[key:number]:ClientUserItem} = {}; //观战者
    SGKernel: SGNetKernel = null;
    tableUserItem:ClientUserItem []= [];
    init(SGKernel: SGNetKernel) {
        this.SGKernel = SGKernel;
        this.tableUserItem = [];
        this.tableWatcher = {};
    }
    clearAllUserItem(){
        this.tableUserItem = [];
    }
    getTableUserItemCount(){
        return this.tableUserItem.length;
    }
    //创建玩家
    createNewUserItem(userInfo:ClientUserItem) {


        var userItem = new ClientUserItem();
        userItem.init(userInfo)
        if (userItem.chairID == gameConst.INVALID_CHAIR) {
            this.tableWatcher[userItem.userID] = userItem; //观战
        } else {
            this.tableUserItem[userInfo.chairID] = userItem;
            this.SGKernel.onUserItemActive(userItem);

        }

        return userItem;
    }
    /*
     *查找操作
     */

    //通过游戏ID查找用户
    getUserByUserID(userID):ClientUserItem{
        //桌子用户
        for (var i = 0; i < this.tableUserItem.length; ++i) {
            var userItem = this.tableUserItem[i];
            if ((userItem != null) && (userItem.getUserID() == userID)) {
                return userItem;
            }
        }

        if(this.tableWatcher[userID]){
            return this.tableWatcher[userID]
        }

        return null;
    }

    //删除用户
    deleteUserItem (clientUserItem) {
        if (clientUserItem == null || clientUserItem.getChairID() >= this.tableUserItem.length) {
            return false;
        }

        var chairID = clientUserItem.getChairID();
        if (this.tableUserItem[chairID] != clientUserItem) {
            return false;
        }
        this.tableUserItem[chairID] = null;
        this.SGKernel.onUserItemDelete(clientUserItem);

        return true;
    }
    //更新分数
    updateUserItemScore(clientUserItem, userScore) {
        clientUserItem.score = userScore;
        this.SGKernel.onUserItemUpdateScore(clientUserItem, userScore);
    }
    //桌子玩家
    getTableUserItem(chairID) {
        return this.tableUserItem[chairID];
    }

    //更新状态
    updateUserItemStatus(clientUserItem, statusInfo) {
        clientUserItem.tableID = statusInfo.tableID;
        clientUserItem.chairID = statusInfo.chairID;
        clientUserItem.userStatus = statusInfo.userStatus;
        this.SGKernel.onUserItemUpdateStatus(clientUserItem, statusInfo);
    }

    //[3,2,0,1]   3号跑到0座位  2跑到1号座位
    resetChiar(chairArray) {
        let oldUserItems = this.tableUserItem.slice(0)
        this.clearAllUserItem()
        for (var i = 0; i < chairArray.length; i++) {
            let newChairID = chairArray[i]
            let userItem = oldUserItems[newChairID];
            if (userItem) {
                userItem.chairID = i
            }
            this.tableUserItem[i] = userItem
        }
    }
}