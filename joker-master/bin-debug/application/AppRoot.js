var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AppRoot = (function (_super) {
    __extends(AppRoot, _super);
    function AppRoot() {
        var _this = _super.call(this) || this;
        // 场景层 如 战场、主城、副本战场之类的
        _this.sceneLayer = new eui.UILayer();
        // 主UI层 如 底部功能栏
        _this.mainLayer = new eui.UILayer();
        // 弹窗层 如 设置、背包、装备之类的
        _this.panelLayer = new eui.UILayer();
        // 特效层 如 闪烁、飘字之类的
        _this.effectLayer = new eui.UILayer();
        // 通讯遮罩层 和服务器通讯UI
        _this.maskLayer = new eui.UILayer();
        // 加载遮罩层 场景切换的时候加载资源UI
        _this.loadLayer = new eui.UILayer();
        _this.init();
        AppGlobal.appReg = new AppReg();
        _this.startDragoneBonesClock();
        return _this;
    }
    Object.defineProperty(AppRoot, "gameLayer", {
        //游戏容器管理器单例
        get: function () {
            if (!this._instance)
                this._instance = new AppRoot();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /*
     * 全屏铺满设置函数.
     * 然后每次一执行的时候会都触发一次 stage.resize 事件需要单独处理的模块监听这个事件后进行全屏化操作就可以了
     * 我就写到这里了，如果还不懂就联系我本人吧。
     * @author taojiang
     * @version 1.1
     * @platform web,native
     */
    AppRoot.prototype.setFullScreen = function () {
        //==========屏幕超出以下范围将会产生等比缩放
        var pageMaxWidth = AppGlobal.pageMaxWidth; //1136;                
        var pageMaxHeight = AppGlobal.pageMaxHeight; // 768;
        var pageMinWidth = AppGlobal.pageMinWidth; //960;
        var pageMinHeight = AppGlobal.pageMinHeight; //640;
        //========================================
        var maxWHPercent = pageMaxWidth / pageMinHeight;
        var pageWidth = pageMinWidth;
        var pageHeight = pageMinHeight;
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            pageWidth = window.innerWidth;
            pageHeight = window.innerHeight;
            //移动设备的页面值
            if (typeof pageWidth != "number") {
                if (document.compatMode == "CSS1Compat") {
                    pageWidth = document.documentElement.clientWidth;
                    pageHeight = document.documentElement.clientHeight;
                }
                else {
                    pageWidth = document.body.clientWidth;
                    pageHeight = document.body.clientHeight;
                }
            }
        }
        else if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
            pageWidth = egret_native.EGTView.getFrameWidth();
            pageHeight = egret_native.EGTView.getFrameHeight();
        }
        var w = Math.max(pageWidth, pageHeight);
        var h = Math.min(pageHeight, pageWidth);
        if (w / h > maxWHPercent) {
            w = h * maxWHPercent;
        }
        if (h < pageMinHeight) {
            w = Math.round(w / h * pageMinHeight);
            h = pageMinHeight;
        }
        else if (h > pageMaxHeight) {
            w = Math.round(w / h * pageMaxHeight);
            h = pageMaxHeight;
        }
        if (w > pageMaxWidth) {
            h = Math.round(h / w * pageMaxWidth);
            w = pageMaxWidth;
        }
        AppGlobal.stageFullWidth = w;
        AppGlobal.stageFullHeight = h;
        if (egret.MainContext.instance.stage.stageWidth != w || egret.MainContext.instance.stage.stageWidth != h) {
            egret.MainContext.instance.stage.setContentSize(w, h);
        }
    };
    //初始化场景类
    AppRoot.prototype.init = function () {
        this.touchThrough = true;
        this.sceneLayer.touchThrough = true;
        this.mainLayer.touchThrough = true;
        this.panelLayer.touchThrough = true;
        this.effectLayer.touchThrough = true;
        this.maskLayer.touchThrough = true;
        this.loadLayer.touchThrough = true;
        this.addChild(this.sceneLayer);
        this.addChild(this.mainLayer);
        this.addChild(this.panelLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.maskLayer);
        this.addChild(this.loadLayer);
    };
    /**
     * 启动龙骨的驱动时钟
     */
    AppRoot.prototype.startDragoneBonesClock = function () {
        var passTime = 0;
        egret.Ticker.getInstance().register(this.onTick, this);
    };
    /**
     * 停止龙骨世界时钟
     */
    AppRoot.prototype.stopDragoneBonesClock = function () {
        egret.stopTick(this.onTick, this);
    };
    AppRoot.prototype.onTick = function (dt) {
        dragonBones.WorldClock.clock.advanceTime(dt / 1000);
        return true;
    };
    return AppRoot;
}(eui.UILayer));
__reflect(AppRoot.prototype, "AppRoot");
//# sourceMappingURL=AppRoot.js.map