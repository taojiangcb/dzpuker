module playcards {
	/**
	 *飘图片
	 * @author 
	 *
	 */
	export class MoveImage extends eui.Image{
        public move: gameabc.IMove;
    	public recallfun:Function;
        private recallthis;
        private params;
        public soundSrc: string;
        public data: any;
        public delayremove: number = 0;
        public constructor(source?: string | egret.Texture) {
            super(source)
            this.move = new gameabc.LineMove();
            this.move.alltime = 0.3;
		}
        public goto(fromX: number,fromY: number,toX: number = 0,toY: number = 0,delay:number=0,recallfun: Function = null, recallthis=null,params: Array<any>=null,alltime:number=0.24):void{
            egret.Ticker.getInstance().register(this.advanceTime,this);
            this.recallthis = recallthis;
            this.recallfun = recallfun;
            this.params = params;
            this.move.alltime = alltime;
            this.move.go(fromX,fromY,toX,toY);
            this.move.delay = delay;
            this.x = fromX;
            this.y = fromY;
		}
        public advanceTime(time:number):void{
            time = time/1000;
            this.move.advanceTime(time);
            this.x = this.move.x;
            this.y = this.move.y; 
            this.visible = this.move.delay <= 0;
            if (this.visible && this.soundSrc != null) {
                utils.SoundUtils.playEffectSound(this.soundSrc); 
                this.soundSrc = null; 
            }
            if(this.move.isComplete){              
                if (this.delayremove > 0) {
                    this.delayremove -= time;
                } else {                 
                     if(this.recallfun!=null){
                        this.recallfun.apply(this.recallthis,this.params) 
                        this.recallfun = null; 
                        this.recallthis = null;
                        this.data = null;
                        this.params = null;
                        this.soundSrc = null;
                    }
                     this.stop();               
                }
               
            }
        }
        public stop():void{
            egret.Ticker.getInstance().unregister(this.advanceTime,this);
            MoveImage.toPool(this);
        }
        /**
        * 对象池
        */
        public static sItemPool: Array<MoveImage> = [];
        public static fromPool(): MoveImage {
            if(MoveImage.sItemPool.length)
                return MoveImage.sItemPool.pop();
            else {
                return new MoveImage();
            }
        }
        public static toPool(item: MoveImage) {
            item.scaleX = item.scaleY = 1;
            item.removeFromParent();
            item.delayremove = 0;
            item.recallfun = null;
            item.recallthis = null;
            item.params = null;
            item.data = null;
            if(MoveImage.sItemPool.length<5&&MoveImage.sItemPool.indexOf(item) == -1)
                MoveImage.sItemPool.push(item);
        }
        public static clearPool(): void{        
            MoveImage.sItemPool = [];         
        }
	}
}
