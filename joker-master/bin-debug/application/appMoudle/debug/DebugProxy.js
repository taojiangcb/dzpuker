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
    var debug;
    (function (debug) {
        function log(str) {
            __GET_PROXY(DebugProxy).log(str);
        }
        debug.log = log;
        var DebugProxy = (function (_super) {
            __extends(DebugProxy, _super);
            function DebugProxy() {
                var _this = _super.call(this, DebugProxy.NAME) || this;
                _this.message = "";
                _this.max = 500;
                return _this;
            }
            DebugProxy.prototype.log = function (str) {
                this.message += str + "\r";
                if (this.message.length > this.max) {
                    var subStart = this.message.indexOf("\r", this.message.length - this.max);
                    this.message = this.message.substr(subStart + 1);
                }
                this.sendNotification(app.constant.AppMediatorConst.LOG_DEBUG, this.message);
            };
            return DebugProxy;
        }(app.mvc.AbsractProxy));
        DebugProxy.NAME = "DebugProxy";
        debug.DebugProxy = DebugProxy;
        __reflect(DebugProxy.prototype, "app.debug.DebugProxy");
    })(debug = app.debug || (app.debug = {}));
})(app || (app = {}));
//# sourceMappingURL=DebugProxy.js.map