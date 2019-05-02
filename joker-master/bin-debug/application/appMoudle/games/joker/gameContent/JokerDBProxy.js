var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var joker;
(function (joker) {
    function getProxy() {
        return __GET_PROXY(JokerDBProxy);
    }
    joker.getProxy = getProxy;
    var JokerDBProxy = (function (_super) {
        __extends(JokerDBProxy, _super);
        function JokerDBProxy(name, data) {
            var _this = _super.call(this, JokerDBProxy.NAME, data) || this;
            /**
             * 换牌时被弃掉的牌
             */
            _this.discard = [];
            /**
             * 投注门数
             */
            _this.handlerCount = [1, 5, 10, 25, 50];
            /**
             * 投入的金额
             */
            _this.ratios = [10, 50, 100, 500, 1000, 5000];
            /**
             * 当前选择的门数
             */
            _this.nowCount = 0;
            /**
             * 当前投入的金额
             */
            _this.nowBet = 0;
            /**
             * 当前的倍率
             */
            _this.nowRatio = 1;
            /**
             * 最大倍率
             */
            _this.MAX_RATIO = 5;
            /**
             * 最小倍率
             */
            _this.MIN_RATIO = 1;
            return _this;
        }
        /**
         * 桌子信息
         */
        JokerDBProxy.prototype.setTableInfo = function (info) {
            this.tableInfo = info;
            __SEND_NOTIFICATION(joker.JokerGameMediator.TABLE_INITIALIZED);
        };
        /**
         * 获取当前桌子信息
         */
        JokerDBProxy.prototype.getTableInfo = function () {
            return this.tableInfo;
        };
        /**
         * 验证是否可以下注
         */
        JokerDBProxy.prototype.validation = function () {
            return true;
        };
        /**
         * 下注之后服务器返回的下注信息处理
         */
        JokerDBProxy.prototype.setBetInfo = function (info) {
            this.betInfo = info;
            if (this.betInfo.card && this.betInfo.card.cards) {
                //计算自己起始的牌型
                this.handCardResult = playcards.getProxy().getCardResult(this.betInfo.card.cards);
            }
            else {
                console.log("");
            }
        };
        /**
         * 随机获取5张牌
         */
        JokerDBProxy.prototype.getFiveRandomCard = function () {
            var res = [];
            var CARD_LEN = 5;
            while (res.length < CARD_LEN) {
                var index = Math.floor(Math.random() * 52);
                var randomValue = playcards.getProxy().m_cbCardData[index];
                if (res.indexOf(randomValue) == -1) {
                    res.push(randomValue);
                }
            }
            return res;
        };
        /**
         * 获取下注信息
         */
        JokerDBProxy.prototype.getBetInfo = function () {
            return this.betInfo;
        };
        /**
         * 下注时的手牌
         */
        JokerDBProxy.prototype.getHandCardResult = function () {
            return this.handCardResult;
        };
        JokerDBProxy.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return JokerDBProxy;
    }(app.mvc.AbsractProxy));
    JokerDBProxy.NAME = "__JOKDER_DB_PROXY__";
    joker.JokerDBProxy = JokerDBProxy;
    __reflect(JokerDBProxy.prototype, "joker.JokerDBProxy");
})(joker || (joker = {}));
//# sourceMappingURL=JokerDBProxy.js.map