var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var charmWheel;
(function (charmWheel) {
    var CharmWheelItem = (function (_super) {
        __extends(CharmWheelItem, _super);
        function CharmWheelItem(label, image, id, rotation) {
            var _this = _super.call(this) || this;
            _this.skinName = "CharmWheelItemSkin";
            _this.once(eui.UIEvent.CREATION_COMPLETE, function () {
                _this.init(label, image, id, rotation);
            }, _this);
            return _this;
        }
        CharmWheelItem.prototype.init = function (label, image, id, rotation) {
            this.id = id;
            this.label.text = label;
            // this.label.textColor = AppConst.TextColors.lightPurple;
            this.image.source = image;
            if (id == 9) {
                this.image.scaleX = 0.9;
                this.image.scaleY = 0.9;
            }
            else if (id == 6 || id == 7 || id == 8) {
                this.image.scaleX = 0.5;
                this.image.scaleY = 0.5;
            }
            else if (id == 5) {
                this.image.scaleX = 0.6;
                this.image.scaleY = 0.6;
            }
            this.anchorOffsetX = 60;
            this.anchorOffsetY = 190;
            this.x = 190;
            this.y = 190;
            this.rotation = rotation * 36;
        };
        CharmWheelItem.prototype.showLight = function () {
            var _this = this;
            egret.Tween.get(this.label).to({ scaleX: 1.2, scaleY: 1.2 }).wait(1000).to({ scaleX: 1, scaleY: 1 });
            var sx = this.image.scaleX;
            var sy = this.image.scaleY;
            egret.Tween.get(this.image).to({ scaleX: sx * 1.2, scaleY: sy * 1.2 }).wait(1000).to({ scaleX: sx, scaleY: sy });
            this.light.visible = true;
            egret.setTimeout(function () {
                _this.light.visible = false;
            }, this, 1000, true);
        };
        CharmWheelItem.prototype.itemLight = function () {
            var _this = this;
            this.light.visible = true;
            egret.setTimeout(function () {
                _this.light.visible = false;
            }, this, 800, true);
        };
        return CharmWheelItem;
    }(eui.ItemRenderer));
    charmWheel.CharmWheelItem = CharmWheelItem;
    __reflect(CharmWheelItem.prototype, "charmWheel.CharmWheelItem");
})(charmWheel || (charmWheel = {}));
//# sourceMappingURL=CharmWheelItem.js.map