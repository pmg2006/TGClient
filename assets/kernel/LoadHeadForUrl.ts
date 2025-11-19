import GameTools from "./GameTools";

const {ccclass, property} = cc._decorator;
import MD5 = require("./3rd/md5");

@ccclass
export default class LoadHeadForUrl extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private headSprite: cc.Sprite;
    private headUrl = "";
    private isErr = false;
    private isLoading = false;
    private loadCount = 0;

    start() {
        this.headSprite = this.node.getComponent(cc.Sprite);
    }

    public loadHead(url) {
        const self = this;
        self.headUrl = url;

        if (!self.headSprite) {
            self.headSprite = self.node.getComponent(cc.Sprite);
        }

        if (!self.headSprite)
            return;

        if (!url) {
            self.headSprite.spriteFrame = null;
            return;
        }

        self.isLoading = true;

        let spriteFrameTmp = GameTools.WxHeadMap[url];
        if (spriteFrameTmp && self.headSprite) {
            self.headSprite.spriteFrame = spriteFrameTmp;
            return;
        }

        // //目前只有安卓需要这样做
        // if (cc.sys.isNative && (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS)) {
        //原生都使用
        if (cc.sys.isNative) {
            // console.log("原生加载头像");
            self.loadHeadForAndroid(url, self.loadLocalImg.bind(self));
            return;
        }

        // console.log(self.headUrl);
        cc.loader.load({url: self.headUrl, type: 'jpg'}, function (err, texture) {
            self.isLoading = false;
            if (err) {
                self.isErr = true;
                self.loadCount++;
                //最多循环五次，超过五次，退出
                if (self.loadCount > 5) {
                    self.loadCount = 0;
                    self.isErr = false;
                }
                return;
            }

            if (!texture) {
                return;
            }

            if (self.headSprite) {
                self.headSprite.spriteFrame = new cc.SpriteFrame(texture);
                GameTools.WxHeadMap[url] = self.headSprite.spriteFrame;
            } else {
                console.log("cc.loader.load fun is error");
            }

            self.isErr = false;
        });
    }

    update(dt) {
        if (!this.isErr)
            return;

        if (this.isLoading) return;

        this.loadHead(this.headUrl);
    }

    private loadLocalImg(filePath) {
        const self = this;
        // console.log("已经下载完成了", filePath);
        cc.loader.load({url: filePath, type: 'jpg'}, function (err, texture) {
            if (err) {
                console.log("加载图片错误：", err);
                return;
            }
            // console.log("11111")

            if (!texture) {
                return;
            }
            // console.log("22222")

            const spriteFrame = new cc.SpriteFrame(texture);
            if (self && self.headSprite && self.headSprite) {
                self.headSprite.spriteFrame = spriteFrame;
            } else {
                console.log("loadLocalImg fun is error");
            }

            // console.log("33333")


            self.isErr = false;
        });
    }

    private loadHeadForAndroid(url, callback) {
        let dirpath = jsb.fileUtils.getWritablePath() + 'headimg/';
        // @ts-ignore
        let filepath = dirpath + MD5.hex(url) + '.jpg';//+ Base64.encode(url)

        if (jsb.fileUtils.isFileExist(filepath)) {
            callback && callback(filepath);
            return;
        }

        let saveFile = function (data) {
            if (data) {
                const gg = jsb.fileUtils.isDirectoryExist(dirpath);
                // console.log("文件夹判断", gg);

                if (!jsb.fileUtils.isDirectoryExist(dirpath)) {
                    let flag = jsb.fileUtils.createDirectory(dirpath);
                    // console.log("创建文件夹", flag);
                }
                // console.log("文件名：", filepath);
                if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                    // console.log('Remote write file succeed.');
                    callback && callback(filepath);
                } else {
                    console.log('Remote write file failed.');
                    // console.log("长度：", data.length);
                }
            } else {
                console.log('Remote download file failed.');
            }
        };

        let xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';

        xhr.onreadystatechange = function () {
            cc.log("xhr.readyState  " + xhr.readyState);
            cc.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    saveFile(xhr.response);
                } else {
                    saveFile(null);
                }
            }
        }.bind(this);
        xhr.open("GET", url, true);
        xhr.send();
    }

    // update (dt) {}
}
