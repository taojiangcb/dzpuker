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
    var BillUIMoudle = (function (_super) {
        __extends(BillUIMoudle, _super);
        function BillUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.skinName = "BillUIMoudleSkin";
            return _this;
        }
        BillUIMoudle.prototype.createComplete = function (event) {
            this.bindButton(this.closeButton);
            this.initList();
        };
        BillUIMoudle.prototype.initList = function () {
            var time = Math.ceil(this.uiOpenData.time / 60);
            var hour = Math.floor(time / 60);
            var min = time - hour * 60;
            this.timeLabel.text = hour > 0 ? hour + "小时" + min + "分钟" : min + "分钟";
            this.countLabel.text = this.uiOpenData.count + "局";
            this.uiOpenData.cvos.sort(function (a, b) {
                return b.winNum - a.winNum;
            });
            this.list.dataProvider = new eui.ArrayCollection(this.uiOpenData.cvos);
            this.list.itemRenderer = bill.BillUILabel;
        };
        BillUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    break;
                default:
                    break;
            }
        };
        return BillUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    bill.BillUIMoudle = BillUIMoudle;
    __reflect(BillUIMoudle.prototype, "bill.BillUIMoudle");
})(bill || (bill = {}));
//# sourceMappingURL=BillUIMoudle.js.map