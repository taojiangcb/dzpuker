var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var TreasureConfigVO = (function () {
        function TreasureConfigVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("TreasureConfigVO").decode(data);
                this.setData(vo);
            }
        }
        TreasureConfigVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            if (vo.id !== null && vo.id !== undefined)
                this.id = vo.id.toNumber();
            if (vo.roomType !== null && vo.roomType !== undefined)
                this.roomType = vo.roomType;
            if (vo.progressiveId !== null && vo.progressiveId !== undefined)
                this.progressiveId = vo.progressiveId.toNumber();
            if (vo.delayTime !== null && vo.delayTime !== undefined)
                this.delayTime = vo.delayTime.toNumber();
        };
        return TreasureConfigVO;
    }());
    appvos.TreasureConfigVO = TreasureConfigVO;
    __reflect(TreasureConfigVO.prototype, "appvos.TreasureConfigVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=TreasureConfigVO.js.map