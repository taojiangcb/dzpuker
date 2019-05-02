/**
 *
 * @author 
 *
 */
class PlatformExecutor {
    
    private static listenr: Function;
    private static lisObj: any = null;
    
	public constructor() {
        egret.ExternalInterface.addCallback("androidCallBack",function(message: string) {
            console.log("recv native call back msg:" + message);
            var json = JSON.parse(message);
            console.log("android callBack has this ? " + PlatformExecutor.lisObj==null);
            PlatformExecutor.listenr.call(PlatformExecutor.lisObj, json.code, json.msg);
        });
	}
	
	public init():void {
        egret.ExternalInterface.call("init", "");
	}
	
    public setListener(listenr: Function, thisObj:any):void {
        PlatformExecutor.listenr = listenr;
        PlatformExecutor.lisObj = thisObj;
        egret.ExternalInterface.call("setListener","");
    }
    
    public androidCallBack(msg:string):void {
        var json = JSON.parse(msg);
        PlatformExecutor.listenr.call(PlatformExecutor.lisObj, json.code, json.msg)
    }
}
