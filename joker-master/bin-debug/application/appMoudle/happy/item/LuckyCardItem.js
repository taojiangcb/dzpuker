var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var LuckyCardItem = (function (_super) {
        __extends(LuckyCardItem, _super);
        function LuckyCardItem() {
            var _this = _super.call(this) || this;
            _this.bgimg = "card_bg_png";
            _this.skinName = "LuckyCardItemSkin";
            _this.touchEnabled = true;
            return _this;
        }
        /**显示牌背 */
        LuckyCardItem.prototype.setCardBack = function () {
            _super.prototype.setCardBack.call(this);
            this.cardvalueImg.visible = false;
        };
        /**设置图片id(proxy:m_cbCardData) */
        LuckyCardItem.prototype.setCardId = function (id) {
            this.cardid = id;
            this.cardImg.scaleX = 1;
            this.visible = true;
            this.cardImg.source = this.bgimg;
            this.cardvalueImg.source = "card_" + id + "_png";
            this.cardvalueImg.visible = true;
        };
        /**显示高亮 */
        LuckyCardItem.prototype.showLight = function () {
            this.darkImg.visible = true;
            // this.addChildAt(this.darkImg, 0);
        };
        LuckyCardItem.prototype.hideLight = function () {
            this.darkImg.visible = false;
        };
        /**翻牌 先赋值this.cardid */
        LuckyCardItem.prototype.turnOver = function () {
            this.cardvalueImg.visible = false;
            this.cardImg.scaleX = 1;
            if (this.move == null) {
                this.move = new gameabc.LineMove();
                this.move.alltime = this.alltime;
            }
            this.times = 0;
            this.move.go(10, 0, 2, 0);
            egret.Ticker.getInstance().register(this.advanceTime, this);
            this.darkImg.visible = false;
        };
        LuckyCardItem.prototype.advanceTime = function (time) {
            // time = time / 1000;
            this.move.advanceTime(time);
            this.cardImg.scaleX = this.move.x / 10;
            if (this.move.isComplete) {
                if (this.times > 2 && this.cardImg.source == this.bgimg) {
                    this.darkImg.visible = true;
                    this.setCardId(this.cardid);
                    egret.Ticker.getInstance().unregister(this.advanceTime, this);
                }
                else {
                    if (this.cardImg.scaleX < 1) {
                        this.move.go(2, 0, 10, 0);
                        this.cardImg.scaleX = 0.2;
                        if (this.cardImg.source == this.bgimg)
                            this.setCardBack();
                        else
                            this.cardImg.source = this.bgimg;
                    }
                    else {
                        this.move.go(10, 0, 2, 0);
                        this.times++;
                    }
                }
            }
        };
        LuckyCardItem.prototype.turnCard = function (cardid) {
            this.cardid = cardid;
            this.turnOver();
        };
        return LuckyCardItem;
    }(playcards.CardItem));
    happy.LuckyCardItem = LuckyCardItem;
    __reflect(LuckyCardItem.prototype, "happy.LuckyCardItem");
})(happy || (happy = {}));
//# sourceMappingURL=LuckyCardItem.js.map