module playcards {
	/**
	 *
	 * @author 
	 *
	 */
    export class PlayCardSelectMoneyComp extends gameabc.UICustomComponent{
        private moneylab:eui.Label;
        private moneyimg:eui.Image;
        private moneySlider:eui.VSlider;
        private bgimage: eui.Rect;
        private clickbtn:eui.Group;
        private tip: eui.Group;      
        private moneytiplab: eui.Label;
        private barbg:eui.Image;
        private l1btnlab:eui.BitmapLabel;
        private l2btnlab:eui.BitmapLabel;
        private l3btnlab:eui.BitmapLabel;
        private l4btnlab:eui.BitmapLabel;
        // private l5btnlab:eui.BitmapLabel;
        private l1btn:eui.Group;
        private l2btn:eui.Group;
        private l3btn:eui.Group;
        private l4btn:eui.Group;
        private l5btn: eui.Group;
        private bgimg: eui.Image;
		public constructor() {
    		super();
            this.skinName = "PlayCardsSelectMoneySkin";
            this.percentWidth = 100;
            this.percentHeight = 100;
		}
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.moneySlider.addEventListener(egret.Event.CHANGE,this.changevalue,this);
            this.bindButton(this.bgimage);
            this.bindButton(this.clickbtn);
            this.bindButton(this.l1btn);
            this.bindButton(this.l2btn);
            this.bindButton(this.l3btn);
            this.bindButton(this.l4btn);
            this.bindButton(this.l5btn);
            this.bindButton(this.bgimg, false);
            this.show();
        }
        public show():void{
            if(this.initialized){
                this.tip.visible = false;
                var vo = getProxy().mySeatvo;
                //最小加注一个大盲 如果是小忙首次加注至少到2倍大忙
            //    var min: number = vo.turnBet == getTableVO().sbBet ? getTableVO().bbBet * 2 - vo.turnBet : getProxy().nowMaxBet - vo.turnBet+ getTableVO().bbBet;
                this.moneySlider.value = this.moneySlider.minimum = getProxy().addMinBet(); //Math.min(vo.nowBet,min) ;
                this.moneySlider.maximum = getProxy().addMaxBet();
                this.moneySlider.snapInterval = getTableVO().bbBet;
                // this.moneytiplab.text = this.moneylab.text = FormatUtils.wan(this.moneySlider.value);
                // this.moneylab.visible = this.moneySlider.value < this.moneySlider.maximum;
                // this.moneyimg.visible = !this.moneylab.visible;
                this.changevalue(null);
                var all:number = getProxy().getTotalBet();
               
                this.setLab(Math.floor(all*1.5),this.l1btnlab,this.l1btn);
                this.setLab(Math.floor(all*2),this.l2btnlab,this.l2btn);
                this.setLab(Math.floor(all*2.5),this.l3btnlab,this.l3btn);
                this.setLab(Math.floor(all*3),this.l4btnlab,this.l4btn);
                this.setLab(vo.nowBet,null,this.l5btn);            
                this.barbg.height = this.moneySlider.minimum==this.moneySlider.maximum?this.barbg.maxHeight:0;
                
            }
        }
        private setLab(lbet:number,lbtnlab:eui.BitmapLabel,lbtn:eui.Group):void{
            lbtn.name = lbet.toString();
            if(lbtnlab) lbtnlab.text =FormatUtils.wan(lbet);
            lbtn.touchEnabled = lbet<=this.moneySlider.maximum&&lbet>=this.moneySlider.minimum;
            lbtn.alpha = lbtn.touchEnabled ? 1 : 0.5;
            lbtn.visible = lbtnlab != null || lbtn.touchEnabled;
        }
//        public getMoney():number{
//            return this.moneySlider.value;
//        }
//        public isMax():boolean{
//            return this.moneySlider.value == this.moneySlider.maximum ;
//        }
        private changevalue(event: egret.Event):void{
            this.moneytiplab.text =   FormatUtils.wan(this.moneySlider.value);
            this.moneylab.text = "加"+this.moneytiplab.text;
            this.tip.visible = true;
            this.tip.y = this.moneySlider.y+ this.moneySlider.thumb.y;
            this.barbg.height = (this.moneySlider.value - this.moneySlider.minimum) * this.barbg.maxHeight / (this.moneySlider.maximum - this.moneySlider.minimum) ;  //this.moneySlider.height- this.moneySlider.thumb.y-40;
            this.moneylab.visible = this.moneySlider.value < getProxy().mySeatvo.nowBet;//this.moneySlider.maximum;
            this.moneyimg.visible = !this.moneylab.visible;
             
        }
      protected touchHandler(event: egret.TouchEvent): void {
            var tag: egret.DisplayObject = event.currentTarget;
            if (tag == this.bgimg) {
                // console.log(event.localY + "," + (this.moneySlider.y + this.moneySlider.thumb.y));
                if (event.localY < this.moneySlider.y + this.moneySlider.thumb.y) {
                    this.moneySlider.value += this.moneySlider.snapInterval;
                    if (this.moneySlider.value > this.moneySlider.maximum)
                        this.moneySlider.value = this.moneySlider.maximum
                }    
                else {
                    this.moneySlider.value -= this.moneySlider.snapInterval;
                    if (this.moneySlider.value < this.moneySlider.minimum)
                        this.moneySlider.value = this.moneySlider.minimum
                }                  
                this.changevalue(null);
            }else this.touchBindButtonHandler(tag);
        }
      protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {    
          __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SHOWBTNS, true);
          switch (clickTarget) {
              case this.clickbtn://加注按钮 
                  this.addBet();
                   mc2sdk.event(mc2sdk.EVENT_TYPE.ADDBET_R,room.getProxy().current.svrOfsId)
                   break;
              case this.l1btn:
                  getProxy().addBet(Number(clickTarget.name));
                   mc2sdk.event(mc2sdk.EVENT_TYPE.ADDBET_1,room.getProxy().current.svrOfsId)
                   break;  
               case this.l2btn:
                  getProxy().addBet(Number(clickTarget.name));
                   mc2sdk.event(mc2sdk.EVENT_TYPE.ADDBET_2,room.getProxy().current.svrOfsId)
                   break;  
               case this.l3btn:
                  getProxy().addBet(Number(clickTarget.name));
                   mc2sdk.event(mc2sdk.EVENT_TYPE.ADDBET_3,room.getProxy().current.svrOfsId)
                   break;  
                 case this.l4btn:
                  getProxy().addBet(Number(clickTarget.name));
                   mc2sdk.event(mc2sdk.EVENT_TYPE.ADDBET_4,room.getProxy().current.svrOfsId)
                   break;    
              case this.l5btn:
                  getProxy().addBet(this.moneySlider.maximum);
                   mc2sdk.event(mc2sdk.EVENT_TYPE.ADDBET_5,room.getProxy().current.svrOfsId)
                  break;    
          }
        //    if(clickTarget == this.clickbtn)  {
        //        this.addBet();
        //    } else if (clickTarget ==this.l5btn){ 
        //         getProxy().addBet(this.moneySlider.maximum);
        //    }else if (clickTarget.name) {
        //        getProxy().addBet(Number(clickTarget.name));
        //    }            
            this.removeFromParent();
        }
        
        /**
         * 下注
         */
        public addBet():void{
//            var act: number;
//            var money = this.moneySlider.value;
//            if(this.moneySlider.value == this.moneySlider.maximum ) {
//                act = getProxy().ACT_ALLIN
//            } else if(getProxy().nowMaxBet > 0)
//                act = getProxy().ACT_RAISE;
//            else act = getProxy().ACT_BET;
//            __SEND_MESSAGE(app.NetAction.MATCH_ACTION,[act,money]);
            getProxy().addBet(this.moneySlider.value);
        }
	}
}
