module app {
    export class TimerStepParam {
        stepFunc:Function; //步频回调函数
        overFunc:Function; //结束回调函数
        thisObj:Object; //回调函数this指针
        stepNoif:string; //步频事件
        overNoif:string; //结束事件
        step:number; //步频间隔
        cacheTime:number=0; //缓存时间(使用本地时间，机制内部使用)
        currTime:number=0; //即时时间(使用本地时间)
        startTime:number=0; //开始时间(使用本地时间)
        overTime:number=0; //结束时间(使用本地时间)
        data:any; //附带数据
        // id:string; //id标志，搜索用，暂未实现
    }
}
