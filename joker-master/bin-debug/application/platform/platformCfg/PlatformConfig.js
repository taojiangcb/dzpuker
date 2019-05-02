var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var platform;
(function (platform) {
    //export var NATIVER_VER:string = "";			//native的热更版本
    //export var WEB_VER:string = "";				//web的版本
    /**
     * native 包版本
     */
    platform.NATIVE_VER = "1.0.0";
    /**
     * 渠道ids
     */
    var CHANNE_IDS;
    (function (CHANNE_IDS) {
        CHANNE_IDS[CHANNE_IDS["DEFAULT"] = -1] = "DEFAULT";
        CHANNE_IDS[CHANNE_IDS["DEBUG"] = 10000] = "DEBUG";
        CHANNE_IDS[CHANNE_IDS["ANDROID"] = 10001] = "ANDROID";
        CHANNE_IDS[CHANNE_IDS["MEIZU"] = 10008] = "MEIZU";
        CHANNE_IDS[CHANNE_IDS["QH_360"] = 10009] = "QH_360";
        CHANNE_IDS[CHANNE_IDS["OLD_CHANNEL"] = 10010] = "OLD_CHANNEL";
        CHANNE_IDS[CHANNE_IDS["UU10133"] = 10133] = "UU10133";
        CHANNE_IDS[CHANNE_IDS["BAIDU_10022"] = 10022] = "BAIDU_10022";
        CHANNE_IDS[CHANNE_IDS["BAIDU_10006"] = 10005] = "BAIDU_10006";
        CHANNE_IDS[CHANNE_IDS["BAIDU_60031"] = 60031] = "BAIDU_60031";
        CHANNE_IDS[CHANNE_IDS["BAIDU_10139"] = 10139] = "BAIDU_10139";
        CHANNE_IDS[CHANNE_IDS["MY_APP"] = 10017] = "MY_APP";
        CHANNE_IDS[CHANNE_IDS["WANDOUJIA"] = 10033] = "WANDOUJIA";
        CHANNE_IDS[CHANNE_IDS["KUPAI"] = 10052] = "KUPAI";
        CHANNE_IDS[CHANNE_IDS["ALI_YUN"] = 10066] = "ALI_YUN";
        CHANNE_IDS[CHANNE_IDS["SOUGO"] = 10100] = "SOUGO";
        CHANNE_IDS[CHANNE_IDS["APPSTORE"] = 20001] = "APPSTORE";
        CHANNE_IDS[CHANNE_IDS["C_4399"] = 60033] = "C_4399";
        CHANNE_IDS[CHANNE_IDS["VIVO"] = 60030] = "VIVO";
        CHANNE_IDS[CHANNE_IDS["GD890001"] = 890001] = "GD890001";
        CHANNE_IDS[CHANNE_IDS["GD890002"] = 890002] = "GD890002";
        CHANNE_IDS[CHANNE_IDS["GD890003"] = 890003] = "GD890003";
        CHANNE_IDS[CHANNE_IDS["GD890004"] = 890004] = "GD890004";
        CHANNE_IDS[CHANNE_IDS["GD890005"] = 890005] = "GD890005";
        CHANNE_IDS[CHANNE_IDS["GD890006"] = 890006] = "GD890006";
        CHANNE_IDS[CHANNE_IDS["GD890007"] = 890007] = "GD890007";
        CHANNE_IDS[CHANNE_IDS["GD890008"] = 890008] = "GD890008";
        CHANNE_IDS[CHANNE_IDS["GAME_TEA_PC"] = 90027] = "GAME_TEA_PC";
        CHANNE_IDS[CHANNE_IDS["H5"] = 90033] = "H5";
        CHANNE_IDS[CHANNE_IDS["BF_PC"] = 90034] = "BF_PC";
        CHANNE_IDS[CHANNE_IDS["BACK_UP"] = 90036] = "BACK_UP";
        CHANNE_IDS[CHANNE_IDS["GAME_TEA_ANDROID"] = 90029] = "GAME_TEA_ANDROID";
        CHANNE_IDS[CHANNE_IDS["GAME_TEA_IOS"] = 90030] = "GAME_TEA_IOS";
        CHANNE_IDS[CHANNE_IDS["BIANFENG_ANDROID"] = 90031] = "BIANFENG_ANDROID";
        CHANNE_IDS[CHANNE_IDS["BIANFENG_ISO"] = 90032] = "BIANFENG_ISO"; //边锋ios
    })(CHANNE_IDS = platform.CHANNE_IDS || (platform.CHANNE_IDS = {}));
    /**
     * 商城appids
     */
    var PAY_APPIDS;
    (function (PAY_APPIDS) {
        PAY_APPIDS[PAY_APPIDS["_417001"] = 417001] = "_417001";
        PAY_APPIDS[PAY_APPIDS["_417002"] = 417002] = "_417002";
        PAY_APPIDS[PAY_APPIDS["_417003"] = 417003] = "_417003";
    })(PAY_APPIDS = platform.PAY_APPIDS || (platform.PAY_APPIDS = {}));
    /**
     * 当前渠道号是否是PC茶苑渠道
     * @returns {boolean}
     */
    function isGTPCChannel() {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB && (parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.DEBUG || parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_PC);
    }
    platform.isGTPCChannel = isGTPCChannel;
    /**
     * 我们自己边锋德州渠道号,走边锋自己的登录
     */
    function isBfdzpkdrChannel() {
        return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.DEBUG ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_PC ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.H5 ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.ANDROID ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.APPSTORE ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_ANDROID ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_IOS ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BIANFENG_ANDROID ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BIANFENG_ISO ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BACK_UP ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.OLD_CHANNEL ||
            platform.isUnited();
    }
    platform.isBfdzpkdrChannel = isBfdzpkdrChannel;
    /**
     * 单机游戏渠道号
     */
    function isDangji() {
        return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.KUPAI ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.VIVO;
    }
    platform.isDangji = isDangji;
    /**
     * 去除ＱＱ，ＷＸ登录，联运渠道号走边锋的登录但是不要腾讯登录
     */
    function isUnitedNotTencent() {
        return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890007;
    }
    platform.isUnitedNotTencent = isUnitedNotTencent;
    /**
     * 走边锋自己的登录
     */
    function isUnited() {
        return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.C_4399 ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.ALI_YUN ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.KUPAI ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.VIVO ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.UU10133 ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890003 ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890004 ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890005 ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890006 ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890007 ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GD890008;
    }
    platform.isUnited = isUnited;
    /**
     * 当前渠道号是否是茶苑渠道
     */
    function isGTChannel() {
        return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_PC ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_ANDROID ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.GAME_TEA_IOS ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.APPSTORE ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BACK_UP ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.OLD_CHANNEL ||
            platform.isUnited();
    }
    platform.isGTChannel = isGTChannel;
    /**
     * 当前渠道号是否是边锋渠道
     */
    function isBFChannel() {
        return parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BF_PC ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BIANFENG_ANDROID ||
            parseInt(platform.CHANNE_ID) == platform.CHANNE_IDS.BIANFENG_ISO;
    }
    platform.isBFChannel = isBFChannel;
    /**
     * 渠道号配置
     */
    function initCfg() {
        PlatformConfig.init();
    }
    platform.initCfg = initCfg;
    /**
     * 获取某个渠道号配置
     */
    function getChannelCfg(channelId) {
        return PlatformConfig.getCfg(channelId);
    }
    platform.getChannelCfg = getChannelCfg;
    /**
     * 可以通过登录界面登录的渠道号
     */
    function canLoginByAccount() {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE
            || platform.CHANNE_ID == platform.CHANNE_IDS.H5.toString()
            || platform.CHANNE_ID == platform.CHANNE_IDS.DEBUG.toString();
        // || platform.CHANNE_ID == platform.CHANNE_IDS.GAME_TEA_IOS.toString();
    }
    platform.canLoginByAccount = canLoginByAccount;
    /**
     *
     */
    function login() {
        if (!platform.isBfdzpkdrChannel()) {
            UserInterface.login();
        }
    }
    platform.login = login;
    /**
     * 获取当前的渠道配置
     */
    function channelCfg() {
        return PlatformConfig.getCfg(platform.CHANNE_ID);
    }
    platform.channelCfg = channelCfg;
    var PlatformConfig = (function () {
        function PlatformConfig() {
        }
        PlatformConfig.init = function () {
            this.defaultCfg = new PlatformConfigVO("-1", PAY_APPIDS._417002);
            //各个渠道号配置
            this.cfgs[CHANNE_IDS.APPSTORE] = new PlatformConfigVO(CHANNE_IDS.APPSTORE.toString(), PAY_APPIDS._417003);
            this.cfgs[CHANNE_IDS.GAME_TEA_IOS] = new PlatformConfigVO(CHANNE_IDS.GAME_TEA_IOS.toString(), PAY_APPIDS._417003);
            this.cfgs[CHANNE_IDS.ANDROID] = new PlatformConfigVO(CHANNE_IDS.ANDROID.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.OLD_CHANNEL] = new PlatformConfigVO(CHANNE_IDS.OLD_CHANNEL.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.C_4399] = new PlatformConfigVO(CHANNE_IDS.C_4399.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.ALI_YUN] = new PlatformConfigVO(CHANNE_IDS.ALI_YUN.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.GAME_TEA_ANDROID] = new PlatformConfigVO(CHANNE_IDS.GAME_TEA_ANDROID.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.BIANFENG_ANDROID] = new PlatformConfigVO(CHANNE_IDS.BIANFENG_ANDROID.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.H5] = new PlatformConfigVO(CHANNE_IDS.H5.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.BACK_UP] = new PlatformConfigVO(CHANNE_IDS.BACK_UP.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.GD890003] = new PlatformConfigVO(CHANNE_IDS.GD890003.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.GD890004] = new PlatformConfigVO(CHANNE_IDS.GD890004.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.GD890005] = new PlatformConfigVO(CHANNE_IDS.GD890005.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.GD890006] = new PlatformConfigVO(CHANNE_IDS.GD890006.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.GD890008] = new PlatformConfigVO(CHANNE_IDS.GD890008.toString(), PAY_APPIDS._417001);
            this.cfgs[CHANNE_IDS.UU10133] = new PlatformConfigVO(CHANNE_IDS.UU10133.toString(), PAY_APPIDS._417001);
        };
        PlatformConfig.getCfg = function (channelId) {
            if (this.cfgs.hasOwnProperty(channelId.toString())) {
                return this.cfgs[channelId];
            }
            else {
                this.defaultCfg.channelId = channelId;
                return this.defaultCfg;
            }
        };
        return PlatformConfig;
    }());
    PlatformConfig.cfgs = {};
    __reflect(PlatformConfig.prototype, "PlatformConfig");
    var PlatformConfigVO = (function () {
        function PlatformConfigVO(channelId, pay_appid) {
            this.channelId = ""; //渠道id
            this.pay_appid = 0; //商城列表appid
            this.channelId = channelId;
            this.pay_appid = pay_appid;
        }
        return PlatformConfigVO;
    }());
    __reflect(PlatformConfigVO.prototype, "PlatformConfigVO");
})(platform || (platform = {}));
//# sourceMappingURL=PlatformConfig.js.map