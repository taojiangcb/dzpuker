
module gameabc {

    /**
     * @language zh_cn
     * UIManager是功能模块管理类
     * @author taojiang
     * @version 1.0
     * @platform web,native
     */
    export class UIManager {
        private static impl:UIManagerImpl;
        public static internalCall:Boolean = false;

        public constructor() {
            throw new Error("此类不能够被实例化")
        }

        public static get instance():UIManagerImpl {
            if (!UIManager.impl) {
                UIManager.internalCall = true;
                UIManager.impl = new UIManagerImpl();
                UIManager.internalCall = false;
            }
            return UIManager.impl;
        }

        /*
         * @language zh_cn
         * 注册一个模块到管理中来
         * @UIID 模块的唯一ID
         * @uicls UI的功能现实主类 class
         * @uiMoudle ui功能的管理操作类 
         * @uiMoudleData ui管理操作类需要的参数
         * @version 1.0
         * @platfrom web,native
         */
        public static registerUI(UIID:number, uicls:any, uiMoudle:any, moudleData:UIMoudleData = null):void {
            UIManager.instance.registerUI(UIID, uicls, uiMoudle, moudleData)
        }

        /*
        * @language cn
        * 预置加载静态资源之后再开启该模块,该资源是在Resdeop工具中生成的
        *  *注意这里并不是加载group而是把多少group合并成一个新的group进行装载会生成一个新的groupanme
        * @UIID 该模块ID
        * @openingData 开启时需要传给open函数的相关参数
        * @version 1.2
        * @platform web,native
        * */
        public static preloadOpen(uiid: number,openingData:Array<any> = null):void {
            UIManager.instance.preloadOpen(uiid,openingData);
        }


         /*
         * @language zn_cn
         * 开启该模块功能
         * @uid      该模块id
         * @pt       显示的坐标
         * @Object   开启时传入的参数
         * @hideMoudles 该模块被开启时隐藏该列表中的模块显示,为了优化draw
         * @version 1.0
         * @platform web,native
         */
        public static openUI(uid:number,
                             data:Object = null,
                             hideMoudes:number[] = null,
                             pt:egret.Point = null,
                             continer:egret.DisplayObjectContainer = null):void {
            UIManager.instance.openUI(uid,data,hideMoudes, pt, continer);
        }

        /*
         * @language zh_cn
         * 开启一个被注册过的模块
         * @uiID 模块ID
         * @version 1.0
         * @platform web,native
         */
        public static getCacheUImoudel(uiId:number):UIMoudle {
            return UIManager.instance.getCacheUIMoudle(uiId);
        }

        public static closeUI(uid:number) {
            UIManager.instance.closeUI(uid);
        }
        
        /**
         * 全部关闭 只开id
         * @param openuid  打开的id null =全部关闭
         * @param except 关闭全部时，此数组内的界面不关。
         */
        public static closeALLOpenUI(openuid: number = null,data: Object = null,except:number[]=null) {
            var allui = UIManager.instance.openList.concat();
            var uid:number;
            for(var i: number = allui.length-1;i>-1;i--){
                uid = allui[i];
                if (uid == openuid || (except!=null&&except.indexOf(uid)!=-1) ) {
//                    openuid = null;
                    continue;
                } else {
                    if (uid == __PRELOAD__) {
                        __CLOSE_PRELOAD(true);
                    } else {
                        UIManager.instance.closeUI(uid, true);
                    }
                }
            }
            if(openuid!=null) {
                __OPEN_PRE_MOUDLE(openuid,data);
                //UIManager.instance.preloadOpen(openuid);
            }
                
        }
        public static close(ui: IUIMoudleComponent) {
            UIManager.instance.close(ui);
        }
        
        
        /**
         * 判断模块是否被开启
         */
        public static isOpened(uiid:number):boolean {
            var i = UIManager.instance.openList.length;
            while (--i > -1) {
                if (UIManager.instance.openList[i]==uiid) {
                    var uiModule:gameabc.UIMoudle = this.getCacheUImoudel(uiid);
                    return uiModule.uiState == gameabc.UIConstants.UI_STATE_OPEN;
                    //return true;
                }
            }
            return false;
        }
    }

    export class UIManagerImpl {
        private regMap:Object;                  //注册缓存
        private uiMap:Object;                   //实例缓存
        public openList:number[];               //被开启的模块缓存
        public constructor() {
            if (!UIManager.internalCall) throw new Error("此类不能被直接使用,请使用UIManager");
            this.regMap = new Object();
            this.uiMap = new Object();
            this.openList = [];
        }

