module cy {
    export class MissionCommand extends cy.ToolCommand {
        TASKMSG:string = "TASKMSG";
        sendHandler(data: any, stream: SrsStreamWriter): void {
            if (data instanceof Array) {
                var gameid = data[1];
                data = data[0];
            } else {
                gameid = AppConst.GAME_ID;
            }
            super.sendHandler(data,stream);
            switch (this.action) {
                case app.NetAction.REQ_DI_BAO:
                    stream.putInt(0);                               //askId
                    stream.putInt(user.getProxy().svrNumId);        //numid;
                    stream.putInt(gameid);                          //gameid
                    stream.putInt(user.getProxy().svrAreaId);       //areaId
                    stream.putInt(user.getProxy().vipId);           //vipId
                    stream.putByte(2);                              //clityType
                    stream.putInt(0);                               //osver
                    stream.putInt(0);                               //ip
                    stream.putInt(parseInt(platform.CHANNE_ID));    //channelId
                    stream.putStr(user.getProxy().hardwareId == null ? "" :user.getProxy().hardwareId);
                    stream.putStr("");                              //data
                    stream.putInt(data);                            //type
                    break;
            }
        }

        resultHandler(stream:SrsStreamReader):void {
            switch(this.action) {
                case app.NetAction.RESP_AWARD_INFO:
                    var numid:number = stream.getInt();
                    var areaId:number = stream.getInt();
                    var jf:number = stream.getInt();
                    var sr:number = stream.getInt();

                    var data_str:string = stream.getStr().replace(" ", "");
                    var msg_str:string = stream.getStr().replace(" ", "");

                    var split:string[] = msg_str.split("|");
                    var msgTitle:string = "";
                    var msgBody:string = "";

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
                    } else if (msgTitle == app.NetAction.BULLETIN) {
                        // console.log("miss奖池"+split.length+"||||" + split);
                        //BULLETIN|房间ID|彩金值|奖励牌型|奖励总额|奖励时间|奖励局号|发奖时奖金|当前局号|奖励账号1|奖励账号2|奖励账号3|奖励金额1|奖励金额2|奖励金额3|个人获奖金额|个人获奖局号
                        happy.getProxy().allWinBet[split[1]] = split;
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_WINBETS);
                        // __OPEN_MOUDLE(AppReg.APP_HAPPY_REWARD, split);
                    }
                    break;
            }
        }
    }
}