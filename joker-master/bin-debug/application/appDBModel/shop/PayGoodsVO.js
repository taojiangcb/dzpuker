var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var shop;
(function (shop) {
    /**
 *
 * @author
 *边锋SDK支付
 */
    var PayGoodsVO = (function () {
        function PayGoodsVO(orderId, productId, productName, productPrice, productCount, roleId, roleName, roleGrade, roleBalance, notifyUrl, ext, serverId) {
            /****支付订单号****/
            this.orderId = "";
            /****商品ID****/
            this.productId = ""; //
            /****商品名称****/
            this.productName = ""; //
            /****商品价格****/
            this.productPrice = ""; //
            /****商品数量****/
            this.productCount = ""; //
            /****角色ID****/
            this.roleId = ""; //
            /****角色名称****/
            this.roleName = ""; //
            /****角色等级****/
            this.roleGrade = ""; //
            /****角色余额****/
            this.roleBalance = ""; //
            /****服务器ID****/
            this.serverId = ""; //
            /****通知地址***/
            this.notifyUrl = ""; //
            /****透传参数***/
            this.ext = ""; //
            this.orderId = orderId;
            this.productId = productId,
                this.productName = productName;
            this.productPrice = productPrice;
            this.productCount = productCount;
            this.roleName = roleName;
            this.roleId = roleId;
            this.roleGrade = roleGrade;
            this.roleBalance = roleBalance;
            this.serverId = serverId;
            this.notifyUrl = notifyUrl;
            this.ext = ext;
        }
        return PayGoodsVO;
    }());
    shop.PayGoodsVO = PayGoodsVO;
    __reflect(PayGoodsVO.prototype, "shop.PayGoodsVO");
})(shop || (shop = {}));
//# sourceMappingURL=PayGoodsVO.js.map