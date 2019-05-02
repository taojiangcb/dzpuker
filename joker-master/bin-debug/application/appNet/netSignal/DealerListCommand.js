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
    var DealerListCommand = (function (_super) {
        __extends(DealerListCommand, _super);
        function DealerListCommand() {
            return _super.apply(this, arguments) || this;
        }
        DealerListCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.REQ_DEALER_INFO:
                    paramVO.longValues[0] = data;
                    break;
            }
        };
        DealerListCommand.prototype.resultHandler = function (action, paramVO) {
            var consts = app.constant.AppMediatorConst;
            switch (action) {
                case app.NetAction.RESP_DEALER_INFO:
                    var data = new appvos.DealerInfoVO(paramVO.data[0]);
                    __SEND_NOTIFICATION(consts.DEALERINFO_UPDATE, data);
                    break;
                case app.NetAction.RESP_DEALER_LIST:
                    var dataArray = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.DealerInfoVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.DEALERLIST_UPDATE, dataArray);
                    break;
                case app.NetAction.RESP_DEALER_FOCUS_LIST:
                    var dataArray = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.DealerInfoVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.DEALERFOCUSLIST_UPDATE, dataArray);
                    break;
                case app.NetAction.RESP_DEALER_FOCUS:
                    tip.popSysCenterTip("关注荷官成功");
                    break;
            }
        };
        return DealerListCommand;
    }(app.MoudleCommand));
    app.DealerListCommand = DealerListCommand;
    __reflect(DealerListCommand.prototype, "app.DealerListCommand");
})(app || (app = {}));
//# sourceMappingURL=DealerListCommand.js.map