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
    var DebugLogin = (function (_super) {
        __extends(DebugLogin, _super);
        function DebugLogin() {
            var _this = _super.call(this) || this;
            _this.skinName = "DebugLoginSkin";
            return _this;
        }
        DebugLogin.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            __REGISTER_MEDIATOR(guichu.LoginMediator);
            this.password.displayAsPassword = true;
            this.bindButton(this.login);
            this.serverlist.itemRenderer = login.LoginServerListItem;
            this.serverlist.dataProvider = new eui.ArrayCollection(cy.getChrooseSrsList());
            this.serverlist.selectedIndex = 0;
            this.serverlist.visible = false;
            this.serverlist.addEventListener(egret.Event.CHANGE, this.onServerList, this);
            this.iptext.text = this.serverlist.selectedItem.label;
            this.bindButton(this.iptext, false);
            utils.SoundUtils.stopBgSound();
        };
        DebugLogin.prototype.onServerList = function () {
            console.log(this.serverlist.selectedIndex);
            this.iptext.text = this.serverlist.selectedItem.label;
            this.serverlist.visible = false;
        };
        DebugLogin.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.login:
                    this.loginEvent();
                    // this.loginSuccess();
                    break;
                case this.iptext:
                    this.serverlist.visible = !this.serverlist.visible;
                    break;
            }
        };
        DebugLogin.prototype.loginEvent = function () {
            var srsIp = this.serverlist.selectedItem;
            var loginName = this.account.text;
            var loginPass = this.password.text;
            guichu.loginLogiC().onLogin(srsIp, loginName, loginPass, guichu.loginLogiC().getUserType());
        };
        DebugLogin.prototype.dispose = function () {
            __REMOVE_MEDIATOR(guichu.LoginMediator);
            _super.prototype.dispose.call(this);
        };
        return DebugLogin;
    }(app.base.BaseSceneUIMoudleComponent));
    guichu.DebugLogin = DebugLogin;
    __reflect(DebugLogin.prototype, "guichu.DebugLogin");
})(guichu || (guichu = {}));
//# sourceMappingURL=DebugLogin.js.map