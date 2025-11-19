

export class _xkNative {

    ANDROID_API = "org.cocos2dx.javascript.SDKManager";
    IOS_API = "PlatformSystem";
    openInstallInfo:any = {}

    //微信登录后， 获得code码后的回调函数
    onWXLoginCodeJSCF = null;

    //微信分享后的回调函数
    onWXShareJSCF = null;
    signWithAppleCallBack = null;
    applePayCallback = null;


    // 获取消息Key成功回调
    callback_MsgKey() {
        // TODO: 获取消息Key成功回调
    };
    // 语音转文字完成后回调
    callback_switchText(result) {
        // TODO: 语音转文字完成后回调
    };

    // 定位回调
    callback_GPS(result) {
        // TODO: 语音转文字完成后回调
        console.log('JS定位回调打印: ', result);

        let result2 = result;

        if (cc.sys.os === cc.sys.OS_IOS) {
            result2 = result.replace(/\*/g, "\"");
        }
        let obj = JSON.parse(result2);

        //如果获取成功之后，记得一定要关闭
        if (obj.errorCode == 0) {
            let gps = {
                Longitude: obj.Longitude,
                Latitude: obj.Latitude,
                Address: obj.Address
            };
            NetHelp.updateGps(gps);
        } else {
            console.error("定位获取失败", obj.errorInfo)
            // UIHelper.showTips(obj.errorInfo);
        }

        this.stopLocation();
    };


