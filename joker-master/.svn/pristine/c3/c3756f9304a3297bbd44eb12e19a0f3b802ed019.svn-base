module app {

    export class NetExperimental {

        skt:egret.WebSocket;

        constructor() {
            mc2sdk.event(mc2sdk.EVENT_TYPE.EXP_SVR_START);
            this.skt = new egret.WebSocket();
            this.skt.type = egret.WebSocket.TYPE_BINARY;
            this.skt.addEventListener(egret.Event.CONNECT,this.connectHandler,this);
            this.skt.addEventListener(egret.IOErrorEvent.IO_ERROR,this.errorHandler,this);
            this.skt.addEventListener(egret.Event.CLOSE,this.closeHandler,this);
            // this.skt.connect("123.59.14.4",16001);
            this.skt.connect("10.224.32.70",16001);
        }

        connectHandler(event: egret.Event): void {
            mc2sdk.event(mc2sdk.EVENT_TYPE.EXP_SVR_SUCCESS);
            var paramVO: appvos.ParamVO = new appvos.ParamVO();
            var MessageVO = AppGlobal.getMessage("MessageVO");
            var sendMessageVO = new MessageVO();
            sendMessageVO.phase = 1;
            sendMessageVO.action = 1;
            sendMessageVO.data = paramVO.getProtoVO();
            var sendMessageBytes = new egret.ByteArray(sendMessageVO.toArrayBuffer());
            var data = new egret.ByteArray();
            data.writeInt(sendMessageBytes.length);
            data.writeBytes(sendMessageBytes);
            this.skt.writeBytes(data);
            this.skt.flush();
        }

        closeHandler(event: egret.Event): void {
            mc2sdk.event(mc2sdk.EVENT_TYPE.EXP_SVR_ERROR);
        }

        errorHandler(event: egret.IOErrorEvent): void {
            
            mc2sdk.event(mc2sdk.EVENT_TYPE.EXP_SVR_CLOSE);
        }

    }
}