module mc2sdk {

	export class HttpActivate {
		
		
		private url:string = 'http://42.121.236.133:8080/index.php';
		private sign:string = '202dcbcb527924de601b5dcf6bf6128a';
		private urlLoader:egret.URLLoader;
		
		private params:any = {
			appId:0,
			groupId:0,
			channelId:0,
			deviceId:0,
			account:0,
			phone:0,
			osType:0,
			deviceType:0,
			version:'0.0.0'
		};
		
		
		constructor() {
			
			this.params.deviceId = this.params.account = Mc2Sdk.deviceId;
			this.params.deviceType = this.params.osType = Mc2Sdk.deviceType;
			this.params.appId = Mc2Sdk.appId;
			this.params.groupId = Mc2Sdk.groupId;
			this.params.channelId = Mc2Sdk.chanel;
			this.params.account = Mc2Sdk.userId;
			this.params.phone = Mc2Sdk.os;
			this.params.version = Mc2Sdk.version;
			
			
			var requestUrl:string = ''
			var urlParams:string = '';
			var signParams:string = '';
			
			for (var key in this.params) {
				urlParams += key + '=' + this.params[key] + '&';
				signParams += key + '=' + this.params[key] + '|';
			}
			
			signParams += this.sign;
			urlParams += 'signature=' + gameabc.md5.hash(signParams);
			requestUrl = this.url + '?' + urlParams;
			
			this.urlLoader = new egret.URLLoader(new egret.URLRequest(requestUrl));
			this.urlLoader.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
			
		}
		
		protected onComplete(event:Event):void {
			try {
				var data = this.urlLoader.data;
				var json = JSON.parse(data);
				if (json.message == 'success') {
					Mc2Sdk.soData.activate = true;
					Mc2Sdk.log('激活成功');
				}
				else Mc2Sdk.log('激活失败：' + data);
			} catch(error) {
				Mc2Sdk.log('激活失败：' + data);
			}
		}
		
	}
	
}