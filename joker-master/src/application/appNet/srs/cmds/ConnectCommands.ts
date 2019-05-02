module cy {
    
	/**
	 * @author huangkan
	 *  与SRS连接的初始命令集，在登录之前的连接选择状态在此完成
	 */
    export class ConnectCommands extends puremvc.SimpleCommand {
		
        execute(notification: puremvc.INotification): void {
            if (srsServer == null) return;
            switch(notification.getName()) {
                
                
                //连接成功后，先发送消息1，验证客户端合法性    
                case app.NetAction.SRS_CONNECT:
                    resetWA();
                    var pack:cyvos.SrsPackage = new cyvos.SrsPackage();                
                    pack.data.writeUnsignedInt(1);
                    pack.sXYID = parseInt(app.NetAction.CMDT_ENCRYPTVER);
                    srsServer.send(pack);
                    return;
                
                
                //收到连接1号消息回复后，发送3号消息，获取KEY
                case app.NetAction.CMDT_ENCRYPTVER:
                    var pack: cyvos.SrsPackage = new cyvos.SrsPackage();
                    pack.sXYID = parseInt(app.NetAction.CMDT_REQKEY);
                    srsServer.send(pack);
                    return;
                    
                //收到4号消息(3号的回复)，得到KEY，并记录
                case app.NetAction.CMDT_RESPKEY:
                    var pack: cyvos.SrsPackage = notification.getBody();
                    var cbKeys: egret.ByteArray = new egret.ByteArray();
                    var cbLen = pack.data.readByte();
                    pack.data.readBytes(cbKeys,0,cbLen);
                    var keyBV: Uint8Array = new Uint8Array(cbKeys.buffer);
                    setKeyWA(gameabc.U8Array.parse(keyBV));
                    //没有缓存最佳服务器，则去查询所有服务器的负载情况（注释则直接跳过负载均衡）
                    if (cy.niceSelect == null && AppConst.CONNECT_SERVER.appId!=0) {
                        this.sendNotification(app.NetAction.GET_SRS_LOAD);
                        return;
                    }
                    this.sendNotification(app.NetAction.CMDT_PLAYERCONNECT);
                    return;
                
                case app.NetAction.SRS_CLOSE:
                   tip.Alert.show("您已离线，请重新登录","",tip.ALERT,(flag: number,data: any) => {
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION);
                    },null,this);
                    return;
                
                case app.NetAction.SRS_ERROR:
                    if (__IS_MOUDLE_OPEN(AppReg.LOGIN)) {
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("SRS_ERROR"), tip.TIPS_TYPE.TIPS_WARNING);
                    } else {
                        __SEND_NOTIFICATION(app.NetAction.SRS_CLOSE);
                    }
                    return;
            }
        }
	}
}
