module app {
    export class ChangeStatusCommand extends MoudleCommand {
        sendHandler(data:any, action:string, paramVO:appvos.ParamVO): void {
            switch (action) {
                case app.NetAction.REQ_CHANGE_USER_STATUS:
                    paramVO.intValues = data;
                    // for (var i = 0; i < data.length; i++) {
                    //     console.log(data[i]);
                    // }
                    break;
            }
        }
        resultHandler(action:string, paramVO:appvos.ParamVO): void {
            var consts = app.constant.AppMediatorConst;
            switch (action) {
                case app.NetAction.RESP_CHANGE_USER_STATUS:
                    break;
            }
        }
    }
}