module app.debug {
	
    export function log(str:string):void {
        __GET_PROXY(DebugProxy).log(str);
    }
    
    export class DebugProxy extends app.mvc.AbsractProxy {
        
        static NAME = "DebugProxy";
        
        constructor() {
            super(DebugProxy.NAME);
        }
        
        message:string = "";
        max:number = 500;
                    
        log(str:string) :void {
            this.message += str + "\r";
            if (this.message.length > this.max) {
                var subStart = this.message.indexOf("\r",this.message.length-this.max);
                this.message = this.message.substr(subStart+1);
            }
            this.sendNotification(app.constant.AppMediatorConst.LOG_DEBUG,this.message);
        }
        
        
    }
}
