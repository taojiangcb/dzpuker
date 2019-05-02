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
    var TreeMove = (function (_super) {
        __extends(TreeMove, _super);
        function TreeMove(speed, t) {
            var _this = _super.call(this) || this;
            _this._speed = NaN;
            _this._t = NaN;
            _this._isComplete = false;
            _this._delay = 0;
            _this._speed = speed;
            _this._t = t;
            _this.movelist = new Array();
            return _this;
        }
        TreeMove.prototype.go = function (fromX, fromY, toX, toY, recallfun) {
            if (toX === void 0) { toX = 0; }
            if (toY === void 0) { toY = 0; }
            if (recallfun === void 0) { recallfun = null; }
            this._recallfun = recallfun;
            var mov = new gameabc.AddSpeedMove(this._speed, this._t);
            mov.go(fromX, fromY, toX, toY);
            this.nowmove = mov;
            var lmov = new gameabc.LineMove(this._speed * .5);
            lmov.go(toX, toY, fromX, fromY);
            this.movelist.push(lmov);
            this._isComplete = false;
        };
        Object.defineProperty(TreeMove.prototype, "x", {
            get: function () {
                return this.nowmove.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeMove.prototype, "y", {
            //					public set x(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "x", value);
            //		}
            get: function () {
                return this.nowmove.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeMove.prototype, "toY", {
            //					public set y(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "y", value);
            //		}
            get: function () {
                return this.nowmove.toY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeMove.prototype, "toX", {
            //					public set toY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "toY", value);
            //		}
            get: function () {
                return this.nowmove.toX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeMove.prototype, "fromY", {
            //					public set toX(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "toX", value);
            //		}
            get: function () {
                return this.nowmove.fromY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeMove.prototype, "fromX", {
            //					public set fromY(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "fromY", value);
            //		}
            get: function () {
                return this.nowmove.fromX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeMove.prototype, "delay", {
            //					public set fromX(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "fromX", value);
            //		}
            get: function () {
                return this.nowmove.delay;
            },
            set: function (value) {
                this._delay = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeMove.prototype, "rotation", {
            get: function () {
                return this.nowmove.rotation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TreeMove.prototype, "isComplete", {
            //					public set rotation(value:number)
            //		{
            //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "rotation", value);
            //		}
            get: function () {
                return this._isComplete;
            },
            enumerable: true,
            configurable: true
        });
        //					public set isComplete(value:boolean)
        //		{
        //			flash.superSetter(com.coffeebean.view.move.TreeMove, this, "isComplete", value);
        //		}
        TreeMove.prototype.onComplete = function () {
            this._isComplete = true;
            if (this._recallfun)
                this._recallfun(this);
            this._recallfun = null;
            //						dispatchEventWith(Event.REMOVE_FROM_JUGGLER);
        };
        TreeMove.prototype.advanceTime = function (time) {
            if (this._isComplete)
                return;
            if (this._delay > 0) {
                this._delay -= time;
                return;
            }
            if (this.nowmove) {
                this.nowmove.advanceTime(time);
                if (this.nowmove.isComplete) {
                    if (this.movelist.length > 0) {
                        this.nowmove = this.movelist.shift();
                    }
                    else
                        this.onComplete();
                }
                else if (this._recallfun)
                    this._recallfun(this);
            }
            else
                this.onComplete();
        };
        return TreeMove;
    }(egret.EventDispatcher));
    gameabc.TreeMove = TreeMove;
    __reflect(TreeMove.prototype, "gameabc.TreeMove", ["gameabc.IMove"]);
})(gameabc || (gameabc = {}));
//# sourceMappingURL=TreeMove.js.map