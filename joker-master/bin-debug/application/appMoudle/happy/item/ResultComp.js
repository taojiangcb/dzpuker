var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var ResultComp = (function (_super) {
        __extends(ResultComp, _super);
        function ResultComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "ResultCompSkin";
            _this.touchEnabled = false;
            return _this;
        }
        //   public createComplete(event: egret.Event): void {
        //   this.initialized = true;
        //   if (this.num != null) this.tweenShow();
        // }
        ResultComp.prototype.showType = function (iswin, num, parent, showResult) {
            this.iswin = iswin;
            this.num = num;
            this.showResult = showResult;
            this.visible = true;
            parent.addChild(this);
            // if (this.initialized)
            this.tweenShow();
        };
        ResultComp.prototype.tweenShow = function () {
            if (this.iswin) {
                this.bgimg.source = "icon_happy_hj_dt_png";
                this.labimg.source = "img_word_happy_gxjhd_png";
                utils.SoundUtils.playEffectSound(utils.SoundUtils.win);
            }
            else {
                this.bgimg.source = "icon_happy_hj_dt1_png";
                this.labimg.source = "img_word_happy_yhsl_png";
            }
            this.moneylab.text = this.num + "";
            this.y = 400;
            this.x = 208;
            this.alpha = 0;
            egret.Tween.get(this).to({ y: 310, alpha: 1 }, 300);
            this.timeId = egret.setTimeout(this.tweenHide, this, 2000);
        };
        ResultComp.prototype.tweenHide = function () {
            egret.Tween.get(this).to({ alpha: 0 }, 200).call(this.hide, this);
        };
        ResultComp.prototype.hide = function () {
            this.removeFromParent();
            egret.Tween.removeTweens(this);
            egret.clearTimeout(this.timeId);
            if (this.showResult && room.getProxy().current) {
                var bets = happy.getProxy().allWinBet[room.getProxy().current.svrRoomId];
                if (bets) {
                    if (bets[6] != 0 && bets[6] == bets[8]) {
                        __OPEN_MOUDLE(AppReg.APP_HAPPY_REWARD, bets);
                    }
                }
            }
        };
        return ResultComp;
    }(gameabc.UICustomComponent));
    happy.ResultComp = ResultComp;
    __reflect(ResultComp.prototype, "happy.ResultComp");
})(happy || (happy = {}));
//# sourceMappingURL=ResultComp.js.map