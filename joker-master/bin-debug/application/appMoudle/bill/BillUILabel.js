var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bill;
(function (bill) {
    var BillUILabel = (function (_super) {
        __extends(BillUILabel, _super);
        function BillUILabel() {
            var _this = _super.call(this) || this;
            _this.skinName = "BillUILabelSkin";
            return _this;
        }
        BillUILabel.prototype.dataChanged = function () {
            this.rankLabel.text = (this.itemIndex + 1).toString();
            this.nameLabel.text = this.data.name;
            this.totalLabel.text = this.data.total;
            this.gainLabel.text = this.data.win;
        };
        return BillUILabel;
    }(eui.ItemRenderer));
    bill.BillUILabel = BillUILabel;
    __reflect(BillUILabel.prototype, "bill.BillUILabel");
})(bill || (bill = {}));
//# sourceMappingURL=BillUILabel.js.map