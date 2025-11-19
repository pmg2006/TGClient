
const { ccclass, property } = cc._decorator;

@ccclass


export default abstract class UIBase extends cc.Component {
    bindObj = [];

    onDestroy() {
        GameTools.destroyOnFire(this.bindObj);
    }

    onfire_on(eventName: string, ...args: any[]) {
        this.bindObj.push(onfire.on(eventName, ...args));
    }

    onfire_fire(eventName: string, ...args: any[]) {
        onfire.fire(eventName, ...args)
    }

}
