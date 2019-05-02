module app {
    export class MobileValidateCommand extends MoudleCommand {
        sendHandler(data: any,action: string,paramVO: appvos.ParamVO): void {
            switch(action) {
                case app.NetAction.REQ_PHONE_VALIDATE:
                    paramVO.strValues[0] = data[2];//key
                    paramVO.longValues[0] = Number(data[1]);//code
                    paramVO.intValues[0] = Number(data[0]);//phone
                    break;
            }
        }
        resultHandler(action: string,paramVO: appvos.ParamVO): void {
            var consts = app.constant.AppMediatorConst;
            switch(action) {
                case app.NetAction.RESP_PHONE_VALIDATE:
                    break;
            }
        }
    }
}