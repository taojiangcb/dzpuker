module app {
    
     export class ProtobuffCommand extends puremvc.SimpleCommand {
                
        type:string;

        recvMessageVO:appvos.MessageVO;
        recvParamVO:appvos.ParamVO;
        
        sendMessageVO:any;
        sendParamVO:appvos.ParamVO;
        
        sendHandler(data:any, action:string, paramVO:appvos.ParamVO): void {
            //抽象函数保持空，可减少子类忽略super引发的错误
        }
        
        resultHandler(action:string, paramVO:appvos.ParamVO):void {
            //抽象函数保持空，可减少子类忽略super引发的错误
        }
	}
}
