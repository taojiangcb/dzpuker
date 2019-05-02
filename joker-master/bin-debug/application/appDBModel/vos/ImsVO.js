var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var ImsVO = (function () {
        function ImsVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("ImsVO").decode(data);
                this.setData(vo);
            }
        }
        ImsVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.id = vo.id.toNumber();
            this.title = vo.title;
            this.context = vo.context;
            this.formatId = vo.formatId.toNumber();
            this.createTime = vo.createTime.toNumber();
            this.flag = vo.flag;
            this.type = vo.type;
        };
        return ImsVO;
    }());
    appvos.ImsVO = ImsVO;
    __reflect(ImsVO.prototype, "appvos.ImsVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=ImsVO.js.map