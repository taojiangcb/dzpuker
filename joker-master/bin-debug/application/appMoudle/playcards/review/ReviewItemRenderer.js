var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/21.
 */
var playcards;
(function (playcards) {
    var ReviewItemRenderer = (function (_super) {
        __extends(ReviewItemRenderer, _super);
        function ReviewItemRenderer() {
            var _this = _super.call(this) || this;
            _this.skinName = "ReviewItemRendererSkin";
            return _this;
        }
        ReviewItemRenderer.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.allCard = [this.imgChard1, this.imgChard2, this.imgChard3, this.imgChard4, this.imgChard5, this.imgChard6, this.imgChard7];
        };
        ReviewItemRenderer.prototype.dataChanged = function () {
            var vo = this.data;
            if (vo.roleId == user.getPlayerInfo().roleId) {
                this.bgimg.source = "s9_bg_play_fangxingxinxi_png";
                this.ismyimg.visible = true;
            }
            else {
                this.bgimg.source = "s9_bg_fangxinditu_png";
                this.ismyimg.visible = false;
            }
            this.imgAvatar.source = user.getProxy().getHeadStr(Number(vo.avatarID));
            this.txtRoleName.text = vo.name;
            this.txtNumber.text = FormatUtils.wan(vo.bet);
            if (vo.safeAdd != null && vo.safeAdd != 0) {
                this.groupsafe.visible = true;
                this.txtSafe.text = FormatUtils.wan(-vo.safeAdd);
                if (vo.safeAdd < 0)
                    this.txtSafe.text = "+" + this.txtSafe.text;
            }
            else {
                this.groupsafe.visible = false;
            }
            if (vo.bet > 0)
                this.txtNumber.text = "+" + this.txtNumber.text;
            this.imgCardType.source = "";
            if (vo.myCard.length > 1) {
                var allcard = vo.myCard.concat(vo.globalCards);
                var rest = playcards.getProxy().getCardResult(allcard);
                if (vo.bet > 0)
                    this.imgCardType.source = ("img_word_poker_win_" + (rest.type + 1) + "_png");
                else
                    this.imgCardType.source = ("img_word_poker_type_" + (rest.type + 1) + "_png");
            }
            else {
                allcard = [0, 0].concat(vo.globalCards);
                if (vo.bet > 0)
                    this.imgCardType.source = "img_word_play_yingjia_png";
            }
            if (vo.isFold)
                this.imgCardType.source = "img_word_play_qipai2_png";
            var card;
            var imgcard;
            for (var i = 0; i < 7; i++) {
                card = 0;
                if (allcard.length > i)
                    card = allcard[i];
                imgcard = this.allCard[i];
                //  if (card > -1) {
                imgcard.setCardId(card); // getProxy().getCardName(card);
                imgcard.setResult(rest);
            }
        };
        return ReviewItemRenderer;
    }(uicomps.BaseItemCilckRenderer));
    playcards.ReviewItemRenderer = ReviewItemRenderer;
    __reflect(ReviewItemRenderer.prototype, "playcards.ReviewItemRenderer");
})(playcards || (playcards = {}));
//# sourceMappingURL=ReviewItemRenderer.js.map