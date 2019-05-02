module happy {
	/**
	 *飘图片
	 * @author 
	 *
	 */
	export class MoveImage extends eui.Image{
      
        private compRemove: boolean;
        private tox: number;
        private toy: number;
        private alltime: number;
        private timeout: number;
        public constructor(source?: string | egret.Texture) {
            super(source);
            this.touchEnabled = false;
		}
        public goto(fromX: number,fromY: number,toX: number ,toY: number ,alltime:number=1500,soundSrc = null,compRemove = false,delayTime:number=0):void{
            if (soundSrc != null) {
                utils.SoundUtils.playEffectSound(soundSrc);               
            }
            this.x = fromX;
            this.y = fromY;
            this.tox = toX;
            this.toy = toY;
            this.alltime = alltime;
            this.compRemove = compRemove;
            if (delayTime > 0)
              this.timeout = egret.setTimeout(this.beginTween, this, delayTime);
            else this.beginTween();
		}
        private beginTween(): void{
             var tween = egret.Tween.get(this).to({ x: this.tox, y: this.toy }, this.alltime, egret.Ease.circOut);   
            if(this.compRemove)tween.call(this.remove,this)
        }
        public remove(): void{
            egret.clearTimeout(this.timeout);
            egret.Tween.removeTweens(this);
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
            item.removeFromParent();
            if(MoveImage.sItemPool.length<50&&MoveImage.sItemPool.indexOf(item) == -1)
                MoveImage.sItemPool.push(item);
        }
        public static clearPool(): void{
            // var pools = MoveImage.sItemPool;
            MoveImage.sItemPool = [];
            // for (var i: number = pools.length - 1; i > -1; i--){
            //     pools[i].removeFromParent(true);
            // }
        }
	}
}
