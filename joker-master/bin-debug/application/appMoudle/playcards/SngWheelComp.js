var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    var SngWheelComp = (function (_super) {
        __extends(SngWheelComp, _super);
        function SngWheelComp() {
            var _this = _super.call(this) || this;
            _this.FPSCreate = false;
            _this.skinName = "SngWheelSkin";
            _this.labelGroup.mask = new egret.Rectangle(0, 0, 341, 80);
            return _this;
        }
        SngWheelComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.addDragonBones();
        };
        SngWheelComp.prototype.playAndGoto = function (num) {
            this.visible = true;
            this.tweenToNumber = num;
            this.tweenTimes = 8; //一共出现几个数字后停止
            this.tweenSpeed = 2; //初始速度，数字越小越快
            this.goto(parseInt(this.getRandom()));
            this.textLabel2.text = this.getRandom();
            egret.Ticker.getInstance().register(this.wheelListener, this);
        };
        SngWheelComp.prototype.goto = function (num) {
            this.textLabel1.text = String(num);
            this.textLabel1.y = 22;
            this.textLabel2.y = this.textLabel1.y + 63;
        };
        SngWheelComp.prototype.wheelListener = function (time) {
            var gotoY1 = this.textLabel1.y - time / this.tweenSpeed;
            var gotoY2 = gotoY1 + 63;
            if (gotoY2 < 22 && this.tweenTimes == 0) {
                egret.Ticker.getInstance().unregister(this.wheelListener, this);
                this.goto(this.tweenToNumber);
                var playCoin = false;
                if (match.getProxy().currentMatchVO != null) {
                    playCoin = this.tweenToNumber >= 10 * match.getProxy().currentMatchVO.entryFee;
                }
                this.playFPSAnimation(playCoin);
                return;
            }
            if (gotoY1 < -38 && this.tweenTimes != 0) {
                gotoY1 = this.textLabel2.y - time / this.tweenSpeed;
                gotoY2 = gotoY1 + 63;
                this.textLabel1.text = this.textLabel2.text;
                if (--this.tweenTimes <= 0) {
                    this.textLabel2.text = String(this.tweenToNumber);
                }
                else {
                    if (this.tweenTimes < 5)
                        this.tweenSpeed += 1.625; //转几圈以后开始减速
                    this.textLabel2.text = this.getRandom();
                }
            }
            this.textLabel1.y = gotoY1;
            this.textLabel2.y = gotoY2;
        };
        SngWheelComp.prototype.getRandom = function () {
            if (match.getProxy().currentMatchVO == null) {
                return String(Math.floor(Math.random() * 9999999));
            }
            else {
                var r = Math.floor(Math.random() * match.getProxy().wheelProb.length);
                return String(match.getProxy().wheelProb[r] * match.getProxy().currentMatchVO.entryFee);
            }
        };
        SngWheelComp.prototype.playComplete = function () {
            this.luckstarAnimation.animation.gotoAndStop("newAnimation");
            this.luckgoldAnimation.animation.gotoAndStop("shanguang+saqian");
            if (this.completeListener != null) {
                this.completeListener.apply(this.completeThisObj);
            }
            this.removeFromParent();
        };
        /**
         * 播放动画
         */
        SngWheelComp.prototype.playFPSAnimation = function (playCoin) {
            if (playCoin === void 0) { playCoin = false; }
            this.luckstarAnimation.animation.play("newAnimation", -1);
            if (playCoin) {
                this.luckgoldAnimation.display.visible = true;
                this.luckgoldAnimation.animation.play("shanguang+saqian", 1);
            }
            egret.setTimeout(this.playComplete, this, 1500);
        };
        SngWheelComp.prototype.addDragonBones = function () {
            var boneFactory = gameabc.addAssetsToBonesFactory(AppReg.SNG, "xingyunzhuanlun_json", "xingyunzhuanlun_texture_png", "xingyunzhuanlun_texture_json");
            this.luckstarAnimation = boneFactory.buildFastArmature("MovieClip");
            this.luckstarAnimation.display.touchEnabled = false;
            dragonBones.WorldClock.clock.add(this.luckstarAnimation);
            this.imagegroup.addChild(this.luckstarAnimation.display);
            this.luckstarAnimation.animation.gotoAndStop("newAnimation");
            var boneFactory = gameabc.addAssetsToBonesFactory(AppReg.SNG_ENTRY, "xingyunzhuanlun_gold_json", "xingyunzhuanlun_gold_texture_png", "xingyunzhuanlun_gold_texture_json");
            this.luckgoldAnimation = boneFactory.buildFastArmature("MovieClip");
            this.luckgoldAnimation.display.touchEnabled = false;
            this.luckgoldAnimation.display.visible = false;
            this.luckgoldAnimation.display.y = 50;
            dragonBones.WorldClock.clock.add(this.luckgoldAnimation);
            this.imagegroup.addChild(this.luckgoldAnimation.display);
            this.luckgoldAnimation.animation.gotoAndStop("shanguang+saqian");
        };
        SngWheelComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            egret.Ticker.getInstance().unregister(this.wheelListener, this);
            dragonBones.WorldClock.clock.remove(this.luckstarAnimation);
            gameabc.destoryFactory(AppReg.SNG);
            dragonBones.WorldClock.clock.remove(this.luckgoldAnimation);
            gameabc.destoryFactory(AppReg.SNG_ENTRY);
        };
        return SngWheelComp;
    }(gameabc.UICustomComponent));
    playcards.SngWheelComp = SngWheelComp;
    __reflect(SngWheelComp.prototype, "playcards.SngWheelComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=SngWheelComp.js.map