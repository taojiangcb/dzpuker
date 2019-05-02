module app {
    
    export class HttpCommand extends ProtobuffCommand {
        
        loader: egret.URLLoader;
        request: egret.URLRequest;
        
        action: string;
        sendBytes: egret.ByteArray;
        recvBytes: egret.ByteArray;
        
        public get url(): string {
            return AppConst.CONNECT_SERVER.mail;
        }

        execute(notification: puremvc.INotification): void {

            this.loader = new egret.URLLoader();
            this.loader.addEventListener(egret.Event.COMPLETE,this.completeHandler,this);
            this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.failedHandler,this);
            this.loader.dataFormat = egret.URLLoaderDataFormat.BINARY;

            this.action = notification.getName();
            var body = notification.getBody();
            if(body instanceof appvos.ParamVO) {
                this.sendParamVO = body;
            } else {
                this.sendParamVO = new appvos.ParamVO();
                if(body instanceof AppGlobal.getMessage("ParamVO"))
                     this.sendParamVO.setData(body);
            }

            this.sendHandler(body, this.action, this.sendParamVO);
            var MessageVO = AppGlobal.getMessage("MessageVO");
            this.sendMessageVO = new MessageVO();
            this.sendMessageVO.phase = 1;
            this.sendMessageVO.action = parseInt(this.action);
            this.sendMessageVO.data = this.sendParamVO.getProtoVO();
            // var sendMessageBytes = new egret.ByteArray(this.sendMessageVO.toArrayBuffer()); 
            // this.sendBytes = new egret.ByteArray();
            // this.sendBytes.writeInt(sendMessageBytes.length);
            // this.sendBytes.writeBytes(sendMessageBytes);
             
            var sendBuff: egret.ByteArray = new egret.ByteArray();
            var a: ArrayBuffer = this.sendMessageVO.toArrayBuffer();

            var len = a.byteLength
            sendBuff.writeInt(len);
            sendBuff.writeBytes(new egret.ByteArray(a));
            this.sendBytes = sendBuff;

            this.request = new egret.URLRequest(this.url);
            this.request.method = egret.URLRequestMethod.POST;
            this.request.data = this.sendBytes.buffer;
            // var len3 = this.sendBytes.buffer.byteLength;
            this.loader.load(this.request);
            // this.sendBytes.position = 0;
            //  var len2 = this.sendBytes.readInt();
            //  var byt = new egret.ByteArray()
            //  this.sendBytes.readBytes(byt,0,len2);
        }
        
        completeHandler(evt:egret.Event):void {
            this.recvBytes = new egret.ByteArray(this.loader.data);
            var recvMessageBytes = new egret.ByteArray();
            var len = this.recvBytes.readInt();
            this.recvBytes.readBytes(recvMessageBytes,0,len);
            this.recvMessageVO = new appvos.MessageVO(recvMessageBytes.buffer);
            if(this.recvMessageVO.sendAt != null && this.recvMessageVO.sendAt > 0) {
                cy.updateServerTime(this.recvMessageVO.sendAt);
            }

            // console.log("recvMessageVO.phase:" + this.recvMessageVO.phase.toString())

            if(this.recvMessageVO.phase == 2) {
                this.recvParamVO = this.recvMessageVO.data;
                this.resultHandler(this.action, this.recvParamVO);
            }
            else {
                this.resultHandler(this.action,null);
            }
            this.loader.removeEventListener(egret.Event.COMPLETE,this.completeHandler,this);
            this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.failedHandler,this);
        }
        
        failedHandler(evt:egret.Event):void {
            this.resultHandler(this.action, null);
            this.loader.removeEventListener(egret.Event.COMPLETE,this.completeHandler,this);
            this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.failedHandler,this);
        }
	}
}
