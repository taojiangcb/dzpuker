/**
 * Created by JiangTao on 2016/4/28.
 */
module svrDebug {
    export class  DebugServer extends cy.SrsServer {

        constructor(ip:string="127.0.0.1",port:number=5000) {
            super(new cy.SrsIp(0,ip,port,0,0,"",""));
        }

         connectHandler(event: egret.Event): void {
            console.log(this.connectSrs.ip + ":" + this.connectSrs.port + " socket connect succeed!");
            this.numOutputBytes = 0;
            this.numInputBytes = 0;
            __SEND_NOTIFICATION(app.NetAction.DEBUG_CMDT_CONNECT);
            //this.heartIntervalId = egret.setInterval(__SEND_NOTIFICATION,this,30000,app.NetAction.CMDT_CHECKACT);
        }

    }
}