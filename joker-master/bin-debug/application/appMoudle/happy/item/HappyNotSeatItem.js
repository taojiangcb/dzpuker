var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    /**
     *
     * @author
     *
     */
    var HappyNotSeatItem = (function (_super) {
        __extends(HappyNotSeatItem, _super);
        function HappyNotSeatItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyNotSeatItemSkin";
            return _this;
        }
        HappyNotSeatItem.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
        };
        HappyNotSeatItem.prototype.dataChanged = function () {
            this.item1.visible = false;
            this.item2.visible = false;
            this.item3.visible = false;
            if (this.data) {
                if (this.data[0])
                    this.showNotSeatEvent(this.item1, this.data[0]);
                if (this.data[1])
                    this.showNotSeatEvent(this.item2, this.data[1]);
                if (this.data[2])
                    this.showNotSeatEvent(this.item3, this.data[2]);
            }
        };
        HappyNotSeatItem.prototype.showNotSeatEvent = function (ui, info) {
            ui.visible = true;
            ui["namelab"].text = info.name;
            ui["numlab"].text = FormatUtils.wan4(info.totalBet) + "";
            ui["avatar"].source = user.getProxy().getHeadStr(Number(info.avatarID));
        };
        return HappyNotSeatItem;
    }(uicomps.BaseItemCilckRenderer));
    happy.HappyNotSeatItem = HappyNotSeatItem;
    __reflect(HappyNotSeatItem.prototype, "happy.HappyNotSeatItem");
})(happy || (happy = {}));
//# sourceMappingURL=HappyNotSeatItem.js.map