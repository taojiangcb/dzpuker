module playcards {
	/**
	 *
	 * @author 
	 *
	 */
    export class PlayCardOutMenuComp extends gameabc.UICustomComponent{
        private bgimage:eui.Rect;
        private allgroup: eui.Group;
        private btnsGroup: eui.Group;
        private standuobtn: eui.Group;//站起围观
        private changebtn: eui.Group;//立即换桌
        private tipbtn: eui.Group;//牌型提示
        private tongjibtn: eui.Group;//牌型统计
        private outbtn: eui.Group;//返回大厅
        private setbtn: eui.Group;//游戏设置
        private linebtn: eui.Group;//历史盈亏
        public safebtn: eui.Group;//保险说明
        public view: PlayCardsUIMoudleComp;
        private isTween:boolean;
		public constructor() {
            super();
            this.skinName = "PlayCardOutMenuSkin";
            this.right = 0;
            this.left = 0;
            this.top = 0;
            this.bottom = 90;
		}
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.standuobtn,false);
            this.bindButton(this.changebtn,false);
            this.bindButton(this.tipbtn,false);
            this.bindButton(this.outbtn, false);
            this.bindButton(this.tongjibtn, false);
            this.bindButton(this.bgimage, false);
            this.bindButton(this.setbtn, false);
            this.bindButton(this.linebtn, false);
            this.bindButton(this.safebtn, false);
            this.refBtns();
        }
        private tweenComp():void{
            this.isTween  = false;
        }
        public refBtns():void{
            if(this.initialized) {
                this.allgroup.y = -400;
                this.isTween = true;
                egret.Tween.get(this.allgroup).to({ y: 0 }, 200).call(this.tweenComp, this);
                 var currentType = room.getProxy().currentType;
                 if (currentType == room.TYPE.VIP || currentType == room.TYPE.GRIL||currentType == room.TYPE.PK) {
                    this.btnsGroup.addChildAt(this.standuobtn, 1);  
                    this.standuobtn.touchEnabled = getProxy().tableVO != null && getProxy().mySeat >= 0;
                    this.standuobtn.alpha = this.standuobtn.touchEnabled ? 1 : 0.5;
                    // this.standuobtn.touchEnabled = getProxy().tableVO!=null&&room.getProxy().current && !room.getProxy().isAntiCheating&&getProxy().mySeat>=0 
                } else {
                    this.standuobtn.removeFromParent();   
                }
                if ( currentType== room.TYPE.VIP||currentType == room.TYPE.PK) {//私人房 单挑房
                    this.changebtn.removeFromParent();               
                    this.linebtn.removeFromParent();
                } else {                
                    if (currentType == room.TYPE.GRIL)
                        this.changebtn.removeFromParent(); 
                    else {
                         this.btnsGroup.addChildAt(this.changebtn,1);   
                         this.changebtn.touchEnabled = getProxy().tableVO != null && !getProxy().isSingle;
                         this.changebtn.alpha = this.changebtn.touchEnabled ? 1 : 0.5;
                    }    
                    this.btnsGroup.addChildAt(this.linebtn, 3);
                }
               
                 if(currentType == room.TYPE.VIP)
                    this.btnsGroup.addChild(this.tongjibtn);
                else this.tongjibtn.removeFromParent();
                 if (room.getProxy().current && room.getProxy().current.isInsurance) {
                    this.btnsGroup.addChild(this.safebtn);
                 } else {
                     this.safebtn.removeFromParent();
                }
            }
        }
        // /**正在游戏中 */
        // private isInGame(): boolean{
        //     return getProxy().mySeatvo != null && getProxy().mySeatvo.isPlay && !getProxy().mySeatvo.isFold;
        // }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            
            if(this.isTween) return;
           
            switch(clickTarget){            
                case this.bgimage: 
                    this.isTween = true;
                    egret.Tween.get(this.allgroup).to({ y: -400 },200).call(this.removeFromParent,this);
                    return;
                case this.standuobtn: 
                    getProxy().stand();
                    break;                       
                case this.tipbtn:      
                 __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SHOWTIP)            
                    break;
                case this.changebtn:
                    if(getProxy().tableVO!=null)
                        getProxy().change();
                break;
                case this.outbtn:
                    getProxy().out();
                    break;
                case this.tongjibtn:
                    if(playcards.getProxy().joinNumber) {
                        __PVO().to(app.NetAction.MATCH_GET_INFO);                        
                    } else {
                        tip.SystemCenterTooltip.showTip("加密私人房才可察看战绩统计.");
                    }
                    
                    break;
                case this.setbtn:
                    __OPEN_PRE_MOUDLE(AppReg.APP_SETTING_TYPE);         
                    break;     
                case this.linebtn:
                    mc2sdk.event(mc2sdk.EVENT_TYPE.HISTORY_LINE);
                    __OPEN_PRE_MOUDLE(AppReg.APP_BANK_LINE,
                                      [room.getProxy().current.maxBank,
                                       playcards.getProxy().lineHistory.length,
                                       playcards.getProxy().lineHistory,
                                       playcards.getProxy().lineHistoryFixed,
                                       happy.ROOM_TYPE.NORMAL]);
                    break;
                case this.safebtn:
                    __OPEN_PRE_MOUDLE(AppReg.SAFE_HELP,null, null, null, this.view.mainview);
                    break;   
            }
            this.removeFromParent();
        }
        public close(): void{
           this.removeFromParent();
      }
	}
}
