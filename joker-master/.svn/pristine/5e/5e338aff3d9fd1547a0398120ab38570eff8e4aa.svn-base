module record {
    /**
 *综合数据界面
 * @author 
 *
 */
    export class RecordCompreListComp extends gameabc.UICustomComponent {
        
        
        private playVo: appvos.UserInfoVO;
        
        private infoLable1: eui.Component;
        private infoLable2: eui.Component;
        private infoLable3: eui.Component;
        private infoLable4: eui.Component;
        private infoLable5: eui.Component;
        private infoLable6: eui.Component;
        
        private card1:eui.Image;
        private card2: eui.Image;
        private card3: eui.Image;
        private card4: eui.Image;
        private card5: eui.Image;
        
        private recordComp: RecordRadarComp;
        
        public constructor() {
            super()
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addedToStage,this);
            this.skinName = "resource/app_skin/record/RecordCompreListCompSkin.exml";
        }
        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
           
        }
        public addedToStage(evt: egret.Event): void {
            this.showDataEvent()
        }
        protected touchBindButtonHandler(tag: egret.DisplayObject): void {
            switch(tag) {
                default:
                    alert("暂未开放");
                    break;
            }
        }
        private showDataEvent():void
        {
            this.playVo = user.getProxy().playInfoVO;
            
            this.infoLable1["_img_bg"].visible = true;
            this.infoLable2["_img_bg"].visible = true;
            this.infoLable3["_img_bg"].visible = true;
            this.infoLable4["_img_bg"].visible = true;
            this.infoLable5["_img_bg"].visible = true;
            this.infoLable6["_img_bg"].visible = true;

            this.infoLable1["icon"].source = "img_word_info_zongjushu_png";//总局数
            
             if(this.playVo&&this.playVo.totalHand)
            {
                this.infoLable1["label"].text = this.playVo.totalHand.toString() + "局";
            }else{
                 this.infoLable1["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO");
            }
            
            this.infoLable2["icon"].source = "img_word_info_rujulv_png";//入局数
            if(this.playVo && this.playVo.joinHand && this.playVo.totalHand)
            {
                this.infoLable2["label"].text = utils.HtmlTextUtils.numberToPercentage(this.playVo.joinHand,this.playVo.totalHand) 
            }else{
                 this.infoLable2["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO")//user.getProxy().vipInfo+"";
            }
            
            
            this.infoLable3["icon"].source = "img_word_info_tanpailv_png";//摊牌率
            if(this.playVo && this.playVo.spreadHand && this.playVo.totalHand)
            {
                this.infoLable3["label"].text = utils.HtmlTextUtils.numberToPercentage(this.playVo.spreadHand,this.playVo.totalHand)
            }else{
                 this.infoLable3["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO")//user.getProxy().vipInfo+"";
            }
           
            
            this.infoLable4["icon"].source = "img_word_info_lieshashu_png";//猎杀数
            if(this.playVo) {
                if(this.playVo.huntKill)
                {
                   this.infoLable4["label"].text = this.playVo.huntKill+"";
                }else{
                    this.infoLable4["label"].text = "0";
                }
            } else {
                 this.infoLable4["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO") //this.roleVO.huntKill + ""; 
            }

            this.infoLable5["icon"].source = "img_word_zuidayinqushu_png";//单局最大赢取
             if(this.playVo&&this.playVo.maxHandWin)
            {
                  this.infoLable5["label"].text = this.playVo.maxHandWin+""
            }else{
                 this.infoLable5["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO")//user.getProxy().vipInfo+"";
            }
            
            this.infoLable6["icon"].source = "img_word_yinlipaiming_png";//盈利排名
            this.infoLable6["label"].text = gameabc.ResourceBundleUtil.getMessage("TEMPORARY_NO")//utils.HtmlTextUtils.numberToPercentage(this.playVo.winHand,this.playVo.totalHand)
                
            if(this.playVo&&this.playVo.maxCard)
            {
                // var cardStr = this.playVo.maxCard.toString()
                // if(cardStr.length % 2) {
                //     cardStr = "0" + cardStr
                // }
                // var allcard =[];
                //   for(var i:number =0;i<cardStr.length/2;i++)
                //   {
                //       allcard.push(Number(cardStr.substr(i*2,2)))
                //   }
                  var allcard = playcards.getProxy().getPlayMaxCards(this.playVo.maxCard)
                  var rest = playcards.getProxy().getCardResult(allcard);
                  for(var j: number = 0;j < rest.allvos.length;j++)
                  {
                      var cardUI = this["card" + (j + 1)]
                      cardUI.source = rest.allvos[j].str//playcards.getProxy().getCardName()
                  }
                
            }
        }
        
        public dispose(): void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addedToStage,this);
            super.dispose();

        }
    }

}
