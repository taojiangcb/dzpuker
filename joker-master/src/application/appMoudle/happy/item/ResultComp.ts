module happy {
    export class ResultComp extends gameabc.UICustomComponent {
        public bgimg:eui.Image;
        public labimg:eui.Image;
        public moneylab:eui.BitmapLabel;
        private iswin: boolean;
        private num: number;
        private timeId: number;
        private showResult: boolean;
        public constructor() {
			super();
            this.skinName = "ResultCompSkin";
            this.touchEnabled = false;
        }
        //   public createComplete(event: egret.Event): void {
            //   this.initialized = true;
            //   if (this.num != null) this.tweenShow();
        // }
        public showType(iswin: boolean, num: number,parent:egret.DisplayObjectContainer,showResult): void{
            this.iswin = iswin;
            this.num = num;
            this.showResult = showResult;
            this.visible = true;
            parent.addChild(this);
            // if (this.initialized)
                this.tweenShow();
          }
        private tweenShow(): void{
            if (this.iswin) {
                this.bgimg.source = "icon_happy_hj_dt_png";
                this.labimg.source = "img_word_happy_gxjhd_png";
                utils.SoundUtils.playEffectSound(utils.SoundUtils.win);
            } else {
                 this.bgimg.source = "icon_happy_hj_dt1_png";
                 this.labimg.source = "img_word_happy_yhsl_png";
            }
            this.moneylab.text = this.num + "";
            this.y = 400;
            this.x = 208;
            this.alpha = 0;
            egret.Tween.get(this).to({ y: 310, alpha: 1 }, 300);
           this.timeId= egret.setTimeout(this.tweenHide,this,2000)
        }
        private tweenHide(): void{
             egret.Tween.get(this).to({ alpha: 0 }, 200).call(this.hide,this);
        }
        public hide(): void{
            this.removeFromParent();
            egret.Tween.removeTweens(this);
            egret.clearTimeout(this.timeId);
            if (this.showResult&&room.getProxy().current) {
                 var bets = happy.getProxy().allWinBet[room.getProxy().current.svrRoomId];
				if (bets) {
					if (bets[6] != 0 && bets[6] == bets[8]) {//刚中奖
						__OPEN_MOUDLE(AppReg.APP_HAPPY_REWARD, bets);
					}
				 }
            }
        }
    }
}