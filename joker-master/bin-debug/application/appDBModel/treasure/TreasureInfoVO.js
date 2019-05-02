var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var TreasureInfoVO = (function () {
        function TreasureInfoVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("TreasureInfoVO").decode(data);
                this.setData(vo);
            }
        }
        TreasureInfoVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            var i = 0;
            var len = 0;
            if (vo.treasureConfigVO) {
                this.treasureConfigVO = [];
                len = vo.treasureConfigVO.length;
                for (i = 0; i < len; i++) {
                    this.treasureConfigVO[i] = new appvos.TreasureConfigVO();
                    this.treasureConfigVO[i].setData(vo.treasureConfigVO[i]);
                }
            }
            else {
                this.treasureConfigVO = null;
            }
            if (vo.progressiveConfigVO) {
                this.progressiveConfigVO = [];
                len = vo.progressiveConfigVO.length;
                for (i = 0; i < len; i++) {
                    this.progressiveConfigVO[i] = new appvos.ProgressiveConfigVO();
                    this.progressiveConfigVO[i].setData(vo.progressiveConfigVO[i]);
                }
            }
            else {
                this.progressiveConfigVO = null;
            }
            if (vo.treasureVO) {
                this.treasureVO = [];
                len = vo.treasureVO.length;
                for (i = 0; i < len; i++) {
                    this.treasureVO[i] = new appvos.TreasureVO();
                    this.treasureVO[i].setData(vo.treasureVO[i]);
                }
            }
            else {
                this.treasureVO = null;
            }
        };
        return TreasureInfoVO;
    }());
    appvos.TreasureInfoVO = TreasureInfoVO;
    __reflect(TreasureInfoVO.prototype, "appvos.TreasureInfoVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=TreasureInfoVO.js.map