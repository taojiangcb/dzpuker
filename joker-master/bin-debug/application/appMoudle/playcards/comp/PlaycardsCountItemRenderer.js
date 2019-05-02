var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    /**
     */
    var PlaycardsCountItemRenderer = (function (_super) {
        __extends(PlaycardsCountItemRenderer, _super);
        function PlaycardsCountItemRenderer() {
            var _this = _super.call(this) || this;
            /**
             * 没有选中时的颜色
             * @type {number}
             */
            _this.NORMAL_COLOR = 0x7D6386;
            /**
             * 选中时的颜色
             * @type {number}
             */
            _this.CHROOSE_COLOR = 0xFFFFFF;
            _this.skinName = "PlaycardsCountItemSkin";
            return _this;
        }
        PlaycardsCountItemRenderer.prototype.dataChanged = function () {
            var countVO = this.data;
            if (countVO && this.bgimg) {
                if (countVO.roleid == user.getPlayerInfo().roleId) {
                    this.bgimg.source = "s9_bg_play_fangxingxinxi_png";
                    this.ismyimg.visible = true;
                }
                else {
                    this.bgimg.source = "s9_bg_fangxinditu_png";
                    this.ismyimg.visible = false;
                }
                var isPlayerInTable = null != playcards.getTableVO().searchPlayerInSeats(countVO.roleid);
                var textColor = isPlayerInTable ? this.CHROOSE_COLOR : this.NORMAL_COLOR;
                this.ranklab.text = countVO.rank;
                this.namelab.text = countVO.name;
                this.totalebetlab.text = countVO.total;
                this.winbetlab.text = countVO.win;
                this.ranklab.textColor = this.namelab.textColor = this.totalebetlab.textColor = this.winbetlab.textColor = textColor;
            }
        };
        return PlaycardsCountItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    playcards.PlaycardsCountItemRenderer = PlaycardsCountItemRenderer;
    __reflect(PlaycardsCountItemRenderer.prototype, "playcards.PlaycardsCountItemRenderer");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlaycardsCountItemRenderer.js.map