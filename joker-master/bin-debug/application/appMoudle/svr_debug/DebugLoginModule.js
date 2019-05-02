var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/27.
 */
var svrDebug;
(function (svrDebug) {
    var DebugLoginModule = (function (_super) {
        __extends(DebugLoginModule, _super);
        function DebugLoginModule() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/login/DebugLoginSkin.exml";
            return _this;
        }
        DebugLoginModule.prototype.createComplete = function (event) {
            var _this = this;
            _super.prototype.createComplete.call(this, event);
            this.radioGroup = new eui.RadioButtonGroup();
            this.radio1.group = this.radioGroup;
            this.radio2.group = this.radioGroup;
            this.radio3.group = this.radioGroup;
            this.radio4.group = this.radioGroup;
            this.radio5.group = this.radioGroup;
            this.radio6.group = this.radioGroup;
            this.radio7.group = this.radioGroup;
            this.radio8.group = this.radioGroup;
            this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                AppGlobal.DebugRoleId = _this.radioGroup.selectedValue;
                if (cy.srsServer == null)
                    cy.srsServer = new svrDebug.DebugServer("127.0.0.1", 7777);
                cy.srsServer.connect();
                __OPEN_PRE_MOUDLE(AppReg.APP_MAIN_UI);
                __CLOSE_MOUDLE_UI(_this);
            }, this);
        };
        return DebugLoginModule;
    }(app.base.BaseWndUIMoudleComponent));
    svrDebug.DebugLoginModule = DebugLoginModule;
    __reflect(DebugLoginModule.prototype, "svrDebug.DebugLoginModule");
})(svrDebug || (svrDebug = {}));
//# sourceMappingURL=DebugLoginModule.js.map