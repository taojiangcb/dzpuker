var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var uicomps;
(function (uicomps) {
    /**
     *
     * @author
     *
     */
    var ButtonGroup = (function () {
        function ButtonGroup() {
        }
        ButtonGroup.prototype.add = function (button) {
            if (this.list == null) {
                this.list = new Array();
            }
            this.list.push(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        };
        ButtonGroup.prototype.onclick = function (evt) {
            this.select(evt.target);
            if (this.itemClick != null)
                this.itemClick.apply(this.itemThisObj, [evt]);
        };
        ButtonGroup.prototype.select = function (button) {
            if (this.selectedButton != null) {
                this.selectedButton.selected = false;
            }
            this.selectedButton = button;
            this.selectedButton.selected = true;
        };
        ButtonGroup.prototype.selectIndex = function (index) {
            var btn = this.list[index];
            if (btn != null)
                this.select(btn);
        };
        ButtonGroup.prototype.getSelectIndex = function () {
            return this.list.indexOf(this.selectedButton);
        };
        ButtonGroup.prototype.dispose = function () {
            if (this.list != null) {
                for (var i = 0; i < this.list.length; ++i) {
                    this.selectedButton = this.list[i];
                    this.selectedButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
                }
            }
            if (this.selectedButton != null) {
                this.selectedButton = null;
            }
        };
        return ButtonGroup;
    }());
    uicomps.ButtonGroup = ButtonGroup;
    __reflect(ButtonGroup.prototype, "uicomps.ButtonGroup");
})(uicomps || (uicomps = {}));
//# sourceMappingURL=ButtonGroup.js.map