var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guichu;
(function (guichu) {
    var GuiChuSetComp = (function (_super) {
        __extends(GuiChuSetComp, _super);
        function GuiChuSetComp() {
            var _this = _super.call(this) || this;
            _this.right = 0;
            _this.left = 0;
            _this.top = 0;
            _this.bottom = 0;
            _this.skinName = "GuiChuSetCompSkin";
            return _this;
        }
        GuiChuSetComp.prototype.createComplete = function () {
            this.bindButton(this.backImage, false);
            this.yyButton.selected = setting.getProxy().getSettType(1) == 0 ? true : false;
            this.yxButton.selected = setting.getProxy().getSettType(3) == 0 ? true : false;
            this.yyButton.addEventListener(eui.UIEvent.CHANGE, this.onButtonChange, this);
            this.yxButton.addEventListener(eui.UIEvent.CHANGE, this.onButtonChange, this);
            this.viewGroup.x = 24;
            this.viewGroup.top = 50;
            this.viewGroup.mask = new egret.Rectangle(0, 0, this.viewGroup.width, this.viewGroup.height);
            this.tagGroupMove();
        };
        GuiChuSetComp.prototype.tagGroupMove = function () {
            this.tagGroup.x = 0;
            this.tagGroup.y = -this.tagGroup.height;
            egret.Tween.get(this.tagGroup).to({ y: 0 }, 300, egret.Ease.sineIn);
        };
        GuiChuSetComp.prototype.onButtonChange = function (evt) {
            var target = evt.target;
            switch (target) {
                case this.yyButton:
                    setting.getProxy().setType(this.yyButton.selected ? 0 : 1, 1);
                    break;
                case this.yxButton:
                    setting.getProxy().setType(this.yxButton.selected ? 0 : 1, 3);
                    break;
                default:
                    break;
            }
        };
        GuiChuSetComp.prototype.touchBindButtonHandler = function (clickTarget) {
            this.removeFromParent();
            switch (clickTarget) {
                case this.backImage:
                    break;
                default:
                    break;
            }
        };
        return GuiChuSetComp;
    }(gameabc.UICustomComponent));
    guichu.GuiChuSetComp = GuiChuSetComp;
    __reflect(GuiChuSetComp.prototype, "guichu.GuiChuSetComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuSetComp.js.map