var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var match;
(function (match) {
    var MttPhoneValidateMoudle = (function (_super) {
        __extends(MttPhoneValidateMoudle, _super);
        function MttPhoneValidateMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/sng/product/PhoneNumberValidate.exml";
            return _this;
        }
        MttPhoneValidateMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.getCodeButton);
            this.bindButton(this.sendButton);
        };
        //this.touchBindButtonHandler
        MttPhoneValidateMoudle.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                case this.getCodeButton:
                    this.phone = this.phoneInput.text;
                    var url = "http://112.124.29.85:8004/sendCode.php?tel=" + this.phone;
                    this.urlLoader = new egret.URLLoader(new egret.URLRequest(url));
                    this.urlLoader.addEventListener(egret.Event.COMPLETE, this.onPhoneUpLoaded, this);
                    return;
                case this.sendButton:
                    this.code = this.codeInput.text;
                    this.sendNotification(app.NetAction.REQ_PHONE_VALIDATE, [this.phone, this.code, this.key]);
                    return;
            }
        };
        MttPhoneValidateMoudle.prototype.onPhoneUpLoaded = function (evt) {
            console.log(this.urlLoader.data);
            var json = JSON.parse(this.urlLoader.data);
            this.key = json.data.key;
        };
        return MttPhoneValidateMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    match.MttPhoneValidateMoudle = MttPhoneValidateMoudle;
    __reflect(MttPhoneValidateMoudle.prototype, "match.MttPhoneValidateMoudle");
})(match || (match = {}));
//# sourceMappingURL=MttPhoneValidateMoudle.js.map