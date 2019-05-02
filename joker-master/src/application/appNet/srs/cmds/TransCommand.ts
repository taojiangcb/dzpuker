
module cy {
    
	/**
	 * @author huangkan
	 *  SRS通信二级指令中继，结构化二级指令，使其在业务开发时可以不关注一二级概念
	 */
    export class TransCommand extends SrsCommand {
        
        sendHandler(data: cyvos.GamePackage, stream: SrsStreamWriter): void {
            this.sendPackage.sProcessID = 1;
            this.sendPackage.nAppID = user.getProxy().currentRoom.svrOfsId;
            stream.putSuruct(data);
            cy.log("send:1-11201."+data.xyId,cy.LOG_TYPE.GS_SEND);
        }
        
        resultHandler(stream: SrsStreamReader): void {
            if(room.getProxy().current==null) {
                console.log("currentRoom==null");
                return;
            }
            var svrOfsId = room.getProxy().current.svrOfsId; 
            if(svrOfsId != this.recvPackage.nAppID) {
                console.log("svrOfsId="+svrOfsId+" recvAppId="+this.recvPackage.nAppID);
                return;
            }
            var gamePackage = <cyvos.GamePackage> stream.getSuruct(cyvos.GamePackage);
            cy.log("recv:11200."+gamePackage.xyId,cy.LOG_TYPE.GS_RECV);
            this.sendNotification(app.NetAction.RE_GS_PREFIX+gamePackage.xyId,gamePackage);
        }
	}
}