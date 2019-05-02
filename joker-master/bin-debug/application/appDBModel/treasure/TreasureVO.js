var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var TreasureVO = (function () {
        function TreasureVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("TreasureVO").decode(data);
                this.setData(vo);
            }
        }
        TreasureVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            if (vo.id !== null && vo.id !== undefined)
                this.id = vo.id.toNumber();
            if (vo.treasrueId !== null && vo.treasrueId !== undefined)
                this.treasrueId = vo.treasrueId.toNumber();
            if (vo.count !== null && vo.count !== undefined)
                this.count = vo.count;
            if (vo.curNum !== null && vo.curNum !== undefined)
                this.curNum = vo.curNum.toNumber();
            if (vo.openTime !== null && vo.openTime !== undefined)
                this.openTime = vo.openTime.toNumber();
            if (vo.roomType !== null && vo.roomType !== undefined)
                this.roomType = vo.roomType;
            if (vo.createTime !== null && vo.createTime !== undefined)
                this.createTime = vo.createTime.toNumber();
            if (vo.totalNum !== null && vo.totalNum !== undefined)
                this.totalNum = vo.totalNum.toNumber();
            if (vo.buyNum !== null && vo.buyNum !== undefined)
                this.buyNum = vo.buyNum.toNumber();
        };
        return TreasureVO;
    }());
    appvos.TreasureVO = TreasureVO;
    __reflect(TreasureVO.prototype, "appvos.TreasureVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=TreasureVO.js.map