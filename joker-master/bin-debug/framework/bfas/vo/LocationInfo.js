var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var LocationInfo = (function () {
        function LocationInfo() {
            this.lng = 0.0;
            this.lat = 0.0;
        }
        LocationInfo.prototype.LocationInfo = function () {
        };
        LocationInfo.prototype.toArray = function () {
            return [this.lng, this.lat];
        };
        return LocationInfo;
    }());
    mc2sdk.LocationInfo = LocationInfo;
    __reflect(LocationInfo.prototype, "mc2sdk.LocationInfo");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=LocationInfo.js.map