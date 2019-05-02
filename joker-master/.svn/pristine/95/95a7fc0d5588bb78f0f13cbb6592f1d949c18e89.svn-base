module gameabc {
    
    export function getMessage(key: string, ...params): string {
        params.unshift(key);
        return gameabc.ResourceBundleUtil.getMessage.apply(null,params);
    }

    export function getError(key: string,...params):string {
        params.unshift(key);
        return gameabc.ResourceBundleUtil.getError.apply(null,params);
    }
    
    export function getConfig(key: string, ...params):string {
        params.unshift(key);
        return gameabc.ResourceBundleUtil.getConfig.apply(null,params);
    }

	/**
	 *
	 * @author 
	 *
	 */
	export class ResourceBundleUtil {
		public constructor() {
		}
		
        private static _msg:Object = {};
        private static _error:Object = {};
        private static _cfg:Object = {};
        private static _msgInited:boolean = false;
        private static _errorInited: boolean = false;
        private static _cfgInited:boolean = false;

        public static getMessage(key: string,...params): string {
            // if(params.length==0) return ResourceBundleUtil._msg[key];  /n会返回//n
            return ResourceBundleUtil.replaceRN(ResourceBundleUtil._msg[key],params);
        }
        public static getError(key: string,...params: any[]):string {
            if(params.length==0) return ResourceBundleUtil._error[key];
            return ResourceBundleUtil.replaceRN(ResourceBundleUtil._error[key],params);
        }
        public static getConfig(key: string,...params: any[]):string {
            if(params.length==0) return ResourceBundleUtil._cfg[key];
            return ResourceBundleUtil.replaceRN(ResourceBundleUtil._cfg[key],params);
        }
        static replaceRN(str:string,params:any[]):string {
            if(str) {
                str = gameabc.StringUtils.replace(str,"\\n","\n");
                var len: number = params.length;
                for(var i = 0;i < len;i++) {
                    str = gameabc.StringUtils.replace(str, "{" + i + "}", "" + params[i]);
                }
                return str;
            }
			return "";
        }



        public static setCfgSourceData(value: string): void {
            if(ResourceBundleUtil._cfgInited) return;
            ResourceBundleUtil._cfg = ResourceBundleUtil.createSourceData(value);
            ResourceBundleUtil._cfgInited = true;
        }
        public static setMsgSourceData(value: string): void {
            if(ResourceBundleUtil._msgInited) return;
            ResourceBundleUtil._msg = ResourceBundleUtil.createSourceData(value);
            ResourceBundleUtil._msgInited = true;
        }
        public static setErrorSourceData(value: string): void {
            if(ResourceBundleUtil._errorInited) return;
            ResourceBundleUtil._error = ResourceBundleUtil.createSourceData(value);
            ResourceBundleUtil._errorInited = true;
        }
        static createSourceData(value:string):Object {
            var _dict = {};
            value = gameabc.StringUtils.replace(value, "\r\n", "\n");
            var splitMark: string = "\n";
            var arr: string[] = value.split(splitMark);
            var len: number = arr.length;
            var kv: string[];
            for(var i: number = 0;i < len;i++) {
                if(!ResourceBundleUtil.isIgoneLine(arr[i])) {
                    kv = ResourceBundleUtil.getArrKeyAndValue(arr[i]);
                    _dict["" + kv[0]] = kv[1];
                }
            }
            return _dict;
        }


        
        

    
        public static getClearHeadSpace(str: string): string {
            // 第一个有效字符是#，此行为注释
            var len: number = str.length;
            for(var i: number = 0;i < len;i++) {
                if(str.charAt(i) == " ") {
                    continue;
                }
                else {
                    return str.substr(i);
                }
            }
            return str;
        }
        private static getArrKeyAndValue(str: string): string[] {
            var arr: string[] = str.split("=");
            arr[0] = gameabc.StringUtils.trim(arr[0]);
            var len: number = arr.length;
            var str2: string = arr[1];
            for(var i: number = 2;i < len;i++) {
                str2 += ("=" + arr[i]);
            }
            arr[1] = gameabc.StringUtils.trim(str2);
            return arr;
        }

        private static isIgoneLine(str: string): boolean {
            // 第一个有效字符是#，此行为注释
            var len: number = str.length;
            for(var i: number = 0;i < len;i++) {
                if(str.charAt(i) != "#" && str.charAt(i) == " ") {
                    return false;
                }
                if(str.charAt(i) == "#") {
                    return true;
                }
                if(str.charAt(i) == " ") {
                    continue;
                }
            }
            return false;
        }
	}
}
