var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var DealerInfoVO = (function () {
        function DealerInfoVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("DealerInfoVO").decode(data);
                this.setData(vo);
            }
        }
        DealerInfoVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            if (vo.userid !== null)
                this.userid = vo.userid.toNumber();
            if (vo.name !== null)
                this.name = vo.name;
            if (vo.matchround !== null)
                this.matchround = vo.matchround;
            if (vo.gameround !== null)
                this.gameround = vo.gameround;
            if (vo.onlinetime !== null)
                this.onlinetime = vo.onlinetime;
            if (vo.giftpay !== null)
                this.giftpay = vo.giftpay.toNumber();
            if (vo.servicepay !== null)
                this.servicepay = vo.servicepay.toNumber();
            if (vo.roomid !== null)
                this.roomid = vo.roomid;
            if (vo.tableid !== null)
                this.tableid = vo.tableid;
            if (vo.faceid !== null)
                this.faceid = vo.faceid;
            if (vo.online !== null)
                this.online = vo.online;
            if (vo.fans !== null)
                this.fans = vo.fans;
            if (vo.notice !== null)
                this.notice = vo.notice;
        };
        return DealerInfoVO;
    }());
    appvos.DealerInfoVO = DealerInfoVO;
    __reflect(DealerInfoVO.prototype, "appvos.DealerInfoVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=DealerInfoVO.js.map