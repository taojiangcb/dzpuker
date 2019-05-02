var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var HLCCardVO = (function () {
        function HLCCardVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("HLCCardVO").decode(data);
                this.setData(vo);
            }
        }
        HLCCardVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.posId = vo.posId;
            this.card = vo.card;
            vo = null;
        };
        return HLCCardVO;
    }());
    appvos.HLCCardVO = HLCCardVO;
    __reflect(HLCCardVO.prototype, "appvos.HLCCardVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=HLCCardVO.js.map