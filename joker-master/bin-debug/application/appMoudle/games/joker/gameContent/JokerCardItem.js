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
    var JokerCardItem = (function (_super) {
        __extends(JokerCardItem, _super);
        function JokerCardItem() {
            var _this = _super.call(this) || this;
            _this.lock = false;
            _this.skinName = "JokerCardItemSkin";
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        JokerCardItem.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.img_baoliu.visible = this.lock;
        };
        JokerCardItem.prototype.setLock = function (val) {
            this.lock = val;
            if (this.initialized) {
                this.img_baoliu.visible = val;
            }
        };
        JokerCardItem.prototype.getLock = function () {
            return this.lock;
        };
        return JokerCardItem;
    }(playcards.CardItem));
    joker.JokerCardItem = JokerCardItem;
    __reflect(JokerCardItem.prototype, "joker.JokerCardItem");
})(joker || (joker = {}));
//# sourceMappingURL=JokerCardItem.js.map