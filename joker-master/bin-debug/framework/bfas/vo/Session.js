var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var Session = (function () {
        function Session(id, appEvents) {
            if (appEvents === void 0) { appEvents = null; }
            this.start = new mc2sdk.Long();
            this.status = new mc2sdk.Integer();
            this.duration = new mc2sdk.Integer();
            this.isConnected = new mc2sdk.Integer(0);
            this.id = id;
            this.start = mc2sdk.Long.fromNumber(mc2sdk.Mc2Sdk.initTime);
            if (appEvents == null)
                return;
            var len = appEvents.length;
            this.appEvents = new Array();
            for (var i = 0; i < len; ++i) {
                this.appEvents.push(appEvents[i].toArray());
            }
        }
        Session.prototype.toArray = function () {
            return [this.id, this.start, this.status, this.duration,
                this.activity, this.appEvents, this.isConnected];
        };
        return Session;
    }());
    mc2sdk.Session = Session;
    __reflect(Session.prototype, "mc2sdk.Session");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=Session.js.map