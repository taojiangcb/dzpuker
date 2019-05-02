module playcards {
	/**
	 *
	 * @author 
	 *
	 */
    export class PlayCardsFaceItem extends eui.ItemRenderer {
        protected mc: gameabc.MovieClip;
        public constructor() {
            super();
            this.width = this.height = 100;
            this.skinName = "PlayCardsFaceItemSkin"
        }
        dataChanged(): void {
            if (this.data && this.data.label) {
                if (this.mc == null) {
                    // this.mc = new egret.MovieClip(getProxy().getFaceFactory().generateMovieClipData("face"));
                    // this.mc.x = 50;
                    // this.mc.y = 70;
                    this.mc = new gameabc.MovieClip(getProxy().getFaceTextures(this.data.label));
                    this.mc.x = -10;
                    this.mc.y = 0;
                    this.addChild(this.mc);
                    // this.mc.addEventListener(egret.Event.COMPLETE,this.mvComp,this)
                    // this.mc.gotoAndPlay(this.data.label, -1);
                    this.mc.play(-1);
                } else {
                    // this.mc.movieClipData = getProxy().getFaceFactory().generateMovieClipData("face");
                    // this.mc.gotoAndPlay(this.data.label,-1);
                    this.mc.initTextures(getProxy().getFaceTextures(this.data.label));
                }
            }
        }
        // private mvComp():void{
        //     if(this.stage&&!this.mc.isPlaying)
        //         this.mc.gotoAndPlay(this.data.label,-1);
        // }
    }
}
