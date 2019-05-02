var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guichu;
(function (guichu) {
    var GuiChuTestComp = (function (_super) {
        __extends(GuiChuTestComp, _super);
        function GuiChuTestComp() {
            var _this = _super.call(this) || this;
            _this.count = 0;
            // h1: number = 0;
            // h2: number = 0;
            // h3: number = 0;
            // h4: number = 0;
            // h5: number = 0;
            // h6: number = 0;
            // h7: number = 0;
            _this.hs = [];
            _this.skinName = "GuiChuTestCompSkin";
            return _this;
        }
        GuiChuTestComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btn);
        };
        GuiChuTestComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btn:
                    this.test();
                    break;
            }
        };
        GuiChuTestComp.prototype.test = function () {
            this.count = 0;
            // this.h1 = this.h2 = this.h3 = this.h4 = this.h5 = this.h6 = this.h7 = 0;
            this.hs = [0, 0, 0, 0, 0, 0, 0];
            var p1 = parseInt(this.et1.text);
            var p2 = parseInt(this.et2.text);
            var p3 = parseInt(this.et3.text);
            if (this.checkValue(p1) && this.checkValue(p2) && this.checkValue(p3) && p1 <= 7) {
                __PVO().i(p1, p2).l(p3).to(app.NetAction.GUICHU_REQ_ANTE_TEST);
            }
            else {
                tip.popSysCenterTip("参数有问题");
            }
        };
        GuiChuTestComp.prototype.checkValue = function (data) {
            return !isNaN(data) && data > 0;
        };
        GuiChuTestComp.prototype.result = function (data) {
            var v1 = data[0];
            var v2 = data[1];
            this.count += v2;
            this.hs[v1 - 1]++;
            this.l1.text = "开奖花色：[";
            for (var i = 0; i < this.hs.length; i++) {
                this.l1.text += this.hs[i];
                if (i != this.hs.length - 1)
                    this.l1.text += ",";
            }
            this.l1.text += "]";
            this.l2.text = "输赢值：" + this.count;
        };
        return GuiChuTestComp;
    }(gameabc.UICustomComponent));
    guichu.GuiChuTestComp = GuiChuTestComp;
    __reflect(GuiChuTestComp.prototype, "guichu.GuiChuTestComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuTestComp.js.map