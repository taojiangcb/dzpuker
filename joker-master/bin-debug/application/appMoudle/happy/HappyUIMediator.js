var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var HappyUIMediator = (function (_super) {
        __extends(HappyUIMediator, _super);
        function HappyUIMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, HappyUIMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HappyUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        HappyUIMediator.prototype.listNotificationInterests = function () {
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            return [
                netaction.GLXY_RESP_ANTE,
                netaction.GLXY_RESP_BECOME_BANKER,
                netaction.GLXY_RESP_CHANGE_BANKER,
                netaction.GLXY_RESP_PLAYER_ENTER,
                netaction.GLXY_RESP_PLAYER_LEAVE,
                netaction.GLXY_RESP_ADD_SHOW_POS,
                netaction.GLXY_RESP_SUB_SHOW_POS,
                netaction.GLXY_RESP_GAME_START,
                consts.UP_PLAY_INFO_DATA,
                consts.MATCH_OUTROOM,
                netaction.GLXY_RESP_CHAT,
                netaction.GLXY_RESP_WIN_HISTORY,
                netaction.GLXY_RESP_GAME_END,
                consts.HAPPY_HOOK,
                consts.HAPPY_WINBETS,
                netaction.GLXY_RESP_LUCKY_CARD,
                netaction.GLXY_REQ_LUCKY_CARD
            ];
        };
        HappyUIMediator.prototype.handleNotification = function (notification) {
            var consts = app.constant.AppMediatorConst;
            var netaction = app.NetAction;
            var body = notification.getBody();
            if (body instanceof cyvos.GamePackage)
                var message = new appvos.MessageVO(body.data.buffer);
            var proxy = happy.getProxy();
            var act = notification.getName();
            switch (act) {
                case netaction.GLXY_RESP_ANTE:
                    var seatvo = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    if (seatvo != null) {
                        var pos = message.data.intValues[1];
                        var addBet = message.data.longValues[0];
                        seatvo.addBet(pos, addBet);
                        seatvo.totalBet = message.data.longValues[1];
                        proxy.tableVO.allbets[pos] += addBet;
                        this.view.showAddBet(seatvo, pos, addBet);
                    }
                    break;
                case consts.MATCH_OUTROOM:
                    tip.Alert.show("您已经离开房间，请重新进入", null, tip.ALERT, this.leaveRoom, null, this);
                    break;
                case netaction.GLXY_RESP_BECOME_BANKER:
                    var seatvo = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    seatvo.showPos = 1;
                    this.view.addSeat(seatvo);
                    break;
                case netaction.GLXY_RESP_CHANGE_BANKER:
                    // var seatvo: appvos.HLCPlayerVO = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    // seatvo.showPos = 0;
                    this.view.removeSeat(1);
                    break;
                case netaction.GLXY_RESP_PLAYER_ENTER:
                    var player = new appvos.HLCPlayerVO(message.data.data[0]);
                    var seatvo = proxy.tableVO.allPlayerVO[player.seatId];
                    if (seatvo != null) {
                        var index = proxy.tableVO.playerVO.indexOf(seatvo);
                        proxy.tableVO.playerVO[index] = player;
                        index = proxy.tableVO.noSeatPlayerVO.indexOf(seatvo);
                        if (index > -1)
                            proxy.tableVO.noSeatPlayerVO.splice(index, 1);
                        index = proxy.tableVO.seatPlayerVO.indexOf(seatvo);
                        if (index > -1)
                            proxy.tableVO.seatPlayerVO.splice(index, 1);
                        if (seatvo == happy.getProxy().mySeatvo) {
                            happy.getProxy().mySeatvo = player;
                        }
                    }
                    else {
                        proxy.tableVO.playerVO.push(player);
                    }
                    __SEND_NOTIFICATION(app.NetAction.PROCESS_XYID_REQ_GET_USER_LIST, [player.roleId]);
                    if (player.showPos > 0)
                        proxy.tableVO.seatPlayerVO.push(player);
                    else
                        proxy.tableVO.noSeatPlayerVO.push(player);
                    proxy.tableVO.allPlayerVO[player.seatId] = player;
                    this.view.addSeat(player);
                    break;
                case netaction.GLXY_RESP_PLAYER_LEAVE:
                    var seatvo = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    if (seatvo != null) {
                        var index = proxy.tableVO.playerVO.indexOf(seatvo);
                        proxy.tableVO.playerVO.splice(index, 1);
                        index = proxy.tableVO.noSeatPlayerVO.indexOf(seatvo);
                        if (index > -1)
                            proxy.tableVO.noSeatPlayerVO.splice(index, 1);
                        index = proxy.tableVO.seatPlayerVO.indexOf(seatvo);
                        if (index > -1)
                            proxy.tableVO.seatPlayerVO.splice(index, 1);
                        this.view.removeSeat(seatvo.showPos);
                        delete proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    }
                    break;
                case netaction.GLXY_RESP_ADD_SHOW_POS:
                    var seatvo = proxy.tableVO.allPlayerVO[message.data.intValues[0]];
                    seatvo.showPos = message.data.intValues[1];
                    this.view.addSeat(seatvo);
                    break;
                case netaction.GLXY_RESP_SUB_SHOW_POS:
                    this.view.removeSeat(message.data.intValues[0]);
                    break;
                case netaction.GLXY_RESP_GAME_START:
                    var tablevo = happy.getTableVO();
                    tablevo.gameStatus = 1;
                    tablevo.clear();
                    happy.getProxy().mySeatvo.clear();
                    tablevo.timeLast = message.data.intValues[0];
                    this.view.start();
                    break;
                case netaction.GLXY_RESP_GAME_END:
                    var endvo = new appvos.HLCGameEndVO(message.data.data[0]);
                    this.view.playEnd(endvo);
                    break;
                case netaction.GLXY_RESP_CHAT:
                    if (message.data)
                        this.view.showchat(message.data.intValues[0], message.data.intValues[1], message.data.strValues[0]);
                    break;
                case consts.UP_PLAY_INFO_DATA:
                    if (body) {
                        var len = body.length;
                        for (var i = 0; i < len; i++) {
                            var vo = body[i];
                            var le = proxy.tableVO.playerVO.length;
                            while (--le > -1) {
                                if (proxy.tableVO.playerVO[le].roleId == vo.roleId) {
                                    proxy.tableVO.playerVO[le].avatarID = vo.avatarID;
                                    break;
                                }
                            }
                        }
                        this.view.refAvatar();
                        var ui = __GET_MOUDLE_COMP(AppReg.APP_HAPPY_REWARD);
                        if (ui) {
                            ui.refList(body);
                        }
                    }
                    break;
                case netaction.GLXY_RESP_WIN_HISTORY:
                    happy.getProxy().historyValues = message.data.intValues;
                    // var  probability=happy.getProxy().getProcessingData();
                    break;
                case consts.HAPPY_HOOK:
                    this.view.refView();
                    if (happy.getProxy().hookingFlag && happy.getTableVO().gameStatus > 0) {
                        this.view.startHook();
                    }
                    break;
                case consts.HAPPY_WINBETS:
                    if (room.getProxy().current) {
                        //BULLETIN|房间ID|彩金值|奖励牌型|奖励总额|奖励时间|奖励局号|发奖时奖金|当前局号|奖励账号1|奖励账号2|奖励账号3|奖励金额1|奖励金额2|奖励金额3|个人获奖金额|个人获奖局号
                        var bets = happy.getProxy().allWinBet[room.getProxy().current.svrRoomId];
                        if (bets) {
                            if (bets[6] != 0 && bets[6] == bets[8]) {
                                this.view.showWinResule = true;
                            }
                            //刷新奖池奖励
                            this.view.refWinBets();
                        }
                    }
                    break;
                case netaction.GLXY_RESP_LUCKY_CARD:
                    happy.getProxy().nextLuckyCard = message.data.intValues[0];
                    if (happy.getTableVO().gameStatus > 0 && happy.getProxy().nowLuckyCard == null) {
                        happy.getProxy().nowLuckyCard = happy.getProxy().nextLuckyCard;
                        this.view.showLucyCard(false);
                    }
                    break;
                case netaction.GLXY_REQ_LUCKY_CARD:
                    this.view.luckychangebtn.alpha = 0.5;
                    break;
            }
        };
        HappyUIMediator.prototype.leaveRoom = function () {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
        };
        return HappyUIMediator;
    }(puremvc.Mediator));
    HappyUIMediator.NAME = "HappyUIMediator";
    happy.HappyUIMediator = HappyUIMediator;
    __reflect(HappyUIMediator.prototype, "happy.HappyUIMediator");
})(happy || (happy = {}));
//# sourceMappingURL=HappyUIMediator.js.map