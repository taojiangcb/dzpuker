var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var MessageVO = (function () {
        function MessageVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                this.sourceData = AppGlobal.getMessage("MessageVO").decode(data);
                this.setData(this.sourceData);
            }
        }
        MessageVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.action = vo.action;
            this.phase = vo.phase;
            if (vo.data) {
                this.data = new appvos.ParamVO();
                this.data.setData(vo.data);
            }
            else {
                this.data = null;
            }
            this.sendAt = vo.sendAt == null ? 0 : vo.sendAt.toNumber();
            this.futureId = vo.futureId == null ? 0 : vo.futureId.toNumber();
            this.clientNumId = vo.clientNumId;
            this.name = vo.name;
            this.errorCode = vo.errorCode;
            this.isEncrypt = vo.isEncrypt;
            this.token = vo.token;
            this.seqNum = vo.seqNum;
            vo = null;
        };
        return MessageVO;
    }());
    appvos.MessageVO = MessageVO;
    __reflect(MessageVO.prototype, "appvos.MessageVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=MessageVO.js.map