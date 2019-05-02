
module gameabc {
    /**
     *
     * @author 
     *
     */
    export interface IUIMoudleComponent extends eui.UIComponent,IDisposer{
        setData(val: Object): void;                            //该ui的参数
        createComplete(event: egret.Event): void;              //该ui创建完成之后产生的回调
        featherSpace: egret.DisplayObjectContainer;            //该ui的显示容器
        addParent(): void;                                    //该ui添加到显示对象
        removeParent(): void;                                  //该显示对象从父窗口移除
        opening(): void;                                       //打开界面时候处理
        /*
         * 该模块动态组识预置的资源加载,由于预置资源可能需要读取远程服务器数据后才能确定，所以这里在组识之后会产后一个回调将preloadData传给PreloadManager处理
         * definePreload自由组织一些预置的加载数据添加到preloadData.preRes
         */ 
        definePreload(preloadData:UIPreloadData,intoLoadCb:Function):void                          
    }    
}

