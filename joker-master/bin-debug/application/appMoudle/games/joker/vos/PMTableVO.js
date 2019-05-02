var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var PMTableVO = (function () {
        function PMTableVO(data) {
            this.gTableId = 1; //房间ID
            this.stockNum = 2; //总奖池
            this.FreeNum = 3; //免费次数
            this.totalMoney = 4; //总筹码
            this.infoVO = null; //牌局信息 有可能没有
            if (data) {
                var vo = AppGlobal.getMessage("PMTableVO").decode(data);
                if (vo)
                    this.setData(vo);
            }
        }
        PMTableVO.prototype.setData = function (data) {
            if (data) {
                this.gTableId = data.gTableId;
                this.stockNum = data.stockNum;
                this.FreeNum = data.FreeNum;
                this.totalMoney = data.totalMoney;
                if (data.infoVO) {
                    this.infoVO = new appvos.PMInfoVO();
                    this.infoVO.setData(data.infoVO);
                }
            }
            else {
                this.clear();
            }
        };
        PMTableVO.prototype.clear = function () {
            this.gTableId = 0;
            this.stockNum = 0;
            this.FreeNum = 0;
            this.totalMoney = 0;
            this.infoVO = null;
        };
        return PMTableVO;
    }());
    appvos.PMTableVO = PMTableVO;
    __reflect(PMTableVO.prototype, "appvos.PMTableVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=PMTableVO.js.map