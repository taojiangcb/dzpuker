/**
 *
 * 模块预置加载管理，每个一预置加载都会有以三个个阶段这三个阶段分别会派发notification消息给PreloadMediator处理
 *    1. PRE_BEGIN_LOAD 开始加载 带有正加载加的数据信息UIPreloadData参数
 *    2. PRE_LOAD_PROGRESS 当前加载的进度 [load:total]
 *    3. PRE_LOAD_COMPLETE 加载完成
 * version 1.0;
 * platform web,native
 * @author taojiang
 *
 */
module gameabc {
    export class UIPreloadManager {
        
        //通用资源组名
        public static UI_ASSETS_NAME: string = "";
        
        /**要加载的资源列表*/
        private static uipreCache: Array<UIPreloadData> = new Array<UIPreloadData>();
        private static currentLoad: UIPreloadData;
        private static countGroupError: number = 0;
        /** 加载产出错误后重试的最大次数 */ 
        public static MAX_LOAD_ERROR_TIME: number = 3;
        public constructor() {
        }
        
        public static pushOnPreload(data:UIPreloadData) {
            if(!data) return;
            var i: number = 0;
            for(i = 0;i != this.uipreCache.length; i++) {
                var item: UIPreloadData = this.uipreCache[i];
                if(item && item.preGroupName == data.preGroupName) {
                    return;
                }
            }
            this.uipreCache.push(data);
            this.onNextload();    //开始下载
        }
        
        /*
         * 开始加载或加载下一条
         */ 
        private static onNextload():void {
            var self: any = this;
            //加载通用资源组
            if(UIPreloadManager.UI_ASSETS_NAME.length > 0 && !RES.isGroupLoaded(UIPreloadManager.UI_ASSETS_NAME)) {
                app.mvc.AppFacade.getInstance().sendNotification(UIConstants.PRE_BEGIN_LOAD);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,self.onResourceLoadComplete,self);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,self.onResourceProgress,self);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,self.onResourceLoadErr,self);
                RES.loadGroup(UIPreloadManager.UI_ASSETS_NAME);
                return;
            }
            
            if(this.currentLoad) return;
            if(this.uipreCache.length > 0) {
                this.currentLoad = this.uipreCache.shift();
                var next:any = function():void {
                    app.mvc.AppFacade.getInstance().sendNotification(UIConstants.PRE_LOAD_COMPLETE,self.currentLoad);
                    self.currentLoad = null;
                    //开始加载下一个预置
                    self.onNextload();
                };

                var load:any = function():void {
                    self.countGroupError = 0;
                    app.mvc.AppFacade.getInstance().sendNotification(UIConstants.PRE_BEGIN_LOAD,self.currentLoad);
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,self.onResourceLoadComplete,self);
                    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,self.onResourceProgress,self);
                    RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,self.onResourceLoadErr,self);
                    RES.loadGroup(self.currentLoad.preGroupName);
                };
                
                if(this.currentLoad.preRes == null || this.currentLoad.preRes.length == 0)            next();
//                else if(RES.isGroupLoaded(this.currentLoad.preGroupName))                             next();
                else if(RES.createGroup(this.currentLoad.preGroupName,this.currentLoad.preRes,true))  load();
                else if(RES.getGroupByName(this.currentLoad.preGroupName).length > 0)                 load();
                
            } else {
                //全部load完成
                this.currentLoad = null;
                app.mvc.AppFacade.getInstance().sendNotification(UIConstants.pre_ALL_ALOD_COMPLETE);
                this.clearListener();
            }
        }
        
        private static onResourceLoadComplete(event:RES.ResourceEvent):void {
            if(event.groupName == UIPreloadManager.UI_ASSETS_NAME) {
                this.currentLoad = null;
                //开始加载预置
                this.onNextload();
            }
            else if(this.currentLoad!=null&&event.groupName == this.currentLoad.preGroupName) {
                app.mvc.AppFacade.getInstance().sendNotification(UIConstants.PRE_LOAD_COMPLETE,this.currentLoad);
                this.currentLoad = null;
                //开始加载下一个预置
                this.onNextload();
            }
        }
        
        private static onResourceProgress(event: RES.ResourceEvent): void {
            app.mvc.AppFacade.getInstance().sendNotification(UIConstants.PRE_LOAD_PROGRESS,[event.itemsLoaded,event.itemsTotal]);
//            if(event.groupName == this.currentLoad.preGroupName) {
//                app.mvc.AppFacade.getInstance().sendNotification(UIConstants.PRE_LOAD_PROGRESS,[event.itemsLoaded,event.itemsTotal]);
//            }
        }
        
        private static onResourceLoadErr(event: RES.ResourceEvent): void {
            if(++this.countGroupError < this.MAX_LOAD_ERROR_TIME) {
                RES.loadGroup(event.groupName);
            } else {
                this.clearListener();
                //加载失败关闭该模块

                console.log("网络不稳定引响预置加载:" + this.currentLoad.preGroupName  + "失败!");
                if(event.resItem) {
                    tip.popSysCenterTip(event.resItem.name + "加载失败");
                }
                tip.popSysBottomTip("网络不稳定引响预置加载:" + this.currentLoad.preGroupName  + "失败!")
                UIManager.closeUI(this.currentLoad.MUIID);
                this.currentLoad = null;
                this.onNextload();               //开始下一个
            }
        }
        
        private static clearListener(): void {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadErr,this)
        }
    }
    
    export class UIPreloadData {
        public MUIID:number = 0;                           //模块id
        public preGroupName:string = "";                   //预置装载的名称(也就是groupName)
        public preRes:Array<string> = null;
        public openingData:Array<any> = null;
    }
}
