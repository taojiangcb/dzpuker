var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 鬼畜大转盘
 */
var appvos;
(function (appvos) {
    var ZPPlayerVO = (function () {
        function ZPPlayerVO(data) {
            if (data === void 0) { data = null; }
            this.roleId = 0; //ID
            this.name = ""; //名称
            this.seatId = 0; //名称
            this.posBet1 = 0; //下注筹码1
            this.posBet2 = 0; //下注筹码2
            this.posBet3 = 0; //下注筹码3
            this.posBet4 = 0; //下注筹码4
            this.posBet5 = 0; //下注筹码5
            this.posBet6 = 0; //下注筹码6
            this.posBet7 = 0; //下注筹码7
            if (data != null) {
                var vo = AppGlobal.getMessage("ZPPlayerVO").decode(data);
                this.setData(vo);
            }
        }
        ZPPlayerVO.prototype.setData = function (data) {
            if (data) {
                this.roleId = data.roleId;
                this.name = data.name;
                this.seatId = data.setaId;
                this.posBet1 = data.postBet1;
                this.posBet2 = data.postBet2;
                this.posBet3 = data.postBet3;
                this.posBet4 = data.postBet4;
                this.posBet5 = data.postBet5;
                this.posBet6 = data.postBet6;
                this.posBet7 = data.postBet7;
            }
            else {
                this.clear();
            }
        };
        ZPPlayerVO.prototype.clear = function () {
            this.roleId = 0;
            this.name = "";
            this.seatId = 0;
            this.posBet1 = 0;
            this.posBet2 = 0;
            this.posBet3 = 0;
            this.posBet4 = 0;
            this.posBet5 = 0;
            this.posBet6 = 0;
            this.posBet7 = 0;
        };
        return ZPPlayerVO;
    }());
    appvos.ZPPlayerVO = ZPPlayerVO;
    __reflect(ZPPlayerVO.prototype, "appvos.ZPPlayerVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=ZPPlayerVO.js.map