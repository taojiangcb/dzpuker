var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var notice;
(function (notice) {
    var RollNoticeVO = (function () {
        function RollNoticeVO(pbData) {
            this.noticeId = 0;
            this.content = "";
            if (pbData)
                this.setpbData(pbData);
        }
        RollNoticeVO.prototype.setpbData = function (val) {
            if (val) {
                this.noticeId = val.noticeId;
                this.content = val.content;
            }
        };
        return RollNoticeVO;
    }());
    notice.RollNoticeVO = RollNoticeVO;
    __reflect(RollNoticeVO.prototype, "notice.RollNoticeVO");
})(notice || (notice = {}));
//# sourceMappingURL=RollNoticeVO.js.map