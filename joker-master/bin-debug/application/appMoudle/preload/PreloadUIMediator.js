var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var preload;
(function (preload) {
    /**
     * 这里是preload的四阶段处理
     * @author taojiang
     */
    var PreloadUIMediator = (function (_super) {
        __extends(PreloadUIMediator, _super);
        function PreloadUIMediator() {
            return _super.call(this, PreloadUIMediator.NAME, null) || this;
        }
        PreloadUIMediator.prototype.listNotificationInterests = function () {
            return [gameabc.UIConstants.PRE_LOAD_PROGRESS,
                gameabc.UIConstants.PRE_LOAD_VISABLE,
                gameabc.UIConstants.PRE_LOAD_COMPLETE,
                gameabc.UIConstants.PRE_BEGIN_LOAD,
                gameabc.UIConstants.pre_ALL_ALOD_COMPLETE];
        };
        PreloadUIMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case gameabc.UIConstants.PRE_BEGIN_LOAD:
                    __OPEN_PRELOAD();
                    this.preloadBegin(notification);
                    break;
                case gameabc.UIConstants.PRE_LOAD_PROGRESS:
                    this.preloadProgress(notification);
                    break;
                case gameabc.UIConstants.PRE_LOAD_COMPLETE:
                    this.preloadComp(notification);
                    break;
                case gameabc.UIConstants.pre_ALL_ALOD_COMPLETE:
                    this.preload_all_comp();
                    break;
                case gameabc.UIConstants.PRE_LOAD_VISABLE:
                    if (this.preloadGui)
                        this.preloadGui.visible = notification.getBody();
                    break;
            }
        };
        PreloadUIMediator.prototype.preload_all_comp = function () {
            var compfunc = function () {
                __CLOSE_PRELOAD();
                if (this.preloadGui)
                    this.preloadGui.setProgress(0, 0);
            };
            egret.setTimeout(compfunc, this, 1);
        };
        PreloadUIMediator.prototype.preloadBegin = function (notification) {
            if (this.preloadGui) {
                this.preloadGui.preloadData = notification.getBody();
            }
        };
        PreloadUIMediator.prototype.preloadProgress = function (notification) {
            if (this.preloadGui)
                this.preloadGui.setProgress(notification.getBody()[0], notification.getBody()[1]);
        };
        /*
         * 预置加载完成开启该模块
         */
        PreloadUIMediator.prototype.preloadComp = function (notification) {
            var preloadData = notification.getBody();
            if (preloadData) {
                if (preloadData.openingData != null)
                    gameabc.UIManager.openUI.apply(null, preloadData.openingData);
                else
                    gameabc.UIManager.openUI(preloadData.MUIID);
            }
        };
        Object.defineProperty(PreloadUIMediator.prototype, "preloadGui", {
            get: function () {
                var uiMoudel = gameabc.UIManager.getCacheUImoudel(__PRELOAD__);
                if (uiMoudel)
                    return gameabc.UIManager.getCacheUImoudel(__PRELOAD__).gui;
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return PreloadUIMediator;
    }(puremvc.Mediator));
    PreloadUIMediator.NAME = "___PreloadUIMediator";
    preload.PreloadUIMediator = PreloadUIMediator;
    __reflect(PreloadUIMediator.prototype, "preload.PreloadUIMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(preload || (preload = {}));
//# sourceMappingURL=PreloadUIMediator.js.map