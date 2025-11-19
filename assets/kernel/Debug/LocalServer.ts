
import { KernelData } from "../Core/KernelData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LocalServer extends cc.Component {
    @property
    serverUrl = "http://127.0.0.1:1234"
    @property
    moduleEnName = "hongzhongmj"
    start() {
        let replayData = cc.sys.localStorage.getItem("replayData")
        if (replayData) {//回放
            clientKernel.replay(this.moduleEnName, replayData)//走回放流程
        }
        else {
            NetHelp.connect(this.serverUrl, () => {
                let userID = GameTools.GetQueryString("userID") || 0 //有没有指定userid登录
                userID = Number(userID)
                KernelData.userID = userID //用这个userID登录
                KernelData.moduleEnName = this.moduleEnName
                NetHelp.loginByUserID()
            })
        }
    }
}
