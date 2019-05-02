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
    var InfoTipDel = (function (_super) {
        __extends(InfoTipDel, _super);
        function InfoTipDel() {
            var _this = _super.call(this) || this;
            _this.skinName = "InfoTipCustomDel";
            return _this;
        }
        InfoTipDel.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            var txt = "确认要删除 " + this.uiOpenData.labelName + " 标签吗";
            this.txtInfo.text = txt + "";
            this.bindButton(this.btnOk);
            this.bindButton(this.btnCancel);
        };
        InfoTipDel.prototype.touchBindButtonHandler = function (clickTarget) {
            console.log(this.uiOpenData);
            switch (clickTarget) {
                case this.btnOk:
                    // __SEND_NOTIFICATION(app.NetAction.REQ_DEL_LABEL,[this.uiOpenData.id])
                    break;
                case this.btnCancel:
                    this.close();
                    break;
            }
        };
        return InfoTipDel;
    }(app.base.BaseWndUIMoudleComponent));
    myInfo.InfoTipDel = InfoTipDel;
    __reflect(InfoTipDel.prototype, "myInfo.InfoTipDel");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=InfoTipDel.js.map