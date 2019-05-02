var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gameabc;
(function (gameabc) {
    /**
     *
     * @author
     *
     */
    var PointUtils = (function () {
        function PointUtils() {
        }
        /**
         * 获取两点的弧度
         * @param pt1
         * @param pt2
         */
        PointUtils.calcRadian = function (pt1, pt2) {
            return Math.atan2(pt2.y - pt1.y, pt2.x - pt1.x);
        };
        /**
         * 根据一个弧度和一个半径来获取个一个节点的向量
         * @param radian
         * @param radius
         * @return
         */
        PointUtils.calcVector = function (radian, radius, resPoint) {
            if (resPoint === void 0) { resPoint = null; }
            var vectorPoint = resPoint ? resPoint : new egret.Point();
            vectorPoint.x = Math.cos(radian) * radius;
            vectorPoint.y = Math.sin(radian) * radius;
            return vectorPoint;
        };
        return PointUtils;
    }());
    gameabc.PointUtils = PointUtils;
    __reflect(PointUtils.prototype, "gameabc.PointUtils");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=PointUtils.js.map