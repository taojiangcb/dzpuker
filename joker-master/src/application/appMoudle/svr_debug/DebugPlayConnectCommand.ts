/**
 * Created by JiangTao on 2016/4/28.
 */
module svrDebug {
    export class DebugPlayConnectCommand extends cy.SrsCommand {
        sendHandler(data:any, stream:cy.SrsStreamWriter):void {
            switch (this.action) {
                //发送登录指令：data参数包含了账号与密码(其余状态固定)
                case app.NetAction.DEBUG_CMDT_PLAYERCONNECT:
                    stream.putShort(data[0]);
                    return;
            }
        }

        resultHandler(stream:cy.SrsStreamReader):void {
            switch (this.action) {
                case app.NetAction.DEBUG_CMDT_RESP_PLAYERCONNECT:
                    //SUCCEED = 0,
                    //ERRROOMID,		// 错误房间id
                    //NOUSER,			// 没有此用户
                    //ERRUSER,		// 用户错误
                    //ERRSTEP,		// 错误启动步骤
                    //ERRUUID,		// 错误uuid
                    //ERRSTATE,		// 错误用户状态
                    //HASTUOGUAN,		// 用户被强制托管
                    //LIMITED,		// 用户被限制
                    var flag:number = stream.getByte();
                    if(flag == 0) {
                        __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS);
                    }
                    break;
            }
            //抽象函数保持空，可减少子类忽略super引发的错误
        }

    }
}