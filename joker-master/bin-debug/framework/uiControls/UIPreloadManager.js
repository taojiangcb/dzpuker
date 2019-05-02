var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 模块预置加载管理，每个一预置加载都会有以三个个阶段这三个阶段分别会派发notification消息给PreloadMediator处理
 *    1. PRE_BEGIN_LOAD 开始加载 带有正加载加的数据信息UIPreloadData参数
 *    2. PRE_LOAD_PROGRESS 当前加载的进度 [load:total]
 *    3. PRE_LOAD_COMPLETE 加载完成
 * version 1.0;
 * platform web,native
 * @author taojiang
 *
 */
var gameabc;
(function (gameabc) {
    var UIPreloadManager = (function () {
        function UIPreloadManager() {
        }
        UIPreloadManager.pushOnPreload = function (data) {
            if (!data)
                return;
            var i = 0;
            for (i = 0; i != this.uipreCache.length; i++) {
                var item = this.uipreCache[i];
                if (item && item.preGroupName == data.preGroupName) {
                    return;
                }
            }
            this.uipreCache.push(data);
            this.onNextload(); //开始下载
        };
        /*
         * 开始加载或加载下一条
         */
        UIPreloadManager.onNextload = function () {
            var self = this;
            //加载通用资源组
            if (UIPreloadManager.UI_ASSETS_NAME.length > 0 && !RES.isGroupLoaded(UIPreloadManager.UI_ASSETS_NAME)) {
                app.mvc.AppFacade.getInstance().sendNotification(gameabc.UIConstants.PRE_BEGIN_LOAD);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onResourceLoadComplete, self);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onResourceLoadErr, self);
                RES.loadGroup(UIPreloadManager.UI_ASSETS_NAME);
                return;
            }
            if (this.currentLoad)
                return;
            if (this.uipreCache.length > 0) {
                this.currentLoad = this.uipreCache.shift();
                var next = function () {
                    app.mvc.AppFacade.getInstance().sendNotification(gameabc.UIConstants.PRE_LOAD_COMPLETE, self.currentLoad);
                    self.currentLoad = null;
                    //开始加载下一个预置
                    self.onNextload();
                };
                var load = function () {
                    self.countGroupError = 0;
                    app.mvc.AppFacade.getInstance().sendNotification(gameabc.UIConstants.PRE_BEGIN_LOAD, self.currentLoad);
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onResourceLoadComplete, self);
                    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
                    RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onResourceLoadErr, self);
                    RES.loadGroup(self.currentLoad.preGroupName);
                };
                if (this.currentLoad.preRes == null || this.currentLoad.preRes.length == 0)
                    next();
                else if (RES.createGroup(this.currentLoad.preGroupName, this.currentLoad.preRes, true))
                    load();
                else if (RES.getGroupByName(this.currentLoad.preGroupName).length > 0)
                    load();
            }
            else {
                //全部load完成
                this.currentLoad = null;
                app.mvc.AppFacade.getInstance().sendNotification(gameabc.UIConstants.pre_ALL_ALOD_COMPLETE);
                this.clearListener();
            }
        };
        UIPreloadManager.onResourceLoadComplete = function (event) {
            if (event.groupName == UIPreloadManager.UI_ASSETS_NAME) {
                this.currentLoad = null;
                //开始加载预置
                this.onNextload();
            }
            else if (this.currentLoad != null && event.groupName == this.currentLoad.preGroupName) {
                app.mvc.AppFacade.getInstance().sendNotification(gameabc.UIConstants.PRE_LOAD_COMPLETE, this.currentLoad);
                this.currentLoad = null;
                //开始加载下一个预置
                this.onNextload();
            }
        };
        UIPreloadManager.onResourceProgress = function (event) {
            app.mvc.AppFacade.getInstance().sendNotification(gameabc.UIConstants.PRE_LOAD_PROGRESS, [event.itemsLoaded, event.itemsTotal]);
            //            if(event.groupName == this.currentLoad.preGroupName) {
            //                app.mvc.AppFacade.getInstance().sendNotification(UIConstants.PRE_LOAD_PROGRESS,[event.itemsLoaded,event.itemsTotal]);
            //            }
        };
        UIPreloadManager.onResourceLoadErr = function (event) {
            if (++this.countGroupError < this.MAX_LOAD_ERROR_TIME) {
                RES.loadGroup(event.groupName);
            }
            else {
                this.clearListener();
                //加载失败关闭该模块
                console.log("网络不稳定引响预置加载:" + this.currentLoad.preGroupName + "失败!");
                if (event.resItem) {
                    tip.popSysCenterTip(event.resItem.name + "加载失败");
                }
                tip.popSysBottomTip("网络不稳定引响预置加载:" + this.currentLoad.preGroupName + "失败!");
                gameabc.UIManager.closeUI(this.currentLoad.MUIID);
                this.currentLoad = null;
                this.onNextload(); //开始下一个
            }
        };
        UIPreloadManager.clearListener = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadErr, this);
        };
        return UIPreloadManager;
    }());
    //通用资源组名
    UIPreloadManager.UI_ASSETS_NAME = "";
    /**要加载的资源列表*/
    UIPreloadManager.uipreCache = new Array();
    UIPreloadManager.countGroupError = 0;
    /** 加载产出错误后重试的最大次数 */
    UIPreloadManager.MAX_LOAD_ERROR_TIME = 3;
    gameabc.UIPreloadManager = UIPreloadManager;
    __reflect(UIPreloadManager.prototype, "gameabc.UIPreloadManager");
    var UIPreloadData = (function () {
        function UIPreloadData() {
            this.MUIID = 0; //模块id
            this.preGroupName = ""; //预置装载的名称(也就是groupName)
            this.preRes = null;
            this.openingData = null;
        }
        return UIPreloadData;
    }());
    gameabc.UIPreloadData = UIPreloadData;
    __reflect(UIPreloadData.prototype, "gameabc.UIPreloadData");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=UIPreloadManager.js.map