import { WEB_NOTICE } from "../../kernel/Core/extend/ConstDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class notice extends cc.Component {

    //by_009:通知内容
    @property(cc.Label)
    noticeTxt: cc.Label = null;

    noticeArr:WEB_NOTICE[] = [];

    bindObj = [];
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //@ts-ignore
        this.noticeTxt._forceUpdateRenderData(true)
    }

    start () {
        
        this.bindEvent();

        NetHelp.getWebNotice((ret)=>{
            if(ret.code != 0){
                UIHelper.showTips(ret.info);
                return;
            }
            this.noticeArr = ret.data as WEB_NOTICE[];
            this.noticeArr = [
                { 
                    text:"為發揚三千年象棋傳統文化，讓中華象棋游戲傳播全球，特此打造本游戲提供給全球華人用戶娛樂",
                    titile:"",
                    sort:0,
                },
                { 
                    text:"In order to carry forward the 3,000-year-old traditional chess culture and spread the Chinese chess game to the world, this game is hereby created to provide entertainment to Chinese users around the world",
                    titile:"",
                    sort:1,
                },
                { 
                    text:"游戲金幣可通過看廣告獲得，游戲可收徒和拜師，徒弟可以給師傅提供貢獻值",
                    titile:"",
                    sort:2,
                },
                // { 
                //     text:"Game diamond only single recharge, do not provide exchange and cash",
                //     titile:"",
                //     sort:3,
                // },
                // { 
                //     text:"VIP在對局中可額外獲得金幣，VIP1-VIP3可在商店購買，VIP4-VIP8可通盲盒抽獎獲得。",
                //     titile:"",
                //     sort:4,
                // },
                // { 
                //     text:"Vips earn extra gold in matches, VIP1-VIP3 can be purchased at the store, and VIP4-VIP8 can be won through a blind box draw",
                //     titile:"",
                //     sort:5,
                // },
            //     { 
            //         text:"这是第七条。。。。。。",
            //         titile:"",
            //         sort:0,
            //     },
            //     { 
            //         text:"这是第八条。。。。。。。。",
            //         titile:"",
            //         sort:0,
            //     },
            //     { 
            //         text:"这是第九条。。。。。。。。。",
            //         titile:"",
            //         sort:0,
            //     },
            //     { 
            //         text:"这是第十条。。。。。。。。。。",
            //         titile:"",
            //         sort:0,
            //     },
            ]
            this.rollWebNotice();
        })
    }

    bindEvent() {
        this.bindObj = [];
        this.bindObj.push(onfire.on("ON_ANNOUNCEMENT",this.onAnnouncement.bind(this)));
    }

    onDestroy() {
        for (let i = 0; i < this.bindObj.length; i++) {
            onfire.un(this.bindObj[i]);
        }
    }

    // update (dt) {}

    rollNoticeLinshi(text: string = null) {
        let obj = { 
            text:text,
            titile:"",
            sort:0,
            linshi:0
        }
        this.noticeArr.unshift(obj);
    }

    // rollIndex = 0;
    rollWebNotice(){
        if(this.noticeArr.length <= 0)return;
        let rollSpeed = 100;
        let startPos = 375;
        let endPos = -375;
        let offset = 0;
        let time = 0;
        let obj = null;
        let cb = ()=>{
            this.noticeTxt.node.setPosition(startPos,this.noticeTxt.node.y);
            // let text = this.noticeArr[this.rollIndex].text;
            obj = this.noticeArr.shift()
            let text = obj.text;
            this.noticeTxt.string = text;
            offset = this.noticeTxt.node.width;
            time = (startPos-endPos+offset)/rollSpeed;
        }
        cb();
        cc.tween(this.noticeTxt.node)
        .to(time,{position:cc.v2(endPos-offset,this.noticeTxt.node.y)})
        .call(()=>{
            // this.rollIndex++;
            // if(this.rollIndex >= this.noticeArr.length)this.rollIndex = 0;
            if("linshi" in obj){

            }else{
                this.noticeArr.push(obj)
            }
            this.rollWebNotice();
        })
        .start()
    }

    onAnnouncement(data){
        console.log(data);
        this.rollNoticeLinshi(data.text);
    }


}
