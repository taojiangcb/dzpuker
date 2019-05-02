var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var record;
(function (record) {
    /**
 *综合数据界面
 * @author
 *
 */
    var RecordCompreListComp = (function (_super) {
        __extends(RecordCompreListComp, _super);
        function RecordCompreListComp() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addedToStage, _this);
            _this.skinName = "resource/app_skin/record/RecordCompreListCompSkin.exml";
            return _this;
        }
        RecordCompreListComp.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
        };
        RecordCompreListComp.prototype.addedToStage = function (evt) {
            this.showDataEvent();
        };
        RecordCompreListComp.prototype.touchBindButtonHandler = function (tag) {
            switch (tag) {
                default:
                    alert("暂未开放");
                    break;
            }
        };
        RecordCompreListComp.prototype.showDataEvent = function () {
            this.playVo = user.getProxy().playInfoVO;
            this.infoLable1["_img_bg"].visible = true;
            this.infoLable2["_img_bg"].visible = true;
            this.infoLable3["_img_bg"].visible = true;
            this.infoLable4["_img_bg"].visible = true;
            this.infoLable5["_img_bg"].visible = true;
            this.infoLable6["_img_bg"].visible = true;
            this.infoLable1["icon"].source = "img_word_info_zongjushu_png"; //总局数
            if (this.playVo && this.playVo.totalHand) {
                this.infoLable1["label"].text = this.playVo.totalHand.toString() + "局";
            }
            else {
                this.infoLable1["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO");
            }
            this.infoLable2["icon"].source = "img_word_info_rujulv_png"; //入局数
            if (this.playVo && this.playVo.joinHand && this.playVo.totalHand) {
                this.infoLable2["label"].text = utils.HtmlTextUtils.numberToPercentage(this.playVo.joinHand, this.playVo.totalHand);
            }
            else {
                this.infoLable2["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //user.getProxy().vipInfo+"";
            }
            this.infoLable3["icon"].source = "img_word_info_tanpailv_png"; //摊牌率
            if (this.playVo && this.playVo.spreadHand && this.playVo.totalHand) {
                this.infoLable3["label"].text = utils.HtmlTextUtils.numberToPercentage(this.playVo.spreadHand, this.playVo.totalHand);
            }
            else {
                this.infoLable3["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //user.getProxy().vipInfo+"";
            }
            this.infoLable4["icon"].source = "img_word_info_lieshashu_png"; //猎杀数
            if (this.playVo) {
                if (this.playVo.huntKill) {
                    this.infoLable4["label"].text = this.playVo.huntKill + "";
                }
                else {
                    this.infoLable4["label"].text = "0";
                }
            }
            else {
                this.infoLable4["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //this.roleVO.huntKill + ""; 
            }
            this.infoLable5["icon"].source = "img_word_zuidayinqushu_png"; //单局最大赢取
            if (this.playVo && this.playVo.maxHandWin) {
                this.infoLable5["label"].text = this.playVo.maxHandWin + "";
            }
            else {
                this.infoLable5["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //user.getProxy().vipInfo+"";
            }
            this.infoLable6["icon"].source = "img_word_yinlipaiming_png"; //盈利排名
            this.infoLable6["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO"); //utils.HtmlTextUtils.numberToPercentage(this.playVo.winHand,this.playVo.totalHand)
            if (this.playVo && this.playVo.maxCard) {
                // var cardStr = this.playVo.maxCard.toString()
                // if(cardStr.length % 2) {
                //     cardStr = "0" + cardStr
                // }
                // var allcard =[];
                //   for(var i:number =0;i<cardStr.length/2;i++)
                //   {
                //       allcard.push(Number(cardStr.substr(i*2,2)))
                //   }
                var allcard = playcards.getProxy().getPlayMaxCards(this.playVo.maxCard);
                var rest = playcards.getProxy().getCardResult(allcard);
                for (var j = 0; j < rest.allvos.length; j++) {
                    var cardUI = this["card" + (j + 1)];
                    cardUI.source = rest.allvos[j].str; //playcards.getProxy().getCardName()
                }
            }
        };
        RecordCompreListComp.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addedToStage, this);
            _super.prototype.dispose.call(this);
        };
        return RecordCompreListComp;
    }(gameabc.UICustomComponent));
    record.RecordCompreListComp = RecordCompreListComp;
    __reflect(RecordCompreListComp.prototype, "record.RecordCompreListComp");
})(record || (record = {}));
//# sourceMappingURL=RecordCompreListComp.js.map