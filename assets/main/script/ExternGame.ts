import { AudioMgr } from "../../kernel/Core/AudioMgr";
import { i18nMgr } from "../../kernel/i18n/i18nMgr";


export namespace ExternGameModule {
    export class ExternGame {
        private isInit: boolean = false;
        private scoreEnd: boolean = false;
        private gameUpInfo: any = null;
        private disLeft: number = 0;
        private disTop: number = 0;
        private loadingShow: boolean = true;

        public init(gameInfo: any, isScoreEnd: boolean = true, loadingShow = true): void {
            this.gameUpInfo = gameInfo;
            const baseUrl = gameInfo.base_url;
            this.loadingShow = loadingShow;
            audioMgr.openBgm(false);//停止背景音效

            console.log("init " + baseUrl);
            if (cc.sys.isBrowser) {
                this.scoreEnd = isScoreEnd;
                if (!this.isInit) {
                    this.isInit = true;
                    this.initWebIframe();
                    this.initLoadingIframe();
                    this.initBtn();
                    this.initTips();
                    window.addEventListener("message", this.OnMessage.bind(this), false);
                }
                // EventTrackManager().LogEvent(o.default.ENTER_GAME, {
                //     gid: app.ExternGameManager().Track_gid,
                // });
                this.showLoading();
                this.show(baseUrl);
            } else {
                console.error("ExternGame init failed: " + baseUrl);
            }
        }

        // 这个方法用于处理从iframe传来的消息
        private OnMessage(event: any): void {
            console.log("ExternGame::OnMessage");
            try {
                const eventData = event.data;
                // 如果消息类型是"moogames"，则隐藏所有元素
                if (eventData && "moogames" == eventData.type) {
                    this.hideAll();
                // else if (this.gameUpInfo && this.gameUpInfo.gid == i.GIDTool.PINGBO) {
                } else if (this.gameUpInfo) {
                    const crossDomainUrl = this.gameUpInfo.cross_domain_url;
                    // 如果跨域URL无效，则输出错误信息
                    if (!crossDomainUrl) {
                        return console.error("Invalid gameUpInfo cross_domain_url");
                    }
                    // 如果消息的源URL以跨域URL结尾
                    if (event.origin && event.origin.toLowerCase().endsWith(crossDomainUrl)) {
                        // 根据消息的动作进行不同的处理
                        switch (eventData.action) {
                            // 如果动作是"OPEN_WINDOW"，则打开一个新的窗口
                            case "OPEN_WINDOW":
                                window.open(eventData.url);
                        }
                    }
                }
            } catch (error) {
                // 如果处理消息时发生错误，则输出错误信息
                console.log(error.message);
            }
        }
        // 初始化WebIframe的方法
        private initWebIframe(): void {
            // 创建一个新的iframe元素
            const gameIframe = document.createElement("iframe");
            // 设置iframe的id为"Game"
            gameIframe.id = "Game";
            // 设置iframe不可拖动
            gameIframe.draggable = false;
            // 将iframe添加到文档的body中
            document.body.appendChild(gameIframe);
            // 设置iframe的样式
            gameIframe.style.position = "absolute";
            gameIframe.style.width = "100%";
            gameIframe.style.height = "100%";
            gameIframe.style.display = "none";
            gameIframe.style.border = "none";
            gameIframe.style.backgroundColor = "#FFFFFF";
            // 当iframe加载完成时，隐藏加载界面
            gameIframe.onload = () => {
                console.log("ExternGame url loaded");
                this.hideLoading();
            };
            // 当iframe加载出错时，输出错误信息
            gameIframe.onerror = () => {
                console.error("ExternGame iframe show error.");
            };
        }
            
        // 初始化加载的iframe
        private initLoadingIframe(): void {
            // 创建一个新的iframe元素
            const loadingIframe = document.createElement("iframe");
            // 设置iframe的id为"loading"
            loadingIframe.id = "loading";
            // 将iframe添加到文档的body中
            document.body.appendChild(loadingIframe);
            // 设置iframe不可拖动
            loadingIframe.draggable = false;
            // 设置iframe的样式
            loadingIframe.style.position = "absolute";
            loadingIframe.style.width = "100%";
            loadingIframe.style.height = "100%";
            loadingIframe.style.display = "none";
            loadingIframe.style.border = "none";
            loadingIframe.style.backgroundColor = "transparent";
        }
    
