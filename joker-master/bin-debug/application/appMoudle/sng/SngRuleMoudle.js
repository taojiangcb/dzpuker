var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sng;
(function (sng) {
    var SngRuleMoudle = (function (_super) {
        __extends(SngRuleMoudle, _super);
        function SngRuleMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "SngRuleSkin";
            return _this;
        }
        SngRuleMoudle.prototype.createComplete = function () {
            this.bindButton(this.closeButton);
            var str = "";
            if (this.uiOpenData == 5 /* MTT */) {
                str += gameabc.getMessage("MTT_RULE1") + "\r";
                str += gameabc.getMessage("MTT_RULE2") + "\r";
                str += gameabc.getMessage("MTT_RULE3") + "\r";
                str += gameabc.getMessage("MTT_RULE4") + "\r";
                str += gameabc.getMessage("MTT_RULE5") + "\r";
                str += gameabc.getMessage("MTT_RULE6");
            }
            else {
                str += gameabc.getMessage("SNG_RULE1") + "\r";
                str += gameabc.getMessage("SNG_RULE2") + "\r";
                str += gameabc.getMessage("SNG_RULE3") + "\r";
                str += gameabc.getMessage("SNG_RULE4");
            }
            this.textLabel.text = str;
        };
        SngRuleMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    return;
            }
        };
        return SngRuleMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    sng.SngRuleMoudle = SngRuleMoudle;
    __reflect(SngRuleMoudle.prototype, "sng.SngRuleMoudle");
})(sng || (sng = {}));
//# sourceMappingURL=SngRuleMoudle.js.map