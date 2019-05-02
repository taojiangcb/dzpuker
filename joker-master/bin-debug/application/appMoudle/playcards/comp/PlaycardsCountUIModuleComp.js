var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    /**
     * 实时战况
     * @author
     *
     */
    var PlaycardsCountUIModuleComp = (function (_super) {
        __extends(PlaycardsCountUIModuleComp, _super);
        function PlaycardsCountUIModuleComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlaycardsCountUISkin";
            return _this;
        }
        PlaycardsCountUIModuleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btnClose);
            this.list.dataProvider = new eui.ArrayCollection(this.uiOpenData);
            this.list.itemRenderer = playcards.PlaycardsCountItemRenderer;
            this.mess.visible = this.list.dataProvider.length == 0;
        };
        PlaycardsCountUIModuleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            this.close();
        };
        return PlaycardsCountUIModuleComp;
    }(app.base.BaseWndUIMoudleComponent));
    playcards.PlaycardsCountUIModuleComp = PlaycardsCountUIModuleComp;
    __reflect(PlaycardsCountUIModuleComp.prototype, "playcards.PlaycardsCountUIModuleComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlaycardsCountUIModuleComp.js.map