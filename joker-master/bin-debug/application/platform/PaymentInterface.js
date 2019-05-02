var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var PaymentInterface = (function () {
    function PaymentInterface() {
    }
    PaymentInterface.payForProduct = function (orderId, productId, productName, productPrice, productCount, roleId, roleName, roleGrade, roleBalance, serverId, notifyUrl, ext) {
        PaymentInterface.executor.payForProduct(orderId, productId, productName, productPrice, productCount, roleId, roleName, roleGrade, roleBalance, serverId, notifyUrl, ext);
    };
    PaymentInterface.payForSingle = function (orderId, productId, productName, productPrice, productCount, ext) {
        PaymentInterface.executor.payForSingle(orderId, productId, productName, productPrice, productCount, ext);
    };
    PaymentInterface.payForH5 = function (appId, channelId, pid, platformName, orderId, productId, productName, productPrice, productCount, roleId, roleName, roleGrade, roleBalance, serverId, notifyUrl, ext) {
        PaymentInterface.executor.payForH5(appId, channelId, pid, platformName, orderId, productId, productName, productPrice, productCount, roleId, roleName, roleGrade, roleBalance, serverId, notifyUrl, ext);
    };
    PaymentInterface.payForSingleH5 = function (appId, channelId, pid, platformName, orderId, productId, productName, productPrice, productCount, notifyUrl, ext) {
        PaymentInterface.executor.payForSingleH5(appId, channelId, pid, platformName, orderId, productId, productName, productPrice, productCount, notifyUrl, ext);
    };
    return PaymentInterface;
}());
PaymentInterface.executor = new PaymentExecutor();
__reflect(PaymentInterface.prototype, "PaymentInterface");
//# sourceMappingURL=PaymentInterface.js.map