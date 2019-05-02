var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var MttRankVO = (function () {
        function MttRankVO() {
            this.rank = 0;
            this.playerName = "";
            this.bet = 0;
        }
        return MttRankVO;
    }());
    appvos.MttRankVO = MttRankVO;
    __reflect(MttRankVO.prototype, "appvos.MttRankVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=MttRankVO.js.map