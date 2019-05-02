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
    var MobileValidateCommand = (function (_super) {
        __extends(MobileValidateCommand, _super);
        function MobileValidateCommand() {
            return _super.apply(this, arguments) || this;
        }
        MobileValidateCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.REQ_PHONE_VALIDATE:
                    paramVO.strValues[0] = data[2]; //key
                    paramVO.longValues[0] = Number(data[1]); //code
                    paramVO.intValues[0] = Number(data[0]); //phone
                    break;
            }
        };
        MobileValidateCommand.prototype.resultHandler = function (action, paramVO) {
            var consts = app.constant.AppMediatorConst;
            switch (action) {
                case app.NetAction.RESP_PHONE_VALIDATE:
                    break;
            }
        };
        return MobileValidateCommand;
    }(app.MoudleCommand));
    app.MobileValidateCommand = MobileValidateCommand;
    __reflect(MobileValidateCommand.prototype, "app.MobileValidateCommand");
})(app || (app = {}));
//# sourceMappingURL=MobileValidateCommand.js.map