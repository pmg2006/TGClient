import LoadHeadForUrl from "./LoadHeadForUrl";
import GameConfig from "./Base/GameConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameTools {

    /**
     * zpF:格式化时间
     * @param date 时间
     * @param format 如："yyyy-MM-dd"
     * @returns {any} 格式化的字符串
     */
    public static dateFormat(date, format = "yyyy-MM-dd hh:mm:ss") {
        
        switch(typeof date){
            case "string":
                date = new Date(date.replace(/-/,'/'));
                break;
            case "number":
                date = new Date(date);
                break;
        }


        let o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }


    /**
     * zpF:微信登录的回调，一个参数是openid
     * @type (openid)=>{}
     */
    public static wxLoginCallBack = null;

    /**
     * zpF:微信分享的回调
     * @type  (errCode)=>{}
     */
    public static wxShareCallBack = null;

    /**
     * zpF:格式化字符串
     * @param num
     * @param sep
     * @param chars
     * @returns {string}
     */
    public static formatStr(num, sep, chars) {
        var num = (num || 0).toString(),
            result = '';
        while (num.length > chars) {
            result = sep + num.slice(-chars) + result;
            num = num.slice(0, num.length - chars);
        }
        if (num) {
            result = num + result;
        }
        return result;
    }

    /**
     * zpF:一个数字字符串，从右到左每隔3位加入一个逗号(1234567890 --> 1,234,567,890)
     */
    public static toThousands(src) {
        return GameTools.formatStr(src, ",", 3);
    }

    /**
     * zpF:转换为萬字
     */
    public static to10Thousands(src) {
        return GameTools.formatStr(src, " ", 4);
    }

    /**
     * zpF:数字转x.x(萬)
     * @param src
     * @returns {number}
     */
    public static toWan(src) {
        return Math.floor(src / 1000) / 10;
    }

    /**
     * zpF:随机数字方法，有区间
     * @param min 最小值
     * @param max 最大值
     * @param isInt 是否整数
     * @returns {number} 随机数
     */
    public static randNum(min, max, isInt) {
        min = min || 0;
        max = max || 0;
        const offset = max - min;
        const num = min + Math.random() * offset;

        return isInt ? Math.floor(num) : num;
    }


    /**
     * zpF:金额小写转大写
     * @param n 金额
     * @returns {*} 返回格式化字符串
     */
    public static convertMoneyToCapitals(n) {
        if (n == 0) {
            return "零"
        }
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "数据非法";
        let unit = "萬千百拾億千百拾萬千百拾元",
            str = "";
        n += "";
        const p = n.indexOf('.');
        if (p >= 0)
            return "数据非法";
        unit = unit.substr(unit.length - n.length);
        for (let i = 0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(萬|億|元)/g, "$1").replace(/(億)萬|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "");
    };

    /**
     * 获取是否旁观玩家
     * @param chairID 椅子号，如果不传，默认是KernelData.chairID
     */
    public static getIsWatcher(chairID = null) {
        let id = chairID || KernelData.chairID;
        return id == 0xFFFF;
    }

    /**
     * zpF 添加子节点按钮的触摸事件
     * @param node 父节点
     * @param cb 回调
     * @param obj 绑定的调用对象
     */
    public static addBtnOnClick(node, cb, obj) {
        if (!node) return;
        let child = node.getComponentsInChildren(cc.Button);
        for (let i in child) {
            let childBtn = child[i].node;
            childBtn.on(cc.Node.EventType.TOUCH_END, cb, obj);
        }
    };

    /**
     * zpF 销毁onfire事件
     * @param bindArray
     */
    public static destroyOnFire(bindArray) {
        for (let i = 0; i < bindArray.length; i++) {
            onfire.un(bindArray[i]);
        }
    };

    /**
     *  zpF 加载微信头像
     * @param node 头像节点
     * @param url 头像URL
     */
    public static loadWxHead(node, url) {
        // console.log("有没有进来");
        if (!node) return;

        // console.log("有没有进来11111111111");
        let loadHeadImg = node.getComponent(LoadHeadForUrl);
        if (!loadHeadImg) {
            loadHeadImg = node.addComponent(LoadHeadForUrl);
        }

        loadHeadImg.loadHead(url);
    };

    /**
     *  zpF 计算玩家相对位置
     * @param chairID  要计算玩家位置
     * @param myChairID  当前自己位置
     * @param MaxChairCount 游戏最大人数
     * @returns {number} 相对于自己的位置
     */
    public static getRelativeSeatID(chairID, myChairID, MaxChairCount) {
        if(this.getIsWatcher()) myChairID = 0
        return (chairID + MaxChairCount - myChairID) % MaxChairCount;
    }

    /**
     *  zpF 动态设置精灵中的图片
     * @param node 节点
     * @param atlas 图集
     * @param spriteName 图片的名字
     */
    public static showSpriteFrame(node, atlas, spriteName) {
        const frame = atlas.getSpriteFrame(spriteName);
        const sprite = node.getComponent(cc.Sprite);
        if (sprite && frame) {
            sprite.spriteFrame = frame
        } else {
            cc.error("showSpriteFrame 错误:" + spriteName)
        }
    };

    /**
     * zpF 获取H5版本中的浏览器参数
     * @param name 参数名字
     * @returns {string}
     * @constructor
     */
    public static GetQueryString(name) {
        if (cc.sys.isBrowser) { //浏览器就跳转吧
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            const r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
        }

    };

    public static GetSessionBase64() {
        let sessionBase64 = "";
        if (cc.sys.isBrowser) { //浏览器就跳转吧
            sessionBase64 = this.GetQueryString("session") || "";
        } else {
            sessionBase64 = cc.sys.localStorage.getItem('session') || "";
        }

        return sessionBase64;
    };

    public static GetSession() {
        const userinfo = null;
        let sessionBase64 = this.GetSessionBase64();
        //{"userID":303,"uuid":"1eb33c4c-a0b2-4e75-bd70-4cdfa1a64a98","serverURI":"ws://127.0.0.1:8000/client",single:false}

        let sessionJson = window.atob(sessionBase64) || "{}"; //base64解码
        let session = JSON.parse(sessionJson);

        return { session, sessionBase64 }
    };

    /**
     * zpF 获取字节长度，中文两个字节，英文一个字节
     * @param str
     * @returns {number}
     */
    public static getStrInBytes(str) {
        let bytesCount = 0;
        for (let i = 0; i < str.length; i++) {
            const c = str.charAt(i);
            if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
            {
                bytesCount += 1;
            } else {
                bytesCount += 2;
            }
        }
        return bytesCount
    }

    /**
     * zpF 隐藏或显示子节点
     * @param node 父节点
     * @param active 显示或隐藏
     */
    public static setChildVisible(node, active) {
        if (!node || !node.children || node.childrenCount < 1) {
            return;
        }

        node.children.forEach((childNode) => {
            childNode.active = active;
        })

    }

    /**
     * 获取缓存的用户头像
     * @returns {Map<string, cc.SpriteFrame>}
     * @constructor
     */
    public static get WxHeadMap() {
        return this._WxHeadMap;
    }


    /**
     *复制到剪切板
     *
     * @static
     * @param {string} str 你要复制的内容
     * @returns {boolean}
     */
    public static copyToClipBoard(str: string): boolean {
        if (cc.sys.isNative) {
            jsb.copyTextToClipboard(str);
            return true
        } else if (cc.sys.isBrowser) {
            var textArea = null;
            textArea = document.getElementById("clipBoard");
            if (textArea === null) {
                textArea = document.createElement("textarea");
                textArea.id = "clipBoard";
                textArea.textContent = str;
                document.body.appendChild(textArea);
            }
            textArea.select();
            try {
                const msg = document.execCommand('copy') ? 'successful' : 'unsuccessful';
                cc.log("已经复制到剪贴板");
                document.body.removeChild(textArea);
                return true
            } catch (err) {
                cc.log("复制到剪贴板失败");
                return false
            }
        }
    }

    /**
     * zp_describe: 打开微信
     * @author zp
     * @time 2019/9/29
     * */
    public static openWeixin() {
        if (cc.sys.isNative) {
            cc.sys.openURL("weixin://");
        }
    }

    /**
     * 测距
     */
    public static getDistance(gps1, gps2) {
        if (!gps1 || !gps2) return 0;

        console.log("gps", gps1, gps2);

        let arr1 = gps1.split(',');
        let arr2 = gps2.split(',');
        if (arr1 && arr2 && arr1.length === 2 && arr2.length === 2)
            return GameTools.getFlatternDistance(arr1[0], arr1[1], arr2[0], arr2[1]);

        return 0;
    };

    //创建预设
    static createNode(prefab_name, cb) {
        cc.loader.loadRes(prefab_name, (err, prefab) => {
            var newNode = cc.instantiate(prefab);
            cb(newNode)
        })
    }


    /**
     * 测距2
     * @param {Object} lat1
     * @param {Object} lng1
     * @param {Object} lat2
     * @param {Object} lng2
     */
    public static getFlatternDistance(lat1, lng1, lat2, lng2) {
        lat1 = parseFloat(lat1);
        lng1 = parseFloat(lng1);
        lat2 = parseFloat(lat2);
        lng2 = parseFloat(lng2);

        let f = GameTools.rad((lat1 + lat2) / 2);
        let g = GameTools.rad((lat1 - lat2) / 2);
        const l = GameTools.rad((lng1 - lng2) / 2);

        let sg = Math.sin(g);
        let sl = Math.sin(l);
        let sf = Math.sin(f);

        let s, c, w, r, d, h1, h2;
        const a = GameTools.EARTH_RADIUS;
        const fl = 1 / 298.257;

        sg = sg * sg;
        sl = sl * sl;
        sf = sf * sf;

        s = sg * (1 - sl) + (1 - sf) * sl;
        c = (1 - sg) * (1 - sl) + sf * sl;

        w = Math.atan(Math.sqrt(s / c));
        r = Math.sqrt(s * c) / w;
        d = 2 * w * a;
        h1 = (3 * r - 1) / 2 / c;
        h2 = (3 * r + 1) / 2 / s;

        let result = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
        result = Math.round(result);
        console.log("结算结果", result);

        return result;
    }


    /**
     * 显示base64图片
     *
     * @param {string} sBase64
     * @param {cc.Sprite} sprite
     */
    static showBase64Png(base64str: string, sprite: cc.Sprite) {
        let image = new Image();
        let texture = new cc.Texture2D();
        image.src = base64str;
        texture.initWithElement(image);
        var spriteFrame = new cc.SpriteFrame(texture);
        sprite.spriteFrame = spriteFrame;
    }


    static PI = Math.PI;
    static EARTH_RADIUS = 6378137.0;    //单位M
    private static rad(d) {
        return d * GameTools.PI / 180.0;
    }



    /**
     * 版本号比较
     * @static
     * @param {*} versionA
     * @param {*} versionB
     * @returns 大于0表示A高于B的版本
     * @memberof GameTools
     */
    public static versionCompareHandle(versionA, versionB) {
        const vA = versionA.split('.');
        const vB = versionB.split('.');
        for (let i = 0; i < vA.length; ++i) {
            const a = parseInt(vA[i]);
            const b = parseInt(vB[i] || 0);
            if (a === b) {
                continue;
            } else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        } else {
            return 0;
        }
    };


    /**
     * 将数值转换成字符串
     * @param num 
     * @returns 
     */
    public static convertInfo(num: number): string {
        if(num == undefined)return "Nan";
        let str = "";
        let numEx = Math.abs(num);
        str = numEx.toString().match(/^\d+(?:\.\d{0,2})?/) + "";
        // if (numEx <= 10000) str = numEx.toString().match(/^\d+(?:\.\d{0,2})?/) + "";
        // else {
        //     let cvtNum = numEx / 10000;
        //     if (cvtNum >= 10000) str = (cvtNum / 10000).toString().match(/^\d+(?:\.\d{0,2})?/) + "億";
        //     else if (cvtNum >= 1) str = cvtNum.toString().match(/^\d+(?:\.\d{0,2})?/) + "萬";
        // }

        if (num < 0) str = "-" + str;

        return str;
    }


    private static _WxHeadMap:{[key:string]:cc.SpriteFrame} = {};

    public static readonly MUSIC_ON_OFF_KEY = "MUSIC_ON_OFF";
    public static readonly EFFECT_ON_OFF_KEY = "EFFECT_ON_OFF";

    public static readonly UUID_KEY = "UUID_KEY";
    public static readonly OPEN_ID_KEY = "OPEN_ID_KEY";


    public static VERSION = GameConfig.GAME_VERSION_S;

}
