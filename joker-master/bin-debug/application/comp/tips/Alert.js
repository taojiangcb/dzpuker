var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tip;
(function (tip) {
    tip.YES = 0x0001; //点击确定(左边的按钮)
    tip.NO = 0x0002; //点击取消(右边的按钮)
    tip.CLOSE = 0; //点击旁边关闭
    tip.ALERT = 0x0001; // 提醒
    tip.CONFIRM = 0x0002; // 确认
    tip.CONFIRM_CHECK = 0x0003;
    tip.CONFIRM_CONTINUE = 0x0004;
    tip.CONFIRM_CHECK_NEW = 0x0005;
    tip.CHARM_ALERT = 0x0006;
    /**
     *
     * @author Wang Xing
     * 确认\取消窗口
     */
    var Alert = (function (_super) {
        __extends(Alert, _super);
        function Alert() {
            var _this = _super.call(this) || this;
            _this.str_title = gameabc.getMessage("STR_PROMPT");
            //            this.isShowCloseButton = false;
            _this.skinName = "resource/app_skin/comp/AlertSkin.exml";
            return _this;
        }
        // public newCheckBoxGroup: eui.Group;
        // public newCheckBox: eui.CheckBox;
        /**
         * 显示Alert组件入口
         * handler(yesOrNo, checkBoxSelected, params) or handler(yesOrNo, params)
         *
         */
        Alert.show = function (content, strTitle, type, handler, obj, thisObject, model, icon, yesBtnImg, noBtnImg) {
            if (type === void 0) { type = tip.ALERT; }
            if (handler === void 0) { handler = null; }
            if (obj === void 0) { obj = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (model === void 0) { model = false; }
            if (icon === void 0) { icon = null; }
            if (yesBtnImg === void 0) { yesBtnImg = null; }
            if (noBtnImg === void 0) { noBtnImg = null; }
            __OPEN_MOUDLE(AppReg.ALERT);
            var alertWnd = __GET_MOUDLE_COMP(AppReg.ALERT);
            alertWnd.str_title = strTitle && strTitle.length > 0
                ? strTitle
                : ""; // gameabc.getMessage("STR_PROMPT");
            alertWnd.type = type;
            alertWnd.obj = obj;
            if (content instanceof Array) {
                alertWnd.htmlContent = content;
            }
            else {
                alertWnd.content = content;
            }
            console.log(content);
            alertWnd.callBackFunc = handler;
            alertWnd.thisObject = thisObject;
            alertWnd.yesBtnIcon = icon;
            alertWnd.yesBtnImg = yesBtnImg;
            alertWnd.noBtnImg = noBtnImg;
            alertWnd.model = model;
            alertWnd.init();
            return alertWnd;
        };
        Alert.prototype.dispose = function () {
            this.unbindButton(this.okBtn);
            this.unbindButton(this.cancelBtn);
            this.callBackFunc = null;
            this.thisObject = null;
            _super.prototype.dispose.call(this);
        };
        Alert.prototype.closeAndClear = function () {
            this.callBackFunc = null;
            this.thisObject = null;
            this.obj = null;
            this.close();
        };
        Alert.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.okBtn:
                    if (this.callBackFunc != null && this.thisObject != null) {
                        if (this.checkBox.visible) {
                            this.callBackFunc.call(this.thisObject, tip.YES, this.checkBox.selected, this.obj);
                        }
                        else {
                            this.callBackFunc.call(this.thisObject, tip.YES, this.obj);
                        }
                    }
                    this.closeAndClear();
                    break;
                case this.closeBtn:
                case this.cancelBtn:
                    if (this.callBackFunc != null && this.thisObject != null) {
                        this.callBackFunc.call(this.thisObject, tip.NO, this.obj);
                    }
                    this.closeAndClear();
                    break;
                case this.modelBg:
                    if (this.callBackFunc != null && this.thisObject != null) {
                        this.callBackFunc.call(this.thisObject, 0, this.obj);
                    }
                    this.closeAndClear();
                    break;
            }
        };
        /**
         * 初始化方法
         */
        Alert.prototype.init = function () {
            if (this.content) {
                this.textLbl.text = this.content;
            }
            else {
                this.textLbl.textFlow = this.htmlContent;
            }
            this.closeBtn.visible = false;
            this.bindButton(this.closeBtn);
            this.bindButton(this.okBtn, true);
            this.bindButton(this.cancelBtn, true);
            this.checkBox.visible = false;
            if (this.yesBtnIcon) {
                this.yesBtnIcon.x = this.okBtn.x;
                this.yesBtnIcon.y = this.okBtn.y;
                this.addChild(this.yesBtnIcon);
            }
            if (this.type != tip.ALERT) {
                if (this.type == tip.CONFIRM_CHECK) {
                    this.cancelBtn.visible = false;
                    this.checkBox.visible = true;
                    this.checkBox.label = gameabc.ResourceBundleUtil.getMessage("NO_CUE");
                }
                if (this.type == tip.CONFIRM_CHECK_NEW) {
                    this.textLbl.textAlign = "left";
                }
                if (this.type == tip.CHARM_ALERT) {
                    this.okimg.source = "img_word_alert_qudapai_png";
                    this.okBtn.horizontalCenter = 0;
                    this.cancelBtn.visible = false;
                    this.closeBtn.visible = true;
                }
            }
            else {
                this.cancelBtn.visible = false;
                this.okBtn.horizontalCenter = 0;
            }
            this.modelBg.visible = this.model;
            if (this.model)
                this.bindButton(this.modelBg, false);
            if (this.str_title == "") {
                this.iconTitle.visible = true;
                this.txtTitle.visible = false;
            }
            else {
                this.txtTitle.text = this.str_title;
                this.iconTitle.visible = false;
                this.txtTitle.visible = true;
            }
            this.resetBtnLabel();
        };
        Alert.prototype.resetBtnLabel = function () {
            if (this.yesBtnImg) {
                this.okimg.source = this.yesBtnImg;
            } //else this.okimg.source  = "img_word_info_queding_png";
            if (this.noBtnImg) {
                this.cancelimg.source = this.noBtnImg;
            } //else this.cancelimg.source = "img_word_info_quxiao_png";
        };
        Object.defineProperty(Alert.prototype, "featherSpace", {
            get: function () {
                return AppRoot.gameLayer.loadLayer;
            },
            enumerable: true,
            configurable: true
        });
        return Alert;
    }(app.base.BaseWndUIMoudleComponent));
    tip.Alert = Alert;
    __reflect(Alert.prototype, "tip.Alert");
})(tip || (tip = {}));
//# sourceMappingURL=Alert.js.map