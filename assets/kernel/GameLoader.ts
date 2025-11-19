import GameTools from "./GameTools";
import { _xkNative } from "./xkNative";
import { _UIHelper } from "./UIHelper";
import { AudioMgr } from "./Core/AudioMgr";
import { CommandDefine } from "./Core/CommandDefine";
import {PlazNetKernel} from "./Core/extend/PlazNetKernel";
import {SGNetKernel} from "./Core/extend/SGNetKernel";
import { GameData } from "../main/script/GameData";
declare let window: any
declare const GameSink: any;//子游戏钩子 

export class _GameLoader {
    clientKernel: SGNetKernel = null;
    audioMgr: AudioMgr = new AudioMgr()
    NetHelp :PlazNetKernel;
    GameSink = null//子游戏钩子
    GameTools: GameTools = null
    Helper: GameTools = null
    CommandDefine = CommandDefine
    xkNative: _xkNative = null
    UIHelper: _UIHelper = null

    getGameSink = () => {
        return GameSink
    }

    init() {
        let xkNative = new _xkNative()
        let UIHelper = new _UIHelper()
        let clientKernel = SGNetKernel.instance()
        let audioMgr = new AudioMgr()

        this.clientKernel = clientKernel
        this.audioMgr = audioMgr
        this.NetHelp = PlazNetKernel.instance();
        this.GameSink = null//子游戏钩子
        this.GameTools = GameTools
        this.Helper = GameTools
        this.CommandDefine = CommandDefine
        this.xkNative = xkNative
        this.UIHelper = UIHelper

        window.clientKernel = clientKernel
        window.audioMgr = audioMgr
        window.NetHelp = PlazNetKernel.instance();
        window.GameSink = null//子游戏钩子
        window.GameTools = GameTools
        window.Helper = GameTools
        window.CommandDefine = CommandDefine
        window.xkNative = xkNative
        window.UIHelper = UIHelper
        if (GameData.Instance.bDebug) {
            cc.log("当前是Debug环境");
            window.G_OPEN_SOCKET_LOG = true;
        } 

        window.KernelData = PlazNetKernel.instance().meLoginUser;
        //@ts-ignore
        cc.xkNative = xkNative
        window.getGameSink = () => {
            return window.GameSink
        }
    }
}


export const GameLoader = new _GameLoader()
