var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var charmWheel;
(function (charmWheel) {
    var CharmWheelUIMediator = (function (_super) {
        __extends(CharmWheelUIMediator, _super);
        function CharmWheelUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, CharmWheelUIMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(CharmWheelUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        CharmWheelUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.CHARM_WHEEL_START,
                consts.UP_PLAY_INFO_DATA,
                consts.CHARM_WHEEL_MY_RECORD,
                consts.CHARM_WHEEL_OTHER_RECORD
            ];
        };
        CharmWheelUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case consts.CHARM_WHEEL_START:
                    this.view.start(data);
                    break;
                case consts.UP_PLAY_INFO_DATA:
                    this.view.setCharmValue();
                    break;
                case consts.CHARM_WHEEL_MY_RECORD:
                    this.view.refreshMyRecord(data);
                    break;
                case consts.CHARM_WHEEL_OTHER_RECORD:
                    this.view.refreshAllRecord(data);
                    break;
                default:
                    break;
            }
        };
        return CharmWheelUIMediator;
    }(app.mvc.AbstractMediator));
    CharmWheelUIMediator.NAME = "CharmWheelUIMediator";
    charmWheel.CharmWheelUIMediator = CharmWheelUIMediator;
    __reflect(CharmWheelUIMediator.prototype, "charmWheel.CharmWheelUIMediator");
})(charmWheel || (charmWheel = {}));
//# sourceMappingURL=CharmWheelUIMediator.js.map