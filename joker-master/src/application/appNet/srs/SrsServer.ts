module cy {

    export var srsServer:SrsServer;

    var clientTime:number;
    var serverTime:number;
    var nowDate:Date;

    export var lastConnectWasError:boolean;

    /** 1970以来的毫秒值，更新校验服务器时间 */
    export function updateServerTime(value:number):void {
        nowDate = new Date();
        clientTime = nowDate.getTime();
        serverTime = value;
    }

    /** 返回服务器当前的时间 */
    export function getServerTime():Date {
        var ndt = new Date().getTime()
        if(serverTime == null) updateServerTime(ndt);
        nowDate.setTime(ndt + serverTime - clientTime);
        return nowDate;
    }
    
    export function connectSrsServer(srsConfig:SrsIp):void {
        if (cy.srsServer == null) {
            cy.srsServer = new SrsServer(srsConfig);
        } else {
            cy.srsServer.connectSrs = srsConfig;
        }
        srsServer.reConnect = null;
        srsServer.connect();
    }
    
    export function closeConnection(reConnect:SrsIp = null):void {
        if (cy.srsServer != null) {
            srsServer.reConnect = reConnect;
            cy.srsServer.close();
        }
    }

    export function addConnectHeart(xyId:string, appId:number=0):void {
        if (cy.srsServer != null && cy.srsServer.getHeartVO(xyId,appId)==null){
            var hvo = new HeartVO();
            hvo.xyId = xyId,   hvo.appId = appId;
            cy.srsServer.heartList.push(hvo);
            cy.logHeartChange();
            
        }
    }

    export function removeConnectHeart(xyId:string, appId:number=0):void {
        if (cy.srsServer != null) {
            cy.srsServer.getHeartVO(xyId,appId,true);
            cy.logHeartChange();
        }
    }
    

    export class SrsServer {
        
        socket: egret.WebSocket;
        outputbuff: egret.ByteArray;
        inputbuff: egret.ByteArray;
        connectSrs:SrsIp;
        reConnect:SrsIp;
        heartList:HeartVO[];
        /** 是否正在连接，用于判断错误是连接造成的，还是连接成功后照成的 */
        isConnectting:boolean = false;

        constructor(srsConfig:SrsIp){
            this.connectSrs = srsConfig;
            this.heartList = [];
        }
        
        /** 收到信息，分拆连包，分别发布收包事件 */
        onReciveMessage(event: egret.ProgressEvent): void {
            this.inputbuff = new egret.ByteArray();
            this.socket.readBytes(this.inputbuff);
            this.numInputBytes += this.inputbuff.length;
            
            while (this.inputbuff.bytesAvailable > 0) {
                var srsPack = new cyvos.SrsPackage();
                srsPack.decode(new SrsStreamReader(this.inputbuff));
                this.recv(srsPack);
            }
        }
        
        /** 连接到服务器 */
        connect(): void {
            if (this.socket != null) {
                this.removeListeners();
                if (this.socket.connected) {
                    this.socket.close();
                }
                this.socket = null;
            }
            // new app.NetExperimental();//连接自己的测试服务器，测试网络状况
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.addListeners();
            this.connectTime = new Date().getTime();
            this.isConnectting = true;
            console.log(this.connectSrs.ip+":"+this.connectSrs.port+" is connecting...");
            this.socket.connect(this.connectSrs.ip,this.connectSrs.port);
            cy.lastConnectWasError = false;
        }
        
        close():void {
            if (this.socket!=null && this.socket.connected) {
                this.socket.close();
            }
        }
        
        
        /** 发送数据给服务器 */
        send(srsPack:cyvos.SrsPackage):void {
            if (!this.socket.connected) {
                __SEND_NOTIFICATION(app.NetAction.SRS_ERROR);
                return;
            }
            this.outputbuff = new egret.ByteArray();
            srsPack.encode(new SrsStreamWriter(this.outputbuff));
            this.socket.writeBytes(this.outputbuff);
            this.socket.flush();
            this.numOutputBytes += this.outputbuff.length;
            cy.sendLog(srsPack.sXYID,srsPack.sProcessID);
            // this.logpack(this.outputbuff, "send:");
        }

        /** 收到数据给发送的数据 */
        recv(srsPack:cyvos.SrsPackage):void {
            // this.logpack(this.inputbuff, "recv:");  
            cy.recvLog(srsPack.sXYID,srsPack.sProcessID);
            if(app.NetAction.PROCESS_PREFIX.indexOf(srsPack.sProcessID)==-1) {
                __SEND_NOTIFICATION(String(srsPack.sXYID),srsPack);
            } else {
                var cmdId = srsPack.sProcessID + app.NetAction.PROCESS_CUT + srsPack.sXYID;
                __SEND_NOTIFICATION(cmdId,srsPack);
            }
        }

        
        /** 打印基础流源数据(用16进制描述2进制字节流) */
        logpack(buff:egret.ByteArray, title:string):void {
            var len: number = buff.length;
            buff.position = 0;
            var hex = new SrsStreamReader(buff).getHex(len);
            console.log(title + hex);
        }
     
        addListeners(): void {
            if(this.socket != null) {
                this.socket.addEventListener(egret.Event.CONNECT,this.connectHandler,this);
                this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.errorHandler,this);
                this.socket.addEventListener(egret.Event.CLOSE,this.closeHandler,this);
                this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReciveMessage,this);
            }
        }

        removeListeners(): void {
            if(this.socket != null) {
                this.socket.removeEventListener(egret.Event.CONNECT,this.connectHandler,this);
                this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.errorHandler,this);
                this.socket.removeEventListener(egret.Event.CLOSE,this.closeHandler,this);
                this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReciveMessage,this);
            }
        }
		
        heartIntervalId:number;
        numOutputBytes:number;
        numInputBytes:number;
        connectTime:number;

        connectHandler(event: egret.Event): void {
            console.log(this.connectSrs.ip + ":" + this.connectSrs.port + " socket connect succeed!");
            this.isConnectting = false;
            this.numOutputBytes = 0;
            this.numInputBytes = 0;
            __SEND_NOTIFICATION(app.NetAction.SRS_CONNECT);
            addConnectHeart(app.NetAction.CMDT_CHECKACT);
            this.heartIntervalId = egret.setInterval(this.onConnectHeart,this,30000);
        }

        closeHandler(event: egret.Event): void {
            console.log(this.connectSrs.ip+":"+this.connectSrs.port + " socket close!");
            if (this.isConnectting) {
                this.isConnectting = false;
                this.srsCannotConnect();
                return;
            } else {
                var sendBytes = this.kbFormat(this.numOutputBytes);
                var recvBytes = this.kbFormat(this.numInputBytes);
                console.log("流量统计 共发送"+sendBytes+"，接收"+recvBytes);
            }
            if (this.reConnect == null) {
                mc2sdk.log("skt s",sendBytes,"r",recvBytes);
                __SEND_NOTIFICATION(app.NetAction.SRS_CLOSE);
                egret.clearInterval(this.heartIntervalId);
                this.removeListeners();
            } else {
                tip.popSysBottomTip("socket 连接被断开,重试建立连接");
                connectSrsServer(this.reConnect);
            }
        }

        errorHandler(event: egret.IOErrorEvent): void {
            console.log(this.connectSrs.ip+":"+this.connectSrs.port + " socket error!");
            if (this.isConnectting) {
                this.isConnectting = false;
                this.srsCannotConnect();
                return;
            } else {
                cy.lastConnectWasError = true;
                if(event.data != null) {
                    var errorEvent:any = event.data;
                    var error_msg:any;
                    if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                        var error_msg:any = errorEvent.data;
                    }
                    else {
                        error_msg = errorEvent;
                    }
                    mc2sdk.log("sktErr r",String(egret.Capabilities.runtimeType),
                                    "m",error_msg,
                                    "t",new Date().getTime()-this.connectTime);
                }
                else {
                    mc2sdk.log("sktErr t",new Date().getTime()-this.connectTime);
                }
            }
            __SEND_NOTIFICATION(app.NetAction.SRS_ERROR);
            egret.clearInterval(this.heartIntervalId);
            this.removeListeners();
        }


        /** 
         *  遇到连不上的服务器，启用自动寻找可连服务器的机制
         *  连不上的服务器会逐一标志为：不可用
         *  客户端会自动在列表中随机寻找下一个从未连失败过的服务器尝试连接
         *  若重连再次失败，则继续自动随机寻找下一个，直到成功(可用的会越来越少)
         *  若所有服务器都不可用，将弹出：“服务器正在维护中”客户端提示，并清空所有标记
         *  清空标记是为了客户端可以再次重新尝试所有客户端。
         *  注意：SRS有负载均衡，但负载均衡寻找客户端时，不会考虑连接失败的客户端
         *        因为往往不可连的服务器负载都是很低的，流程会进入互相递归死循环。
         */
        srsCannotConnect():void {
            this.removeListeners();
            if (this.connectSrs != null) {
                this.connectSrs.sobad = true;
                console.log(this.connectSrs.ip+":"+this.connectSrs.port+" socket is so bad...");
            }
            var srsConfig = cy.getNextNotbadSrs(); //找一个没连过的
            if (srsConfig == null) {
                console.log("oh fuck, all socket was down.");
                __SEND_NOTIFICATION(app.NetAction.SRS_ALL_ERROR);
                cy.clearSrsBadInfo(); //清空标志位，以让客户端有手动重试的机会。
            } else {
                cy.connectSrsServer(srsConfig);
            }
        }

         
        kbFormat(numBytes:number):string {
            var kb=1024,mb=kb*1024,gb=mb*1024,tb=gb*1024;
            return numBytes>tb?(numBytes/tb).toFixed(2)+"TB":
                   numBytes>gb?(numBytes/gb).toFixed(2)+"GB":
                   numBytes>mb?(numBytes/mb).toFixed(2)+"MB":
                               (numBytes/kb).toFixed(2)+"KB";
        }

        onConnectHeart():void {
            var i = this.heartList.length;
            while (--i > -1) {
                var hvo = this.heartList[i]
                if (hvo!=null) __SEND_NOTIFICATION(hvo.xyId, hvo.appId);
            }
        }

        getHeartVO(xyId:string, appId:number=0, remove:boolean=false):HeartVO {
            if (this.heartList == null) this.heartList=[];
            var len = this.heartList.length;
            for (var i=0; i<len; ++i) {
                var hvo = this.heartList[i];
                if (hvo == null) return null;
                if(hvo.xyId==xyId && hvo.appId == appId) {
                    if(remove) this.heartList.splice(i,1);
                    return hvo;
                }
            }
        }

	}

    class HeartVO {
        xyId:string;
        appId:number;
    }
}
