import { CANCEL_FAVORITE_GAME, CONNECTION_CONFIG, SAVE_FAVORITE_GAME } from "../../kernel/Core/extend/ConstDefine";
import Utils from "../../kernel/Core/extend/Utils";
import { GameData, GameInfo } from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SFGameItem extends cc.Component {

    @property(cc.Sprite)
    pic: cc.Sprite = null;

    @property(cc.Node)
    loading: cc.Node = null;

    @property(cc.Label)
    gameName: cc.Label = null;

    @property(cc.Label)
    providerName: cc.Label = null;

    @property(cc.Node)
    itembg: cc.Node = null;

    @property(cc.Node)
    favorite: cc.Node = null;

    _picUrl: string = undefined;

    gameInfo: GameInfo = null;


    setPicUrl(url) {
        this._picUrl = url;
    }

    async onFavoriteClick(event) {
        if (!KernelData.userID) {
            return;
        }
        let favoriteGamesList = [];

        let url = "";
        if (event.isChecked) {
            url = CONNECTION_CONFIG.yanzhengAddr + SAVE_FAVORITE_GAME;
        } else {
            url = CONNECTION_CONFIG.yanzhengAddr + CANCEL_FAVORITE_GAME;
        }
        let data = {
            userID: KernelData.userID,
            gameCode: this.gameInfo.gameCode
        };
        let response:any = await Utils.httpRequest(url, 'POST', data);
        if (response.code === 20000 && response.data) {
            favoriteGamesList = response.data;
        }
        favoriteGamesList = Array.from(new Set(favoriteGamesList));

        GameData.Instance.favoriteGamesList = [];
        for (let i = 0; i < favoriteGamesList.length; i++) {
            let gameCode = favoriteGamesList[i];
            let gameInfo = GameData.Instance.localGameUrls.find(game => game.gameCode === gameCode)
                || GameData.Instance.arcadeUrls.find(game => game.gameCode === gameCode)
                || GameData.Instance.pgsoftUrls.find(game => game.gameCode === gameCode)
                || GameData.Instance.slotsUrls.find(game => game.gameCode === gameCode)
                || GameData.Instance.blockchainUrls.find(game => game.gameCode === gameCode)
                || GameData.Instance.liveCasinoUrls.find(game => game.gameCode === gameCode);

            if (gameInfo) {
                GameData.Instance.favoriteGamesList.push(gameInfo);
            }
        }

        cc.find("Canvas/UI").emit('freshfavorito', {});
    }

    initData(info:GameInfo) {
        if (this.favorite) {
            this.favorite.active = true;
        }
        this.gameInfo = info;
        if (info.showName) {
            this.gameName.string = info.gameName;
            this.providerName.string = info.provider;
        } else {
            this.gameName.string = "";
            this.providerName.string = "";
            this.itembg.active = false;
            this.pic.node.height = 280;
            this.pic.node.y = 0;
        }

        if (info.iconUrl) {
            cc.loader.load(info.iconUrl,(err,res)=>{
                if(err)return
                this.pic.spriteFrame = new cc.SpriteFrame(res)    
                this.loading.active = false;
                if (this.favorite) {
                    this.favorite.active = true;
                    if (GameData.Instance.favoriteGamesList.find(game => game.gameCode === this.gameInfo.gameCode)) {
                        this.favorite.getComponent(cc.Toggle).isChecked = true;
                    }
                }
            })
        }
    }
}