module app {
    export class NoticeGetCommand extends HttpCommand {
        public constructor() {
            super();
        }
        public get url(): string {
            return AppConst.CONNECT_SERVER.notice;
        } 
        public resultHandler(action: string, paramVO: appvos.ParamVO): void {
            if (paramVO != null) {
                var dataArray: any[] = [];
                for(var i = 0;i < paramVO.data.length; i++) {
                    var data = new appvos.NoticeVO(paramVO.data[i]);
                    dataArray.push(data);
                }
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.NOTICE_INIT, dataArray);
            } else {
                tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_GET_ERROR"),tip.TIPS_TYPE.TIPS_WARNING);//获取数据失败
            }
        }
    }
}
