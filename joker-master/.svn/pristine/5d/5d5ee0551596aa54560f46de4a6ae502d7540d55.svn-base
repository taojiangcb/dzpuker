module app {
    export class PlayRecordCommand extends HttpCommand {

         sendHandler(data:any, action:string, paramVO:appvos.ParamVO): void {
            
             if (app.NetAction.DZ_RECODE_GETVO == action||app.NetAction.DZ_FEEDBACK_GETVO==action) {//获取数据
                 paramVO.longValues = [data];
           }
        }
        resultHandler(action: string, paramVO: appvos.ParamVO): void {
            switch(action)
            {
                case app.NetAction.DZ_RECORD_ADD:
                    if(paramVO&&paramVO.intValues[0]==1)
                    {
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_ADD"),tip.TIPS_TYPE.TIPS_CORRECT);
                        record.getProxy().indexDate.id = paramVO.longValues[0];
                        record.getProxy().collRecord.push(record.getProxy().indexDate)
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_RECORD_DATA);
                    }else  tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_ADD_ERROR"),tip.TIPS_TYPE.TIPS_WARNING);
                break;
                case app.NetAction.DZ_RECORD_DEL:
                    if(paramVO && paramVO.intValues[0]==1)
                    {
                        record.getProxy().removeTableById(this.sendParamVO.longValues[0])
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_RECORD_DATA);
                    }
                   
                    break;
                case app.NetAction.DZ_RECORD_GET_MANY:
                    if(paramVO && paramVO.intValues[0] == 1) {
                        for(var i = 0;i < paramVO.data.length;i++) {
                            var vo = new appvos.DZRecordVO(paramVO.data[i]);
                            record.getProxy().collRecord.push(vo);
                        }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_RECORD_DATA);
                    }
                    break;
                case app.NetAction.DZ_RECODE_GETVO://获取收藏回放数据
                case app.NetAction.DZ_FEEDBACK_GETVO://获取举报回放数据
                    if(paramVO &&paramVO.data.length>0) {
                       var video = new appvos.PlayCardsVideoVO(paramVO.data[0]);
                        record.getProxy().playVideo(video);
                    } else {
                        var mess: string = gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_GET_ERROR");
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.LOGIN_MESS,mess);
                        tip.popSysCenterTip(mess,tip.TIPS_TYPE.TIPS_WARNING);//获取数据失败
                    } 
                    break;   
            }
           
            
            
        }
    }
}
