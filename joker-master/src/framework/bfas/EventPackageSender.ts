module mc2sdk {

	export class EventPackageSender {
		
		private session:Session;
		private message:Message;
		private data:EventPackage;

		private loader:egret.URLLoader;
		private request:egret.URLRequest;
		
		constructor(appEvents:AppEvent[]) {
		
			this.session = new Session(Mc2Sdk.deviceId+'_'+new Date().getTime(), appEvents);
			this.message = new Message(this.session);
			this.data = new EventPackage(Mc2Sdk.appId, Mc2Sdk.groupId, Mc2Sdk.chanel, Mc2Sdk.deviceType);
			
			if (Mc2Sdk.soData.mc2MessageArray != null) this.data.message = Mc2Sdk.soData.mc2MessageArray;
			this.data.message.push(this.message.toArray());
			
			
			this.loader = new egret.URLLoader();
			this.request = new egret.URLRequest(mc2sdk.requestUrl);
			this.request.method = egret.URLRequestMethod.POST;
			this.request.data = Mc2Sdk.createMsgPack(this.data.toArray()).buffer;
			this.loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
			this.loader.load(this.request);
			this.loader.addEventListener(egret.Event.COMPLETE,this.completeHandler,this);
			this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.failedHandler,this);
		}
		
		protected completeHandler(event:Event):void {
			try {
				var jsonBuff = this.loader.data;
				var bytes = new egret.ByteArray(jsonBuff);
				var jsonStr = bytes.readUTFBytes(bytes.length);
				var json:any = JSON.parse(jsonStr);
				if (json.result == 0) {
					Mc2Sdk.soData.mc2MessageArray = null;
					var str:String = '';
					if (this.data.message.length > 1) {
						str = '，含缓存'+(this.data.message.length-1)+'条';
					}
					Mc2Sdk.log('收到数据'+str);
					
				} else if (json.result == -1){
					Mc2Sdk.log('收到魔方返回：'+jsonStr);
					//如果是多条，去掉一条再试(排除缓存出错，永远无法发送的可能)
					if (this.data.message.length > 1) {
						var removeData:any = this.data.message.shift();
						this.request.data = Mc2Sdk.createMsgPack(this.data.toArray());
						this.loader.load(this.request);
						Mc2Sdk.log('统计失败，已删除一条缓存再重试：'+removeData);
					} else this.failedHandler();
					
				} else this.failedHandler();
			} catch (error) {
				this.failedHandler();
			}
		}
		
		protected failedHandler(event:any=null):void {
			Mc2Sdk.soData.mc2MessageArray = this.data.message;
			Mc2Sdk.log('统计失败：'+ this.data.toArray());
		}
		
		
		
		
	}
}