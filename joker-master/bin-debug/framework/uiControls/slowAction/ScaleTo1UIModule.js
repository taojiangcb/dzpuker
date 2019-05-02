/**
 * Created by taojiang on 16/4/25.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 弹出窗口从scale:0到scale1的动画弹出
 */
var gameabc;
(function (gameabc) {
    var ScaleTo1UIModule = (function (_super) {
        __extends(ScaleTo1UIModule, _super);
        function ScaleTo1UIModule() {
            return _super.call(this) || this;
        }
        ScaleTo1UIModule.prototype.openSlowAction = function () {
            if (this.gui && this.gui.parent != null) {
                this.gui.scaleX = this.gui.scaleY = 0.5;
                egret.Tween.removeTweens(this.gui);
                this.tween = egret.Tween.get(this.gui);
                this.tween.to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
            }
        };
        ScaleTo1UIModule.prototype.close = function () {
            if (this.gui) {
                egret.Tween.removeTweens(this.gui);
            }
            _super.prototype.close.call(this);
        };
        ScaleTo1UIModule.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return ScaleTo1UIModule;
    }(gameabc.UIMoudle));
    gameabc.ScaleTo1UIModule = ScaleTo1UIModule;
    __reflect(ScaleTo1UIModule.prototype, "gameabc.ScaleTo1UIModule");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=ScaleTo1UIModule.js.map