module mc2sdk {
	
	export class Session {
		
		id:string;
		
		start:Long = new Long();
		
		status:Integer = new Integer();
		
		duration:Integer = new Integer();
		
		activity:any[];
		
		appEvents:any[];
		
		isConnected:Integer = new Integer(0);
		
		constructor(id:string, appEvents:AppEvent[]=null) {
			
			this.id = id;
			this.start = Long.fromNumber(Mc2Sdk.initTime);
			
			if (appEvents == null) return;
			var len:number = appEvents.length;
			this.appEvents = new Array();
			for (var i:number=0; i<len; ++i) {
				this.appEvents.push(appEvents[i].toArray());
			}
		}
		
		toArray():any[] {
			return [this.id, this.start, this.status, this.duration, 
					this.activity, this.appEvents, this.isConnected];
		}
		
	}
}