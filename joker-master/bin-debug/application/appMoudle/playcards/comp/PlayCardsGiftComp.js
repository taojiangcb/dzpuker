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
     *表情聊天
     * @author
     *
     */
    var PlayCardsGiftComp = (function (_super) {
        __extends(PlayCardsGiftComp, _super);
        function PlayCardsGiftComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayCardsGiftSkin";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
        }
        PlayCardsGiftComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.bgimage);
            this.facelist.itemRenderer = playcards.PlayCardsGiftItem;
            if (RES.getRes("gift_json") != null) {
                this.facelist.dataProvider = new eui.ArrayCollection(playcards.getProxy().giftlistdata.concat());
            }
            else {
                RES.loadGroup("playgift");
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            }
            this.facelist.addEventListener(egret.Event.CHANGE, this.itemFaceclick, this);
            this.show();
        };
        PlayCardsGiftComp.prototype.onResourceLoadComplete = function (event) {
            if (event.groupName == "playgift") {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                this.facelist.dataProvider = new eui.ArrayCollection(playcards.getProxy().giftlistdata.concat());
            }
        };
        PlayCardsGiftComp.prototype.touchBindButtonHandler = function (clickTarget) {
            if (this.bgimage == clickTarget) {
                this.close();
            }
        };
        PlayCardsGiftComp.prototype.itemFaceclick = function () {
            __PVO().i(user.getProxy().svrNumId, this.facelist.selectedItem.char).to(app.NetAction.MATCH_SEND_GIFT);
            // this.close();
            this.facelist.selectedIndex = -1;
        };
        PlayCardsGiftComp.prototype.show = function () {
            if (this.initialized) {
                if (!this.visible)
                    this.tweenShow();
                else {
                    this.alpha = 0;
                    egret.Tween.get(this).to({ alpha: 1 }, 300);
                }
            }
        };
        return PlayCardsGiftComp;
    }(playcards.PlaycardsUIComp));
    playcards.PlayCardsGiftComp = PlayCardsGiftComp;
    __reflect(PlayCardsGiftComp.prototype, "playcards.PlayCardsGiftComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsGiftComp.js.map