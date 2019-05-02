var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var HappyPercentComp = (function (_super) {
        __extends(HappyPercentComp, _super);
        function HappyPercentComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyPercentSkin";
            _this.touchEnabled = false;
            _this.touchChildren = false;
            return _this;
        }
        return HappyPercentComp;
    }(gameabc.UICustomComponent));
    happy.HappyPercentComp = HappyPercentComp;
    __reflect(HappyPercentComp.prototype, "happy.HappyPercentComp");
})(happy || (happy = {}));
//# sourceMappingURL=HappyPercentComp.js.map