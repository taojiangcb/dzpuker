module preload {
	/**
	 * 这里是preload的四阶段处理
	 * @author taojiang
	 */
	export class PreloadUIMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME: string = "___PreloadUIMediator";
		public constructor() {
            super(PreloadUIMediator.NAME,null);
		}
		
        public listNotificationInterests():Array<string> {
            return [gameabc.UIConstants.PRE_LOAD_PROGRESS,
                gameabc.UIConstants.PRE_LOAD_VISABLE,
                gameabc.UIConstants.PRE_LOAD_COMPLETE,
                gameabc.UIConstants.PRE_BEGIN_LOAD,
                gameabc.UIConstants.pre_ALL_ALOD_COMPLETE];
		}
		
        public handleNotification(notification:puremvc.INotification):void {
		    switch(notification.getName()) {
                case gameabc.UIConstants.PRE_BEGIN_LOAD:
                    __OPEN_PRELOAD();
                    this.preloadBegin(notification);
                    break;
                case gameabc.UIConstants.PRE_LOAD_PROGRESS:
                    this.preloadProgress(notification);
                    break;
                case gameabc.UIConstants.PRE_LOAD_COMPLETE:
                    this.preloadComp(notification);
                    break;
                case gameabc.UIConstants.pre_ALL_ALOD_COMPLETE:
                    this.preload_all_comp();
                    break;
                case gameabc.UIConstants.PRE_LOAD_VISABLE:
                    if(this.preloadGui) this.preloadGui.visible = notification.getBody();
                    break;    
		    }
		}
		
		private preload_all_comp():void {
    		var compfunc = function():void {
                __CLOSE_PRELOAD();
                if(this.preloadGui) this.preloadGui.setProgress(0,0);    		    
    		}
            egret.setTimeout(compfunc,this,1);
		}
		
		private preloadBegin(notification:puremvc.INotification):void {
            if(this.preloadGui) {
                this.preloadGui.preloadData = notification.getBody();
            }
		}
		
		private preloadProgress(notification:puremvc.INotification):void {
            if(this.preloadGui) this.preloadGui.setProgress(notification.getBody()[0],notification.getBody()[1]);
		}
		
		/*
		 * 预置加载完成开启该模块
		 */ 
		private preloadComp(notification:puremvc.INotification):void {
            var preloadData: gameabc.UIPreloadData = notification.getBody();
            if(preloadData) {
                if(preloadData.openingData != null) gameabc.UIManager.openUI.apply(null,preloadData.openingData);
                else gameabc.UIManager.openUI(preloadData.MUIID);                
            }
		}
		
		private get preloadGui():PreloadUIMoudleComp {
            var uiMoudel: gameabc.UIManager = gameabc.UIManager.getCacheUImoudel(__PRELOAD__);
            if(uiMoudel) return <PreloadUIMoudleComp>gameabc.UIManager.getCacheUImoudel(__PRELOAD__).gui;
            return null;
		}
	}
}