        /*
         * @language zh_cn
         * 注册一个ui模块
         * @UIID 该模块的id
         * @uicls 该模块的ui组件&组件逻辑
         * @uiMoudel 该模块的控制逻辑
         * @version 1.0
         * @platform web,native
         */
        public registerUI(UIID:number, uicls:any, uiMoudle:any, moudleData:UIMoudleData = null):void {
            this.regMap[UIID] = new UICache(UIID, uicls, uiMoudle, moudleData);
        }


        /*
         * @language cn
         * 预置加载该模块之后再开启该模块
         * @UIID 模块id
         * @staticRes 静态的预置资源
         * @openingData 开启时要传给open函数的相关参数
         * @version  1.0
         * @platform web,native
         */
        private preloadOpen__(UIID:number, staticRes:Array<string> = null, openingData:Array<any> = null):void {
            var uiModel:UIMoudle = this.createUI(UIID);
            if (uiModel) {
                if (uiModel.uiState != UIConstants.UI_STATE_OPEN) {
                    uiModel.uiState = UIConstants.UI_STATE_PRELOAD;
                    uiModel.preload(staticRes, openingData);
                } else {
                    if( uiModel.gui.parent)
                         uiModel.gui.parent.setChildIndex(uiModel.gui,uiModel.gui.parent.numChildren-1);
                }
            }
        }

        /*
        * @language cn
        * 预置加载静态的资源之后再开启该模块,该资源是在Resdeop工具中生成的
        *     *注意这里并不是加载group而是把多少group合并成一个新的group进行装载会生成一个新的groupanme
        * @UIID 该模块ID
        * @openingData 开启时需要传给open函数的相关参数
        * @version 1.2
        * @platform web,native
        * */
        public preloadOpen(UIID:number,openingData:Array<any> = null):void {
            var resKey: Array<string> = [];
            var groupNames: Array<string> = UIConstants.PRE_MOUDLE_RES_GROUP[UIID];
            var otherRes: Array<string> = UIConstants.PRE_MOUDLE_RES[UIID];
            
            var it: number = groupNames ? groupNames.length : -1;
            while(--it > -1) {
                var groupItems: Array<RES.ResourceItem> = RES.getGroupByName(groupNames[it]);
                var len: number = groupItems ? groupItems.length : 0;
                for(var i: number = 0;i != len;i++) {
                    resKey.push(groupItems[i].name);
                }
            }
            
            it = otherRes ? otherRes.length : -1;
            while(--it > -1) resKey.push(otherRes[it]);
            this.preloadOpen__(UIID,resKey,openingData);
        }

        /*
         * @language zn_cn
         * 开启该模块功能
         * @uid      该模块id
         * @pt       显示的坐标
         * @Object   开启时传入的参数
         * @hideMoudles 该模块被开启时隐藏该列表中的模块显示,为了优化draw
         * @version 1.0
         * @platform web,native
         */
        public openUI(uid:number, data:Object = null, hideMoudles:number[] = null,pt:egret.Point = null, continer:egret.DisplayObjectContainer = null):void {
            var uiModel:UIMoudle = this.createUI(uid);
            if (uiModel) {
                uiModel.open(data,hideMoudles,pt, continer);
                uiModel.uiState = UIConstants.UI_STATE_OPEN;
            }
        }

        /*
         * 关闭一个ui模块 通过id
         * @version 1.0
         * @platform web,native
         * 
         * destory: 是否清空关联模块关系
         */
        public closeUI(uid:number, destory:boolean = false):void {
            var uiModel:UIMoudle = this.uiMap[uid];
            if (uiModel) {
                if(destory) {
                    uiModel.clearCacheMoudles();    
                }
                
                uiModel.close();
                uiModel.uiState = UIConstants.UI_STATE_CLOSE;
                if (uiModel.moduleData.uiDestory == 0) {
                    this.destoryUI(uid);
                }
                
                for(var i: number = 0,len: number = this.openList.length;i < len;i++) {
                    if(this.openList[i] == uid){
                        this.openList.splice(i,1);
                        break;
                    }
                }
            }
        }
        /*
         * 关闭一个ui模块
         * @version 1.0
         * @platform web,native
         */
        public close(ui: IUIMoudleComponent):void{
            for(var uid in this.uiMap){
                if(this.uiMap[uid].gui == ui){
                    var id: number = Number(uid) 
                    this.closeUI(id);
                    return;
                }
            }
        }
        
        private destoryUI(uid:number):void {
            var uiModel:UIMoudle = this.uiMap[uid];
            if (uiModel) {
                if (uiModel.uiState == UIConstants.UI_STATE_OPEN) {
                    uiModel.close();
                    uiModel.uiState = UIConstants.UI_STATE_CLOSE;
                }
                uiModel.dispose();
                delete this.uiMap[uid]
            }
        }

