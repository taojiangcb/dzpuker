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
    var WaitComp = (function (_super) {
        __extends(WaitComp, _super);
        function WaitComp() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.skinName = "WaitCompSkin";
            return _this;
        }
        /*该模块被创建完成后的回调函数*/
        WaitComp.prototype.createComplete = function (event) {
            this.initialized = true;
            this.allpoint = [this.point0, this.point1, this.point2, this.point3, this.point4];
        };
        WaitComp.prototype.showBank = function (value) {
            if (value) {
                this.mess.source = "img_word_happy_qddsz1_png";
            }
            else {
                this.mess.source = "img_word_happy_qddqtwj_png";
            }
            this.visible = true;
            egret.clearInterval(this.timeid);
            this.timeid = egret.setInterval(this.showPoint, this, 1000);
        };
        WaitComp.prototype.showPoint = function () {
            for (var i = 0; i < 5; i++) {
                this.allpoint[i].visible = i <= this.index;
            }
            this.index = (this.index + 1) % 5;
        };
        WaitComp.prototype.hide = function () {
            this.visible = false;
            egret.clearInterval(this.timeid);
        };
        return WaitComp;
    }(gameabc.UICustomComponent));
    happy.WaitComp = WaitComp;
    __reflect(WaitComp.prototype, "happy.WaitComp");
})(happy || (happy = {}));
//# sourceMappingURL=WaitComp.js.map