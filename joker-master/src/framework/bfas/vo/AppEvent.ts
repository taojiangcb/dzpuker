module mc2sdk {

	export class AppEvent {
		
		/** 事件ID	 */		
		id:string;
		
		/**	事件描述	 */
		label:string;

		/**	发生时间	 */
		startTime:Long;

		/**	参数，Object只能是int, long, double, float, string基本类型	 */
		parameters:Object;
		
		
		constructor(id:string="", label="", parameters:Object=null) {
			this.id = id;
			this.label = label;
			this.startTime = Long.fromNumber(new Date().getTime());
			this.parameters = parameters;
		}
		
		toArray():any[] {
			return [this.id, this.label, new Integer(1), this.startTime, this.parameters];
		}
		
		
	}
}