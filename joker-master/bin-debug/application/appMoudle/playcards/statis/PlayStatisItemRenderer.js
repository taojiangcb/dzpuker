var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 */
var playcards;
(function (playcards) {
    var PlayStatisItemRenderer = (function (_super) {
        __extends(PlayStatisItemRenderer, _super);
        function PlayStatisItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayStatisItemRendererSkin";
            _this.touchChildren = false;
            return _this;
        }
        PlayStatisItemRenderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.addButton(this, false);
        };
        PlayStatisItemRenderer.prototype.dataChanged = function () {
            if (this.itemIndex % 2 == 0) {
            }
            else {
            }
            if (this.data) {
                var info = this.data;
                this.txt1.text = info.name;
            }
        };
        PlayStatisItemRenderer.prototype.click = function (tag) {
            //__OPEN_PRE_MOUDLE(AppReg.APP_CHAT_PAGE)
        };
        return PlayStatisItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    playcards.PlayStatisItemRenderer = PlayStatisItemRenderer;
    __reflect(PlayStatisItemRenderer.prototype, "playcards.PlayStatisItemRenderer");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayStatisItemRenderer.js.map