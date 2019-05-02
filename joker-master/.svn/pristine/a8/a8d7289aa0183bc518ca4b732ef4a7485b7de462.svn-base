module playcards {
	/**
	 *魔法表情
	 * @author 
	 *
	 */
	export class MagicFaceItem extends gameabc.MovieClip{
        private move: gameabc.IMove;
        private key: String;
        private type: string;
        public constructor(key: string) {           
            // super(getProxy().getFaceFactory().generateMovieClipData(key));          
            var skey = key.substr(0,key.length-1);
            super(getProxy().getTextures(key));
            this.type = key.charAt(key.length - 1);
            this.key = skey;
		}
        public show(fromx: number,fromy,tox:number,toy:number):void{
//		    if(this.frameLabels)
            // from.parent.addChild(this);
            // this.x = 60;
            // this.y = 60;
            // this.gotoAndStop("fly");
            this.initTextures(getProxy().getTextures(this.key + "fly"));
            this.stop();
            // var all = this.key.split("_")
            var type: string = this.type;// all[all.length - 1];
            if(type=="1")//抛物线
                this.move = new gameabc.ParabolaMove(40);
            else {//if (type=="2")直线
                 this.move = new gameabc.LineMove(600);
            }           
            this.anchorOffsetX = this.width * 0.5;
            this.anchorOffsetY = this.height * 0.5;
            this.move.go(fromx,fromy,tox,toy);
            this.scaleX = this.scaleY = 0.2;
            egret.Ticker.getInstance().register(this.moveAdvanceTime,this);
		}
        public moveAdvanceTime(time: number): void {
            time = time / 1000;
            this.move.advanceTime(time);
            this.x = this.move.x;
            this.y = this.move.y;
            if (this.scaleX < 1)
                this.scaleX = this.scaleY = this.scaleX + 0.05;
            if (this.move.isComplete) {
                this.scaleX = this.scaleY = 1;
                egret.Ticker.getInstance().unregister(this.moveAdvanceTime, this);
                // this.gotoAndPlay("mv");
                this.initTextures(getProxy().getTextures(this.key + "mv"));
                this.addEventListener(egret.Event.COMPLETE, this.hideMovie, this);
                this.play(1);
            }
        }
        private hideMovie():void{
            this.removeEventListener(egret.Event.COMPLETE,this.hideMovie,this);
            this.removeFromParent(true);
        }
	}
}
