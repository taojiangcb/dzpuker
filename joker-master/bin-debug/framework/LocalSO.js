var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/5/4.
 */
var gameabc;
(function (gameabc) {
    /**
     * 本地数据读写，这里加了一个前缀域来分区各个平台和账号的本地数据
     */
    var LocalSO = (function () {
        function LocalSO() {
        }
        LocalSO.setAllItem = function (key, value) {
            return egret.localStorage.setItem(key, value);
        };
        LocalSO.getAllItem = function (key) {
            return egret.localStorage.getItem(key);
        };
        LocalSO.setItem = function (key, value) {
            return egret.localStorage.setItem(this.PREFIX + this.USERID + key, value);
        };
        LocalSO.getItem = function (key) {
            return egret.localStorage.getItem(this.PREFIX + this.USERID + key);
        };
        LocalSO.removeItem = function (key) {
            egret.localStorage.removeItem(this.PREFIX + this.USERID + key);
        };
        LocalSO.clear = function () {
            egret.localStorage.clear();
        };
        return LocalSO;
    }());
    //当前渠道号
    LocalSO.PREFIX = "";
    LocalSO.USERID = "";
    gameabc.LocalSO = LocalSO;
    __reflect(LocalSO.prototype, "gameabc.LocalSO");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=LocalSO.js.map