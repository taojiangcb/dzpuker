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
    var BillMainUIMoudle = (function (_super) {
        __extends(BillMainUIMoudle, _super);
        function BillMainUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.skinName = "BillMainUIMoudleSkin";
            return _this;
        }
        BillMainUIMoudle.prototype.createComplete = function (event) {
            __REGISTER_MEDIATOR(bill.BillUIMediator, this);
            __SEND_NOTIFICATION(app.NetAction.REQ_BILL_GET);
            this.bindButton(this.closeButton);
        };
        BillMainUIMoudle.prototype.initList = function (data) {
            if (data.length == 0) {
                this.tipLabel.visible = true;
                return;
            }
            else {
                this.tipLabel.visible = false;
            }
            data.sort(function (a, b) {
                return b.time - a.time;
            });
            this.list.dataProvider = new eui.ArrayCollection(data);
            this.list.itemRenderer = bill.BillMainUILabel;
        };
        BillMainUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    break;
                default:
                    break;
            }
        };
        BillMainUIMoudle.prototype.dispose = function () {
            __REMOVE_MEDIATOR(bill.BillUIMediator);
            _super.prototype.dispose.call(this);
        };
        return BillMainUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    bill.BillMainUIMoudle = BillMainUIMoudle;
    __reflect(BillMainUIMoudle.prototype, "bill.BillMainUIMoudle");
})(bill || (bill = {}));
//# sourceMappingURL=BillMainUIMoudle.js.map