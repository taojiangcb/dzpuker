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
    /**
     *界面基类
     * @author
     *
     */
    var PlaycardsUIComp = (function (_super) {
        __extends(PlaycardsUIComp, _super);
        function PlaycardsUIComp() {
            return _super.call(this) || this;
        }
        PlaycardsUIComp.prototype.close = function () {
            this.removeFromParent();
            this.alpha = 1;
            this.visible = true;
        };
        /**渐显 */
        PlaycardsUIComp.prototype.tweenShow = function () {
            egret.Tween.removeTweens(this);
            if (!this.visible) {
                this.visible = true;
                egret.Tween.get(this).to({ alpha: 1 }, 300);
            }
            else
                this.alpha = 1;
        };
        PlaycardsUIComp.prototype.setvisable = function () {
            this.visible = false;
        };
        /**渐隐藏 */
        PlaycardsUIComp.prototype.tweenHide = function () {
            egret.Tween.removeTweens(this);
            this.visible = true;
            egret.Tween.get(this).to({ alpha: 0 }, 300).call(this.setvisable, this);
        };
        return PlaycardsUIComp;
    }(gameabc.UICustomComponent));
    playcards.PlaycardsUIComp = PlaycardsUIComp;
    __reflect(PlaycardsUIComp.prototype, "playcards.PlaycardsUIComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlaycardsUIComp.js.map