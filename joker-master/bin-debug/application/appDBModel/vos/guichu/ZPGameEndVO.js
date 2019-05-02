var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var ZPGameEndVO = (function () {
        function ZPGameEndVO(data) {
            this.card = 0; //牌信息
            this.showrand = 0; //显示随机
            this.infoVO = []; //玩家结算信息
            if (data) {
                var vo = AppGlobal.getMessage("ZPGameEndVO").decode(data);
                this.setData(vo);
            }
        }
        ZPGameEndVO.prototype.setData = function (data) {
            if (data) {
                this.card = data.card;
                this.showrand = data.showrand;
                if (data.infoVO) {
                    this.infoVO = [];
                    for (var i = 0; i < data.infoVO.length; i++) {
                        var item = new appvos.ZPInfoVO();
                        item.setData(data.infoVO[i]);
                        this.infoVO.push(item);
                    }
                }
            }
            else {
                this.clear();
            }
        };
        ZPGameEndVO.prototype.clear = function () {
            this.card = 0;
            this.showrand = 0;
            this.infoVO = [];
        };
        return ZPGameEndVO;
    }());
    appvos.ZPGameEndVO = ZPGameEndVO;
    __reflect(ZPGameEndVO.prototype, "appvos.ZPGameEndVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=ZPGameEndVO.js.map