var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JT on 2015/12/26.
 */
var loadPools;
(function (loadPools) {
    var PoolsImage = (function (_super) {
        __extends(PoolsImage, _super);
        function PoolsImage(poolsId, source) {
            if (poolsId === void 0) { poolsId = 0; }
            var _this = _super.call(this, source) || this;
            /*
             * 对像池id
             */
            _this.poolsId = 0;
            _this.poolsId = poolsId;
            _this.addEventListener(egret.Event.COMPLETE, _this.loadComplete, _this);
            return _this;
        }
        PoolsImage.prototype.loadComplete = function (event) {
            if (this.poolsId > 0) {
                if (typeof this.source == "string") {
                    if (!RES.hasRes(this.source)) {
                        loadPools.addToPool(this.poolsId, this.source);
                    }
                }
            }
        };
        return PoolsImage;
    }(eui.Image));
    loadPools.PoolsImage = PoolsImage;
    __reflect(PoolsImage.prototype, "loadPools.PoolsImage");
})(loadPools || (loadPools = {}));
//# sourceMappingURL=PoolsImage.js.map