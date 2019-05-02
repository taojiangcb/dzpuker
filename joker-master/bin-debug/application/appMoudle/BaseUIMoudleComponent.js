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
         * 全屏模块基础
         * UIMoudleComponent 基类
         * @author
         *
         */
        var BaseUIMoudleComponent = (function (_super) {
            __extends(BaseUIMoudleComponent, _super);
            function BaseUIMoudleComponent() {
                return _super.call(this) || this;
            }
            BaseUIMoudleComponent.prototype.sendNotification = function (name, body, type) {
                __SEND_NOTIFICATION(name, body, type);
            };
            BaseUIMoudleComponent.prototype.registerMediator = function (cls) {
                this.mediatorCls = cls;
                __REGISTER_MEDIATOR(cls, this);
            };
            BaseUIMoudleComponent.prototype.unregisterMediator = function () {
                if (this.mediatorCls) {
                    __REMOVE_MEDIATOR(this.mediatorCls);
                }
            };
            /**关闭窗口*/
            BaseUIMoudleComponent.prototype.close = function (evt) {
                if (evt === void 0) { evt = null; }
                __CLOSE_MOUDLE_UI(this);
            };
            BaseUIMoudleComponent.prototype.dispose = function () {
                this.unregisterMediator();
                _super.prototype.dispose.call(this);
            };
            return BaseUIMoudleComponent;
        }(gameabc.UIMoudleComponent));
        base.BaseUIMoudleComponent = BaseUIMoudleComponent;
        __reflect(BaseUIMoudleComponent.prototype, "app.base.BaseUIMoudleComponent");
    })(base = app.base || (app.base = {}));
})(app || (app = {}));
//# sourceMappingURL=BaseUIMoudleComponent.js.map