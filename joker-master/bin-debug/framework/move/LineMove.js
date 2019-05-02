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
    var LineMove = (function (_super) {
        __extends(LineMove, _super);
        function LineMove(speed) {
            if (speed === void 0) { speed = 900; }
            var _this = _super.call(this) || this;
            _this._x = NaN;
            _this._y = NaN;
            _this._isComplete = false;
            _this._fromX = 0;
            _this._fromY = 0;
            _this._toX = 0;
            _this._toY = 0;
            _this._speed = NaN; //运行速度
            _this.newSpeedX = NaN;
            _this.newSpeedY = NaN;
            _this.maxt = NaN;
            _this._delay = 0;
            _this.alltime = NaN; //运行时间
            _this._speed = speed;
            return _this;
        }
        LineMove.prototype.go = function (fromX, fromY, toX, toY, recallfun) {
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
            this._isComplete = false;
            var dx = toX - fromX;
            var dy = toY - fromY;
            var r = Math.atan2(dy, dx);
            var speed;
            if (isNaN(this.alltime)) {
                this.maxt = Math.sqrt(dx * dx + dy * dy) / this._speed;
                speed = this._speed;
            }
            else {
                speed = Math.sqrt(dx * dx + dy * dy) / this.alltime;
                this.maxt = this.alltime;
            }
            this.newSpeedX = speed * Math.cos(r);
            this.newSpeedY = speed * Math.sin(r);
        };
        Object.defineProperty(LineMove.prototype, "toY", {
            get: function () {
                return this._toY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineMove.prototype, "toX", {
            //					public set toY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "toY", value);
            //		}
            get: function () {
                return this._toX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineMove.prototype, "fromY", {
            //					public set toX(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "toX", value);
            //		}
            get: function () {
                return this._fromY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineMove.prototype, "fromX", {
            //					public set fromY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "fromY", value);
            //		}
            get: function () {
                return this._fromX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineMove.prototype, "x", {
            //					public set fromX(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "fromX", value);
            //		}
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineMove.prototype, "y", {
            //
            //					public set x(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "x", value);
            //		}
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineMove.prototype, "rotation", {
            //					public set y(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "y", value);
            //		}
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineMove.prototype, "isComplete", {
            //
            //					public set rotation(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "rotation", value);
            //		}
            get: function () {
                return this._isComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineMove.prototype, "delay", {
            //					public set isComplete(value:boolean)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineMove, this, "isComplete", value);
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
        LineMove.prototype.onComplete = function () {
            this._isComplete = true;
            this._x = this.toX;
            this._y = this.toY;
            if (this._recallfun != null)
                this._recallfun(this);
            this._recallfun = null;
            //						dispatchEventWith(Event.REMOVE_FROM_JUGGLER);
        };
        LineMove.prototype.advanceTime = function (time) {
            if (this._isComplete)
                return;
            if (this._delay > 0) {
                this._delay -= time;
                return;
            }
            this.maxt -= time;
            if (this.maxt < 0) {
                this.onComplete();
            }
            else {
                this._x = this._x + this.newSpeedX * time;
                this._y = this._y + this.newSpeedY * time;
                if (this._recallfun)
                    this._recallfun(this);
            }
        };
        return LineMove;
    }(egret.EventDispatcher));
    gameabc.LineMove = LineMove;
    __reflect(LineMove.prototype, "gameabc.LineMove", ["gameabc.IMove"]);
})(gameabc || (gameabc = {}));
//# sourceMappingURL=LineMove.js.map