var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var TreasureRecordVO = (function () {
        function TreasureRecordVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("TreasureRecordVO").decode(data);
                this.setData(vo);
            }
        }
        TreasureRecordVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            if (vo.id !== null && vo.id !== undefined)
                this.id = vo.id.toNumber();
            if (vo.userId !== null && vo.userId !== undefined)
                this.userId = vo.userId.toNumber();
            if (vo.userName !== null && vo.userName !== undefined)
                this.userName = FormatUtils.protoToGBK(vo.userName);
            if (vo.faceid !== null && vo.faceid !== undefined)
                this.faceid = FormatUtils.protoToGBK(vo.faceid);
            if (vo.buyNum !== null && vo.buyNum !== undefined)
                this.buyNum = vo.buyNum.toNumber();
            if (vo.totalNum !== null && vo.totalNum !== undefined)
                this.totalNum = vo.totalNum.toNumber();
            if (vo.openTime !== null && vo.openTime !== undefined)
                this.openTime = vo.openTime.toNumber();
            if (vo.count !== null && vo.count !== undefined)
                this.count = vo.count;
            if (vo.state !== null && vo.state !== undefined)
                this.state = vo.state;
            if (vo.createTime !== null && vo.createTime !== undefined)
                this.createTime = vo.createTime.toNumber();
            if (vo.iconId !== null && vo.iconId !== undefined)
                this.iconId = vo.iconId.toNumber();
            if (vo.roomType !== null && vo.roomType !== undefined)
                this.roomType = vo.roomType;
            if (vo.treasrueDBId !== null && vo.treasrueDBId !== undefined)
                this.treasrueDBId = vo.treasrueDBId.toNumber();
            if (vo.title !== null && vo.title !== undefined)
                this.title = FormatUtils.protoToGBK(vo.title);
        };
        return TreasureRecordVO;
    }());
    appvos.TreasureRecordVO = TreasureRecordVO;
    __reflect(TreasureRecordVO.prototype, "appvos.TreasureRecordVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=TreasureRecordVO.js.map