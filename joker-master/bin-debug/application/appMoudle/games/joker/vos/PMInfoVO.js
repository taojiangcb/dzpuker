var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var PMInfoVO = (function () {
        function PMInfoVO(data) {
            this.betNum = 0; //下注金额
            this.cardsNum = 0; //下注门数
            this.multi = 0; //下注倍数
            this.totalBet = 0; //总下注金额
            this.leftMoney = 0; //剩余金额
            this.card = null; //手牌
            if (data) {
                var vo = AppGlobal.getMessage("PMInfoVO").decode(data);
                if (vo)
                    this.setData(data);
            }
        }
        PMInfoVO.prototype.setData = function (data) {
            if (data) {
                this.betNum = data.betNum;
                this.cardsNum = data.cardsNum;
                this.multi = data.mutil;
                this.totalBet = data.totalBet;
                this.leftMoney = data.leftMoney;
                if (data.card) {
                    this.card = new appvos.PMCardVO();
                    this.card.setData(data.card);
                }
            }
        };
        PMInfoVO.prototype.clear = function () {
            this.card = null;
            this.betNum = 0;
            this.cardsNum = 0;
            this.multi = 0;
            this.totalBet = 0;
        };
        return PMInfoVO;
    }());
    appvos.PMInfoVO = PMInfoVO;
    __reflect(PMInfoVO.prototype, "appvos.PMInfoVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=PMInfoVO.js.map