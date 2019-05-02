module protobufbase {
	/**
	 *
	 * @author 
	 *
	 */
    export class Int64 extends Binary64{
        public set high(value: number) {
            value = value;
            this.internalHigh = value;
        }

        public get high(): number {
            return this.internalHigh;
        }


        public constructor(low: number = 0,high: number = 0) {
            super(low,high);
        }

        public static fromNumber(n: number): Int64 {
            return new Int64(n,Math.floor(n / 4294967296.0));
        }

        public toNumber(): number {
            return this.high * 4294967296.0 + this.low;
        }

        public toString(radix: number = 10): string {
            if(radix < 2 || radix > 36) {
                throw new Error("参数错误");
            }
            switch(this.high) {
                case 0:
                    {
                        return this.low.toString(radix);
                    }
                case -1:
                    {
                        if((this.low & 0x80000000) == 0) {
                            return ((this.low | 0x80000000) - 2147483648.0).toString(radix);
                        }
                        else {
                            return (this.low).toString(radix);
                        }
                    }
                default:
                    {
                        break;
                    }
            }
            if(this.low == 0 && this.high == 0) {
                return "0";
            }
            var digitChars: Array<any> = [];
            var copyOfThis: UInt64 = <any>new UInt64(this.low,this.high);
            if(this.high < 0) {
                copyOfThis["bitwiseNot"]();
                copyOfThis["add"](1);
            }
            do {
                var digit: number = (copyOfThis["div"](radix));
                if(digit < 10) {
                    digitChars.push(digit + Binary64.CHAR_CODE_0);
                }
                else {
                    digitChars.push(digit - 10 + Binary64.CHAR_CODE_A);
                }
            }
            while(copyOfThis["high"] != 0)
            if(this.high < 0) {
                return '-' + copyOfThis["low"].toString(radix) + String.fromCharCode.apply(String,digitChars.reverse());
            }
            else {
                return copyOfThis["low"].toString(radix) + String.fromCharCode.apply(String,digitChars.reverse());
            }
        }

        public static parseInt64(str: string,radix: number = 0): Int64 {
            var negative: boolean = str.search(/^\-/) == 0;
            var i: number = (negative ? 1 : 0);
            if(radix == 0) {
                if(str.search(/^\-?0x/) == 0) {
                    radix = (16);
                    i += (2);
                }
                else {
                    radix = (10);
                }
            }
            if(radix < 2 || radix > 36) {
                throw new Error("参数错误");
            }
            str = str.toLowerCase();
            var result: Int64 = new Int64();
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
            if(negative) {
                result["bitwiseNot"]();
                result["add"](1);
            }
            return result;
        }

    }

}
