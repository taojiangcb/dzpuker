/**
 * Created by JiangTao on 2016/4/5.
 */
module app {

    export enum CMD_FLAG {
        init = 1,
        coverage,
        update
    }

    export class ShopCommand extends app.BaseNetCommand {
        vs_enabled:boolean = true;

        constructor() {
            super()
        }

        resultHandler(action:string, param:appvos.ParamVO):void {
            if(action == app.NetAction.BUY_SILVER) {
                if (param.data) {
                    var userPoint:number = param.longValues[0];
                    user.getPlayerInfo().silver = userPoint;
                    //user.getProxy().updataMoney(userMoney);
                    //user.getProxy().updataPoints(userPoint);
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.PAY_SUCCEED_ALERT)
                }
                console.log("gold:" + user.getPlayerInfo().silver);
            }
            else if(action == app.NetAction.BUY_VIP) {
                var flag:number = param.intValues[0];
                if(flag == CMD_FLAG.init) {
                    user.getProxy().vipInfo = param.data[0];
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.BUY_VIP_SUCCEED,param.data[0]);
                }
                else if(flag == CMD_FLAG.coverage) {
                    user.getProxy().vipInfo = param.data[0];
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.COVERAGE_VIP_SUCCEED,[param.data[0],param.longValues[0]]);
                }
                else if(flag == CMD_FLAG.update) {
                    var endTime:number = param.longValues[0];
                    user.getProxy().vipInfo.rewardEndTime = endTime;
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.BUY_VIP_SUCCEED,user.getProxy().vipInfo);
                }
            }
            super.resultHandler(action, param);
        }
    }
}