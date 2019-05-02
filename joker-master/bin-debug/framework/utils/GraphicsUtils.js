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
    var GraphicsUtils = (function (_super) {
        __extends(GraphicsUtils, _super);
        function GraphicsUtils() {
            return _super.apply(this, arguments) || this;
        }
        /**
         * ��������
         *
         * @param graphics <b> Graphics</b>
         * @param beginPoint <b> Point </b>
         * @param endPoint <b> Point </b>
         * @param width  <b> Number </b> �����ߵĿ���
         * @param grap  <b> Number </b>
         */
        GraphicsUtils.drawZebraStripes = function (graphics, beginPoint, endPoint, width, grap) {
            if (!graphics || !beginPoint || !endPoint || width <= 0 || grap <= 0)
                return;
            var Ox = beginPoint.x;
            var Oy = beginPoint.y;
            var totalLen = egret.Point.distance(beginPoint, endPoint);
            var currLen = 0;
            var halfWidth = width * .5;
            var radian = Math.atan2(endPoint.y - Oy, endPoint.x - Ox);
            var radian1 = (radian / Math.PI * 180 + 90) / 180 * Math.PI;
            var radian2 = (radian / Math.PI * 180 - 90) / 180 * Math.PI;
            var currX = 0, currY = 0;
            var p1x = 0, p1y = 0;
            var p2x = 0, p2y = 0;
            while (currLen <= totalLen) {
                currX = Ox + Math.cos(radian) * currLen;
                currY = Oy + Math.sin(radian) * currLen;
                p1x = currX + Math.cos(radian1) * halfWidth;
                p1y = currY + Math.sin(radian1) * halfWidth;
                p2x = currX + Math.cos(radian2) * halfWidth;
                p2y = currY + Math.sin(radian2) * halfWidth;
                graphics.moveTo(p1x, p1y);
                graphics.lineTo(p2x, p2y);
                currLen += grap;
            }
        };
        /**
         * ������
         *
         * @param graphics <b> Graphics</b>
         * @param beginPoint <b> Point </b>
         * @param endPoint <b> Point </b>
         * @param width  <b> Number </b> ���ߵĳ���
         * @param grap  <b> Number </b>
         */
        GraphicsUtils.drawDashed = function (graphics, beginPoint, endPoint, width, grap) {
            if (!graphics || !beginPoint || !endPoint || width <= 0 || grap <= 0)
                return;
            var Ox = beginPoint.x;
            var Oy = beginPoint.y;
            var radian = Math.atan2(endPoint.y - Oy, endPoint.x - Ox);
            var totalLen = egret.Point.distance(beginPoint, endPoint);
            var currLen = 0;
            var x = 0, y = 0;
            while (currLen <= totalLen) {
                x = Ox + Math.cos(radian) * currLen;
                y = Oy + Math.sin(radian) * currLen;
                graphics.moveTo(x, y);
                currLen += width;
                if (currLen > totalLen)
                    currLen = totalLen;
                x = Ox + Math.cos(radian) * currLen;
                y = Oy + Math.sin(radian) * currLen;
                graphics.lineTo(x, y);
                currLen += grap;
            }
        };
        return GraphicsUtils;
    }(egret.HashObject));
    gameabc.GraphicsUtils = GraphicsUtils;
    __reflect(GraphicsUtils.prototype, "gameabc.GraphicsUtils");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=GraphicsUtils.js.map