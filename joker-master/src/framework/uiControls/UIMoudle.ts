/**
 *
 * ui管理的基础
 * gui的预置加载管理
 * gui的开启管理
 * gui的关闭管理
 * gui的析构管理
 * @author jiangtao 
 *
 */
module gameabc {

    export class UIMoudleData {
        public uiDestory: number = 0;                 //关闭后释放延迟的时间 -1 永不回收 0立即回收 大于0的n秒之后回收
        public uiAutoClose: boolean = false;          //是否点击空白处自动关闭
        public uiType: number = 1;                    //ui的类型，这个是扩展功能现在思路还不是很清晰（比如窗口组管理)
        public isFullScene: boolean = false;          //是否是全屏化
        public isModal:number = 0;                    //是否有模态遮罩

        /*
         * uimoudle的相关参数
         * @destoryTime 关闭后释放延迟的时间 -1 永不回收 0立即回收 大于0的n秒之后回收(暂没有实现)
         * @autoClose 是否点击空白处自动关闭
         * @type ui的类型，这个是扩展功能现在思路还不是很清晰（比如窗口组管理)
         * @isFullScene 是否是全屏化
         * @isModal 是否有模态遮罩
         */ 
        constructor(destoryTime:number = 0,autoClose:boolean = false,type:number = 1,fullScene:boolean=false,isModal:number = 0) {
            this.uiDestory = destoryTime;
            this.uiAutoClose = autoClose;
            this.uiType = type;
            this.isFullScene = fullScene;
            this.isModal = isModal;
        }
    }

    export class UIMoudle extends egret.EventDispatcher {
        
        public uid: number = 0;                       //但前模块的唯一标识
        public uiState: number = 0;                   //1:ui创建期 2:被打开 3:被关闭了
        public preloadName: string = null;            //开启该模块时的预加载的名称

        private hideMoudes: number[] = [];            //该模块被开启时要被因隐藏的Moudle
        private autoCloseId:number = 0;

        /**
         * 该模块的参数设置
         */
        moduleData:gameabc.UIMoudleData;

        /**
         * 用户界面 ui
         */
        gui: IUIMoudleComponent;

        /**
         * 遮罩模态组件
         */
        modalRect:eui.Rect;

        /**
         *
         * @param ui
         * @param moudleData
         */
        public setUI(ui: IUIMoudleComponent,moudleData: UIMoudleData) {
            this.gui = ui;
            this.moduleData = moudleData;

            //设置全屏化
            if(this.moduleData.isFullScene) {
                this.gui.left = this.gui.right = this.gui.bottom = this.gui.top = 0;
            }
        }
        
        /**
         * @language cn
         * 创建该模块的预置加载，这里会为该模块创建一个preloadName预置的名称
         * 然后由UIpreloadManager进行加载管理处理。
         * 当加载完成之后会调起该模块的open方法开启。
         * 
         * @res            预置加载的资源名称列表
         * @openingData    该功能开启时传入的相关参数具体请参数open()函数的参数列表
         * 
         * @version 1.0
         * @platform web,native
         */ 
        public preload(res:Array<string>,openingData:Array<any> = null):void {
            this.preloadName = this.uid + "__moudle__group__Name";
            var preloadData: UIPreloadData = new UIPreloadData();
            preloadData.preGroupName = this.preloadName;
            preloadData.MUIID = this.uid;
            preloadData.preRes = res;
            preloadData.openingData = openingData;
            //组件该模块内存的预置资源
            this.gui.definePreload(preloadData,this.onPreload);
        }

        /**
         * @language cn
         * 由gui回周该函数才启动预置加载，因为有些资源要走该模块的逻辑才能确定的。
         * @version 1.0
         * @platform web,native
         */
        private onPreload(preloadData:UIPreloadData):void {
            UIPreloadManager.pushOnPreload(preloadData);
        }

        /**
         * @language cn
         * 开启某个功能模块.
         * @data          打开时传入的参数
         * @smartClose    点击空白处是否自动关闭
         * @hideMoudles   该模块被开启时隐藏该列表中的模块显示,为了优化draw
         * @pt            打开时显示的位置，取决于父级容器的相对位置
         * @container     自定义的父级容器
         * @version 1.0
         * @platform web,native
         */ 
        public open(data: Object = null,hideMoudles: number[] = null,pt: egret.Point = null,continer:egret.DisplayObjectContainer = null): void {
            if(this.gui == null) return;
            var point: egret.Point = pt == null ? this.getDefaultPos() : pt;
            
            this.hideMoudes = hideMoudles;

            this.gui.x = point.x;
            this.gui.y = point.y;
            this.gui.setData(data);
            
            if(this.gui.parent == null) {
                if(continer) continer.addChild(this.gui);
                this.gui.addParent();
                //父级容器
                this.parentContent = this.gui.parent;
                //显示开启动画
                this.openSlowAction();
                //显示模态遮罩
                if(this.moduleData.isModal) this.openModal();
            }
            else {
                this.hideOtherMoudels();
            }

            if(this.moduleData.uiAutoClose) {
                var __self = this;
                var callLate = function():void {
                    if(egret.MainContext.instance.stage) {
                        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,__self.onSmartCloseHandler,__self,false);
                    }                                    
                }
                this.autoCloseId = egret.setTimeout(callLate,this,50);
            }
        }

