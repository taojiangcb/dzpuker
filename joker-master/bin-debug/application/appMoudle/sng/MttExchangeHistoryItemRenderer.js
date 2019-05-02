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
    var MttExchangeHistoryItemRenderer = (function (_super) {
        __extends(MttExchangeHistoryItemRenderer, _super);
        function MttExchangeHistoryItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/sng/product/MttHistoryItemRenderer.exml";
            return _this;
        }
        MttExchangeHistoryItemRenderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
        };
        MttExchangeHistoryItemRenderer.prototype.dataChanged = function () {
            if (this.data) {
                this.txtTime.text = this.data.time;
                this.txtTitle.text = this.data.title;
            }
        };
        return MttExchangeHistoryItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    match.MttExchangeHistoryItemRenderer = MttExchangeHistoryItemRenderer;
    __reflect(MttExchangeHistoryItemRenderer.prototype, "match.MttExchangeHistoryItemRenderer");
})(match || (match = {}));
//# sourceMappingURL=MttExchangeHistoryItemRenderer.js.map