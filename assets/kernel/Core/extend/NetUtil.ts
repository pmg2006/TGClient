// @ts-ignore
import * as ConstDefine from "./ConstDefine";
export default class NetUtil {

    /**
     *
     * @param {EM_LOGINTYPE} type 登录类型
     * @param {string} extendField 微信code,游客不需要，token
     * @return {Promise<Server_RES>} 成功Server_RES.data结构体为 USER_INFO
     */
    static async loginSever(type: ConstDefine.EM_LOGINTYPE, extendField?: string,cfg?:ConstDefine.CONNEC_CONFIG): Promise<ConstDefine.Server_RES> {
        await NetUtil.initSync(cfg);
        return await NetUtil.requestSync(ConstDefine.msgRouter.enter, {
            type: type,
            extendField: extendField
        });
    }

    public static async  initSync(connetConfig?) {
        return new Promise<void>((resolve, reject) => {
            let callBack = () => {
                resolve();
            };
            if (!connetConfig) {
                window["pomelo"].init(ConstDefine.CONNECTION_CONFIG, callBack);
            } else {
                window["pomelo"].init(connetConfig, callBack);
            }
        });

    }
    public static init(connetConfig = null,callBack?) {
        if (!connetConfig) {
            window["pomelo"].init(ConstDefine.CONNECTION_CONFIG, callBack);
        } else {
            window["pomelo"].init(connetConfig, callBack);
        }
    }
    /**
     * 断开连接
     */
    public static disconnect(clearCall = false) {
        window["pomelo"].disconnect(clearCall);
    }

    /**
     * 监听一次性事件
     * @param eventName 事件名
     * @param callback callback(data)回调方法
     * @param target 绑定的self
     */
    public static once(eventName: string, callback: Function, target?: any) {
        window["pomelo"].once(eventName, callback, target);
    }

    /**
     * 监听事件
     * @param eventName 事件名
     * @param callback callback(data)回调方法
     * @param target 绑定的self
     */
    public static on(eventName: string, callback: Function, target?: any) {
        window["pomelo"].on(eventName, callback, target);
    }

    /**
     * 取消监听事件
     * @param eventName 事件名
     * @param callback callback(data)回调方法
     * @param target 绑定的self
     */
    public static off(eventName: string, callback: Function, target?: any) {
        window["pomelo"].off(eventName, callback, target);
    }

    public static request(route: string, data: Object,callback){
        if (window["G_OPEN_SOCKET_LOG"]) {
            console.log("requrest " + JSON.stringify({ route: route, data: data }, null, 4));
        }
        window["pomelo"].request(route, data, callback);
    }
    /**
     *
     * @param route
     * @param data
     */
    public static async  requestSync(route: string, data: Object):Promise<ConstDefine.Server_RES> {
        return new Promise((resolve, reject) => {
            let callback = (data: ConstDefine.Server_RES) => {
                resolve(data);
            };
            if (window["G_OPEN_SOCKET_LOG"]) {
                console.log("requestSync " + JSON.stringify({ route: route, data: data }, null, 4));
            }
            window["pomelo"].request(route, data, callback);
        });
    }

    /**
     * 发送notify
     * @param route 要发送request信息的handler
     * @param data 要发送的数据
     */
    public static notify(route: string, data: any) {
        if(window["G_OPEN_SOCKET_LOG"]){
            console.log("notify "+ JSON.stringify({route:route, data:data}, null, 4));
        }
        window["pomelo"].notify(route, data);
    }
}