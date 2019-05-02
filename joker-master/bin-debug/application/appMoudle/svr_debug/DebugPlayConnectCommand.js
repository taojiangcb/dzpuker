var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/28.
 */
var svrDebug;
(function (svrDebug) {
    var DebugPlayConnectCommand = (function (_super) {
        __extends(DebugPlayConnectCommand, _super);
        function DebugPlayConnectCommand() {
            return _super.apply(this, arguments) || this;
        }
        DebugPlayConnectCommand.prototype.sendHandler = function (data, stream) {
            switch (this.action) {
                //发送登录指令：data参数包含了账号与密码(其余状态固定)
                case app.NetAction.DEBUG_CMDT_PLAYERCONNECT:
                    stream.putShort(data[0]);
                    return;
            }
        };
        DebugPlayConnectCommand.prototype.resultHandler = function (stream) {
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
                    var flag = stream.getByte();
                    if (flag == 0) {
                        __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS);
                    }
                    break;
            }
            //抽象函数保持空，可减少子类忽略super引发的错误
        };
        return DebugPlayConnectCommand;
    }(cy.SrsCommand));
    svrDebug.DebugPlayConnectCommand = DebugPlayConnectCommand;
    __reflect(DebugPlayConnectCommand.prototype, "svrDebug.DebugPlayConnectCommand");
})(svrDebug || (svrDebug = {}));
//# sourceMappingURL=DebugPlayConnectCommand.js.map