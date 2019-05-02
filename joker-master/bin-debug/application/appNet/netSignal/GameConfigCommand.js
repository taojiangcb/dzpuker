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
    var GameConfigCommand = (function (_super) {
        __extends(GameConfigCommand, _super);
        function GameConfigCommand() {
            return _super.apply(this, arguments) || this;
        }
        Object.defineProperty(GameConfigCommand.prototype, "url", {
            get: function () {
                return AppConst.CONNECT_SERVER.mail;
            },
            enumerable: true,
            configurable: true
        });
        GameConfigCommand.prototype.sendHandler = function (data, action, paramVO) {
        };
        GameConfigCommand.prototype.resultHandler = function (action, paramVO) {
            switch (action) {
                case app.NetAction.GAME_CONFIG:
                    if (paramVO && paramVO.data && paramVO.data.length > 0) {
                        setting.getProxy().gameConfigVOS = [];
                        for (var i = 0; i < paramVO.data.length; i++) {
                            var vo = new appvos.GameConfigVO(paramVO.data[i]);
                            setting.getProxy().gameConfigVOS.push(vo);
                        }
                    }
                    if (setting.getProxy().gameConfigVOS.length > 0) {
                        this.sendNotification(app.constant.AppMediatorConst.GAME_CONFIG);
                    }
                    else {
                        GameConfigCommand.times++;
                        if (GameConfigCommand.times < 10)
                            __SEND_PARAMVO(app.NetAction.GAME_CONFIG, [], [], [__SET_INT64(Number(platform.CHANNE_ID))]);
                    }
                    break;
                case app.NetAction.GAME_LOGIN:
                    break;
            }
        };
        return GameConfigCommand;
    }(app.HttpCommand));
    GameConfigCommand.times = 0;
    app.GameConfigCommand = GameConfigCommand;
    __reflect(GameConfigCommand.prototype, "app.GameConfigCommand");
})(app || (app = {}));
//# sourceMappingURL=GameConfigCommand.js.map