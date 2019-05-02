var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var BrowserPlatformExecutor = (function () {
    function BrowserPlatformExecutor() {
    }
    BrowserPlatformExecutor.prototype.init = function () {
        alert("BrowserPlatformExecutor init");
        this.listenr(-1, "初始化失败");
    };
    BrowserPlatformExecutor.prototype.setListener = function (listenr) {
        this.listenr = listenr;
    };
    BrowserPlatformExecutor.prototype.androidCallBack = function (msg) {
        var json = JSON.parse(msg);
        this.listenr(json.code, json.msg);
    };
    return BrowserPlatformExecutor;
}());
__reflect(BrowserPlatformExecutor.prototype, "BrowserPlatformExecutor");
//# sourceMappingURL=BrowserPlatformExecutor.js.map