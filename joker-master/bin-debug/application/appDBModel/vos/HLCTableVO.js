var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var HLCTableVO = (function () {
        function HLCTableVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("HLCTableVO").decode(data);
                this.setData(vo);
            }
        }
        HLCTableVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.gTableId = vo.gTableId;
            this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();
            this.roomName = vo.roomName;
            this.tableSize = vo.tableSize;
            this.gameStatus = vo.gameStatus;
            this.timeLast = vo.timeLast;
            this.winHistory = vo.winHistory;
            this.servicePay = vo.servicePay;
            this.bankServicePay = vo.bankServicePay;
            this.chatPay = vo.chatPay;
            this.anteDouble = vo.anteDouble == 1;
            this.allbets = [0, 0, 0, 0];
            var i = 0;
            var len = 0;
            if (vo.PlayerVO) {
                this.playerVO = [];
                this.seatPlayerVO = [];
                this.noSeatPlayerVO = [];
                this.allPlayerVO = {};
                len = vo.PlayerVO.length;
                var player;
                for (i = 0; i < len; i++) {
                    player = this.playerVO[i] = new appvos.HLCPlayerVO();
                    player.setData(vo.PlayerVO[i]);
                    this.allPlayerVO[player.seatId] = player;
                    if (player.showPos == null)
                        player.showPos = 0;
                    if (player.showPos > 0) {
                        this.seatPlayerVO.push(player);
                    }
                    else
                        this.noSeatPlayerVO.push(player);
                    this.allbets[0] += player.posBet1;
                    this.allbets[1] += player.posBet2;
                    this.allbets[2] += player.posBet3;
                    this.allbets[3] += player.posBet4;
                }
            }
            else {
                this.playerVO = null;
            }
            vo = null;
        };
        HLCTableVO.prototype.clear = function () {
            this.allbets = [0, 0, 0, 0];
        };
        return HLCTableVO;
    }());
    appvos.HLCTableVO = HLCTableVO;
    __reflect(HLCTableVO.prototype, "appvos.HLCTableVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=HLCTableVO.js.map