    /**
     * 得到大版本编号
     * @returns {*}
     */
    getVersionCode() {
        if (cc.sys.platform === cc.sys.ANDROID) {
            return jsb.reflection.callStaticMethod(this.ANDROID_API, "getVersionCode", "()Ljava/lang/String;");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod(this.IOS_API, "getVersionCode");
        }
    };
    isWXAppInstalled() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod(this.ANDROID_API, "isWXAppInstalled", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            return jsb.reflection.callStaticMethod(this.IOS_API, "isWXAppInstalled");
        }
    }


    /**
     * 微信登录，非原生调用无效
     */
    wxLogin(cb) {
        if (!cc.sys.isNative) return;
        if (cb)
            this.onWXLoginCodeJSCF = cb;
        // console.log("微信登录，非原生调用无效");
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "WxLogin", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "WxLogin");
        }
    };

    /**
     * 微信分享文本
     * @param text 文字内容
     * @param isTimeLine 1表示朋友圈，0好友
     */
    wxShareText(text, isTimeLine) {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "shareText", "(Ljava/lang/String;I)V", text, isTimeLine);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "wxShareTextWithText:shareScene", text, isTimeLine ? 1 : 0);
        }
    };

    /**
     * 截图整个屏幕并分享给好友
     */
    wxShareCurrentScreen() {
        const rootNode = cc.find("Canvas");
        this.shareScreenShoot(rootNode, null, true, 0);
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
            // cc.log("twl 截屏成功-->", fullPath, size.width, size.height);
            this.wxShareImage(fullPath, 0);
        } else {
            cc.error("save image data failed!");
        }
    }

    /**
     * 微信分享图片
     * @param imgFilePath 图片路径
     * @param isTimeLine 1表示朋友圈，0好友
     */
    wxShareImage(imgFilePath, isTimeLine) {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "shareImageWithLocalPath", "(Ljava/lang/String;I)V", imgFilePath, isTimeLine);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "wxShareImage:scene:", imgFilePath, isTimeLine);
        }
    };

    /**
     * 微信分享网页链接
     * @param url 网页URL
     * @param title 标题
     * @param content 内容
     * @param isTimeLine 1表示朋友圈，0好友
     */
    wxShareWebUrl(url, title, content, isTimeLine) {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "shareWebUrl", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V"
                , url, title, content, isTimeLine);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "WxShareWebUrl:title:description:scene:", url, title, content, isTimeLine + "");
        }
    };

    /**
     * 打开微信
     */
    openWXApp() {
        if (cc.sys.platform === cc.sys.ANDROID) {
            cc.sys.openURL("weixin://");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            cc.sys.openURL("weixin://");
        }
    };

    getHttpImg(url, callback) {
        if (cc.sys.os !== cc.sys.OS_ANDROID && cc.sys.os !== cc.sys.OS_IOS) {
            return;
        }

        let dirpath = jsb.fileUtils.getWritablePath() + '/share/';
        console.log("本地路径", dirpath);
        let fileName = url.substring(url.lastIndexOf('/') + 1);
        console.log("文件名", fileName);
        fileName = fileName.replace("?", "qq");
        console.log("文件名2", fileName);

        let filepath = dirpath + fileName;
        console.log("文件路径", filepath);
        if (jsb.fileUtils.isFileExist(filepath)) {
            console.log("存在直接回调");
            callback && callback(filepath);
            return;
        }

        //如果本地没有缓存，就去网上拉一个下载
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';

        xhr.onreadystatechange = () => {
            cc.log("xhr.readyState  " + xhr.readyState);
            cc.log("xhr.status  " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.saveToFile(xhr.response, dirpath, filepath, callback);
                } else {
                    console.error("下载http图片失败,错误号", xhr.status);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    };

    saveToFile(data, dirpath, filepath, callback) {
        if (data) {
            const isDirectory = jsb.fileUtils.isDirectoryExist(dirpath);
            if (!isDirectory) {
                let flag = jsb.fileUtils.createDirectory(dirpath);
                if (!flag) {
                    console.log("创建文件夹失败");
                    return;
                }
            }
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


    /**
     * ------------------------------- GVoice 语音相关 -------------------------------------------------
     */

    initGVoiceForKey(appID, appKey, userID) {
        if (!cc.sys.isNative) return;

        let userIDStr = "" + userID;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "initGVoiceForKey", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", appID, appKey, userIDStr);

        } else if (cc.sys.os === cc.sys.OS_IOS) {
            console.log("js 调用语音初始化1111111", userID);
            jsb.reflection.callStaticMethod(this.IOS_API, "initGVoice:appKey:openID:", appID, appKey, userIDStr);
        }
    }

    // 初始化GVoice
    initGVoice(userID) {
        if (!cc.sys.isNative) return;

        let userIDStr = "" + userID;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "initGVoice", "(Ljava/lang/String;)V", userIDStr);

        } else if (cc.sys.os === cc.sys.OS_IOS) {
            console.log("js 调用语音初始化1111111", userID);
            jsb.reflection.callStaticMethod(this.IOS_API, "initGVoice:", userIDStr);
        }
    };
    // 设置语音模式
    setGVoiceMode() {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "setMode", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            console.log("js 设置语音模式");
            jsb.reflection.callStaticMethod(this.IOS_API, "setMode");
        }
    };
    // 切换语音模式并获取消息key
    applyMsgKey() {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "applyMsgKey", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            // TODO:  IOS调用处理
            console.log("js 切换语音模式并获取消息key");
            jsb.reflection.callStaticMethod(this.IOS_API, "applyMsgKey", "()V");
        }
    };

    // 加入房间
    joinGVoiceRoom(roomNum) {
        if (!cc.sys.isNative) return;

        let roomNumStr = "" + roomNum;


        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "joinRoom", "(Ljava/lang/String;)V", roomNumStr);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            console.log("js 加入房间", roomNum);
            jsb.reflection.callStaticMethod(this.IOS_API, "joinRoom:", "" + roomNumStr);
        }
    };
    // 退出房间
    exitGVoiceRoom(roomNum) {
        if (!cc.sys.isNative) return;

        let roomNumStr = "" + roomNum;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "exitRoom", "(Ljava/lang/String;)V", roomNumStr);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            console.log("js 退出房间");
            jsb.reflection.callStaticMethod(this.IOS_API, "exitRoom:", roomNumStr);
        }
    };

    // 开启麦克风
    openMic() {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "openGVoiceMic", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            console.log("js 开启麦克风");
            jsb.reflection.callStaticMethod(this.IOS_API, "openGVoiceMic");
        }
    };
    // 关闭麦克风
    closeMic() {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "closeGVoiceMic", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            console.log("js 关闭麦克风");
            jsb.reflection.callStaticMethod(this.IOS_API, "closeGVoiceMic");
        }
    };

    // 开始录音
    startRecord() {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "startRecord", "()V");

        } else if (cc.sys.os === cc.sys.OS_IOS) {
            // TODO:  IOS调用处理
            jsb.reflection.callStaticMethod(this.IOS_API, "startRecord");
        }
    };

    // 停止录音
    stopRecord() {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "stopRecord", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "stopRecord");
        }
    };
    // 开启扬声器
    openSpeaker() {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "openSpeaker", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            console.log("js 开启扬声器");
            jsb.reflection.callStaticMethod(this.IOS_API, "openSpeaker");
        }
    };
    // 关闭扬声器
    closeSpeaker() {
        if (!cc.sys.isNative) return;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "closeSpeaker", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            console.log("js 关闭扬声器");
            jsb.reflection.callStaticMethod(this.IOS_API, "closeSpeaker");
        }
    };

    //语音加入房间之后的回调
    callback_join_room(code) {
        console.log("加入房间的回调", code);
        if (code === 1) {
            this.openSpeaker();
            this.openMic();
            this.closeMic();
        }
    };



    /**
     * ------------------------------ 高德地图 GPS定位相关 --------------------------------------
     */


    // 开始定位  TODO: isSingle 是否持续定位(true:持续定位
    startLocation(isSingle = false) {
        if (!cc.sys.isNative) return;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "startLocation", "(Z)V", isSingle);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            // TODO:  IOS调用处理
            jsb.reflection.callStaticMethod(this.IOS_API, "reGeocodeAction");
        }

    };
    // 停止定位
    stopLocation() {
        if (!cc.sys.isNative) return;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "stopLocation", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            // TODO:  IOS调用处理
        }
    };


    //---------------------------------------游戏盾------------------------
    initGameSafe() {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "initSafeGuandu", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "initSafeGuandu");
        }
    };

    getServerIPAndPort(oldServerIp, oldServerPort) {
        if (!cc.sys.isNative) return;

        let result: any = { serverIP: oldServerIp, serverPort: oldServerPort };

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            return { serverIP: oldServerIp, serverPort: oldServerPort };
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            let jsonStr = jsb.reflection.callStaticMethod(this.IOS_API, "initGuandu:port:", oldServerIp, oldServerPort);
            jsonStr = jsonStr.replace(/\*/g, "\"");
            console.log("new Server == ", jsonStr);
            let a = JSON.parse(jsonStr);
            if (a) {
                // result.newServerIp = a.newServerIp;
                result.newServerIp = oldServerIp;
                result.newServerPort = a.newServerPort;
                return result;
            }
        }
    };

    //---------------------------------------统计相关------------------------


    // 获取用户参数回调
    onGetBinDitch = null;

    /**
     * web 获取用户渠道(统计)
     */
    getUserBinDitch(cb) {
        if (!cc.sys.isNative) return;
        if (cb)
            this.onGetBinDitch = cb;

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "getUserBinDitch", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            // TODO:  IOS调用处理
        }
    };

    // 获取用户渠道回调(统计)
    onWakeUpAdapter(result) {
        console.log('web跳转后参数回调', result);
        if (result) {
            let json = JSON.parse(result) //{"userID":22}
            if (json)
                this.openInstallInfo = json
        }

    }

    // TODO: 注册量统计(用户注册成功调用)
    openInstallRegister() {
        if (!cc.sys.isNative) return;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "OpenInstall_Register", "()V");
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            // TODO:  IOS调用处理
        }
    };

    /**
     * 渠道效果统计
     * pointId      效果点ID
     * pointValue   效果值
     */
    openInstallEffectPoint(pointId, pointValue) {
        if (!cc.sys.isNative) return;
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "OpenInstall_EffectPoint", "(Ljava/lang/String;I)V", pointId, pointValue);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            // TODO:  IOS调用处理

        }
    };
    /**
     * 苹果内购
     * productID 商品ID
     * serverUrl 服务地址
     * userID 用户ID
     * callback 支付成功回调
     */
    applePay(productID, serverUrl, userID, callback) {
        if (!cc.sys.isNative) return;
        this.applePayCallback = callback;
        if (cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "requestProductWithId:andUrl:userID:", `${productID}`, `${serverUrl}`, `${userID}`);
        }
    }
    /**
     * sign with appleid
     */
    signWithApple(cb) {
        if (cc.sys.os !== cc.sys.OS_IOS) return false;
        this.signWithAppleCallBack = cb;
        return jsb.reflection.callStaticMethod(this.IOS_API, "signWithApple");
    }
    /**
     * 检查系统是否符合sign with appleid要求
     */
    isAvaliableOS() {
        if (cc.sys.os !== cc.sys.OS_IOS) return false;
        return jsb.reflection.callStaticMethod(this.IOS_API, "isAvaliableOS");
    }

}