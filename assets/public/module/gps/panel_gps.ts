const {ccclass, property} = cc._decorator;

@ccclass
export default class panel_gps extends cc.Component {

    @property(cc.Node)
    sprite_splash: cc.Node = null;

    @property(cc.Node)
    GPSNode: cc.Node = null;
    @property(cc.Node)
    GPS_info: cc.Node = null;
    @property(cc.Node)
    juliNode: cc.Node = null;
    @property(cc.Node)
    p_name: cc.Node = null;
    @property(cc.Node)
    playerNode: cc.Node = null;


    @property({type:cc.Node,tooltip:"过近条"})
    item_jin: cc.Node = null;
    @property({type:cc.Node,tooltip:"正常条"})
    item_ok: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //打开GPS的人
        let openGPS = [];

        let config = clientKernel.getTableSetting();
        let renshu = config.renShu || config.renshu || config.playerCount;

        this.playerNode.destroyAllChildren();
        this.GPSNode.destroyAllChildren();
        for (let i = 0; i < renshu; i++) {
            let data = clientKernel.getTableUserItem(i);
            if (data) {
                //扫描名字
                let p_name = cc.instantiate(this.p_name);
                p_name.parent = this.playerNode;
                p_name.active = true;
                p_name.getComponent(cc.Label).string = data.nickname;

                //gps检测
                let GPS_info = cc.instantiate(this.GPS_info);
                GPS_info.parent = this.GPSNode;
                GPS_info.active = true;
                let icon_state = cc.find("icon_state", GPS_info);
                let describe = cc.find("describe", GPS_info);
                let name = cc.find("name", GPS_info);
                name.getComponent(cc.Label).string = data.nickname;
                if (data.otherInfo.gps) {
                    openGPS.push(data);
                }
                let has = data.otherInfo.gps != undefined;
                icon_state.children[0].active = has;//打钩
                icon_state.children[1].active = !has;//叹号
                describe.children[0].active = has;//正常
                describe.children[1].active = !has;//未开启
            }
        }


        this.juliNode.destroyAllChildren();
        console.log("打开GPS的人",openGPS);
        let jin = [];//过近的
        let ok = [];//正常的
        while (openGPS.length > 0) {
            console.log("openGPS.length:",openGPS.length);
            if(openGPS.length == 1){
                ok.push(openGPS[0]);
                openGPS.splice(0,1);
                break;
            }

            let jin_zu = [];
            let isOK = true;
            for (let i = 1; i < openGPS.length; i++) {
                let mi = GameTools.getFlatternDistance(
                    openGPS[0].otherInfo.gps.Longitude,
                    openGPS[0].otherInfo.gps.Latitude,
                    openGPS[i].otherInfo.gps.Longitude,
                    openGPS[i].otherInfo.gps.Latitude,
                )
                // console.log("mi",openGPS[0].nickname,openGPS[i].nickname,mi);
                if(mi <= 200){
                    jin_zu.push(openGPS[1]);
                    openGPS.splice(1,1);
                    i--;
                    isOK=false;
                }
            }
            if(isOK == true){
                ok.push(openGPS[0]);
                openGPS.splice(0,1);
            }else {
                jin_zu.push(openGPS[0]);
                openGPS.splice(0,1);
            }

            if (jin_zu.length>0){
                jin.push(jin_zu);
            }

        }
        console.log("jin",jin, "ok",ok);

        //生成近条
        for (let i = 0; i < jin.length; i++) {
            let nameTemp = "";
            let item_jin = cc.instantiate(this.item_jin);
            item_jin.parent = this.juliNode;
            item_jin.active = true;
            let name = cc.find("name", item_jin);
            for (let j = 0; j < jin[i].length; j++) {
                nameTemp += jin[i][j].nickname+"、";
            }
            name.getComponent(cc.Label).string = nameTemp;
        }

        //生成正常条
        for (let i = 0; i < ok.length; i++) {
            let item_ok = cc.instantiate(this.item_ok);
            item_ok.parent = this.juliNode;
            item_ok.active = true;
            let name = cc.find("name", item_ok);
            name.getComponent(cc.Label).string = ok[i].nickname;
        }

    }

    start () {
        this.sprite_splash.on(cc.Node.EventType.TOUCH_END,this.onClose,this);
    }

    onClose(){
        this.node.destroy();
    }

    // update (dt) {}
}
