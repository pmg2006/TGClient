

export interface GameInfo {
    gameId: number;
    provider: string;
    gameCode: string;
    gameName: string;
    iconUrl: string;
    showName: boolean;
}

export class GameData {

    private static instance: any = null;

    public static get Instance() {
        if (!this.instance) {
            this.instance = new GameData();
        }
        return this.instance;
    }

    public brandId: String = "1085";

    public agentCode: String = "";
    public deviceInfo: String = "";
    public serviceLink: String = "";
    public thirdToken: String = "";
    public androidApkId: String = "";
    public get ip(): String {
        console.log("ip:", window.ip);
        return window.ip;
    }

    bDebug: boolean = CC_DEBUG;

    public payType: EM_PAY_TYPE = EM_PAY_TYPE.payLi;

    recentGamesList: GameInfo[] = [];

    favoriteGamesList: GameInfo[] = [];

    public gameType: GAME_TYPE = GAME_TYPE.EGAME;

    public JackpotHeight: number = -50;

    public JackpotNumber: number = 0;

    // Change to a two-dimensional array, the first index is gameType
    //public gameInfoArrayByGameType: {[gameType: string]: GameInfo[]} = {};

    // 按游戏厂商分组
    //public gameInfoArrayByProvider: {[gameProvider: string]: GameInfo[]} = {};
    //游戏厂商
    // export enum EM_GameProvider {
    //     SkyWind = 0,//SkyWind
    //     PG_Soft = 1,//PG Soft
    //     Spribe = 2,//Spribe
    //     BGaming = 3,//BGaming
    //     PlayStar = 4,//PlayStar
    // }

