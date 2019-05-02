module mc2sdk {
	
	export class EventPackage {
		
		deviceId:string;
		
		developerAppKey:string;
		
		appProfile:any[];
		
		deviceProfile:any[];
		
		message:any[];
		
		activeApps:any[];
		
		
		constructor(appId:string,groupId:string,chanel:string,osType:number,message:Message[]=null) {
			
			this.deviceId = Mc2Sdk.deviceId;
			this.developerAppKey = appId;
			this.appProfile = new AppProfile(groupId,chanel,osType).toArray();
			this.deviceProfile = new DeviceProfile().toArray();
			this.message = [];
			this.activeApps = [];
			
			if (message == null) return;
			var len:number = message.length;
			for (var i:number=0; i<len; ++i) {
				this.message.push(message[i].toArray());
			}
		}
		
		toArray():any[] {
			return [this.deviceId, this.developerAppKey, this.appProfile, 
					this.deviceProfile, this.message, this.activeApps];
		}
		
	}
}