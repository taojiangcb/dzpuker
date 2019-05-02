var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var match;
(function (match) {
    var MttRuleMoudle = (function (_super) {
        __extends(MttRuleMoudle, _super);
        function MttRuleMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "MttRuleSkin";
            return _this;
        }
        MttRuleMoudle.prototype.createComplete = function () {
            this.bindButton(this.closeButton);
            var str = "";
            // str += gameabc.getMessage("SNG_RULE1") + "\r";
            // str += gameabc.getMessage("SNG_RULE2") + "\r";
            // str += gameabc.getMessage("SNG_RULE3") + "\r";
            // str += gameabc.getMessage("SNG_RULE4");
            this.textLabel.text = str;
        };
        MttRuleMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    return;
            }
        };
        return MttRuleMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    match.MttRuleMoudle = MttRuleMoudle;
    __reflect(MttRuleMoudle.prototype, "match.MttRuleMoudle");
})(match || (match = {}));
//# sourceMappingURL=MttRuleMoudle.js.map