var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameabc;
(function (gameabc) {
    function getMessage(key) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        params.unshift(key);
        return gameabc.ResourceBundleUtil.getMessage.apply(null, params);
    }
    gameabc.getMessage = getMessage;
    function getError(key) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        params.unshift(key);
        return gameabc.ResourceBundleUtil.getError.apply(null, params);
    }
    gameabc.getError = getError;
    function getConfig(key) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        params.unshift(key);
        return gameabc.ResourceBundleUtil.getConfig.apply(null, params);
    }
    gameabc.getConfig = getConfig;
    /**
     *
     * @author
     *
     */
    var ResourceBundleUtil = (function () {
        function ResourceBundleUtil() {
        }
        ResourceBundleUtil.getMessage = function (key) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            // if(params.length==0) return ResourceBundleUtil._msg[key];  /n会返回//n
            return ResourceBundleUtil.replaceRN(ResourceBundleUtil._msg[key], params);
        };
        ResourceBundleUtil.getError = function (key) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (params.length == 0)
                return ResourceBundleUtil._error[key];
            return ResourceBundleUtil.replaceRN(ResourceBundleUtil._error[key], params);
        };
        ResourceBundleUtil.getConfig = function (key) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (params.length == 0)
                return ResourceBundleUtil._cfg[key];
            return ResourceBundleUtil.replaceRN(ResourceBundleUtil._cfg[key], params);
        };
        ResourceBundleUtil.replaceRN = function (str, params) {
            if (str) {
                str = gameabc.StringUtils.replace(str, "\\n", "\n");
                var len = params.length;
                for (var i = 0; i < len; i++) {
                    str = gameabc.StringUtils.replace(str, "{" + i + "}", "" + params[i]);
                }
                return str;
            }
            return "";
        };
        ResourceBundleUtil.setCfgSourceData = function (value) {
            if (ResourceBundleUtil._cfgInited)
                return;
            ResourceBundleUtil._cfg = ResourceBundleUtil.createSourceData(value);
            ResourceBundleUtil._cfgInited = true;
        };
        ResourceBundleUtil.setMsgSourceData = function (value) {
            if (ResourceBundleUtil._msgInited)
                return;
            ResourceBundleUtil._msg = ResourceBundleUtil.createSourceData(value);
            ResourceBundleUtil._msgInited = true;
        };
        ResourceBundleUtil.setErrorSourceData = function (value) {
            if (ResourceBundleUtil._errorInited)
                return;
            ResourceBundleUtil._error = ResourceBundleUtil.createSourceData(value);
            ResourceBundleUtil._errorInited = true;
        };
        ResourceBundleUtil.createSourceData = function (value) {
            var _dict = {};
            value = gameabc.StringUtils.replace(value, "\r\n", "\n");
            var splitMark = "\n";
            var arr = value.split(splitMark);
            var len = arr.length;
            var kv;
            for (var i = 0; i < len; i++) {
                if (!ResourceBundleUtil.isIgoneLine(arr[i])) {
                    kv = ResourceBundleUtil.getArrKeyAndValue(arr[i]);
                    _dict["" + kv[0]] = kv[1];
                }
            }
            return _dict;
        };
        ResourceBundleUtil.getClearHeadSpace = function (str) {
            // 第一个有效字符是#，此行为注释
            var len = str.length;
            for (var i = 0; i < len; i++) {
                if (str.charAt(i) == " ") {
                    continue;
                }
                else {
                    return str.substr(i);
                }
            }
            return str;
        };
        ResourceBundleUtil.getArrKeyAndValue = function (str) {
            var arr = str.split("=");
            arr[0] = gameabc.StringUtils.trim(arr[0]);
            var len = arr.length;
            var str2 = arr[1];
            for (var i = 2; i < len; i++) {
                str2 += ("=" + arr[i]);
            }
            arr[1] = gameabc.StringUtils.trim(str2);
            return arr;
        };
        ResourceBundleUtil.isIgoneLine = function (str) {
            // 第一个有效字符是#，此行为注释
            var len = str.length;
            for (var i = 0; i < len; i++) {
                if (str.charAt(i) != "#" && str.charAt(i) == " ") {
                    return false;
                }
                if (str.charAt(i) == "#") {
                    return true;
                }
                if (str.charAt(i) == " ") {
                    continue;
                }
            }
            return false;
        };
        return ResourceBundleUtil;
    }());
    ResourceBundleUtil._msg = {};
    ResourceBundleUtil._error = {};
    ResourceBundleUtil._cfg = {};
    ResourceBundleUtil._msgInited = false;
    ResourceBundleUtil._errorInited = false;
    ResourceBundleUtil._cfgInited = false;
    gameabc.ResourceBundleUtil = ResourceBundleUtil;
    __reflect(ResourceBundleUtil.prototype, "gameabc.ResourceBundleUtil");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=ResourceBundleUtil.js.map