var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mc2sdk;
(function (mc2sdk) {
    function init() {
        Mc2Sdk.init(String(AppConst.OUT_SVR.gameId), AppConst.GROUP_ID, platform.DEVICE_ID, platform.CHANNE_ID, 7 /* EGRET_H5 */);
    }
    mc2sdk.init = init;
    function event(evtId, parameters) {
        if (parameters === void 0) { parameters = null; }
        Mc2Sdk.event(evtId, "", { d: parameters });
    }
    mc2sdk.event = event;
    /**
     *  把日志推给魔方，请控制变量名长度，请控制日志数量
     *  变量名，变量值，变量名，变量值，变量名，变量值以此类推
     *  在魔方显示类似形式如： a=3,b=44,t=55
     */
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var len = args.length;
        var value = args[0] + "=" + args[1];
        for (var i = 2; i < len; i += 2) {
            value += "," + args[i] + "=" + args[i + 1];
        }
        Mc2Sdk.event(9999998 /* LOG */, value);
    }
    mc2sdk.log = log;
    mc2sdk.sdkVersion = '1.0.0';
    mc2sdk.requestUrl = 'http://bfas.bianfeng.com/bfrd/msgpack?from=ts';
    var Mc2Sdk = (function () {
        function Mc2Sdk() {
        }
        Mc2Sdk.createMsgPack = function (data) {
            if (Mc2Sdk.msgPack == null) {
                Mc2Sdk.log('请先使用Mc2Sdk.init初始化SDK');
                return null;
            }
            return Mc2Sdk.msgPack.write(data);
        };
        Object.defineProperty(Mc2Sdk, "soData", {
            get: function () {
                // return SharedObject.getLocal(NativeApplication.nativeApplication.applicationID+'.mc2Data').data;
                return Mc2Sdk.localCache;
            },
            enumerable: true,
            configurable: true
        });
        Mc2Sdk.init = function (appId, groupId, deviceId, chanel, deviceType) {
            if (Mc2Sdk.msgPack == null) {
                egret.registerClass(mc2sdk.Long, "mc2sdk.Long");
                egret.registerClass(mc2sdk.AppEvent, "mc2sdk.AppEvent");
                Mc2Sdk.msgPack = new org.msgpack.MsgPack();
                Mc2Sdk.msgPack.factory.assign(mc2sdk.LongWorker, "mc2sdk.Long");
                Mc2Sdk.msgPack.factory.assign(mc2sdk.IntegerWorker, "mc2sdk.Integer");
            }
            Mc2Sdk.initTime = new Date().getTime() - egret.getTimer();
            Mc2Sdk.appId = appId;
            Mc2Sdk.groupId = groupId;
            Mc2Sdk.deviceId = deviceId;
            Mc2Sdk.chanel = chanel;
            Mc2Sdk.deviceType = deviceType;
            // var appXml:XML = NativeApplication.nativeApplication.applicationDescriptor;
            // var ns:Namespace = appXml.namespace();
            Mc2Sdk.version = AppConst.VERSION_ID.toString();
            Mc2Sdk.versionLabel = AppConst.VERSION_STR;
            Mc2Sdk.os = egret.Capabilities.os;
        };
        Mc2Sdk.event = function (id, label, parameters) {
            if (label === void 0) { label = ''; }
            if (parameters === void 0) { parameters = null; }
            var subIds = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                subIds[_i - 3] = arguments[_i];
            }
            if (Mc2Sdk.msgPack == null)
                return;
            if (id >= 59001 && id <= 59999 && Mc2Sdk.onceCache[id - 59000])
                return;
            else
                Mc2Sdk.onceCache[id - 59000] = true;
            if (!Mc2Sdk.soData.activate)
                new mc2sdk.HttpActivate();
            var appEvents = [new mc2sdk.AppEvent(String(id), label, parameters)];
            for (var i = 0, len = subIds.length; i < len; ++i) {
                appEvents.push(new mc2sdk.AppEvent(String(subIds[i])));
            }
            var role = this.getRole(id);
            if (role != null)
                role.send(appEvents);
            else
                new mc2sdk.EventPackageSender(appEvents);
        };
        Mc2Sdk.setRole = function (id, cacheType, time) {
            if (Mc2Sdk.roleDict == null)
                Mc2Sdk.roleDict = {};
            var roleType = Mc2Sdk.roleDict[id];
            if (roleType == null)
                roleType = mc2sdk.RoleType.create(cacheType);
            roleType.id = id;
            roleType.type = cacheType;
            roleType.time = time;
            Mc2Sdk.roleDict[id] = roleType;
            roleType.checkCache();
        };
        Mc2Sdk.getRole = function (id) {
            return Mc2Sdk.roleDict == null ? null : Mc2Sdk.roleDict[id];
        };
        Mc2Sdk.log = function (text) {
            // console.log('[边锋数据中心] '+ text);
        };
        return Mc2Sdk;
    }());
    Mc2Sdk.chanel = '';
    Mc2Sdk.appId = '';
    Mc2Sdk.groupId = '';
    Mc2Sdk.deviceId = '';
    Mc2Sdk.initTime = 0;
    Mc2Sdk.deviceType = 0;
    Mc2Sdk.userId = '';
    Mc2Sdk.os = '';
    Mc2Sdk.version = '';
    Mc2Sdk.versionLabel = '';
    Mc2Sdk.localCache = {};
    /** 客户端当前生命周期内只发一次的消息号缓存 */
    Mc2Sdk.onceCache = [];
    mc2sdk.Mc2Sdk = Mc2Sdk;
    __reflect(Mc2Sdk.prototype, "mc2sdk.Mc2Sdk");
})(mc2sdk || (mc2sdk = {}));
//# sourceMappingURL=Mc2Sdk.js.map