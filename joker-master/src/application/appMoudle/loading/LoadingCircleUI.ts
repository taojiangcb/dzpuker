module app.loading {
	/**
	 *
	 * @author 
	 *
	 */
    export class LoadingCircleUI extends eui.Component {
        private static _instance: LoadingCircleUI;
        
        public  loadingCommands: Object;
        public  commandKeys: Array<string>;

        //private loadingimg: eui.Image;

        private rotationSpeed:number = 10 ;
        private delay:number = 0;
        private isComp: boolean = false;
        public static LOADING_TIMEOUT: number = 15000;

        puker_mc:egret.MovieClip;

		public constructor() {
            super();
            this.createView();
		}
        private createView(): void {
            this.skinName = "resource/app_skin/loadingCircleSkin.exml";

            this.width = AppGlobal.stageFullWidth;
            this.height = AppGlobal.stageFullHeight;

            //        this.percentWidth = 1;
            //        this.percentHeight = 1;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.createComplete,this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addStageHandler,this);
        }

        createChildren():void {
            super.createChildren();

            var data = RES.getRes("puker_loading_json");
            var texture = RES.getRes("puker_loading_png");
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);

            var border:eui.Component = new eui.Component();
            border.horizontalCenter = 0;
            border.verticalCenter = 0;
            this.addChild(border);

            this.puker_mc = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
            this.puker_mc.play(-1);

            border.width = this.puker_mc.width;
            border.height = this.puker_mc.height;
            border.addChild(this.puker_mc);

        }

        //单例
        public static get instance(): LoadingCircleUI {
            if(!this._instance){
                this._instance = new LoadingCircleUI();
                this._instance.loadingCommands = {};
                this._instance.commandKeys = [];
            }
            return this._instance;
        }
        public static show(key:string): void {
//            AppRoot.gameLayer.maskLayer.addChild(this.instance);
            egret.Ticker.getInstance().register(LoadingCircleUI.instance.advanceTime,LoadingCircleUI.instance);
            this._instance.loadingCommands[key] = 0;
            if(this._instance.commandKeys.indexOf(key) == -1)
                this._instance.commandKeys.push(key);
            this.instance.validateLoadingPopup(0);
        }

        public validateLoadingPopup(time: number):void {
            if(this.commandKeys.length > 0) {
                var show: boolean = false;
                var addtime: number;
                var timeout: number = LoadingCircleUI.LOADING_TIMEOUT;
                for(var i: number = this.commandKeys.length - 1;i >= 0;i--) {
                    addtime = this.loadingCommands[this.commandKeys[i]] += time;
                    if(addtime > timeout) {
                        LoadingCircleUI.hide(this.commandKeys[i]);
//                        continue;
                    }else{
                        show = true;
                    }  
                }
                if(show ) {
                    this.showLoading();
                } else  {
                    this.hideLoading();
                }
            } else {
                this.hideLoading();
            }
        }
        private showLoading():void{
            AppRoot.gameLayer.maskLayer.addChild(this);
        }
        
        private hideLoading():void{
            this.delay = 0;
            AppRoot.gameLayer.maskLayer.removeChild(this);
            egret.Ticker.getInstance().unregister(LoadingCircleUI.instance.advanceTime,LoadingCircleUI.instance);
        }
        public static hide(key: string): void {
            delete this._instance.loadingCommands[key];
            var index: number = this._instance.commandKeys.indexOf(key);
            if(-1 != index) {
                this._instance.commandKeys.splice(index,1);
            }
        }
       
        public advanceTime(time: number): void {
//            time = time / 1000;
            this.validateLoadingPopup(time);
            if(!this.isComp) return;

            //var tagRotation: number = this.loadingimg.rotation - this.rotationSpeed;
            //this.loadingimg.rotation = tagRotation;

            this.delay += 0.1;
            this.alpha = this.delay > 1 ? 1 : 0;
        }

        private addStageHandler(evt: egret.Event): void {
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE,this.stageResizeHandler,this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStageHandler,this)
            this.stageResizeHandler(null);
            this.puker_mc.play(-1);
        }
        private removeStageHandler(evt: egret.Event): void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStageHandler,this)
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE,this.stageResizeHandler,this);
        }
        private stageResizeHandler(evt: egret.Event): void {
            this.width = AppGlobal.stageFullWidth;
            this.height = AppGlobal.stageFullHeight;

            //this.loadingimg.x = this.width >> 1;
            //this.loadingimg.y = this.height >> 1;
        }
        public createComplete(event: eui.UIEvent): void {
            this.stageResizeHandler(null);
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE,this.createComplete,this);
            this.isComp = true;
        }  
	}
}
