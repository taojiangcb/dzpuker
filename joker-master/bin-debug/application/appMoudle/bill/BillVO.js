var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var bill;
(function (bill) {
    var BillVO = (function () {
        function BillVO() {
            this.cvos = [];
        }
        return BillVO;
    }());
    bill.BillVO = BillVO;
    __reflect(BillVO.prototype, "bill.BillVO");
    var BillMainVO = (function () {
        function BillMainVO() {
            this.gain = 0;
        }
        return BillMainVO;
    }());
    bill.BillMainVO = BillMainVO;
    __reflect(BillMainVO.prototype, "bill.BillMainVO");
})(bill || (bill = {}));
//# sourceMappingURL=BillVO.js.map