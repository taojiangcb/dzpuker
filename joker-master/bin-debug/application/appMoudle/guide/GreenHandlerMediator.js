var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guide;
(function (guide) {
    var GreenHandlerMediator = (function (_super) {
        __extends(GreenHandlerMediator, _super);
        function GreenHandlerMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            return _super.call(this, GreenHandlerMediator.NAME, uicomponent) || this;
        }
        Object.defineProperty(GreenHandlerMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        GreenHandlerMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            return [
                mission.MissionMediator.ADD_MISSION
            ];
        };
        GreenHandlerMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case mission.MissionMediator.ADD_MISSION:
                    this.view.updateGoldTreeMission();
                    break;
            }
        };
        return GreenHandlerMediator;
    }(app.mvc.AbstractMediator));
    GreenHandlerMediator.NAME = "__GreenHandlerMediator__";
    guide.GreenHandlerMediator = GreenHandlerMediator;
    __reflect(GreenHandlerMediator.prototype, "guide.GreenHandlerMediator");
})(guide || (guide = {}));
//# sourceMappingURL=GreenHandlerMediator.js.map