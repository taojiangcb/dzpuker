// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    /**
     * 初始化时的桌子信息
     */
    var ZPTableVO = (function () {
        function ZPTableVO(data) {
            this.gTableId = 0; //房间ID
            this.roleId = 0; //房主ID(当前机号)
            this.roomName = ""; //房间名称
            this.tableSize = 0; //桌子人数
            this.gameStatus = 0; //游戏状态
            this.timeLast = 0; //倒计时剩余
            this.PlayerVO = []; //玩家列表
            this.winHistory = 0; //历史记录
            this.stockNum = 0; //总奖池
            this.FreeNum = 0; //免费次数
            this.nowTime = 0; //当前时间  
            this.nowTimeLast = 0; //当前状态持续到
            this.seatID = 0; //位置号
            this.totalMoney = 0; //总筹码
            if (data != null) {
                var vo = AppGlobal.getMessage("ZPTableVO").decode(data);
                this.setData(vo);
            }
        }
        ZPTableVO.prototype.setData = function (data) {
            if (data) {
                this.gTableId = data.gTableId;
                this.roleId = data.roleId;
                this.roomName = data.roomName;
                this.tableSize = data.tableSize;
                this.gameStatus = data.gameStatus;
                this.timeLast = data.timeLast;
                if (data.PlayerVO) {
                    this.PlayerVO = [];
                    var len = data.PlayerVO.length;
                    var pItem;
                    for (var i = 0; i < len; i++) {
                        pItem = new appvos.ZPPlayerVO();
                        pItem.setData(data.PlayerVO[i]);
                        this.PlayerVO.push(pItem);
                    }
                }
                this.winHistory = data.winHistory;
                this.stockNum = data.stockNum;
                this.seatID = data.seatID;
                this.totalMoney = data.totalMoney;
                this.FreeNum = data.FreeNum;
                this.nowTime = data.nowTime;
                this.nowTimeLast = data.nowTimeLast;
            }
            else {
                this.clear();
            }
        };
        ZPTableVO.prototype.clear = function () {
            this.gTableId = 0;
            this.roleId = 0;
            this.roomName = "";
            this.tableSize = 0;
            this.gameStatus = 0;
            this.timeLast = 0;
            this.PlayerVO = [];
            this.winHistory = 0;
            this.stockNum = 0;
        };
        return ZPTableVO;
    }());
    appvos.ZPTableVO = ZPTableVO;
    __reflect(ZPTableVO.prototype, "appvos.ZPTableVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=ZPTableVO.js.map