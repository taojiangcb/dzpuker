var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    /**
     *牌局记录
     * @author
     *
     */
    var PlayCardsVideoVO = (function () {
        function PlayCardsVideoVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                this.sourceData = AppGlobal.getMessage("PlayCardsVideoVO").decode(data);
                this.setData(this.sourceData);
            }
        }
        PlayCardsVideoVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            var i = 0;
            var len = 0;
            this.tablevo = new appvos.TexasTableVO();
            if (vo.tablevo) {
                this.tablevo.setData(vo.tablevo);
            }
            this.actions = [];
            if (vo.actions) {
                len = vo.actions.length;
                for (i = 0; i < len; i++) {
                    this.actions[i] = new appvos.MessageVO(vo.actions[i].toArrayBuffer());
                }
            }
            this.startTime = vo.startTime == null ? 0 : vo.startTime.toNumber();
            this.roleid = vo.roleid == null ? 0 : vo.roleid.toNumber();
            this.playId = vo.playId == null ? 0 : vo.playId.toNumber();
        };
        PlayCardsVideoVO.prototype.setActData = function (vo, act, time, clone) {
            if (clone === void 0) { clone = false; }
            if (clone) {
                vo = new appvos.MessageVO(vo.sourceData.toArrayBuffer());
            }
            vo.name = vo.sourceData.name = act;
            vo.sendAt = time;
            vo.sourceData.sendAt = __SET_INT64(time);
            if (this.actions == null)
                this.actions = [];
            this.actions.push(vo);
        };
        PlayCardsVideoVO.prototype.setString = function (str) {
            var vo = AppGlobal.getMessage("PlayCardsVideoVO").decode(FormatUtils.strToBuffer(str));
            this.setData(vo);
        };
        PlayCardsVideoVO.prototype.getProtoVO = function () {
            var vo = AppGlobal.getMessageVO("PlayCardsVideoVO");
            vo.tablevo = this.tablevo.getProtoVO();
            var i = 0;
            var len = 0;
            vo.actions = [];
            len = this.actions.length;
            for (i = 0; i < len; i++) {
                vo.actions[i] = this.actions[i].sourceData;
            }
            ;
            vo.startTime = __SET_INT64(this.startTime);
            vo.roleid = __SET_INT64(this.roleid);
            vo.playId = __SET_INT64(this.playId);
            return vo;
        };
        PlayCardsVideoVO.prototype.toArrayBuffer = function () {
            var vo = this.getProtoVO();
            return vo.toArrayBuffer();
        };
        PlayCardsVideoVO.prototype.toString = function () {
            // var byte: egret.ByteArray = new egret.ByteArray(this.toArrayBuffer());
            // byte.position = 0;
            // return byte.readUTF();
            var str = FormatUtils.bufferToStr(this.toArrayBuffer());
            return str;
        };
        PlayCardsVideoVO.prototype.clone = function () {
            var vo = new PlayCardsVideoVO(this.toArrayBuffer());
            return vo;
        };
        return PlayCardsVideoVO;
    }());
    appvos.PlayCardsVideoVO = PlayCardsVideoVO;
    __reflect(PlayCardsVideoVO.prototype, "appvos.PlayCardsVideoVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=PlayCardsVideoVO.js.map