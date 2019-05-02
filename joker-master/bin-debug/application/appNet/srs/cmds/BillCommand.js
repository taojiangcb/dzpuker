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
    var BillCommand = (function (_super) {
        __extends(BillCommand, _super);
        function BillCommand() {
            return _super.apply(this, arguments) || this;
        }
        BillCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.REQ_BILL_GET:
                    break;
                default:
                    break;
            }
        };
        BillCommand.prototype.resultHandler = function (action, paramVO) {
            switch (action) {
                case app.NetAction.RESP_BILL_GET:
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_BILL, paramVO);
                    break;
                default:
                    break;
            }
        };
        return BillCommand;
    }(app.MoudleCommand));
    app.BillCommand = BillCommand;
    __reflect(BillCommand.prototype, "app.BillCommand");
})(app || (app = {}));
//# sourceMappingURL=BillCommand.js.map