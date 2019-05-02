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
    var RollNoticeCommand = (function (_super) {
        __extends(RollNoticeCommand, _super);
        function RollNoticeCommand() {
            return _super.call(this) || this;
        }
        Object.defineProperty(RollNoticeCommand.prototype, "url", {
            get: function () {
                return AppConst.CONNECT_SERVER.notice;
            },
            enumerable: true,
            configurable: true
        });
        RollNoticeCommand.prototype.responseHandler = function (action, paramVO) {
            var len = paramVO.data.length;
            while (--len > -1) {
                var pbData = AppGlobal.getMessageVO("GoGoNoticeShowVO", paramVO.data[len]);
                if (pbData) {
                    var noticeInfo = new notice.RollNoticeVO(pbData);
                    tip.popSysRollTopTip(noticeInfo.content);
                }
            }
        };
        return RollNoticeCommand;
    }(app.NetStateHttpCommand));
    app.RollNoticeCommand = RollNoticeCommand;
    __reflect(RollNoticeCommand.prototype, "app.RollNoticeCommand");
})(app || (app = {}));
//# sourceMappingURL=RollNoticeCommand.js.map