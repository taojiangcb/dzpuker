var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameabc;
(function (gameabc) {
    //工具转的as3的类
    var ArrayUtils = (function (_super) {
        __extends(ArrayUtils, _super);
        function ArrayUtils() {
            return _super.call(this) || this;
        }
        ArrayUtils.compbineToArray = function (ary1, ary2) {
            var ary = ary1 ? ary1.concat() : [];
            var i = 0;
            var len = ary2 ? ary2.length : 0;
            for (i = 0; i != len; i++) {
                ary.push(ary2[i]);
            }
            return ary;
        };
        ArrayUtils.compBineTo_1_Vector = function (ary1, ary2) {
            if (ary1 == null)
                return ary2;
            var i = 0;
            var len = ary2 ? ary2["length"] : 0;
            for (i = 0; i != len; i++) {
                ary1["push"](ary2[i]);
            }
            return ary1;
        };
        /**
         * 获取两个数组中相同的值，并且返回他们
         */
        ArrayUtils.getSameCellWithTwoArray = function (ary1, ary2) {
            var arr = [];
            var len = ary1.length;
            var len2 = ary2.length;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < len2; j++) {
                    if (ary1[i] === ary2[j]) {
                        arr.push(ary1[i]);
                        continue;
                    }
                }
            }
            return arr;
        };
        ArrayUtils.mergerArray = function (ary1, ary2) {
            if (ary1 == null)
                return ary2;
            var i = 0;
            var len = ary2 ? ary2.length : 0;
            for (i = 0; i != len; i++) {
                ary1.push(ary2[i]);
            }
            return ary1;
        };
        ArrayUtils.convertToVectory = function (old, to) {
            if (old == null)
                return;
            var i = 0;
            var len = old.length;
            for (i = 0; i != len; i++) {
                to.push(old[i]);
            }
        };
        ArrayUtils.convertToArray = function (old, to) {
            if (old == null)
                return;
            var i = 0;
            var len = old.length;
            for (i = 0; i != len; i++) {
                to.push(old[i]);
            }
        };
        ArrayUtils.randomArr = function (arr) {
            var outputArr = arr.slice();
            var i = outputArr.length;
            var temp;
            var indexA = 0;
            var indexB = 0;
            while (i) {
                indexA = i - 1;
                indexB = Math.floor(Math.random() * i);
                i--;
                if (indexA == indexB)
                    continue;
                temp = outputArr[indexA];
                outputArr[indexA] = outputArr[indexB];
                outputArr[indexB] = temp;
            }
            return outputArr;
        };
        ArrayUtils.getItemByFilterPropNameAndValue = function (data, propName, value) {
            if (!data || !propName || !value)
                return null;
            var len = (data, Array).length;
            for (var i = 0; i < len; i++) {
                var obj = data[i];
                if (obj && obj[propName]) {
                    if (obj[propName], null, "Int64") {
                        if (obj[propName].toNumber() == value) {
                            return obj;
                        }
                    }
                    else {
                        if (obj[propName] == value) {
                            return obj;
                        }
                    }
                }
            }
            return null;
        };
        return ArrayUtils;
    }(egret.HashObject));
    gameabc.ArrayUtils = ArrayUtils;
    __reflect(ArrayUtils.prototype, "gameabc.ArrayUtils");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=ArrayUtils.js.map