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
    var PlayRecordCommand = (function (_super) {
        __extends(PlayRecordCommand, _super);
        function PlayRecordCommand() {
            return _super.apply(this, arguments) || this;
        }
        PlayRecordCommand.prototype.sendHandler = function (data, action, paramVO) {
            if (app.NetAction.DZ_RECODE_GETVO == action || app.NetAction.DZ_FEEDBACK_GETVO == action) {
                paramVO.longValues = [data];
            }
        };
        PlayRecordCommand.prototype.resultHandler = function (action, paramVO) {
            switch (action) {
                case app.NetAction.DZ_RECORD_ADD:
                    if (paramVO && paramVO.intValues[0] == 1) {
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_ADD"), tip.TIPS_TYPE.TIPS_CORRECT);
                        record.getProxy().indexDate.id = paramVO.longValues[0];
                        record.getProxy().collRecord.push(record.getProxy().indexDate);
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_RECORD_DATA);
                    }
                    else
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_ADD_ERROR"), tip.TIPS_TYPE.TIPS_WARNING);
                    break;
                case app.NetAction.DZ_RECORD_DEL:
                    if (paramVO && paramVO.intValues[0] == 1) {
                        record.getProxy().removeTableById(this.sendParamVO.longValues[0]);
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_RECORD_DATA);
                    }
                    break;
                case app.NetAction.DZ_RECORD_GET_MANY:
                    if (paramVO && paramVO.intValues[0] == 1) {
                        for (var i = 0; i < paramVO.data.length; i++) {
                            var vo = new appvos.DZRecordVO(paramVO.data[i]);
                            record.getProxy().collRecord.push(vo);
                        }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_RECORD_DATA);
                    }
                    break;
                case app.NetAction.DZ_RECODE_GETVO: //获取收藏回放数据
                case app.NetAction.DZ_FEEDBACK_GETVO:
                    if (paramVO && paramVO.data.length > 0) {
                        var video = new appvos.PlayCardsVideoVO(paramVO.data[0]);
                        record.getProxy().playVideo(video);
                    }
                    else {
                        var mess = gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_GET_ERROR");
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.LOGIN_MESS, mess);
                        tip.popSysCenterTip(mess, tip.TIPS_TYPE.TIPS_WARNING); //获取数据失败
                    }
                    break;
            }
        };
        return PlayRecordCommand;
    }(app.HttpCommand));
    app.PlayRecordCommand = PlayRecordCommand;
    __reflect(PlayRecordCommand.prototype, "app.PlayRecordCommand");
})(app || (app = {}));
//# sourceMappingURL=PlayRecordCommand.js.map