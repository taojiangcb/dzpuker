var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 扑克牌门数选择容器组件
 */
var joker;
(function (joker) {
    var JokerPKC4H = (function (_super) {
        __extends(JokerPKC4H, _super);
        function JokerPKC4H(cardSkinName, count) {
            if (cardSkinName === void 0) { cardSkinName = ""; }
            if (count === void 0) { count = 4; }
            var _this = _super.call(this) || this;
            _this.patternsCount = 4;
            _this.cardSkinName = joker.DEFAULT_CARD_SKIN;
            _this.cardScale = 0.58;
            _this.cardHSpace = 2; //每张牌的水平间隔
            _this.hspace = 15; //每手牌的水平间隔
            _this.vspace = 15; //每手牌的垂直间隔
            _this.columns = 2;
            _this.pplist = [];
            _this.patternsCount = count;
            _this.cardSkinName = cardSkinName;
            return _this;
        }
        JokerPKC4H.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.arrageHandler();
        };
        JokerPKC4H.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            for (var i = 0; i < this.patternsCount; i++) {
                var ppc = new joker.JokerPkPatternsComp();
                this.addChild(ppc);
                this.pplist.push(ppc);
            }
        };
        /**
         * 排列处理，不带动画
         */
        JokerPKC4H.prototype.arrageHandler = function () {
            var rows = Math.ceil(this.patternsCount / this.columns);
            var c = 0, r = 0;
            var index = 0;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < this.columns; j++) {
                    var pp = this.pplist[index];
                    pp.arrageAnimateion.space = this.cardHSpace;
                    pp.arrageAnimateion.normalArrage();
                    pp.scaleX = pp.scaleY = this.cardScale;
                    var tempW = this.pplist[0].width * this.cardScale;
                    var tempH = this.pplist[0].height * this.cardScale;
                    pp.x = j * (tempW + this.hspace);
                    pp.y = i * (tempH + this.vspace);
                    index++;
                }
            }
        };
        /**
         * 排列处理，带动画
         */
        JokerPKC4H.prototype.arrageHandlerTween = function (hspace, vspace, cardHSpace, columns, cardScale) {
            this.hspace = hspace;
            this.vspace = vspace;
            this.cardHSpace = cardHSpace;
            this.columns = columns;
            this.cardScale = cardScale;
            var rows = Math.ceil(this.patternsCount / this.columns);
            var c = 0, r = 0;
            var index = 0;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < this.columns; j++) {
                    var pp = this.pplist[index];
                    pp.arrageAnimateion.space = this.cardHSpace;
                    pp.arrageAnimateion.normalArrage();
                    pp.scaleX = pp.scaleY = this.cardScale;
                    var tempW = this.pplist[0].width * this.cardScale;
                    var tempH = this.pplist[0].height * this.cardScale;
                    pp.x = j * (tempW + this.hspace);
                    pp.y = i * (tempH + this.vspace);
                    index++;
                }
            }
        };
        /**
         * 翻牌，牌值要有5个参数,不要翻的牌参数给0
         */
        JokerPKC4H.prototype.tumover = function (cards) {
            if (cards == null)
                return;
            for (var i = 0; i < cards.length; i++) {
                if (i < this.pplist.length) {
                    this.pplist[i].tumover(cards[i].cards);
                }
            }
        };
        JokerPKC4H.prototype.dispose = function () {
            if (this.pplist) {
                this.pplist.forEach(function (element) {
                    egret.Tween.removeTweens(element);
                    element.removeFromParent(true);
                });
            }
            this.pplist = null;
            _super.prototype.dispose.call(this);
        };
        return JokerPKC4H;
    }(gameabc.UICustomComponent));
    joker.JokerPKC4H = JokerPKC4H;
    __reflect(JokerPKC4H.prototype, "joker.JokerPKC4H");
})(joker || (joker = {}));
//# sourceMappingURL=JokerPKC4H.js.map