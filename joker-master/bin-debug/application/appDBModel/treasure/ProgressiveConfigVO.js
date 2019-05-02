var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var ProgressiveConfigVO = (function () {
        function ProgressiveConfigVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("ProgressiveConfigVO").decode(data);
                this.setData(vo);
            }
        }
        ProgressiveConfigVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            if (vo.id !== null && vo.id !== undefined)
                this.id = vo.id.toNumber();
            if (vo.title !== null && vo.title !== undefined)
                this.title = FormatUtils.protoToGBK(vo.title);
            if (vo.iconId !== null && vo.iconId !== undefined)
                this.iconId = vo.iconId;
            if (vo.totalNum !== null && vo.totalNum !== undefined)
                this.totalNum = vo.totalNum.toNumber();
        };
        return ProgressiveConfigVO;
    }());
    appvos.ProgressiveConfigVO = ProgressiveConfigVO;
    __reflect(ProgressiveConfigVO.prototype, "appvos.ProgressiveConfigVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=ProgressiveConfigVO.js.map