var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameabc;
(function (gameabc) {
    function toArray(argument) {
        var args = [];
        for (var i = 0; i < argument.length; i++) {
            args.push(argument[i]);
        }
        return args;
    }
    var GTLog = (function () {
        function GTLog() {
            this.time = 0;
            this.message = "";
        }
        return GTLog;
    }());
    gameabc.GTLog = GTLog;
    __reflect(GTLog.prototype, "gameabc.GTLog");
    // egret.log = function () {
    // 	console.log.apply(console,toArray(arguments))
    // };
})(gameabc || (gameabc = {}));
//# sourceMappingURL=GTLog.js.map