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
    var MoveText = (function (_super) {
        __extends(MoveText, _super);
        function MoveText() {
            var _this = _super.call(this) || this;
            _this.move = new gameabc.LineMove();
            _this.move.alltime = 0.8;
            _this.font = "fnt03_fnt";
            _this.textAlign = egret.HorizontalAlign.CENTER;
            return _this;
        }
        MoveText.prototype.goto = function (fromX, fromY, toX, toY, delay, recallfun, recallthis) {
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
        MoveText.prototype.advanceTime = function (time) {
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
        MoveText.prototype.over = function () {
            if (this.recallfun != null) {
                this.recallfun.call(this.recallthis, this);
                this.recallfun = null;
                this.data = null;
            }
            MoveText.toPool(this);
        };
        MoveText.fromPool = function () {
            if (MoveText.sItemPool.length)
                return MoveText.sItemPool.pop();
            else {
                return new MoveText();
            }
        };
        MoveText.toPool = function (item) {
            // item.scaleX = item.scaleY = 1;
            item.removeFromParent();
            if (MoveText.sItemPool.length < 5 && MoveText.sItemPool.indexOf(item) == -1)
                MoveText.sItemPool.push(item);
        };
        return MoveText;
    }(eui.BitmapLabel));
    /**
    * 对象池
    */
    MoveText.sItemPool = [];
    playcards.MoveText = MoveText;
    __reflect(MoveText.prototype, "playcards.MoveText");
})(playcards || (playcards = {}));
//# sourceMappingURL=MoveText.js.map