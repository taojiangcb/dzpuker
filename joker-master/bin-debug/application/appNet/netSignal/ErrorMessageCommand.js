var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    /**
     *错误提示消息
     * @author
     *
     */
    var ErrorMessageCommand = (function (_super) {
        __extends(ErrorMessageCommand, _super);
        function ErrorMessageCommand() {
            return _super.call(this) || this;
        }
        ErrorMessageCommand.prototype.execute = function (notification) {
            var commandId = notification.getName();
            if (commandId == app.NetAction.ERROR_SRS_CODE) {
                this.showSrsError(notification.getBody());
            }
            else
                _super.prototype.execute.call(this, notification);
        };
        ErrorMessageCommand.prototype.resultHandler = function (action, param) {
            //          
            //            if(commandId == app.NetAction.ERROR_CODE)//错误提示
            switch (this.recvMessageVO.errorCode) {
                case 2:
                    user.getProxy().openMoney();
                    // if(AppConst.LOGING_CAN_BOOL) {
                    //     tip.Alert.show("彩豆不足请充值！");
                    // } else {
                    //     tip.Alert.show("彩豆不足是否购买？",null,tip.CONFIRM,this.openbuy,null,this);
                    // }
                    break;
                case 4:
                    var proxy = playcards.getProxy();
                    var mess = "操作异常服务端权限:";
                    var nAntePower = proxy.AntePower;
                    if (nAntePower & proxy.MAP_EXIT)
                        mess += "弃牌,";
                    if (nAntePower & proxy.MAP_DOWNANTE)
                        mess += "下注,";
                    if (nAntePower & proxy.MAP_FOLLOWANTE)
                        mess += "跟注,";
                    if (nAntePower & proxy.MAP_ALLIN)
                        mess += "ALLIN,";
                    if (nAntePower & proxy.MAP_RAISE)
                        mess += "加注";
                    tip.popSysBottomTip(mess);
                    break;
                default:
                    var mess = gameabc.getError(this.recvMessageVO.errorCode + "");
                    if (mess == null || mess.length == 0) {
                        mess = "未定义errorCode:" + this.recvMessageVO.errorCode;
                        console.warn(mess);
                    }
                    tip.popSysBottomTip(mess);
                    break;
            }
        };
        ErrorMessageCommand.prototype.showSrsError = function (errorCode) {
            var mess = gameabc.getError("2-" + errorCode);
            if (mess == null || mess.length == 0) {
                mess = "未定义errorCode:" + errorCode;
                console.warn(mess);
            }
            tip.popSysBottomTip(mess);
        };
        /**打开充值**/
        ErrorMessageCommand.prototype.openbuy = function (type) {
            if (type == tip.YES)
                __OPEN_MOUDLE(AppReg.APP_PLAY_BUY, 1);
        };
        return ErrorMessageCommand;
    }(app.GameCommand));
    app.ErrorMessageCommand = ErrorMessageCommand;
    __reflect(ErrorMessageCommand.prototype, "app.ErrorMessageCommand");
})(app || (app = {}));
//# sourceMappingURL=ErrorMessageCommand.js.map