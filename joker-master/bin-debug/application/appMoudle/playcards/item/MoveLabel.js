var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    /**
     *飘字
     * @author
     *
     */
    var MoveLabel = (function (_super) {
        __extends(MoveLabel, _super);
        function MoveLabel() {
            var _this = _super.call(this) || this;
            _this.move = new gameabc.LineMove();
            _this.move.alltime = 0.8;
            _this.textAlign = egret.HorizontalAlign.CENTER;
            return _this;
        }
        MoveLabel.prototype.goto = function (fromX, fromY, toX, toY, delay, recallfun, recallthis) {
            if (toX === void 0) { toX = 0; }
            if (toY === void 0) { toY = 0; }
            if (delay === void 0) { delay = 0; }
            if (recallfun === void 0) { recallfun = null; }
            if (recallthis === void 0) { recallthis = null; }
            egret.Ticker.getInstance().register(this.advanceTime, this);
            this.recallthis = recallthis;
            this.recallfun = recallfun;
            this.move.go(fromX, fromY, toX, toY);
            this.move.delay = delay;
            this.x = fromX;
            this.y = fromY;
        };
        MoveLabel.prototype.advanceTime = function (time) {
            time = time / 1000;
            this.move.advanceTime(time);
            this.x = this.move.x;
            this.y = this.move.y;
            this.visible = this.move.delay <= 0;
            if (this.move.isComplete) {
                egret.Ticker.getInstance().unregister(this.advanceTime, this);
                gameabc.setTimeout(this.over, this, 1000);
            }
        };
        MoveLabel.prototype.over = function () {
            if (this.recallfun != null) {
                this.recallfun.call(this.recallthis, this);
                this.recallfun = null;
                this.data = null;
            }
            MoveLabel.toPool(this);
        };
        MoveLabel.fromPool = function () {
            if (MoveLabel.sItemPool.length)
                return MoveLabel.sItemPool.pop();
            else {
                return new MoveLabel();
            }
        };
        MoveLabel.toPool = function (item) {
            // item.scaleX = item.scaleY = 1;
            item.removeFromParent();
            if (MoveLabel.sItemPool.length < 5 && MoveLabel.sItemPool.indexOf(item) == -1)
                MoveLabel.sItemPool.push(item);
        };
        return MoveLabel;
    }(eui.Label));
    /**
    * 对象池
    */
    MoveLabel.sItemPool = [];
    playcards.MoveLabel = MoveLabel;
    __reflect(MoveLabel.prototype, "playcards.MoveLabel");
})(playcards || (playcards = {}));
//# sourceMappingURL=MoveLabel.js.map