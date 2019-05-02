var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameabc;
(function (gameabc) {
    /**
     * @author taojiang
     */
    var UIConstants = (function () {
        function UIConstants() {
        }
        return UIConstants;
    }());
    UIConstants.UI_STATE_CREATE = 1; //ui创建期
    UIConstants.UI_STATE_OPEN = 2; //ui被打开
    UIConstants.UI_STATE_CLOSE = 3; //ui被关闭了
    UIConstants.UI_STATE_PRELOAD = 4; //预置加载中
    UIConstants.PRE_LOAD_PROGRESS = "preloadProgress"; //当前预置加载进度
    UIConstants.PRE_BEGIN_LOAD = "preBeginload"; //开始预置加载
    UIConstants.PRE_LOAD_COMPLETE = "preloadComplete"; //加载完成
    UIConstants.pre_ALL_ALOD_COMPLETE = "preAllLoadComplete"; //所有的预置全都加载完成
    UIConstants.PRE_LOAD_VISABLE = "preloadvisable"; //当前预置visable
    UIConstants.PRE_MOUDLE_RES_GROUP = new Object(); //模块预置加载的资源组 
    UIConstants.PRE_MOUDLE_RES = new Object(); //模块的预置加载的零散资源
    gameabc.UIConstants = UIConstants;
    __reflect(UIConstants.prototype, "gameabc.UIConstants");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=UIConstants.js.map