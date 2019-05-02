var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var treasure;
(function (treasure) {
    var TreasureSubUIMediator = (function (_super) {
        __extends(TreasureSubUIMediator, _super);
        function TreasureSubUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, TreasureSubUIMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(TreasureSubUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        TreasureSubUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.TREASURE_TREASURE_RECORDS,
                consts.TREASURE_DO_TREASURE,
                consts.TREASURE_FAIL
            ];
        };
        TreasureSubUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.TREASURE_TREASURE_RECORDS:
                    this.view.initList(data);
                    break;
                case consts.TREASURE_DO_TREASURE:
                    this.view.initList(data);
                    this.view.setBuying(false);
                    this.view.updateCoin();
                    break;
                case consts.TREASURE_FAIL:
                    this.view.treasureFail();
                    break;
                default:
                    break;
            }
        };
        return TreasureSubUIMediator;
    }(app.mvc.AbstractMediator));
    TreasureSubUIMediator.NAME = "TreasureSubUIMediator";
    treasure.TreasureSubUIMediator = TreasureSubUIMediator;
    __reflect(TreasureSubUIMediator.prototype, "treasure.TreasureSubUIMediator");
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureSubUIMediator.js.map