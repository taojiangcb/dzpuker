var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var UserExecutor = (function () {
    function UserExecutor() {
    }
    UserExecutor.prototype.login = function () {
        egret.ExternalInterface.call("login", "");
    };
    UserExecutor.prototype.callFunction = function (functionName) {
        egret.ExternalInterface.call("callFunction", functionName);
    };
    UserExecutor.prototype.callFunctionArray = function (functionName, array) {
        var josnList = [];
        for (var i = 0; i < array.length; i++) {
            josnList.push(array[i]);
        }
        var json = JSON.parse("{}");
        json.functionName = functionName;
        json.args = josnList;
        var msg = JSON.stringify(json);
        egret.ExternalInterface.call("callFunctionWithArgs", msg);
    };
    return UserExecutor;
}());
__reflect(UserExecutor.prototype, "UserExecutor");
//# sourceMappingURL=UserExecutor.js.map