var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/7/13.
 */
var app;
(function (app) {
    var NetStateHttpCommand = (function (_super) {
        __extends(NetStateHttpCommand, _super);
        function NetStateHttpCommand() {
            var _this = _super.call(this) || this;
            /**
             * 网络请求完了之后的异步回调处理 (succeed:boolean) => void
             */
            _this.cbfun = null;
            _this.cbthisObj = null;
            return _this;
        }
        NetStateHttpCommand.prototype.execute = function (notification) {
            this.sendParamVO = notification.getBody();
            if (this.sendParamVO[NetStateHttpCommand.NET_STATE_CALL]) {
                this.cbfun = this.sendParamVO[NetStateHttpCommand.NET_STATE_CALL];
                delete this.sendParamVO[NetStateHttpCommand.NET_STATE_CALL];
            }
            if (this.sendParamVO[NetStateHttpCommand.NET_THISOBJ]) {
                this.cbthisObj = this.sendParamVO[NetStateHttpCommand.NET_THISOBJ];
                delete this.sendParamVO[NetStateHttpCommand.NET_THISOBJ];
            }
            _super.prototype.execute.call(this, notification);
        };
        NetStateHttpCommand.prototype.resultHandler = function (action, paramVO) {
            if (paramVO) {
                this.responseHandler(action, paramVO);
                if (this.cbfun) {
                    this.cbfun.apply(this.cbthisObj, [true]);
                }
            }
            else {
                if (this.cbfun) {
                    this.cbfun.apply(this.cbthisObj, [false]);
                }
            }
        };
        /**
         * 成功回调处理
         * @param action
         * @param paramVO
         */
        NetStateHttpCommand.prototype.responseHandler = function (action, paramVO) {
        };
        return NetStateHttpCommand;
    }(app.HttpCommand));
    /**
     *
     * @type {string}
     */
    NetStateHttpCommand.NET_STATE_CALL = "backFun";
    /**
     *
     * @type {string}
     */
    NetStateHttpCommand.NET_THISOBJ = "thisObj";
    app.NetStateHttpCommand = NetStateHttpCommand;
    __reflect(NetStateHttpCommand.prototype, "app.NetStateHttpCommand");
})(app || (app = {}));
//# sourceMappingURL=NetStateHttpCommand.js.map