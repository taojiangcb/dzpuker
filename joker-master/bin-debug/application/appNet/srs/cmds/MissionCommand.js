var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cy;
(function (cy) {
    var MissionCommand = (function (_super) {
        __extends(MissionCommand, _super);
        function MissionCommand() {
            var _this = _super.apply(this, arguments) || this;
            _this.TASKMSG = "TASKMSG";
            return _this;
        }
        MissionCommand.prototype.sendHandler = function (data, stream) {
            if (data instanceof Array) {
                var gameid = data[1];
                data = data[0];
            }
            else {
                gameid = AppConst.GAME_ID;
            }
            _super.prototype.sendHandler.call(this, data, stream);
            switch (this.action) {
                case app.NetAction.REQ_DI_BAO:
                    stream.putInt(0); //askId
                    stream.putInt(user.getProxy().svrNumId); //numid;
                    stream.putInt(gameid); //gameid
                    stream.putInt(user.getProxy().svrAreaId); //areaId
                    stream.putInt(user.getProxy().vipId); //vipId
                    stream.putByte(2); //clityType
                    stream.putInt(0); //osver
                    stream.putInt(0); //ip
                    stream.putInt(parseInt(platform.CHANNE_ID)); //channelId
                    stream.putStr(user.getProxy().hardwareId == null ? "" : user.getProxy().hardwareId);
                    stream.putStr(""); //data
                    stream.putInt(data); //type
                    break;
            }
        };
        MissionCommand.prototype.resultHandler = function (stream) {
            switch (this.action) {
                case app.NetAction.RESP_AWARD_INFO:
                    var numid = stream.getInt();
                    var areaId = stream.getInt();
                    var jf = stream.getInt();
                    var sr = stream.getInt();
                    var data_str = stream.getStr().replace(" ", "");
                    var msg_str = stream.getStr().replace(" ", "");
                    var split = msg_str.split("|");
                    var msgTitle = "";
                    var msgBody = "";
                    if (split.length > 1) {
                        msgTitle = split[0];
                        msgBody = split[1];
                    }
                    else if (split.length == 1) {
                        msgBody = split[0];
                    }
                    //任务信息
                    if (msgTitle == this.TASKMSG) {
                        mission.getProxy().analysizeStrData(msgBody);
                    }
                    else if (msgTitle == app.NetAction.BULLETIN) {
                        // console.log("miss奖池"+split.length+"||||" + split);
                        //BULLETIN|房间ID|彩金值|奖励牌型|奖励总额|奖励时间|奖励局号|发奖时奖金|当前局号|奖励账号1|奖励账号2|奖励账号3|奖励金额1|奖励金额2|奖励金额3|个人获奖金额|个人获奖局号
                        happy.getProxy().allWinBet[split[1]] = split;
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_WINBETS);
                    }
                    break;
            }
        };
        return MissionCommand;
    }(cy.ToolCommand));
    cy.MissionCommand = MissionCommand;
    __reflect(MissionCommand.prototype, "cy.MissionCommand");
})(cy || (cy = {}));
//# sourceMappingURL=MissionCommand.js.map