module cy {
    
	/**
	 * @author huangkan
	 *  信息变更服务器主动通知
	 */
    export class ChangeInfoCommand extends SrsCommand {
        
        
        
        resultHandler(stream: SrsStreamReader): void {
            
            switch(this.action) {
                //服务端响应登录
                case app.NetAction.CMDT_REQSYNCDATA:
                    var type = stream.getInt();
                    var gameId = stream.getInt();
                    var str = stream.getStr();
                    switch(type)
                        {
                            case 1://银两有改变
                            this.sendNotification(app.NetAction.TOOL_RILVER);//获取平台银两
                             break;
                        }
                    return;
                
                
            }
        }
        
        
        
	}
}
