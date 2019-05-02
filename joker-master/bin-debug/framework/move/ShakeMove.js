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
    var ShakeMove = (function (_super) {
        __extends(ShakeMove, _super);
        function ShakeMove() {
            var _this = _super.call(this) || this;
            _this._x = NaN;
            _this._y = NaN;
            _this._isComplete = false;
            _this._toX = NaN;
            _this._toY = NaN;
            _this.shock_TimeSpan = NaN;
            _this.alltime = NaN;
            _this._shock = 0;
            _this._delay = 0;
            return _this;
        }
        Object.defineProperty(ShakeMove.prototype, "delay", {
            get: function () {
                return this._delay;
            },
            set: function (value) {
                this._delay = value;
            },
            enumerable: true,
            configurable: true
        });
        ShakeMove.prototype.go = function (fromX, fromY, shock_RepeatTime, step, recallfun) {
            if (shock_RepeatTime === void 0) { shock_RepeatTime = 200; }
            if (step === void 0) { step = 3; }
            if (recallfun === void 0) { recallfun = null; }
            this._recallfun = recallfun;
            this._isComplete = false;
            this._x = fromX;
            this._y = fromY;
            this.alltime = shock_RepeatTime / 1000;
            this._shock = 0;
            this._step = step;
            this._toX = 0;
            this._toY = 0;
            this.shock_TimeSpan = 0;
        };
        ShakeMove.prototype.onComplete = function () {
            this._isComplete = true;
            this._toX = 0;
            this._toY = 0;
            if (this._recallfun != null)
                this._recallfun(this);
            this._recallfun = null;
            //						dispatchEventWith(Event.REMOVE_FROM_JUGGLER);
        };
        Object.defineProperty(ShakeMove.prototype, "toY", {
            get: function () {
                return this._toY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShakeMove.prototype, "toX", {
            //
            //					public set toY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "toY", value);
            //		}
            get: function () {
                return this._toX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShakeMove.prototype, "fromY", {
            //					public set toX(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "toX", value);
            //		}
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShakeMove.prototype, "fromX", {
            //					public set fromY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "fromY", value);
            //		}
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShakeMove.prototype, "x", {
            //					public set fromX(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "fromX", value);
            //		}
            get: function () {
                return this._x + this._toX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShakeMove.prototype, "y", {
            //					public set x(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "x", value);
            //		}
            get: function () {
                return this._y + this._toY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShakeMove.prototype, "rotation", {
            //					public set y(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "y", value);
            //		}
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShakeMove.prototype, "isComplete", {
            //					public set rotation(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "rotation", value);
            //		}
            get: function () {
                return this._isComplete;
            },
            enumerable: true,
            configurable: true
        });
        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.ShakeMove, this, "isComplete", value);
        //		}
        ShakeMove.prototype.advanceTime = function (time) {
            if (!this._isComplete) {
                if (this._delay > 0) {
                    this._delay -= time;
                    return;
                }
                this.shock_TimeSpan += time;
                if (this.shock_TimeSpan < this.alltime) {
                    this._shock += 0.5;
                    // if(this._shock-- > 0) {
                    // var dy: number = 3;
                    //     if(this._shock > 10) {
                    //         dy = Math.round(this._shock / 2);
                    //     }
                    //     if(this._shock == 0) {
                    //         this._toY = 0;
                    //         this._toX = 0;
                    //     }
                    //     else
                    if (this._shock % 4 == 0) {
                        this._toY = -this._step;
                    }
                    else if (this._shock % 4 == 2) {
                        this._toY = this._step;
                    }
                    else if (this._shock % 4 == 1) {
                        this._toX = -this._step;
                    }
                    else if (this._shock % 4 == 3) {
                        this._toX = this._step;
                    }
                    // }
                    if (this._recallfun)
                        this._recallfun(this);
                }
                else {
                    this.onComplete();
                }
            }
        };
        return ShakeMove;
    }(egret.EventDispatcher));
    gameabc.ShakeMove = ShakeMove;
    __reflect(ShakeMove.prototype, "gameabc.ShakeMove", ["gameabc.IMove"]);
})(gameabc || (gameabc = {}));
//# sourceMappingURL=ShakeMove.js.map