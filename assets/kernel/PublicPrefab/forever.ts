/**
 * 永久节点
 */

import { GameLoader } from "../GameLoader";

const { ccclass, property } = cc._decorator;

@ccclass
export default class forever extends cc.Component {

    onLoad() {

        // 保存原始的 console.log 函数
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;

        // 重写 console.log
         console.log = function (...args) {
             const timestamp = new Date().toLocaleString();  // 获取当前时间
             originalConsoleLog(`[${timestamp}]`, ...args);  // 使用原始的 console.log 输出日志
         };

         console.error = function (...args) {
             const timestamp = new Date().toLocaleString();  // 获取当前时间
             originalConsoleError(`[${timestamp}]`, ...args);  // 使用原始的 console.log 输出日志
         };

        // 测试新的 console.log
        console.log("这是一条测试信息。");


        cc.game.addPersistRootNode(this.node); //永久
        //设置自动居中
        let v2 = cc.view.getVisibleSize();
        this.node.setPosition(v2.width / 2, v2.height / 2);

        GameLoader.init() //初始化所有
    }

    start() {

    }


}