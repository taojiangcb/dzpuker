module gameabc {

    export class MovieClip extends egret.Bitmap {
 
       /**自动播放*/
        private _autoAddTime:boolean;
        private _TimeSpan: number = 0;
        private _totalFrame: number = 7;
        private _currentFrame: number = 0;
        private _RepeatTime: number = 0.1;
        private _totalTextures:Array<egret.Texture>;
        private _delay:number=0;
        private _playing:boolean=false;
        /**循环播放次数*/
        private _playTimes:number=1;
        private _loopdelayTime:number=0;
        private _IsComplete: boolean;
        private _fps: number;
        /**
         * 纹理集动画
         * @param textureAtlas
         */
        public constructor(textures: Array<egret.Texture>,fps: number = 12,autoAddTime:boolean=true) {
            super();
            this.initTextures(textures,fps);
            this._autoAddTime = autoAddTime;
            if(autoAddTime){
                this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addStage,this);
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
            }
        }
       
        public initTextures(textures: Array<egret.Texture>,fps: number = 12):void{
              this._totalTextures = textures;
              this._currentFrame = 0;
              this._TimeSpan = 0;           
              this.fps = fps;
              this._totalFrame = this._totalTextures.length; 
              if(this._totalFrame > 0) {
                  this.texture = this._totalTextures[0];
              }
        }
        /**延迟*/
        public set delay(value: number) {
            this._delay = value;
        }

        public get delay(): number {
            return this._delay;
        }
        /**循环*/
        public set loop(value: boolean) {
            if(value) this._playTimes = -1;
            else this._playTimes = 1;
        }

        public get loop(): boolean {
            return this._playTimes<=0;
        }
         /**帧频 每秒帧数*/
        public set fps(value: number) {
            this._fps = value;
            this._RepeatTime = 1 / value;
        }

        public get fps(): number {
            return this._fps;
        }
        /**循环间隔 */
        public get loopdelayTime(): number
		{
			return this._loopdelayTime;
		}
		
        public set loopdelayTime(value: number)
		{
            this._loopdelayTime = value;
		}
        public advanceTime(time: number) {
           if(!this._playing)
               return;
           time = time/1000;
           if(this._delay >0){
               this._delay -=time;
               if(this._delay > 0)
               return;
           }
            this._TimeSpan += time;
            if(this._TimeSpan >= this._RepeatTime) {
                var addFrame = Math.floor(this._TimeSpan /this._RepeatTime);
                this._TimeSpan = this._TimeSpan % this._RepeatTime;
                this._currentFrame += addFrame;
                if(this._currentFrame >= this._totalFrame){
                    if(this._playTimes > 0) {
                        var times: number = Math.floor(this._currentFrame / this._totalFrame);
                        this._playTimes -= times;
                        if(this._playTimes <= 0) {
                            this.stop();
                            return;
                        } 
                    }
                    this._currentFrame = this._currentFrame % this._totalFrame;
                    this._delay = this._loopdelayTime;
                } 
                this.setFrame();
            }
        }
        private setFrame(): void{
             if(this._totalTextures != null && this._totalTextures.length > 0)
                    this.texture = this._totalTextures[this._currentFrame];
        }
        /**暂停*/
        public  pasue():void{
            this._playing = false;       
        }
        /**继续 */
        public resume(): void {
            this._playing = true;
        }
        /**开始 
         * times 循环次数 <=0无限循环 
         * */
        public play(times:number = 1):void{
            this._playing = true;
            this._IsComplete = false;
            this._playTimes = times;
            if(this._autoAddTime){
                egret.Ticker.getInstance().register(this.advanceTime,this);
            }
        }
        /**结束*/
        public stop():void{
            this._playing = false;
            if(this._autoAddTime) egret.Ticker.getInstance().unregister(this.advanceTime,this);
            this.dispatchEventWith(egret.Event.COMPLETE);
        }
        /**停在第value 帧 */
        public stopAt(value:number): void{
            this._playing = false;
            if(this._autoAddTime) egret.Ticker.getInstance().unregister(this.advanceTime,this);
            if (value >= 0 && value < this._totalFrame) {
                this._currentFrame = value;
                this.setFrame();
            }
                
        }
        // public remain(value: number): void {
        //     this._currentFrame = value;
        //     this.setFrame();
        //     var timer: egret.Timer = new egret.Timer(1000, 1);
        //     timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>this.removeFromParent(true),this);
        //     timer.start();
        // }
        private addStage(): void {
            if(!this._IsComplete)
                egret.Ticker.getInstance().register(this.advanceTime,this);
        }
        private removeStage(): void {
            egret.Ticker.getInstance().unregister(this.advanceTime,this);
        }
        public dispose() {          
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addStage,this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
            egret.Ticker.getInstance().unregister(this.advanceTime,this);
        }

    }
}
