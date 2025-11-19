import { i18nMgr } from "../../i18n/i18nMgr";


export function httpRequest(url: string, method: string, data: any) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let response = JSON.parse(xhr.responseText);
                resolve(response);
            } else if (xhr.readyState == 4) {
                reject('Error with status code ' + xhr.status);
            }
        };
        if(data){
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

export const KWAI_EVENT_TYPES = {
    EVENT_BUTTON_CLICK: "EVENT_BUTTON_CLICK",
    EVENT_PURCHASE: "EVENT_PURCHASE",           // 当完成付款。
    EVENT_CONTENT_VIEW: "EVENT_CONTENT_VIEW",   // 当页面被查看。
    EVENT_DOWNLOAD: "EVENT_DOWNLOAD",           // 当点击打开外部浏览器下载页面按钮。
    EVENT_FORM_SUBMIT: "EVENT_FORM_SUBMIT",     // 当表格被提交。
    EVENT_INITIATED_CHECKOUT: "EVENT_INITIATED_CHECKOUT",   // 当结账流程开始。
    EVENT_CONTACT: "EVENT_CONTACT",                         // 当发生联络或咨询。
    EVENT_PLACE_ORDER: "EVENT_PLACE_ORDER",                 // 当订单下单。
    EVENT_COMPLETE_REGISTRATION: "EVENT_COMPLETE_REGISTRATION", // 当注册完成。
    EVENT_SUBSCRIBE: "EVENT_SUBSCRIBE",                         // 当订阅完成。
    EVENT_FIRST_DEPOSIT: "EVENT_FIRST_DEPOSIT",                 // 首次入金
};


export default class Utils {

    private static instance: Utils = null;
    kwaiClickId: string = "gyuFkXte3TEfpNWAxRlMxg==";
    kwaiPixelId: string = "553594932809183282";

    kwaiAccessToken: string = "Vw8YmMdELx2f8NgjXR7JbG9LVZn07db4nT+Wl2H+mtg=";

    static get Instance() {
        if (!this.instance) {
            this.instance = new Utils();
        }
        return this.instance;
    }

    public AdjustInit(appToken: string) {
        if (typeof Adjust === 'undefined') {
            return;
        }
        Adjust.initSdk({
            appToken: appToken,
            // environment: 'sandbox',
            //logLevel: 'verbose',
            environment: 'production', // or 'production'
            logLevel: 'error',
            //defaultTracker: GlobalData.ChannelHandler.getAgentId().toString()   代理ID
        });
    }

    public AdjustEvent(eventToken: string, value: number) {
      
        try {
            if (Adjust) {
                Adjust.trackEvent({
                    eventToken: eventToken,
                    revenue: value
                });
            }
        } catch (error) {
            console.error('Error in AdjustEvent:', error);
        }
    }

    public AdjustTraceRevenue(eventToken, value: number, transactionId: string) {
      
        try {
            if (Adjust) {
                Adjust.trackRevenue({
                    eventToken: eventToken,
                    currency: "BRL",
                    revenue: value,
                    deduplicationId: transactionId,
                });
            }
        } catch (error) {
            console.error('Error in AdjustEvent:', error);
        }
    }

    /** 获取 Adjust 事件 */
    public getAdjustEvent(): any {
        return {
            EmailRegister: 'rce25a',
            PhoneRegister: '5hj6jy',
            Share: '8feuyp',
            // 支付成功
            PaySuccess: '15jokn',
            GuestRegister: 'q5eovw',
            //唤醒支付
            Rouse: 'u3s3hy',      // 唤起支付
        }
        return {}
    }

    /** 获取代理id */
    public getAgentId(): string {
        let curUrl = window.location.href;
        let agentId = '';
        if (curUrl && curUrl != '') {
            let url = new URL(curUrl);
            agentId = url.searchParams.get('agentCode') || "";
        }
        return agentId;
    }

    /** Initialize Kwai and get click_id and pixel_Id from href */
    public initKwai(): void {
        let curUrl = window.location.href;
        let clickId = '';
        let pixelId = '';
        if (curUrl && curUrl != '') {
            let url = new URL(curUrl);
            clickId = url.searchParams.get('click_id') || "";
            pixelId = url.searchParams.get('pixel_id') || "";
        }
        if (clickId) {
            this.kwaiClickId = clickId;
        }
        if (pixelId) {
            this.kwaiPixelId = pixelId;
        }
    }

    /** Send Kwai event */
    public sendKwaiEvent(eventName: string): void {
        if (this.getAgentId() != "lzwd") {
            return;
        }
        
        if (!this.kwaiClickId || !this.kwaiPixelId) {
            return;
        }
        // Insert your code to send Kwai event here
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://www.adsnebula.com/log/common/api', true);
        xhr.setRequestHeader("Content-Type", "application/json");

        let data = JSON.stringify({
            "clickid": this.kwaiClickId,
            "event_name": eventName,
            "pixelId": this.kwaiPixelId,
            "access_token": this.kwaiAccessToken, // replace with your access token
            "testFlag": false,
            "trackFlag": false,
            "is_attributed": 1,
            "mmpcode": "PL",
            "pixelSdkVersion": "9.9.9"
        });

        xhr.send(data);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);
                switch (response.result) {
                    case 10001:
                        console.error('Error: Missing parameter ' + response.error_msg);
                        break;
                    case 10002:
                        console.error('Error: Incorrect parameter type ' + response.error_msg);
                        break;
                    case 10005:
                        console.error('Error: Invalid clickid ' + response.error_msg);
                        break;
                    case 10006:
                        console.error('Error: Invalid token ' + response.error_msg);
                        break;
                    case 10007:
                        console.error('Error: Invalid eventName ' + response.error_msg);
                        break;
                    default:
                        console.log('Kwai event sent successfully');
                }
            }
        };
    }

    public FBTrace(eventName) {
        let fbId = '';
        if (this.getAgentId() === '1314') {
            fbId = '722537533053737';
        } else if (this.getAgentId() === '000111') {
            fbId = '872580714480186';
        } else {
            return;
        }

        fbq('init', fbId);
        fbq('track', eventName);
       
    }

    //========================================================================================

    public static checkMobile(mobile){
        //const regex = /^[1-9]{2}9\d{8}$/;//这是验证+55手机号码段的格式
        const regex = /^[7-9]\d{9}$/;//这是验证+91手机号码段的格式
        if (!regex.test(mobile)) {
            //请输入正确的电话号码
            //GD.GameTool.showTextTips("Insira o número de telefone correto");
            GD.GameTool.showTextTips("कृपया सही फ़ोन नंबर दर्ज करें");
            return false;
        }
        return true;
    }

    public static checkPassword(pw){
        if(!pw || pw.length < 6){
            //密码不能少于6个字符
            //GD.GameTool.showTextTips("A senha não pode ter menos de 6 caracteres");
            GD.GameTool.showTextTips("पासवर्ड 6 अक्षरों से कम नहीं हो सकता");
            return false;
        }else{
            return true;
        }
    }

    public static  checkEmail(email){
        let regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(!regExp.test(email)){
            GD.GameTool.showTextTips(i18nMgr._getLabel("Error Email", []));
            return false;
        }else{
            return true;
        }
    }
    


    static httpRequest(url, method, data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    let response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else if (xhr.readyState == 4) {
                    reject('Error with status code ' + xhr.status);
                }
            };
            xhr.send(JSON.stringify(data));
        });
    }
}


