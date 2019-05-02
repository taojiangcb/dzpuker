var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var happy;
(function (happy) {
    var STOP_MODE;
    (function (STOP_MODE) {
        STOP_MODE[STOP_MODE["profit"] = 1] = "profit";
        STOP_MODE[STOP_MODE["loss"] = 2] = "loss";
        STOP_MODE[STOP_MODE["gameNumber"] = 3] = "gameNumber"; //局数
    })(STOP_MODE = happy.STOP_MODE || (happy.STOP_MODE = {}));
    var WIN_RATIO;
    (function (WIN_RATIO) {
        WIN_RATIO[WIN_RATIO["zero"] = 100] = "zero";
        WIN_RATIO[WIN_RATIO["forty"] = 45] = "forty";
        WIN_RATIO[WIN_RATIO["fifty"] = 55] = "fifty"; //50%
    })(WIN_RATIO = happy.WIN_RATIO || (happy.WIN_RATIO = {}));
    var BET;
    (function (BET) {
        BET[BET["min"] = 1] = "min";
        BET[BET["fold"] = 10] = "fold";
        BET[BET["folds"] = 100] = "folds"; //100倍
    })(BET = happy.BET || (happy.BET = {}));
    var HookVO = (function () {
        function HookVO() {
            this.winRatio = WIN_RATIO.zero; //胜率
            this.betMode = BET.min; //押注额倍数 1押满,10倍,100倍
            this.betValue = 0; //押注额
            this.stopProfit = false; //盈利停止
            this.stopLoose = false; //亏损停止
            this.stopCount = false; //超过盘数停止
            this.profitValue = 0; //赢利
            this.loosValue = 0; //亏损
            this.over_count = 0; //结束盘数
            this.gameCount = 0; //挂机盘数
            this.betCount = 0; //押注盘数
            this.totalProfit = 0; //统计盈亏
        }
        return HookVO;
    }());
    happy.HookVO = HookVO;
    __reflect(HookVO.prototype, "happy.HookVO");
})(happy || (happy = {}));
//# sourceMappingURL=HookVO.js.map