var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fiveCard;
(function (fiveCard) {
    var ChrooseItemButton = (function (_super) {
        __extends(ChrooseItemButton, _super);
        function ChrooseItemButton() {
            var _this = _super.call(this) || this;
            _this.typeData = 0;
            _this.skinName = "resource/app_skin/fiveCard/ChrooseItemButtonSkin.exml";
            return _this;
        }
        ChrooseItemButton.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
        };
        ChrooseItemButton.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this.labelImg) {
                this.labelImg.source = "img_word_gameUI_play" + (this.typeData + 1) + "_png";
            }
        };
        ChrooseItemButton.prototype.setTypeData = function (val) {
            this.typeData = val;
            if (this.initialized) {
                this.labelImg.source = "img_word_gameUI_play" + (this.typeData + 1) + "_png";
            }
            else {
                this.invalidateProperties();
            }
        };
        ChrooseItemButton.prototype.getTypeName = function () {
            var names = [
                "高牌", "一对", "两对", "三条", "同花", "葫芦", "四条", "同花顺", "皇家同花顺"
            ];
            return names[this.typeData];
        };
        return ChrooseItemButton;
    }(gameabc.UICustomComponent));
    fiveCard.ChrooseItemButton = ChrooseItemButton;
    __reflect(ChrooseItemButton.prototype, "fiveCard.ChrooseItemButton");
})(fiveCard || (fiveCard = {}));
//# sourceMappingURL=ChrooseItemButton.js.map