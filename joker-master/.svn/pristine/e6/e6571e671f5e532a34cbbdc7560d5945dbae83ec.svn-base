module mc2sdk {
	export class Integer {
		
		public value:number;
		
		constructor(value:number=0) {
			this.value = value & 0xFFFFFFFF;
		}
		
		toNumber():Number {
			return this.value;
		}
		
		toString():string {
			return String(this.value);
		}
		
		toStr(n:number):string {
			return ('000'+ n.toString(16)).substr(-4);
		}
		
	}
}