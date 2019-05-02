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
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        /**
         * 纹理集动画
         * @param textureAtlas
         */
        function MovieClip(textures, fps, autoAddTime) {
            if (fps === void 0) { fps = 12; }
            if (autoAddTime === void 0) { autoAddTime = true; }
            var _this = _super.call(this) || this;
            _this._TimeSpan = 0;
            _this._totalFrame = 7;
            _this._currentFrame = 0;
            _this._RepeatTime = 0.1;
            _this._delay = 0;
            _this._playing = false;
            /**循环播放次数*/
            _this._playTimes = 1;
            _this._loopdelayTime = 0;
            _this.initTextures(textures, fps);
            _this._autoAddTime = autoAddTime;
            if (autoAddTime) {
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addStage, _this);
                _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeStage, _this);
            }
            return _this;
        }
        MovieClip.prototype.initTextures = function (textures, fps) {
            if (fps === void 0) { fps = 12; }
            this._totalTextures = textures;
            this._currentFrame = 0;
            this._TimeSpan = 0;
            this.fps = fps;
            this._totalFrame = this._totalTextures.length;
            if (this._totalFrame > 0) {
                this.texture = this._totalTextures[0];
            }
        };
        Object.defineProperty(MovieClip.prototype, "delay", {
            get: function () {
                return this._delay;
            },
            /**延迟*/
            set: function (value) {
                this._delay = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "loop", {
            get: function () {
                return this._playTimes <= 0;
            },
            /**循环*/
            set: function (value) {
                if (value)
                    this._playTimes = -1;
                else
                    this._playTimes = 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "fps", {
            get: function () {
                return this._fps;
            },
            /**帧频 每秒帧数*/
            set: function (value) {
                this._fps = value;
                this._RepeatTime = 1 / value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "loopdelayTime", {
            /**循环间隔 */
            get: function () {
                return this._loopdelayTime;
            },
            set: function (value) {
                this._loopdelayTime = value;
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.advanceTime = function (time) {
            if (!this._playing)
                return;
            time = time / 1000;
            if (this._delay > 0) {
                this._delay -= time;
                if (this._delay > 0)
                    return;
            }
            this._TimeSpan += time;
            if (this._TimeSpan >= this._RepeatTime) {
                var addFrame = Math.floor(this._TimeSpan / this._RepeatTime);
                this._TimeSpan = this._TimeSpan % this._RepeatTime;
                this._currentFrame += addFrame;
                if (this._currentFrame >= this._totalFrame) {
                    if (this._playTimes > 0) {
                        var times = Math.floor(this._currentFrame / this._totalFrame);
                        this._playTimes -= times;
                        if (this._playTimes <= 0) {
                            this.stop();
                            return;
                        }
                    }
                    this._currentFrame = this._currentFrame % this._totalFrame;
                    this._delay = this._loopdelayTime;
                }
                this.setFrame();
            }
        };
        MovieClip.prototype.setFrame = function () {
            if (this._totalTextures != null && this._totalTextures.length > 0)
                this.texture = this._totalTextures[this._currentFrame];
        };
        /**暂停*/
        MovieClip.prototype.pasue = function () {
            this._playing = false;
        };
        /**继续 */
        MovieClip.prototype.resume = function () {
            this._playing = true;
        };
        /**开始
         * times 循环次数 <=0无限循环
         * */
        MovieClip.prototype.play = function (times) {
            if (times === void 0) { times = 1; }
            this._playing = true;
            this._IsComplete = false;
            this._playTimes = times;
            if (this._autoAddTime) {
                egret.Ticker.getInstance().register(this.advanceTime, this);
            }
        };
        /**结束*/
        MovieClip.prototype.stop = function () {
            this._playing = false;
            if (this._autoAddTime)
                egret.Ticker.getInstance().unregister(this.advanceTime, this);
            this.dispatchEventWith(egret.Event.COMPLETE);
        };
        /**停在第value 帧 */
        MovieClip.prototype.stopAt = function (value) {
            this._playing = false;
            if (this._autoAddTime)
                egret.Ticker.getInstance().unregister(this.advanceTime, this);
            if (value >= 0 && value < this._totalFrame) {
                this._currentFrame = value;
                this.setFrame();
            }
        };
        // public remain(value: number): void {
        //     this._currentFrame = value;
        //     this.setFrame();
        //     var timer: egret.Timer = new egret.Timer(1000, 1);
        //     timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>this.removeFromParent(true),this);
        //     timer.start();
        // }
        MovieClip.prototype.addStage = function () {
            if (!this._IsComplete)
                egret.Ticker.getInstance().register(this.advanceTime, this);
        };
        MovieClip.prototype.removeStage = function () {
            egret.Ticker.getInstance().unregister(this.advanceTime, this);
        };
        MovieClip.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
            egret.Ticker.getInstance().unregister(this.advanceTime, this);
        };
        return MovieClip;
    }(egret.Bitmap));
    gameabc.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "gameabc.MovieClip");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=MovieClip.js.map