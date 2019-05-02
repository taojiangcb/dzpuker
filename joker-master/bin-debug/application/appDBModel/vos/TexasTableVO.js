var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var TexasTableVO = (function () {
        function TexasTableVO(data) {
            if (data === void 0) { data = null; }
            this._whoplay = -1; //轮到谁
            this.caishentime = 0; //财神送礼轮数 0不开放 >0 每多少轮发放
            this.caishenmoney = 0; //财神送礼金额
            this.caishenround = 0; //财神送礼当前轮数
            if (data != null) {
                var vo = AppGlobal.getMessage("TexasTableVO").decode(data);
                this.setData(vo);
            }
        }
        Object.defineProperty(TexasTableVO.prototype, "whoplay", {
            get: function () {
                return this._whoplay;
            },
            set: function (value) {
                if (isNaN(value) || value == null || value >= this.tableSize)
                    value = -1;
                this._whoplay = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 从牌桌中搜索某个玩家
         */
        TexasTableVO.prototype.searchPlayerInSeats = function (roleid) {
            for (var i = 0, len = this.seatPlayerVO.length; i < len; i++) {
                var seatVo = this.seatPlayerVO[i];
                if (seatVo.roleId == roleid) {
                    return seatVo;
                }
            }
            return null;
        };
        TexasTableVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.gTableId = vo.gTableId;
            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            // this.roomName = vo.roomName;
            this.tableSize = vo.tableSize;
            this.minJoinMoney = vo.minJoinMoney;
            this.maxMagnification = Math.floor(vo.maxMagnification / vo.minJoinMoney);
            this.gameEndTime = vo.gameEndTime == null ? 0 : vo.gameEndTime.toNumber();
            this.bbBet = vo.bbBet;
            this.sbBet = vo.bbBet >> 1;
            this.whoplay = vo.whoplay;
            this.banker = vo.banker;
            this.gameStatus = vo.gameStatus;
            this.timeCount = vo.timeCount;
            this.totalBet = vo.totalBet;
            this.caishentime = vo.caishentime ? vo.caishentime : 0;
            this.caishenmoney = vo.caishenmoney ? vo.caishenmoney : 0;
            this.caishenround = vo.caishenround ? vo.caishenround : 0;
            var i = 0;
            var len = 0;
            this.globalCards = [];
            len = vo.globalCards.length;
            for (i = 0; i < len; i++) {
                this.globalCards[i] = vo.globalCards[i];
            }
            if (vo.seatPlayerVO) {
                this.seatPlayerVO = [];
                len = vo.seatPlayerVO.length;
                for (i = 0; i < len; i++) {
                    this.seatPlayerVO[i] = new appvos.SeatPlayerVO();
                    this.seatPlayerVO[i].setData(vo.seatPlayerVO[i]);
                }
            }
            else {
                this.seatPlayerVO = null;
            }
            if (vo.joinPlayerVO) {
                this.joinPlayerVO = [];
                len = vo.joinPlayerVO.length;
                for (i = 0; i < len; i++) {
                    this.joinPlayerVO[i] = new appvos.JoinPlayerVO();
                    this.joinPlayerVO[i].setData(vo.joinPlayerVO[i]);
                }
            }
            else {
                this.joinPlayerVO = null;
            }
            this.tableStatus = vo.tableStatus;
            this.maxPot = vo.maxPot;
            this.totalHand = vo.totalHand;
            this.pots = [];
            len = vo.pots.length;
            for (i = 0; i < len; i++) {
                this.pots[i] = vo.pots[i];
            }
            this.preBet = vo.preBet;
            if (isNaN(vo.timeLast))
                this.nowTime = 0;
            else
                this.nowTime = vo.timeLast * 1000;
            this.roommode = vo.roommode;
            this.dealer = vo.dealer;
            this.dealerstate = vo.dealerstate;
            this.roomtype = vo.roomtype; // 房间类型 0 未知 1 金币 2 普通4W 3 40W 4 SNG MTT
            this.cardmode = vo.cardmode; // 0 正常 1 5-A
            this.whiteReporter = vo.whiteReporter;
            this.versionNum = vo.versionNum;
            vo = null;
        };
        TexasTableVO.prototype.getProtoVO = function () {
            var vo = AppGlobal.getMessageVO("TexasTableVO");
            vo.gTableId = this.gTableId;
            vo.roleId = __SET_INT64(this.roleId);
            vo.tableSize = this.tableSize;
            vo.minJoinMoney = this.minJoinMoney;
            vo.maxMagnification = this.maxMagnification * this.minJoinMoney;
            vo.gameEndTime = __SET_INT64(this.gameEndTime);
            vo.bbBet = this.bbBet;
            vo.whoplay = this.whoplay;
            vo.banker = this.banker;
            vo.gameStatus = this.gameStatus;
            if (this.timeCount != null)
                vo.timeCount = this.timeCount;
            vo.totalBet = this.totalBet;
            vo.caishentime = this.caishentime;
            vo.caishenmoney = this.caishenmoney;
            vo.caishenround = this.caishenround;
            var i = 0;
            var len = 0;
            vo.globalCards = [];
            len = this.globalCards.length;
            for (i = 0; i < len; i++) {
                vo.globalCards[i] = this.globalCards[i];
            }
            vo.seatPlayerVO = [];
            len = this.seatPlayerVO.length;
            for (i = 0; i < len; i++) {
                vo.seatPlayerVO[i] = this.seatPlayerVO[i].getProtoVO();
            }
            ;
            // if (vo.joinPlayerVO) { this.joinPlayerVO = []; len = vo.joinPlayerVO.length; for (i = 0; i < len; i++) { this.joinPlayerVO[i] = new JoinPlayerVO(); this.joinPlayerVO[i].setData(vo.joinPlayerVO[i]); } } else { this.joinPlayerVO = null; }
            vo.tableStatus = this.tableStatus;
            if (this.maxPot != null)
                vo.maxPot = this.maxPot;
            if (this.totalHand != null)
                vo.totalHand = this.totalHand;
            vo.pots = [];
            len = this.pots.length;
            for (i = 0; i < len; i++) {
                vo.pots[i] = this.pots[i];
            }
            vo.preBet = this.preBet;
            vo.timeLast = this.nowTime / 1000;
            if (this.roommode != null)
                vo.roommode = this.roommode;
            if (this.dealer)
                vo.dealer = this.dealer;
            if (this.roomtype != null)
                vo.roomtype = this.roomtype;
            if (this.cardmode != null)
                vo.cardmode = this.cardmode;
            if (this.whiteReporter != null)
                vo.whiteReporter = this.whiteReporter;
            if (this.versionNum != null)
                vo.versionNum = this.versionNum;
            return vo;
        };
        TexasTableVO.prototype.clone = function () {
            var vo = new TexasTableVO();
            vo.setData(this.getProtoVO());
            return vo;
        };
        TexasTableVO.prototype.toArrayBuffer = function () {
            var vo = this.getProtoVO();
            return vo.toArrayBuffer();
        };
        return TexasTableVO;
    }());
    appvos.TexasTableVO = TexasTableVO;
    __reflect(TexasTableVO.prototype, "appvos.TexasTableVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=TexasTableVO.js.map