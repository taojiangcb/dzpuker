/**
 *
 * @author 
 *
 */
class UserExecutor {
	public constructor() {
	}
	
    public login():void {
        egret.ExternalInterface.call("login","");
    }
    
    public callFunction(functionName:string):void {
        egret.ExternalInterface.call("callFunction", functionName);
    }
    
    public callFunctionArray(functionName:string, array:string[]): void {
        var josnList = [];
        for(var i = 0;i < array.length;i++) {
            josnList.push(array[i]);
        }
        
        var json = JSON.parse("{}");
        json.functionName = functionName;
        json.args = josnList;
        var msg = JSON.stringify(json);
        
        egret.ExternalInterface.call("callFunctionWithArgs",msg);
    }
}
