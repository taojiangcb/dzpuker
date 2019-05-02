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
    var CharmWheelCommand = (function (_super) {
        __extends(CharmWheelCommand, _super);
        function CharmWheelCommand() {
            return _super.apply(this, arguments) || this;
        }
        CharmWheelCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.REQ_CHARM_WHEEL:
                    break;
                case app.NetAction.REQ_CHARM_WHEEL_LIST:
                    paramVO.longValues = [data];
                    break;
            }
        };
        CharmWheelCommand.prototype.resultHandler = function (action, paramVO) {
            var consts = app.constant.AppMediatorConst;
            switch (action) {
                case app.NetAction.RESP_CHARM_WHEEL:
                    if (paramVO != null) {
                        var data1 = paramVO.intValues[0] - 1;
                        __SEND_NOTIFICATION(consts.CHARM_WHEEL_START, data1);
                    }
                    break;
                case app.NetAction.RESP_CHARM_WHEEL_LIST:
                    // console.log(paramVO.longValues.length);
                    // console.log(paramVO.longValues);
                    // console.log(paramVO.intValues);
                    // console.log(paramVO.strValues);
                    if (paramVO != null && paramVO.strValues.length > 0) {
                        if (paramVO.strValues[0] == user.getProxy().svrName) {
                            for (var i = 0; i < paramVO.intValues.length; i++) {
                                paramVO.intValues[i]--;
                            }
                            __SEND_NOTIFICATION(consts.CHARM_WHEEL_MY_RECORD, paramVO.intValues);
                        }
                        else {
                            var data2 = [];
                            for (var i = 0; i < paramVO.strValues.length; i++) {
                                var value = {
                                    name: paramVO.strValues[i],
                                    item: paramVO.intValues[i] - 1
                                };
                                data2.push(value);
                            }
                            __SEND_NOTIFICATION(consts.CHARM_WHEEL_OTHER_RECORD, data2);
                        }
                    }
                    else {
                        __SEND_NOTIFICATION(consts.CHARM_WHEEL_NO_RECORD);
                    }
                    break;
            }
        };
        return CharmWheelCommand;
    }(app.MoudleCommand));
    app.CharmWheelCommand = CharmWheelCommand;
    __reflect(CharmWheelCommand.prototype, "app.CharmWheelCommand");
})(app || (app = {}));
//# sourceMappingURL=CharmWheelCommand.js.map