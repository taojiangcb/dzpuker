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
    var RecordMediator = (function (_super) {
        __extends(RecordMediator, _super);
        function RecordMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, RecordMediator.NAME, viewComponent) || this;
        }
        // 监听notification
        RecordMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.GET_RECORD_TABLES,
                app.constant.AppMediatorConst.UPDATE_RECORD_TABLES,
                app.constant.AppMediatorConst.UP_PLAY_INFO_DATA
            ];
        };
        // 处理notification
        RecordMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.GET_RECORD_TABLES:
                    this.initDisconverTables();
                    break;
                case app.constant.AppMediatorConst.UPDATE_RECORD_TABLES:
                    this.updateDisconverTables(notification.getBody());
                    break;
                case app.constant.AppMediatorConst.UP_PLAY_INFO_DATA:
                    this.uiModule.updateDescData(); // 刷新ui中行为描述数据
                    break;
            }
        };
        RecordMediator.prototype.initDisconverTables = function () {
            if (this.uiModule) {
            }
        };
        // updateDisconverTables(res:room.TableVO[]):void {
        RecordMediator.prototype.updateDisconverTables = function (res) {
            if (this.uiModule) {
            }
        };
        Object.defineProperty(RecordMediator.prototype, "uiModule", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        return RecordMediator;
    }(app.mvc.AbstractMediator));
    RecordMediator.NAME = "RecordMediator";
    record.RecordMediator = RecordMediator;
    __reflect(RecordMediator.prototype, "record.RecordMediator");
})(record || (record = {}));
//# sourceMappingURL=RecordMediator.js.map