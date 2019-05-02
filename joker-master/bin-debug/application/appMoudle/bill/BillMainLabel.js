var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bill;
(function (bill) {
    var BillMainUILabel = (function (_super) {
        __extends(BillMainUILabel, _super);
        function BillMainUILabel() {
            var _this = _super.call(this) || this;
            _this.skinName = "BillMainUILabelSkin";
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            return _this;
        }
        BillMainUILabel.prototype.onComplete = function () {
            this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        };
        BillMainUILabel.prototype.onClickButton = function () {
            gameabc.BindleButtonUtils.bindClickByTarget(this.button);
            // __OPEN_MOUDLE(AppReg.APP_BILL_SUB);
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.OPEN_BILL_SUB, this.id);
        };
        BillMainUILabel.prototype.dataChanged = function () {
            this.id = this.data.id;
            this.blindLabel.text = this.data.blind;
            var date = new Date(this.data.time * 1000);
            this.timeLabel.text = (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + "点" + date.getMinutes() + "分";
            this.gainLabel.text = this.data.gain.toString();
        };
        return BillMainUILabel;
    }(eui.ItemRenderer));
    bill.BillMainUILabel = BillMainUILabel;
    __reflect(BillMainUILabel.prototype, "bill.BillMainUILabel");
})(bill || (bill = {}));
//# sourceMappingURL=BillMainLabel.js.map