var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var record;
(function (record) {
    var RecordAnalysisMediator = (function (_super) {
        __extends(RecordAnalysisMediator, _super);
        function RecordAnalysisMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, RecordAnalysisMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(RecordAnalysisMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        // 监听notification
        RecordAnalysisMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.UP_PLAY_INFO_DATA,
            ];
        };
        // 处理notification
        RecordAnalysisMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.UP_PLAY_INFO_DATA:
                    this.view.setDescritpion();
                    break;
            }
        };
        return RecordAnalysisMediator;
    }(puremvc.Mediator));
    RecordAnalysisMediator.NAME = "RecordAnalysisMediator";
    record.RecordAnalysisMediator = RecordAnalysisMediator;
    __reflect(RecordAnalysisMediator.prototype, "record.RecordAnalysisMediator");
})(record || (record = {}));
//# sourceMappingURL=RecordAnalysisMediator.js.map