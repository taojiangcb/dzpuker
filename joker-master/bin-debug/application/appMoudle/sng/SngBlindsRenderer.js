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
    /** 比赛盲注标签页用的 */
    var SngBlindsRenderer = (function (_super) {
        __extends(SngBlindsRenderer, _super);
        //比赛信息界面，奖励条款
        function SngBlindsRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "SngBlindsRendererSkin";
            return _this;
        }
        Object.defineProperty(SngBlindsRenderer.prototype, "blindsVO", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        SngBlindsRenderer.prototype.dataChanged = function () {
            this.levelLabel.text = String(this.blindsVO.level);
            this.blindsLabel.text = this.blindsVO.smallBlinds + "/" + this.blindsVO.bigBlinds;
            this.antiLabel.text = String(this.blindsVO.antiBlinds);
            this.timeLabel.text = String(this.blindsVO.time) + "秒";
            var matchVO = match.getProxy().currentMatchVO;
            if (matchVO != null && matchVO.blindsIndex + 1 == this.blindsVO.level) {
                this.levelLabel.textColor = 0xFF7500;
                this.blindsLabel.textColor = 0xFF7500;
                this.antiLabel.textColor = 0xFF7500;
                this.timeLabel.textColor = 0xFF7500;
            }
            else {
                this.levelLabel.textColor = 0xFFFFFF;
                this.blindsLabel.textColor = 0xFFFFFF;
                this.antiLabel.textColor = 0xFFFFFF;
                this.timeLabel.textColor = 0xFFFFFF;
            }
        };
        return SngBlindsRenderer;
    }(uicomps.BaseItemCilckRenderer));
    sng.SngBlindsRenderer = SngBlindsRenderer;
    __reflect(SngBlindsRenderer.prototype, "sng.SngBlindsRenderer");
})(sng || (sng = {}));
//# sourceMappingURL=SngBlindsRenderer.js.map