        // 初始化按钮的方法
        private initBtn(): void {
            // 创建一个新的按钮元素
            const backButton = document.createElement("button");
            // 设置按钮的id为"BtnBack"
            backButton.id = "BtnBack";
            // 设置按钮可拖动
            backButton.draggable = true;
            // 设置按钮的样式
            backButton.style.display = "none";
            backButton.style.position = "absolute";
            // 根据平台设置按钮的大小
            const buttonSize = cc.sys.platform == cc.sys.DESKTOP_BROWSER ? "90px" : "40px";
            backButton.style.width = buttonSize;
            backButton.style.height = buttonSize;
            backButton.style.left = "60px";
            backButton.style.top = "30px";
            backButton.style.border = "none";
            backButton.style.backgroundColor = "transparent";
            // 为按钮添加事件监听器
            backButton.addEventListener("click", this.showTips.bind(this));
            backButton.addEventListener("dragstart", this.dragstart.bind(this));
            backButton.addEventListener("dragend", this.dragend.bind(this));
            backButton.addEventListener("touchmove", this.touchmove.bind(this));
            backButton.addEventListener("touchstart", this.touchstart.bind(this));
            // 将按钮添加到文档的body中
            document.body.appendChild(backButton);
    
            // 创建一个新的图片元素
            const returnButtonImage = document.createElement("img");
            // 设置图片的id为"return_btn2"
            returnButtonImage.id = "return_btn";
            // 设置图片的源
            returnButtonImage.src = "externGame/return_btn.png";
            // 设置图片的样式
            returnButtonImage.style.position = "absolute";
            // returnButtonImage.style.width = "100%";
            // returnButtonImage.style.height = "100%";
            // returnButtonImage.style.left = "0px";
            returnButtonImage.style.width = "75%";
            returnButtonImage.style.height = "75%";
            returnButtonImage.style.left = "-40px";
            returnButtonImage.style.top = "0px";
            // 将图片添加到按钮中
            backButton.appendChild(returnButtonImage);
        }
    
        // 触摸开始时的处理函数
        private touchstart(touchEvent: TouchEvent): void {
            const touchPoint = touchEvent.touches[0];
            this.setDisplacement(touchPoint.clientX, touchPoint.clientY);
        }
    
        // 触摸移动时的处理函数
        private touchmove(touchEvent: TouchEvent): void {
            const touchPoint = touchEvent.touches[0];
            const displacementX = touchPoint.clientX - this.disLeft;
            const displacementY = touchPoint.clientY - this.disTop;
            this.onBtnEndFun(displacementY, displacementX);
        }
    
        // 拖动开始时的处理函数
        private dragstart(dragEvent: DragEvent): void {
            this.setDisplacement(dragEvent.clientX, dragEvent.clientY);
        }
    
        // 拖动结束时的处理函数
        private dragend(dragEvent: DragEvent): void {
            const displacementX = dragEvent.clientX - this.disLeft;
            const displacementY = dragEvent.clientY - this.disTop;
            this.onBtnEndFun(displacementY, displacementX);
        }
    
        // 设置位移的函数
        private setDisplacement(clientX: number, clientY: number): void {
            const backButton = document.getElementById("BtnBack");
            this.disLeft = clientX - backButton.offsetLeft;
            this.disTop = clientY - backButton.offsetTop;
        }
    
        // 这个方法用于处理按钮结束的功能
        private onBtnEndFun(verticalPos: number, horizontalPos: number): void {
            // 获取id为"BtnBack"的按钮元素
            const backButton = document.getElementById("BtnBack");
            // 如果垂直位置小于0，设置为0
            if (verticalPos < 0) verticalPos = 0;
            // 如果垂直位置大于文档的高度减去按钮的高度，设置为文档的高度减去按钮的高度
            if (verticalPos > document.body.clientHeight - backButton.offsetHeight) verticalPos = document.body.clientHeight - backButton.offsetHeight;
            // 如果水平位置小于0，设置为0
            if (horizontalPos < 0) horizontalPos = 0;
            // 如果水平位置大于文档的宽度减去按钮的宽度，设置为文档的宽度减去按钮的宽度
            if (horizontalPos > document.body.clientWidth - backButton.offsetWidth) horizontalPos = document.body.clientWidth - backButton.offsetWidth;
            // 设置按钮的左边距
            backButton.style.left = horizontalPos + "px";
            // 设置按钮的上边距
            backButton.style.top = verticalPos + "px";
        }

