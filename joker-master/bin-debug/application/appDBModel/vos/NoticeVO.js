var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var NoticeVO = (function () {
        function NoticeVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("NoticeVO").decode(data);
                this.setData(vo);
            }
        }
        NoticeVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.noticeId = vo.noticeId.toNumber();
            this.title = vo.title;
            this.content = vo.content;
            this.gotoTarget = vo.gotoTarget;
            this.type = vo.type;
            this.imageUrl = vo.imageUrl;
            this.startTime = vo.startTime.toNumber();
            this.endTime = vo.endTime.toNumber();
            this.business = vo.business;
        };
        return NoticeVO;
    }());
    appvos.NoticeVO = NoticeVO;
    __reflect(NoticeVO.prototype, "appvos.NoticeVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=NoticeVO.js.map