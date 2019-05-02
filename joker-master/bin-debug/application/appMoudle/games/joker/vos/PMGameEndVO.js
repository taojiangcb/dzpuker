var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var PMGameEndVO = (function () {
        function PMGameEndVO(data) {
            this.betNum = 0; //下注金额
            this.cardsNum = 0; //下注门数
            this.multi = 0; //下注倍数
            this.totalBet = 0; //总下注金额
            this.leftMoney = 0; //剩余金额
            this.betWinMoney = 0; //牌局获得金额
            this.cards = []; //各门牌数据
            if (data) {
                var vo = AppGlobal.getMessage("PMGameEndVO").decode(data);
                if (vo)
                    this.setData(vo);
            }
        }
        PMGameEndVO.prototype.setData = function (data) {
            if (data) {
                this.betNum = data.betNum;
                this.cardsNum = data.cardsNum;
                this.multi = data.multi;
                this.totalBet = data.totalBet;
                this.leftMoney = data.leftMoney;
                this.betWinMoney = data.betWinMoney;
                if (data.cards) {
                    this.cards = [];
                    var len = data.cards.length;
                    var card;
                    for (var i = 0; i < len; i++) {
                        card = new appvos.PMCardVO();
                        card.setData(data.cards[i]);
                        this.cards.push(card);
                    }
                }
            }
            else {
                this.clear();
            }
        };
        PMGameEndVO.prototype.clear = function () {
            this.betNum = 0;
            this.cardsNum = 0;
            this.multi = 0;
            this.totalBet = 0;
            this.leftMoney = 0;
            this.betWinMoney = 0;
            this.cards = [];
        };
        return PMGameEndVO;
    }());
    appvos.PMGameEndVO = PMGameEndVO;
    __reflect(PMGameEndVO.prototype, "appvos.PMGameEndVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=PMGameEndVO.js.map