        // 初始化提示的方法
        private initTips(): void {
            // 创建一个新的div元素
            const tipDiv = document.createElement("div");
            tipDiv.id = "TIP";
            tipDiv.style.position = "absolute";
            tipDiv.style.width = "100%";
            tipDiv.style.height = "100%";
            tipDiv.style.display = "none";
            document.body.appendChild(tipDiv);
        
            // 创建一个新的div元素
            const layerDiv = document.createElement("div");
            layerDiv.id = "layer";
            layerDiv.style.position = "absolute";
            layerDiv.style.width = "331.7px";
            layerDiv.style.height = "198.7px";
            layerDiv.style.left = "50%";
            layerDiv.style.top = "50%";
            layerDiv.style.transform = "translate(-50%, -50%)";
            layerDiv.style.display = "flex";
            layerDiv.style.flexDirection = "column";
            tipDiv.appendChild(layerDiv);
        
            // 创建一个新的img元素
            const bgImg = document.createElement("img");
            bgImg.id = "bg";
            bgImg.src = "externGame/bg_layer.png";
            bgImg.style.position = "absolute";
            bgImg.style.width = "100%";
            bgImg.style.height = "100%";
            bgImg.style.top = "0px";
            bgImg.style.left = "0px";
            layerDiv.appendChild(bgImg);
        
            // 创建一个新的div元素
            const titleDiv = document.createElement("div");
            titleDiv.id = "tit";
            this.getInputTxt(titleDiv, "UI.Tips");
            titleDiv.style.position = "absolute";
            titleDiv.style.left = "50%";
            titleDiv.style.top = "10%";
            titleDiv.style.transform = "translate(-50%, -50%)";
            titleDiv.style.color = "#FFE536";
            titleDiv.style.fontSize = "20px";
            layerDiv.appendChild(titleDiv);
        
            // 创建一个新的div元素
            const textTipsDiv = document.createElement("div");
            textTipsDiv.id = "text_tips";
            this.getInputTxt(textTipsDiv, "UI_ExternGame");
            textTipsDiv.style.position = "absolute";
            textTipsDiv.style.top = "30%";
            textTipsDiv.style.color = "#ffffff";
            textTipsDiv.style.fontSize = "18px";
            textTipsDiv.style.maxWidth = "300px";
            textTipsDiv.style.alignSelf = "center";
            textTipsDiv.style.wordBreak = "break-word";
            textTipsDiv.style.textAlign = "center";
            layerDiv.appendChild(textTipsDiv);
        
            // 创建一个新的button元素
            const enterButton = document.createElement("button");
            enterButton.id = "btn_enter";
            enterButton.style.position = "absolute";
            enterButton.style.width = "40%";
            enterButton.style.height = "20%";
            enterButton.style.left = "5%";
            enterButton.style.top = "70%";
            enterButton.style.border = "none";
            enterButton.style.backgroundColor = "transparent";
            enterButton.addEventListener("click", this.hideAll.bind(this));
            layerDiv.appendChild(enterButton);
        
            // 创建一个新的img元素
            const okBgImg = document.createElement("img");
            okBgImg.id = "btnOkBg";
            okBgImg.src = "externGame/btn_bg.png";
            okBgImg.style.position = "absolute";
            okBgImg.style.width = "100%";
            okBgImg.style.height = "100%";
            okBgImg.style.left = "0px";
            okBgImg.style.top = "0px";
            enterButton.appendChild(okBgImg);
        
            // 创建一个新的div元素
            const okTxtDiv = document.createElement("div");
            okTxtDiv.id = "btnOk_txt";
            this.getInputTxt(okTxtDiv, "General.General_1");
            okTxtDiv.style.position = "absolute";
            okTxtDiv.style.top = "50%";
            okTxtDiv.style.left = "50%";
            okTxtDiv.style.transform = "translate(-50%, -50%)";
            okTxtDiv.style.fontSize = "18px";
            okTxtDiv.style.color = "#FFFB95";
            enterButton.appendChild(okTxtDiv);
        
            // 创建一个新的button元素
            const enterCancelButton = document.createElement("button");
            enterCancelButton.id = "btn_enter Cancel";
            enterCancelButton.style.position = "absolute";
            enterCancelButton.style.width = "40%";
            enterCancelButton.style.height = "20%";
            enterCancelButton.style.left = "55%";
            enterCancelButton.style.top = "70%";
            enterCancelButton.style.border = "none";
            enterCancelButton.style.backgroundColor = "transparent";
            enterCancelButton.addEventListener("click", this.hideTips.bind(this));
            layerDiv.appendChild(enterCancelButton);
        
            // 创建一个新的img元素
            const cancelBgImg = document.createElement("img");
            cancelBgImg.id = "btnCancelBg";
            cancelBgImg.src = "externGame/btn_bg2.png";
            cancelBgImg.style.position = "absolute";
            cancelBgImg.style.width = "100%";
            cancelBgImg.style.height = "100%";
            cancelBgImg.style.left = "0px";
            cancelBgImg.style.top = "0px";
            enterCancelButton.appendChild(cancelBgImg);
        
            // 创建一个新的div元素
            const cancelTxtDiv = document.createElement("div");
            cancelTxtDiv.id = "btnCancel_txt";
            this.getInputTxt(cancelTxtDiv, "General.General_2");
            cancelTxtDiv.style.position = "absolute";
            cancelTxtDiv.style.left = "50%";
            cancelTxtDiv.style.top = "50%";
            cancelTxtDiv.style.transform = "translate(-50%, -50%)";
            cancelTxtDiv.style.fontSize = "18px";
            cancelTxtDiv.style.color = "#FFDADA";
            enterCancelButton.appendChild(cancelTxtDiv);
        }

