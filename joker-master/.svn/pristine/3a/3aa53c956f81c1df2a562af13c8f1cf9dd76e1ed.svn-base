// TypeScript file
module appvos {

    export class ZPInfoVO {

        seatId:number = 0;//座位号
        betNum:number = 0;//筹码最终值
        posWin1:number = 0;//输赢位置1
        posWin2:number = 0;//输赢位置2
        posWin3:number = 0;//输赢位置3
        posWin4:number = 0;//输赢位置4
        posWin5:number = 0;//输赢位置5
        posWin6:number = 0;//输赢位置6
        posWin7:number = 0;//输赢位置7
        realWin:number = 0;//实际输赢

        public constructor(data: any = null) {
            if (data != null) {
				var vo: any = AppGlobal.getMessage("ZPInfoVO").decode(data);
                this.setData(vo);
            }
        }      

        
        setData(data:any):void {
            if(data) {
                this.seatId = data.seatId;//座位号
                this.betNum = data.betNum;//筹码最终值
                this.posWin1 = data.posWin1;//输赢位置1
                this.posWin2 = data.posWin2;//输赢位置2
                this.posWin3 = data.posWin3;//输赢位置3
                this.posWin4 = data.posWin4;//输赢位置4
                this.posWin5 = data.posWin5;//输赢位置5
                this.posWin6 = data.posWin6;//输赢位置6
                this.posWin7 = data.posWin7;//输赢位置7
                this.realWin = data.realWin;//实际输赢
            }
            else {
                this.clear();
            }
        }

        clear():void {
            this.seatId =0//座位号
            this.betNum =0//筹码最终值
            this.posWin1 =0//输赢位置1
            this.posWin2 =0//输赢位置2
            this.posWin3 =0//输赢位置3
            this.posWin4 =0//输赢位置4
            this.posWin5 =0//输赢位置5
            this.posWin6 =0//输赢位置6
            this.posWin7 =0//输赢位置7
            this.realWin =0//实际输赢
        }


    }
}