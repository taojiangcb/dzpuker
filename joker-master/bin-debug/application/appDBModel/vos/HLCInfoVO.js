var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var HLCInfoVO = (function () {
        function HLCInfoVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("HLCInfoVO").decode(data);
                this.setData(vo);
            }
        }
        Object.defineProperty(HLCInfoVO.prototype, "totalWin", {
            /**总输赢 */
            get: function () {
                return this.posWin1 + this.posWin2 + this.posWin3 + this.posWin4;
            },
            enumerable: true,
            configurable: true
        });
        HLCInfoVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.seatId = vo.seatId;
            this.betNum = vo.betNum;
            this.posWin1 = vo.posWin1;
            this.posWin2 = vo.posWin2;
            this.posWin3 = vo.posWin3;
            this.posWin4 = vo.posWin4;
            this.posWin = [vo.posWin1, vo.posWin2, vo.posWin3, vo.posWin4];
            this.realWin = vo.realWin;
            vo = null;
        };
        return HLCInfoVO;
    }());
    appvos.HLCInfoVO = HLCInfoVO;
    __reflect(HLCInfoVO.prototype, "appvos.HLCInfoVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=HLCInfoVO.js.map