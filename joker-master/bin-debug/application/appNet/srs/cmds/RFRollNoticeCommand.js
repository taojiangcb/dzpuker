var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/7/14.
 */
var app;
(function (app) {
    var RFRollNoticeCommand = (function (_super) {
        __extends(RFRollNoticeCommand, _super);
        function RFRollNoticeCommand() {
            return _super.call(this) || this;
        }
        RFRollNoticeCommand.prototype.resultHandler = function (stream) {
            switch (this.action) {
                case app.NetAction.GOGO_NOTICE_GET_REFLUSH:
                    __SEND_PARAMVO(app.NetAction.GOGO_NOTICE_GET_MANY, [], [], [__SET_INT64(Number(platform.CHANNE_ID))]);
                    break;
            }
        };
        return RFRollNoticeCommand;
    }(cy.SrsCommand));
    app.RFRollNoticeCommand = RFRollNoticeCommand;
    __reflect(RFRollNoticeCommand.prototype, "app.RFRollNoticeCommand");
})(app || (app = {}));
//# sourceMappingURL=RFRollNoticeCommand.js.map