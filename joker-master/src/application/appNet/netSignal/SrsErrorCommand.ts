module cy {
    
	/**
	 * @author huangkan
	 *  与SRS连接的进入房间环节命令集，进入房间过程在此完成
	 */
	export class SrsErrorCommand extends cy.SrsCommand {
    	
        resultHandler(stream:SrsStreamReader): void {
            
            switch(this.action) {
                
                //协议9
                case app.NetAction.CMDT_REPORTSRSERR:
                    var flag = stream.getByte();
                    var id = String(stream.getShort());
                    var info = flag==1?"服务转发失败":"找不到服务模块";
                    
                    switch (id) {
                        case app.NetAction.JOIN_ROOM:
                            cy.log("进入房间失败["+info+"]",LOG_TYPE.ROOM);
                            user.getProxy().resetRoomState();
                            return;
                    }
                    
                    cy.log(info+":"+id,LOG_TYPE.UNDEFINE);
                    return;
            }
            
        }
        
    }
}