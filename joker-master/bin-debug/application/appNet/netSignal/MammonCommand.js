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
    var MammonCommand = (function (_super) {
        __extends(MammonCommand, _super);
        function MammonCommand() {
            return _super.call(this) || this;
        }
        MammonCommand.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.PROCESS_XYID_REQ_CAISHEN_LIST:
                    paramVO.intValues = [data];
                    break;
            }
        };
        MammonCommand.prototype.resultHandler = function (action, paramVO) {
            switch (action) {
                case app.NetAction.PROCESS_XYID_RESP_CAISHEN_LIST:
                    /**paramVO
                     * long(0) 数额
                     * long(1) 时间
                     * string(0) 名字
                     * 循环 */
                    mammon.getProxy()._clearRecordList(); // 清空缓存
                    if (paramVO && paramVO.strValues.length > 0 && paramVO.longValues.length > 0) {
                        var index = 0;
                        while (true) {
                            var num = paramVO.longValues[index * 2];
                            var time = paramVO.longValues[index * 2 + 1];
                            var name = paramVO.strValues[index];
                            if (num > 0 && time > 0 && name.length > 0) {
                                mammon.getProxy()._setPoolRecords(time, name, num);
                            }
                            if (paramVO.strValues[index + 1] == undefined || index == 20) {
                                break; // 如没有数据则跳出
                            }
                            index++;
                        }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_MAMMON_POOL_RECORD);
                    }
            }
        };
        return MammonCommand;
    }(app.MoudleCommand));
    app.MammonCommand = MammonCommand;
    __reflect(MammonCommand.prototype, "app.MammonCommand");
})(app || (app = {}));
//# sourceMappingURL=MammonCommand.js.map