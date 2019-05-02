module app {
    
	/**
	 * @author huangkan 
	 *  发送到模块的消息命令集
	 */
    export class MoudleCommand extends ProtobuffCommand {
        
        sendPackage: cyvos.SrsPackage;
        recvPackage: cyvos.SrsPackage;
        
        execute(notification: puremvc.INotification): void {
            this.type = notification.getType();
            var commandId = notification.getName();
            var body = notification.getBody();
            if (commandId.length == 5) {
                var pre = commandId.substr(0,2);
                switch(pre) {
                    case NetAction.TO_MS_PREFIX:
                    case NetAction.TO_MS_PREFIX_2:
                        this.sendPackage = new cyvos.SrsPackage();
                        this.sendPackage.nAppID = NetAction.MS_APPID;
                        this.sendPackage.sProcessID = NetAction.MS_PROCESSID;
                        this.sendParamVO = body instanceof appvos.ParamVO ? body : new appvos.ParamVO();
                        this.sendHandler(body, commandId, this.sendParamVO);
                        var MessageVO = AppGlobal.getMessage("MessageVO");
                        this.sendMessageVO = new MessageVO();
                        this.sendMessageVO.data = this.sendParamVO.getProtoVO();
                        this.sendPackage.data = new egret.ByteArray(this.sendMessageVO.toArrayBuffer());
                        this.sendPackage.sXYID = parseInt(commandId);
                        if(cy.srsServer)
                            //cy.srsServer.send(this.sendPackage);
                        return;
                    case NetAction.RE_MS_PREFIX:
                    case NetAction.RE_MS_PREFIX_2:
                        this.recvPackage = body;
                        this.recvMessageVO = new appvos.MessageVO(this.recvPackage.data.buffer);
                        if(this.recvMessageVO.errorCode > 0){
                            var mess: string = gameabc.getError("2-" + this.recvMessageVO.errorCode + "");
                            if (mess == null || mess.length == 0) {
                                mess = "未定义errorCode:" + this.recvMessageVO.errorCode;
                                console.warn(mess);
                            } else {
                                tip.popSysCenterTip(mess);
                                if (this.recvMessageVO.errorCode == 8) {
                                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.TREASURE_FAIL);
                                }
                            }
                        }else
                            this.resultHandler(commandId, this.recvMessageVO.data);
                        return;
                }
            } 
        }
	}
}
