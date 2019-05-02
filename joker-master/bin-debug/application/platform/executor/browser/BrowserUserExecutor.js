var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var BrowserUserExecutor = (function () {
    function BrowserUserExecutor() {
    }
    BrowserUserExecutor.prototype.login = function () {
        alert("login");
    };
    BrowserUserExecutor.prototype.callFunctionArray = function (functionName, array) {
        var josnList = [];
        for (var i = 0; i < array.length; i++) {
            josnList.push(array[i]);
        }
        var json = JSON.parse("{}");
        json.functionName = functionName;
        json.args = josnList;
        var msg = JSON.stringify(json);
        alert(msg);
    };
    return BrowserUserExecutor;
}());
__reflect(BrowserUserExecutor.prototype, "BrowserUserExecutor");
//# sourceMappingURL=BrowserUserExecutor.js.map