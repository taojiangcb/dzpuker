var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var PMCardVO = (function () {
        function PMCardVO(data) {
            this.cards = [];
            this.winMoney = 0;
            if (data) {
                var vo = AppGlobal.getMessage("PMCardVO").decode(data);
                this.setData(vo);
            }
        }
        PMCardVO.prototype.setData = function (data) {
            if (data) {
                this.cards = [];
                if (data.cards && data.cards.length > 0) {
                    this.cards = data.cards;
                }
                this.winMoney = data.winMoney;
            }
            else {
                this.clear();
            }
        };
        PMCardVO.prototype.clear = function () {
            this.cards = [];
            this.winMoney = 0;
        };
        return PMCardVO;
    }());
    appvos.PMCardVO = PMCardVO;
    __reflect(PMCardVO.prototype, "appvos.PMCardVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=PMCardVO.js.map