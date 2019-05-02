var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var PlatformExecutor = (function () {
    function PlatformExecutor() {
        egret.ExternalInterface.addCallback("androidCallBack", function (message) {
            console.log("recv native call back msg:" + message);
            var json = JSON.parse(message);
            console.log("android callBack has this ? " + PlatformExecutor.lisObj == null);
            PlatformExecutor.listenr.call(PlatformExecutor.lisObj, json.code, json.msg);
        });
    }
    PlatformExecutor.prototype.init = function () {
        egret.ExternalInterface.call("init", "");
    };
    PlatformExecutor.prototype.setListener = function (listenr, thisObj) {
        PlatformExecutor.listenr = listenr;
        PlatformExecutor.lisObj = thisObj;
        egret.ExternalInterface.call("setListener", "");
    };
    PlatformExecutor.prototype.androidCallBack = function (msg) {
        var json = JSON.parse(msg);
        PlatformExecutor.listenr.call(PlatformExecutor.lisObj, json.code, json.msg);
    };
    return PlatformExecutor;
}());
PlatformExecutor.lisObj = null;
__reflect(PlatformExecutor.prototype, "PlatformExecutor");
//# sourceMappingURL=PlatformExecutor.js.map