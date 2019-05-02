module utils {
	/**
	 *
	 * @author 
	 *
	 */
	export class NativeUtils {
		public constructor() {}
		private static nativeurl:string ="http://download.zgsjl8.com/dz/h5/index.html";
		public static init():void{
            console.log("initialize native api...");
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                window.onunload = function unloadal() {
                    playcards.getProxy().outbakfun();
                    happy.getProxy().outRoom();
                    if(cy.srsServer!=null) {
                          cy.srsServer.close();
                    }
                }
            }

            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                egret.ExternalInterface.addCallback("sendToJS",this.sendToJS);
                egret.ExternalInterface.addCallback("EgretInterface",(msg:string)=>{
                    console.log(msg);
                });
                 //启动native api
                egret.ExternalInterface.call("RuntimeInterface","start native api");
		    }
		}
       
		private static lastbackTime:number = 0;
		/**native 调用js*/
        private static sendToJS(message: string):void{
            console.log("receive native msg:" + message);
            var data = JSON.parse(message);
            var type: number = data.type;
            var jsonData:any = data.data;

            // var type: number = Number(message) ;
            switch(type) {
                case NATIVE_CMD.BACK://返回按钮
                    if(playcards.getProxy().out()&&happy.getProxy().outRoom()){
                        var time: number = egret.getTimer();
                        if(time - this.lastbackTime<2000) {
                            NativeUtils.nativeCall(NATIVE_CMD.CLOSE_NATIVE);
                        }
                        else {
                            var tip_str = gameabc.getMessage("EXIT_AGIN");
                            tip.popSysBottomTip(tip_str);
                        } 
                        this.lastbackTime  = time;
                    }              
                    break;
                case NATIVE_CMD.SET_UUID: //设置设备的UUID 由native端调用
                    gameabc.UUID.setMobileUUID(jsonData);
                    break;
                case NATIVE_CMD.BANK_HTTPS:
                    __SEND_NOTIFICATION(bank.BankUIMoudMediator.BANK_HTTP_RESPONSE,jsonData);
                    break;
                case NATIVE_CMD.NATIVE_INIT:
                    platform.CHANNE_ID = jsonData.channelId;
                    console.log("receive channelId:" + jsonData.channelId);
                    if(jsonData.nativeVer) {
                        platform.NATIVE_VER = jsonData.nativeVer;
                        console.log("receive nativeVer:" + jsonData.nativeVer);
                    }
                    break;
                case NATIVE_CMD.RECEIVE_LN:
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.NATIVE_LOCAL_NOTIFICATION_HANDLER,jsonData)
                    console.log("receive local notification:" + jsonData.identityKey);
                    break;
                default:
                    break;
            }
        }
        /**
         * 手机震动
         */
        public static shock(): void {
            //调用手机震动方法 startVibrator
            //            var msg = { "index": "-1","time": ["100","400"] };          
            //            egret.ExternalInterface.call("startVibrator",JSON.stringify(msg));
            this.nativeCall(NATIVE_CMD.SHOCK, ["100", "400"]);
        }
        /**打开网址 */
        public static openurl(registerURL:string): void{
            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                  NativeUtils.nativeCall(utils.NATIVE_CMD.OPEN_URL,registerURL);
             }
             else if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                   window.open(registerURL);
            }
        }
        /**加载完成移除loading */
        public static removeloading(): void{
            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                  utils.NativeUtils.nativeCall(utils.NATIVE_CMD.EGRET_COMPLETE);
             }
            //  else if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            //        var loading = document.getElementById("loading");  
            //          if(loading!=null)  document.body.removeChild(loading); 
            // }
           
        }
        /**调用native接口 */
        public static nativeCall(type: number, data: any=''): void{
            var msg = { "type": type,"data": data };
            var callParams:string = JSON.stringify(msg);
            egret.ExternalInterface.call("sendToNative",callParams);
            console.log("nativeCall:" + callParams);
        }
        /**
         * web地址
         */
        public static getURL():string{
            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE)
                return NativeUtils.nativeurl;
            else
                return window.location.href.split('?')[0];
        }
        /**
        * web地址参数
        */
        public static getURLObj(): Object {
            var args = new Object();
            if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB){
                var query = location.search.substring(1);//获取查询串 
                var pairs = query.split("&");//在&处断开 
                for(var i = 0;i < pairs.length;i++) {
                    var pos = pairs[i].indexOf('=');//查找name=value 
                    if(pos == -1) {//如果没有找到就跳过 
                        continue;
                    }
                    var argname = pairs[i].substring(0,pos);//提取name 
                    var value = pairs[i].substring(pos + 1);//提取value 
                    args[argname] = value;//存为属性 
                }
            }
            return args;
        }
        /**打开视频直播 */
        public static openVedio(roomId:string): void {
            // document.addEventListener("OPENVEDIO" )
            // roomId = "166040";
            roomId ="bfdzstream1"
            var url; 
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                // if (egret.Capabilities.isMobile) {
                //     url = 'http://pullhls03a795c4.live.126.net/live/7ce23cdde59f4c08804ed22c6f282d6c/playlist.m3u8';
                // } else url = "http://v03a795c4.live.126.net/live/7ce23cdde59f4c08804ed22c6f282d6c.flv";
                // url = "https://www.zhanqi.tv/live/embed?roomId=" + roomId + "&fhost=download.zgsjl8.com";
                url = "http://192.168.138.124:9098/loading/lives/rtmplvs.html?"+roomId;
                var e = new Event("OPENVEDIO");
                e['data'] = url;            
                document.dispatchEvent(e);
            } else {
                // url = "http://nos.netease.com/vod163/demo.mp4";//'rtmp://v03a795c4.live.126.net/live/7ce23cdde59f4c08804ed22c6f282d6c';
                this.nativeCall(NATIVE_CMD.SHOW_LIVE,roomId);
            }
        }
        /**关闭视频直播 */
        public static closeVedio(): void {   
            if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB)
                document.dispatchEvent(new Event("CLOSEVEDIO"))
            else  this.nativeCall(NATIVE_CMD.HIDE_LIVE);
        }
        /*转gbk字符 调用浏览器api*/
        public static ToGBKString(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number):string{
              if ('TextDecoder' in window) { 
                    var dataView = new DataView(buffer,byteOffset,byteLength);  
                    var decoder = new window['TextDecoder']('gbk');  
                    var decodedString = decoder.decode(dataView);  
                    console.info(decodedString);  
                    return decodedString;
              } else {  
                console.error('Your browser does not support the Encoding API.');  
            }  
        }
    }
  
    /**native接口类型 */
     export const enum NATIVE_CMD {
        OPEN_URL=1,             /**打开网址 */
        EGRET_COMPLETE=2,       /**初始化完成 */
        SHOCK = 3,              /**震动*/
        BACK = 4,               /**后退键*/
        CLOSE_NATIVE = 5,       /**关闭程序*/
        SET_UUID,               /*NATIVE设备的UUID*/
        BANK_HTTPS,             /**钱庄HTTPS */
        SHOW_LIVE = 8,          /**打开直播视频*/
        HIDE_LIVE = 9,          /**关闭直播视频*/ 
        NATIVE_INIT = 10,       /**native 传送渠道号到runTime里。 */   
        NATIVE_UPDATE = 11,     /**强行更新终端 */ 
        SLN = 12,                /**推送本地消息 */
        RECEIVE_LN = 13,         /**接收本地推送消息*/
        TO_APPSTORE = 14,        /**跳转到appStore */
        TO_WECHAT = 15,          /**跳转到wechat */
    }
}
