import { ALIPAY_RESULT } from "../main/script/shop/shop_defind";


export default class NativeCall {

    private static _inst = new NativeCall();

    private constructor() {

    }

    public static get inst() {
        return NativeCall._inst;
    }

    ///////////////--none--////////////////

    //留给原生端调用
    private wxLoginCallback: Function = null;
    private adCallback: Function = null;
    private aliPayCallback:Function = null;
    private wxPayCallback:Function = null;
    private fbLoginCallBack:Function = null;
    private lineLoginCallBack:Function = null;

    public wxLogin(callback: Function) {
        if (!cc.sys.isNative) return;
        if (callback) this.wxLoginCallback = callback;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "weixin_login", "(Ljava/lang/String;)V", "weixin_login");
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            console.log("ios微信登陆");
            //@ts-ignore
            jsb.reflection.callStaticMethod("AppJSController", "onWXLoginClick");
        }
    }

    public wxLoginResult(code) {
        if (!cc.sys.isNative) return;
        console.log("wxLoginResultcode=" + code)
        this.wxLoginCallback && this.wxLoginCallback(code);
    }

    public faceBookLogin(callback: Function){
        if (!cc.sys.isNative) return;
        if (callback) this.fbLoginCallBack = callback;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "loginFacebook", "(Ljava/lang/String;)V", "loginFacebook");
        }
    }
    public FacebookLoginCallBack(data){
        if (!cc.sys.isNative) return;
        console.log("facebookLoginCallBack=" + data)
        this.fbLoginCallBack && this.fbLoginCallBack(data);
    }
    public lineLogin(callback: Function){
        if (!cc.sys.isNative) return;
        if (callback) this.lineLoginCallBack = callback;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "loginLine", "()V");
        }
    }
    public loginLineCallback(data){
        if (!cc.sys.isNative) return;
        console.log("lineLoginCallBack=" + data)
        this.lineLoginCallBack && this.lineLoginCallBack(data);
    }


    /**
     * 展示广告
     * @param type 类型
     * @param callback 回调
     */
    public adShow(type: number, callback: Function) {
        if (!cc.sys.isNative) return;
        UIHelper.showWaitLayer(true, "广告加载中");
        console.log("点击广告type = ", type);
        if (callback) this.adCallback = callback;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "onAdClick", "(I)V", type);
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("AppJSController", "onAdClick:", type);
        }
    }

    /**
     * 广告回调
     * @param result 结果{type,status}
     */
    public adResult(result: any) {
        console.log("广告结果=" + JSON.stringify(result));
        
        UIHelper.showWaitLayer(false);
        this.adCallback && this.adCallback(result.status);
    }


    public aliWebViewPay(url,callback: Function) {
        if (!cc.sys.isNative) return;
        UIHelper.showWaitLayer(true, "请稍侯");
        console.log("支付form = ",url);
        if (callback) this.aliPayCallback = callback;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "onAliWebViewPay", "(Ljava/lang/String;)V", url);
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("AppJSController", "onAliWebViewPay:", url);
        }
    }

    public aliWebViewPayResult(result: ALIPAY_RESULT) {
        console.log("支付结果=" + JSON.stringify(result));
        UIHelper.showWaitLayer(false);
        this.aliPayCallback && this.aliPayCallback(result);
    }

    public wxWebViewPay(url,callback: Function) {
        if (!cc.sys.isNative) return;
        UIHelper.showWaitLayer(true, "请稍侯");
        console.log("微信支付 = ",url);
        if (callback) this.wxPayCallback = callback;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "onWxWebViewPay", "(Ljava/lang/String;)V", url);
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("AppJSController", "onAliWebViewPay:", url);
        }
    }

    public wxWebViewPayResult(status: any) {
        console.log("支付结果=" +JSON.stringify( status));
        UIHelper.showWaitLayer(false);
        this.wxPayCallback && this.wxPayCallback(status);
    }

    public onClickReport(){
        if (!cc.sys.isNative) return;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "onClickReport","()V");
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            //@ts-ignore
            jsb.reflection.callStaticMethod("AppJSController", "onClickReport");
        }
    }

    
    /**
     * 微信分享图片
     * @param imgFilePath 图片路径
     * @param isTimeLine 1表示朋友圈，0好友
     */
    public wxShareImage(imgFilePath, isTimeLine) {
        if (!cc.sys.isNative) return;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "shareImageWithLocalPath", "(Ljava/lang/String;I)V", imgFilePath, isTimeLine);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("AppJSController", "wxShareImage:scene:", imgFilePath, isTimeLine);
        }
    };

    /**
     * 截图整个屏幕并分享给好友
     */
    wxShareCurrentScreen(isTimeLine) {
        const rootNode = cc.find("Canvas");
        this.shareScreenShoot(rootNode, null, true, isTimeLine);
    };

    /**
     * 微信截图分享分享给好友
     * @param shareNode 截屏节点
     * @param hideNodes 隐藏节点
     * @param hasMask 是否有mask
     * @param isTimeLine 1表示朋友圈，0好友
     */
    shareScreenShoot(shareNode, hideNodes, hasMask, isTimeLine) {
        if (!cc.sys.isNative) {
            return;
        }

        var fileName = "result_share.jpg";
        var fullPath = jsb.fileUtils.getWritablePath() + fileName; //拿到可写路径，将图片保存在本地，可以在ios端或者java端读取该文件
        if (jsb.fileUtils.isFileExist(fullPath)) {
            console.log("截图: 存在");
            jsb.fileUtils.removeFile(fullPath);
        }
        var size = cc.winSize;
        //@ts-ignore
        let gl = cc.game._renderContext;
        var texture = new cc.RenderTexture();
        texture.initWithSize(size.width, size.height, gl.STENCIL_INDEX8);
        cc.Camera.main.targetTexture = texture;
        cc.director.getScene().scaleY = -1;
        //@ts-ignore
        cc.Camera.main.render();
        cc.director.getScene().scaleY = 1;
        cc.Camera.main.targetTexture = null;
        let data = texture.readPixels();
        console.log("保存截图的路径", fullPath);
        let success = jsb.saveImageData(data, size.width, size.height, fullPath);

        if (success) {
            console.log("twl 截屏成功-->", fullPath, size.width, size.height);
            this.wxShareImage(fullPath, isTimeLine);
        } else {
            cc.error("save image data failed!");
        }
    }

    
    public googleLogin(callback: Function) {
        if (!cc.sys.isNative) return;
        if (callback) this.wxLoginCallback = callback;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "google_login", "()V");
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            console.log("googleLogin");
            //@ts-ignore
            jsb.reflection.callStaticMethod("AppJSController", "onGoogleLoginClick");
        }
    }

    public googleLoginResult(data) {
        if (!cc.sys.isNative) return;

        this.wxLoginCallback && this.wxLoginCallback(data);
    }
}

window["NativeCall"] = NativeCall.inst;
