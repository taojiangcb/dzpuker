module protobufbase {
	/**
	 *
	 * @author 
	 *
	 */
    export class Binary64 extends egret.HashObject{
    	
        public static CHAR_CODE_0: number = '0'.charCodeAt(0);
        public static CHAR_CODE_9: number = '9'.charCodeAt(0);
        public static CHAR_CODE_A: number = 'a'.charCodeAt(0);
        public static CHAR_CODE_Z: number = 'z'.charCodeAt(0);
        public low: number = 0;
        public internalHigh: number = 0;
        
        public constructor(low: number = 0,high: number = 0) {
            super();
            this.low = low;
            this.internalHigh = high;
        }
        
        public div(n: number): number {
            var modHigh: number = this.internalHigh % n;
            var mod: number = (this.low % n + modHigh * 6) % n;
            this.internalHigh /= n;
            var newLow: number = (modHigh * 4294967296.0 + this.low) / n;
            this.internalHigh += newLow / 4294967296.0;
            this.low = newLow;
            return mod;
        }

        public mul(n: number) {
            var newLow: number = this.low * n;
            this.internalHigh *= n;
            this.internalHigh += newLow / 4294967296.0;
            this.low *= n;
        }

        public add(n: number) {
            var newLow: number = this.low + n;
            this.internalHigh += newLow / 4294967296.0;
            this.low = newLow;
        }

        public bitwiseNot() {
            this.low = ~this.low;
            this.internalHigh = ~this.internalHigh;
        }
        
	}
}
