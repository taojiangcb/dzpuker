var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var head;
(function (head) {
    /**
     *
     * @author
     *
     */
    var HeadUIMoudMediator = (function (_super) {
        __extends(HeadUIMoudMediator, _super);
        function HeadUIMoudMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, HeadUIMoudMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HeadUIMoudMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        HeadUIMoudMediator.prototype.listNotificationInterests = function () {
            return [
                app.NetAction.RE_SET_HEAD_INFO,
                app.NetAction.RE_GET_HEAD_INFO
            ];
        };
        HeadUIMoudMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case app.NetAction.RE_SET_HEAD_INFO:
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("HEAD_CHANGE_TIPS"), tip.TIPS_TYPE.TIPS_CORRECT); //
                    this.view.changeEvent();
                    break;
                case app.NetAction.RE_GET_HEAD_INFO:
                    this.view.changeEvent();
                    break;
            }
        };
        return HeadUIMoudMediator;
    }(puremvc.Mediator));
    HeadUIMoudMediator.NAME = "HeadUIMoudMediator";
    head.HeadUIMoudMediator = HeadUIMoudMediator;
    __reflect(HeadUIMoudMediator.prototype, "head.HeadUIMoudMediator");
})(head || (head = {}));
//# sourceMappingURL=HeadUIMoudMediator.js.map