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
    var GuiChuRecordComp = (function (_super) {
        __extends(GuiChuRecordComp, _super);
        function GuiChuRecordComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "GuiChuRecordCompSkin";
            return _this;
        }
        GuiChuRecordComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.rLabels = [this.rLabel0, this.rLabel1, this.rLabel2, this.rLabel3, this.rLabel4, this.rLabel5, this.rLabel6];
        };
        GuiChuRecordComp.prototype.initTRecord = function (record) {
            this.tGroup.removeChildren();
            for (var i = 0; i < record.length; i++) {
                var image = new eui.Image("guichu_icon_hs_s_" + (record[i]) + "_png");
                image.scaleX = image.scaleY = 0.58;
                this.tGroup.addChild(image);
            }
        };
        GuiChuRecordComp.prototype.updateHRecord = function (record) {
            for (var i = 0; i < this.rLabels.length; i++) {
                this.rLabels[i].text = "x" + record[i];
            }
        };
        return GuiChuRecordComp;
    }(gameabc.UICustomComponent));
    guichu.GuiChuRecordComp = GuiChuRecordComp;
    __reflect(GuiChuRecordComp.prototype, "guichu.GuiChuRecordComp");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuiChuRecordComp.js.map