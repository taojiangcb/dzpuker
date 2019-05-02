module mc2sdk {
	
	export class AppProfile {
		
		appPackageName:string;
		
		appVersionName:string;
		
		appVersionCode:string;
		
		startTime:Long;
		
		sdkVersion:string;
		
		parenerId:string;
		
		isCracked:Boolean = false;
		
		installationTime:Long = new Long();
		
		purchaseTime:Long = new Long();
		
		appStroreId:Long = new Long();
		
		groupId:string;
		
		osType:string; 
		
		constructor(groupId:string, chanel:string, osType:number=null) {
			// this.appPackageName = NativeApplication.nativeApplication.applicationID;
			this.appVersionCode = Mc2Sdk.version;
			this.appVersionName = Mc2Sdk.versionLabel==''?Mc2Sdk.version:Mc2Sdk.versionLabel;
			this.startTime = Long.fromNumber(Mc2Sdk.initTime);
			this.sdkVersion = mc2sdk.sdkVersion;
			this.parenerId = chanel;
			this.groupId = groupId;
			this.osType = String(osType==null ? OS_TYPE.AIR : osType);
		}
		
		toArray():any[] {
			return [this.appPackageName, this.appVersionName, this.appVersionCode, 
			this.startTime, this.sdkVersion, this.parenerId, this.isCracked, 
			this.installationTime, this.purchaseTime, this.appStroreId, this.groupId, this. osType];
		}
		
		
	}
}