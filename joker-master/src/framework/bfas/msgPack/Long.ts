module mc2sdk {
	export class Long {
		
		public big:number;
		public little:number;
		
		constructor(big:number=0, little:number=0) {
			this.big = big;
			this.little = little;
		}
		
		static fromNumber(value:number):Long {
			return new Long(Math.floor(value / 4294967296.0), value&0xFFFFFFFF);	
		}
		
		toNumber():number {
			return this.big * 4294967296.0 + this.little;
		}
		
		toString():string {
			return '0x'+this.toStr(this.big)+this.toStr(this.little);
		}
		
		toStr(n:number):string {
			return ('000'+ n.toString(16)).substr(-4);
		}
		
	}
}