        /**
         * 开启窗口时的缓动动画效果由子级覆盖现实
         */
        protected openSlowAction():void {
        }

        /**
         * 开启模态遮罩,子级可以覆盖实现
         */
        protected openModal():void {
            if(this.parentContent != null) {

                if (this.modalRect == null) {
                  
                    this.modalRect = new eui.Rect();
                    // this.gui.visible = false;
                    // this.modalRect = new eui.Image(AppGlobal.drawStage(0.1));
                    // this.modalRect.smoothing = true;
                    // this.modalRect.alpha = 0.5;
                    // this.gui.visible = true;
                    this.modalRect.left = this.modalRect.right = this.modalRect.top = this.modalRect.bottom = 0;
                    this.modalRect.fillAlpha = 0.4;
                    this.modalRect.fillColor = 0;
                }

                var rectIndex = this.parentContent.getChildIndex(this.gui);
                if(rectIndex > -1) {
                    //rectIndex = Math.max(rectIndex - 1,0);
                    this.parentContent.addChildAt(this.modalRect,rectIndex);
                }
            }
        }

        protected closeModal():void {
            if(this.modalRect) {
                this.modalRect.removeFromParent();
            }
        }

        /**
         * 开启ui时关闭那些互斥的模块
         */
        hideOtherMoudels():void {
            if(this.hideMoudes && this.hideMoudes.length > 0) {
                var moudel: UIMoudle;
                for(var i: number = 0;i != this.hideMoudes.length; i ++) {
                    moudel = __GET_MOUDLE(this.hideMoudes[i]);
                    if(moudel) moudel.hide();
                }
            }
        }

        /**
         * 当此ui模块被半闭时回复那些被关闭的模块
         */
        visulOtherMoudels():void {
            if(this.hideMoudes && this.hideMoudes.length > 0) {
                var moudel: UIMoudle;
                for(var i: number = 0;i != this.hideMoudes.length;i++) {
                    moudel = __GET_MOUDLE(this.hideMoudes[i]);
                    if(moudel) moudel.visible();
                }
            }
        }
        
        /**
         * 清空本模块关联窗口数据
         */ 
        public clearCacheMoudles():void {
            this.hideMoudes = [];
        }

        /**
         * 当前gui的父级容器
         */
        private parentContent: egret.DisplayObjectContainer;

        /**
         * 隐藏显示
         */
        hide():void {
            this.parentContent = this.gui.parent;
            if(this.parentContent) this.gui.removeParent();
            this.uiState = UIConstants.UI_STATE_CLOSE;
            this.closeModal();
        }

        /**
         * 恢复显示
         */
        visible():void {
            if(this.gui.parent == null) {
                if(!this.parentContent) this.parentContent = this.gui.featherSpace;
                if(this.parentContent == this.gui.featherSpace) this.gui.addParent();
                else this.parentContent.addChild(this.gui);
                if(this.moduleData.isModal) this.openModal();
            }
        }
        /**渐显 子类覆盖*/
        public tweenShow(): void{ }
         /**渐隐藏 子类覆盖*/
        public tweenHide(): void{ }
        /**
         * 获取当前默认要显示的坐标位置
         */ 
        protected getDefaultPos(): egret.Point {
            return new egret.Point(0,0);
        }
        
        /**
         * 当uiAutoClose属性为true的时候点击空白处会自动关闭
         */
        protected onSmartCloseHandler(event:egret.TouchEvent):void {
            var rect:egret.Rectangle = new egret.Rectangle();
            rect.width = this.gui.width;
            rect.height = this.gui.height;
            rect.x = this.gui.x;
            rect.y = this.gui.y;
            var pt:egret.Point = new egret.Point(event.stageX,event.stageY);
            if(!rect.containsPoint(pt)) {
                __CLOSE_MOUDLE(this.uid);
            }

            /**
             * 本宝宝又绕坑了
             * hitTestPoint有bug,会把子级容器内的make掉部份也包含进来
             *  比如 scroll里的list 被make的部份依然会被hitTestPoint计算到
             */
            //if(!this.gui.hitTestPoint(event.stageX,event.stageY,false)){
                //__CLOSE_MOUDLE(this.uid);
            //}
        }

        /**
         *
         */
        public close() {
            if(egret.MainContext.instance.stage) {
                egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSmartCloseHandler,this,false);
            }
            if(this.gui) this.gui.removeParent();
            this.visulOtherMoudels();
            if(this.moduleData.isModal) this.closeModal();
        }

        /**
         * 释放
         */
        public dispose(): void {
            if(egret.MainContext.instance.stage) {
                egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSmartCloseHandler,this,false);
            }

            if(this.autoCloseId > 0) {
                egret.clearTimeout(this.autoCloseId);
                this.autoCloseId = 0;
            }
            
            if(this.gui) {
                this.gui.dispose();
            }
            
            if(this.preloadName && this.preloadName != "") {
                RES.destroyRes(this.preloadName,false);
                console.log("destory res " + this.preloadName);
            }

            gameabc.destoryFactory(this.uid);

        }
    }
}
