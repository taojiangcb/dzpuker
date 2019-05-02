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
    var PlayStatisInfoItemRenderer = (function (_super) {
        __extends(PlayStatisInfoItemRenderer, _super);
        function PlayStatisInfoItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayStatisInfoItemRendererSkin";
            _this.touchChildren = false;
            return _this;
        }
        PlayStatisInfoItemRenderer.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.addButton(this, false);
        };
        PlayStatisInfoItemRenderer.prototype.dataChanged = function () {
            if (this.itemIndex == 0) {
                this.iconTop.visible = true;
                this.iconBg.source = "s9_bg_meihua_png";
                this.iconType.source = "icon_mvp_png";
            }
            else if (this.itemIndex == 1) {
                this.iconTop.visible = false;
                this.iconBg.source = "s9_bg_heitao_png";
                this.iconType.source = "icon_tuhao_png";
            }
            else {
                this.iconTop.visible = false;
                this.iconBg.source = "s9_bg_hongtao_png";
                this.iconType.source = "icon_dayu_png";
            }
            if (this.data) {
                var info = this.data;
                // this.avatar.source = info.avatarID;
                this.txt1.text = info.name;
            }
        };
        PlayStatisInfoItemRenderer.prototype.click = function (tag) {
            //__OPEN_PRE_MOUDLE(AppReg.APP_CHAT_PAGE)
        };
        return PlayStatisInfoItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    playcards.PlayStatisInfoItemRenderer = PlayStatisInfoItemRenderer;
    __reflect(PlayStatisInfoItemRenderer.prototype, "playcards.PlayStatisInfoItemRenderer");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayStatisInfoItemRenderer.js.map