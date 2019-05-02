module app {
    export class BillCommand extends MoudleCommand {
        sendHandler(data:any, action:string, paramVO:appvos.ParamVO): void {
            switch (action) {
                case app.NetAction.REQ_BILL_GET:
                    break;
                default:
                    break;
            }
        }
        resultHandler(action:string, paramVO:appvos.ParamVO): void {
            switch (action) {
                case app.NetAction.RESP_BILL_GET:
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_BILL, paramVO);
                    break;
                default:
                    break;
            }
        }
    }
}