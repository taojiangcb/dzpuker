var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    var RoleType = (function () {
        function RoleType() {
        }
        RoleType.create = function (type) {
            if (mc2sdk.Mc2Sdk.soData.roleCache == null) {
                mc2sdk.Mc2Sdk.soData.roleCache = {};
            }
            return new RoleType();
        };
        RoleType.prototype.send = function (appEvents) {
            var cache = this.getCache();
            switch (this.type) {
                case RoleType.BASED_ON_COUNT:
                    if (cache == null) {
                        if (appEvents.length < this.time) {
                            this.pushCache(appEvents);
                        }
                        else {
                            new mc2sdk.EventPackageSender(appEvents);
                        }
                    }
                    else if (cache.length + appEvents.length < this.time) {
                        this.pushCache(appEvents);
                    }
                    else {
                        this.sendCache(appEvents);
                    }
                    break;
                case RoleType.BASED_ON_TIME:
                    if (cache == null || cache.length == 0) {
                        this.pushCache(appEvents);
                    }
                    else if (appEvents[0].startTime.toNumber() - cache[0].startTime.toNumber() < this.time) {
                        this.pushCache(appEvents);
                    }
                    else {
                        this.sendCache(appEvents);
                    }
                    break;
                default:
                    new mc2sdk.EventPackageSender(appEvents);
            }
        };
        RoleType.prototype.checkCache = function () {
            var cache = this.getCache();
            if (this.type == RoleType.BASED_ON_TIME) {
                if (cache != null && cache.length > 0) {
                    if (new Date().getTime() - cache[0].startTime.toNumber() > this.time) {
                        this.sendCache();
                    }
                }
            }
        };
        RoleType.prototype.getCache = function () {
            return mc2sdk.Mc2Sdk.soData.roleCache[this.id];
        };
        RoleType.prototype.pushCache = function (appEvents) {
            var cache = this.getCache();
            if (cache == null)
                mc2sdk.Mc2Sdk.soData.roleCache[this.id] = appEvents;
            else
                mc2sdk.Mc2Sdk.soData.roleCache[this.id] = cache.concat(appEvents);
        };
        RoleType.prototype.sendCache = function (appEvents) {
            if (appEvents === void 0) { appEvents = null; }
            new mc2sdk.EventPackageSender(appEvents == null ? this.getCache() : this.getCache().concat(appEvents));
            mc2sdk.Mc2Sdk.soData.roleCache[this.id] = null;
        };
        return RoleType;
    }());
    RoleType.BASED_ON_COUNT = 'basedOnCount';
    RoleType.BASED_ON_TIME = 'basedOnTime';
    mc2sdk.RoleType = RoleType;
    __reflect(RoleType.prototype, "mc2sdk.RoleType");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=RoleType.js.map