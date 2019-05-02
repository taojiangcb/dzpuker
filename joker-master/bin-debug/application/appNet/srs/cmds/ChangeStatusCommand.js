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
    var ChangeStatusCommand = (function (_super) {
        __extends(ChangeStatusCommand, _super);
        function ChangeStatusCommand() {
            return _super.apply(this, arguments) || this;
        }
        ChangeStatusCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.REQ_CHANGE_USER_STATUS:
                    paramVO.intValues = data;
                    // for (var i = 0; i < data.length; i++) {
                    //     console.log(data[i]);
                    // }
                    break;
            }
        };
        ChangeStatusCommand.prototype.resultHandler = function (action, paramVO) {
            var consts = app.constant.AppMediatorConst;
            switch (action) {
                case app.NetAction.RESP_CHANGE_USER_STATUS:
                    break;
            }
        };
        return ChangeStatusCommand;
    }(app.MoudleCommand));
    app.ChangeStatusCommand = ChangeStatusCommand;
    __reflect(ChangeStatusCommand.prototype, "app.ChangeStatusCommand");
})(app || (app = {}));
//# sourceMappingURL=ChangeStatusCommand.js.map