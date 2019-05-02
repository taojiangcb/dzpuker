var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var charmWheel;
(function (charmWheel) {
    var WHEEL_STATUS;
    (function (WHEEL_STATUS) {
        WHEEL_STATUS[WHEEL_STATUS["STOP"] = 0] = "STOP";
        WHEEL_STATUS[WHEEL_STATUS["ADD"] = 1] = "ADD";
        WHEEL_STATUS[WHEEL_STATUS["CONSTANT"] = 2] = "CONSTANT";
        WHEEL_STATUS[WHEEL_STATUS["REDUCE"] = 3] = "REDUCE";
    })(WHEEL_STATUS = charmWheel.WHEEL_STATUS || (charmWheel.WHEEL_STATUS = {}));
    function getProxy() {
        return __GET_PROXY(CharmWheelProxy);
    }
    charmWheel.getProxy = getProxy;
    var CharmWheelProxy = (function (_super) {
        __extends(CharmWheelProxy, _super);
        function CharmWheelProxy(name, data) {
            var _this = _super.call(this, CharmWheelProxy.NAME, data) || this;
            _this.timeInterval = 30; //10;
            //加速时间 匀速时间 减速时间 加速度
            _this.addTime = 1000;
            _this.constantTime = 1000;
            _this.reduceTime = 3000;
            _this.addAc = 600;
            _this.rewardList = [["门票", "icon_prop_type_2_png", "1000赛事门票*1"],
                ["门票", "icon_prop_type_1_png", "5000赛事门票*1"],
                ["500", "icon_sign_box1_png", "500彩豆"],
                ["1000", "icon_sign_box1_png", "1000彩豆"],
                ["2000", "icon_sign_box3_png", "2000彩豆"],
                ["5000", "icon_sign_box2_png", "5000彩豆"],
                ["1万", "icon_shop_box1_png", "1万彩豆"],
                ["10万", "icon_shop_box2_png", "10万彩豆"],
                ["50万", "icon_shop_box3_png", "50万彩豆"],
                ["500万", "icon_sign_ticket__box1_png", "500万彩豆"]];
            _this.rewardSort = [4, 8, 1, 7, 5, 2, 9, 0, 3, 6]; //[7, 2, 5, 8, 0, 4, 9, 3, 1, 6];
            _this.isRun = false;
            _this.runTime = 0;
            _this.status = WHEEL_STATUS.STOP;
            _this.myRecordList = [];
            _this.allRecordList = [];
            return _this;
        }
        Object.defineProperty(CharmWheelProxy.prototype, "reduceAc", {
            /**计算减速度 */
            get: function () {
                return -Math.floor(this.addAc * this.addTime / this.reduceTime);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CharmWheelProxy.prototype, "beforeReduceTime", {
            get: function () {
                return this.addTime + this.constantTime + this.adjustTime;
            },
            enumerable: true,
            configurable: true
        });
        CharmWheelProxy.prototype.initData = function (reward, startRotation) {
            this.isRun = true;
            this.runTime = 0;
            this.rewardId = reward;
            this.isAdjust = true;
            this.startRotation = startRotation;
            this.adjustTime = 0;
            this.adjustRotation = this.getRewardRotation();
        };
        CharmWheelProxy.prototype.finishData = function () {
            var _this = this;
            this.status = WHEEL_STATUS.STOP;
            egret.setTimeout(function () {
                _this.isRun = false;
            }, this, 1000, true);
        };
        /**每个timeInterval获取运动的角度 */
        CharmWheelProxy.prototype.getRotation = function () {
            var rotation = 0;
            var t = this.timeInterval / 1000;
            var v;
            var a;
            if (this.runTime < this.addTime) {
                if (this.status != WHEEL_STATUS.ADD)
                    this.status = WHEEL_STATUS.ADD;
                a = this.addAc;
                v = this.runTime / 1000 * this.addAc;
            }
            else if (this.runTime < this.addTime + this.constantTime) {
                if (this.status != WHEEL_STATUS.CONSTANT)
                    this.status = WHEEL_STATUS.CONSTANT;
                a = 0;
                v = this.getMaxSpeed();
            }
            else if (this.runTime >= this.addTime + this.constantTime && this.isAdjust) {
                var maxRotation = this.calcRotation(this.getMaxSpeed(), t, 0);
                this.runTime += this.timeInterval;
                this.adjustTime += this.timeInterval;
                return this.getAdjustRotation(maxRotation);
            }
            else {
                if (this.status != WHEEL_STATUS.REDUCE) {
                    this.status = WHEEL_STATUS.REDUCE;
                }
                a = this.reduceAc;
                v = this.getMaxSpeed() + (this.runTime - this.beforeReduceTime) / 1000 * this.reduceAc;
            }
            this.runTime += this.timeInterval;
            rotation += this.calcRotation(v, t, a);
            return rotation;
        };
        CharmWheelProxy.prototype.getMaxSpeed = function () {
            return this.addAc * this.addTime / 1000;
        };
        /**根据抽到的奖品调整转盘角度 */
        CharmWheelProxy.prototype.getRewardRotation = function () {
            var rotationA = this.calcRotation(0, this.addTime, this.addAc);
            var rotationC = this.calcRotation(this.getMaxSpeed(), this.constantTime, 0);
            var rotationR = this.calcRotation(this.getMaxSpeed(), this.reduceTime, this.reduceAc);
            var rotation = (rotationA + rotationC + rotationR) % 360;
            return (360 * 3 - rotation - this.view.items[this.rewardId].rotation - this.startRotation) % 360;
        };
        CharmWheelProxy.prototype.getAdjustRotation = function (r) {
            if (this.adjustRotation > r) {
                this.adjustRotation -= r;
                return r;
            }
            else {
                this.isAdjust = false;
                return this.adjustRotation;
            }
        };
        CharmWheelProxy.prototype.calcRotation = function (v, t, a) {
            return v * t + 0.5 * a * t * t;
        };
        return CharmWheelProxy;
    }(app.mvc.AbsractProxy));
    CharmWheelProxy.NAME = "CharmWheelProxy";
    charmWheel.CharmWheelProxy = CharmWheelProxy;
    __reflect(CharmWheelProxy.prototype, "charmWheel.CharmWheelProxy");
})(charmWheel || (charmWheel = {}));
//# sourceMappingURL=CharmWheelProxy.js.map