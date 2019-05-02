/**
 * Created by taojiang on 16/10/13.
 */
module platform {

    export class AppStorePlatform implements IPlatform{
        private pay:GameTeaPay;
        constructor(){this.pay = new GameTeaPay()}
        /** 打开SDK的登录面板		 */
        openLoginPanel():void{}
        /** 打开SDK的登出(注销)面板		 */
        openLogoutPanel():void{}
        /** 打开SDK的用户中心面板		 */
        openUserCenter():void{}
        /** 打开SDK的论坛		 */
        openBbs():void{}
        /** 打开SDK的退出面板(重登、退出、切换账号)		 */
        openExitPanel():void{}
        /** 打开SDK的切换账号面板		 */
        openChangeUserPanel():void{}
        /** AIR在失去焦点时的处理		 */
        onDeactivate():void{}
        /** AIR在恢复焦点时的处理		 */
        onActivate():void{}
        /** AIR在游戏退出时的处理		 */
        onDispose():void{}
        /** 当游戏登陆后进入主城时		 */
        onLoginToCity():void{}

        /** 发起支付的SDK，具体的支付参数在_paymentVo中*/
        payment(payData:any):void{
            platform.getGameTeaPay().creatData = payData;
            platform.getGameTeaPay().createOrderList(payData.propid,payData.price,CHANNE_IDS.APPSTORE.toString());
        }
        /** 发起登录的SDK(没有界面的，直接调用)		 */
        startLogin():void{}
        /** 发起注销的SDK(没有界面的，直接调用)		 */
        startLogout():void{}
        /** 发送角色信息	 */
        doReportRoleInfo():void{}
        /** 发起没有界面的自定义登录	 */
        sendLogin(n:string, p:string):void{}
        /** 发起没有界面的自定义注册	 */
        sendRegister(n:string, p:string):void{}
    }
}