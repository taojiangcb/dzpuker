var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var appvos;
(function (appvos) {
    var ZPInfoVO = (function () {
        function ZPInfoVO(data) {
            if (data === void 0) { data = null; }
            this.seatId = 0; //座位号
            this.betNum = 0; //筹码最终值
            this.posWin1 = 0; //输赢位置1
            this.posWin2 = 0; //输赢位置2
            this.posWin3 = 0; //输赢位置3
            this.posWin4 = 0; //输赢位置4
            this.posWin5 = 0; //输赢位置5
            this.posWin6 = 0; //输赢位置6
            this.posWin7 = 0; //输赢位置7
            this.realWin = 0; //实际输赢
            if (data != null) {
                var vo = AppGlobal.getMessage("ZPInfoVO").decode(data);
                this.setData(vo);
            }
        }
        ZPInfoVO.prototype.setData = function (data) {
            if (data) {
                this.seatId = data.seatId; //座位号
                this.betNum = data.betNum; //筹码最终值
                this.posWin1 = data.posWin1; //输赢位置1
                this.posWin2 = data.posWin2; //输赢位置2
                this.posWin3 = data.posWin3; //输赢位置3
                this.posWin4 = data.posWin4; //输赢位置4
                this.posWin5 = data.posWin5; //输赢位置5
                this.posWin6 = data.posWin6; //输赢位置6
                this.posWin7 = data.posWin7; //输赢位置7
                this.realWin = data.realWin; //实际输赢
            }
            else {
                this.clear();
            }
        };
        ZPInfoVO.prototype.clear = function () {
            this.seatId = 0; //座位号
            this.betNum = 0; //筹码最终值
            this.posWin1 = 0; //输赢位置1
            this.posWin2 = 0; //输赢位置2
            this.posWin3 = 0; //输赢位置3
            this.posWin4 = 0; //输赢位置4
            this.posWin5 = 0; //输赢位置5
            this.posWin6 = 0; //输赢位置6
            this.posWin7 = 0; //输赢位置7
            this.realWin = 0; //实际输赢
        };
        return ZPInfoVO;
    }());
    appvos.ZPInfoVO = ZPInfoVO;
    __reflect(ZPInfoVO.prototype, "appvos.ZPInfoVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=ZPInfoVO.js.map