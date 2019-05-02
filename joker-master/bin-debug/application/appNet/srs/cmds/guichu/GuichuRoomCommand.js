var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var guichu;
(function (guichu) {
    var GuichuRoomCommand = (function (_super) {
        __extends(GuichuRoomCommand, _super);
        function GuichuRoomCommand() {
            return _super.call(this) || this;
        }
        GuichuRoomCommand.prototype.execute = function (notification) {
            _super.prototype.execute.call(this, notification);
        };
        GuichuRoomCommand.prototype.resultHandler = function (action, paramVO) {
            //抽象函数保持空，可减少子类忽略super引发的错误
            switch (action) {
                case app.NetAction.GUICHU_RESP_ANTE:
                    var roleId = paramVO.intValues[0]; //下注的玩家
                    var betIndex = paramVO.intValues[1]; //下注的位置
                    var freeIndex = paramVO.intValues[2]; //1为免费
                    var betTimes = paramVO.intValues[3]; //下注次数
                    var betValue = paramVO.longValues[0]; //下注筹码
                    var betRemain = paramVO.longValues[1]; //剩下的筹码
                    guichu.getProxy().updatePlayInfo(roleId, betIndex, betValue, betRemain, freeIndex, betTimes);
                    break;
                case app.NetAction.GUICHU_RESP_TABLE_VO:
                    var tableVo = new appvos.ZPTableVO(paramVO.data[0]);
                    /**
                     * 同步服务器时间
                     */
                    guichu.gameLogic().syncServerTime(tableVo.nowTime);
                    tableVo.timeLast = Math.max(0, tableVo.timeLast * 1000);
                    guichu.getProxy().timeGet = egret.getTimer();
                    //初始化或者更新桌子信息
                    console.log("GUICHU_RESP_TABLE_VO:" + tableVo.timeLast);
                    guichu.getProxy().updateTableInfo(tableVo);
                    break;
                case app.NetAction.GUICHU_RESP_GAME_START:
                    //下注倒计时
                    //var downTime:number = paramVO.intValues[0];
                    var now = paramVO.longValues[0];
                    var over = paramVO.longValues[1];
                    //下注倒计时
                    var d2 = guichu.gameLogic().fiexDownTime(now, over);
                    if (guichu.getProxy().zpTable) {
                        guichu.getProxy().zpTable.timeLast = d2;
                        guichu.getProxy().zpTable.nowTime = now;
                        guichu.getProxy().zpTable.nowTimeLast = over;
                    }
                    guichu.getProxy().timeGet = egret.getTimer();
                    guichu.getProxy().changeStage(guichu.GAME_STATE.GAME_BET, d2);
                    console.log("GUICHU_RESP_GAME_START:" + d2);
                    break;
                case app.NetAction.GUICHU_RESP_GAME_END:
                    //游戏结束
                    // var downTime:number = paramVO.intValues[0];
                    var now = paramVO.longValues[0];
                    var over = paramVO.longValues[1];
                    var rewardPool = paramVO.longValues[2];
                    if (rewardPool)
                        guichu.getProxy().rewardPool = rewardPool;
                    //开奖发奖倒计时
                    var d2 = guichu.gameLogic().fiexDownTime(now, over);
                    guichu.getProxy().timeGet = egret.getTimer();
                    if (guichu.getProxy().zpTable) {
                        guichu.getProxy().zpTable.timeLast = d2;
                        guichu.getProxy().zpTable.nowTime = now;
                        guichu.getProxy().zpTable.nowTimeLast = over;
                    }
                    /**
                     * 玩家结算
                     */
                    var gameEndInfo = new appvos.ZPGameEndVO(paramVO.data[0]);
                    // console.log("server: card = " + gameEndInfo.card + " showrand = " + gameEndInfo.showrand);
                    guichu.getProxy().zpGamEndVO = gameEndInfo;
                    guichu.getProxy().changeStage(guichu.GAME_STATE.GAME_ROLL, d2);
                    // __SEND_NOTIFICATION(GuiChuModuleMediator.UPDATE_REWARD_POOL, rewardPool);
                    console.log("GAME_STATE.GAME_ROLL:" + d2);
                    break;
                case app.NetAction.GUICHU_RESP_ANTE_TEST:
                    var v1 = paramVO.intValues[0];
                    var v2 = paramVO.longValues[0];
                    __SEND_NOTIFICATION(guichu.GuiChuModuleMediator.GUICHU_TEST_BACK, [v1, v2]);
                    break;
            }
        };
        return GuichuRoomCommand;
    }(app.GameCommand));
    guichu.GuichuRoomCommand = GuichuRoomCommand;
    __reflect(GuichuRoomCommand.prototype, "guichu.GuichuRoomCommand");
})(guichu || (guichu = {}));
//# sourceMappingURL=GuichuRoomCommand.js.map