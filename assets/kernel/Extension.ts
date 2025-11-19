

let WECHAT_APPID = "wx9291c65e683d3c1f";

export default class Extension {

    private static _inst = new Extension();

    private constructor(){

    }

    public static get inst(){
        return Extension._inst;
    }

    private type_wxtoken = "weixin_token";
    private type_appleLogin = "apple_login";
    private type_ad_show_start = "ad_show_start";
    private type_ad_show_end = "ad_show_end";
    private type_apple_ad = "apple_ad";
    private APIClass = "org/cocos2dx/javascript/extension/Extension";
    private callBackHandler = {};


    private iOSClass = "AppJSController";

    /**
    * 调用其他平台方法通用函数
    * @param funcName params
    */

    callStaticMethod(funcName, params) {
        let paramsStr = JSON.stringify(params);
        if (cc.sys.isNative && cc.sys.OS_ANDROID == cc.sys.os) {
            jsb.reflection.callStaticMethod(this.APIClass, funcName, "(Ljava/lang/String;)Ljava/lang/String;", paramsStr);
        }
    };

    /**
     * 提供java 和 oc回调
     * @param str
     */
    callback(jsonObj) {
        console.log(`收到原生回调 type = ${jsonObj}`);
        try {
            if (cc.sys.os == cc.sys.OS_IOS) {
                let str = decodeURIComponent(jsonObj);
                console.log(`ios回调 = ${str}`);
                jsonObj = JSON.parse(str);
            }
            var handler = this.callBackHandler[jsonObj['type']];
            if (handler) {
                handler(jsonObj);
            }
        }
        catch (e) {
            console.log("Extension.callbackError");
        }
    };

    /**
    * 检查是否安装微信
    */
    isInstallWeiXin(appID: string) {
        if (cc.sys.isNative) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                return jsb.reflection.callStaticMethod(
                    this.APIClass,
                    'isInstallWechat',
                    '(Ljava/lang/String;)Z',
                    appID
                );
            }
            else if (cc.sys.os == cc.sys.OS_IOS) { //TODO:待添加
                return true;
            }
        }
        return false;
    }

    /**
     * 获取微信登陆token
     */
    getWeixinToken(handler, appid: string) {
        if (!handler || !cc.sys.isNative) {
            console.log("error getWeixinToken need a handler");
            return;
        }
        this.callBackHandler[this.type_wxtoken] = handler;//注册回调函数
        console.log("-------->Extension.getWeixinToken");
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            console.log("Extension.getWeixinToken android");
            jsb.reflection.callStaticMethod(
                this.APIClass,
                'getWechatToken',
                '(Ljava/lang/String;)V',
                appid
            );
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            console.log("ios微信登陆");
            jsb.reflection.callStaticMethod(this.iOSClass, "onWXLoginClick");
        }
    };

    /**
     * 苹果登陆
     */
    appleLogin(handler) {
        console.log("ios登陆");
        if (!handler || !cc.sys.isNative) {
            console.log("error getWeixinToken need a handler");
            return;
        }
        this.callBackHandler[this.type_appleLogin] = handler;//注册回调函数
        jsb.reflection.callStaticMethod(this.iOSClass, "onAppleLoginClick");
    }


    /**
     * 调用微信支付
     */
    payByWechat(params) {
        if (!cc.sys.isNative) {
            return;
        }
        console.log("-------->Extension.payByWechat");

        if (cc.sys.os == cc.sys.OS_ANDROID) {
            params["wechatAppID"] = WECHAT_APPID;
            this.callStaticMethod("payByWechat", params);
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            console.log("微信支付");
            jsb.reflection.callStaticMethod(this.iOSClass, "onWXZhiClick:", JSON.stringify(params));
        }
    };

    /**
     * 复制
     * @param content 内容
     */
    gameCopy(content:string){
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(
                this.APIClass,
                'copy',
                '(Ljava/lang/String;)V',
                content
            );
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.iOSClass, "onCopyClick:", JSON.stringify({content:content}));
        }
    }

    /**
     * 调用ios支付
     */
    onAppleZhi(params) {
        console.log("ios支付");
        jsb.reflection.callStaticMethod(this.iOSClass, "onAppleZhi:", JSON.stringify(params));
    }

    /**
     * 调用ios广告
     */
    onAppleAdClick(handler) {
        this.callBackHandler[this.type_apple_ad] = handler;
        jsb.reflection.callStaticMethod(this.iOSClass, "onAdClick");
    }

    /**
     * 调用广告
     */
    showVideoAd(params, startHandler, endHandler) {
        if (!cc.sys.isNative) {
            return;
        }
        console.log("-------->Extension.showVideoAd");
        this.callBackHandler[this.type_ad_show_start] = startHandler;//注册回调函数
        this.callBackHandler[this.type_ad_show_end] = endHandler;//注册回调函数
        this.callStaticMethod("showVideoAd", params);
    };
}