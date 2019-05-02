var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var GameConfigVO = (function () {
        function GameConfigVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("GameConfigVO").decode(data);
                this.setData(vo);
            }
        }
        GameConfigVO.prototype.setString = function (str) {
            var vo = AppGlobal.getMessage("GameConfigVO").decode(FormatUtils.strToBuffer(str));
            this.setData(vo);
        };
        GameConfigVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.gcId = vo.gcId == null ? 0 : vo.gcId.toNumber();
            this.gcValue = vo.gcValue == null ? 0 : vo.gcValue.toNumber();
            this.business = vo.business == null ? 0 : vo.business.toNumber();
            return vo;
        };
        return GameConfigVO;
    }());
    appvos.GameConfigVO = GameConfigVO;
    __reflect(GameConfigVO.prototype, "appvos.GameConfigVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=GameConfigVO.js.map