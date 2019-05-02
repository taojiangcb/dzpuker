var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by taojiang on 16/3/10.
 */
var uicomps;
(function (uicomps) {
    var AvatarImage = (function (_super) {
        __extends(AvatarImage, _super);
        function AvatarImage() {
            var _this = _super.call(this) || this;
            _this.$sFlag = false;
            _this.chrooseBool = true;
            _this.width = _this.height = 88;
            return _this;
        }
        AvatarImage.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //            this.borderImg = new eui.Image();
            //            this.borderImg.source = "s9_bg_item_normal1_png";
            //            this.addChild(this.borderImg);
            //            this.borderImg.width = this.width;
            //            this.borderImg.height = this.height;
            this.img = new eui.Image();
            this.img.left = 4;
            this.img.right = 4;
            this.img.bottom = 4;
            this.img.top = 4;
            this.img.source = "img_Default_Avatar_1_png";
            this.addChild(this.img);
            this.chrooseImg = new eui.Image();
            this.chrooseImg.left = 4;
            this.chrooseImg.right = 4;
            this.chrooseImg.bottom = 4;
            this.chrooseImg.top = 4;
            this.chrooseImg.source = "s9_bg_head_1_png";
            this.chrooseImg.visible = this.chrooseBool;
            this.chrooseImg.scale9Grid = new egret.Rectangle(4, 4, 2, 2);
            this.addChild(this.chrooseImg);
        };
        AvatarImage.prototype.chroose = function (val) {
            if (this.chrooseBool == val)
                return;
            if (this.chrooseBool) {
                this.chrooseImg.source = "s9_bg_head_2_png";
            }
            else {
                this.chrooseImg.source = "s9_bg_head_1_png";
            }
            this.chrooseImg.visible = val;
            this.chrooseBool = val;
            this.invalidateProperties();
        };
        Object.defineProperty(AvatarImage.prototype, "source", {
            get: function () {
                return this.$source;
            },
            set: function (val) {
                if (val == this.$source)
                    return;
                this.$source = val;
                if (this.img) {
                    this.img.source = val;
                }
                else {
                    this.$sFlag = true;
                    this.invalidateProperties();
                }
            },
            enumerable: true,
            configurable: true
        });
        return AvatarImage;
    }(gameabc.UICustomComponent));
    uicomps.AvatarImage = AvatarImage;
    __reflect(AvatarImage.prototype, "uicomps.AvatarImage");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=AvatarImage.js.map