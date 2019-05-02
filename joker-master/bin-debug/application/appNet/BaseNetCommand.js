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
    /**
     *
     * @author
     *
     */
    var BaseNetCommand = (function (_super) {
        __extends(BaseNetCommand, _super);
        function BaseNetCommand() {
            return _super.apply(this, arguments) || this;
        }
        BaseNetCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            if (data instanceof appvos.MessageVO) {
                this.response(notification.getName(), data);
            }
            else {
                this.request(notification.getName(), data);
            }
        };
        BaseNetCommand.prototype.request = function (action, param) {
            if (this.showLoading) {
                app.loading.LoadingCircleUI.show(action);
            }
            var timestamp = new Date().valueOf();
            app.NetConfigs.connCache[timestamp] = this;
            if (this.vs_enabled && app.NetConfigs.VIRTUAL_SERVER_ENABLED) {
                this.sendNotification(app.NetAction.VIRTUAL_SERVER, [action, timestamp, param]);
            }
            else {
                this.sendHandler(param);
            }
        };
        BaseNetCommand.prototype.response = function (action, param) {
            if (param.errorCode == 0 || param.errorCode == null) {
                this.resultHandler(action, param.data);
            }
            else {
                this.faultHandler(param);
            }
            if (this.showLoading) {
                app.loading.LoadingCircleUI.hide(action);
            }
        };
        BaseNetCommand.prototype.sendHandler = function (data) {
            //抽象函数保持空，可减少子类忽略super引发的错误
        };
        BaseNetCommand.prototype.resultHandler = function (action, param) {
            //抽象函数保持空，可减少子类忽略super引发的错误
        };
        // parseLpPacket(action: string,data: gameabc.LPPACKET):void {
        // }
        BaseNetCommand.prototype.faultHandler = function (message) {
            console.warn("mess error :" + message.action + "errorCode" + message.errorCode);
            //            tip.popSysTip("mess error :" + message.action + "errorCode" + message.errorCode);
        };
        Object.defineProperty(BaseNetCommand.prototype, "showLoading", {
            /**         * 覆盖此方法是否显示loading         */
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return BaseNetCommand;
    }(puremvc.SimpleCommand));
    app.BaseNetCommand = BaseNetCommand;
    __reflect(BaseNetCommand.prototype, "app.BaseNetCommand");
})(app || (app = {}));
//# sourceMappingURL=BaseNetCommand.js.map