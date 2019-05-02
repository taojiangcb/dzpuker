module mc2sdk {
	
	export class DeviceProfile {
		
		/**		 * 手机型号		 */
		mobileModel:string;
		/**		 * SDK Version, e.g: 7,8,9,11		 */
		osSdkVersion:string = '';
		/**		 * 位置信息		 */
		locationInfo:any[];
		/**		 * Cpu		 */
		cpuABI:string = '';
		/**		 * 分辨率	 */
		pixelMetric:string;
		/**		 * 国家		 */
		country:string = "";
		/**		 * 运营	 */
		carrier:string = "";
		/**		 * 语言		 */
		language:string = "";
		/**		 * 时区		 */
		timezone:Integer = new Integer();
		/**		 * 手机操作系统版本		 */
		osVersion:String = '';
		/*		* 是否是Wifi连接, 0表示是Wifi连接�?表示2G/3G		*/
		channel:Integer = new Integer();
		// 在不是Wifi连接时有意义 2g or 3g
		netType:string = '';
		
		isJailBroken:boolean = false;
		
		simOperator:string = '';
		
		networkOperator:string = '';
		
		hostName:string = "";
		
		deviceName:string = "";
		
		kernBootTime:Long = new Long();
		
		advertis:string = "";//ios add,android dummy for msg pack 
		
		wifiBSSID:string = "";
		
		mobileNetType:string = "";
		
		cellID:Integer = new Integer();
		
		lac:Integer = new Integer();
		
		constructor() {
			this.mobileModel = Mc2Sdk.os;
		}
		
		toArray():any[] {
			return [this.mobileModel,this.osSdkVersion,this.locationInfo,this.cpuABI,
				this.pixelMetric,this.country,this.carrier,this.language,this.timezone,
				this.osVersion,this.channel,this.netType,this.isJailBroken,this.simOperator,
				this.networkOperator,this.hostName,this.deviceName,this.kernBootTime,
				this.advertis,this.wifiBSSID,this.mobileNetType,this.cellID,this.lac];
		}
	}
}