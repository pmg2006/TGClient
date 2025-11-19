
const {ccclass, property} = cc._decorator;

@ccclass
export default class panel_player_yinsi extends cc.Component {

    @property(cc.WebView)
    webview:cc.WebView = null;

    public URL = "";

    start () {
        this.webview.url = this.URL;
        
    }
}
