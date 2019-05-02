var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var app;
(function (app) {
    var TimerStepParam = (function () {
        function TimerStepParam() {
            this.cacheTime = 0; //缓存时间(使用本地时间，机制内部使用)
            this.currTime = 0; //即时时间(使用本地时间)
            this.startTime = 0; //开始时间(使用本地时间)
            this.overTime = 0; //结束时间(使用本地时间)
            // id:string; //id标志，搜索用，暂未实现
        }
        return TimerStepParam;
    }());
    app.TimerStepParam = TimerStepParam;
    __reflect(TimerStepParam.prototype, "app.TimerStepParam");
})(app || (app = {}));
//# sourceMappingURL=TimerStepParam.js.map