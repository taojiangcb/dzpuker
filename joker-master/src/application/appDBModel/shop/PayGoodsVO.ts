module shop {
    /**
 *
 * @author 
 *边锋SDK支付
 */
    export class  PayGoodsVO {
        /****支付订单号****/
        orderId: string = ""
        /****商品ID****/
        productId: string = ""//
         /****商品名称****/
        productName: string = ""//
         /****商品价格****/
        productPrice: string = ""//
        /****商品数量****/
        productCount: string = ""//
         /****角色ID****/
        roleId: string = ""//
         /****角色名称****/
        roleName: string = "" //
        /****角色等级****/
        roleGrade: string = "" //
        /****角色余额****/
        roleBalance: string = "" //
        /****服务器ID****/
        serverId: string = "" //
        /****通知地址***/
        notifyUrl: string = "" //
        /****透传参数***/
        ext: string ="" //


        constructor(orderId?: string,
            productId?: string,
            productName?: string,
            productPrice?: string,
            productCount?: string,
            roleId?: string,
            roleName?: string,
            roleGrade?: string,
            roleBalance?: string,
            notifyUrl?: string,
            ext?: string,
            serverId?: string) {

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
    }
}

