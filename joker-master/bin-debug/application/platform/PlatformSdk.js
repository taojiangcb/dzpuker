var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var PlatformSdk = (function () {
    function PlatformSdk() {
    }
    PlatformSdk.init = function () {
        PlatformSdk.executor.init();
    };
    PlatformSdk.setListener = function (listener, thisObj) {
        PlatformSdk.executor.setListener(listener, thisObj);
    };
    PlatformSdk.getSdkVersion = function () {
    };
    PlatformSdk.getPlatformId = function () {
    };
    PlatformSdk.getPlatformName = function () {
    };
    PlatformSdk.getPlatformVersion = function () {
    };
    return PlatformSdk;
}());
PlatformSdk.executor = new PlatformExecutor();
__reflect(PlatformSdk.prototype, "PlatformSdk");
//# sourceMappingURL=PlatformSdk.js.map