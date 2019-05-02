var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var joker;
(function (joker) {
    var JokerRatioUIModule = (function (_super) {
        __extends(JokerRatioUIModule, _super);
        function JokerRatioUIModule() {
            var _this = _super.call(this) || this;
            _this.firstChroose = false;
            _this.oldX = 124;
            _this.skinName = "resource/app_skin/joker/JokerRatioUIModule.exml";
            return _this;
        }
        JokerRatioUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnClose);
            if (this.gameUIModule) {
                this.gameUIModule.bodyContent.visible = false;
            }
        };
        JokerRatioUIModule.prototype.opening = function () {
            _super.prototype.opening.call(this);
            this.renderChroose(this.firstChroose);
            this.firstChroose = true;
        };
        JokerRatioUIModule.prototype.removeParent = function () {
            if (this.gameUIModule) {
                this.gameUIModule.bodyContent.visible = true;
            }
            _super.prototype.removeParent.call(this);
        };
        JokerRatioUIModule.prototype.touchBindButtonHandler = function (tag) {
            var target = tag;
            switch (target) {
                case this.btnClose:
                    this.close(this);
                    break;
            }
        };
        JokerRatioUIModule.prototype.renderChroose = function (showTween) {
            if (showTween === void 0) { showTween = true; }
            var sx = 124;
            var sw = 143;
            var ratio = joker.getProxy().nowRatio;
            var index = ratio - 1;
            var newX = sx + index * sw;
            if (newX != this.oldX) {
                this.oldX = newX;
                if (showTween) {
                    egret.Tween.removeTweens(this.img_chroose);
                    egret.Tween.get(this.img_chroose)
                        .to({ x: newX }, 400, egret.Ease.quadOut);
                }
                else {
                    this.img_chroose.x = newX;
                }
            }
        };
        Object.defineProperty(JokerRatioUIModule.prototype, "gameUIModule", {
            get: function () {
                if (__IS_MOUDLE_OPEN(AppReg.JOKER_MODULE)) {
                    return __GET_MOUDLE_COMP(AppReg.JOKER_MODULE);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        JokerRatioUIModule.prototype.dispose = function () {
            egret.Tween.removeTweens(this.img_chroose);
            _super.prototype.dispose.call(this);
        };
        return JokerRatioUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    joker.JokerRatioUIModule = JokerRatioUIModule;
    __reflect(JokerRatioUIModule.prototype, "joker.JokerRatioUIModule");
})(joker || (joker = {}));
//# sourceMappingURL=JokerRatioUIModule.js.map