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
     *飘图片
     * @author
     *
     */
    var MoveImage = (function (_super) {
        __extends(MoveImage, _super);
        function MoveImage(source) {
            var _this = _super.call(this, source) || this;
            _this.delayremove = 0;
            _this.move = new gameabc.LineMove();
            _this.move.alltime = 0.3;
            return _this;
        }
        MoveImage.prototype.goto = function (fromX, fromY, toX, toY, delay, recallfun, recallthis, params, alltime) {
            if (toX === void 0) { toX = 0; }
            if (toY === void 0) { toY = 0; }
            if (delay === void 0) { delay = 0; }
            if (recallfun === void 0) { recallfun = null; }
            if (recallthis === void 0) { recallthis = null; }
            if (params === void 0) { params = null; }
            if (alltime === void 0) { alltime = 0.24; }
            egret.Ticker.getInstance().register(this.advanceTime, this);
            this.recallthis = recallthis;
            this.recallfun = recallfun;
            this.params = params;
            this.move.alltime = alltime;
            this.move.go(fromX, fromY, toX, toY);
            this.move.delay = delay;
            this.x = fromX;
            this.y = fromY;
        };
        MoveImage.prototype.advanceTime = function (time) {
            time = time / 1000;
            this.move.advanceTime(time);
            this.x = this.move.x;
            this.y = this.move.y;
            this.visible = this.move.delay <= 0;
            if (this.visible && this.soundSrc != null) {
                utils.SoundUtils.playEffectSound(this.soundSrc);
                this.soundSrc = null;
            }
            if (this.move.isComplete) {
                if (this.delayremove > 0) {
                    this.delayremove -= time;
                }
                else {
                    if (this.recallfun != null) {
                        this.recallfun.apply(this.recallthis, this.params);
                        this.recallfun = null;
                        this.recallthis = null;
                        this.data = null;
                        this.params = null;
                        this.soundSrc = null;
                    }
                    this.stop();
                }
            }
        };
        MoveImage.prototype.stop = function () {
            egret.Ticker.getInstance().unregister(this.advanceTime, this);
            MoveImage.toPool(this);
        };
        MoveImage.fromPool = function () {
            if (MoveImage.sItemPool.length)
                return MoveImage.sItemPool.pop();
            else {
                return new MoveImage();
            }
        };
        MoveImage.toPool = function (item) {
            item.scaleX = item.scaleY = 1;
            item.removeFromParent();
            item.delayremove = 0;
            item.recallfun = null;
            item.recallthis = null;
            item.params = null;
            item.data = null;
            if (MoveImage.sItemPool.length < 5 && MoveImage.sItemPool.indexOf(item) == -1)
                MoveImage.sItemPool.push(item);
        };
        MoveImage.clearPool = function () {
            MoveImage.sItemPool = [];
        };
        return MoveImage;
    }(eui.Image));
    /**
    * 对象池
    */
    MoveImage.sItemPool = [];
    playcards.MoveImage = MoveImage;
    __reflect(MoveImage.prototype, "playcards.MoveImage");
})(playcards || (playcards = {}));
//# sourceMappingURL=MoveImage.js.map