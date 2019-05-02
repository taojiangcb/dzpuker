var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var UserLabelVO = (function () {
        function UserLabelVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("UserLabelVO").decode(data);
                this.setData(vo);
            }
        }
        UserLabelVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.id = vo.id == null ? 0 : vo.id.toNumber();
            this.userId = vo.userId == null ? 0 : vo.userId.toNumber();
            this.labelName = vo.labelName;
            this.labelType = vo.labelType;
            this.modifyTime = vo.modifyTime == null ? 0 : vo.modifyTime.toNumber();
            console.log('this.modifyTime', this.modifyTime);
            // if (vo.modifyTime !== null && vo.modifyTime !== undefined) this.modifyTime = vo.modifyTime.toNumber();
            vo = null;
        };
        return UserLabelVO;
    }());
    appvos.UserLabelVO = UserLabelVO;
    __reflect(UserLabelVO.prototype, "appvos.UserLabelVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=UserLabelVO.js.map