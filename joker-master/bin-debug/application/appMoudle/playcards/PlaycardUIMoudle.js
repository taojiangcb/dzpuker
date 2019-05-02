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
     *
     * @author
     *
     */
    var PlaycardUIMoudle = (function (_super) {
        __extends(PlaycardUIMoudle, _super);
        function PlaycardUIMoudle() {
            return _super.call(this) || this;
        }
        PlaycardUIMoudle.prototype.onSmartCloseHandler = function (event) {
            if (event.target == this.modalRect) {
                __CLOSE_MOUDLE(this.uid);
            }
        };
        PlaycardUIMoudle.prototype.close = function () {
            _super.prototype.close.call(this);
            if (this.gui) {
                this.gui.visible = true;
                this.gui.alpha = 1;
            }
            if (this.modalRect) {
                this.modalRect.visible = true;
                this.modalRect.alpha = 1;
            }
        };
        PlaycardUIMoudle.prototype.open = function (data, hideMoudles, pt, continer) {
            if (data === void 0) { data = null; }
            if (hideMoudles === void 0) { hideMoudles = null; }
            if (pt === void 0) { pt = null; }
            if (continer === void 0) { continer = null; }
            _super.prototype.open.call(this, data, hideMoudles, pt, continer);
            if (this.gui != null && this.gui.visible == false) {
                this.tweenShow();
                this.gui.opening();
            }
        };
        /**渐显 */
        PlaycardUIMoudle.prototype.tweenShow = function () {
            if (this.gui) {
                egret.Tween.removeTweens(this.gui);
                this.gui.scaleX = this.gui.scaleY = 1;
                this.gui.visible = true;
                egret.Tween.get(this.gui).to({ alpha: 1 }, 300);
            }
            if (this.modalRect) {
                egret.Tween.removeTweens(this.modalRect);
                this.modalRect.visible = true;
                egret.Tween.get(this.modalRect).to({ alpha: 1 }, 300);
            }
        };
        PlaycardUIMoudle.prototype.setvisable = function () {
            this.gui.visible = false;
            if (this.modalRect)
                this.modalRect.visible = false;
        };
        /**渐隐藏 */
        PlaycardUIMoudle.prototype.tweenHide = function () {
            if (this.gui) {
                egret.Tween.removeTweens(this.gui);
                this.gui.scaleX = this.gui.scaleY = 1;
                this.gui.visible = true;
                egret.Tween.get(this.gui).to({ alpha: 0 }, 300).call(this.setvisable, this);
            }
            if (this.modalRect) {
                egret.Tween.removeTweens(this.modalRect);
                this.modalRect.visible = true;
                egret.Tween.get(this.modalRect).to({ alpha: 0 }, 300);
            }
        };
        return PlaycardUIMoudle;
    }(gameabc.ScaleTo1UIModule));
    playcards.PlaycardUIMoudle = PlaycardUIMoudle;
    __reflect(PlaycardUIMoudle.prototype, "playcards.PlaycardUIMoudle");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlaycardUIMoudle.js.map