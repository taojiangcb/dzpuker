var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main;
(function (main) {
    /**
     * @author
     */
    var HeadAvatarImage = (function (_super) {
        __extends(HeadAvatarImage, _super);
        function HeadAvatarImage() {
            var _this = _super.call(this) || this;
            _this.width = _this.height = 110;
            return _this;
        }
        return HeadAvatarImage;
    }(uicomps.AvatarImage));
    main.HeadAvatarImage = HeadAvatarImage;
    __reflect(HeadAvatarImage.prototype, "main.HeadAvatarImage");
})(main || (main = {}));
//# sourceMappingURL=HeadAvatarImage.js.map