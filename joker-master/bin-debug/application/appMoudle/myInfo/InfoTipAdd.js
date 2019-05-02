var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var myInfo;
(function (myInfo) {
    var InfoTipAdd = (function (_super) {
        __extends(InfoTipAdd, _super);
        function InfoTipAdd() {
            var _this = _super.call(this) || this;
            _this.skinName = "InfoTipCustomAdd";
            return _this;
        }
        InfoTipAdd.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnOk);
            this.bindButton(this.btnCancel);
            // this.inputTip.restrict = "\u4E00-\u9FA5";
            this.inputTip.maxChars = 20; // 防止拼音过长
        };
        InfoTipAdd.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnOk:
                    var txt = this.inputTip.text;
                    if (txt.length <= 4) {
                        __SEND_NOTIFICATION(app.NetAction.REQ_ADD_LABEL, [txt]);
                        this.close();
                    }
                    else {
                        tip.popSysCenterTip("标签长度必须在4个中文字以内", tip.TIPS_TYPE.TIPS_WARNING);
                    }
                    break;
                case this.btnCancel:
                    this.close();
                    break;
            }
        };
        return InfoTipAdd;
    }(app.base.BaseWndUIMoudleComponent));
    myInfo.InfoTipAdd = InfoTipAdd;
    __reflect(InfoTipAdd.prototype, "myInfo.InfoTipAdd");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=InfoTipAdd.js.map