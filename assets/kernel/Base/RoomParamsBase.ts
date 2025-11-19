/**
 * 创建房间参数选择
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class  RoomParamsBase extends cc.Component {
    moduleEnName = ""

    getCreateParam():any{
        return this.toogle2Parmas()
    }

    /**
     *toogle 名字按照固定格式 var_2  则会生成 {var:2} 这样的对象
     *
     * @returns {*}
     */
    toogle2Parmas():any{

        let toogles = this.node.getComponentsInChildren(cc.Toggle);

        let result:any = {};
        for (let i = 0; i < toogles.length; i++) {
            let toggle = toogles[i];
            if (toggle.node.active&& toggle.isChecked){
                let nodeName = toggle.node.name;
                let  splitArray = nodeName.split("_");
                if ((splitArray.length>=2))
                {
                    const [paramName, value] = splitArray;
                    result[paramName] = Number(value);
                }
            }
        }

        result['playerCount'] = result.renshu;
        return result
    }

    getSelectedGame(){
        return null;
    }

    /**
     * 返回 -1 则是配置错误
     *
     * @param {*} yourParams //你的面板数据
     * @param {any[]} costConfigArray //配置数组  例子 [{"createRoomType":1,"maxRound":1,"cost":2},{"createRoomType":1,"maxRound":2,"cost":4}]
     * @returns
     */
    getCostByConfig(yourParams:any,costConfigArray:any[] ) {
        let cost = 0
        for (let index = 0; index < costConfigArray.length; index++) {
            cost = -1
            const costData = costConfigArray[index];
            if (this.checkCostData(costData, yourParams)) //符合配置
            {
                cost = costData.cost
                break
            }
        }
        return cost
    }

    private checkCostData(costData, clientConfig) {
        let allOK = true
        for (const key in costData) {
            if (key == "cost") {
                continue
            }
            if (clientConfig[key] != costData[key]) {
                allOK = false
                break
            }
        }
        return allOK
    }
   
}
