var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var antiSystem;
(function (antiSystem) {
    antiSystem.ANTI_KEY = "antiKey";
    function getProxy() {
        return __GET_PROXY(AntiProxy);
    }
    antiSystem.getProxy = getProxy;
    /**
     * 是否已经实名登记了
     * @returns {boolean}
     */
    function isRNV() {
        return user.getProxy().propertURL == "";
    }
    antiSystem.isRNV = isRNV;
    ;
    function isOpenAnti() {
        return gameabc.getConfig("ANTI_POWER") == "true";
    }
    antiSystem.isOpenAnti = isOpenAnti;
    function needAnti() {
        return !isRNV() && isOpenAnti();
    }
    antiSystem.needAnti = needAnti;
    var AntiProxy = (function (_super) {
        __extends(AntiProxy, _super);
        function AntiProxy(name, data) {
            if (data === void 0) { data = null; }
            var _this = _super.call(this, AntiProxy.NAME, data) || this;
            _this.totalRunTime = 0;
            _this.totalOutTime = 0;
            _this.lastTime = 0;
            _this.hour1Flag = false;
            _this.hour2Flag = false;
            return _this;
        }
        /**
         * 防沉迷时间校验
         */
        AntiProxy.prototype.validateAntiInit = function () {
            var json_str = gameabc.LocalSO.getItem(antiSystem.ANTI_KEY);
            if (json_str) {
                var oldAnti = JSON.parse(json_str);
                var nowTime = new Date().getTime();
                var outTime = nowTime - oldAnti.lastTime;
                oldAnti.totalOutTime += outTime;
                var outHour = oldAnti.totalOutTime / 1000 / 36000;
                if (outHour >= 5) {
                    this.initAnti();
                }
                else {
                    this.totalRunTime = oldAnti.totalRunTime;
                    this.totalOutTime = oldAnti.totalOutTime;
                    this.lastTime = oldAnti.lastTime;
                    this.hour1Flag = oldAnti.hour1Flag;
                    this.hour2Flag = oldAnti.hour2Flag;
                }
            }
            else {
                this.initAnti();
            }
        };
        /**
         * 初始化防沉迷数据
         */
        AntiProxy.prototype.initAnti = function () {
            this.totalRunTime = 0;
            this.totalOutTime = 0;
            this.lastTime = 0;
            this.hour1Flag = this.hour2Flag = false;
            this.saveTimer();
        };
        /**
         * 保存当前时间
         */
        AntiProxy.prototype.saveTimer = function () {
            var aTime = {
                totalOutTime: this.totalOutTime,
                totalRunTime: this.totalRunTime,
                lastTime: this.lastTime,
                hour1Flag: this.hour1Flag,
                hour2Flag: this.hour2Flag,
            };
            var newJson = JSON.stringify(aTime);
            gameabc.LocalSO.setItem(antiSystem.ANTI_KEY, newJson);
        };
        AntiProxy.prototype.getHour = function () {
            return this.totalRunTime / 1000 / 36000;
        };
        AntiProxy.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return AntiProxy;
    }(app.mvc.AbsractProxy));
    AntiProxy.NAME = "__AntiProxy__";
    antiSystem.AntiProxy = AntiProxy;
    __reflect(AntiProxy.prototype, "antiSystem.AntiProxy", ["antiSystem.IAntiVO"]);
})(antiSystem || (antiSystem = {}));
//# sourceMappingURL=AntiProxy.js.map