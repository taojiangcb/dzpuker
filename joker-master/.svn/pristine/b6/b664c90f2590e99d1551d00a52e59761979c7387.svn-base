module cy {
    
    export var autoAskId:number = 0;
    
    export var askCommandDepot:Object = {};
    
    export function addAskCommand(value:any):number {
        ++autoAskId;
        askCommandDepot[autoAskId] = value;
        return autoAskId;
    }
    
    export function getAskCommand(askId:number):any {
        var commandData = askCommandDepot[askId];
        askCommandDepot[askId] = undefined;
        return commandData;
    }
    
    
	/**
	 * @author huangkan
	 *  SRS通信基类，负责结构化开发流程，使得业务只关注包体内容和收发顺序
	 */
    export class SrsCommand extends puremvc.SimpleCommand {
        
        pocsact:string;
        process:string;
        action:string;
        sendPackage: cyvos.SrsPackage;
        recvPackage: cyvos.SrsPackage;
        
        execute(notification: puremvc.INotification): void {
            if(!cy.srsServer.socket.connected) {
                console.log("socket 已断开不能发指令了 cy.srsServer.socket.connected:" + cy.srsServer.socket.connected)
                return;
            } 
            var process_action = notification.getName().split(app.NetAction.PROCESS_CUT);
            if (process_action.length == 1) {
                this.action = process_action[0];
            } else if (process_action.length == 2) {
                this.process = process_action[0];
                this.action = process_action[1];
                this.pocsact = this.process + app.NetAction.PROCESS_CUT + this.action;
            }
            var body = notification.getBody();
            if(body instanceof cyvos.SrsPackage) {
                this.recvPackage = body;
                this.resultHandler(new SrsStreamReader(this.recvPackage.data));
            } else {
                this.sendPackage = new cyvos.SrsPackage();
                this.sendPackage.sProcessID = parseInt(this.process);
                this.sendPackage.sXYID = parseInt(this.action);
                this.sendHandler(body,new SrsStreamWriter(this.sendPackage.data));
                cy.srsServer.send(this.sendPackage);
            }
        }
        
        tipError(flag:number, title:string="Error"):void {
            var id = this.action + "-" + flag;
            var msg = gameabc.getError(id);
            if (msg != null && msg != "" && msg != "undefined") title = msg;
            tip.popSysCenterTip(title + " ["+flag+"]");
        }
        
        /** 抽象函数，继承实现，对包的内容需在此进行逻辑组装 */
        sendHandler(data: any, stream:SrsStreamWriter): void {
            //抽象函数保持空，可减少子类忽略super引发的错误
        }

        /** 抽象函数，继承实现，对包的内容需在此进行逻辑处理或分流 */
        resultHandler(stream:SrsStreamReader): void {
            //抽象函数保持空，可减少子类忽略super引发的错误
        }
        
	}
}
