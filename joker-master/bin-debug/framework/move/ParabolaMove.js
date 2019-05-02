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
    var ParabolaMove = (function (_super) {
        __extends(ParabolaMove, _super);
        function ParabolaMove(t, g) {
            if (t === void 0) { t = 60; }
            if (g === void 0) { g = 0.3; }
            var _this = _super.call(this) || this;
            _this._x = NaN;
            _this._y = NaN;
            _this._isComplete = false;
            _this._fromX = 0;
            _this._fromY = 0;
            _this._toX = 0;
            _this._toY = 0;
            _this.newSpeedX = NaN;
            _this.newSpeedY = NaN;
            _this._t0 = 0;
            _this._t1 = NaN; //80 =1秒
            _this._g = NaN;
            _this._rotation = 0;
            _this._delay = 0;
            _this._t1 = t;
            _this._g = g;
            return _this;
        }
        Object.defineProperty(ParabolaMove.prototype, "delay", {
            get: function () {
                return this._delay;
            },
            set: function (value) {
                this._delay = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParabolaMove.prototype, "alltime", {
            get: function () {
                return this._t1;
            },
            set: function (value) {
                this._t1 = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParabolaMove.prototype, "toY", {
            get: function () {
                return this._toY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParabolaMove.prototype, "toX", {
            //					public set toY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "toY", value);
            //		}
            get: function () {
                return this._toX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParabolaMove.prototype, "fromY", {
            //					public set toX(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "toX", value);
            //		}
            get: function () {
                return this._fromY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParabolaMove.prototype, "fromX", {
            //					public set fromY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "fromY", value);
            //		}
            get: function () {
                return this._fromX;
            },
            enumerable: true,
            configurable: true
        });
        //					public set fromX(value:number)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "fromX", value);
        //		}
        ParabolaMove.prototype.go = function (fromX, fromY, toX, toY, recallfun) {
            if (toX === void 0) { toX = 0; }
            if (toY === void 0) { toY = 0; }
            if (recallfun === void 0) { recallfun = null; }
            this._recallfun = recallfun;
            this._fromX = this._x = fromX;
            this._fromY = this._y = fromY;
            this._toX = toX;
            this._toY = toY;
            if (Math.abs(fromX - toX) < 1 && Math.abs(fromY - toY) < 1) {
                this.onComplete();
                return;
            }
            this.newSpeedX = (toX - fromX) / this._t1;
            this.newSpeedY = ((toY - fromY) - (this._g * this._t1) * (this._t1 / 2)) / this._t1;
            this._t0 = 0;
            this._isComplete = false;
        };
        Object.defineProperty(ParabolaMove.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParabolaMove.prototype, "y", {
            //					public set x(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "x", value);
            //		}
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParabolaMove.prototype, "rotation", {
            //					public set y(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "y", value);
            //		}
            get: function () {
                return this._rotation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParabolaMove.prototype, "isComplete", {
            //					public set rotation(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "rotation", value);
            //		}
            get: function () {
                return this._isComplete;
            },
            enumerable: true,
            configurable: true
        });
        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ParabolaMove, this, "isComplete", value);
        //		}
        ParabolaMove.prototype.onComplete = function () {
            this._isComplete = true;
            this._x = this.toX;
            this._y = this.toY;
            if (this._recallfun != null)
                this._recallfun(this);
            this._recallfun = null;
            //						dispatchEventWith(Event.REMOVE_FROM_JUGGLER);
        };
        ParabolaMove.prototype.advanceTime = function (time) {
            if (!this._isComplete) {
                if (this._delay > 0) {
                    this._delay -= time;
                    if (this._delay < 0)
                        this._delay = 0;
                    return;
                }
                this._t0 += time * 80;
                var Sx = this._fromX + (this._t0 * this.newSpeedX);
                var Sy = this._fromY + (this._t0 * this.newSpeedY) + this._g * this._t0 * this._t0 * .5;
                var dx = Sx - this._x;
                var dy = Sy - this._y;
                this._rotation = Math.atan2(dy, dx) / Math.PI * 180;
                if (((this._x - this._toX) * (Sx - this._toX) < 1 && (this._y - this._toY) * (Sy - this._toY) < 1) || this._t0 > this._t1) {
                    this.onComplete();
                }
                else {
                    this._x = Sx;
                    this._y = Sy;
                    if (this._recallfun != null)
                        this._recallfun(this);
                }
            }
        };
        return ParabolaMove;
    }(egret.EventDispatcher));
    gameabc.ParabolaMove = ParabolaMove;
    __reflect(ParabolaMove.prototype, "gameabc.ParabolaMove", ["gameabc.IMove"]);
})(gameabc || (gameabc = {}));
//# sourceMappingURL=ParabolaMove.js.map