module app.base {
	/**
	 * 窗口模块基础，自动剧中场景显示会有缓动画效果
	 * @author
	 */
    export class BaseWndUIMoudleComponent extends BaseUIMoudleComponent { 

//        private windowBase: eui.Component;
        private tmTween: egret.Tween;

        constructor() {
            super();
            //剧中
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
        }

        // public addParent():void {
        //    super.addParent();
            // this.alpha = 0;
            // if(this.tmTween) egret.Tween.removeTweens(this);// this.tmTween.paused(true);
            // this.tmTween = egret.Tween.get(this).to({ alpha: 1 },200).call(this.openTweenComple,this)

        // }
        
        // protected openTweenComple():void {
        //     this.tmTween = null;
//            console.log(that);
        // }
        
        // public close(evt: any = null): void {
        //     if(this.tmTween) egret.Tween.removeTweens(this);
        //     this.tmTween = egret.Tween.get(this).to({ alpha: 0 },200).call(this.closeTweenComp,this)
        // }
        
        // private closeTweenComp():void {
        //     this.tmTween = null;
        //     __CLOSE_MOUDLE_UI(this);
        // }
        
        
        
        // public dispose(): void {
        //     if (this.tmTween) {
        //         egret.Tween.removeTweens(this);// this.tmTween.paused(true);
        //         this.tmTween = null;
        //     }

        //     super.dispose();
        // }

        
        public get featherSpace():egret.DisplayObjectContainer {
            return AppRoot.gameLayer.panelLayer;
        }
	}
}
