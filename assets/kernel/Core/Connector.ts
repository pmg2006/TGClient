import { KernelData } from "./KernelData";

//@ts-ignore
var SocketIO = SocketIO || window.io;

export class Connector {
    sock = null
    connectCB = null
    handler = null
    serverURI= ""
    constructor(handler) {
        this.sock = null
        this.connectCB = null
        this.handler = handler
    }


    connect(uri, connectCB) {
        if (this.sock && this.sock.connected && connectCB) {
            connectCB()
        }
        if (this.sock) return;
        this.connectCB = connectCB;
        this.serverURI = uri;
        console.log("Login...", uri);//正在连接中
        this.sock = SocketIO.connect(uri,
            {
                timeout: 5000,
                reconnectionDelayMax: 1000,
                transports: ['websocket'],

            });
        //链接事件
        this.sock.on("connect", this.onConnect.bind(this));
        this.sock.on("disconnect", this.onDisconnect.bind(this));
        this.sock.on("reconnect_attempt", this.onReconnect.bind(this));
        this.sock.on("reconnect_failed", this.onReconnectFailed.bind(this));

        this.sock.on("msg", this.onMsg.bind(this));

    }

    onConnect(data) {
        console.log("Connect succeed:" + this.serverURI);//连接成功:
        if (this.connectCB) {
            this.connectCB(true, "Login succeed" + this.serverURI)//连接成功:
            this.connectCB = null //清空
        } else {
            onfire.fire("onConnect", data)
        }
        console.log("onConnectSucceed: " + this.serverURI);
        onfire.fire("onConnectSucceed", data)
    }

    //重连多次失败
    onDisconnect(data) {
        console.log("Disconnect...", data);//断开连接----
        onfire.fire("onDisconnect", data)

    }

    //重连ing
    onReconnect(reconnect_count) {
        console.log("Re Login...", reconnect_count);//正在重连----
        onfire.fire("onReconnect", reconnect_count)

    }

    //重连多次失败
    onReconnectFailed(data) {
        console.log("重连多少次失败----", data);
        onfire.fire("reconnect_failed", data);
        this.sock = null; //真正断开
    }

    onMsg(eventName, data) {
        this.handler.onMsg(eventName, data)

    }

    disconnect() {
        console.log("主动断开----");
        this.sock && this.sock.close()
        this.sock = null
    }

    /**
     * 发送数据包
     * @param data
     */
    emit(route, eventName, data, callback) {
        if (this.sock == null || eventName == null)
            return;
        if (KernelData.socketLog)
            console.error(route, eventName, data)
        this.sock.emit(route, eventName, data, callback);
    }

}