var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var PaymentWrapper = (function () {
    function PaymentWrapper() {
    }
    return PaymentWrapper;
}());
PaymentWrapper.PAYRESULT_SUCCESS = 200;
PaymentWrapper.PAYRESULT_FAIL = 201;
PaymentWrapper.PAYRESULT_CANCEL = 202;
PaymentWrapper.PAYRESULT_NETWORK_ERROR = 203;
PaymentWrapper.PAYRESULT_PRODUCTIONINFOR_INCOMPLETE = 204;
PaymentWrapper.PAYRESULT_INIT_SUCCESS = 205;
PaymentWrapper.PAYRESULT_INIT_FAIL = 206;
PaymentWrapper.PAYRESULT_NOW_PAYING = 207;
__reflect(PaymentWrapper.prototype, "PaymentWrapper");
//# sourceMappingURL=PaymentWrapper.js.map