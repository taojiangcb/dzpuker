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
    var KeyboardComp = (function (_super) {
        __extends(KeyboardComp, _super);
        function KeyboardComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "KeyboardSkin";
            return _this;
        }
        KeyboardComp.prototype.createComplete = function (event) {
            this.infoLabel.touchEnabled = false;
            this.delButton = this._comp_subKeyBoard.delButton;
            this.enterButton = this._comp_subKeyBoard.enterButton;
            this.bindButton(this.delButton);
            this.bindButton(this.enterButton);
            for (var i = 0; i < 10; ++i) {
                this.bindButton(this._comp_subKeyBoard.inputButtonArray[i]);
            }
            this.bindButton(this.gotoImage);
            this.numberInput.maxChars = 6;
            this.numberInput.addEventListener(egret.Event.CHANGE, this.onInputChange, this);
        };
        KeyboardComp.prototype.onInputChange = function (evt) {
            this.infoLabel.visible = Boolean(this.numberInput.text.length == 0);
        };
        KeyboardComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.delButton:
                    var len = this.numberInput.text.length;
                    if (len > 0) {
                        this.numberInput.text = this.numberInput.text.substring(0, len - 1);
                    }
                    this.onInputChange(null);
                    return;
            }
            if (this.buttonListener != null) {
                this.buttonListener.call(this.buttonListenerObj, clickTarget);
            }
            if (this.numberInput.text.length >= this.numberInput.maxChars)
                return;
            for (var i = 0; i < 10; ++i) {
                if (this._comp_subKeyBoard.inputButtonArray[i] == clickTarget) {
                    this.numberInput.text += String(i);
                }
            }
            this.onInputChange(null);
        };
        return KeyboardComp;
    }(gameabc.UICustomComponent));
    uicomps.KeyboardComp = KeyboardComp;
    __reflect(KeyboardComp.prototype, "uicomps.KeyboardComp");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=KeyboardComp.js.map