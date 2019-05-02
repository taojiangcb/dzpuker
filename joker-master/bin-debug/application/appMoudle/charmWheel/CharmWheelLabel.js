var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var charmWheel;
(function (charmWheel) {
    var CharmWheelLabel = (function (_super) {
        __extends(CharmWheelLabel, _super);
        function CharmWheelLabel() {
            var _this = _super.call(this) || this;
            _this.skinName = "CharmWheelLabelSkin";
            return _this;
        }
        CharmWheelLabel.prototype.dataChanged = function () {
            if (!isNaN(this.data)) {
                this.label.textFlow = [
                    { text: "恭喜", style: { "textColor": AppConst.TextColors.white } },
                    { text: "您", style: { "textColor": AppConst.TextColors.yellow } },
                    { text: "获得", style: { "textColor": AppConst.TextColors.white } },
                    { text: charmWheel.getProxy().rewardList[this.data][2], style: { "textColor": AppConst.TextColors.yellow } }
                ];
            }
            else {
                this.label.textFlow = [
                    { text: "恭喜", style: { "textColor": AppConst.TextColors.white } },
                    { text: this.data.name, style: { "textColor": AppConst.TextColors.yellow } },
                    { text: "获得", style: { "textColor": AppConst.TextColors.white } },
                    { text: charmWheel.getProxy().rewardList[this.data.item][2], style: { "textColor": AppConst.TextColors.yellow } }
                ];
            }
        };
        return CharmWheelLabel;
    }(eui.ItemRenderer));
    charmWheel.CharmWheelLabel = CharmWheelLabel;
    __reflect(CharmWheelLabel.prototype, "charmWheel.CharmWheelLabel");
})(charmWheel || (charmWheel = {}));
//# sourceMappingURL=CharmWheelLabel.js.map