var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var HLCPlayerVO = (function () {
        function HLCPlayerVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("HLCPlayerVO").decode(data);
                this.setData(vo);
            }
        }
        HLCPlayerVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            this.name = FormatUtils.protoToGBK(vo.name);
            this.namedata = vo.name;
            this.sex = vo.sex;
            this.avatarID = vo.avatarID;
            this.vipLevel = vo.vipLevel;
            this.seatId = vo.seatId;
            this.banker = vo.banker;
            this.totalBet = vo.totalBet;
            this.posBet1 = vo.posBet1;
            if (this.posBet1 == null)
                this.posBet1 = 0;
            this.posBet2 = vo.posBet2;
            if (this.posBet2 == null)
                this.posBet2 = 0;
            this.posBet3 = vo.posBet3;
            if (this.posBet3 == null)
                this.posBet3 = 0;
            this.posBet4 = vo.posBet4;
            if (this.posBet4 == null)
                this.posBet4 = 0;
            this.showPos = vo.showPos;
            if (this.showPos == null)
                this.showPos = 0;
            vo = null;
        };
        HLCPlayerVO.prototype.addBet = function (index, bet) {
            this.totalBet -= bet;
            if (index == 0)
                this.posBet1 += bet;
            else if (index == 1)
                this.posBet2 += bet;
            else if (index == 2)
                this.posBet3 += bet;
            else if (index == 3)
                this.posBet4 += bet;
        };
        HLCPlayerVO.prototype.getBet = function (index) {
            if (index == 0)
                return this.posBet1;
            else if (index == 1)
                return this.posBet2;
            else if (index == 2)
                return this.posBet3;
            else if (index == 3)
                return this.posBet4;
        };
        HLCPlayerVO.prototype.totalAdd = function () {
            return this.posBet1 + this.posBet2 + this.posBet3 + this.posBet4;
        };
        /**可以加注的筹码 只能加注1/9筹码 */
        HLCPlayerVO.prototype.getLeftAdd = function (servicePay, add) {
            if (add === void 0) { add = 0; }
            var nowadd = add + this.posBet1 + this.posBet2 + this.posBet3 + this.posBet4;
            var totaladd = Math.floor((this.totalBet - servicePay + nowadd) / 9);
            return totaladd - nowadd;
        };
        HLCPlayerVO.prototype.clear = function () {
            this.posBet1 = 0;
            this.posBet2 = 0;
            this.posBet3 = 0;
            this.posBet4 = 0;
        };
        return HLCPlayerVO;
    }());
    appvos.HLCPlayerVO = HLCPlayerVO;
    __reflect(HLCPlayerVO.prototype, "appvos.HLCPlayerVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=HLCPlayerVO.js.map