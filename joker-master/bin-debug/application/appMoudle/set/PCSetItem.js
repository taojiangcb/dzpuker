var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var setting;
(function (setting) {
    /**
     *
     * @author
     *
     */
    var PCSetItem = (function (_super) {
        __extends(PCSetItem, _super);
        function PCSetItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "PCSetItemSkin";
            return _this;
        }
        PCSetItem.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.labelText.visible = false;
            this.btnCheck.addEventListener(egret.Event.CHANGE, this.checkBoxChangeHandler, this);
        };
        PCSetItem.prototype.checkBoxChangeHandler = function (evt) {
            setting.getProxy().setType(this.btnCheck.selected ? 1 : 0, this.data.index);
        };
        PCSetItem.prototype.dataChanged = function () {
            this.btnCheck.visible = true;
            if (this.data.index == "1"
                || this.data.index == "3"
                || (this.data.index == "2"
                    && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE
                    && egret.Capabilities.os == "Android")) {
                this.btnCheck.enabled = true;
                this.alpha = 1;
                this.labelText.visible = false;
            }
            else {
                this.btnCheck.enabled = false;
                this.alpha = 0.3;
            }
            if (this.data.index == "5") {
                this.btnCheck.visible = false;
                this.labelText.visible = true;
                this.labelText.text = AppConst.VERSION_STR;
                this.visible = true;
            }
            this.label2.text = String(this.data.label);
            this.btnCheck.selected = setting.getProxy().getSettType(this.data.index) == 0 ? false : true;
        };
        PCSetItem.prototype.click = function (tag) {
            // __PVO().to(app.NetAction.);
        };
        return PCSetItem;
    }(uicomps.BaseItemCilckRenderer));
    setting.PCSetItem = PCSetItem;
    __reflect(PCSetItem.prototype, "setting.PCSetItem");
})(setting || (setting = {}));
//# sourceMappingURL=PCSetItem.js.map