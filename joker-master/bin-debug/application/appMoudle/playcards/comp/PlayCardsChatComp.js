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
    var PlayCardsChatComp = (function (_super) {
        __extends(PlayCardsChatComp, _super);
        function PlayCardsChatComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayCardsChatSkin";
            _this.percentHeight = 100;
            _this.percentWidth = 100;
            return _this;
        }
        PlayCardsChatComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.bgimage);
            this.facelist.itemRenderer = playcards.PlayCardsFaceItem;
            this.facelist.dataProvider = new eui.ArrayCollection(playcards.getProxy().facelistdata.concat());
            this.facelist.addEventListener(egret.Event.CHANGE, this.itemFaceclick, this);
            this.messlist.itemRenderer = playcards.PlayCardsMessItem;
            this.messlist.dataProvider = new eui.ArrayCollection(playcards.getProxy().messlistdata.concat());
            this.messlist.addEventListener(egret.Event.CHANGE, this.itemMessclick, this);
            this.btnface.addEventListener(egret.Event.CHANGE, this.tabclick, this);
            this.btnmess.addEventListener(egret.Event.CHANGE, this.tabclick, this);
            this.show();
        };
        PlayCardsChatComp.prototype.touchBindButtonHandler = function (clickTarget) {
            if (this.bgimage == clickTarget) {
                this.close();
            }
        };
        PlayCardsChatComp.prototype.itemFaceclick = function () {
            if (playcards.getProxy().mySeat > -1) {
                //                __PVO().s(this.facelist.selectedItem.label).i(getProxy().mySeat,-1).to(app.NetAction.MATCH_CHAT);
                playcards.getProxy().sendChat(this.facelist.selectedItem.label, playcards.getProxy().mySeat, -1, this.facelist.selectedItem.char);
                this.close();
            }
            this.facelist.selectedIndex = -1;
        };
        PlayCardsChatComp.prototype.tabclick = function (evt) {
            if (evt.target.selected)
                this.viewStack.selectedIndex = evt.target.value;
        };
        PlayCardsChatComp.prototype.itemMessclick = function () {
            if (playcards.getProxy().mySeat > -1) {
                //                 __PVO().s(this.messlist.selectedItem.label).i(getProxy().mySeat,-2).to(app.NetAction.MATCH_CHAT); 
                playcards.getProxy().sendChat(this.messlist.selectedItem.label, playcards.getProxy().mySeat, -2, this.messlist.selectedItem.char);
                this.close();
            }
            this.messlist.selectedIndex = -1;
        };
        PlayCardsChatComp.prototype.show = function () {
            if (this.initialized) {
                if (!this.visible)
                    this.tweenShow();
                else {
                    this.alpha = 0;
                    egret.Tween.get(this).to({ alpha: 1 }, 300);
                }
            }
        };
        return PlayCardsChatComp;
    }(playcards.PlaycardsUIComp));
    playcards.PlayCardsChatComp = PlayCardsChatComp;
    __reflect(PlayCardsChatComp.prototype, "playcards.PlayCardsChatComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsChatComp.js.map