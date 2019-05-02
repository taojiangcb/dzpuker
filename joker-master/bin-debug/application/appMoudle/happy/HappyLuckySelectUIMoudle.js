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
    var HappyLuckySelectUIMoudle = (function (_super) {
        __extends(HappyLuckySelectUIMoudle, _super);
        function HappyLuckySelectUIMoudle() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyLuckySelectSkin";
            return _this;
        }
        HappyLuckySelectUIMoudle.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.card0, false);
            this.bindButton(this.card1, false);
            this.bindButton(this.card2, false);
            this.bindButton(this.card3, false);
            this.bindButton(this.card4, false);
            this.bindButton(this.card5, false);
            this.bindButton(this.card6, false);
            this.bindButton(this.card7, false);
            this.bindButton(this.card8, false);
            this.bindButton(this.card9, false);
            this.bindButton(this.card10, false);
            this.bindButton(this.card11, false);
            this.bindButton(this.btnClose, false);
            this.bindButton(this.radombtn, false);
            this.bindButton(this.submitbtn, false);
            var nowcard = happy.getProxy().nowLuckyCard;
            var cardindex = 0;
            for (var i = 1; i < 14; i++) {
                if (nowcard != i && cardindex < 12) {
                    this["card" + cardindex].setCardId(i);
                    cardindex++;
                }
            }
            this.selectimg.visible = false;
        };
        HappyLuckySelectUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnClose:
                    this.close();
                    break;
                case this.radombtn:
                    __PVO().i(0).to(app.NetAction.GLXY_REQ_LUCKY_CARD);
                    this.sendNotification(app.NetAction.GLXY_REQ_LUCKY_CARD);
                    mc2sdk.event(50068 /* HAPPY_LUCKY_RADOM */);
                    this.close();
                    break;
                case this.submitbtn:
                    if (this.selectCard) {
                        __PVO().i(this.selectCard.cardid + 1).to(app.NetAction.GLXY_REQ_LUCKY_CARD);
                        mc2sdk.event(50069 /* HAPPY_LUCKY_SUBMIT */, this.selectCard.cardid);
                        this.sendNotification(app.NetAction.GLXY_REQ_LUCKY_CARD);
                        this.close();
                    }
                    else
                        tip.popSysCenterTip("请先选择一张替换的牌", tip.TIPS_TYPE.TIPS_WARNING);
                    break;
                default:
                    if (clickTarget instanceof happy.LuckyCardItem) {
                        if (this.selectCard)
                            this.selectCard.hideLight();
                        this.selectCard = clickTarget;
                        this.selectimg.visible = true;
                        this.selectCard.showLight();
                        this.selectimg.x = this.selectCard.x;
                        this.selectimg.y = this.selectCard.y;
                    }
                    break;
            }
        };
        return HappyLuckySelectUIMoudle;
    }(app.base.BaseWndUIMoudleComponent));
    happy.HappyLuckySelectUIMoudle = HappyLuckySelectUIMoudle;
    __reflect(HappyLuckySelectUIMoudle.prototype, "happy.HappyLuckySelectUIMoudle");
})(happy || (happy = {}));
//# sourceMappingURL=HappyLuckySelectUIMoudle.js.map