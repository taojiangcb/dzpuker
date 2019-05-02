var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var DealerTableVO = (function () {
        function DealerTableVO() {
        }
        DealerTableVO.prototype.getRoomVOById = function (roomid) {
            var roomVO = null;
            for (var i = 0; i < room.getProxy().room7.length; i++) {
                if (roomid == room.getProxy().room7[i].svrOfsId) {
                    roomVO = room.getProxy().room7[i];
                    break;
                }
            }
            return roomVO;
        };
        DealerTableVO.prototype.updateRoomVO = function () {
            var roomVO = this.getRoomVOById(this.dealerInfoVO.roomid);
            if (roomVO) {
                this.roomVO = roomVO;
            }
            this.numPlayers = this.roomVO.online ? this.roomVO.online : 0;
        };
        return DealerTableVO;
    }());
    appvos.DealerTableVO = DealerTableVO;
    __reflect(DealerTableVO.prototype, "appvos.DealerTableVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=DealerTableVO.js.map