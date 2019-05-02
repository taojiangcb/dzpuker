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
    var TreasureUIMediator = (function (_super) {
        __extends(TreasureUIMediator, _super);
        function TreasureUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, TreasureUIMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(TreasureUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        TreasureUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.TREASURE_GET_TREASURES,
                consts.TREASURE_OPEN_TREASURES,
                consts.TREASURE_GET_MY_ALL_TREASURES,
                consts.TREASURE_GET_MY_NOW_TREASURES,
                consts.TREASURE_MY_GET_REWARD_RECORD,
                consts.TREASURE_MY_GET_REWARD,
                consts.UPDATE_COIN,
                consts.TREASURE_REFRESH_LIST
            ];
        };
        TreasureUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.TREASURE_GET_TREASURES:
                    this.view.initG1l(data);
                    break;
                case consts.TREASURE_OPEN_TREASURES:
                    this.view.initG2l(data);
                    break;
                case consts.TREASURE_GET_MY_ALL_TREASURES:
                    this.view.initG3l1(data);
                    break;
                case consts.TREASURE_GET_MY_NOW_TREASURES:
                    this.view.initG3l2(data);
                    break;
                case consts.TREASURE_MY_GET_REWARD_RECORD:
                    this.view.initG3l3(data);
                    break;
                case consts.TREASURE_MY_GET_REWARD:
                    this.view.getReward(data);
                    break;
                case consts.UPDATE_COIN:
                    this.view.updateCoin();
                    break;
                case consts.TREASURE_REFRESH_LIST:
                    this.view.refreshList();
                    break;
                default:
                    break;
            }
        };
        return TreasureUIMediator;
    }(app.mvc.AbstractMediator));
    TreasureUIMediator.NAME = "TreasureUIMediator";
    treasure.TreasureUIMediator = TreasureUIMediator;
    __reflect(TreasureUIMediator.prototype, "treasure.TreasureUIMediator");
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureUIMediator.js.map