var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var EventPackage = (function () {
        function EventPackage(appId, groupId, chanel, osType, message) {
            if (message === void 0) { message = null; }
            this.deviceId = mc2sdk.Mc2Sdk.deviceId;
            this.developerAppKey = appId;
            this.appProfile = new mc2sdk.AppProfile(groupId, chanel, osType).toArray();
            this.deviceProfile = new mc2sdk.DeviceProfile().toArray();
            this.message = [];
            this.activeApps = [];
            if (message == null)
                return;
            var len = message.length;
            for (var i = 0; i < len; ++i) {
                this.message.push(message[i].toArray());
            }
        }
        EventPackage.prototype.toArray = function () {
            return [this.deviceId, this.developerAppKey, this.appProfile,
                this.deviceProfile, this.message, this.activeApps];
        };
        return EventPackage;
    }());
    mc2sdk.EventPackage = EventPackage;
    __reflect(EventPackage.prototype, "mc2sdk.EventPackage");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=EventPackage.js.map