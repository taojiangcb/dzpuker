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
    var DzFeedAddCommand = (function (_super) {
        __extends(DzFeedAddCommand, _super);
        function DzFeedAddCommand() {
            return _super.apply(this, arguments) || this;
        }
        DzFeedAddCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.DZ_FEEDBACK_ADD:
                    paramVO.data = [data];
                    paramVO.longValues = [user.getProxy().svrRoleId];
                    break;
            }
        };
        DzFeedAddCommand.prototype.resultHandler = function (action, paramVO) {
            switch (action) {
                case app.NetAction.DZ_FEEDBACK_ADD:
                    if (paramVO && paramVO.intValues[0] == 1) {
                        tip.popSysCenterTip("举报成功", tip.TIPS_TYPE.TIPS_CORRECT);
                    }
                    else if (paramVO == null || paramVO.intValues[0] == -1) {
                        tip.popSysCenterTip("举报失败", tip.TIPS_TYPE.TIPS_WARNING);
                    }
                    break;
            }
        };
        return DzFeedAddCommand;
    }(app.HttpCommand));
    app.DzFeedAddCommand = DzFeedAddCommand;
    __reflect(DzFeedAddCommand.prototype, "app.DzFeedAddCommand");
})(app || (app = {}));
//# sourceMappingURL=DzFeedAddCommand.js.map