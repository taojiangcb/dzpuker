module protobufbase {
	/**
	 *
	 * @author 
	 *
	 */
    export class UInt64 extends Binary64{
        public set high(value: number) {
            value = (value);
            this.internalHigh = value;
        }

        public get high(): number {
            return this.internalHigh;
        }


        public constructor(low: number = 0,high: number = 0) {
            super(low,high);
        }

        public static fromNumber(n: number): UInt64 {
            return new UInt64(n,Math.floor(n / 4294967296.0));
        }

        public toNumber(): number {
            return (this.high * 4294967296) + this.low;
        }

        public toString(radix: number = 10): string {
            if(radix < 2 || radix > 36) {
                throw new Error("参数错误");
            }
            if(this.high == 0) {
                return this.low.toString(radix);
            }
            var digitChars: Array<any> = [];
            var copyOfThis: UInt64 = new UInt64(this.low,this.high);
            do {
                var digit: number = (copyOfThis["div"](radix));
                if(digit < 10) {
                    digitChars.push(digit + Binary64.CHAR_CODE_0);
                }
                else {
                    digitChars.push(digit - 10 + Binary64.CHAR_CODE_A);
                }
            }
            while(copyOfThis.high != 0)
            return copyOfThis["low"].toString(radix) + String.fromCharCode.apply(String,digitChars.reverse());
        }

        public static parseUInt64(str: string,radix: number = 0): UInt64 {
            var i: number = (0);
            if(radix == 0) {
                if(str.search(/^0x/) == 0) {
                    radix = (16);
                    i = (2);
                }
                else {
                    radix = (10);
                }
            }
            if(radix < 2 || radix > 36) {
                throw new Error("参数错误");
            }
            str = str.toLowerCase();
            var result: UInt64 = new UInt64();
            for(;i < str.length;i++) {
                var digit: number = (str.charCodeAt(i));
                if(digit >= Binary64.CHAR_CODE_0 && digit <= Binary64.CHAR_CODE_9) {
                    digit -= (Binary64.CHAR_CODE_0);
                }
                else if(digit >= Binary64.CHAR_CODE_A && digit <= Binary64.CHAR_CODE_Z) {
                    digit -= (Binary64.CHAR_CODE_A);
                    digit += (10);
                }
                else {
                    throw new Error("参数错误");
                }
                if(digit >= radix) {
                    throw new Error("参数错误");
                }
                result["mul"](radix);
                result["add"](digit);
            }
            return result;
        }
	}
}
