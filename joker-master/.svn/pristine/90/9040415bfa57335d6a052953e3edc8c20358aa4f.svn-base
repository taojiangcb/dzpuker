/**
 *
 * @author 
 *
 */
class PaymentInterface {
    
    private static executor: PaymentExecutor = new PaymentExecutor();
    
	public constructor() {
	}
	
    public static payForProduct(
        orderId: string,
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
        PaymentInterface.executor.payForProduct(
            orderId,
            productId,
            productName,
            productPrice,
            productCount,
            roleId,
            roleName,
            roleGrade,
            roleBalance,
            serverId,
            notifyUrl,
            ext);
    }
    
    public static payForSingle(
        orderId: String, 
        productId: String,   
        productName: String, 
        productPrice: String,
        productCount: String,
        ext: String):void {
        PaymentInterface.executor.payForSingle(
            orderId,
            productId,
            productName,
            productPrice,
            productCount,
            ext)
    }
    
    public static payForH5(
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
        PaymentInterface.executor.payForH5(
            appId,
            channelId,
            pid,
            platformName,
            orderId,
            productId,
            productName,
            productPrice,
            productCount,
            roleId,
            roleName,
            roleGrade,
            roleBalance,
            serverId,
            notifyUrl,
            ext)
    }
    
    public static payForSingleH5(
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
        PaymentInterface.executor.payForSingleH5(
            appId,
            channelId,
            pid,
            platformName,
            orderId,
            productId,
            productName,
            productPrice,
            productCount,
            notifyUrl,
            ext)
    }
}