        /*
         * 获取缓存中的一个模块
         * @version 1.0
         * @platform web,native
         */
        public getCacheUIMoudle(uid:number):UIMoudle {
            return this.uiMap[uid];
        }

        /*
         * 创建一个功能模块
         * @version 1.0
         * @platform web,native
         */
        private createUI(uid:number):UIMoudle {
            var uiModel:UIMoudle = this.uiMap[uid];
            if (uiModel == null) {
                var uiCache:UICache = this.regMap[uid];
                if (uiCache != null) {
                    var uiComponent:UIMoudleComponent = new uiCache.UIClass();
                    var uiMoudel:UIMoudle = new uiCache.ControlCls();
                    uiMoudel.uiState = UIConstants.UI_STATE_CREATE;
                    uiMoudel.uid = uid;
                    uiMoudel.setUI(uiComponent, uiCache.moudleData);
                    
                    uiComponent.uiMoudle = uiMoudel;
                    
                    this.uiMap[uid] = uiMoudel;
                }
            }
            for(var i: number = 0,len: number = this.openList.length;i < len;i++) {
                if(this.openList[i] == uid) {                 
                    break;
                }
            }
            if(i == len){
                this.openList.push(uid);
            }
            return this.uiMap[uid];
        }
        /**获取打开的窗口列表 */
        public getOpenList(except: number[]): number[] {
            var arr = this.openList;
            var out: number[] = [];
            var aid: number;
            for (var i: number = 0, len: number = arr.length; i < len; i++) {
                aid = arr[i]
                if (except==null||except.indexOf(aid) == -1) {
                    out.push(aid);
                }
            }
            return out;
        }
    }

    export class UICache {
        public uid:number = 0;
        public UIClass:any = null;
        public ControlCls:any = null;
        public moudleData:UIMoudleData = null;

        public constructor(id:number, ui:any, controls:any, moudleData:UIMoudleData = null) {
            this.uid = id;
            this.UIClass = ui;
            this.ControlCls = controls;
            this.moudleData = moudleData;
        }
    }
}

var __PRELOAD__:number = 10000;
var preload_count:number = 0;
var __OPEN_PRELOAD = function():void {
    preload_count++;
    if(preload_count > 0) {
        __OPEN_MOUDLE(__PRELOAD__);
    }
}

var __CLOSE_PRELOAD = function(force:boolean = false):void {
    // if(force) {
         preload_count = 0;
        __CLOSE_MOUDLE(__PRELOAD__);
    // }
    // else {
    //       preload_count--;
    //         if(preload_count <= 0) {
    //             preload_count = 0;
    //             __CLOSE_MOUDLE(__PRELOAD__);
    //         }
    // }
  
}

var __REGISTER_MOUDLE = function(UIID: number,uicls: any,uiMoudle: any,moudleData:gameabc.UIMoudleData = null): void {
    gameabc.UIManager.registerUI(UIID,uicls,uiMoudle,moudleData);
}

var __OPEN_MOUDLE = function(uid: number,data: Object = null,hideMoudles: number[] = null,pt: egret.Point = null,continer: egret.DisplayObjectContainer = null): void {
    gameabc.UIManager.openUI(uid,data,hideMoudles,pt,continer);
}

var __OPEN_PRE_MOUDLE = function(uid: number,data: Object = null,hideMoudles: number[] = null,pt: egret.Point = null,continer: egret.DisplayObjectContainer = null):void {
    gameabc.UIManager.preloadOpen(uid,[uid,data,hideMoudles,pt,continer]);
}

var __CLOSE_MOUDLE = function(uid:number) {
    gameabc.UIManager.closeUI(uid);
}

var __CLOSE_ALLMOUDLE_OPEN = function(uid: number=null,data: Object = null, except:number[]=null) {
    gameabc.UIManager.closeALLOpenUI(uid,data,except);
}

var __CLOSE_MOUDLE_UI = function(ui:gameabc.IUIMoudleComponent) {
    gameabc.UIManager.close(ui);
}

var __GET_MOUDLE = function (uiid:number):gameabc.UIMoudle {
    return gameabc.UIManager.getCacheUImoudel(uiid);
}

var __GET_MOUDLE_COMP = function(uiid:number):gameabc.IUIMoudleComponent {
    var moudle: gameabc.UIMoudle = __GET_MOUDLE(uiid);
    return moudle ? moudle.gui : null;
}

var __IS_MOUDLE_OPEN = function(UIID: number): boolean {
    return gameabc.UIManager.isOpened(UIID);
}