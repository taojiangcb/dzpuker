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
    var GuiChuRuleModule = (function (_super) {
        __extends(GuiChuRuleModule, _super);
        function GuiChuRuleModule() {
            var _this = _super.call(this) || this;
            _this.verticalCenter = -20;
            _this.horizontalCenter = 0;
            _this.skinName = "GuiChuRuleModuleSkin";
            return _this;
        }
        GuiChuRuleModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.rule1.text = guichu.GuiChuModuleProxy.RULE_1;
            this.rule2.text = guichu.GuiChuModuleProxy.RULE_2;
            this.bindButton(this.button1);
            this.bindButton(this.button2);
        };
        GuiChuRuleModule.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.button1:
                case this.button2:
                    __CLOSE_MOUDLE(AppReg.GUICHU_RULE);
                    break;
            }
        };
        return GuiChuRuleModule;
    }(app.base.BaseSceneUIMoudleComponent));
    guichu.GuiChuRuleModule = GuiChuRuleModule;
    __reflect(GuiChuRuleModule.prototype, "guichu.GuiChuRuleModule");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuRuleModule.js.map