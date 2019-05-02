module app {
    export class TreasureCommand extends MoudleCommand {
        sendHandler(data:any, action:string, paramVO:appvos.ParamVO): void {
            switch (action) {
                case app.NetAction.REQ_GET_TREASURES:
                case app.NetAction.REQ_GET_OPEN_TREASURES:
                case app.NetAction.REQ_GET_MY_ALL_TREASURES:
                case app.NetAction.REQ_GET_MY_NOW_TREASURES:
                case app.NetAction.REQ_MY_GET_REWARD_RECORD:
                    break;
                case app.NetAction.REQ_DO_TREASURE:
                    paramVO.longValues[0] = data[0];
                    paramVO.intValues[0] = data[1];
                    break;
                case app.NetAction.REQ_MY_GET_REWARD:
                    paramVO.longValues[0] = data;
                    break;
                case app.NetAction.REQ_TREASURE_RECORDS:
                    paramVO.longValues[0] = data;
                    break;
            }
        }
        resultHandler(action:string, paramVO:appvos.ParamVO): void {
            var consts = app.constant.AppMediatorConst;
            switch (action) {
                case app.NetAction.RESP_GET_TREASURES:
                    var data: any = new appvos.TreasureInfoVO(paramVO.data[0]);
                    __SEND_NOTIFICATION(consts.TREASURE_GET_TREASURES, data);
                    break;
                case app.NetAction.RESP_DO_TREASURE:
                    if (paramVO.data.length > 0) {
                        var dataArray: any[] = [];
                        for (var i = 0; i < paramVO.data.length; i++) {
                            var data: any = new appvos.TreasureRecordVO(paramVO.data[i]);
                            dataArray.push(data);
                        }
                        __SEND_NOTIFICATION(consts.TREASURE_DO_TREASURE, dataArray);
                    }
                    break;
                case app.NetAction.RESP_GET_OPEN_TREASURES:
                    var dataArray: any[] = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data: any = new appvos.TreasureVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_OPEN_TREASURES, dataArray);
                    break;
                case app.NetAction.RESP_GET_MY_ALL_TREASURES:
                    var dataArray: any[] = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data: any = new appvos.TreasureRecordVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_GET_MY_ALL_TREASURES, dataArray);
                    break;
                case app.NetAction.RESP_GET_MY_NOW_TREASURES:
                    var dataArray: any[] = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data: any = new appvos.TreasureVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_GET_MY_NOW_TREASURES, dataArray);
                    break;
                case app.NetAction.RESP_MY_GET_REWARD_RECORD:
                    var dataArray: any[] = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data: any = new appvos.TreasureRecordVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_MY_GET_REWARD_RECORD, dataArray);
                    break;
                case app.NetAction.RESP_MY_GET_REWARD:
                    var data: any = paramVO.intValues[0];
                    __SEND_NOTIFICATION(consts.TREASURE_MY_GET_REWARD, data);
                    break;
                case app.NetAction.RESP_TREASURE_RECORDS:
                    var dataArray: any[] = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data: any = new appvos.TreasureRecordVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_TREASURE_RECORDS, dataArray);
                    break;
            }
        }
    }
}