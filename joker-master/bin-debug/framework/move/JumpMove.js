var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameabc;
(function (gameabc) {
    var JumpMove = (function (_super) {
        __extends(JumpMove, _super);
        function JumpMove(t, g) {
            if (t === void 0) { t = 35; }
            if (g === void 0) { g = 0.3; }
            var _this = _super.call(this, t, g) || this;
            _this._tbak = NaN;
            _this._spaceTime = NaN;
            _this._isRandomDelay = false;
            _this.temp = 0;
            _this._tbak = t;
            _this.temp = Math.round(t / 4 + 1);
            _this._spaceTime = 0;
            return _this;
        }
        Object.defineProperty(JumpMove.prototype, "isRandomDelay", {
            get: function () {
                return this._isRandomDelay;
            },
            set: function (value) {
                this._isRandomDelay = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JumpMove.prototype, "spaceTime", {
            get: function () {
                return this._spaceTime;
            },
            set: function (value) {
                this._spaceTime = value;
            },
            enumerable: true,
            configurable: true
        });
        //        protected onComplete() {
        //            this._isComplete = true;
        //            this._x = this.toX;
        //            this._y = this.toY;
        //            if(this._recallfun != null)
        //                this._recallfun(this);
        //        }
        JumpMove.prototype.advanceTime = function (time) {
            _super.prototype.advanceTime.call(this, time);
            if (this.delay > 0)
                return;
            if (this.isComplete) {
                this.alltime -= this.temp;
                if (this.alltime <= 0) {
                    this.alltime = this._tbak;
                    if (this.isRandomDelay)
                        this.delay = Math.random() * this._spaceTime;
                    else
                        this.delay = this._spaceTime;
                }
                else
                    this.delay = 0;
                this.go(this.fromX, this.fromY, this.toX, this.toY, this._recallfun);
            }
        };
        return JumpMove;
    }(gameabc.ParabolaMove));
    gameabc.JumpMove = JumpMove;
    __reflect(JumpMove.prototype, "gameabc.JumpMove");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=JumpMove.js.map