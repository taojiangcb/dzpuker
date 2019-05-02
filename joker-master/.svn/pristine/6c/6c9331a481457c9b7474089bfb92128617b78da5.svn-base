/**
 * Created by taojiang on 16/10/13.
 */
module platform{
    export class AndroidPlatform extends BasePlatform {
        constructor(){super()};

        /** 发起支付的SDK，具体的支付参数在_paymentVo中*/
        payment(payData:any):void{
            console.log("paymen=====>");
            getGameTeaPay().creatData = payData;
            getGameTeaPay().createOrderList(payData.propid,payData.price,CHANNE_IDS.ANDROID.toString())
        }
    }
}