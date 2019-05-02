var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameabc;
(function (gameabc) {
    var StringUtils = (function () {
        function StringUtils() {
        }
        /**将1.1.1这样的版本号转换为9位数字100100100的版本号 */
        StringUtils.versionToNumberVersion = function (ver) {
            var numVer = 0;
            var verKey = [100000000, 100000, 100];
            var arr = ver.split(".");
            for (var i = 0; i < arr.length; i++) {
                var num = parseInt(arr[i]);
                numVer += (num * verKey[i]);
            }
            return numVer;
        };
        // 判断字符是不是中文
        StringUtils.isCHSString = function (p_string) {
            if (p_string == null) {
                return false;
            }
            var regx = /^[\u4e00-\u9fa5]+$/;
            return regx.test(p_string);
        };
        //判断字符是不是正整数
        StringUtils.isNumber = function (p_string) {
            if (p_string == null) {
                return false;
            }
            var regx = /^[^-]?\d+\d*$/;
            return regx.test(p_string);
        };
        /*
         * 数值转字符 正数增加+符号
         ***/
        StringUtils.numberToString = function (value) {
            if (value >= 0)
                return "+" + value;
            return "" + value;
        };
        //判断字符是不是密码字符（。。。）
        StringUtils.isPwd = function (p_string) {
            if (p_string == null) {
                return false;
            }
            var regx = /^[\w\u4e00-\u9fa5]{6,16}$/;
            return regx.test(p_string);
        };
        /**
         * replace(xx{i}x{2}, "{i}", xxx);
         * @param input
         * @param replace
         * @param replaceWith
         */
        StringUtils.replace = function (input, replace, replaceWith) {
            if (input == null)
                return "";
            if (replace == null)
                return "";
            if (replaceWith == null)
                return "";
            //change to StringBuilder
            var sb = "";
            var found = false;
            var sLen = input.length;
            var rLen = replace.length;
            for (var i = 0; i < sLen; i++) {
                if (input.charAt(i) == replace.charAt(0)) {
                    found = true;
                    for (var j = 0; j < rLen; j++) {
                        if (!(input.charAt(i + j) == replace.charAt(j))) {
                            found = false;
                            break;
                        }
                    }
                    if (found) {
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
        };
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
        StringUtils.formatString = function (format) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            format = gameabc.StringUtils.replace(format, "\\n", "\n");
            var len = args.length;
            for (var i = 0; i < len; i++) {
                format = gameabc.StringUtils.replace(format, "{" + i + "}", "" + args[i]);
            }
            return format;
        };
        StringUtils.formatHttpParams = function (param) {
            var http_par = [];
            for (var key in param) {
                if (param.hasOwnProperty(key)) {
                    var element = param[key];
                    http_par.push(key + "=" + element);
                }
            }
            return http_par.length > 0 ? http_par.join("&") : "";
        };
        StringUtils.trim = function (input) {
            return this.ltrim(this.rtrim(input));
        };
        StringUtils.ltrim = function (input) {
            var size = input.length;
            for (var i = 0; i < size; i++) {
                if (input.charCodeAt(i) > 32) {
                    return input.substring(i);
                }
            }
            return "";
        };
        StringUtils.rtrim = function (input) {
            if (input == null)
                return '';
            var size = input.length;
            for (var i = size; i > 0; i--) {
                if (input.charCodeAt(i - 1) > 32) {
                    return input.substring(0, i);
                }
            }
            return "";
        };
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
        StringUtils.padLeft = function (p_string, p_padChar, p_length) {
            var s = p_string;
            while (s.length < p_length) {
                s = p_padChar + s;
            }
            return s;
        };
        /**
         * Lua对像结构解析
         */
        StringUtils.parseLuaString = function (str) {
            var oldStr = str;
            var obj = {};
            var subKeys = [];
            var reg = /[^;]([a-zA-Z0-9]+=[\"\']([a-zA-Z0-9]+=[0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D=\"\';]+;[\"\']))/ig;
            var res;
            while (res = reg.exec(str)) {
                subKeys.push(res[0]);
                oldStr = oldStr.replace(res[0], "");
            }
            var addValue = function (o, kv_str) {
                kv_str = gameabc.StringUtils.trim(kv_str);
                var kv = kv_str.split("=");
                if (kv.length == 2) {
                    o[kv[0]] = kv[1];
                }
            };
            var splitValues = function (o, data_str) {
                data_str = gameabc.StringUtils.trim(data_str);
                data_str = data_str.replace(/[\"\']/gi, "");
                args = data_str.split(";");
                var n = args.length;
                while (n-- && n > -1) {
                    addValue(o, args[n]);
                }
            };
            var args = [];
            splitValues(obj, oldStr);
            var len = subKeys.length;
            while (len-- && len > -1) {
                var subk = subKeys[len];
                var vIndex = subk.indexOf("=");
                var sk = subk.substr(0, vIndex);
                var sv = subk.substr(vIndex + 1);
                obj[sk] = obj[sk] ? obj[sk] : {};
                splitValues(obj[sk], sv);
            }
            return obj;
        };
        return StringUtils;
    }());
    gameabc.StringUtils = StringUtils;
    __reflect(StringUtils.prototype, "gameabc.StringUtils");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=StringUtils.js.map