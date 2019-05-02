module playcards {
	/***
	 *牌型特效
	 */
	export class PlaycardsTypeEffect extends eui.Component{
		static showType(type:number,parent:egret.DisplayObjectContainer): boolean{
			 var sheet: egret.SpriteSheet = RES.getRes("type"+type+"_json");
			 if (sheet != null) {
				 var textureAtlas = new gameabc.TextureAtlas([sheet]);
				 var effect = new PlaycardsTypeEffect(textureAtlas);
				 parent.addChild(effect);
				 return true;
			 }
			return false;
		}
		private movie: gameabc.MovieClip;
		private textureAtlas: gameabc.TextureAtlas;
		public comp:eui.Group;
		public line1:eui.Image;
		public line2:eui.Image;
		public light: eui.Image;
		private lineNum: number;
		private _RepeatTime: number = 0.1;
		private _TimeSpan: number = 0;
		private _currentFrame: number = 1;
		// public movie:eui.Image;

		// private move: gameabc.AddSpeedMove;
		public constructor(textureAtlas:gameabc.TextureAtlas) {
			super();			
			this.skinName = "PlaycardsTypeEffectSkin";
			/**768*512 */
			this.textureAtlas = textureAtlas;
			this.lineNum = textureAtlas.getTextures("line").length;
			this.once(eui.UIEvent.CREATION_COMPLETE,this.createComplete,this);
		}
		 /*该模块被创建完成后的回调函数*/
        public createComplete(event: egret.Event): void {
			var textureAtlas = this.textureAtlas;
			this.setLine("line1");
            // this.line1.source = textureAtlas.getTexture("line1");
			// this.line2.source = textureAtlas.getTexture("line1");
			// this.move = new gameabc.AddSpeedMove(2000, 0.2);
			// this.move.go(-310, 310, 0, 0);
			egret.Ticker.getInstance().register(this.advanceTime, this);
        }
		public advanceTime(time:number): void{
			time = time / 1000;
			 this._TimeSpan += time;
			 if (this._TimeSpan >= this._RepeatTime) {
				 this._TimeSpan = this._TimeSpan % this._RepeatTime;
				 this._currentFrame += 1;
				 this.setLine("line"+ this._currentFrame);
			 }
			// if (this.move && !this.move.isComplete) {
			// 	this.move.advanceTime(time);
			// 	this.line1.x = this.move.x;
			// 	this.line2.x = this.move.y;
			// 	if (this.move.isComplete) {
			 if (this._currentFrame == this.lineNum) {
					egret.Ticker.getInstance().unregister(this.advanceTime, this);
					this.light.source = this.textureAtlas.getTexture("light");
					this.movie = new gameabc.MovieClip(this.textureAtlas.getTextures("mv"));
					// this.movie.x = 176;
					this.movie.x = 768 - (this.movie.width*1.25) >> 1;
					this.movie.y = 145;
					this._TimeSpan = 0;
					this.movie.scaleX = this.movie.scaleY = 1.25
					this.movie.addEventListener(egret.Event.COMPLETE,this.movieover,this);
					this.comp.addChild(this.movie);
					this.movie.play(1);
				// }
			}
		}
		private setLine(key:string): void{
			var texture = this.textureAtlas.getTexture(key);
			this.line1.source = this.line2.source = texture;
		}
        private movieover(): void{
			egret.Ticker.getInstance().register(this.hideAdvanceTime, this);			
		}
		public hideAdvanceTime(time:number): void{
			this._TimeSpan += time;
			var total = 400;
			this.alpha = (total - this._TimeSpan) / total;
			if (this._TimeSpan >= total) {
				egret.Ticker.getInstance().unregister(this.hideAdvanceTime, this);
				this.removeFromParent(true);
			}
				
		}
		public dispose(): void{	
			egret.Ticker.getInstance().unregister(this.advanceTime, this);
			egret.Ticker.getInstance().unregister(this.hideAdvanceTime, this);
			if (this.movie) this.movie.dispose();
		}
	}
}