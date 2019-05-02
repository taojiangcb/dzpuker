/**
 * @author 
 */
module app.mvc {
    export class AppFacade extends puremvc.Facade {
        private static __infcade: AppFacade;
        public constructor() {
            super();
        }
        
        public static getInstance(): AppFacade {
            if(this.__infcade == null) this.__infcade = new AppFacade();
            return <AppFacade><any>(this.__infcade);
        }
    }
}

/***
 * 发送数据
 * */
var __SEND_PARAMVO = function (action: string,
    intValues: Array<number> = [],
    strValues: Array<string> = [],
    longValues: Array<any> = [],
    data: Array<any> = [],
    cbFunc: Function = null,
    thisObj: any = null) {
//    var pramClass = AppGlobal.getMessage("ParamVO");
//    var pram = new pramClass({
//        "intValues": intValues,
//        "strValues": strValues,
//        "longValues": longValues,
//        "data": data
//    });
    var pram = __GET_PARAMVO(intValues,strValues,longValues,data)
    pram.backFun = cbFunc;
    pram.thisObj = thisObj;
    app.mvc.AppFacade.getInstance().sendNotification(action,pram);
}

var __GET_PARAMVO = function(
    intValues: Array<number> = [],
    strValues: Array<string> = [],
    longValues: Array<any> = [],
    data: Array<any> = []):any{
    var pramClass = AppGlobal.getMessage("ParamVO");
    var pram = new pramClass({
        "intValues": intValues,
        "strValues": strValues,
        "longValues": longValues,
        "data": data
    });
    return pram;
}

var __SEND_NOTIFICATION = function (name: string, body?: any, type?: string): void {
    app.mvc.AppFacade.getInstance().sendNotification(name, body, type);
}
var __HAS_NOTIFICATION = function (name: string):boolean{
    return app.mvc.AppFacade.getInstance().hasCommand(name);
}
/**
* 返回protobuf Int64长整型
* */
var __SET_INT64 = function(num:number): any {
    return dcodeIO.Long.fromNumber(num);
}

var __REGISTER_MEDIATOR = function (mediator_cls: any, uiComp: Object = null): void {
    if (mediator_cls.NAME) {
        var mediator: any = new mediator_cls(uiComp);
        app.mvc.AppFacade.getInstance().registerMediator(mediator);
    }
}

var __GET_MEDIATOR = function (mediator_cls: any): any {
    if (mediator_cls.NAME) {
        return app.mvc.AppFacade.getInstance().retrieveMediator(mediator_cls.NAME);
    }
}

var __DISPOSE_MEDIATOR = function (mediator_cls: any): void {
    if (mediator_cls.NAME) {
        (<gameabc.IDisposer>__GET_MEDIATOR(mediator_cls)).dispose();
    }
}

var __REMOVE_MEDIATOR = function (mediator_cls: any): puremvc.IMediator {
    if (mediator_cls.NAME) {
        return app.mvc.AppFacade.getInstance().removeMediator(mediator_cls.NAME);
    }
}

var __REGISTER_PROXY = function (proxy_cls: any, data: Object = null): void {
    if (proxy_cls.NAME) {
        var proxy: any = new proxy_cls(data);
        app.mvc.AppFacade.getInstance().registerProxy(proxy);
    }
}

var __GET_PROXY = function(proxy_cls: any): any {
    if(proxy_cls.NAME) {
        return app.mvc.AppFacade.getInstance().retrieveProxy(proxy_cls.NAME);
    }
}

var __DISPOSE_PROXY = function (proxy_cls: any): void {
    if (proxy_cls.NAME) {
        (<gameabc.IDisposer>__GET_PROXY(proxy_cls)).dispose();
    }
}

var __REMOVE_PROXY = function (proxy_cls: any): puremvc.IProxy {
    if (proxy_cls.NAME) {
        return app.mvc.AppFacade.getInstance().removeProxy(proxy_cls.NAME);
    }
}

var __REGISTER_NET_COMMAND = function(_ACTION_ID:number,CMD_CLS:any):void {
    app.mvc.AppFacade.getInstance().registerCommand(_ACTION_ID.toString(),CMD_CLS);
}

var __REMOVE_NET_COMMAND = function(_ACTION_ID:number):void {
    app.mvc.AppFacade.getInstance().removeCommand(_ACTION_ID.toString());
}

var __REGISTER_COMMAND = function(commandName:string,CMD_CLS:any):void {
    app.mvc.AppFacade.getInstance().registerCommand(commandName,CMD_CLS);
}