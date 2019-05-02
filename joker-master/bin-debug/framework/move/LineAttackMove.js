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
    var LineAttackMove = (function (_super) {
        __extends(LineAttackMove, _super);
        function LineAttackMove(linespeed) {
            if (linespeed === void 0) { linespeed = 900; }
            var _this = _super.call(this) || this;
            _this._linespeed = NaN;
            _this._t = 60;
            _this._g = 0.3;
            _this._index = 0;
            _this._fromX = 0;
            _this._fromY = 0;
            _this._toX = 0;
            _this._toY = 0;
            _this._delay = 0;
            _this._linespeed = linespeed;
            return _this;
        }
        LineAttackMove.prototype.go = function (fromX, fromY, toX, toY, recallfun) {
            if (toX === void 0) { toX = 0; }
            if (toY === void 0) { toY = 0; }
            if (recallfun === void 0) { recallfun = null; }
            this._recallfun = recallfun;
            this._index = 0;
            this._fromX = fromX;
            this._fromY = fromY;
            this._toX = toX;
            this._toY = toY;
            this._iMove = new gameabc.LineMove(this._linespeed);
            this._iMove.go(this._fromX, this._fromY, toX, toY);
        };
        Object.defineProperty(LineAttackMove.prototype, "toY", {
            get: function () {
                return this._toY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineAttackMove.prototype, "toX", {
            //					public set toY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "toY", value);
            //		}
            get: function () {
                return this._toX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineAttackMove.prototype, "fromY", {
            //					public set toX(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "toX", value);
            //		}
            get: function () {
                return this._fromY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineAttackMove.prototype, "fromX", {
            //					public set fromY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "fromY", value);
            //		}
            get: function () {
                return this._fromX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineAttackMove.prototype, "x", {
            //					public set fromX(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "fromX", value);
            //		}
            get: function () {
                return this._iMove.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineAttackMove.prototype, "y", {
            //					public set x(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "x", value);
            //		}
            get: function () {
                return this._iMove.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineAttackMove.prototype, "delay", {
            //					public set y(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "y", value);
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
        Object.defineProperty(LineAttackMove.prototype, "rotation", {
            get: function () {
                return this._iMove.rotation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LineAttackMove.prototype, "isComplete", {
            //					public set rotation(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "rotation", value);
            //		}
            get: function () {
                return this._index > 0 && this._iMove && this._iMove.isComplete;
            },
            enumerable: true,
            configurable: true
        });
        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.LineAttackMove, this, "isComplete", value);
        //		}
        //	
        LineAttackMove.prototype.onComplete = function () {
            if (this._recallfun)
                this._recallfun(this);
            this._recallfun = null;
            //						dispatchEventWith(Event.REMOVE_FROM_JUGGLER);
        };
        LineAttackMove.prototype.advanceTime = function (time) {
            if (this._delay > 0) {
                this._delay -= time;
                return;
            }
            if (this._iMove.isComplete) {
                if (this._index > 0) {
                    this.onComplete();
                    return;
                }
                else {
                    this._index = 1;
                    this._iMove = new gameabc.LineMove(this._linespeed * 1.5);
                    this._iMove.go(this._toX, this._toY, this._fromX, this._fromY);
                }
            }
            else {
                this._iMove.advanceTime(time);
                if (this._recallfun)
                    this._recallfun(this);
            }
        };
        return LineAttackMove;
    }(egret.EventDispatcher));
    gameabc.LineAttackMove = LineAttackMove;
    __reflect(LineAttackMove.prototype, "gameabc.LineAttackMove", ["gameabc.IMove"]);
})(gameabc || (gameabc = {}));
//# sourceMappingURL=LineAttackMove.js.map