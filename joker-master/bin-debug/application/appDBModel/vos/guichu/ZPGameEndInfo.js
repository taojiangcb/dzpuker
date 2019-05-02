var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var ZPGameEndInfo = (function () {
        function ZPGameEndInfo(data) {
            this.card = 0; //牌信息
            this.showrand = 0; //显示随机
            this.infoVO = []; //玩家结算信息
            if (data) {
                var vo = AppGlobal.getMessage("ZPGameEndVO").decode(data);
                this.setData(vo);
            }
        }
        ZPGameEndInfo.prototype.setData = function (data) {
            if (data) {
                this.card = data.card;
                this.showrand = data.showrand;
                if (data.infoVO) {
                    var item;
                    var len = data.infoVO.length;
                    for (var i = 0; i < len; i++) {
                        item = new appvos.ZPInfoVO(data.infoVO[i]);
                        this.infoVO.push(item);
                    }
                }
            }
            else {
                this.clear();
            }
        };
        ZPGameEndInfo.prototype.clear = function () {
            this.card = 0;
            this.showrand = 0;
            this.infoVO = [];
        };
        return ZPGameEndInfo;
    }());
    appvos.ZPGameEndInfo = ZPGameEndInfo;
    __reflect(ZPGameEndInfo.prototype, "appvos.ZPGameEndInfo");
})(appvos || (appvos = {}));
//# sourceMappingURL=ZPGameEndInfo.js.map