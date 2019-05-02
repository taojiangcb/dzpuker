module app {
    export class DzFeedAddCommand extends HttpCommand {

        sendHandler(data: any,action: string,paramVO: appvos.ParamVO): void {
            
            switch(action) {
                case app.NetAction.DZ_FEEDBACK_ADD:
                     paramVO.data=[data];
                     paramVO.longValues = [user.getProxy().svrRoleId]
                    break;

            }
        }
        
        resultHandler(action: string,paramVO: appvos.ParamVO): void {
            switch(action)
            {
                case app.NetAction.DZ_FEEDBACK_ADD:
                    if(paramVO&&paramVO.intValues[0]==1)
                    {
                        tip.popSysCenterTip("举报成功",tip.TIPS_TYPE.TIPS_CORRECT);
                    } else if(paramVO==null || paramVO.intValues[0] == -1) {
                        tip.popSysCenterTip("举报失败",tip.TIPS_TYPE.TIPS_WARNING);
                    }
                break;
                
            }
           
            
            
        }
    }
}
