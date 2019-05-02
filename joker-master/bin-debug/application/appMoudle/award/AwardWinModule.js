var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/8.
 */
var award;
(function (award) {
    function show(contMsg, urlTitle, reward, callFunc, callParams, callObj) {
        if (urlTitle === void 0) { urlTitle = "img_word_shop_goumaichenggong_png"; }
        if (reward === void 0) { reward = 0; }
        var awardUIModule = __GET_MOUDLE(AppReg.AWARD_WIN);
        if (awardUIModule == null || awardUIModule.uiState != gameabc.UIConstants.UI_STATE_OPEN) {
            var uiParam = {
                contMsg: contMsg,
                titleUrl: urlTitle,
                reward: reward,
                callFunc: callFunc,
                callParams: callParams,
                callObj: callObj
            };
            __OPEN_MOUDLE(AppReg.AWARD_WIN, uiParam);
        }
    }
    award.show = show;
    var AwardWinModule = (function (_super) {
        __extends(AwardWinModule, _super);
        function AwardWinModule() {
            var _this = _super.call(this) || this;
            _this.titleUrl = "";
            _this.reward = 0;
            _this.contMsg = "";
            _this.callFunc = null;
            _this.skinName = "resource/app_skin/award/AwardWinSkin.exml";
            return _this;
        }
        AwardWinModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnAward);
        };
        AwardWinModule.prototype.opening = function () {
            if (this.uiOpenData) {
                this.titleUrl = this.uiOpenData.titleUrl;
                this.reward = this.uiOpenData.reward;
                this.contMsg = this.uiOpenData.contMsg;
                this.callFunc = this.uiOpenData.callFunc;
                this.callParams = this.uiOpenData.callParams;
                this.callObj = this.uiOpenData.callObj;
            }
        };
        AwardWinModule.prototype.touchBindButtonHandler = function (clickTarget) {
            if (clickTarget == this.btnAward) {
                if (this.callFunc != null) {
                    this.callFunc.call(this.callObj, this.callParams);
                }
            }
            this.close();
        };
        AwardWinModule.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            var titleTexture = RES.getRes(this.titleUrl);
            this.imgTitle.texture = titleTexture;
            this.txtMsg.text = this.contMsg;
            this.txtAward.text = this.reward.toString();
        };
        return AwardWinModule;
    }(app.base.BaseUIMoudleComponent));
    award.AwardWinModule = AwardWinModule;
    __reflect(AwardWinModule.prototype, "award.AwardWinModule");
})(award || (award = {}));
//# sourceMappingURL=AwardWinModule.js.map