module app {
    export class DealerListCommand extends MoudleCommand {
        sendHandler(data: any,action: string,paramVO: appvos.ParamVO): void {
            switch(action) {
                case app.NetAction.REQ_DEALER_INFO:
                    paramVO.longValues[0] = data;
                    break;
            }
        }
        resultHandler(action: string,paramVO: appvos.ParamVO): void {
            var consts = app.constant.AppMediatorConst;
            switch(action) {
                case app.NetAction.RESP_DEALER_INFO:
                    var data = new appvos.DealerInfoVO(paramVO.data[0]);
                    __SEND_NOTIFICATION(consts.DEALERINFO_UPDATE, data);
                    break;
                case app.NetAction.RESP_DEALER_LIST:
                    var dataArray: any[] = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.DealerInfoVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.DEALERLIST_UPDATE, dataArray);
                    break;
                case app.NetAction.RESP_DEALER_FOCUS_LIST:
                    var dataArray: any[] = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.DealerInfoVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.DEALERFOCUSLIST_UPDATE, dataArray);
                    break;
                case app.NetAction.RESP_DEALER_FOCUS:
                    tip.popSysCenterTip("关注荷官成功");
                    break;
            }
        }
    }
}