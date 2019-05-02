var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bank;
(function (bank) {
    /**
     *
     * @author
     *
     */
    var BankChoiceItem = (function (_super) {
        __extends(BankChoiceItem, _super);
        function BankChoiceItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "BankChoiceItemSkin";
            return _this;
        }
        BankChoiceItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            if (info) {
                this.txtImage.source = "img_bank_game_" + info[0] + "_png";
                this.iconImage.source = "icon_bank_game_" + info[0] + "_png";
            }
        };
        return BankChoiceItem;
    }(eui.ItemRenderer));
    bank.BankChoiceItem = BankChoiceItem;
    __reflect(BankChoiceItem.prototype, "bank.BankChoiceItem");
})(bank || (bank = {}));
//# sourceMappingURL=BankChoiceItem.js.map