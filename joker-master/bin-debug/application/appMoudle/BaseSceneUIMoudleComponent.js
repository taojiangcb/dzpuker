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
    var base;
    (function (base) {
        /**
         * 窗口模块基础，自动剧中场景显示会有缓动画效果
         * 配合皮肤SceneSkin一起使用方可奏效
         * @author
         */
        var BaseSceneUIMoudleComponent = (function (_super) {
            __extends(BaseSceneUIMoudleComponent, _super);
            function BaseSceneUIMoudleComponent() {
                var _this = _super.call(this) || this;
                _this.rectNumClicks = 0;
                _this.rectClickFirstTime = 0;
                _this.showClose = true;
                return _this;
            }
            BaseSceneUIMoudleComponent.prototype.createComplete = function (event) {
                _super.prototype.createComplete.call(this, event);
                if (this.sceneBase != null) {
                    this.titleLabel = this.sceneBase["titleLabel"];
                    if (this.mTitleText != null && this.titleLabel != null) {
                        this.titleLabel.text = this.mTitleText;
                    }
                    this.backButton = this.sceneBase["backButton"];
                    this.backButton.visible = this.showClose;
                    this.bindButton(this.backButton);
                }
                else if (this.backButton != null) {
                    // 如果皮肤中定义了backButton
                    this.bindButton(this.backButton);
                }
            };
            Object.defineProperty(BaseSceneUIMoudleComponent.prototype, "titleText", {
                set: function (value) {
                    this.mTitleText = value;
                    if (this.titleLabel != null) {
                        this.titleLabel.text = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            BaseSceneUIMoudleComponent.prototype.touchHandler = function (event) {
                var tag = event.currentTarget;
                if (tag == this.backButton)
                    this.close();
                if (tag == this.rect) {
                    if (__IS_MOUDLE_OPEN(AppReg.APP_DEBUG)) {
                        __CLOSE_MOUDLE(AppReg.APP_DEBUG);
                    }
                    else {
                        if (egret.getTimer() - this.rectClickFirstTime > 3000 || this.rectNumClicks > 10) {
                            this.rectClickFirstTime = egret.getTimer();
                            this.rectNumClicks = 1;
                            return;
                        }
                        if (++this.rectNumClicks == 10) {
                            app.debug.log("");
                            __OPEN_MOUDLE(AppReg.APP_DEBUG, null, null, null, AppRoot.gameLayer.effectLayer);
                        }
                    }
                    return;
                }
                this.touchBindButtonHandler(tag);
            };
            BaseSceneUIMoudleComponent.prototype.addDebugTouch = function () {
                this.rect = new eui.Rect(50, 100, 0);
                this.rect.alpha = 0;
                this.rect.verticalCenter = 0;
                this.addChild(this.rect);
                this.bindButton(this.rect);
            };
            BaseSceneUIMoudleComponent.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
                if (this.backButton != null)
                    this.unbindButton(this.backButton);
            };
            Object.defineProperty(BaseSceneUIMoudleComponent.prototype, "featherSpace", {
                get: function () {
                    return AppRoot.gameLayer.panelLayer;
                },
                enumerable: true,
                configurable: true
            });
            return BaseSceneUIMoudleComponent;
        }(base.BaseUIMoudleComponent));
        base.BaseSceneUIMoudleComponent = BaseSceneUIMoudleComponent;
        __reflect(BaseSceneUIMoudleComponent.prototype, "app.base.BaseSceneUIMoudleComponent");
    })(base = app.base || (app.base = {}));
})(app || (app = {}));
//# sourceMappingURL=BaseSceneUIMoudleComponent.js.map