var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalNotificationInterface = (function () {
    function LocalNotificationInterface() {
    }
    LocalNotificationInterface.send = function (titleValue, timeValue, contentvalue, identityKeyValue) {
        var lnNotification = {
            title: titleValue,
            time: timeValue,
            content: contentvalue,
            userData: {
                identityKey: identityKeyValue //消息的key 相同key的消息会被覆盖以最后一次的为准
            }
        };
        var jsonNoti = JSON.stringify(lnNotification);
        platform.pushLocalNotice(lnNotification);
        console.log(lnNotification);
    };
    return LocalNotificationInterface;
}());
LocalNotificationInterface.LOCALNOTI_SIGN = "LOCAL_SIGN";
LocalNotificationInterface.LOCALNOTI_CALLBACK = "LOCALNOTI_CALLBACK";
LocalNotificationInterface.LOCALNOTI_GOLDTREE = "LOCALNOTI_GOLDTREE";
__reflect(LocalNotificationInterface.prototype, "LocalNotificationInterface");
//# sourceMappingURL=LocalNotificationInterface.js.map