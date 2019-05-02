var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var item;
(function (item) {
    /**
     *
     * @author
     *
     */
    var PropUIMoudleMediator = (function (_super) {
        __extends(PropUIMoudleMediator, _super);
        function PropUIMoudleMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, PropUIMoudleMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(PropUIMoudleMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        PropUIMoudleMediator.prototype.listNotificationInterests = function () {
            return [
                app.NetAction.RE_GET_PROP_ATTRS
            ];
        };
        PropUIMoudleMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.NetAction.RE_GET_PROP_ATTRS:
                    this.view.showEvent();
                    break;
            }
        };
        return PropUIMoudleMediator;
    }(puremvc.Mediator));
    PropUIMoudleMediator.NAME = "PropUIMoudleMediator";
    item.PropUIMoudleMediator = PropUIMoudleMediator;
    __reflect(PropUIMoudleMediator.prototype, "item.PropUIMoudleMediator");
})(item || (item = {}));
//# sourceMappingURL=PropUIMoudleMediator.js.map