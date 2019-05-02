var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var head;
(function (head) {
    /**
     *
     * @author
     *
     */
    var HeadListItem = (function (_super) {
        __extends(HeadListItem, _super);
        function HeadListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "HeadRepItemSkin";
            return _this;
        }
        HeadListItem.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            // this.addButton(this,false);
            // this.touchChildren = false;
        };
        HeadListItem.prototype.dataChanged = function () {
            if (this.data && this.data != NaN) {
                this.headIcon.source = "img_Default_Avatar_" + this.data + "_png";
            }
            else {
                this.headIcon.source = "img_Default_Avatar_png";
            }
            this.selectedChange();
        };
        HeadListItem.prototype.selectedChange = function () {
            if (this.selected) {
                this.icon1.source = "s9_bg_head_2_png";
            }
            else {
                this.icon1.source = "s9_bg_head_1_png";
            }
        };
        return HeadListItem;
    }(uicomps.BaseItemCilckRenderer));
    head.HeadListItem = HeadListItem;
    __reflect(HeadListItem.prototype, "head.HeadListItem");
})(head || (head = {}));
//# sourceMappingURL=HeadListItem.js.map