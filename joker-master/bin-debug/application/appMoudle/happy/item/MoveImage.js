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
    /**
     *飘图片
     * @author
     *
     */
    var MoveImage = (function (_super) {
        __extends(MoveImage, _super);
        function MoveImage(source) {
            var _this = _super.call(this, source) || this;
            _this.touchEnabled = false;
            return _this;
        }
        MoveImage.prototype.goto = function (fromX, fromY, toX, toY, alltime, soundSrc, compRemove, delayTime) {
            if (alltime === void 0) { alltime = 1500; }
            if (soundSrc === void 0) { soundSrc = null; }
            if (compRemove === void 0) { compRemove = false; }
            if (delayTime === void 0) { delayTime = 0; }
            if (soundSrc != null) {
                utils.SoundUtils.playEffectSound(soundSrc);
            }
            this.x = fromX;
            this.y = fromY;
            this.tox = toX;
            this.toy = toY;
            this.alltime = alltime;
            this.compRemove = compRemove;
            if (delayTime > 0)
                this.timeout = egret.setTimeout(this.beginTween, this, delayTime);
            else
                this.beginTween();
        };
        MoveImage.prototype.beginTween = function () {
            var tween = egret.Tween.get(this).to({ x: this.tox, y: this.toy }, this.alltime, egret.Ease.circOut);
            if (this.compRemove)
                tween.call(this.remove, this);
        };
        MoveImage.prototype.remove = function () {
            egret.clearTimeout(this.timeout);
            egret.Tween.removeTweens(this);
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
            item.removeFromParent();
            if (MoveImage.sItemPool.length < 50 && MoveImage.sItemPool.indexOf(item) == -1)
                MoveImage.sItemPool.push(item);
        };
        MoveImage.clearPool = function () {
            // var pools = MoveImage.sItemPool;
            MoveImage.sItemPool = [];
            // for (var i: number = pools.length - 1; i > -1; i--){
            //     pools[i].removeFromParent(true);
            // }
        };
        return MoveImage;
    }(eui.Image));
    /**
    * 对象池
    */
    MoveImage.sItemPool = [];
    happy.MoveImage = MoveImage;
    __reflect(MoveImage.prototype, "happy.MoveImage");
})(happy || (happy = {}));
//# sourceMappingURL=MoveImage.js.map