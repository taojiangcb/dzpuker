/**
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var item;
(function (item) {
    var PropVO = (function () {
        function PropVO() {
            this.num = 0; //拥有的数量
            this.timeEnd = 0; //过期时间
            this.svrId = 0;
        }
        return PropVO;
    }());
    item.PropVO = PropVO;
    __reflect(PropVO.prototype, "item.PropVO");
})(item || (item = {}));
//# sourceMappingURL=PropVO.js.map