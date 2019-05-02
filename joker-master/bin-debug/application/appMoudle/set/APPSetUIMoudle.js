var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var setting;
(function (setting) {
    /*** 设置相关界面
* @author
*
*/
    var APPSetUIMoudle = (function (_super) {
        __extends(APPSetUIMoudle, _super);
        function APPSetUIMoudle() {
            var _this = _super.call(this) || this;
            if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
                _this.skinName = "resource/app_skin/setting/PCSetUIMoudleSkin.exml";
            }
            else {
                _this.skinName = "resource/app_skin/setting/APPSetUIMoudleSkin.exml";
            }
            return _this;
        }
        APPSetUIMoudle.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.bindButton(this.bgimage, false);
            if (this.okBtn) {
                this.bindButton(this.okBtn);
            }
            if (this.btnColse) {
                this.bindButton(this.btnColse);
            }
            /**
             * 第三方渠道不要显示注销按钮
             */
            var exitValidate = false;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                if (!platform.isBfdzpkdrChannel()) {
                    exitValidate = true;
                    this.canceBtn.removeFromParent(true);
                }
            }
            if (!exitValidate) {
                this.bindButton(this.canceBtn);
                if (AppConst.LOGING_CAN_BOOL) {
                    this.canceBtn.visible = false;
                }
                else {
                    this.canceBtn.visible = true;
                }
            }
            this.fristList.itemRenderer = setting.PCSetItem;
            this.textName.text = user.getProxy().svrName + "";
            setting.getProxy().getShock();
            if (platform.isGTChannel()) {
                this.verTxt.visible = true;
                this.verTxt.text = platform.NATIVE_VER;
            }
            else {
                this.verTxt.visible = false;
            }
            //this.verTxt.text = gameabc.ResourceBundleUtil.getMessage("VERSION_ID_TIPS") + AppConst.VERSION_STR;
            //             this.bindButton(this.toggle1);
            //             this.toggle1.selected =setting.getProxy().getShock()?true:false ;
        };
        APPSetUIMoudle.prototype.opening = function () {
            //             this.toggle1.selected =setting.getProxy().getShock()?true:false ;
        };
        APPSetUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.bgimage:
                case this.okBtn:
                case this.btnColse:
                    this.clickBackEvent();
                    break;
                case this.canceBtn:
                    this.clickBackEvent();
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION);
                    break;
            }
        };
        APPSetUIMoudle.prototype.onEnter = function (evt) {
            if (evt === void 0) { evt = null; }
            // setting.getProxy().setShock(this.toggle1.selected?1:0);
        };
        APPSetUIMoudle.prototype.clickBackEvent = function () {
            this.close();
        };
        APPSetUIMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return APPSetUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    setting.APPSetUIMoudle = APPSetUIMoudle;
    __reflect(APPSetUIMoudle.prototype, "setting.APPSetUIMoudle");
})(setting || (setting = {}));
//# sourceMappingURL=APPSetUIMoudle.js.map