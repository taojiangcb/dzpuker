var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test;
(function (test) {
    var IPV6Test = (function (_super) {
        __extends(IPV6Test, _super);
        function IPV6Test() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/test/IPV6Test.exml";
            return _this;
        }
        IPV6Test.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnConnect);
        };
        IPV6Test.prototype.touchBindButtonHandler = function (tag) {
            tip.popSysCenterTip("开始连接....");
            if (tag == this.btnConnect) {
                if (this.socket == null) {
                    this.connection();
                }
                else {
                    if (this.socket.connected) {
                        this.socket.close();
                    }
                    this.connection();
                }
            }
        };
        IPV6Test.prototype.connection = function () {
            var ip_str = this.txtIp.text;
            var port_str = this.txtIp0.text;
            this.socket = new egret.WebSocket();
            this.socket.addEventListener(egret.Event.CONNECT, function (event) {
                tip.popSysCenterTip("连接成功");
            }, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                tip.popSysCenterTip("连接失败 io_error");
            }, this);
            this.socket.addEventListener(egret.Event.CLOSE, function (event) {
                tip.popSysCenterTip("连接关闭 close");
            }, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, function () {
                tip.popSysCenterTip("收到数据....");
            }, this);
            this.socket.connect(ip_str, Number(port_str));
        };
        return IPV6Test;
    }(app.base.BaseWndUIMoudleComponent));
    test.IPV6Test = IPV6Test;
    __reflect(IPV6Test.prototype, "test.IPV6Test");
})(test || (test = {}));
//# sourceMappingURL=IPV6Test.js.map