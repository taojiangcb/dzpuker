var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**

 */
var record;
(function (record) {
    var PlayRecordMediator = (function (_super) {
        __extends(PlayRecordMediator, _super);
        function PlayRecordMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, PlayRecordMediator.NAME, viewComponent) || this;
        }
        PlayRecordMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.UP_RECORD_DATA,
            ];
        };
        PlayRecordMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.UP_RECORD_DATA:
                    if (this.uiModule) {
                        this.uiModule.showList(record.getProxy().indexTab);
                    }
                    break;
            }
        };
        // updateDisconverTables(res:room.TableVO[]):void {
        PlayRecordMediator.prototype.updateDisconverTables = function (res) {
            if (this.uiModule) {
            }
        };
        Object.defineProperty(PlayRecordMediator.prototype, "uiModule", {
            get: function () {
                return __GET_MOUDLE_COMP(AppReg.APP_PLAY_RECORD);
            },
            enumerable: true,
            configurable: true
        });
        return PlayRecordMediator;
    }(app.mvc.AbstractMediator));
    PlayRecordMediator.NAME = "PlayRecordMediator";
    record.PlayRecordMediator = PlayRecordMediator;
    __reflect(PlayRecordMediator.prototype, "record.PlayRecordMediator");
})(record || (record = {}));
//# sourceMappingURL=PlayRecordMediator.js.map