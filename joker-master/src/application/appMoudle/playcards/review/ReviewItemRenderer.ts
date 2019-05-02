/**
 * Created by JiangTao on 2016/4/21.
 */
module playcards {

    export class ReviewItemRenderer extends uicomps.BaseItemCilckRenderer {

        public imgAvatar: eui.Image;
        public imgCardType: eui.Image;
        public txtRoleName: eui.Label;
        public imgChard1: CardItem;
        public imgChard2:CardItem;
        public imgChard6: CardItem;
        public imgChard7: CardItem;
        public imgChard3: CardItem;
        public imgChard5: CardItem;
        public imgChard4: CardItem;
        public txtNumber: eui.Label;
        private allCard: CardItem[];
        private bgimg: eui.Image;
        private ismyimg: eui.Image;
        public groupsafe:eui.Group;
        public txtSafe:eui.Label;

        constructor(){
            super();
            this.skinName = "ReviewItemRendererSkin";
        }

        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            this.allCard = [this.imgChard1,this.imgChard2,this.imgChard3,this.imgChard4,this.imgChard5,this.imgChard6,this.imgChard7];
        }
        dataChanged(): void {
            
            
            var vo: CardResultVO = this.data;
            if (vo.roleId == user.getPlayerInfo().roleId) {
                this.bgimg.source = "s9_bg_play_fangxingxinxi_png";
                this.ismyimg.visible = true;
            } else {
                 this.bgimg.source = "s9_bg_fangxinditu_png";
                this.ismyimg.visible = false;
            }
            this.imgAvatar.source = user.getProxy().getHeadStr(Number(vo.avatarID));
            this.txtRoleName.text = vo.name;
            this.txtNumber.text = FormatUtils.wan(vo.bet);
            if (vo.safeAdd != null&&vo.safeAdd != 0) {
                this.groupsafe.visible = true;
                 this.txtSafe.text = FormatUtils.wan(-vo.safeAdd);
                 if (vo.safeAdd < 0) this.txtSafe.text = "+" + this.txtSafe.text;
            } else {
                this.groupsafe.visible = false;
            }
            
           
            if(vo.bet>0) this.txtNumber.text = "+" + this.txtNumber.text;
            this.imgCardType.source = "";
            
                if (vo.myCard.length > 1) {
                    var allcard = vo.myCard.concat(vo.globalCards)
                    var rest = getProxy().getCardResult(allcard);
                    if (vo.bet > 0)  this.imgCardType.source = ("img_word_poker_win_" + (rest.type + 1) + "_png");
                    else this.imgCardType.source = ("img_word_poker_type_" + (rest.type + 1) + "_png");
                } else {
                    allcard = [0, 0].concat(vo.globalCards);
                    if(vo.bet>0)  this.imgCardType.source = "img_word_play_yingjia_png";
                }
             if(vo.isFold) this.imgCardType.source = "img_word_play_qipai2_png";
             var card: number;
             var imgcard:CardItem;
            
             for (var i: number = 0; i < 7; i++){
                 card = 0;
                 if (allcard.length > i) card = allcard[i];
                 imgcard = this.allCard[i];
                
                //  if (card > -1) {
                     imgcard.setCardId(card);// getProxy().getCardName(card);
                     imgcard.setResult(rest);
                //      imglight.visible = rest != null && getProxy().hasCards(rest.allvos, card) != -1;
                //      imgcard.alpha = rest == null||imglight.visible ? 1 : 0.5;
                //  } else {
                //     imgcard.source = CardItem.backSrc;
                //     imglight.visible = false;
                //     imgcard.alpha = 1;
                //  }
             }
        }
        
    }
}