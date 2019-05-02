/**
 *
 * @author 
 *
 */
class PaymentExecutor {
	public constructor() {
	}
	
    public payForProduct(
        orderId:string,
        productId: string,
        productName: string,
        productPrice: string,
        productCount: string,
        roleId: string,
        roleName: string,
        roleGrade: string,
        roleBalance: string,
        serverId: string,
        notifyUrl: string,
        ext: string):void {
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
        egret.ExternalInterface.call("payForProduct",orderInfo);
        console.log("send native payForproduct");
    }
    
    public payForSingle(
        orderId: String,     
        productId: String,   
        productName: String, 
        productPrice: String,
        productCount: String,
        ext: String):void {
        var order = JSON.parse("{}");
        order.orderId = orderId;
        order.productId = productId;
        order.productName = productName;
        order.productPrice = productPrice;
        order.productCount = productCount;
        order.ext = ext;
        var orderInfo = JSON.stringify(order);
        egret.ExternalInterface.call("payForProduct",orderInfo);
    }
    
    public payForH5(
        appId: String,
        channelId: String,
        pid: String,
        platformName: String,
        orderId: String,
        productId: String,
        productName: String,
        productPrice: String,
        productCount: String,
        roleId: string,
        roleName: string,
        roleGrade: string,
        roleBalance: string,
        serverId: string,
        notifyUrl: string,
        ext: String): void {

            var url = "http://mobile.bfun.cn/v1/web/pay/alipay?"
            var param:Object = {
                    appid:appId,
                    pid:pid,
                    channel:channelId,
                    order_id:orderId,
                    product_id:orderId,
                    product_price:productPrice,
                    product_count:productCount,
                    product_name:productName,
                    role_id:roleId,
                    role_name:roleName,
                    role_grade:roleGrade,
                    role_balance:roleBalance,
                    server_id:serverId,
                    notify_url:notifyUrl,
                    ext:ext
            }
            var params_str:string = gameabc.StringUtils.formatHttpParams(param);
            url = url + params_str;
            support.alipayPop(url);
            
        }
    
    public payForSingleH5(
        appId: String,
        channelId: String,
        pid: String,
        platformName: String,
        orderId: String,
        productId: String,
        productName: String,
        productPrice: String,
        productCount: String,
        notifyUrl: string,
        ext: String): void {
            var url = "http://mobile.bfun.cn/v1/web/pay/alipay?"
            var param:Object = {
                appid:appId,
                pid:pid,
                channel:channelId,
                order_id:orderId,
                product_id:orderId,
                product_name:productName,
                product_price:productPrice,
                product_count:productCount,
                notify_url:notifyUrl,
                ext:ext
            }
            var params_str:string = gameabc.StringUtils.formatHttpParams(param);
            url = url + params_str;
            support.alipayPop(url);
    }
}
