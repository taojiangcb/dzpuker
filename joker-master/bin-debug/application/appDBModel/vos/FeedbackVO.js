var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var FeedbackVO = (function () {
        function FeedbackVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("FeedbackVO").decode(data);
                this.setData(vo);
            }
        }
        FeedbackVO.prototype.setString = function (str) {
            var vo = AppGlobal.getMessage("FeedbackVO").decode(FormatUtils.strToBuffer(str));
            this.setData(vo);
        };
        FeedbackVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.id = vo.id == null ? 0 : vo.id.toNumber();
            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            this.roleName = vo.roleName;
            this.feedbackRoleIds = vo.feedbackRoleIds;
            this.feedbackRoleNames = vo.feedbackRoleNames;
            this.context = vo.context;
            this.qq = vo.qq;
            this.phone = vo.phone;
            this.status = vo.status;
            if (vo.video) {
                this.video = new appvos.PlayCardsVideoVO(vo.video);
            }
            this.createTime = vo.createTime == null ? 0 : vo.createTime.toNumber();
            vo = null;
        };
        FeedbackVO.prototype.toArrayBuffer = function () {
            var vo = this.getProtoVO();
            return vo.toArrayBuffer();
        };
        FeedbackVO.prototype.getProtoVO = function () {
            var cls = AppGlobal.getMessage("FeedbackVO");
            var vo = new cls();
            vo.id = __SET_INT64(this.id);
            vo.roleId = __SET_INT64(this.roleId);
            vo.roleName = this.roleName;
            vo.feedbackRoleIds = this.feedbackRoleIds;
            vo.feedbackRoleNames = this.feedbackRoleNames;
            vo.context = this.context;
            vo.qq = this.qq;
            vo.phone = this.phone;
            vo.status = this.status;
            if (this.video)
                vo.video = this.video.toArrayBuffer();
            vo.createTime = __SET_INT64(this.createTime);
            return vo;
        };
        return FeedbackVO;
    }());
    appvos.FeedbackVO = FeedbackVO;
    __reflect(FeedbackVO.prototype, "appvos.FeedbackVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=FeedbackVO.js.map