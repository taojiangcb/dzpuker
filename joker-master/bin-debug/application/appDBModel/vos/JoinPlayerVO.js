var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var JoinPlayerVO = (function () {
        function JoinPlayerVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("JoinPlayerVO").decode(data);
                this.setData(vo);
            }
        }
        JoinPlayerVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            this.name = vo.name == null ? "" : FormatUtils.protoToGBK(vo.name);
            // this.sex = vo.sex;
            // this.avatarID = vo.avatarID;
            // this.vipLevel = vo.vipLevel;
            // this.totalBringBet = vo.totalBringBet;
            // this.nowBet = vo.nowBet;
            vo = null;
        };
        return JoinPlayerVO;
    }());
    appvos.JoinPlayerVO = JoinPlayerVO;
    __reflect(JoinPlayerVO.prototype, "appvos.JoinPlayerVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=JoinPlayerVO.js.map