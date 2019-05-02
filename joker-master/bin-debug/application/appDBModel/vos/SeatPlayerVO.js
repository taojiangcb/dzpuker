var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var SeatPlayerVO = (function () {
        // public safeAdd: number;//保险获利
        function SeatPlayerVO(data) {
            if (data === void 0) { data = null; }
            this.outType = -1; //标识是否已经离开 播放结算结束后离开 默认-1  0普通离开 1 服务端超时离开 -2好友查看
            if (data != null) {
                var vo = AppGlobal.getMessage("SeatPlayerVO").decode(data);
                this.setData(vo);
            }
        }
        SeatPlayerVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            // this.name = vo.name; 
            if (vo.nameutf8)
                this.name = vo.nameutf8;
            else
                this.name = FormatUtils.protoToGBK(vo.name); // utils.NativeUtils.ToGBKString(vo.name1.buffer, vo.name1.offset, vo.name1.limit - vo.name1.offset);	
            this.namedata = vo.name;
            this.nameutf8 = vo.nameutf8;
            this.sex = vo.sex;
            this.avatarID = vo.avatarID;
            this.vipLevel = vo.vipLevel;
            this.seatId = vo.seatId;
            this.totalBringBet = vo.totalBringBet;
            this.nowBet = vo.nowBet;
            if (this.nowBet == null || isNaN(this.nowBet))
                this.nowBet = 0;
            this.isAllIn = vo.isAllIn;
            this.isFold = vo.isFold;
            this.isPlay = vo.isPlay;
            this.totalBet = vo.totalBet;
            this.rcheck = vo.rcheck;
            this.rlabel = vo.rlabel;
            this.turnBet = vo.turnBet;
            this.myCard = vo.myCard;
            this.numWins = vo.numWins;
            this.numLosts = vo.numLosts;
            this.numPeaces = vo.numPeaces;
            this.numEscapes = vo.numEscapes;
            this.raiseTime = vo.raiseTime;
            if (this.raiseTime == null)
                this.raiseTime = 0;
            vo = null;
        };
        SeatPlayerVO.prototype.getProtoVO = function () {
            var vo = AppGlobal.getMessageVO("SeatPlayerVO");
            vo.roleId = __SET_INT64(this.roleId);
            if (this.namedata != null)
                vo.name = this.namedata;
            vo.nameutf8 = this.nameutf8;
            if (this.sex != null)
                vo.sex = this.sex;
            if (this.avatarID == undefined)
                this.avatarID = null;
            vo.avatarID = this.avatarID;
            if (this.vipLevel != null)
                vo.vipLevel = this.vipLevel;
            vo.seatId = this.seatId;
            vo.totalBringBet = this.totalBringBet;
            vo.nowBet = this.nowBet;
            vo.isAllIn = this.isAllIn;
            vo.isFold = this.isFold;
            vo.isPlay = true; //this.isPlay;
            vo.totalBet = this.totalBet;
            if (this.rcheck != null)
                vo.rcheck = this.rcheck;
            if (this.rlabel != null)
                vo.rlabel = this.rlabel;
            vo.turnBet = this.turnBet;
            vo.myCard = this.myCard;
            if (this.numWins != null)
                vo.numWins = this.numWins;
            if (this.numLosts != null)
                vo.numLosts = this.numLosts;
            if (this.numPeaces != null)
                vo.numPeaces = this.numPeaces;
            if (this.numEscapes != null)
                vo.numEscapes = this.numEscapes;
            if (this.raiseTime != null)
                vo.raiseTime = this.raiseTime;
            return vo;
        };
        /**
         * 牌局开始重置
         */
        SeatPlayerVO.prototype.reset = function (isplay) {
            if (isplay === void 0) { isplay = true; }
            this.isAllIn = false;
            this.isFold = false; //是否弃牌	
            this.isPlay = isplay; //是否入局
            this.totalBet = 0; //总下注
            this.raiseTime = 0;
            this.turnBet = 0; //当前轮下注
            this.myCard = []; //我的手牌
            // this.safeAdd = null;
        };
        return SeatPlayerVO;
    }());
    appvos.SeatPlayerVO = SeatPlayerVO;
    __reflect(SeatPlayerVO.prototype, "appvos.SeatPlayerVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=SeatPlayerVO.js.map