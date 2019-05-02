module gameabc {

    /**
     * UI模块的基础类
     * @author taojiang
     */
    export class UIMoudleComponent extends UICustomComponent implements IUIMoudleComponent {
        /**该模块的控制器*/
        public uiMoudle: UIMoudle;
        /**开启该模块的时候传入的参数*/
        public uiOpenData: any = null;


        //当前模块内部加载的资源列表集合 类似于as3版的loadManager收集当前模块的零时资源加载
//        public loadMgr: UILoadManager = new UILoadManager();
        public constructor() {
            super();
        }

        /*
         * 该模块被开启来的时候会传入该模块处理逻辑时需要的相关参数
         * @val 该模块逻辑数据
         * @version 1.0
         */
        public setData(val: any): void {
//            this.loadMgr.groupName = this.uiMoudle.uid + "__load__group";
            if(this.uiOpenData == val) return;
            this.uiOpenData = val;
            this.invalidateProperties();
        }
        /*该模块被创建完成后的回调函数*/
        public createComplete(event: egret.Event): void {
            this.initialized = true;
            this.uiMoudle.hideOtherMoudels();
            this.opening();
        }
        //析构回调
        public dispose(): void {
            this.removeParent();
//            if(this.loadMgr) this.loadMgr.dispose();
            super.dispose();
        }
        
        //该ui添加到显示对象 子类覆盖次方法
        public addParent(): void {
            if(this.initialized) this.opening();
            if(this.parent==null)  this.featherSpace.addChild(this);
            if(this.initialized ) this.uiMoudle.hideOtherMoudels();
//            __SEND_NOTIFICATION(app.constant.AppMediatorConst.OPEN_MOUDLE,this.uiMoudle.uid);
        }

        //打开界面时处理
        opening():void {}

        //从显示对象移除 子类覆盖次方法
        public removeParent(): void {
            this.removeFromParent();
        }
        /*
         * @language cn
         * definePreload自由组织一些预置的加载数据添加到preloadData.preRes,加载完成之后回调intoloadCb传入preloadData会才开启preload加载。
         * 这里也许有一个网络请求之后才能确定preload的预置加载的内容，所以这里可以把回调放到其它地方进行处理(自由现实该过程)
         * @version 1.0
         * @platform web,native
         */ 
        public definePreload(preloadData: UIPreloadData,intoLoadCb: Function):void {
            intoLoadCb(preloadData); 
        }
        
        //指定父级的容器
        public get featherSpace(): egret.DisplayObjectContainer {
            return AppRoot.gameLayer.panelLayer;//egret.MainContext.instance.stage;
        }
    }
    

    /*
     * 模块内部资源加载组管理
     */ 
    export class UILoadManager implements IDisposer {
        private keys: string[] = [];
        public groupName: string = "";
        
        public onPush(key:string):void {
            this.keys.push(key);
            RES.createGroup(this.groupName,this.keys);
        }
        
        public onLoad(compFunc:Function,thisObj:Object) {
        }
        
        /*
         * 清空资源
         */ 
        public dispose() {
            if(this.groupName && this.groupName.length > 0) {
                RES.destroyRes(this.groupName,false);                
            }
        }
    }
}
