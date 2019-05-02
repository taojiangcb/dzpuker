module playcards {
	/**
	 *奖池 边池显示 
	 * @author 
	 *
	 */
    export class PlaycardsSidePotComp extends eui.Component {
        private allmoney: PlayCardMoneyComp[] = [];
        private itemwidth: number = 120;
        private sidepotlab:eui.Label;
        private bg: eui.Image;
        public constructor() {
            super();
            this.touchChildren = false;
            this.touchEnabled = false;
        }
        
        /*显示所有底池*/
        public showAllBet():void{
            if(this.sidepotlab==null){
                this.sidepotlab = new eui.Label();
                this.sidepotlab.textAlign = egret.HorizontalAlign.CENTER;
                this.sidepotlab.width = 200;
                this.sidepotlab.x = -100;
                this.sidepotlab.size = 18;
//                this.sidepotlab.bold = true;
                this.sidepotlab.textColor = getProxy().isLive? 0xFFFFFF:0x9dffbf;
                this.sidepotlab.y = -28;
                this.addChild(this.sidepotlab);
            }
            var total:number = getProxy().getTotalBet();
            if (total > 0)
                this.sidepotlab.text = "总底池:" + FormatUtils.wan(total);
            else this.sidepotlab.text = "";
        }
        public setalldata(da: number[]): void {
            if (da == null)
                da = [];  
            if (getTableVO().gameStatus != getProxy().GAME_STATUS_PERFLOP && da.length == 0) {
                // var allseat: appvos.SeatPlayerVO[] = getTableVO().seatPlayerVO;
                // var all:number = 0;
                // for(var i: number = 0,len = allseat.length;i<len;i++){
                //     var vo = allseat[i];
                //     all += vo.totalBet;
                // }
                var all: number = getProxy().getTotalBet();
                if (all > 0) da = [all];

            }
            var len: number = da.length;
            if(len==1&&da[0]==0) {
                da.pop();
                len = 0;
            }
            // if (len > 0)
            //     getTableVO().totalBet = da[0];
            // else
            //     getTableVO().totalBet = 0;
            var money: PlayCardMoneyComp;
            while (this.allmoney.length != len) {
                if (this.allmoney.length < len) {
                    money = PlayCardMoneyComp.fromPool();
                    // money.bgimg.visible = getProxy().isLive;
                    money.isMany = true;
                    this.addChild(money);
                    this.allmoney.push(money);
                } else if (this.allmoney.length > len) {
                    money = this.allmoney.pop();
                    this.removeChild(money);
                    PlayCardMoneyComp.toPool(money);
                }
            }
            var c: number = Math.min(len, 4);
            var px: number = (-this.itemwidth >> 1) * c;
            for (var i: number = 0; i < len; i++) {
                money = this.allmoney[i];
                money.setMoney(da[i]);
                money.x = (i % 4) * this.itemwidth + px;
                money.y = 35 * Math.floor(i / 4);
            }
        }
        /*移除最后一个边池*/
        public removeLastMoney():PlayCardMoneyComp{
            var money: PlayCardMoneyComp;
             money = this.allmoney.pop();
             if(money!=null){
                this.removeChild(money);
                PlayCardMoneyComp.toPool(money);
                return money;
             }
               
        }
        public clearAll(): void {
            if(this.sidepotlab)
                 this.sidepotlab.text = "";
            while (this.allmoney.length > 0) {
               this.removeLastMoney();
            }
        }
        public resetLive(): void{       
            var isLive = getProxy().isLive;
             if (this.sidepotlab != null)
                 this.sidepotlab.textColor = isLive ? 0xFFFFFF : 0x9dffbf;
            //  for (var i: number = 0,len =this.allmoney.length  ; i < len; i++) {
            //      this.allmoney[i].bgimg.visible = isLive;
              
            // }
        }
    }
}
