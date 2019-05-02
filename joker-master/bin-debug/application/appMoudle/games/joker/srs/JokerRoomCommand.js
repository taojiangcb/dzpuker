var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var joker;
(function (joker) {
    var JokerRoomCommand = (function (_super) {
        __extends(JokerRoomCommand, _super);
        function JokerRoomCommand() {
            return _super.call(this) || this;
        }
        JokerRoomCommand.prototype.execute = function (notification) {
            _super.prototype.execute.call(this, notification);
        };
        JokerRoomCommand.prototype.resultHandler = function (action, paramVO) {
            var datas = null;
            switch (action) {
                case app.NetAction.JOKER_RESP_TABLE_VO:
                    datas = paramVO.data;
                    if (datas && datas.length > 0) {
                        var tableInfo = new appvos.PMTableVO(datas[0]);
                        joker.getProxy().setTableInfo(tableInfo);
                        cy.log("获取到桌子信息", 0);
                    }
                    break;
                case app.NetAction.JOKER_RESP_ANTE:
                    datas = paramVO.data;
                    if (datas && datas.length > 0) {
                        var betInfo = new appvos.PMInfoVO(datas[0]);
                        joker.getProxy().setBetInfo(betInfo);
                        cy.log("获取到下注信息");
                    }
                    break;
            }
        };
        return JokerRoomCommand;
    }(app.GameCommand));
    joker.JokerRoomCommand = JokerRoomCommand;
    __reflect(JokerRoomCommand.prototype, "joker.JokerRoomCommand");
})(joker || (joker = {}));
//# sourceMappingURL=JokerRoomCommand.js.map