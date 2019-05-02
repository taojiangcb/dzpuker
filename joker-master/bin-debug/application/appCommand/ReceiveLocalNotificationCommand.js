var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var localNotification;
(function (localNotification) {
    var ReceiveLocalNotificationCommand = (function (_super) {
        __extends(ReceiveLocalNotificationCommand, _super);
        function ReceiveLocalNotificationCommand() {
            return _super.call(this) || this;
        }
        ReceiveLocalNotificationCommand.prototype.execute = function (notification) {
            var userData = notification.getBody();
            switch (userData.identityKey) {
                case "test":
                    console.log("receive ls begin hander : " + userData.identityKey);
                    break;
                default:
                    break;
            }
        };
        return ReceiveLocalNotificationCommand;
    }(puremvc.SimpleCommand));
    localNotification.ReceiveLocalNotificationCommand = ReceiveLocalNotificationCommand;
    __reflect(ReceiveLocalNotificationCommand.prototype, "localNotification.ReceiveLocalNotificationCommand");
})(localNotification || (localNotification = {}));
//# sourceMappingURL=ReceiveLocalNotificationCommand.js.map