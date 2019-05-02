var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sng;
(function (sng) {
    var SngMoudle = (function (_super) {
        __extends(SngMoudle, _super);
        function SngMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "SngSkin";
            return _this;
        }
        SngMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.rendererList = [this.listItem1, this.listItem2, this.listItem3];
            this.registerMediator(sng.SngMediator);
            this.bindButton(this.infoButton);
            this.bindButton(this.rwardButton);
            this.updateData();
            this.updateCoin();
            this.playTween();
            // this.wheelComp.playAndGoto(7758258);
            this.wheelComp.removeFromParent();
            __SEND_NOTIFICATION(app.NetAction.REQGETMATCHLIST);
        };
        SngMoudle.prototype.playTween = function () {
            for (var i = 0; i < 3; ++i) {
                egret.Tween.removeTweens(this.rendererList[i]);
                this.rendererList[i].y = 452 + 145 * i;
                this.rendererList[i].alpha = 0;
                egret.setTimeout(this.tweenTo, this, 60 * i + (i * i * 2) + 300, this.rendererList[i], 170 + 145 * i);
            }
        };
        SngMoudle.prototype.tweenTo = function (obj, y) {
            egret.Tween.get(obj).to({ y: y, alpha: 1 }, 220, egret.Ease.sineOut);
        };
        SngMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.infoButton:
                    __OPEN_MOUDLE(AppReg.SNG_RULE);
                    return;
                case this.rwardButton:
                    __OPEN_MOUDLE(AppReg.CURRENT_MATCH_INFO);
                    return;
            }
        };
        SngMoudle.prototype.updateData = function () {
            for (var i = 0; i < 3; ++i) {
                var item = this.rendererList[i];
                item.data = match.getProxy().sngList[i];
            }
        };
        SngMoudle.prototype.updateCoin = function () {
            if (user.getProxy().svrGameData != null) {
                this.txtCou.text = FormatUtils.qian(user.getProxy().svrGameData.silver) + "";
            }
        };
        SngMoudle.prototype.close = function () {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
        };
        return SngMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    sng.SngMoudle = SngMoudle;
    __reflect(SngMoudle.prototype, "sng.SngMoudle");
})(sng || (sng = {}));
//# sourceMappingURL=SngMoudle.js.map