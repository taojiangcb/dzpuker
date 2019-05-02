module gameabc {
    export class StringUtils {
        public constructor() {
        }

        /**将1.1.1这样的版本号转换为9位数字100100100的版本号 */        
        public static versionToNumberVersion(ver:string): number{
            var numVer: number = 0;
            const verKey: number[] = [100000000, 100000, 100];
            var arr: string[] = ver.split(".");
            for (var i: number = 0; i < arr.length; i++){
                var num: number = parseInt(arr[i]);
                numVer += (num * verKey[i]);
            }
            return numVer;
        }

        // 判断字符是不是中文
        public static isCHSString(p_string: string): boolean {
            if(p_string == null) {
                return false;
            }
            var regx: RegExp = /^[\u4e00-\u9fa5]+$/;
            return regx.test(p_string);
        }

        //判断字符是不是正整数
        public static isNumber(p_string: string): boolean {
            if(p_string == null) {
                return false;
            }
            var regx: RegExp = /^[^-]?\d+\d*$/;
            return regx.test(p_string);
        }
        /*
         * 数值转字符 正数增加+符号
         ***/
        public static numberToString(value:number):string{
            if(value >= 0) return "+" + value;
            return "" + value;
        }
        //判断字符是不是密码字符（。。。）
        public static isPwd(p_string: string): boolean {
            if(p_string == null) {
                return false;
            }
            var regx: RegExp = /^[\w\u4e00-\u9fa5]{6,16}$/;
            return regx.test(p_string);
        }
        
        /**
         * replace(xx{i}x{2}, "{i}", xxx);
         * @param input
         * @param replace
         * @param replaceWith
         */
        public static replace(input: string,replace: string,replaceWith: string): string {

            if(input == null) return "";
            if(replace == null) return  "";
            if(replaceWith == null) return "";

            //change to StringBuilder
            var sb: string = "";
            var found: boolean = false;

            var sLen:number = input.length;
            var rLen:number = replace.length;

            for(var i = 0;i < sLen;i++) {
                if(input.charAt(i) == replace.charAt(0)) {
                    found = true;
                    for(var j = 0;j < rLen;j++) {
                        if(!(input.charAt(i + j) == replace.charAt(j))) {
                            found = false;
                            break;
                        }
                    }

                    if(found) {
                        sb += replaceWith;
                        i = i + (rLen - 1);
                        continue;
                    }
                }
                sb += input.charAt(i);
            }
            //TODO : if the string is not found, should we return the original
            //string?
            return sb;
        }

        /*
         * @language zh_cn
         * 判断字符是不是10位以内半角数字、中文、英文
         * @version 1.0
         * @platform web native
         */
        //        public static isWord(p_string:string):boolean {
        //            if (p_string == null) return false;
        //            var regx:RegExp = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}+$/;
        //            return regx.test(p_string);
        //        }

        /* @language zh_cn
         * 格式化字符串函数
         * @format 字符串的格式 例如:hellow {0} good moring
         * @args 对应{0} {1}...的填充参数
         * @version 1.0
         * @platform web native pc
         */
        public static formatString(format: string,...args): string {
            format = gameabc.StringUtils.replace(format,"\\n","\n");
            var len: number = args.length;
            for(var i = 0;i < len;i++) {
                format = gameabc.StringUtils.replace(format,"{" + i + "}","" + args[i]);
            }
            return format;
        }
        
        public static formatHttpParams(param:any):string {
            var http_par:string[] = [];
            for (var key in param) {
                if (param.hasOwnProperty(key)) {
                    var element = param[key];
                    http_par.push(key + "=" + element);
                }
            }
            return http_par.length > 0 ? http_par.join("&") : "";
        }


        public static trim(input: string): string {
            return this.ltrim(this.rtrim(input));
        }

        public static ltrim(input: string): string {
            var size: number = input.length;
            for(var i: number = 0;i < size;i++) {
                if(input.charCodeAt(i) > 32) {
                    return input.substring(i);
                }
            }
            return "";
        }

        public static rtrim(input: string): string {
            if(input == null) return '';
            var size: number = input.length;
            for(var i: number = size;i > 0;i--) {
                if(input.charCodeAt(i - 1) > 32) {
                    return input.substring(0,i);
                }
            }
            return "";
        }
        

        /**
         * Pads p_string with specified character to a specified length from the left.
         *
         *	@param p_string String to pad
         *
         *	@param p_padChar Character for pad.
         *
         *	@param p_length Length to pad to.
         *
         *	@returns String
         *
         * 	@langversion ActionScript 3.0
         *	@playerversion Flash 9.0
         *	@tiptext
         */
        public static padLeft(p_string: string,p_padChar: string,p_length: number): string {
            var s: string = p_string;
            while(s.length < p_length) { s = p_padChar + s; }
            return s;
        }


        /**
         * Lua对像结构解析
         */
        public static parseLuaString(str:string):Object {
            var oldStr:string = str;
            var obj:Object = {};
            var subKeys:string[] = [];
            var reg:RegExp = /[^;]([a-zA-Z0-9]+=[\"\']([a-zA-Z0-9]+=[0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D=\"\';]+;[\"\']))/ig;
            var res;
            while(res = reg.exec(str)) {
                subKeys.push(res[0]);
                oldStr = oldStr.replace(res[0],"");
            }

            let addValue = function(o:any,kv_str:string):void {
                kv_str = gameabc.StringUtils.trim(kv_str);
                 var kv:string[] = kv_str.split("=");
                if(kv.length == 2) {
                    o[kv[0]] = kv[1];
                }
            }

            let splitValues = function(o:any,data_str:string):void {
                data_str = gameabc.StringUtils.trim(data_str);
                data_str = data_str.replace(/[\"\']/gi,"")
                args = data_str.split(";");
                var n:number = args.length;
                while(n-- && n > -1) {
                    addValue(o,args[n]);
                }
            }

            var args:string[] = [];
            splitValues(obj,oldStr);

            var len:number = subKeys.length;
            while(len-- && len > -1) {
                var subk = subKeys[len];
                var vIndex = subk.indexOf("=");
                var sk = subk.substr(0,vIndex);
                var sv = subk.substr(vIndex + 1);
                obj[sk] = obj[sk] ? obj[sk] : {};
                splitValues(obj[sk],sv);
            }
            return obj;
        }
    }
}