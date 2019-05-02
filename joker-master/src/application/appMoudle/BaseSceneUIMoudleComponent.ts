module app.base {
	/**
	 * 窗口模块基础，自动剧中场景显示会有缓动画效果
     * 配合皮肤SceneSkin一起使用方可奏效
	 * @author
	 */
    export class BaseSceneUIMoudleComponent extends BaseUIMoudleComponent { 

        public sceneBase:eui.Component;
        public backButton:eui.Button;
        public titleLabel:eui.Label;
        protected showClose:boolean;
        protected showBottom:boolean;
        protected mTitleText:string;
        
        constructor() {
            super();
            this.showClose = true;
        }
        
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            if(this.sceneBase!=null) {
                this.titleLabel = this.sceneBase["titleLabel"];
                if(this.mTitleText != null && this.titleLabel!=null) {
                    this.titleLabel.text = this.mTitleText;
                }
                this.backButton = this.sceneBase["backButton"];
                this.backButton.visible = this.showClose;
                this.bindButton(this.backButton);
            } else if (this.backButton != null) {
                // 如果皮肤中定义了backButton
                this.bindButton(this.backButton);
            }
        }
        
        protected set titleText(value:string) {
            this.mTitleText = value;
            if(this.titleLabel!=null) {
                this.titleLabel.text = value;
            }
        }

        protected touchHandler(event: egret.TouchEvent): void {
            var tag: egret.DisplayObject = event.currentTarget;
            if(tag==this.backButton) this.close();
            if (tag == this.rect) {
                if(__IS_MOUDLE_OPEN(AppReg.APP_DEBUG)){
                    __CLOSE_MOUDLE(AppReg.APP_DEBUG);
                } else {
                    if (egret.getTimer()-this.rectClickFirstTime>3000||this.rectNumClicks>10) {
                        this.rectClickFirstTime = egret.getTimer();
                        this.rectNumClicks = 1;
                        return;
                    }
                    if (++this.rectNumClicks==10) {
                        app.debug.log("");
                        __OPEN_MOUDLE(AppReg.APP_DEBUG,null,null,null,AppRoot.gameLayer.effectLayer);
                    }
                }
                return;
            }
            this.touchBindButtonHandler(tag);
        }

        rectNumClicks:number = 0;
        rectClickFirstTime:number = 0;
        rect:eui.Rect;
        public addDebugTouch():void {
            this.rect = new eui.Rect(50,100,0);
            this.rect.alpha = 0;
            this.rect.verticalCenter = 0;
            this.addChild(this.rect);
            this.bindButton(this.rect);
        }

        public dispose(): void {
            super.dispose();
            if(this.backButton != null) this.unbindButton(this.backButton);
        }
        
        public get featherSpace():egret.DisplayObjectContainer {
            return AppRoot.gameLayer.panelLayer;
        }
	}
}
