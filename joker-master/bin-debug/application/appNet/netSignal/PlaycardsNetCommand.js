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
    /**
     *打牌消息
     * @author
     *
     */
    var PlaycardsNetCommand = (function (_super) {
        __extends(PlaycardsNetCommand, _super);
        function PlaycardsNetCommand() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PlaycardsNetCommand.prototype, "showLoading", {
            //        public get methodName(): string {
            //            return app.NetAction.MATCH_CREATE.toString();
            //        }
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        // public faultHandler(data: any = null): void {
        //     super.faultHandler(data);
        // }
        PlaycardsNetCommand.prototype.sendHandler = function (data, action, paramVO) {
            if (action == app.NetAction.DO_TREASURE) {
                paramVO.longValues[0] = data[0];
                paramVO.intValues[0] = data[1];
            }
            else {
                egret.clearTimeout(PlaycardsNetCommand.time);
                PlaycardsNetCommand.time = egret.setTimeout(this.timeout, this, 3000);
                // __OPEN_MOUDLE(AppReg.PRELOAD);
                __OPEN_PRELOAD();
            }
        };
        PlaycardsNetCommand.prototype.timeout = function () {
            tip.Alert.show("您已经离开房间，请重新进入");
            playcards.getProxy().outbakfun();
            this.closeload();
        };
        PlaycardsNetCommand.prototype.closeload = function () {
            // __CLOSE_MOUDLE(AppReg.PRELOAD);
            __CLOSE_PRELOAD();
            egret.clearTimeout(PlaycardsNetCommand.time);
        };
        PlaycardsNetCommand.prototype.resultHandler = function (action, param) {
            switch (action) {
                /** 玩家进入桌子
                 * 1. 玩家断线重连进来。不需要额外操作
                 * 2. 玩家进入一个桌子，有空位， 则发送坐下（9）指令
                 * 3. 玩家进入一个桌子，没有空位。不需要额外操作，玩家旁观状态。
                 */
                case app.NetAction.MATCH_ADD:
                    mc2sdk.event(59004 /* ON_LOIGN_STEP_4 */);
                    playcards.getProxy().tableVO = new appvos.TexasTableVO(param.data[0]);
                    user.getProxy().messVersion = playcards.getProxy().tableVO.versionNum;
                    playcards.getProxy().playvideovo = null;
                    if (playcards.getProxy().tableVO.dealer)
                        playcards.getProxy().isLive = true;
                    var ui = __GET_MOUDLE_COMP(AppReg.APP_PLAYCARDS);
                    if (ui == null || ui.parent == null) {
                        console.log("ui == null || ui.parent == null");
                        __CLOSE_MOUDLE(AppReg.JOIN_VIP_ROOM);
                        // if (user.getProxy().exitToMoudle==-1) {
                        //     var arr = gameabc.UIManager.instance.getOpenList( [AppReg.APP_PLAYCARDS,AppReg.PRELOAD]);
                        //     // var except = [AppReg.APP_PLAYCARDS,AppReg.PRELOAD];
                        //     // var aid: number;
                        //     // for (var i: number = arr.length - 1; i > -1; i--){
                        //     //      aid = arr[i]
                        //     //      if (except.indexOf(aid)!=-1) {
                        //     //          arr.splice(i, 1);
                        //     //     } 
                        //     // }
                        //     __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, arr);
                        // } else {
                        //     __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, [user.getProxy().exitToMoudle]);
                        // }
                        playcards.getProxy().openMoudle();
                    }
                    else {
                        ui.refVO();
                    }
                    if (playcards.getProxy().mySeat == -1) {
                        // 搜索有没有位置
                        // 有位置就坐下
                        this.sendNotification(app.NetAction.REQ_COIN);
                    }
                    if (playcards.getProxy().beginVipRoom) {
                        __PVO().i(playcards.getProxy().anteType).to(app.NetAction.MATCH_OPEN_INFO);
                        playcards.getProxy().beginVipRoom = false;
                    }
                    break;
                // case NetAction.MATCH_ANTE:
                //     playcards.getProxy().tableVO.preBet = param.longValues[0];
                //     // 刷新前注信息
                //     __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_S_ANTE_UPDATE);
                //     if (param.intValues[0] != 1) {//统计私人房开放次数
                //          mc2sdk.event(mc2sdk.EVENT_TYPE.ON_RESP_OPEN_INFO);
                //     }
                //     break;
                // case NetAction.MATCH_START://房主点开始
                //     playcards.getProxy().tableVO.tableStatus = 1;
                //     __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_START);
                //     break;
                // case NetAction.MATCH_CREATE://创建房间
                //     if (param.intValues[0]) {
                //         playcards.getProxy().tableVO = new appvos.TexasTableVO(param.data[0]);
                //         var ui: playcards.PlayCardsUIMoudleComp = __GET_MOUDLE_COMP(AppReg.APP_PLAYCARDS) as playcards.PlayCardsUIMoudleComp;
                //         if (ui == null || ui.parent == null) {
                //             var arr = gameabc.UIManager.instance.openList.concat();
                //             __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, arr);
                //         } else
                //             ui.refVO();
                //     }
                //     break;
                case app.NetAction.MATCH_S_SIT:
                    var playvo = new appvos.SeatPlayerVO(param.data[0]);
                    var seat = playvo.seatId;
                    var tablevo = playcards.getTableVO();
                    if (tablevo != null) {
                        for (var i = 0, len = tablevo.seatPlayerVO.length; i < len; i++) {
                            var play = tablevo.seatPlayerVO[i];
                            if (play.seatId == seat) {
                                tablevo.seatPlayerVO[i] = playvo;
                                break;
                            }
                        }
                        if (i == len)
                            tablevo.seatPlayerVO.push(playvo);
                        // for (i = 0, len = tablevo.joinPlayerVO.length; i < len; i++) {
                        //     var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
                        //     if (join.roleId == playvo.roleId) {
                        //         join.totalBringBet = playvo.totalBringBet;
                        //         join.nowBet = playvo.nowBet;
                        //         break;
                        //     }
                        // }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_S_SIT, playvo);
                        // 自己坐下，播放扣筹码提示
                        // 当窗口未开启时，MATCH_S_SIT事件无法监听，所以将补充筹码文字丢在此处。
                        var currentType = room.getProxy().currentType;
                        if (currentType != 4 /* SNG */ && currentType != 8 /* FREE */ && currentType != 5 /* MTT */ && playvo.roleId == user.getProxy().svrRoleId && user.getProxy().svrGameData != null) {
                            tip.popSysTopTip("自动补充" + FormatUtils.wan(playvo.nowBet) + "彩豆，当前账户余额为" + FormatUtils.wan(user.getProxy().svrGameData.silver - playvo.nowBet));
                        }
                        else if (currentType == 8 /* FREE */ && playvo.roleId == user.getProxy().svrRoleId) {
                            tip.popSysTopTip("自动补充" + FormatUtils.wan(playvo.nowBet) + "金币，当前账户余额为" + FormatUtils.wan(user.getProxy().freeGold - playvo.nowBet));
                        }
                    }
                    break;
                case app.NetAction.MATCH_S_UP:
                    var mySeat = playcards.getProxy().mySeat;
                    var seatid = param.intValues[0];
                    var tablevo = playcards.getTableVO();
                    if (tablevo != null) {
                        for (var i = 0, len = tablevo.seatPlayerVO.length; i < len; i++) {
                            var play = tablevo.seatPlayerVO[i];
                            if (play.seatId == seatid) {
                                tablevo.seatPlayerVO.splice(i, 1);
                                break;
                            }
                        }
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_S_UP, param.intValues);
                    }
                    if (user.getProxy().currentRoom.standInGirl &&
                        seatid == mySeat) {
                        user.getProxy().currentRoom.standInGirl = false;
                        __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION, [2]); //站起围观
                        __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION, [4, 1, 6]); //站起围观
                    }
                    break;
                case app.NetAction.MATCH_MONEY_CHANGE:
                    var svrMode = param.intValues[0]; //1 银子 2 金币 3 积分
                    if (user.getProxy().svrGameData != null) {
                        if (svrMode == 1)
                            user.getProxy().svrGameData.silver = param.longValues[0];
                        else if (svrMode == 2)
                            user.getProxy().freeGold = param.longValues[0];
                        else if (svrMode == 3)
                            user.getProxy().svrGameData.score = param.longValues[0];
                        else
                            user.getProxy().svrGameData.silver = param.longValues[0];
                    }
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_COIN);
                    break;
                case app.NetAction.MATC_S_IN_TABLE:
                    this.closeload();
                    break;
                case app.NetAction.GIRL_KICK:
                    playcards.getProxy().outbakfun();
                    break;
            }
        };
        return PlaycardsNetCommand;
    }(app.GameCommand));
    PlaycardsNetCommand.time = 0;
    app.PlaycardsNetCommand = PlaycardsNetCommand;
    __reflect(PlaycardsNetCommand.prototype, "app.PlaycardsNetCommand");
})(app || (app = {}));
//# sourceMappingURL=PlaycardsNetCommand.js.map