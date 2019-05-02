var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var HLCGameEndVO = (function () {
        function HLCGameEndVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("HLCGameEndVO").decode(data);
                this.setData(vo);
            }
        }
        HLCGameEndVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            var i = 0;
            var len = 0;
            if (vo.cardVO) {
                this.cardVO = [];
                len = vo.cardVO.length;
                for (i = 0; i < len; i++) {
                    this.cardVO[i] = new appvos.HLCCardVO();
                    this.cardVO[i].setData(vo.cardVO[i]);
                }
            }
            else {
                this.cardVO = null;
            }
            if (vo.infoVO) {
                this.infoVO = [];
                len = vo.infoVO.length;
                for (i = 0; i < len; i++) {
                    this.infoVO[i] = new appvos.HLCInfoVO();
                    this.infoVO[i].setData(vo.infoVO[i]);
                }
            }
            else {
                this.infoVO = null;
            }
            vo = null;
        };
        return HLCGameEndVO;
    }());
    appvos.HLCGameEndVO = HLCGameEndVO;
    __reflect(HLCGameEndVO.prototype, "appvos.HLCGameEndVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=HLCGameEndVO.js.map