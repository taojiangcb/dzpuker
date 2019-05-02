var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var joker;
(function (joker) {
    var logic;
    function gameLogic() {
        if (logic == null) {
            logic = new JokerGameLogic();
        }
        return logic;
    }
    joker.gameLogic = gameLogic;
    function destoryGameLogic() {
        if (logic)
            logic.dispose();
        logic = null;
    }
    joker.destoryGameLogic = destoryGameLogic;
    var JokerGameLogic = (function () {
        function JokerGameLogic() {
            this.heartId = 0;
        }
        /**
         * 游戏开始
         */
        JokerGameLogic.prototype.gameStart = function () {
            var urlData = utils.NativeUtils.getURLObj();
            if (urlData["userid"] == null) {
                __CLOSE_ALLMOUDLE_OPEN(AppReg.JOKER_DEBUG_LOGIN);
            }
            else {
                __CLOSE_ALLMOUDLE_OPEN(AppReg.JOKER_AUTO_LOGN);
            }
        };
        /**
         * 开始心跳
         */
        JokerGameLogic.prototype.beginHeart = function () {
            egret.clearInterval(this.heartId);
            this.heartId = egret.setInterval(function () {
                __PVO().to(app.NetAction.JOKER_REQ_HEART_BEAT);
            }, this, 10000);
        };
        JokerGameLogic.prototype.stopHeart = function () {
            egret.clearInterval(this.heartId);
        };
        JokerGameLogic.prototype.dispose = function () {
            this.stopHeart();
        };
        return JokerGameLogic;
    }());
    joker.JokerGameLogic = JokerGameLogic;
    __reflect(JokerGameLogic.prototype, "joker.JokerGameLogic", ["games.IGameLogic", "gameabc.IDisposer"]);
})(joker || (joker = {}));
//# sourceMappingURL=JokerGameLogic.js.map