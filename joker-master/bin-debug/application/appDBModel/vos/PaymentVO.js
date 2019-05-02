var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by taojiang on 16/10/13.
 */
var appvos;
(function (appvos) {
    var PaymentVO = (function () {
        function PaymentVO() {
            this.name = "";
            this.price = 0;
        }
        return PaymentVO;
    }());
    appvos.PaymentVO = PaymentVO;
    __reflect(PaymentVO.prototype, "appvos.PaymentVO", ["appvos.ICREAT"]);
})(appvos || (appvos = {}));
//# sourceMappingURL=PaymentVO.js.map