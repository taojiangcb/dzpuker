var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/28.
 */
var svrDebug;
(function (svrDebug) {
    var DebugServer = (function (_super) {
        __extends(DebugServer, _super);
        function DebugServer(ip, port) {
            if (ip === void 0) { ip = "127.0.0.1"; }
            if (port === void 0) { port = 5000; }
            return _super.call(this, new cy.SrsIp(0, ip, port, 0, 0, "", "")) || this;
        }
        DebugServer.prototype.connectHandler = function (event) {
            console.log(this.connectSrs.ip + ":" + this.connectSrs.port + " socket connect succeed!");
            this.numOutputBytes = 0;
            this.numInputBytes = 0;
            __SEND_NOTIFICATION(app.NetAction.DEBUG_CMDT_CONNECT);
            //this.heartIntervalId = egret.setInterval(__SEND_NOTIFICATION,this,30000,app.NetAction.CMDT_CHECKACT);
        };
        return DebugServer;
    }(cy.SrsServer));
    svrDebug.DebugServer = DebugServer;
    __reflect(DebugServer.prototype, "svrDebug.DebugServer");
})(svrDebug || (svrDebug = {}));
//# sourceMappingURL=DebugServer.js.map