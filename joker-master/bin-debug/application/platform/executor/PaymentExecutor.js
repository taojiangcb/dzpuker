var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var PaymentExecutor = (function () {
    function PaymentExecutor() {
    }
    PaymentExecutor.prototype.payForProduct = function (orderId, productId, productName, productPrice, productCount, roleId, roleName, roleGrade, roleBalance, serverId, notifyUrl, ext) {
        var order = JSON.parse("{}");
        order.orderId = orderId;
        order.productId = productId;
        order.productName = productName;
        order.productPrice = productPrice;
        order.productCount = productCount;
        order.roleId = roleId;
        order.roleName = roleName;
        order.roleGrade = roleGrade;
        order.roleBalance = roleBalance;
        order.serverId = serverId;
        order.notifyUrl = notifyUrl;
        order.ext = ext;
        var orderInfo = JSON.stringify(order);
        egret.ExternalInterface.call("payForProduct", orderInfo);
        console.log("send native payForproduct");
    };
    PaymentExecutor.prototype.payForSingle = function (orderId, productId, productName, productPrice, productCount, ext) {
        var order = JSON.parse("{}");
        order.orderId = orderId;
        order.productId = productId;
        order.productName = productName;
        order.productPrice = productPrice;
        order.productCount = productCount;
        order.ext = ext;
        var orderInfo = JSON.stringify(order);
        egret.ExternalInterface.call("payForProduct", orderInfo);
    };
    PaymentExecutor.prototype.payForH5 = function (appId, channelId, pid, platformName, orderId, productId, productName, productPrice, productCount, roleId, roleName, roleGrade, roleBalance, serverId, notifyUrl, ext) {
        var url = "http://mobile.bfun.cn/v1/web/pay/alipay?";
        var param = {
            appid: appId,
            pid: pid,
            channel: channelId,
            order_id: orderId,
            product_id: orderId,
            product_price: productPrice,
            product_count: productCount,
            product_name: productName,
            role_id: roleId,
            role_name: roleName,
            role_grade: roleGrade,
            role_balance: roleBalance,
            server_id: serverId,
            notify_url: notifyUrl,
            ext: ext
        };
        var params_str = gameabc.StringUtils.formatHttpParams(param);
        url = url + params_str;
        support.alipayPop(url);
    };
    PaymentExecutor.prototype.payForSingleH5 = function (appId, channelId, pid, platformName, orderId, productId, productName, productPrice, productCount, notifyUrl, ext) {
        var url = "http://mobile.bfun.cn/v1/web/pay/alipay?";
        var param = {
            appid: appId,
            pid: pid,
            channel: channelId,
            order_id: orderId,
            product_id: orderId,
            product_name: productName,
            product_price: productPrice,
            product_count: productCount,
            notify_url: notifyUrl,
            ext: ext
        };
        var params_str = gameabc.StringUtils.formatHttpParams(param);
        url = url + params_str;
        support.alipayPop(url);
    };
    return PaymentExecutor;
}());
__reflect(PaymentExecutor.prototype, "PaymentExecutor");
//# sourceMappingURL=PaymentExecutor.js.map