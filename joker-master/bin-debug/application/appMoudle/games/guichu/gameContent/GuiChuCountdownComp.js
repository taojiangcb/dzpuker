var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guichu;
(function (guichu) {
    var countdownComp;
    function showCountdown(countTime, callFunction, callObject) {
        if (callFunction === void 0) { callFunction = null; }
        if (callObject === void 0) { callObject = null; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (countdownComp)
            countdownComp.removeFromParent(true);
        countdownComp = new GuiChuCountdownComp(countTime, callFunction, callObject, args);
        var root = __GET_MOUDLE(AppReg.GUICHU).gui;
        countdownComp.horizontalCenter = 0;
        root.countdownGroup.addChild(countdownComp);
    }
    guichu.showCountdown = showCountdown;
    function clearCountdown() {
        if (countdownComp)
            countdownComp.removeFromParent(true);
        countdownComp = null;
    }
    guichu.clearCountdown = clearCountdown;
    var GuiChuCountdownComp = (function (_super) {
        __extends(GuiChuCountdownComp, _super);
        function GuiChuCountdownComp(countTime, callFunction, callObject, args) {
            var _this = _super.call(this) || this;
            _this.DEBUG = false;
            _this.countTime = countTime;
            _this.callFunction = callFunction;
            _this.callObject = callObject;
            _this.callArgs = args;
            _this.skinName = "GuiChuCountdownCompSkin";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addedToStage, _this);
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.enterFrame, _this);
            return _this;
        }
        GuiChuCountdownComp.prototype.addedToStage = function () {
            this.tween.play();
        };
        GuiChuCountdownComp.prototype.enterFrame = function () {
            var nowTime = app.SystemTimer.getServerTime();
            var frameTime;
            if (this.lastTime == null)
                this.lastTime = nowTime;
            frameTime = nowTime - this.lastTime;
            this.countTime -= frameTime;
            if (this.DEBUG)
                console.log("nowTime = " + nowTime + " frameSeconds = " + frameTime + " countTime = " + this.countTime);
            if (this.countTime < 0) {
                if (this.callFunction && this.callObject)
                    this.callFunction.apply(this.callObject, this.callArgs);
                // this.removeFromParent(true);
                this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            }
            else {
                this.label.text = Math.floor(this.countTime / 1000).toString();
                this.lastTime = nowTime;
            }
        };
        GuiChuCountdownComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.DEBUG)
                console.log("countdown comp remove");
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
        };
        return GuiChuCountdownComp;
    }(gameabc.UICustomComponent));
    guichu.GuiChuCountdownComp = GuiChuCountdownComp;
    __reflect(GuiChuCountdownComp.prototype, "guichu.GuiChuCountdownComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuCountdownComp.js.map