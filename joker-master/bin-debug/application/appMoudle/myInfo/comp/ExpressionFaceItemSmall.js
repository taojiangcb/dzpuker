var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var myInfo;
(function (myInfo) {
    /**
     *
     * @author
     *
     */
    var ExpressionFaceItemSmall = (function (_super) {
        __extends(ExpressionFaceItemSmall, _super);
        function ExpressionFaceItemSmall() {
            var _this = _super.call(this) || this;
            _this.width = _this.height = 90;
            return _this;
        }
        ExpressionFaceItemSmall.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data && this.mc) {
                // this.mc.x = 40;
                // this.mc.y = 40;
                this.mc.scaleX = this.mc.scaleY = 1;
            }
        };
        return ExpressionFaceItemSmall;
    }(playcards.PlayCardsFaceItem));
    myInfo.ExpressionFaceItemSmall = ExpressionFaceItemSmall;
    __reflect(ExpressionFaceItemSmall.prototype, "myInfo.ExpressionFaceItemSmall");
})(myInfo || (myInfo = {}));
//# sourceMappingURL=ExpressionFaceItemSmall.js.map