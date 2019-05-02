module mc2sdk {

	export class RoleType {
		
		static BASED_ON_COUNT:string = 'basedOnCount';
		
		static BASED_ON_TIME:string = 'basedOnTime';
		
		id:number;
		
		type:string;
		
		time:number;
			
		static create(type:string):RoleType {
			if (Mc2Sdk.soData.roleCache == null) {
				Mc2Sdk.soData.roleCache = {};
			}
			return new RoleType();
		}
		
		send(appEvents:AppEvent[]):void {
			var cache:AppEvent[] = this.getCache();
			switch (this.type) {
				case RoleType.BASED_ON_COUNT:
					if (cache==null) {
						if (appEvents.length < this.time) {
							this.pushCache(appEvents);
						} else {
							new EventPackageSender(appEvents);
						}
					} else if(cache.length + appEvents.length < this.time) {
						this.pushCache(appEvents);
					} else {
						this.sendCache(appEvents);
					}
					break;
				case RoleType.BASED_ON_TIME:
					if (cache==null || cache.length==0) {
						this.pushCache(appEvents);
					} else if (appEvents[0].startTime.toNumber() - cache[0].startTime.toNumber() < this.time) {
						this.pushCache(appEvents);
					} else {
						this.sendCache(appEvents);
					}
					break;
				default :
					new EventPackageSender(appEvents);
			}
		}
		
		checkCache():void {
			var cache:AppEvent[] = this.getCache();
			if (this.type == RoleType.BASED_ON_TIME) {
				if (cache!=null && cache.length>0) {
					if (new Date().getTime() - cache[0].startTime.toNumber() > this.time) {
						this.sendCache();
					}
				}
			}
		}
		
		
		protected getCache():AppEvent[] {
			return Mc2Sdk.soData.roleCache[this.id];
		}
		
		protected pushCache(appEvents:AppEvent[]):void {
			var cache:AppEvent[] = this.getCache();
			if (cache == null) Mc2Sdk.soData.roleCache[this.id] = appEvents;
			else Mc2Sdk.soData.roleCache[this.id] = cache.concat(appEvents);
		}
		
		protected sendCache(appEvents:AppEvent[]=null):void {
			new EventPackageSender(appEvents==null?this.getCache():this.getCache().concat(appEvents));
			Mc2Sdk.soData.roleCache[this.id] = null;
		}
	}
}