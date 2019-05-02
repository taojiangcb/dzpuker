/**
 * Created by JiangTao on 2016/4/28.
 */
module svrDebug {
    export class DebugConnectCommands extends puremvc.SimpleCommand {
        constructor(){super()}
        execute(notification:puremvc.INotification):void {
            var action:string = notification.getName();
            switch(action) {
                case app.NetAction.DEBUG_CMDT_CONNECT:
                    cy.resetWA();
                    var pack:cyvos.SrsPackage = new cyvos.SrsPackage();
                    pack.data.writeUnsignedInt(1);
                    pack.sXYID = parseInt(app.NetAction.DEBUG_CMDT_ENCRYPTVER);
                    cy.srsServer.send(pack);
                    return;
                case app.NetAction.DEBUG_CMDT_ENCRYPTVER:
                    var pack: cyvos.SrsPackage = new cyvos.SrsPackage();
                    pack.sXYID = parseInt(app.NetAction.DEBUG_CMDT_REQKEY);
                    cy.srsServer.send(pack);
                    return;
                case app.NetAction.DEBUG_CMDT__RESPKEY:
                     var pack: cyvos.SrsPackage = notification.getBody();
                    var cbKeys: egret.ByteArray = new egret.ByteArray();
                    var cbLen = pack.data.readByte();
                    pack.data.readBytes(cbKeys,0,cbLen);
                    var keyBV: Uint8Array = new Uint8Array(cbKeys.buffer);
                    cy.setKeyWA(gameabc.U8Array.parse(keyBV));
                    return;
            }
        }
    }
}