module playcards {
	/**
	 *庄家图片
	 * @author 
	 *
	 */
	export class PlayCardBankerImg  extends eui.Image{
        private allx: number[] = [510,230,232,286,334,767,830,868,859];
        private ally: number[] = [450,440,337,240,210,210,240,339,440];
        private all6x: number[] = [510,230,320,780,864,854];
        private all6y: number[] = [450,440,212,212,324,440];
        private all5x: number[] = [510,230,320,780,854];
        private all5y: number[] = [450,440,212,212,440];
        private all3x: number[] = [510,220,878];
        private all3y: number[] = [450,290,290];
        public static livex: number[] = [135,135,135,90,90,90,-200,-200,-200];
        public static livey: number[] = [105,255,405,405,255,105,-200,-200,-200];
		public constructor() {
    		super()
            
		}
        public resetxy(): void {
            // if(getProxy().mySeat == -1)
            //     var px = 0;
            // else
            //     px = getProxy().mySeat;
            var tableVo: appvos.TexasTableVO = getTableVO();
            if(tableVo == null) {
                return;
            }
            var index = tableVo.banker -getProxy().getPX();// px;
            var size: number = tableVo.tableSize;
            if (index < 0) index += size;
             if (getProxy().isLive) {
                index = tableVo.banker;               
                if (index >2) {
                    this.x =  PlayCardBankerImg.livex[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                } else
                    this.x = AppGlobal.stageFullWidth -  PlayCardBankerImg.livex[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                this.y =  PlayCardBankerImg.livey[index]+(768-AppGlobal.stageFullHeight)*0.5;               
            }else  if(size == 6) {//6人房           
                this.x = this.all6x[index];
                this.y = this.all6y[index];
            } else if(size == 5) {//5人房           
                this.x = this.all5x[index];
                this.y = this.all5y[index];
            }else if(size == 3) {//3人房           
                this.x = this.all3x[index];
                this.y = this.all3y[index];
            } else {
                this.x = this.allx[index];
                this.y = this.ally[index];
            }
        }
	}
}
