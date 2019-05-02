module app {
    
	/**
	 * @author huangkan 
	 *  游戏内二级消息命令集
	 */
    export class GameCommand extends ProtobuffCommand {
                
        recvGamePackage:cyvos.GamePackage;
        
        sendGamePackage:cyvos.GamePackage;
        
        execute(notification: puremvc.INotification): void {
            var commandId = notification.getName();
            var cmds = commandId.split(".");
            var body = notification.getBody();
            if (body instanceof cyvos.GamePackage) {
                this.recvGamePackage = body;
                this.recvMessageVO = new appvos.MessageVO(this.recvGamePackage.data.buffer);
               
                this.resultHandler(commandId, this.recvMessageVO.data);
            } else {
                
                if(user.getProxy().currentRoom==null) {
                    console.log("已离开房间，无法操作房间内行为");
                    return;
                }
                
                this.sendParamVO = body instanceof appvos.ParamVO ? body : new appvos.ParamVO();
                this.sendHandler(body, commandId, this.sendParamVO);
                var MessageVO = AppGlobal.getMessage("MessageVO");
                this.sendMessageVO = new MessageVO(); 
                if (user.getProxy().messVersion != null) {
                    this.sendMessageVO.sendAt =__SET_INT64( user.getProxy().messVersion);   
                }
                this.sendMessageVO.data = this.sendParamVO.getProtoVO();
                this.sendGamePackage = new cyvos.GamePackage();
                this.sendGamePackage.data = new egret.ByteArray(this.sendMessageVO.toArrayBuffer());
                this.sendGamePackage.xyId = parseInt(cmds[1]);
                this.sendNotification(cmds[0], this.sendGamePackage);
            }
        }
        
	}
}