        // 这个方法用于刷新标签
        private onRefreshLabel(): void {
            // 获取id为"tit"的元素
            const titleElement = document.getElementById("tit");
            // 设置元素的文本
            this.getInputTxt(titleElement, "UI.Tips");
    
            // 获取id为"text_tips"的元素
            const textTipsElement = document.getElementById("text_tips");
            // 设置元素的文本
            this.getInputTxt(textTipsElement, "UI_ExternGame");
    
            // 获取id为"btnOk_txt"的元素
            const okButtonTxtElement = document.getElementById("btnOk_txt");
            // 设置元素的文本
            this.getInputTxt(okButtonTxtElement, "General.General_1");
    
            // 获取id为"btnCancel_txt"的元素
            const cancelButtonTxtElement = document.getElementById("btnCancel_txt");
            // 设置元素的文本
            this.getInputTxt(cancelButtonTxtElement, "General.General_2");
        }
    
        // 该方法用于获取并设置元素的文本内容
        private getInputTxt(element: HTMLElement, key: string): void {
            console.log("getInputTxt: " + key);
            switch(key) {
                case "General.General_1":
                    element.innerHTML = i18nMgr._getLabel("Confirm", []);
                    break;
                case "General.General_2":
                    element.innerHTML = i18nMgr._getLabel("Cancel", []);//"Cancel";
                    break;
                case "UI_ExternGame":
                    element.innerHTML = i18nMgr._getLabel("Do you want to exit?", []);//"Do you want to exit the game?";
                    break;
                default:
                    console.log("Invalid key: " + key);
            }
            
            //element.innerHTML = app.i18n.t(key); // 确保替换为适当的函数/方法调用
        }
    
        // 该方法用于显示指定的iframe
        private show(url: string): void {
            try {
                const gameIframe = document.getElementById("Game") as HTMLIFrameElement;
                gameIframe.style.display = "block";
                gameIframe.src = url;
            } catch (error) {
                console.error("show url", error.message);
            }
        }
    
        // 该方法用于显示加载的iframe
        private showLoading(): void {
            const loadingIframe = document.getElementById("loading") as HTMLIFrameElement;
            loadingIframe.style.display = "block";
            if (this.loadingShow) {
                loadingIframe.src = "externGame/index.html";
            } else {
                loadingIframe.src = "externGame/index2.html";
            }

            document.getElementById("BtnBack").style.display = "block";
        }

        private showLoading2(): void {
            const loadingIframe = document.getElementById("loading") as HTMLIFrameElement;
            loadingIframe.style.display = "block";
            loadingIframe.src = "https://loading.io/";
            //loadingIframe.src = "externGame/index.html";
            document.getElementById("BtnBack").style.display = "block";
        }
    
        // 该方法用于显示提示
        private showTips(): void {
            this.onRefreshLabel();
            document.getElementById("TIP").style.display = "block";
        }
    
        // 该方法用于隐藏加载的iframe
        private hideLoading(): void {
            const loadingIframe = document.getElementById("loading") as HTMLIFrameElement;
            loadingIframe.style.display = "none";
        }
    
        // 该方法用于隐藏提示
        private hideTips(): void {
            document.getElementById("TIP").style.display = "none";
        }
    
        // 该方法用于隐藏所有元素
        private hideAll(): void {
            if (this.scoreEnd) {
                //app.ExternGameManager().RequestGameDown();
                //app.HallManager().GetFreeOutGameWindow();
            }
            const gameIframe = document.getElementById("Game") as HTMLIFrameElement;
            gameIframe.src = "about:blank";
            gameIframe.style.display = "none";
            document.getElementById("BtnBack").style.display = "none";
            this.hideTips();
            this.hideLoading();
            audioMgr.openBgm(true);//重新开启背景音效
        }
    }
}
