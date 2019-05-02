var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/5.
 */
var app;
(function (app) {
    var CMD_FLAG;
    (function (CMD_FLAG) {
        CMD_FLAG[CMD_FLAG["init"] = 1] = "init";
        CMD_FLAG[CMD_FLAG["coverage"] = 2] = "coverage";
        CMD_FLAG[CMD_FLAG["update"] = 3] = "update";
    })(CMD_FLAG = app.CMD_FLAG || (app.CMD_FLAG = {}));
    var ShopCommand = (function (_super) {
        __extends(ShopCommand, _super);
        function ShopCommand() {
            var _this = _super.call(this) || this;
            _this.vs_enabled = true;
            return _this;
        }
        ShopCommand.prototype.resultHandler = function (action, param) {
            if (action == app.NetAction.BUY_SILVER) {
                if (param.data) {
                    var userPoint = param.longValues[0];
                    user.getPlayerInfo().silver = userPoint;
                    //user.getProxy().updataMoney(userMoney);
                    //user.getProxy().updataPoints(userPoint);
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.PAY_SUCCEED_ALERT);
                }
                console.log("gold:" + user.getPlayerInfo().silver);
            }
            else if (action == app.NetAction.BUY_VIP) {
                var flag = param.intValues[0];
                if (flag == CMD_FLAG.init) {
                    user.getProxy().vipInfo = param.data[0];
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.BUY_VIP_SUCCEED, param.data[0]);
                }
                else if (flag == CMD_FLAG.coverage) {
                    user.getProxy().vipInfo = param.data[0];
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.COVERAGE_VIP_SUCCEED, [param.data[0], param.longValues[0]]);
                }
                else if (flag == CMD_FLAG.update) {
                    var endTime = param.longValues[0];
                    user.getProxy().vipInfo.rewardEndTime = endTime;
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.BUY_VIP_SUCCEED, user.getProxy().vipInfo);
                }
            }
            _super.prototype.resultHandler.call(this, action, param);
        };
        return ShopCommand;
    }(app.BaseNetCommand));
    app.ShopCommand = ShopCommand;
    __reflect(ShopCommand.prototype, "app.ShopCommand");
})(app || (app = {}));
//# sourceMappingURL=ShopCommand.js.map