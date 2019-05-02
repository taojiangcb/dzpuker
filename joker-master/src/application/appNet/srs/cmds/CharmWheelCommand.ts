module app {
    export class CharmWheelCommand extends MoudleCommand {
        sendHandler(data:any, action:string, paramVO:appvos.ParamVO): void {
            switch (action) {
                case app.NetAction.REQ_CHARM_WHEEL:
                    break;
                case app.NetAction.REQ_CHARM_WHEEL_LIST:
                    paramVO.longValues = [data];
                    break;
            }
        }
        resultHandler(action:string, paramVO:appvos.ParamVO): void {
            var consts = app.constant.AppMediatorConst;
            switch (action) {
                case app.NetAction.RESP_CHARM_WHEEL:
                    if (paramVO != null) {
                        var data1: number = paramVO.intValues[0] - 1;
                        __SEND_NOTIFICATION(consts.CHARM_WHEEL_START, data1);
                    }
                    break;
                case app.NetAction.RESP_CHARM_WHEEL_LIST:
                    // console.log(paramVO.longValues.length);
                    // console.log(paramVO.longValues);
                    // console.log(paramVO.intValues);
                    // console.log(paramVO.strValues);
                    if (paramVO != null && paramVO.strValues.length > 0) {
                        if (paramVO.strValues[0] == user.getProxy().svrName) {
                            for (var i = 0; i < paramVO.intValues.length; i++) {
                                paramVO.intValues[i]--;
                            }
                            __SEND_NOTIFICATION(consts.CHARM_WHEEL_MY_RECORD, paramVO.intValues);
                        } else {
                            var data2: any[] = [];
                            for (var i = 0; i < paramVO.strValues.length; i++) {
                                var value: Object = {
                                    name: paramVO.strValues[i],
                                    item: paramVO.intValues[i] - 1
                                }
                                data2.push(value);
                            }
                            __SEND_NOTIFICATION(consts.CHARM_WHEEL_OTHER_RECORD, data2);
                        }
                    } else {
                        __SEND_NOTIFICATION(consts.CHARM_WHEEL_NO_RECORD);
                    }
                    break;
            }
        }
    }
}