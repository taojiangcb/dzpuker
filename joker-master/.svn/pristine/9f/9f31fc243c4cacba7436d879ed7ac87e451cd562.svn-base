module app {
    export class MailCommand extends HttpCommand {

        public constructor() {
            super();
        }

        public get url(): string {
            return AppConst.CONNECT_SERVER.mail;
        }
        
        public resultHandler(action: string,paramVO: appvos.ParamVO): void {
            if(paramVO != null) {
                switch(action) {
                    case app.NetAction.IMS_READ_NUM:
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.IMS_READ_NUM, paramVO.intValues[0]);
                        break;
                    case app.NetAction.IMS_GETS:
                        user.getProxy().ImsVO = [];
                        for(var i = 0; i < paramVO.data.length; i++) {
                            var imsVO = new appvos.ImsVO(paramVO.data[i]);
                            user.getProxy().ImsVO.push(imsVO);
                        }
                        user.getProxy().ImsVO.sort(function(a,b) {
                            return b.createTime - a.createTime;
                        });
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.IMS_GETS);
                        break;
                    case app.NetAction.IMS_READ:
                        var id = this.sendParamVO.longValues[0];
                        var i: number;
                        for (i = 0; i < user.getProxy().ImsVO.length; i++) {
                            if(user.getProxy().ImsVO[i].id == id) {
                                user.getProxy().ImsVO[i].flag = 2;
                                break;
                            }
                        }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.IMS_READ);
                        var j: number;
                        for(j = 0; j < user.getProxy().ImsVO.length; j++) {
                            if (user.getProxy().ImsVO[j].flag == 1) break;
                        }
                        if(j == user.getProxy().ImsVO.length) {
                            __SEND_NOTIFICATION(app.constant.AppMediatorConst.IMS_READ_NUM,0);
                        }
                        __OPEN_MOUDLE(AppReg.APP_MAIL_SUB, user.getProxy().ImsVO[i]);
                        break;
                    default:
                        break;
                }
            } else tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_GET_ERROR"),tip.TIPS_TYPE.TIPS_WARNING);//获取数据失败
        }
    }
}