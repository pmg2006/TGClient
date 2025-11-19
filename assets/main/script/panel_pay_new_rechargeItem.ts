/**
 * 玩法帮助
 */

import { keyBy } from "lodash";
import { AudioControl } from "./AudioControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class panel_pay_new_rechargeItem extends cc.Component {

   @property(cc.Label)
   countLabLeft: cc.Label = null;
   @property(cc.Label)
   countLabRight: cc.Label = null;
   @property(cc.Label)
   countLabPercentage: cc.Label = null;


   public itemData: any = {};
   initItemUI(data) {
      this.countLabLeft.string = "₹" + data.cnt;
      this.countLabRight.string = "₹" + data.cnt * 1.2; //data.cnt*data.rewardPercent
      if (data.givePercent && data.firstFiveTimesCharge<=5) {
         this.countLabPercentage.string = "+" + data.givePercent + "%"  //data.rewardPercent;
      } else {
         this.countLabPercentage.string = ""
      }

      let _data = data.buyType;
      for (let key in _data) {
         this.itemData.buyTypeId = key;
         this.itemData.type = _data["type"];
      }
      this.itemData.givePercent = data.givePercent;
      this.itemData.goodID = data.goodID;
      this.itemData.itemID = data.itemID;
      this.itemData.cnt = data.cnt;
   }

   getItemInfo() {
      return this.itemData;
   }
}
