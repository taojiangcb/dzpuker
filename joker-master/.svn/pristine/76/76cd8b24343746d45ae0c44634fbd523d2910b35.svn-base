module playcards {
	/**
	 *桌子上的筹码
	 * @author 
	 *
	 */
    export class PlayCardMoneyComp extends eui.Component{
        public moneylab: eui.Label;
        private moneyicon: eui.Image;
        public group:eui.Group;
        public bgimg: eui.Image;
        public static arllx: number[] = [549,271,236,275,373,743,854,891,839];
        public static arlly: number[] = [449,438,367,267,210,210,267,366,438];
        public static arll6x: number[] = [549,271,360,760,889,840];
        public static arll6y: number[] = [449,438,210,210,290,438];
        public static arll5x: number[] = [549,271,360,760,840];
        public static arll5y: number[] = [449,438,210,210,438];
        public static arll3x: number[] = [549,222,902];
        public static arll3y: number[] = [449,316,316];
        
        public static livex: number[] = [95,95,95,7,7,7,-200,-200,-200];
        public static livey: number[] = [218,368,518,518,368,218,-200,-200,-200];
        public static icon: string = "icon_play_chouma_type_";
        public isMany: boolean = false;
        public money: number;
        public isRight: boolean=false;
		public constructor() {
    		super();
            this.skinName = "PlayCardsMoneySkin";
            this.touchChildren = false;
            this.touchEnabled = false;
		}
        public setMoney(value: number): void{
            this.money = value;           
            this.moneylab.text = FormatUtils.wan(value);
            this.moneyicon.source = PlayCardMoneyComp.getIcon(value,this.isMany);
            this.moneyicon.y = this.isMany ? -6 : -1;
            // if (this.isRight) {
            //     this.moneylab.validateNow();
            //      this.anchorOffsetX = this.moneylab.textWidth+25;    
            // }
               
        }
		public resetxy():void{
            // if(getProxy().mySeat==-1)
            //     var  px = 0;
            // else    
		    //     px = getProxy().mySeat;
            var tableVo: appvos.TexasTableVO = getTableVO();
            if(tableVo == null) {
                return;
            }
            var index = Number(this.name) - getProxy().getPX();//px; 
            var size: number = tableVo.tableSize;
            if (index < 0) index += size;
            this.bgimg.visible = true;
            if (getProxy().isLive) {
                index = Number(this.name);               
                if (index >2) {
                    this.x =  PlayCardMoneyComp.livex[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                } else
                    this.x = AppGlobal.stageFullWidth -  PlayCardMoneyComp.livex[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                this.y =  PlayCardMoneyComp.livey[index]+(768-AppGlobal.stageFullHeight)*0.5; 
                this.resize(false);
                // this.bgimg.visible = true;
                this.bgimg.source = "img_xiazhu_bg_zr_png";
            } else {
                this.bgimg.source = "s9_chip_bg_play_png";
                 if(size == 6){//6人房              
                    this.x = PlayCardMoneyComp.arll6x[index];
                    this.y = PlayCardMoneyComp.arll6y[index];
                    this.resize(index > 2);
                }else if(size == 5) {//6人房
                    this.x = PlayCardMoneyComp.arll5x[index];
                    this.y = PlayCardMoneyComp.arll5y[index];
                    this.resize(index > 2);
                } else if(size ==3 ) {//6人房         
                    this.x = PlayCardMoneyComp.arll3x[index];
                    this.y = PlayCardMoneyComp.arll3y[index];
                    this.resize(index > 1);
                }else {
                    this.x = PlayCardMoneyComp.arllx[index];
                    this.y = PlayCardMoneyComp.arlly[index];
                    this.resize(index > 4);
                }
            }
            
            
        }
        public resize(isright: boolean): void{
            this.isRight = isright;
            if (isright) {//右边筹码
                this.currentState = "right";
                this.anchorOffsetX = 130;
                // this.moneylab.textAlign = "right";
                // this.moneylab.x = -105;
                // this.group.right = 30;
            } else {
                this.currentState = "left";
                this.anchorOffsetX = 0;
                //  this.group.right = NaN;
                // this.moneylab.textAlign = "left";
                // this.moneylab.x = 30;
        
            }
        }
        public getIconSource(): string | egret.Texture{
            return this.moneyicon.source;
        }
         public static getIcon(value:number,isMany:boolean): string {
             var icon: string;
             var t0: number;
             var t1: number;
             var t2: number; 
            if (getProxy().tableVO != null) {
                var bb: number = getProxy().tableVO.bbBet;
                if (isMany) {
                    icon = "1";
                    t0 = bb*48;
                    t1 = t0*120;
                    t2 = t0*200;                
                }else {
                    icon = "";
                    t0 = bb*3;
                    t1 = t0*6;
                    t2 = t0*9;
                }
                if (value <= t0) {
                    icon = PlayCardMoneyComp.icon + icon + "0_png";
                }else if (value <= t1) {
                    icon = PlayCardMoneyComp.icon + icon + "1_png";
                }else if (value <= t2) {
                    icon = PlayCardMoneyComp.icon + icon + "2_png";
                 } else
                    icon = PlayCardMoneyComp.icon + icon + "3_png";    
            } else icon = PlayCardMoneyComp.icon + icon + "0_png";
            return icon;
        }
        // public static sMoneyItemPool: Array<PlayCardMoneyComp> = [];
        public static fromPool(): PlayCardMoneyComp {
            // if(PlayCardMoneyComp.sMoneyItemPool.length)
            //     return PlayCardMoneyComp.sMoneyItemPool.pop();
            // else
                return new PlayCardMoneyComp();
        }
        public static toPool(money: PlayCardMoneyComp) {
            // money.isMany = false;
            // money.bgimg.visible = false;
            // money.resize(false); 
            // money.anchorOffsetX = 0;
            // if(PlayCardMoneyComp.sMoneyItemPool.length<5&&PlayCardMoneyComp.sMoneyItemPool.indexOf(money) == -1)
            //     PlayCardMoneyComp.sMoneyItemPool.push(money);
        }
	}
}
