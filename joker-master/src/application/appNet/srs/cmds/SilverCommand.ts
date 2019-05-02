module cy {
    
	/**
	 * @author huangkan
	 *  与SRS连接的进入房间环节命令集，进入房间过程在此完成
	 */
	export class SilverCommand extends cy.SrsCommand {
    	
        sendHandler(data: any,stream: cy.SrsStreamWriter): void {
            
            this.sendPackage.sProcessID = 1;
            if(user.getProxy().currentRoom!=null) {
                this.sendPackage.nAppID = user.getProxy().currentRoom.svrOfsId;
            }
            
            stream.putByte(data[0]); //1取钱2存钱
            stream.putInt(data[1]);  //存取款数量
            stream.putStr(data[2]);  //银行密码
            
        }
        
        resultHandler(stream:SrsStreamReader): void {
            
            var flag = stream.getByte();
            if(flag == 0) {
                user.getProxy().svrGameData.silver = stream.getLong();
                user.getProxy().svrGameData.bankSilver = stream.getLong();
                tip.popSysCenterTip("划账成功",tip.TIPS_TYPE.TIPS_CORRECT);
            } else {
                tip.popSysCenterTip("划账失败,错误ID:" + flag,tip.TIPS_TYPE.TIPS_WARNING);
            }
            
        }
    }
}