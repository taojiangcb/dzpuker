var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var appvos;
(function (appvos) {
    var SeeInfoVO = (function () {
        function SeeInfoVO() {
            this.type = -1; // 默认-1 牌局查看  -2好友查看; -3九九德州
        }
        return SeeInfoVO;
    }());
    appvos.SeeInfoVO = SeeInfoVO;
    __reflect(SeeInfoVO.prototype, "appvos.SeeInfoVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=SeeInfoVO.js.map