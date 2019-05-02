var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uicomps;
(function (uicomps) {
    var DragInMediator = (function (_super) {
        __extends(DragInMediator, _super);
        function DragInMediator(view) {
            return _super.call(this, DragInMediator.NAME, view) || this;
        }
        DragInMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.UP_USER_INFO_DATA
            ];
        };
        DragInMediator.prototype.handleNotification = function (notification) {
            var name = notification.getName();
            switch (name) {
                case app.constant.AppMediatorConst.UP_USER_INFO_DATA:
                    if (this.viewComponent) {
                        this.viewComponent.updateTotalSilver();
                    }
                    break;
            }
        };
        return DragInMediator;
    }(app.mvc.AbstractMediator));
    DragInMediator.NAME = "__DRAG_IN_MEDIATOR__";
    uicomps.DragInMediator = DragInMediator;
    __reflect(DragInMediator.prototype, "uicomps.DragInMediator");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=DragInMediator.js.map