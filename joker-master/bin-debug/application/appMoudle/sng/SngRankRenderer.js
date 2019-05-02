var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sng;
(function (sng) {
    /** 比赛奖励标签页用的 */
    var SngRankRenderer = (function (_super) {
        __extends(SngRankRenderer, _super);
        function SngRankRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "SngRankRendererSkin";
            _this.scoreLabel.visible = false;
            return _this;
        }
        Object.defineProperty(SngRankRenderer.prototype, "rewardVO", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        SngRankRenderer.prototype.dataChanged = function () {
            this.rankLabel.text = String(this.rewardVO.rank);
            this.scoreLabel.text = String(this.rewardVO.score);
            this.idBgImage.visible = this.rewardVO.rank <= 3;
            if (this.rewardVO.propId != 0 && this.rewardVO.propNum != 0) {
                //如果有道具就是红包，其他道具当前版本不会出现，出现时要修改道具系统
                this.iconImage.source = "icon_hongbao_mtt_png";
                this.rewardLabel.text = String(this.rewardVO.propNum);
            }
            else {
                this.iconImage.source = "icon_caoma_png";
                this.rewardLabel.text = String(this.rewardVO.coin);
            }
        };
        return SngRankRenderer;
    }(uicomps.BaseItemCilckRenderer));
    sng.SngRankRenderer = SngRankRenderer;
    __reflect(SngRankRenderer.prototype, "sng.SngRankRenderer");
})(sng || (sng = {}));
//# sourceMappingURL=SngRankRenderer.js.map