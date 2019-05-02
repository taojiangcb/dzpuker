var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var feed;
(function (feed) {
    /**
     *
     * @author
     *
     */
    var FeedInfoItem = (function (_super) {
        __extends(FeedInfoItem, _super);
        function FeedInfoItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "FeedInfoItemSkin";
            return _this;
        }
        FeedInfoItem.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.btnCheck.addEventListener(egret.Event.CHANGE, this.checkBoxChangeHandler, this);
        };
        FeedInfoItem.prototype.checkBoxChangeHandler = function (evt) {
            this.data.choice = this.btnCheck.selected ? 1 : 0, this.data.index;
        };
        FeedInfoItem.prototype.dataChanged = function () {
            if (this.data) {
                this.info = this.data.info;
                this.label1.text = this.info.name;
                this.btnCheck.selected = this.data.choice == 0 ? false : true;
                this.avatar.source = user.getProxy().getHeadStr(Number(this.info.avatarID));
            }
        };
        FeedInfoItem.prototype.click = function (tag) {
            // __PVO().to(app.NetAction.);
        };
        return FeedInfoItem;
    }(uicomps.BaseItemCilckRenderer));
    feed.FeedInfoItem = FeedInfoItem;
    __reflect(FeedInfoItem.prototype, "feed.FeedInfoItem");
})(feed || (feed = {}));
//# sourceMappingURL=FeedInfoItem.js.map