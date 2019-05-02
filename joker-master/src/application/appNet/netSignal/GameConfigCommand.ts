module app {
    export class GameConfigCommand extends HttpCommand {
        static times: number = 0;
        public get url(): string {
            return AppConst.CONNECT_SERVER.mail;
        }
        sendHandler(data: any, action: string, paramVO: appvos.ParamVO): void {
        }
        resultHandler(action: string, paramVO: appvos.ParamVO): void {
            switch (action) {
                case app.NetAction.GAME_CONFIG:
                    if (paramVO && paramVO.data && paramVO.data.length > 0) {
                        setting.getProxy().gameConfigVOS = [];
                        for (var i = 0; i < paramVO.data.length; i++) {
                            var vo = new appvos.GameConfigVO(paramVO.data[i]);
                            setting.getProxy().gameConfigVOS.push(vo);
                        }
                    }
                    if(setting.getProxy().gameConfigVOS.length>0) {
                        this.sendNotification(app.constant.AppMediatorConst.GAME_CONFIG);
                    } 
                    else {
                        GameConfigCommand.times++;
                        if( GameConfigCommand.times<10)
                            __SEND_PARAMVO(app.NetAction.GAME_CONFIG, [], [], [__SET_INT64(Number(platform.CHANNE_ID))]);
                    }
                    break;
                case app.NetAction.GAME_LOGIN:
                    break;
            }
        }
    }
}
