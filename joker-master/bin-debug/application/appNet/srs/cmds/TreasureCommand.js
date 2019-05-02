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
    var TreasureCommand = (function (_super) {
        __extends(TreasureCommand, _super);
        function TreasureCommand() {
            return _super.apply(this, arguments) || this;
        }
        TreasureCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.REQ_GET_TREASURES:
                case app.NetAction.REQ_GET_OPEN_TREASURES:
                case app.NetAction.REQ_GET_MY_ALL_TREASURES:
                case app.NetAction.REQ_GET_MY_NOW_TREASURES:
                case app.NetAction.REQ_MY_GET_REWARD_RECORD:
                    break;
                case app.NetAction.REQ_DO_TREASURE:
                    paramVO.longValues[0] = data[0];
                    paramVO.intValues[0] = data[1];
                    break;
                case app.NetAction.REQ_MY_GET_REWARD:
                    paramVO.longValues[0] = data;
                    break;
                case app.NetAction.REQ_TREASURE_RECORDS:
                    paramVO.longValues[0] = data;
                    break;
            }
        };
        TreasureCommand.prototype.resultHandler = function (action, paramVO) {
            var consts = app.constant.AppMediatorConst;
            switch (action) {
                case app.NetAction.RESP_GET_TREASURES:
                    var data = new appvos.TreasureInfoVO(paramVO.data[0]);
                    __SEND_NOTIFICATION(consts.TREASURE_GET_TREASURES, data);
                    break;
                case app.NetAction.RESP_DO_TREASURE:
                    if (paramVO.data.length > 0) {
                        var dataArray = [];
                        for (var i = 0; i < paramVO.data.length; i++) {
                            var data = new appvos.TreasureRecordVO(paramVO.data[i]);
                            dataArray.push(data);
                        }
                        __SEND_NOTIFICATION(consts.TREASURE_DO_TREASURE, dataArray);
                    }
                    break;
                case app.NetAction.RESP_GET_OPEN_TREASURES:
                    var dataArray = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.TreasureVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_OPEN_TREASURES, dataArray);
                    break;
                case app.NetAction.RESP_GET_MY_ALL_TREASURES:
                    var dataArray = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.TreasureRecordVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_GET_MY_ALL_TREASURES, dataArray);
                    break;
                case app.NetAction.RESP_GET_MY_NOW_TREASURES:
                    var dataArray = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.TreasureVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_GET_MY_NOW_TREASURES, dataArray);
                    break;
                case app.NetAction.RESP_MY_GET_REWARD_RECORD:
                    var dataArray = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.TreasureRecordVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_MY_GET_REWARD_RECORD, dataArray);
                    break;
                case app.NetAction.RESP_MY_GET_REWARD:
                    var data = paramVO.intValues[0];
                    __SEND_NOTIFICATION(consts.TREASURE_MY_GET_REWARD, data);
                    break;
                case app.NetAction.RESP_TREASURE_RECORDS:
                    var dataArray = [];
                    for (var i = 0; i < paramVO.data.length; i++) {
                        var data = new appvos.TreasureRecordVO(paramVO.data[i]);
                        dataArray.push(data);
                    }
                    __SEND_NOTIFICATION(consts.TREASURE_TREASURE_RECORDS, dataArray);
                    break;
            }
        };
        return TreasureCommand;
    }(app.MoudleCommand));
    app.TreasureCommand = TreasureCommand;
    __reflect(TreasureCommand.prototype, "app.TreasureCommand");
})(app || (app = {}));
//# sourceMappingURL=TreasureCommand.js.map