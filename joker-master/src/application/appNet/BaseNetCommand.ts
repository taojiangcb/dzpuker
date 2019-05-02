module app {
	/**
	 *
	 * @author 
	 *
	 */
    export class BaseNetCommand extends puremvc.SimpleCommand {
        
        execute(notification: puremvc.INotification): void {
            var data = notification.getBody();
            if (data instanceof appvos.MessageVO) {
                this.response(notification.getName(),data);
            // } else if(data instanceof gameabc.LPPACKET) {
            //     this.parseLpPacket(notification.getName(),data);
            } else {
                this.request(notification.getName(),data);
            }
        }
     
        public request(action: string, param:any):void{
            if(this.showLoading) {
                app.loading.LoadingCircleUI.show(action);
            }

            var timestamp = new Date().valueOf();
            app.NetConfigs.connCache[timestamp] = this;
            
            if(this.vs_enabled && app.NetConfigs.VIRTUAL_SERVER_ENABLED) {
                this.sendNotification(app.NetAction.VIRTUAL_SERVER,[action,timestamp,param]);
            } else {
                this.sendHandler(param);
//                app.socket.send(parseInt(action),param);
            }
        }
        
        public response(action: string,param: appvos.MessageVO): void {
            if(param.errorCode == 0 || param.errorCode == null) {
                this.resultHandler(action, param.data);
            } else {
                this.faultHandler(param);
            }
            if(this.showLoading) {
                app.loading.LoadingCircleUI.hide(action);
            }
        }

        sendHandler(data:any) :void {
            //抽象函数保持空，可减少子类忽略super引发的错误
        }
        
        resultHandler(action:string, param: appvos.ParamVO): void {
            //抽象函数保持空，可减少子类忽略super引发的错误
        }
        
        // parseLpPacket(action: string,data: gameabc.LPPACKET):void {
            
        // }

        
        faultHandler(message: appvos.MessageVO): void {
            console.warn("mess error :" + message.action + "errorCode" + message.errorCode);
//            tip.popSysTip("mess error :" + message.action + "errorCode" + message.errorCode);
        }
        
        
        vs_enabled:boolean;
        
        /**         * 覆盖此方法是否显示loading         */
        public get showLoading(): boolean {
            return false;
        }
        // 覆盖此方法, 设置远程方法名
//        public get methodName(): string {
//            return "";
//        }
	}
}
