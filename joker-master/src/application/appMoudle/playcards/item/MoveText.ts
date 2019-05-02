module playcards {
	/**
	 *飘字
	 * @author 
	 *
	 */
	export class MoveText extends eui.BitmapLabel{
    	private  move:gameabc.LineMove
    	private recallfun:Function;
        private recallthis;
        public data:any;
        public constructor() {
            super()
            this.move = new gameabc.LineMove();
            this.move.alltime = 0.8;
            this.font = "fnt03_fnt";
            this.textAlign = egret.HorizontalAlign.CENTER;
		}
        public goto(fromX: number,fromY: number,toX: number = 0,toY: number = 0,delay:number=0,recallfun: Function = null, recallthis=null):void{
            egret.Ticker.getInstance().register(this.advanceTime,this);
            this.recallthis = recallthis;
            this.recallfun = recallfun;
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
            if(this.move.isComplete){
                egret.Ticker.getInstance().unregister(this.advanceTime,this);
               gameabc.setTimeout(this.over,this,1000)
            }
        }
        private over():void{
             if(this.recallfun!=null){
                    this.recallfun.call(this.recallthis,this) 
                    this.recallfun = null; 
                    this.data = null;
                }             
                MoveText.toPool(this);
        }
        /**
        * 对象池
        */
        public static sItemPool: Array<MoveText> = [];
        public static fromPool(): MoveText {
            if(MoveText.sItemPool.length)
                return MoveText.sItemPool.pop();
            else {
                return new MoveText();
            }
        }
        public static toPool(item: MoveText) {
            // item.scaleX = item.scaleY = 1;
            item.removeFromParent();
            if(MoveText.sItemPool.length<5&&MoveText.sItemPool.indexOf(item) == -1)
                MoveText.sItemPool.push(item);
        }
	}
}
