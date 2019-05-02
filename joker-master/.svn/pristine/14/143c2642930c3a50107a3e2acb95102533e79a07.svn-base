module preload {
	/**
	 *
	 * @author 
	 *
	 */
    export class PreloadUIMoudleComp extends gameabc.UIMoudleComponent {
        //public uiProgress: eui.ProgressBar;

        preloadData: gameabc.UIPreloadData;
        puker_mc:egret.MovieClip;
        labelContent:eui.Group;

        /**
         * 进度显示
         */
        progressLabel:eui.Label;
        border:eui.Group;

		public constructor() {
            super();
            this.skinName = "resource/app_skin/PreloadSkin.exml";
		}
		
		public createComplete(event:egret.Event):void {
            super.createComplete(event);

            var data = RES.getRes("puker_loading_json");
            var texture = RES.getRes("puker_loading_png");
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);

            // var border:eui.Component = new eui.Component();
            // border.horizontalCenter = 0;
            // border.verticalCenter = 0;
            // this.addChild(border);

            // this.progressLabel = new eui.Label();
            // border.addChild(this.progressLabel);
            // this.progressLabel.size = 14;
            // this.progressLabel.horizontalCenter = 0;
            // this.progressLabel.textColor = 0xFFFFFF;
            // this.progressLabel.stroke = 1;

            this.puker_mc = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
            this.puker_mc.play(-1);
            this.puker_mc.x = this.border.width - this.puker_mc.width >> 1;
            this.puker_mc.y = this.border.height - this.puker_mc.height >> 1;

            // border.width = this.puker_mc.width;
            // border.height = this.puker_mc.height;
            this.border.addChild(this.puker_mc);

            // this.progressLabel.y = this.puker_mc.height;
            //this.puker_mc.x = AppGlobal.stageFullWidth - this.puker_mc.width >> 1;
            //this.puker_mc.y = AppGlobal.stageFullHeight - this.puker_mc.height >> 1;

		}

        public addParent():void{
		    super.addParent();
            this.puker_mc.play(-1);
            this.labelContent.visible = false;
            this.progressLabel.text = "";
            // this.visible = true;
		}

	    public setProgress(load:number,total:number):void {
            if(this.progressLabel) {
                this.labelContent.visible = true;
                this.progressLabel.text = gameabc.StringUtils.formatString("{0}/{1}",load,total);
            }
            //if(this.uiProgress) {
            //    this.uiProgress.value = load;
            //    this.uiProgress.maximum = total;
            //}
	    }
	    
        public get featherSpace(): egret.DisplayObjectContainer {
            return AppRoot.gameLayer.loadLayer;
        }
	}
}
