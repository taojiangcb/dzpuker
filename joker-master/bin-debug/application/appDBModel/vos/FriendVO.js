var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var FriendVO = (function () {
        function FriendVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("FriendVO").decode(data);
                this.setData(vo);
            }
        }
        FriendVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            if (vo.uid !== null)
                this.uid = vo.uid.toNumber();
            if (vo.id !== null)
                this.id = vo.id.toNumber();
            if (vo.fid !== null)
                this.fid = vo.fid.toNumber();
            if (vo.time !== null)
                this.time = vo.time.toNumber();
            if (vo.fName !== null)
                this.fName = vo.fName;
            if (vo.faceid !== null)
                this.faceid = vo.faceid;
            if (vo.status !== null)
                this.status = vo.status;
            if (vo.roomId !== null)
                this.roomId = vo.roomId;
        };
        return FriendVO;
    }());
    appvos.FriendVO = FriendVO;
    __reflect(FriendVO.prototype, "appvos.FriendVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=FriendVO.js.map