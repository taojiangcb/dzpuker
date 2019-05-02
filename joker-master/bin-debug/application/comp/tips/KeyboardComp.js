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
    var KeyboardComp = (function (_super) {
        __extends(KeyboardComp, _super);
        function KeyboardComp() {
            var _this = _super.call(this) || this;
            _this.maxChars = 6;
            _this.skinName = "KeyboardSkin";
            _this.inputButtonArray = [
                _this.inputButton0, _this.inputButton1, _this.inputButton2, _this.inputButton3, _this.inputButton4,
                _this.inputButton5, _this.inputButton6, _this.inputButton7, _this.inputButton8, _this.inputButton9
            ];
            _this.numberInput.addEventListener(egret.Event.CHANGE, _this.onInputChange, _this);
            return _this;
        }
        KeyboardComp.prototype.createComplete = function (event) {
            this.infoLabel.touchEnabled = false;
            for (var i = 0; i < 10; ++i) {
                this.bindButton(this.inputButtonArray[i]);
            }
            this.bindButton(this.delButton);
            this.bindButton(this.enterButton);
            this.bindButton(this.gotoImage);
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
            if (this.numberInput.text.length >= this.maxChars)
                return;
            for (var i = 0; i < 10; ++i) {
                if (this.inputButtonArray[i] == clickTarget) {
                    this.numberInput.text += String(i);
                }
            }
            this.onInputChange(null);
        };
        return KeyboardComp;
    }(gameabc.UICustomComponent));
    tip.KeyboardComp = KeyboardComp;
    __reflect(KeyboardComp.prototype, "tip.KeyboardComp");
})(tip || (tip = {}));
//# sourceMappingURL=KeyboardComp.js.map