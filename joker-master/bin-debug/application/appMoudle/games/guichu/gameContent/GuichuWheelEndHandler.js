var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var guichu;
(function (guichu) {
    var AWARD_TYPE;
    (function (AWARD_TYPE) {
        AWARD_TYPE[AWARD_TYPE["NORMAL_AWARD"] = 1] = "NORMAL_AWARD";
        AWARD_TYPE[AWARD_TYPE["SMALL_AWARD"] = 2] = "SMALL_AWARD";
        AWARD_TYPE[AWARD_TYPE["BIG_AWARD"] = 3] = "BIG_AWARD";
    })(AWARD_TYPE = guichu.AWARD_TYPE || (guichu.AWARD_TYPE = {}));
    var handler;
    /**
     * 结算流程处理
     * popImg 中奖时弹出来的小图
     * awardType 中奖的类型
     * awardCount 奖励的金额
     */
    function playAwardAnimation(popImg, awardType, awardCount) {
        if (popImg === void 0) { popImg = ""; }
        if (handler == null)
            handler = new GuichuWheelEndHandler();
        handler.popImgFile = popImg;
        handler.awardType = awardType;
        handler.awardCount = awardCount;
        handler.play();
    }
    guichu.playAwardAnimation = playAwardAnimation;
    function clearAwardAnimation() {
        if (handler != null) {
            handler.clear();
        }
        handler = null;
    }
    guichu.clearAwardAnimation = clearAwardAnimation;
    /**
     * 鬼畜转盘动画结束时的反馈节奏处理
     */
    var GuichuWheelEndHandler = (function () {
        function GuichuWheelEndHandler() {
            /**
             * 当前的奖励类型
             */
            this.awardType = 0;
            /**
             * 中奖时的图标文件
             */
            this.popImgFile = "";
            /**
             * 奖励的金额
             */
            this.awardCount = 0;
            this.internalInit();
        }
        GuichuWheelEndHandler.prototype.internalInit = function () {
            this.rootContent = AppRoot.gameLayer;
            this.wheelComp = __GET_MOUDLE_COMP(AppReg.GUICHU).wheelComp;
            var w = this.wheelComp.width;
            var h = this.wheelComp.height;
            this.centerPoint = this.wheelComp.localToGlobal(w >> 1, h >> 1);
            /*this.itemPointMc = */
            gameabc.addMovieGroup("guichu_wheel_db_dbmv", "guichu_wheel_db_tex_png", AppReg.GUICHU_WHEEL_DB); //("guichu_wheel_db_dbmv", "guichu_wheel_db_tex_png", AppReg.GUICHU_WHEEL_DB);
            this.itemPointMc = gameabc.buildMovie("MovieClip", AppReg.GUICHU_WHEEL_DB);
            this.itemPointMc.x = 278; //this.centerPoint.x;
            this.itemPointMc.y = 280; //this.centerPoint.y;
            this.itemPointMc.blendMode = egret.BlendMode.ADD;
            this.itemPointMc.stop();
            this.itemPointMc.touchChildren = this.itemPointMc.touchEnabled = false;
        };
        GuichuWheelEndHandler.prototype.play = function () {
            var _this = this;
            this.playStartTime = egret.getTimer();
            if (this.itemPointMc) {
                this.wheelComp.wheelAniGroup.addChild(this.itemPointMc);
            }
            this.wheelComp.wheelAniGroup.rotation = 7.5 + this.wheelComp.randRotation - this.wheelComp.wheelCircle.rotation;
            //定义一个泛型函数
            var awarcFunc;
            //奖励时的动画时间
            var awardWaitTime = 0;
            var growthGoldTime = 0;
            if (this.awardType == AWARD_TYPE.NORMAL_AWARD) {
                awarcFunc = guichu.popAward;
                awardWaitTime = 1500; //普通中奖时的等待动画时间
                growthGoldTime = 0;
            }
            else if (this.awardType == AWARD_TYPE.SMALL_AWARD) {
                awarcFunc = guichu.popSmallAward;
                awardWaitTime = 4900; //中小奖的时候动画等待时间
                growthGoldTime = 1500;
            }
            else if (this.awardType == AWARD_TYPE.BIG_AWARD) {
                awarcFunc = guichu.popBigAward;
                awardWaitTime = 5200; //中大奖的时候动画等待时间
                growthGoldTime = 1500;
            }
            //主体的节奏控制
            var tween = egret.Tween.get(this.wheelComp)
                .call(function () {
                utils.SoundUtils.playEffectSound(utils.SoundUtils.diskStop);
                _this.itemPointMc.play("newAnimation", 4); //播放指针动画
            }, this)
                .wait(1000) //等待1秒
                .call(function () {
                __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_TABLE_END);
                awarcFunc(_this.awardCount, _this.popImgFile); //之后播放中奖动画
            }, this)
                .wait(growthGoldTime)
                .call(function () {
                var index = guichu.getProxy().zpGamEndVO ? guichu.getProxy().zpGamEndVO.card - 1 : -1;
                if (index > -1) {
                    guichu.GuiChuTableItemComp.instance[index].copyChouma();
                }
            })
                .wait(awardWaitTime - growthGoldTime) //等待一会儿
                .call(function () {
                if (_this.awardCount > 0) {
                    guichu.getProxy().playWinChoumaAni();
                }
                else {
                    __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_PRO_CHANGE);
                }
                _this.clear(); //执行清理
                if (_this.awardType == AWARD_TYPE.NORMAL_AWARD)
                    __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.SHOW_PAIJIANG);
                var playTime = egret.getTimer() - _this.playStartTime;
                var downTime = Math.floor((guichu.getProxy().zpTable.timeLast - 10000 - playTime) / 1000);
                if (downTime - 2 > 0) {
                    guichu.showCountdown(downTime * 1000);
                }
            }, this);
        };
        GuichuWheelEndHandler.prototype.clear = function () {
            guichu.closeBigAward();
            guichu.closeSmallAward();
            guichu.closeAward();
            if (this.itemPointMc) {
                this.itemPointMc.removeFromParent();
            }
        };
        GuichuWheelEndHandler.prototype.dispose = function () {
            this.clear();
            this.wheelComp = null;
        };
        return GuichuWheelEndHandler;
    }());
    guichu.GuichuWheelEndHandler = GuichuWheelEndHandler;
    __reflect(GuichuWheelEndHandler.prototype, "guichu.GuichuWheelEndHandler", ["gameabc.IDisposer"]);
})(guichu || (guichu = {}));
//# sourceMappingURL=GuichuWheelEndHandler.js.map