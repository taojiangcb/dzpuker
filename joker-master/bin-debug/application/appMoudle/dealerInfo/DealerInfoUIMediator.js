var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dealerInfo;
(function (dealerInfo) {
    var DealerInfoUIMediator = (function (_super) {
        __extends(DealerInfoUIMediator, _super);
        function DealerInfoUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, DealerInfoUIMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(DealerInfoUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        DealerInfoUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.UP_PLAY_INFO_DATA,
                consts.DEALERINFO_UPDATE
            ];
        };
        DealerInfoUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.UP_PLAY_INFO_DATA:
                    this.view.updatePlayInfo(data);
                    break;
                case consts.DEALERINFO_UPDATE:
                    this.view.updateDealerInfo(data);
                    break;
                default:
                    break;
            }
        };
        return DealerInfoUIMediator;
    }(app.mvc.AbstractMediator));
    DealerInfoUIMediator.NAME = "__DealerInfoUIMediator__";
    dealerInfo.DealerInfoUIMediator = DealerInfoUIMediator;
    __reflect(DealerInfoUIMediator.prototype, "dealerInfo.DealerInfoUIMediator");
})(dealerInfo || (dealerInfo = {}));
//# sourceMappingURL=DealerInfoUIMediator.js.map