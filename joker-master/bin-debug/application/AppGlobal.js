var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AppGlobal = (function () {
    function AppGlobal() {
    }
    Object.defineProperty(AppGlobal, "gameCanvas", {
        /*
         * 获取游戏当前的 canvas
         */
        get: function () {
            var aa = document.getElementsByClassName("egret-player");
            if (aa && aa.length > 0) {
                var can = aa[0]["children"][0];
                return can;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppGlobal, "AppStage", {
        get: function () {
            return egret.MainContext.instance.stage;
        },
        enumerable: true,
        configurable: true
    });
    /**返回protobuf 类*/
    AppGlobal.getMessage = function (str) {
        if (AppGlobal.message == null) {
            //初始化template_proto
            var mess = RES.getRes("MessageVO_proto");
            if (mess == null)
                return null;
            AppGlobal.message = dcodeIO.ProtoBuf.loadProto(mess);
        }
        return AppGlobal.message.build("com.gameabc.ipad.http." + str);
    };
    /**返回 protobufVO */
    AppGlobal.getMessageVO = function (str, data) {
        if (data === void 0) { data = null; }
        var msgClass = this.getMessage(str);
        if (data == null)
            return new msgClass();
        return msgClass.decode(data);
    };
    /**返回 protobufVO 的ArrayBuffer数据*/
    AppGlobal.getMessageArrayBuffer = function (vo) {
        return vo.toArrayBuffer();
    };
    AppGlobal.drawStage = function (scale) {
        if (this.stageTexture != null)
            this.stageTexture.dispose();
        this.stageTexture = new egret.RenderTexture();
        var display = egret.MainContext.instance.stage;
        this.stageTexture.drawToTexture(display, new egret.Rectangle(0, 0, display.stageWidth, display.stageHeight), scale);
        return this.stageTexture;
    };
    return AppGlobal;
}());
/*
 * 游戏的显示层的根层级
 */
AppGlobal.appRoot = null;
AppGlobal.appReg = null;
/*
 * 全屏的大小
 */
AppGlobal.stageFullWidth = 0;
AppGlobal.stageFullHeight = 0;
/*
 * 显示最大宽
 */
AppGlobal.pageMaxWidth = 1136; //
/*
 * 显示最大高
 */
AppGlobal.pageMaxHeight = 768; //
/*
 * 显示最小宽
 */
AppGlobal.pageMinWidth = 960; //
/*
 * 显示最小高
 */
AppGlobal.pageMinHeight = 640; //
AppGlobal.isPCPlay = false; //
AppGlobal.isRotation = false; //
/**
 * 当前调试的玩家id
 * @type {number}
 */
AppGlobal.DebugRoleId = 0;
/**
 * 标记用户是否已经登录过（在这个项目里已经没有用了----------）
 */
AppGlobal.isLoginFlag = false;
__reflect(AppGlobal.prototype, "AppGlobal");
//# sourceMappingURL=AppGlobal.js.map