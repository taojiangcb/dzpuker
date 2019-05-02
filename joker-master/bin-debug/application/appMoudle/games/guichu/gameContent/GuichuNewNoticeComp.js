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
    var label;
    var NOTICE_TYPE;
    (function (NOTICE_TYPE) {
        NOTICE_TYPE[NOTICE_TYPE["BET"] = 0] = "BET";
        NOTICE_TYPE[NOTICE_TYPE["WHEEL"] = 1] = "WHEEL";
    })(NOTICE_TYPE = guichu.NOTICE_TYPE || (guichu.NOTICE_TYPE = {}));
    function showNotice(type, callFunc, thisObject) {
        var root = AppRoot.gameLayer;
        if (label) {
            label.dispose();
            label = null;
        }
        label = new GuichuNewNoticeComp(type, callFunc, thisObject);
        root.addChild(label);
    }
    guichu.showNotice = showNotice;
    function closeNotice() {
        if (label) {
            label.dispose();
        }
        label = null;
    }
    guichu.closeNotice = closeNotice;
    var GuichuNewNoticeComp = (function (_super) {
        __extends(GuichuNewNoticeComp, _super);
        function GuichuNewNoticeComp(type, callFunc, thisObject) {
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.callFunc = callFunc;
            _this.thisObject = thisObject;
            _this.left = _this.top = _this.bottom = _this.right = 0;
            _this.skinName = "GuichuNewNoticeCompSkin";
            return _this;
        }
        GuichuNewNoticeComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.group.verticalCenter = -80;
            this.bg.source = "guichu_bg_notice_" + this.type + "_png";
            this.word.source = "guichu_word_notice_" + this.type + "_png";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
        };
        GuichuNewNoticeComp.prototype.addedToStage = function () {
            var _this = this;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            egret.Tween.get(this.bg)
                .set({ scaleX: 1.5, scaleY: 1.5, alpha: 0 })
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400, egret.Ease.sineIn)
                .call(function () {
                if (_this.type == NOTICE_TYPE.BET) {
                    utils.SoundUtils.playEffectSound(utils.SoundUtils.noticeXiazhu);
                }
                else if (_this.type == NOTICE_TYPE.WHEEL) {
                    utils.SoundUtils.playEffectSound(utils.SoundUtils.noticeKaijiang);
                }
            })
                .wait(700)
                .to({ scaleY: 1.5, alpha: 0 }, 300)
                .call(function () {
                if (_this.callFunc && _this.thisObject)
                    _this.callFunc.apply(_this.thisObject);
            })
                .call(function () {
                _this.dispose();
            });
            egret.Tween.get(this.word).set({ alpha: 0 }).to({ alpha: 1 }, 400).wait(700).to({ alpha: 0 }, 300);
            // egret.Tween.get(this).wait(1000).call(()=>{
            //     if (this.callFunc && this.thisObject) this.callFunc.apply(this.thisObject);
            // }).to({alpha: 0}, 1000).call(()=>{
            //     this.dispose();
            // });
        };
        GuichuNewNoticeComp.prototype.dispose = function () {
            egret.Tween.removeTweens(this.bg);
            egret.Tween.removeTweens(this.word);
            this.removeFromParent();
        };
        return GuichuNewNoticeComp;
    }(gameabc.UICustomComponent));
    guichu.GuichuNewNoticeComp = GuichuNewNoticeComp;
    __reflect(GuichuNewNoticeComp.prototype, "guichu.GuichuNewNoticeComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuichuNewNoticeComp.js.map