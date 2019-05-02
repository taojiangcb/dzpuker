var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var AppProfile = (function () {
        function AppProfile(groupId, chanel, osType) {
            if (osType === void 0) { osType = null; }
            this.isCracked = false;
            this.installationTime = new mc2sdk.Long();
            this.purchaseTime = new mc2sdk.Long();
            this.appStroreId = new mc2sdk.Long();
            // this.appPackageName = NativeApplication.nativeApplication.applicationID;
            this.appVersionCode = mc2sdk.Mc2Sdk.version;
            this.appVersionName = mc2sdk.Mc2Sdk.versionLabel == '' ? mc2sdk.Mc2Sdk.version : mc2sdk.Mc2Sdk.versionLabel;
            this.startTime = mc2sdk.Long.fromNumber(mc2sdk.Mc2Sdk.initTime);
            this.sdkVersion = mc2sdk.sdkVersion;
            this.parenerId = chanel;
            this.groupId = groupId;
            this.osType = String(osType == null ? 4 /* AIR */ : osType);
        }
        AppProfile.prototype.toArray = function () {
            return [this.appPackageName, this.appVersionName, this.appVersionCode,
                this.startTime, this.sdkVersion, this.parenerId, this.isCracked,
                this.installationTime, this.purchaseTime, this.appStroreId, this.groupId, this.osType];
        };
        return AppProfile;
    }());
    mc2sdk.AppProfile = AppProfile;
    __reflect(AppProfile.prototype, "mc2sdk.AppProfile");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=AppProfile.js.map