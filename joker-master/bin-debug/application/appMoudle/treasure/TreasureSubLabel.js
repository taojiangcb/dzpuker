var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var treasure;
(function (treasure) {
    var TreasureSubLabel = (function (_super) {
        __extends(TreasureSubLabel, _super);
        function TreasureSubLabel() {
            var _this = _super.call(this) || this;
            _this.skinName = "TreasureSubLabelSkin";
            return _this;
        }
        TreasureSubLabel.prototype.dataChanged = function () {
            this.lb1.text = this.data.userName;
            this.lb2.text = "参与" + this.data.buyNum + "次";
            this.lb3.text = "中奖概率:" + (this.data.buyNum / (this.data.totalNum * treasure.getProxy().rate) * 100).toFixed(0) + "%";
            this.lb4.text = DateUtils.dateFormat(new Date(this.data.createTime * 1000), "yyyy-M-d");
            this.lb5.text = DateUtils.dateFormat(new Date(this.data.createTime * 1000), "hh:mm:ss");
            this.img.source = this.data.faceid == "" ? "img_Default_Avatar_png" : "img_Default_Avatar_" + this.data.faceid + "_png";
        };
        return TreasureSubLabel;
    }(eui.ItemRenderer));
    treasure.TreasureSubLabel = TreasureSubLabel;
    __reflect(TreasureSubLabel.prototype, "treasure.TreasureSubLabel");
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureSubLabel.js.map