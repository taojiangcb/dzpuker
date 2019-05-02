var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var DeviceProfile = (function () {
        function DeviceProfile() {
            /**		 * SDK Version, e.g: 7,8,9,11		 */
            this.osSdkVersion = '';
            /**		 * Cpu		 */
            this.cpuABI = '';
            /**		 * 国家		 */
            this.country = "";
            /**		 * 运营	 */
            this.carrier = "";
            /**		 * 语言		 */
            this.language = "";
            /**		 * 时区		 */
            this.timezone = new mc2sdk.Integer();
            /**		 * 手机操作系统版本		 */
            this.osVersion = '';
            /*		* 是否是Wifi连接, 0表示是Wifi连接�?表示2G/3G		*/
            this.channel = new mc2sdk.Integer();
            // 在不是Wifi连接时有意义 2g or 3g
            this.netType = '';
            this.isJailBroken = false;
            this.simOperator = '';
            this.networkOperator = '';
            this.hostName = "";
            this.deviceName = "";
            this.kernBootTime = new mc2sdk.Long();
            this.advertis = ""; //ios add,android dummy for msg pack 
            this.wifiBSSID = "";
            this.mobileNetType = "";
            this.cellID = new mc2sdk.Integer();
            this.lac = new mc2sdk.Integer();
            this.mobileModel = mc2sdk.Mc2Sdk.os;
        }
        DeviceProfile.prototype.toArray = function () {
            return [this.mobileModel, this.osSdkVersion, this.locationInfo, this.cpuABI,
                this.pixelMetric, this.country, this.carrier, this.language, this.timezone,
                this.osVersion, this.channel, this.netType, this.isJailBroken, this.simOperator,
                this.networkOperator, this.hostName, this.deviceName, this.kernBootTime,
                this.advertis, this.wifiBSSID, this.mobileNetType, this.cellID, this.lac];
        };
        return DeviceProfile;
    }());
    mc2sdk.DeviceProfile = DeviceProfile;
    __reflect(DeviceProfile.prototype, "mc2sdk.DeviceProfile");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=DeviceProfile.js.map