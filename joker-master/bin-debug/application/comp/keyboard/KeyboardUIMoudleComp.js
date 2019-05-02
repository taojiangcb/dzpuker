var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uicomps;
(function (uicomps) {
    var KeyboardUIMoudleComp = (function (_super) {
        __extends(KeyboardUIMoudleComp, _super);
        function KeyboardUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "KeyboardUIMoudleCompSkin";
            return _this;
        }
        KeyboardUIMoudleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnclose);
            this.keyboard.buttonListener = this.touchBindButtonHandler;
            this.keyboard.buttonListenerObj = this;
            this.keyboard.numberInput.maxChars = 9;
            this.keyboard.infoLabel.source = null;
            this.keyboard.numberInput.text = this.defaultNum;
        };
        KeyboardUIMoudleComp.show = function (handler, thisObject, defaultNum) {
            if (handler === void 0) { handler = null; }
            if (thisObject === void 0) { thisObject = null; }
            if (defaultNum === void 0) { defaultNum = ""; }
            __OPEN_MOUDLE(AppReg.KEYBOARD);
            var keyboardWnd = __GET_MOUDLE_COMP(AppReg.KEYBOARD);
            keyboardWnd.callBackFunc = handler;
            keyboardWnd.thisObject = thisObject;
            keyboardWnd.defaultNum = defaultNum;
            if (keyboardWnd.keyboard != null) {
                keyboardWnd.keyboard.buttonListener = keyboardWnd.touchBindButtonHandler;
                keyboardWnd.keyboard.buttonListenerObj = keyboardWnd;
                keyboardWnd.keyboard.numberInput.text = defaultNum;
            }
            return keyboardWnd;
        };
        KeyboardUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnclose:
                    if (this.callBackFunc != null) {
                        this.callBackFunc.call(this.thisObject, null);
                    }
                    this.close();
                    break;
                case this.keyboard.enterButton:
                case this.keyboard.gotoImage:
                    if (this.callBackFunc != null) {
                        this.callBackFunc.call(this.thisObject, Number(this.keyboard.numberInput.text));
                    }
                    this.close();
                    break;
            }
        };
        KeyboardUIMoudleComp.prototype.dispose = function () {
            this.unbindButton(this.btnclose);
            this.callBackFunc = null;
            this.thisObject = null;
            if (this.keyboard) {
                this.keyboard.buttonListener = null;
                this.keyboard.buttonListenerObj = null;
            }
            _super.prototype.dispose.call(this);
        };
        return KeyboardUIMoudleComp;
    }(app.base.BaseWndUIMoudleComponent));
    uicomps.KeyboardUIMoudleComp = KeyboardUIMoudleComp;
    __reflect(KeyboardUIMoudleComp.prototype, "uicomps.KeyboardUIMoudleComp");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=KeyboardUIMoudleComp.js.map