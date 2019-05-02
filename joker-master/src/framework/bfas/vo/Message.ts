module mc2sdk {
	
	export class Message {
		
		session:any[];
		
		constructor(session:Session) {
			this.session = session.toArray();
		}
		
		toArray():any[] {
			return [new Integer(2), this.session];
		}
		
		
	}
}