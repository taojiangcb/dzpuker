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
    var GuichuAutoLogin = (function (_super) {
        __extends(GuichuAutoLogin, _super);
        function GuichuAutoLogin() {
            var _this = _super.call(this) || this;
            _this.intervalId = 0;
            _this.numberOf = 0;
            _this.skinName = "resource/app_skin/guichu/AutoLogin.exml";
            return _this;
        }
        GuichuAutoLogin.prototype.createComplete = function (event) {
            var _this = this;
            _super.prototype.createComplete.call(this, event);
            if (this.intervalId > 0)
                egret.clearInterval(this.intervalId);
            this.intervalId = egret.setInterval(function () {
                if (_this.numberOf > 3) {
                    _this.numberOf = 0;
                }
                var ts = "";
                for (var i = 0; i < _this.numberOf; i++) {
                    ts += ".";
                }
                _this.loginTxt.text = "正在登录" + ts;
                _this.numberOf++;
            }, this, 300);
            __REGISTER_MEDIATOR(guichu.LoginMediator);
            this.autoLogin();
        };
        GuichuAutoLogin.prototype.autoLogin = function () {
            /**
            * url传入的参数
            */
            var obj = utils.NativeUtils.getURLObj();
            if (obj["userid"] != null) {
                console.log("url param:" + location.search);
                var loginName = URI.decode(obj["userid"]);
                var loginPass = "";
                var loginUserType = guichu.loginLogiC().getUserType();
                var hardwareId = "";
                var svrSession = "";
                var ips = cy.getChrooseSrsList();
                var ip = obj["srs"] ? this.searchSrsInList(obj["srs"]) : cy.getSrsIp();
                if (obj["pass"] != null) {
                    loginPass = obj["pass"];
                    loginUserType = guichu.loginLogiC().getUserType();
                }
                else if (obj["sessionid"] != null) {
                    loginUserType = 7 /* SESSION */;
                    loginPass = obj["sessionid"];
                }
                if (obj["hdid"] != null) {
                    hardwareId = obj["hdid"];
                }
                // console.log("onLogin funcion 1");
                // tip.Alert.show(location.href + location.search.substring(1),"",tip.CONFIRM,(type:number)=> {
                // 	console.log("onLogin funcion 2");
                // 	if(type == tip.YES) {
                // 		guichu.loginLogiC().onLogin(ip,loginName,loginPass,loginUserType,hardwareId);	
                // 	}
                // },null,this);
                guichu.loginLogiC().onLogin(ip, loginName, loginPass, loginUserType, hardwareId);
            }
        };
        GuichuAutoLogin.prototype.searchSrsInList = function (info) {
            var ips = cy.getChrooseSrsList();
            var i = ips.length;
            while (--i > -1) {
                var data = ips[i];
                if (data.ip.lastIndexOf("." + info) != -1) {
                    return data;
                }
            }
            return ips[0];
        };
        GuichuAutoLogin.prototype.dispose = function () {
            if (this.intervalId > 0)
                egret.clearInterval(this.intervalId);
            __REMOVE_MEDIATOR(guichu.LoginMediator);
            _super.prototype.dispose.call(this);
        };
        return GuichuAutoLogin;
    }(app.base.BaseSceneUIMoudleComponent));
    guichu.GuichuAutoLogin = GuichuAutoLogin;
    __reflect(GuichuAutoLogin.prototype, "guichu.GuichuAutoLogin");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuichuAutoLogin.js.map