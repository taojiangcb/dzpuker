var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var playcards;
(function (playcards) {
    /**边池vo */
    var PotVO = (function () {
        function PotVO() {
            this.allSeat = [];
            this.totalBet = 0;
        }
        PotVO.prototype.setKey = function () {
            this.allSeatKey = this.allSeat.toString();
        };
        return PotVO;
    }());
    playcards.PotVO = PotVO;
    __reflect(PotVO.prototype, "playcards.PotVO");
})(playcards || (playcards = {}));
//# sourceMappingURL=PotVO.js.map