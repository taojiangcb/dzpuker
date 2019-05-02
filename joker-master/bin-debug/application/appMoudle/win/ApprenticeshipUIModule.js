var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var win;
(function (win) {
    /**
     * 出师、成长奖励引导
     */
    var ApprenticeshipUIModule = (function (_super) {
        __extends(ApprenticeshipUIModule, _super);
        function ApprenticeshipUIModule() {
            var _this = _super.call(this) || this;
            _this.skinName = "ApprenticeshipUIModuleSkin";
            _this.top = 0;
            _this.bottom = 0;
            _this.left = 0;
            _this.right = 0;
            return _this;
        }
        ApprenticeshipUIModule.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.bindButton(this._btn_close, true);
            this.bindButton(this._btn_saishi, true);
            this.bindButton(this._btn_youxi, true);
            egret.Tween.get(this.jinbeiLight, { "loop": true }).to({ "rotation": 360 }, 3000);
        };
        ApprenticeshipUIModule.prototype.opening = function () {
            this._txt_info1.text = gameabc.getMessage("Apprenticeship_INFO1");
            this._txt_info2.text = gameabc.getMessage("Apprenticeship_INFO2");
        };
        ApprenticeshipUIModule.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this._btn_close:
                    this.close();
                    break;
                case this._btn_saishi:
                    this.close();
                    __OPEN_PRE_MOUDLE(AppReg.MATCH_MAIN, null, [AppReg.APP_MAIN_UI]);
                    break;
                case this._btn_youxi:
                    this.close();
                    __OPEN_PRE_MOUDLE(AppReg.ROOM, null, [AppReg.APP_MAIN_UI]);
                    break;
            }
        };
        ApprenticeshipUIModule.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return ApprenticeshipUIModule;
    }(app.base.BaseSceneUIMoudleComponent));
    win.ApprenticeshipUIModule = ApprenticeshipUIModule;
    __reflect(ApprenticeshipUIModule.prototype, "win.ApprenticeshipUIModule");
})(win || (win = {}));
//# sourceMappingURL=ApprenticeshipUIModule.js.map