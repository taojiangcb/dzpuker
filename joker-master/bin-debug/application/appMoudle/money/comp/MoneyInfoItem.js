var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var money;
(function (money) {
    /**
     *
     * @author
     *
     */
    var MoneyInfoItem = (function (_super) {
        __extends(MoneyInfoItem, _super);
        function MoneyInfoItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "MoneyInfoItemSkin";
            _this.percentWidth = 100;
            return _this;
        }
        MoneyInfoItem.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.addButton(this.okBtn);
        };
        MoneyInfoItem.prototype.dataChanged = function () {
            if (this.itemIndex % 2 == 0) {
            }
            else {
            }
            //{icon:"icon_money_type_1_png",tips:"img_word_money_type_1_png",btnIcon:"img_word_money_qwqz_png",numTxt:0,clikcDat:AppReg.APP_BANK}
            if (this.data) {
                var info = this.data;
                this.icon.source = info.icon;
                this.tips.source = info.tips;
                if (info.btnIcon) {
                    this.okBtn.visible = true;
                    this.btnIcon.source = info.btnIcon;
                }
                else {
                    this.okBtn.visible = false;
                }
                if (info.numTxt) {
                    this.numTxt.visible = true;
                    this.numTxt.text = info.numTxt.toString();
                }
                else {
                    this.numTxt.visible = false;
                }
            }
        };
        MoneyInfoItem.prototype.click = function (tag) {
            if (tag == this.okBtn) {
                if (this.data && this.data.clickDat) {
                    if (this.data.clickDat == AppReg.SNG) {
                        user.getProxy().openSNG();
                    }
                    else {
                        __OPEN_PRE_MOUDLE(this.data.clickDat);
                    }
                }
                else if (this.data.sort == 3) {
                    //进金币房
                    room.getProxy().goldRoom();
                }
                __CLOSE_MOUDLE(AppReg.APP_MONEY);
            }
        };
        return MoneyInfoItem;
    }(uicomps.BaseItemCilckRenderer));
    money.MoneyInfoItem = MoneyInfoItem;
    __reflect(MoneyInfoItem.prototype, "money.MoneyInfoItem");
})(money || (money = {}));
//# sourceMappingURL=MoneyInfoItem.js.map