var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var loading;
    (function (loading) {
        /**
         *
         * @author
         *
         */
        var LoadingCircleUI = (function (_super) {
            __extends(LoadingCircleUI, _super);
            function LoadingCircleUI() {
                var _this = _super.call(this) || this;
                //private loadingimg: eui.Image;
                _this.rotationSpeed = 10;
                _this.delay = 0;
                _this.isComp = false;
                _this.createView();
                return _this;
            }
            LoadingCircleUI.prototype.createView = function () {
                this.skinName = "resource/app_skin/loadingCircleSkin.exml";
                this.width = AppGlobal.stageFullWidth;
                this.height = AppGlobal.stageFullHeight;
                //        this.percentWidth = 1;
                //        this.percentHeight = 1;
                this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createComplete, this);
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStageHandler, this);
            };
            LoadingCircleUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                var data = RES.getRes("puker_loading_json");
                var texture = RES.getRes("puker_loading_png");
                var mcFactory = new egret.MovieClipDataFactory(data, texture);
                var border = new eui.Component();
                border.horizontalCenter = 0;
                border.verticalCenter = 0;
                this.addChild(border);
                this.puker_mc = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
                this.puker_mc.play(-1);
                border.width = this.puker_mc.width;
                border.height = this.puker_mc.height;
                border.addChild(this.puker_mc);
            };
            Object.defineProperty(LoadingCircleUI, "instance", {
                //单例
                get: function () {
                    if (!this._instance) {
                        this._instance = new LoadingCircleUI();
                        this._instance.loadingCommands = {};
                        this._instance.commandKeys = [];
                    }
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            LoadingCircleUI.show = function (key) {
                //            AppRoot.gameLayer.maskLayer.addChild(this.instance);
                egret.Ticker.getInstance().register(LoadingCircleUI.instance.advanceTime, LoadingCircleUI.instance);
                this._instance.loadingCommands[key] = 0;
                if (this._instance.commandKeys.indexOf(key) == -1)
                    this._instance.commandKeys.push(key);
                this.instance.validateLoadingPopup(0);
            };
            LoadingCircleUI.prototype.validateLoadingPopup = function (time) {
                if (this.commandKeys.length > 0) {
                    var show = false;
                    var addtime;
                    var timeout = LoadingCircleUI.LOADING_TIMEOUT;
                    for (var i = this.commandKeys.length - 1; i >= 0; i--) {
                        addtime = this.loadingCommands[this.commandKeys[i]] += time;
                        if (addtime > timeout) {
                            LoadingCircleUI.hide(this.commandKeys[i]);
                        }
                        else {
                            show = true;
                        }
                    }
                    if (show) {
                        this.showLoading();
                    }
                    else {
                        this.hideLoading();
                    }
                }
                else {
                    this.hideLoading();
                }
            };
            LoadingCircleUI.prototype.showLoading = function () {
                AppRoot.gameLayer.maskLayer.addChild(this);
            };
            LoadingCircleUI.prototype.hideLoading = function () {
                this.delay = 0;
                AppRoot.gameLayer.maskLayer.removeChild(this);
                egret.Ticker.getInstance().unregister(LoadingCircleUI.instance.advanceTime, LoadingCircleUI.instance);
            };
            LoadingCircleUI.hide = function (key) {
                delete this._instance.loadingCommands[key];
                var index = this._instance.commandKeys.indexOf(key);
                if (-1 != index) {
                    this._instance.commandKeys.splice(index, 1);
                }
            };
            LoadingCircleUI.prototype.advanceTime = function (time) {
                //            time = time / 1000;
                this.validateLoadingPopup(time);
                if (!this.isComp)
                    return;
                //var tagRotation: number = this.loadingimg.rotation - this.rotationSpeed;
                //this.loadingimg.rotation = tagRotation;
                this.delay += 0.1;
                this.alpha = this.delay > 1 ? 1 : 0;
            };
            LoadingCircleUI.prototype.addStageHandler = function (evt) {
                egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.stageResizeHandler, this);
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStageHandler, this);
                this.stageResizeHandler(null);
                this.puker_mc.play(-1);
            };
            LoadingCircleUI.prototype.removeStageHandler = function (evt) {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStageHandler, this);
                egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.stageResizeHandler, this);
            };
            LoadingCircleUI.prototype.stageResizeHandler = function (evt) {
                this.width = AppGlobal.stageFullWidth;
                this.height = AppGlobal.stageFullHeight;
                //this.loadingimg.x = this.width >> 1;
                //this.loadingimg.y = this.height >> 1;
            };
            LoadingCircleUI.prototype.createComplete = function (event) {
                this.stageResizeHandler(null);
                this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.createComplete, this);
                this.isComp = true;
            };
            return LoadingCircleUI;
        }(eui.Component));
        LoadingCircleUI.LOADING_TIMEOUT = 15000;
        loading.LoadingCircleUI = LoadingCircleUI;
        __reflect(LoadingCircleUI.prototype, "app.loading.LoadingCircleUI");
    })(loading = app.loading || (app.loading = {}));
})(app || (app = {}));
//# sourceMappingURL=LoadingCircleUI.js.map