module app {

    export class PlayInfoNetCommand extends MoudleCommand {


        sendHandler(data: any,action: string,paramVO: appvos.ParamVO): void {
            switch(action) {
                case app.NetAction.SET_PLAY_INFO:
                    if(data){
                        paramVO.longValues[0] = data[0];
                    } else {
                        paramVO.longValues[0] = user.getProxy().svrRoleId;
                    }
                    break;
            }
            
        }

        resultHandler(action: string,paramVO: appvos.ParamVO): void {
            switch(action)
                {
                    case app.NetAction.RE_SET_PLAY_INFO:
                        if(paramVO) {
                            if(paramVO.data.length) {
                                var vo = new appvos.UserInfoVO(paramVO.data[0])
                            }

                            if (paramVO.longValues[0] == user.getProxy().svrRoleId) {
                                if (vo == null) {
                                    //第一次登陆创建自己信息
                                    vo = new appvos.UserInfoVO();
                                    vo.roleId = user.getProxy().svrRoleId;
                                    vo.name = user.getProxy().svrName;
                                    vo.totalHand = 0;
                                }
                                user.getProxy().playInfoVO = vo;
                               //__SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_PLAY_INFO_DATA);
                            }
                            this.sendNotification(app.constant.AppMediatorConst.UP_PLAY_INFO_DATA,vo);
                            //用户登录成功
                            this.sendNotification(app.constant.AppMediatorConst.LOGIN_ACTION);
                        }
                    break;
                }
        }

    }
}