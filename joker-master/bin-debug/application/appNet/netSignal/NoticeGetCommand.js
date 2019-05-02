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
    var NoticeGetCommand = (function (_super) {
        __extends(NoticeGetCommand, _super);
        function NoticeGetCommand() {
            return _super.call(this) || this;
        }
        Object.defineProperty(NoticeGetCommand.prototype, "url", {
            get: function () {
                return AppConst.CONNECT_SERVER.notice;
            },
            enumerable: true,
            configurable: true
        });
        NoticeGetCommand.prototype.resultHandler = function (action, paramVO) {
            if (paramVO != null) {
                var dataArray = [];
                for (var i = 0; i < paramVO.data.length; i++) {
                    var data = new appvos.NoticeVO(paramVO.data[i]);
                    dataArray.push(data);
                }
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.NOTICE_INIT, dataArray);
            }
            else {
                tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_GET_ERROR"), tip.TIPS_TYPE.TIPS_WARNING); //获取数据失败
            }
        };
        return NoticeGetCommand;
    }(app.HttpCommand));
    app.NoticeGetCommand = NoticeGetCommand;
    __reflect(NoticeGetCommand.prototype, "app.NoticeGetCommand");
})(app || (app = {}));
//# sourceMappingURL=NoticeGetCommand.js.map