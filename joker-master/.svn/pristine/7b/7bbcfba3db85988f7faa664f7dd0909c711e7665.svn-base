module app {
	/**
	 *错误提示消息
	 * @author 
	 *
	 */
    export class ErrorMessageCommand extends GameCommand {
		public constructor() {
            super();
        }
        execute(notification: puremvc.INotification): void {
            var commandId = notification.getName();
            if (commandId == app.NetAction.ERROR_SRS_CODE) {
                this.showSrsError(notification.getBody());
            } else super.execute(notification);
        }
        public resultHandler(action: string,param: appvos.ParamVO): void {
//          
//            if(commandId == app.NetAction.ERROR_CODE)//错误提示
            switch(this.recvMessageVO.errorCode){
                case 2://彩豆不足
                   user.getProxy().openMoney();
                    // if(AppConst.LOGING_CAN_BOOL) {
                    //     tip.Alert.show("彩豆不足请充值！");
                    // } else {
                    //     tip.Alert.show("彩豆不足是否购买？",null,tip.CONFIRM,this.openbuy,null,this);
                    // }
                    
                    break;
                case 4://下注不合法 
                    var proxy = playcards.getProxy();
                     var mess:string =  "操作异常服务端权限:";
                    var nAntePower:number = proxy.AntePower;
                    if(nAntePower & proxy.MAP_EXIT) 
                        mess+="弃牌,"
                    if(nAntePower & proxy.MAP_DOWNANTE) 
                        mess+="下注,"
                    if(nAntePower & proxy.MAP_FOLLOWANTE) 
                        mess+="跟注,"
                    if(nAntePower & proxy.MAP_ALLIN) 
                        mess+="ALLIN,"
                    if(nAntePower & proxy.MAP_RAISE) 
                        mess+="加注"   
                     tip.popSysBottomTip(mess); 
                    break;    
                default:
                    var mess: string = gameabc.getError(this.recvMessageVO.errorCode + "")
                    if (mess == null || mess.length == 0) {
                        mess = "未定义errorCode:" + this.recvMessageVO.errorCode;
                        console.warn(mess);
                    }
                    tip.popSysBottomTip(mess);
                break;
            }
                
        }
        private showSrsError(errorCode:number): void{
             var mess: string = gameabc.getError("2-"+errorCode )
             if (mess == null || mess.length == 0) {
                    mess = "未定义errorCode:" + errorCode;
                     console.warn(mess);
             }
             tip.popSysBottomTip(mess);
        }
        /**打开充值**/
        private openbuy(type: number): void{
            if(type==tip.YES)
                __OPEN_MOUDLE(AppReg.APP_PLAY_BUY,1);
        }
	}
}
