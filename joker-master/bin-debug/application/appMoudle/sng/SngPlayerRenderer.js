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
    /** 比赛玩家即时排名标签页用的 */
    var SngPlayerRenderer = (function (_super) {
        __extends(SngPlayerRenderer, _super);
        function SngPlayerRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "SngPlayerInfoRendererSkin";
            return _this;
        }
        Object.defineProperty(SngPlayerRenderer.prototype, "playerVO", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SngPlayerRenderer.prototype, "rankVO", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        SngPlayerRenderer.prototype.dataChanged = function () {
            if (this.data instanceof appvos.SeatPlayerVO) {
                this.rankLabel.text = String(this.itemIndex + 1);
                this.nameLabel.text = String(this.playerVO.name);
                var bet = this.playerVO.nowBet + this.playerVO.totalBet;
                this.rewardLabel.text = bet < 0 ? "0" : FormatUtils.wan(bet);
                this.idBgImage.visible = this.itemIndex + 1 <= 3;
            }
            else if (this.data instanceof appvos.MttRankVO) {
                this.rankLabel.text = String(this.rankVO.rank);
                this.nameLabel.text = this.rankVO.playerName;
                this.rewardLabel.text = String(this.rankVO.bet);
                this.idBgImage.visible = this.rankVO.rank <= 3;
            }
        };
        return SngPlayerRenderer;
    }(uicomps.BaseItemCilckRenderer));
    sng.SngPlayerRenderer = SngPlayerRenderer;
    __reflect(SngPlayerRenderer.prototype, "sng.SngPlayerRenderer");
})(sng || (sng = {}));
//# sourceMappingURL=SngPlayerRenderer.js.map