    public localGameUrls: GameInfo[] = [
        //{gameId: 1, provider: "local", gameCode: "spb_mines", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/mines.png", showName: false},
        { gameId: 1, provider: "local", gameCode: "sl", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/mines.png", showName: false },
        //{gameId: 3, provider: "local", gameCode: "spb_aviator", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/crash.png", showName: false},
        { gameId: 3, provider: "local", gameCode: "crash", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/crash.png", showName: false },
        { gameId: 4, provider: "local", gameCode: "bs", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/crypto.png", showName: false },
        //{gameId: 5, provider: "local", gameCode: "pstar_777.0", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/777.png", showName: false},
        // {gameId: 6, provider: "local", gameCode: "spb_miniroulette", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/double.png", showName: false},
        //{gameId: 6, provider: "local", gameCode: "zp", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/double.png", showName: false},
        // {gameId: 7, provider: "local", gameCode: "spb_hilo", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/truco.png", showName: false},
        // {gameId: 7, provider: "local", gameCode: "lhd", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/truco.png", showName: false},
        // {gameId: 8, provider: "local", gameCode: "spb_hotline", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/cars.png", showName: false},
        // //{gameId: 8, provider: "local", gameCode: "bcbm", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/cars.png", showName: false},
        // {gameId: 1, provider: "PG Soft", gameCode: "pg_126", gameName: "Fortune Tiger", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_126_EA.png", showName: true},
        //{gameId: 2, provider: "PG Soft", gameCode: "pgsoft_1543462", gameName: "Fortune Rabbit", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_1543462_EA.png", showName: true},
        // {gameId: 3, provider: "PG Soft", gameCode: "pg_68", gameName: "Fortune Mouse", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_fortune-mouse_EA.png", showName: true},
        //{gameId: 4, provider: "PG Soft", gameCode: "pgsoft_57", gameName: "Dragon Hatch", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_dragon-hatch_EA.png", showName: true},
        //{gameId: 5, provider: "PG Soft", gameCode: "pgsoft_42", gameName: "Ganesha Gold", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_ganesha-gold_EA.png", showName: true},
        //{gameId: 6, provider: "PG Soft", gameCode: "pgsoft_25", gameName: "Plushie Frenzy", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_25.png", showName: false},
        //c{gameId: 6, provider: "PG Soft", gameCode: "pgsoft_89", gameName: "Plushie Frenzy", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_89.png", showName: true},
        //{gameId: 7, provider: "PG Soft", gameCode: "pgsoft_104", gameName: "Wild Bandito", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_wild-bandito_EA.png", showName: true},
        //{gameId: 8, provider: "PG Soft", gameCode: "pgsoft_53", gameName: "The Great Icescape", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_53.png", showName: true},
        //{gameId: 9, provider: "PG Soft", gameCode: "pgsoft_70", gameName: "Candy Burst", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_70.png", showName: true},
        // {gameId: 1079, provider: "PG Soft", gameCode: "pgsoft_79", gameName: "Dreams of Macau", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_79.png", showName: true},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1695365", gameName: "Fortune Dragon", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1695365.png", showName: false},
        //新增
        //{ gameId: 1041, provider: "CQ9", gameCode: "cq9_188", gameName: "Cricket Fever", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/cq9/188.png", showName: true },
        //{ gameId: 1042, provider: "PG Soft", gameCode: "pg_42", gameName: "Ganesha Gold", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_ganesha-gold_EA.png", showName: true },
        //{ gameId: 1075, provider: "PG Soft", gameCode: "pg_75", gameName: "Ganesha Fortune", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_75.png", showName: true },
        //{ gameId: 3000, provider: "Jili", gameCode: "jili_47_bfs", gameName: "Charge Buffalo", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_47_EA.png", showName: true },
        //{ gameId: 3000, provider: "Jili", gameCode: "jili_91_ifff", gameName: "Lucky Coming", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_91_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_51_mc", gameName: "Money Coming", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_51_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_49_fullhouse", gameName: "Super Ace", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_49_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_35_ols2", gameName: "Crazy777", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_35_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_109_fg", gameName: "Fortune Gems", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_109_EA.png", showName: true },
        { gameId: 1135, provider: "PG Soft", gameCode: "pg_135", gameName: "Wild Bounty Showdown", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_135.png", showName: true },
        { gameId: 1104, provider: "PG Soft", gameCode: "pg_104", gameName: "Wild Bandito", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_wild-bandito_EA.png", showName: true },
        // { gameId: 2, provider: "local", gameCode: "789", gameName: "", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/bb/luckyroller.png", showName: false },
        // { gameId: 1065, provider: "PG Soft", gameCode: "pg_65", gameName: "Mahjong Ways", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_mahjong-ways_EA.png", showName: true },
    ];


    public arcadeUrls: GameInfo[] = [
        // {gameId: 1, provider: "Jili", gameCode: "jili_dinosaurtycoonii", gameName: "Dinosaur Tycoon II", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/jili/JL_42_EA.png", showName: true},
        // {gameId: 1, provider: "Jili", gameCode: "jili_dragonfortune", gameName: "Dragon Fortune", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/jili/JL_60_EA.png", showName: true},
        // {gameId: 1, provider: "Jili", gameCode: "jili_happyfishing", gameName: "Happy Fishing", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/jili/JL_82_EA.png", showName: true},
        // {gameId: 1, provider: "Jili", gameCode: "jili_dinosaurtycoonii", gameName: "Dinosaur Tycoon II", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/jili/JL_82_EA2.png", showName: true},
        // {gameId: 1, provider: "Jili", gameCode: "jili_boomlegend", gameName: "Boom Legend", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/jili/JL_71_EA.png", showName: true},
        // {gameId: 1, provider: "Jili", gameCode: "jili_megafishing", gameName: "Mega Fishing", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/jili/JL_74_EA.png", showName: true},
        // {gameId: 4001, provider: "PlayStar", gameCode: "pstar_oceankingstreasure", gameName: "OCEAN KING'S TREASURE", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/pstar/game_pstar_oceankingstreasure.png", showName: false},
        // {gameId: 4002, provider: "PlayStar", gameCode: "pstar_runningbuffalo", gameName: "RUNNING BUFFALO", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/pstar/game_pstar_runningbuffalo.png", showName: false},
        // {gameId: 4003, provider: "PlayStar", gameCode: "pstar_spicyfishing", gameName: "SPICY FISHING", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/pstar/game_pstar_spicyfishing.png", showName: false},
        // {gameId: 4004, provider: "PlayStar", gameCode: "pstar_zombiebonus", gameName: "ZOMBIE BONUS", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/pstar/game_pstar_zombiebonus.png", showName: false},
        // {gameId: 1, provider: "SkyWind", gameCode: "sw_fj", gameName: "Fly Jet", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/arcade/sw/game_sw_fj.png", showName: false},

        { gameId: 3000, provider: "Jili", gameCode: "jili_137_ge", gameName: "Gold Rush", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_137_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_142_bh", gameName: "Bonus Hunter", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_142_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_144_cai", gameName: "JILI CAISHEN", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_144_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_145_ln", gameName: "Neko Fortune", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_145_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_146_fb", gameName: "World Cup", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_146_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_36_bbc", gameName: "Bao boon chin", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_36_EA.png", showName: true },

        //"https://luck111.s3.ap-south-1.amazonaws.com/arcade/pstar/game_pstar_haidilao.png", 横屏
        //"https://luck111.s3.ap-south-1.amazonaws.com/arcade/sw/game_sw_fufarm.png", // 横屏
        //"https://luck111.s3.ap-south-1.amazonaws.com/arcade/sw/game_sw_fufarm_jp.png", // 横屏
        //"https://luck111.s3.ap-south-1.amazonaws.com/arcade/sw/game_sw_fufish-jp.png",// 横屏
        //"https://luck111.s3.ap-south-1.amazonaws.com/arcade/sw/game_sw_lucky_omq.png"  // 打不开
    ];

    public slotsUrls: GameInfo[] = [
        { gameId: 3000, provider: "Jili", gameCode: "jili_35_ols2", gameName: "Crazy777", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_35_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_43_xiyangyang", gameName: "XiYangYang", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_43_EA.png", showName: true },
        // {gameId: 3000, provider: "Jili", gameCode: "jili_dragontreasure", gameName: "Dragon Treasure", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_46_EA.png", showName: true},
        { gameId: 3000, provider: "Jili", gameCode: "jili_47_bfs", gameName: "Charge Buffalo", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_47_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_49_fullhouse", gameName: "Super Ace", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_49_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_51_mc", gameName: "Money Coming", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_51_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_58_gq", gameName: "Golden Queen", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_58_EA.png", showName: true },
        //{gameId: 3000, provider: "Jili", gameCode: "jili_dragontiger", gameName: "Dragon & Tiger", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_61_EA.png", showName: true},
        { gameId: 3000, provider: "Jili", gameCode: "jili_76_nightclub", gameName: "Party Night", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_76_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_77_bk", gameName: "Boxing King", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_77_EA.png", showName: true },
        // {gameId: 3000, provider: "Jili", gameCode: "jili_secrettreasure", gameName: "Secret Treasure", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_78_EA.png", showName: true},
        { gameId: 3000, provider: "Jili", gameCode: "jili_85_mw", gameName: "Pharaoh Treasure", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_85_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_87_bog", gameName: "Book of Gold", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_87_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_91_ifff", gameName: "Lucky Coming", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_91_EA.png", showName: true },
        // {gameId: 3000, provider: "Jili", gameCode: "jili_crazyhunter", gameName: "Crazy Hunter", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_92_EA.png", showName: true},
        { gameId: 3000, provider: "Jili", gameCode: "jili_100_sr", gameName: "Super Rich", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_100_EA.png", showName: true },
        // {gameId: 3000, provider: "Jili", gameCode: "jili_medusa", gameName: "Medusa", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_101_EA.png", showName: true},
        { gameId: 3000, provider: "Jili", gameCode: "jili_102_rs2", gameName: "RomaX", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_102_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_106_twinwins", gameName: "TWIN WINS", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_106_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_108_mw3", gameName: "Magic Lamp", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_108_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_109_fg", gameName: "Fortune Gems", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_109_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_110_ali", gameName: "Ali Baba", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_110_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_115_aa", gameName: "BAgent Ace", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_115_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_38_fs", gameName: "Fengshen", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_38_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_116_taxi", gameName: "Happy Taxi", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_116_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_126_dotd", gameName: "Bone Fortune", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_126_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_130_thor", gameName: "Thor X", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_130_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_134_mw4", gameName: "Mega Ace", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_134_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_135_me", gameName: "Mayan Empire", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_135_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_136_samba", gameName: "Samba", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_136_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_137_ge", gameName: "Gold Rush", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_137_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_142_bh", gameName: "Bonus Hunter", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_142_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_144_cai", gameName: "JILI CAISHEN", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_144_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_145_ln", gameName: "Neko Fortune", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_145_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_146_fb", gameName: "World Cup", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_146_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_36_bbc", gameName: "Bao boon chin", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_36_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_164_pirate", gameName: "Pirate Queen", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_164_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_166_utaxi", gameName: "Wild Racer", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_166_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_181_wa", gameName: "Wild Ace", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_181_EA.png", showName: true },
        { gameId: 3000, provider: "Jili", gameCode: "jili_183_gj", gameName: "Golden Joker", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jili/JL_183_EA.png", showName: true },
        // {gameId: 3000, provider: "BGaming", gameCode: "bgaming_AllLuckyClover5", gameName: "All Lucky Clover 5", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/bgaming/game_bgaming_AllLuckyClover5.png", showName: false},
        // {gameId: 3001, provider: "BGaming", gameCode: "bgaming_AlohaKingElvis", gameName: "Aloha King Elvis", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/bgaming/game_bgaming_AlohaKingElvis.png", showName: false},
        // {gameId: 3002, provider: "BGaming", gameCode: "bgaming_AvalonTheLostKingdom", gameName: "Avalon: The Lost Kingdom", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/bgaming/game_bgaming_AvalonTheLostKingdom.png", showName: false},
        // { gameId: 3003, provider: "BGaming", gameCode: "bg_1576654", gameName: "Beer Bonanza", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/bgaming/game_bgaming_BeerBonanza.png", showName: false },
        // {gameId: 3004, provider: "BGaming", gameCode: "bgaming_BonanzaBillion", gameName: "Bonanza Billion", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/bgaming/game_bgaming_BonanzaBillion.png", showName: false},
        // {gameId: 3006, provider: "BGaming", gameCode: "bgaming_CandyMonsta", gameName: "Candy Monsta", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/bgaming/game_bgaming_CandyMonsta.png", showName: false},

        // {gameId: 4001, provider: "PlayStar", gameCode: "pstar_alchemy", gameName: "ALCHEMY", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/pstar/game_pstar_alchemy.png", showName: false},
        // {gameId: 4002, provider: "PlayStar", gameCode: "pstar_athena", gameName: "ATHENA", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/pstar/game_pstar_athena.png", showName: false},
        // {gameId: 4003, provider: "PlayStar", gameCode: "pstar_aurorawolf", gameName: "AURORA WOLF", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/pstar/game_pstar_aurorawolf.png", showName: false},
        // {gameId: 4004, provider: "PlayStar", gameCode: "pstar_burlesque2", gameName: "BURLESQUE 2", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/pstar/game_pstar_burlesque2.png", showName: false},
        // {gameId: 4005, provider: "PlayStar", gameCode: "pstar_challengefulushouxi", gameName: "CHALLENGE・FU LU SHOU XI", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/pstar/game_pstar_challengefulushouxi.png", showName: false},

        // {gameId: 2, provider: "SkyWind", gameCode: "pstar_challengefulushouxi", gameName: "CHALLENGE・FU LU SHOU XI", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/sw/game_itg_bigirishbucks_9404.png", showName: false},
        // {gameId: 3, provider: "SkyWind", gameCode: "sw_2pd", gameName: "2 Powerful Dragons", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/sw/game_sw_2pd.png", showName: false},
        //{gameId: 4, provider: "SkyWind", gameCode: "pstar_challengefulushouxi", gameName: "CHALLENGE・FU LU SHOU XI", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/sw/game_sw_al.png", showName: false},
        // {gameId: 5, provider: "SkyWind", gameCode: "sw_bibume", gameName: "Big Buffalo Megaways", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/sw/game_sw_bibume.png", showName: false}

    ];

    //新增区块链游戏
    public blockchainUrls: GameInfo[] = [
        { gameId: 10001, provider: "Spribe", gameCode: "spribe_01", gameName: "Aviator", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/spribe/JDB_22001_EA.png", showName: true },
        { gameId: 10001, provider: "Spribe", gameCode: "spribe_dice", gameName: "Dice", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/spribe/JDB_22002_EA.png", showName: true },
        { gameId: 10001, provider: "Spribe", gameCode: "spribe_goal", gameName: "Goal", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/spribe/JDB_22003_EA.png", showName: true },
        { gameId: 10001, provider: "Spribe", gameCode: "spribe_plinko", gameName: "Plinko", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/spribe/JDB_22004_EA.png", showName: true },
        { gameId: 10001, provider: "Spribe", gameCode: "spribe_mines", gameName: "Mines", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/spribe/JDB_22005_EA.png", showName: true },
        { gameId: 10001, provider: "Spribe", gameCode: "spribe_hilo", gameName: "Hilo", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/spribe/JDB_22006_EA.png", showName: true },
    ];

    public pgsoftUrls: GameInfo[] = [
        { gameId: 1135, provider: "PG Soft", gameCode: "pg_135", gameName: "Wild Bounty Showdown", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_135.png", showName: true },
        { gameId: 1104, provider: "PG Soft", gameCode: "pg_104", gameName: "Wild Bandito", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_wild-bandito_EA.png", showName: true },
        { gameId: 1065, provider: "PG Soft", gameCode: "pg_65", gameName: "Mahjong Ways", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_mahjong-ways_EA.png", showName: true },
        { gameId: 1074, provider: "PG Soft", gameCode: "pg_74", gameName: "Mahjong Ways 2", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_mahjong-ways2_EA.png", showName: true },
        { gameId: 1126, provider: "PG Soft", gameCode: "pg_126", gameName: "Fortune Tiger", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_126_EA.png", showName: true },
        { gameId: 1136, provider: "PG Soft", gameCode: "pg_1543462", gameName: "Fortune Rabbit", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_1543462_EA.png", showName: true },
        { gameId: 1136, provider: "PG Soft", gameCode: "pg_1695365", gameName: "Fortune Dragon", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1695365.png", showName: true },
        { gameId: 1098, provider: "PG Soft", gameCode: "pg_98", gameName: "Fortune Ox", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_98.png", showName: true },
        { gameId: 1100, provider: "PG Soft", gameCode: "pg_100", gameName: "Candy Bonanza", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_100.png", showName: true },
        { gameId: 1136, provider: "PG Soft", gameCode: "pg_130", gameName: "Lucky Piggy", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_130.png", showName: true },
        { gameId: 1068, provider: "PG Soft", gameCode: "pg_68", gameName: "Fortune Mouse", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_fortune-mouse_EA.png", showName: true },

        // {gameId: 1001, provider: "PG Soft", gameCode: "pgsoft_1", gameName: "Honey Trap of Diao Chan", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_1.png", showName: false},
        // {gameId: 1002, provider: "PG Soft", gameCode: "pgsoft_2", gameName: "Gem Saviour", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_2.png", showName: false},
        { gameId: 1003, provider: "PG Soft", gameCode: "pg_3", gameName: "Fortune Gods", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_3.png", showName: true },
        // {gameId: 1006, provider: "PG Soft", gameCode: "pgsoft_6", gameName: "Medusa 2: The Quest of Perseus", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_6.png", showName: false},
        // {gameId: 1007, provider: "PG Soft", gameCode: "pgsoft_7", gameName: "Medusa 1: The Curse of Athena", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_7.png", showName: false},
        // {gameId: 1018, provider: "PG Soft", gameCode: "pgsoft_18", gameName: "Hood vs Wolf", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_18.png", showName: false},
        // {gameId: 1020, provider: "PG Soft", gameCode: "pgsoft_20", gameName: "Reel Love", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_20.png", showName: false},
        // {gameId: 1024, provider: "PG Soft", gameCode: "pgsoft_24", gameName: "Win Win Won", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_24.png", showName: false},
        // {gameId: 1025, provider: "PG Soft", gameCode: "pgsoft_25", gameName: "Plushie Frenzy", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_25.png", showName: false},
        { gameId: 1026, provider: "PG Soft", gameCode: "pg_26", gameName: "Tree of Fortune", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_26.png", showName: true },
        // {gameId: 1028, provider: "PG Soft", gameCode: "pgsoft_28", gameName: "Hotpot", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_28.png", showName: true},
        // {gameId: 1029, provider: "PG Soft", gameCode: "pgsoft_29", gameName: "Dragon Legend", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_29.png", showName: false},
        // {gameId: 1031, provider: "PG Soft", gameCode: "pgsoft_31", gameName: "Baccarat Deluxe", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_31.png", showName: false},
        { gameId: 1033, provider: "PG Soft", gameCode: "pg_33", gameName: "Hip Hop Panda", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_33.png", showName: true },
        //{gameId: 1034, provider: "PG Soft", gameCode: "pgsoft_34", gameName: "Legend of Hou Yi", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_34.png", showName: false},
        //{gameId: 1035, provider: "PG Soft", gameCode: "pgsoft_35", gameName: "Mr. Hallow-Win", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_35.png", showName: false},
        //{gameId: 1036, provider: "PG Soft", gameCode: "pgsoft_36", gameName: "Prosperity Lion", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_36.png", showName: false},
        //{gameId: 1037, provider: "PG Soft", gameCode: "pgsoft_37", gameName: "Santa's Gift Rush", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_37.png", showName: false},
        //{gameId: 1038, provider: "PG Soft", gameCode: "pgsoft_38", gameName: "Gem Saviour Sword", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_38.png", showName: false},
        { gameId: 1039, provider: "PG Soft", gameCode: "pg_39", gameName: "Piggy Gold", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_39.png", showName: true },
        { gameId: 1040, provider: "PG Soft", gameCode: "pg_40", gameName: "Jungle Delight", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_40.png", showName: true },
        //{gameId: 1041, provider: "PG Soft", gameCode: "pgsoft_41", gameName: "Symbols Of Egypt", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_41.png", showName: true},
        { gameId: 1042, provider: "PG Soft", gameCode: "pg_42", gameName: "Ganesha Gold", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_ganesha-gold_EA.png", showName: true },
        //{gameId: 1044, provider: "PG Soft", gameCode: "pgsoft_44", gameName: "Emperor's Favour", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_44.png", showName: true},
        { gameId: 1048, provider: "PG Soft", gameCode: "pg_48", gameName: "Double Fortune", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_48.png", showName: true },
        //{gameId: 1050, provider: "PG Soft", gameCode: "pgsoft_50", gameName: "Journey to the Wealth", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_50.png", showName: true},
        //{gameId: 1053, provider: "PG Soft", gameCode: "pgsoft_53", gameName: "The Great Icescape", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_53.png", showName: true},
        { gameId: 1057, provider: "PG Soft", gameCode: "pg_57", gameName: "Dragon Hatch", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_dragon-hatch_EA.png", showName: true },
        //{gameId: 1058, provider: "PG Soft", gameCode: "pgsoft_58", gameName: "Vampire's Charm", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_58.png", showName: true},
        //{gameId: 1059, provider: "PG Soft", gameCode: "pgsoft_59", gameName: "Ninja vs Samurai", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_59.png", showName: true},
        //{gameId: 1060, provider: "PG Soft", gameCode: "pgsoft_60", gameName: "Leprechaun Riches", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_60.png", showName: true},
        //{gameId: 1061, provider: "PG Soft", gameCode: "pgsoft_61", gameName: "Flirting Scholar", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_61.png", showName: true},
        //{gameId: 1062, provider: "PG Soft", gameCode: "pgsoft_62", gameName: "Gem Saviour Conquest", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_62.png", showName: true},
        { gameId: 1063, provider: "PG Soft", gameCode: "pg_63", gameName: "Dragon Tiger Luck", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/PG_dragon-tiger-luck_EA.png", showName: true },
        //{gameId: 1064, provider: "PG Soft", gameCode: "pgsoft_64", gameName: "Muay Thai Champion", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_64.png", showName: true},
        //{ gameId: 1067, provider: "PG Soft", gameCode: "pg_67", gameName: "Shaolin Soccer", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_67.png", showName: true },
        { gameId: 1069, provider: "PG Soft", gameCode: "pg_69", gameName: "Bikini Paradise", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_69.png", showName: true },
        //{gameId: 1070, provider: "PG Soft", gameCode: "pgsoft_70", gameName: "Candy Burst", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_70.png", showName: true},
        //{gameId: 1071, provider: "PG Soft", gameCode: "pgsoft_71", gameName: "Cai Shen Wins", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_71.png", showName: true},
        //{gameId: 1073, provider: "PG Soft", gameCode: "pgsoft_73", gameName: "Egypt's Book of Mystery", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_73.png", showName: true},
        { gameId: 1075, provider: "PG Soft", gameCode: "pg_75", gameName: "Ganesha Fortune", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_75.png", showName: true },
        { gameId: 1079, provider: "PG Soft", gameCode: "pg_79", gameName: "Dreams of Macau", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_79.png", showName: true },
        { gameId: 1080, provider: "PG Soft", gameCode: "pg_80", gameName: "Circus Delight", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_80.png", showName: true },
        { gameId: 1082, provider: "PG Soft", gameCode: "pg_82", gameName: "Phoenix Rises", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_82.png", showName: true },
        { gameId: 1083, provider: "PG Soft", gameCode: "pg_83", gameName: "Wild Fireworks", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_83.png", showName: true },
        //{ gameId: 1084, provider: "PG Soft", gameCode: "pg_84", gameName: "Queen of Bounty", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_84.png", showName: true },
        //{ gameId: 1085, provider: "PG Soft", gameCode: "pg_85", gameName: "Genie's 3 Wishes", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_85.png", showName: true },
        //{gameId: 1086, provider: "PG Soft", gameCode: "pgsoft_86", gameName: "Galactic Gems", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_86.png", showName: true},
        //{gameId: 1087, provider: "PG Soft", gameCode: "pgsoft_87", gameName: "Treasures of Aztec", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_87.png", showName: true},
        //{gameId: 1088, provider: "PG Soft", gameCode: "pgsoft_88", gameName: "Jewels of Prosperity", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_88.png", showName: true},
        //{gameId: 1089, provider: "PG Soft", gameCode: "pgsoft_89", gameName: "Lucky Neko", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_89.png", showName: true},
        //{gameId: 1090, provider: "PG Soft", gameCode: "pgsoft_90", gameName: "Secrets of Cleopatra", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_90.png", showName: true},
        // {gameId: 1091, provider: "PG Soft", gameCode: "pgsoft_91", gameName: "Guardians of Ice & Fire", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_91.png", showName: true},
        // {gameId: 1092, provider: "PG Soft", gameCode: "pgsoft_92", gameName: "Thai River Wonders", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_92.png", showName: true},
        //{gameId: 1093, provider: "PG Soft", gameCode: "pgsoft_93", gameName: "Opera Dynasty", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_93.png", showName: true},
        //{gameId: 1094, provider: "PG Soft", gameCode: "pgsoft_94", gameName: "Bali Vacation", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_94.png", showName: true},
        //{gameId: 1095, provider: "PG Soft", gameCode: "pgsoft_95", gameName: "Majestic Treasures", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_95.png", showName: true},
        //{gameId: 1097, provider: "PG Soft", gameCode: "pgsoft_97", gameName: "Jack Frost's Winter", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_97.png", showName: true},
        // {gameId: 1101, provider: "PG Soft", gameCode: "pgsoft_101", gameName: "Rise of Apollo", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_101.png", showName: true},
        //{gameId: 1102, provider: "PG Soft", gameCode: "pgsoft_102", gameName: "Mermaid Riches", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_102.png", showName: true},
        //{gameId: 1103, provider: "PG Soft", gameCode: "pgsoft_103", gameName: "Crypto Gold", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_103.png", showName: true},

        //{gameId: 1105, provider: "PG Soft", gameCode: "pgsoft_105", gameName: "Heist Stakes", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_105.png", showName: true},
        { gameId: 1106, provider: "PG Soft", gameCode: "pg_106", gameName: "Ways of the Qilin", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_106.png", showName: true },
        //{gameId: 1107, provider: "PG Soft", gameCode: "pgsoft_107", gameName: "Legendary Monkey King", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_107.png", showName: true},
        // {gameId: 1108, provider: "PG Soft", gameCode: "pgsoft_108", gameName: "Buffalo Win", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_108.png", showName: true},
        { gameId: 1110, provider: "PG Soft", gameCode: "pg_110", gameName: "Jurassic Kingdom", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_110.png", showName: true },
        //{gameId: 1112, provider: "PG Soft", gameCode: "pgsoft_112", gameName: "Oriental Prosperity", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_112.png", showName: true},
        //{gameId: 1113, provider: "PG Soft", gameCode: "pgsoft_113", gameName: "Raider Jane's Crypt of Fortune", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_113.png", showName: true},
        //{gameId: 1114, provider: "PG Soft", gameCode: "pgsoft_114", gameName: "Emoji Riches", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_114.png", showName: true},
        { gameId: 1115, provider: "PG Soft", gameCode: "pg_115", gameName: "Supermarket Spree", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_115.png", showName: true },
        { gameId: 1117, provider: "PG Soft", gameCode: "pg_117", gameName: "Cocktail Nights", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_117.png", showName: true },
        //{gameId: 1118, provider: "PG Soft", gameCode: "pgsoft_118", gameName: "Mask Carnival", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_118.png", showName: true},
        // {gameId: 1119, provider: "PG Soft", gameCode: "pgsoft_119", gameName: "Spirited Wonders", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_119.png", showName: true},
        { gameId: 1121, provider: "PG Soft", gameCode: "pg_121", gameName: "Destiny of Sun & Moon", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_121.png", showName: true },
        //{gameId: 1122, provider: "PG Soft", gameCode: "pgsoft_122", gameName: "Garuda Gems", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/game_pgsoft_122.png", showName: true},

        //{gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_132", gameName: "Wild Coaster", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_132.png", showName: true},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1312883", gameName: "Prosper Fortune Tree", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1312883.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1340277", gameName: "Prosper Fortune Tree", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1340277.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1368367", gameName: "Prosper Fortune Tree", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1368367.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1372543", gameName: "Prosper Fortune Tree", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1372543.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1381200", gameName: "Prosper Fortune Tree", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1381200.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1402846", gameName: "Prosper Fortune Tree", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1402846.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1448762", gameName: "Prosper Fortune Tree", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1448762.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1451122", gameName: "Prosper Fortune Tree", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1451122.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1489936", gameName: "Ultimate Striker", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1489936.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1492288", gameName: "Pinata Winds", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1492288.png", showName: false},
        // {gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1508783", gameName: "Wild Ape 3258", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1508783.png", showName: false},
        { gameId: 1136, provider: "PG Soft", gameCode: "pg_1580541", gameName: "Mafia Mayhem", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1580541.png", showName: true },
        //{gameId: 1136, provider: "PG Soft", gameCode: "pgsoft_1682240", gameName: "Cash Mania", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/pgsoft/new_pgsoft_1682240.png", showName: false},
    ];

    /** 视讯修改为 JDB */
    public liveCasinoUrls: GameInfo[] = [

        { gameId: 5000, provider: "JDB", gameCode: "jdb_8003", gameName: "WINNING MASK Ⅰ", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8003.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_8022", gameName: "MAHJONG", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8022.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_8006", gameName: "FORMOSA BEAR", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8006.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_8020", gameName: "OPEN SESAME Ⅰ", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8020.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14055", gameName: "Kong", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14055.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14027", gameName: "Lucky Seven", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14027.png", showName: true },

        { gameId: 5000, provider: "JDB", gameCode: "jdb_14082", gameName: "Elemental Link Water", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14082.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14084", gameName: "CaiShen Coming", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14084.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14070", gameName: "Book Of Mystery", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14070.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14067", gameName: "Glamorous Girl", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14067.png", showName: true },

        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_14064", gameName: "Boom Fiesta", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14064.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14063", gameName: "Big Three Dragons", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14063.png", showName: true },
        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_14038", gameName: "Egypt Treasure", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14038.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14077", gameName: "Trump Card", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14077.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14043", gameName: "Golden Disco", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14043.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14054", gameName: "Lucky Diamond", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14054.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14039", gameName: "Fortune Treasure", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14039.png", showName: true },
        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_14052", gameName: "Jungle Jungle", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14052.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14050", gameName: "Spindrift", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14050.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14048", gameName: "Double Wilds", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14048.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14047", gameName: "Moneybags Man", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14047.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14045", gameName: "Super Niubi Deluxe", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14045.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14044", gameName: "Funky King Kong", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14044.png", showName: true },
        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_14040", gameName: "Pirate Treasure", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14040.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_8050", gameName: "Fortune Horse", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8050.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14068", gameName: "Prosperity Tiger", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14068.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14061", gameName: "Maya Gold Crazy", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14061.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14075", gameName: "Fortune Neko", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14075.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14080", gameName: "Elemental Link Fire", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14080.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_8048", gameName: "Open Sesame II", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8048.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14034", gameName: "Go Lai Fu", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14034.png", showName: true },
        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_8049", gameName: "Flirting Scholar Tang II", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8049.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14058", gameName: "Wonder Elephant", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14058.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14085", gameName: "FruityBonanza", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14085.png", showName: true },




        { gameId: 5000, provider: "JDB", gameCode: "jdb_8015", gameName: "MOONLIGHT TREASURE", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8015.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14042", gameName: "TREASURE BOWL", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14042.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_15001", gameName: "ROOSTER IN LOVE", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/15001.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14041", gameName: "MJOLNIR", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14041.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_8002", gameName: "FLIRTING SCHOLAR TANG Ⅰ", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8002.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_8017", gameName: "NEW YEAR", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/8017.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14010", gameName: "DRAGON", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14010.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14065", gameName: "BLOSSOM OF WEALTH", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14065.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14083", gameName: "Coo Coo Farm", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14083.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14060", gameName: "Lantern Wealth", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14060.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14086", gameName: "Open Sesame Mega", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14086.png", showName: true },
        { gameId: 5000, provider: "JDB", gameCode: "jdb_14087", gameName: "Pop Pop Candy", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14087.png", showName: true },
        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_14099", gameName: "Pop Pop Candy 1000", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14099.png", showName: true },
        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_14098", gameName: "Fruity Bonanza Combo", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14098.png", showName: true },
        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_14093", gameName: "Magic Ace WILD LOCK", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14093.png", showName: true },
        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_14094", gameName: "Bull Treasure", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14094.png", showName: true },
        //{ gameId: 5000, provider: "JDB", gameCode: "jdb_14088", gameName: "Magic Ace", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/slots/jdb/14088.png", showName: true },

        //{gameId: 5000, provider: "SkyWind", gameCode: "sw_liveGame_roulette", gameName: "roulette", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/skywind/sw_liveGame_roulette.png", showName: true},
        //{gameId: 5000, provider: "SkyWind", gameCode: "sw_ro_a01bac_nc", gameName: "Baccarat A01 No Commission", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/skywind/sw_ro_a01bac_nc.png", showName: true},
        // { gameId: 5000, provider: "SkyWind", gameCode: "sw_ro_red_ro", gameName: "Red Roulette", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/live/4_10.png", showName: true },
        // { gameId: 5000, provider: "SkyWind", gameCode: "sw_ro_gre_ro", gameName: "Green Roulette", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/live/4_68.png", showName: true },
        // { gameId: 5000, provider: "SkyWind", gameCode: "sw_ro_blu_ro", gameName: "Blue Roulette", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/live/4_37.png", showName: true },
        // { gameId: 5000, provider: "SkyWind", gameCode: "sw_ro_yel_ro", gameName: "Yellow Roulette", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/live/4_41.png", showName: true },
        //{gameId: 5000, provider: "SkyWind", gameCode: "sw_ro_blu_ro_atom", gameName: "Blue Atom Roulette", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/skywind/sw_ro_blu_ro_atom.png", showName: true},
        //{gameId: 5000, provider: "SkyWind", gameCode: "sw_ro_jw", gameName: "Live Joker's Wheel", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/skywind/sw_ro_jw.png", showName: true},
        //{gameId: 5000, provider: "SkyWind", gameCode: "sw_live_erol_atom", gameName: "Atom Roulette", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/skywind/sw_live_erol_atom.png", showName: true},
        //{gameId: 5000, provider: "SkyWind", gameCode: "sw_ro_a01bac", gameName: "Baccarat A01", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/skywind/sw_ro_a01bac.png", showName: true},
        //{gameId: 5000, provider: "SkyWind", gameCode: "sw_ro_bjmax", gameName: "BlackJack Max", iconUrl: "https://luck111.s3.ap-south-1.amazonaws.com/skywind/sw_ro_bjmax.png", showName: true},

    ];

    /**
     * 根据传入的PG的game_code返回新的PG的game_code。
     * 例如：如果传入的是126，那么返回320。
     * @param oldGameCode 旧的PG game_code
     * @returns 新的PG game_code
     */
    public getNewPgGameCode(oldGameCode: string): string {
        const gameCodeMapping: { [key: string]: string } = {
            "98": "31007",
            "1695365": "31049",
            "126": "31009",
            "68": "31010",
            "1543462": "31011",
            "39": "31012",
            "40": "31013",
            "104": "31014",
            "63": "31015",
            "42": "31016",
            "85": "31018",
            "3": "31019",
            "65": "31021",
            "84": "31022",
            "115": "31024",
            "130": "31025",
            "135": "31026",
            "74": "31027",
            "80": "31028",
            "121": "31029",
            "83": "31030",
            "82": "31031",
            "69": "31032",
            "48": "31033",
            "57": "31034",
            "79": "31036",
            "110": "31046",
            "117": "31045",
            "106": "31047",
            "67": "31051",
            "26": "31052",
            "75": "31042",
            "33": "31050",
            "1580541": "31057"
        };

        return gameCodeMapping[oldGameCode] || "-1"; // 如果没有找到映射，返回-1
    }

}


// export class GameInfo {
//     gameCode: string = "";
//     gameType: string = "";
//     cnName: string = "";
//     enName: string = "";
//     providerCode: string = "";
//     mobile: number = 0;
//     desktop: number = 0;
//     freeGame: number = 0;
//     freespin: number = 0;
//     goldenChip: number = 0;
//     progressive: number = 0;
//     jackpotName: string = "";
//     jackpotTicker: string = "";
//     description: string = "";
//     rtp: string = "";
//     reels: string = "";
//     lines: string = "";
//     resourceLink: string = "";
//     imgDefault: string = "";
//     status: number = 0;
//     tableAlias: string = "";
// }

export enum E_language {
    "zh" = 1,
    "en" = 2,
    "pt" = 3
}

export enum EM_PAY_TYPE {
    WeiChat = "weiChat", //微信
    Alipay = "alipay", //支付宝
    Usdt = "usdt", //虚拟币
    Cash = "cash", //直接支付
    "5upay" = "5upay", //首易信支付
    "payone" = "payone", // payone 支付
    "payLi" = "payLi", // payone 支付
    "google" = "google",
}

export enum EM_DISPLAY_TYPE {
    NORMAL, // 正常显示，按UI设计显示
    PAY,    // 显示PAY界面
    CASH    // 显示CASH界面
}

// 转换奖励类型
export enum EM_BONUS_TYPE {
    SCORE = 1, // 积分
    CASH = 2, // 现金
}

export enum EM_ACCOUNT_TYPE {
    MOBILE = 0, // 手机
    EMAIL = 1, // 邮箱
}

export enum GAME_TYPE {
    //官方PG
    PG = 1,
    //第三方PG
    VINTEBET = 2,
    //三方PG
    EGAME = 3,
}




