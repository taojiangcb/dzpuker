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
    var AddSpeedMove = (function (_super) {
        __extends(AddSpeedMove, _super);
        function AddSpeedMove(v0, t) {
            if (v0 === void 0) { v0 = 500; }
            if (t === void 0) { t = 2; }
            var _this = _super.call(this) || this;
            _this._v0 = NaN;
            _this._a = NaN;
            _this._x = NaN;
            _this._y = NaN;
            _this._isComplete = false;
            _this._fromX = 0;
            _this._fromY = 0;
            _this._toX = 0;
            _this._toY = 0;
            _this.cx = NaN;
            _this.cy = NaN;
            _this.t = NaN;
            _this.alltime = NaN;
            _this._delay = 0;
            _this._v0 = v0;
            _this.alltime = t;
            return _this;
        }
        AddSpeedMove.prototype.go = function (fromX, fromY, toX, toY, recallfun) {
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
            this.t = 0;
            this._isComplete = false;
            var dx = toX - fromX;
            var dy = toY - fromY;
            var s = Math.sqrt(dx * dx + dy * dy);
            this.cx = dx / s;
            this.cy = dy / s;
            this._a = 2 * (s - this._v0 * this.alltime) / (this.alltime * this.alltime);
        };
        AddSpeedMove.prototype.onComplete = function () {
            this._isComplete = true;
            this._x = this.toX;
            this._y = this.toY;
            if (this._recallfun)
                this._recallfun(this);
            this._recallfun = null;
        };
        Object.defineProperty(AddSpeedMove.prototype, "toY", {
            get: function () {
                return this._toY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddSpeedMove.prototype, "toX", {
            //					public set toY(value:number)
            //		{
            //                        this._toY = value;
            //		}
            get: function () {
                return this._toX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddSpeedMove.prototype, "fromY", {
            //					public set toX(value:number)
            //		{
            //                        this._toX =  value;
            //		}
            get: function () {
                return this._fromY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddSpeedMove.prototype, "fromX", {
            //					public set fromY(value:number)
            //		{
            //                        this._fromY = value;
            //		}
            get: function () {
                return this._fromX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddSpeedMove.prototype, "x", {
            //					public set fromX(value:number)
            //		{
            //                        this._fromX = value;
            //		}
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddSpeedMove.prototype, "y", {
            //					public set x(value:number)
            //		{
            //                        this._x = value;
            //		}
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddSpeedMove.prototype, "rotation", {
            //					public set y(value:number)
            //		{
            //                        this._y = value;
            //		}
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddSpeedMove.prototype, "isComplete", {
            //					public set rotation(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.AddSpeedMove, this, "rotation", value);
            //		}
            get: function () {
                return this._isComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddSpeedMove.prototype, "delay", {
            //					public set isComplete(value:boolean)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.AddSpeedMove, this, "isComplete", value);
            //		}
            get: function () {
                return this._delay;
            },
            set: function (value) {
                this._delay = value;
            },
            enumerable: true,
            configurable: true
        });
        AddSpeedMove.prototype.advanceTime = function (time) {
            if (this._isComplete)
                return;
            if (this._delay > 0) {
                this._delay -= time;
                return;
            }
            this.t += time;
            if (this.t > this.alltime) {
                this.onComplete();
            }
            else {
                var S = this._v0 * this.t + this._a * this.t * this.t * .5;
                this._x = this._fromX + S * this.cx;
                this._y = this._fromY + S * this.cy;
                if (this._recallfun)
                    this._recallfun(this);
            }
        };
        return AddSpeedMove;
    }(egret.EventDispatcher));
    gameabc.AddSpeedMove = AddSpeedMove;
    __reflect(AddSpeedMove.prototype, "gameabc.AddSpeedMove", ["gameabc.IMove"]);
})(gameabc || (gameabc = {}));
//# sourceMappingURL=AddSpeedMove.js.map