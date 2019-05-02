var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var GameEndInfoVO = (function () {
        function GameEndInfoVO(data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var vo = AppGlobal.getMessage("GameEndInfoVO").decode(data);
                this.setData(vo);
            }
            else {
                this.winPool = [];
                this.card = [];
            }
        }
        GameEndInfoVO.prototype.setData = function (vo) {
            if (vo == null) {
                return;
            }
            this.seatId = vo.seatId;
            this.betNum = vo.betNum;
            var i = 0;
            var len = 0;
            this.card = [];
            len = vo.card.length;
            for (i = 0; i < len; i++) {
                this.card[i] = vo.card[i];
            }
            ;
            this.winPool = [];
            len = vo.winPool.length;
            for (i = 0; i < len; i++) {
                this.winPool[i] = vo.winPool[i];
            }
            ;
            this.addBetNum = vo.addBetNum;
            this.gameResult = vo.gameResult;
            this.canContinue = vo.canContinue;
            this.huntFlag = vo.huntFlag;
            if (vo.winlostnum != null)
                this.winlostnum = vo.winlostnum.toNumber();
            if (vo.insurnum != null)
                this.insurnum = vo.insurnum.toNumber();
            vo = null;
        };
        GameEndInfoVO.prototype.getProtoVO = function () {
            var vo = AppGlobal.getMessageVO("GameEndInfoVO");
            vo.seatId = this.seatId;
            if (this.betNum != null && !isNaN(this.betNum))
                vo.betNum = this.betNum;
            var i = 0;
            var len = 0;
            vo.card = [];
            len = this.card.length;
            for (i = 0; i < len; i++) {
                vo.card[i] = this.card[i];
            }
            ;
            vo.winPool = [];
            len = this.winPool.length;
            for (i = 0; i < len; i++) {
                vo.winPool[i] = this.winPool[i];
            }
            ;
            if (this.addBetNum != null)
                vo.addBetNum = this.addBetNum;
            if (this.gameResult != null)
                vo.gameResult = this.gameResult;
            if (this.canContinue != null)
                vo.canContinue = this.canContinue;
            if (this.huntFlag != null)
                vo.huntFlag = this.huntFlag;
            if (this.winlostnum != null)
                vo.winlostnum = this.winlostnum;
            if (this.insurnum != null)
                vo.insurnum = this.insurnum;
            return vo;
        };
        GameEndInfoVO.prototype.toArrayBuffer = function () {
            var vo = this.getProtoVO();
            return vo.toArrayBuffer();
        };
        return GameEndInfoVO;
    }());
    appvos.GameEndInfoVO = GameEndInfoVO;
    __reflect(GameEndInfoVO.prototype, "appvos.GameEndInfoVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=GameEndInfoVO.js.map