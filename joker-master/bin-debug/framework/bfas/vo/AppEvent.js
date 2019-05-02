var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var AppEvent = (function () {
        function AppEvent(id, label, parameters) {
            if (id === void 0) { id = ""; }
            if (label === void 0) { label = ""; }
            if (parameters === void 0) { parameters = null; }
            this.id = id;
            this.label = label;
            this.startTime = mc2sdk.Long.fromNumber(new Date().getTime());
            this.parameters = parameters;
        }
        AppEvent.prototype.toArray = function () {
            return [this.id, this.label, new mc2sdk.Integer(1), this.startTime, this.parameters];
        };
        return AppEvent;
    }());
    mc2sdk.AppEvent = AppEvent;
    __reflect(AppEvent.prototype, "mc2sdk.AppEvent");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=AppEvent.js.map