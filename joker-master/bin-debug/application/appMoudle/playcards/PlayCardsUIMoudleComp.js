var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    /**
     *
     * @author
     *
     */
    var PlayCardsUIMoudleComp = (function (_super) {
        __extends(PlayCardsUIMoudleComp, _super);
        function PlayCardsUIMoudleComp() {
            var _this = _super.call(this) || this;
            _this.sendtime = 0;
            _this.skinName = "PlayCardsUIMoudleCompSkin";
            return _this;
        }
        PlayCardsUIMoudleComp.prototype.setChildVisable = function (dis, visable, parent, num) {
            if (num === void 0) { num = -1; }
            if (dis != null) {
                if (visable) {
                    if (dis.parent == null) {
                        if (parent == this)
                            parent.addChildAt(dis, this.numChildren - 1);
                        else if (parent == this.tableGroup)
                            parent.addChildAt(dis, parent.numChildren - 2);
                        else {
                            if (num == -1)
                                parent.addChild(dis);
                            else
                                parent.addChildAt(dis, num);
                        }
                    }
                }
                else if (dis.parent != null)
                    dis.parent.removeChild(dis);
            }
        };
        PlayCardsUIMoudleComp.prototype.definePreload = function (preloadData, intoLoadCb) {
            if (user.getProxy().willJoinMatchRoom)
                preloadData.preRes.push("s9_bg_play_bg2_jpg");
            else
                preloadData.preRes.push("s9_bg_play_bg_jpg");
            _super.prototype.definePreload.call(this, preloadData, intoLoadCb);
        };
        PlayCardsUIMoudleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            __CLOSE_MOUDLE(AppReg.LOGIN);
            // this.bindButton(this.btnbak);
            // this.bindButton(this.paijubtn);
            // this.bindButton(this.goumaibtn);
            // this.bindButton(this.l1btn);
            // this.bindButton(this.l2btn);
            // this.bindButton(this.l3btn);
            // this.bindButton(this.r1btn);
            // this.bindButton(this.r2btn);
            // this.bindButton(this.r3btn);
            // this.bindButton(this.r4btn);
            // this.bindButton(this.r5btn);
            // this.bindButton(this.biaoqingbtn);
            // this.bindButton(this.fastFoldBtn);  
            this.bindButton(this.btndashang);
            this.bindButton(this._btn_zidongqipai, true);
            // this.bindButton(this.treasureBtn);
            // this.bindButton(this.replaybtn);
            // this.bindButton(this.jubaobtn);
            // this.setChildVisable(this.btndashang,false,this.tableGroup);
            this.setChildVisable(this.money1, false, this.allitemsGroup);
            this.setChildVisable(this.money2, false, this.allitemsGroup);
            this.setChildVisable(this.money3, false, this.allitemsGroup);
            this.setChildVisable(this.money4, false, this.allitemsGroup);
            this.setChildVisable(this.money5, false, this.allitemsGroup);
            this.setChildVisable(this.money6, false, this.allitemsGroup);
            this.setChildVisable(this.money7, false, this.allitemsGroup);
            this.setChildVisable(this.money8, false, this.allitemsGroup);
            this.setChildVisable(this.money0, false, this.allitemsGroup);
            this.setChildVisable(this.zhuangimg, false, this.tableGroup);
            this.setChildVisable(this.jbctip, false, this.tableGroup);
            // this.setChildVisable(this.leftbtns,false,this.bottombtns);
            // this.setChildVisable(this.rightbtns,false,this.bottombtns);
            // this.setChildVisable(this.right2btns, false, this.bottombtns);
            // this.setChildVisable(this.replaybtn, false, this);
            //  this.setChildVisable(this.jubaobtn, false, this);
            // this.setChildVisable(this.startbtn,false,this.tableGroup);
            this.allCard = [this.card0, this.card1, this.card2, this.card3, this.card4];
            this.allItem = [this.item0, this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7, this.item8];
            this.allmoney = [this.money0, this.money1, this.money2, this.money3, this.money4, this.money5, this.money6, this.money7, this.money8];
            // this.allcheck = [this.rangqicheck,this.rangpaicheck,this.gencheck];
            // this.rangqicheck.addEventListener(egret.Event.CHANGE,this.checkChange,this);
            // this.rangpaicheck.addEventListener(egret.Event.CHANGE,this.checkChange,this);
            // this.gencheck.addEventListener(egret.Event.CHANGE,this.checkChange,this);
            this.effect = new playcards.PlayCardsUIEffect(this);
            this.cgReward.visible = false;
            this.playComp.view = this;
            this.videoComp.view = this; // = new PlayCardsVideoComp(this);
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB)
                RES.loadGroup("mainui");
            utils.SoundUtils.loadSound();
            //    var that = this;
            //    document.addEventListener("keydown",function(evt) {
            //        evt.char;
            //        that.close();
            //    })
            //11068测试按钮
            // var btn11068 = new eui.Label("11068");
            // btn11068.x = 10;
            // btn11068.y = 200;
            // btn11068.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {__SEND_NOTIFICATION(app.NetAction.REQ_SCORE);}, this);
            // this.addChild(btn11068);
            this.tableMesslab.addEventListener(egret.TextEvent.LINK, function (e) {
                tip.popSysCenterTip("加入房间输入房间id:" + playcards.getProxy().joinNumber + "可加入此房间");
            }, this);
        };
        // public setData(val: any): void {
        //     super.setData(val);
        //      //本来放在外面处理，因为存在多个入口，现在放到界面里处理
        //     if (this.uiOpenData == OPEN_PARAM.WAITING||this.uiOpenData ==OPEN_PARAM.SINGLE||this.uiOpenData ==OPEN_PARAM.CONNECT_GS||this.uiOpenData ==OPEN_PARAM.NONE) {
        //         getProxy().tableVO = null;
        //         getProxy().playvideovo = null;
        //         getProxy().mySeat = -1;
        //         getProxy().mySeatvo = null;           
        //     }
        //     if (this.uiOpenData == OPEN_PARAM.CONNECT_GS) {
        //             this.uiOpenData = null;
        //              __SEND_NOTIFICATION(app.NetAction.CONNECT_GS);
        //     } 
        //     user.getProxy().freeFlag = false;
        // }
        PlayCardsUIMoudleComp.prototype.addParent = function () {
            _super.prototype.addParent.call(this);
            playcards.getProxy().isPlayCard = true;
            playcards.getProxy().nextLeave = false;
            if (this.initialized) {
                //  if(utils.NativeUtils.getURLObj()['live']) 
                //      getProxy().isLive = true;
                var opendata = playcards.getProxy().opendata;
                //本来放在外面处理，因为存在多个入口，现在放到界面里处理
                if (opendata == 1 /* WAITING */ || opendata == 2 /* SINGLE */ || opendata == 3 /* CONNECT_GS */ || opendata == 4 /* NONE */) {
                    playcards.getProxy().tableVO = null;
                    playcards.getProxy().playvideovo = null;
                    playcards.getProxy().mySeat = -1;
                    playcards.getProxy().mySeatvo = null;
                }
                if (opendata == 3 /* CONNECT_GS */) {
                    playcards.getProxy().opendata = null;
                    __SEND_NOTIFICATION(app.NetAction.CONNECT_GS);
                }
                user.getProxy().freeFlag = false;
                this.effect.show();
                this.registerMediator(playcards.PlayCardsUIMediator);
                if (opendata == 2 /* SINGLE */) {
                    playcards.getProxy().isSingle = true;
                    __REGISTER_MEDIATOR(playcards.PlaycardsServerMediator, this);
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_START);
                }
                this.refVO();
                utils.SoundUtils.playBgSound(utils.SoundUtils.sng_bg, 0.6);
                RES.loadGroup("playeffect", 10);
                var type = room.getProxy().currentType;
                if (type == 8 /* FREE */) {
                    this.jbctip.alpha = 1;
                    this.setChildVisable(this.jbctip, true, this.tableGroup);
                    egret.setTimeout(this.timeHideFreeTip, this, 4000);
                }
                else
                    this.jbctip.removeFromParent();
                if (user.getProxy().willJoinMatchRoom) {
                    this.bgimg.source = "s9_bg_play_bg2_jpg";
                    this.effect.fapaimv.y = 203;
                    this.effect.fapaimv.x = 504;
                    this.effect.eyemv.x = 545;
                    this.effect.eyemv.y = 122;
                }
                else {
                    this.bgimg.source = "s9_bg_play_bg_jpg";
                    this.effect.fapaimv.y = 183;
                    this.effect.fapaimv.x = 508;
                    this.effect.eyemv.x = 549;
                    this.effect.eyemv.y = 101;
                }
            }
            //刷新MissionBox的状态
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.AWAKEN_MISSION_BOX);
        };
        PlayCardsUIMoudleComp.prototype.timeHideFreeTip = function () {
            egret.Tween.get(this.jbctip).to({ alpha: 0 }, 500).call(this.jbctip.removeFromParent, this.jbctip);
        };
        PlayCardsUIMoudleComp.prototype.changeSize = function () {
            this.allcardsGroup.y = (768 - this.stage.stageHeight) * 0.5 + (this.stage.stageHeight - 140);
            this.tableMessGroup.y = (768 - this.stage.stageHeight) * 0.5;
            this.zhuangimg.resetxy();
            for (var i = 0, len = 9; i < len; i++) {
                this.allItem[i].resetxy();
                this.allmoney[i].resetxy();
            }
        };
        PlayCardsUIMoudleComp.prototype.removeParent = function () {
            _super.prototype.removeParent.call(this);
            this.someDataClean();
            this.unregisterMediator();
            if (playcards.getProxy().isSingle) {
                playcards.getProxy().isSingle = false;
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_END);
                __REMOVE_MEDIATOR(playcards.PlaycardsServerMediator);
            }
            if (playcards.getTableVO() != null && playcards.getTableVO().whoplay > -1)
                this.allItem[playcards.getTableVO().whoplay].removeCD();
            playcards.getProxy().isPlayCard = false;
            playcards.getProxy().checkOUT(false);
            egret.clearInterval(this.timeoutAlertTime);
            utils.SoundUtils.playBgSound(utils.SoundUtils.game_bgm);
            if (this.playComp) {
                this.playComp.hideTrust();
                this.playComp.removeParent();
            }
            if (this.effect && this.effect.isPlayover)
                this.effect.playOverEnd();
            if (this.videoComp) {
                this.videoComp.stop();
                this.videoComp.nowvideo = null;
            }
            while (this.mainview && this.mainview.numChildren > 0) {
                var aa = this.mainview.getChildAt(this.mainview.numChildren - 1);
                if (aa instanceof app.base.BaseUIMoudleComponent || aa instanceof playcards.PlaycardsUIComp)
                    aa.close();
                else {
                    aa.removeFromParent(true);
                }
            }
            RES.destroyRes("playeffect");
            playcards.getProxy().removeGiftTextureAtlas();
            win.getProxy().isOpen(); //牌局结束打开结算；
            playcards.getProxy().isLive = false;
            user.getProxy().willJoinMatchRoom = false;
            playcards.getProxy().safeResult = null;
            playcards.getProxy().buySafe = 0;
            utils.NativeUtils.closeVedio();
            this.hideSafe();
            this.removeEventListener(eui.UIEvent.RESIZE, this.changeSize, this);
            __SEND_NOTIFICATION(gameabc.UIConstants.PRE_LOAD_VISABLE, true);
        };
        /**
         * 刷新桌子的盲注和前注信息
         */
        PlayCardsUIMoudleComp.prototype.refreshAnteAndBlind = function (tablevo) {
            // winproxy中数据缓存
            win.getProxy().getEnterData();
            // 发送财神请求
            mammon.getProxy()._sendMammonAction();
            var roomVO = user.getProxy().currentRoom;
            var proxy = playcards.getProxy();
            var messStr = "";
            if (roomVO != null && roomVO.type == 4 /* SNG */ && match.getProxy().currentMatchVO.entryFee) {
                messStr += FormatUtils.qian(match.getProxy().currentMatchVO.entryFee) + "场  ";
            }
            if (tablevo) {
                messStr += "盲注：" + FormatUtils.wan(tablevo.sbBet) + "/" + FormatUtils.wan(tablevo.bbBet);
                if (tablevo.preBet > 0) {
                    messStr += "  (前注：" + FormatUtils.wan(tablevo.preBet) + ")";
                }
                if (tablevo.cardmode == 1)
                    messStr += "  扑克牌:5-A";
            }
            else if (roomVO != null) {
                messStr += "盲注：" + FormatUtils.wan(roomVO.smallBlinds) + "/" + FormatUtils.wan(roomVO.bigBlinds);
            }
            // // 临时方案。
            // if(roomVO != null && roomVO.smallBlinds == 100 && roomVO.type == room.TYPE.NORMAL) {
            //         messStr += "  扑克牌:5-A";
            // }  
            // 如果roomvo 是空（比如播放录像），那么用tablevo来判断。正是方案！@wx
            if ((tablevo != null && tablevo.roomtype == 1) || (roomVO != null && roomVO.type == 8 /* FREE */)) {
                if (this.tableFreeLabel == null) {
                    this.tableFreeLabel = new eui.Image("icon_jinbichang_png");
                    this.tableFreeLabel.x = -75;
                    this.tableFreeLabel.y = 6;
                    this.tableMessGroup.addChildAt(this.tableFreeLabel, 0);
                }
                messStr += "  限注(1倍底池)";
            }
            else {
                if (this.tableFreeLabel != null) {
                    this.tableFreeLabel.removeFromParent(true);
                    this.tableFreeLabel = null;
                }
            }
            if (proxy.joinNumber != null) {
                // 
                if (7 /* PK */ == room.getProxy().currentType && (tablevo == null || tablevo.tableStatus == 0)) {
                    this.tableMesslab.textFlow = [
                        { text: messStr },
                        { text: " 房间ID：" + proxy.joinNumber, style: { "href": "event:text event triggered", "textColor": 0xffffff, "size": 30 } }
                    ];
                }
                else {
                    messStr += " 房间ID：" + proxy.joinNumber;
                    this.tableMesslab.textFlow = null;
                    this.tableMesslab.text = messStr;
                }
            }
            else
                this.tableMesslab.text = messStr;
        };
        PlayCardsUIMoudleComp.prototype.refVO = function () {
            this.checkLive();
            for (var i = 0; i < 5; i++) {
                this.allCard[i].hideLight();
                this.setChildVisable(this.allCard[i], false, this.allcardsGroup);
            }
            var tablevo = playcards.getTableVO();
            this.refreshAnteAndBlind(tablevo);
            this.playComp.setChildVisable(this.playComp.cggp, false, this.playComp.bottombtns);
            if (tablevo == null) {
                console.log("tablevo==null");
                if (playcards.getProxy().opendata == 4 /* NONE */) {
                    this.sendNotification(app.constant.AppMediatorConst.MATCH_NONEOPEN);
                    playcards.getProxy().opendata = null;
                }
                else
                    this.showWait();
                for (var i = 0; i < 9; i++) {
                    this.allItem[i].visible = false;
                    this.showBetNum(i, NaN);
                }
            }
            else {
                var proxy = playcards.getProxy();
                playcards.PlayCardsItemComp.CD_TIME = tablevo.timeCount * 1000;
                var allrole = tablevo.seatPlayerVO;
                var roleobj = {};
                var myid = this.getRoleId();
                proxy.mySeat = -1;
                proxy.mySeatvo = null;
                if (allrole) {
                    for (var i = 0, len = allrole.length; i < len; i++) {
                        var play = allrole[i];
                        if (play.roleId == myid) {
                            this.setMyHeadAvatar(play);
                            proxy.mySeatvo = play;
                            proxy.mySeat = play.seatId;
                        }
                        else {
                            if (!playcards.getProxy().isSingle)
                                __SEND_NOTIFICATION(app.NetAction.GET_HEAD_INFO, [play.roleId]); //获取玩家头像
                        }
                        roleobj[play.seatId] = play;
                    }
                }
                // for(var i: number = 0,len: number = tablevo.joinPlayerVO.length;i < len;i++) {
                //     var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
                //     if(join.roleId == myid) {
                //         proxy.myJoinPlayerVO = join;
                //         break;
                //     }
                // }
                var item;
                proxy.nowMaxBet = 0;
                proxy.nowMaxAddBetAll = 0;
                proxy.nowMaxAddBet = 0;
                for (var i = 0; i < 9; i++) {
                    if (i < tablevo.tableSize) {
                        item = this.allItem[i];
                        item.visible = true;
                        item.setData(roleobj[i]);
                        if (item.playvo != null) {
                            this.showBetNum(i, item.playvo.turnBet);
                            var max = Math.max(item.playvo.turnBet, proxy.nowMaxBet);
                            if (max > proxy.nowMaxBet) {
                                var add = max - proxy.nowMaxAddBetAll;
                                if (add >= proxy.nowMaxAddBet) {
                                    proxy.nowMaxAddBet = add;
                                    proxy.nowMaxAddBetAll = max;
                                }
                                proxy.nowMaxBet = max;
                            }
                        }
                        else
                            this.showBetNum(i, NaN);
                    }
                    else {
                        this.allItem[i].visible = false;
                        this.showBetNum(i, NaN);
                    }
                }
                this.resetAllXY();
                this.effect.addGlobalCards(tablevo.globalCards, tablevo.pots, false);
                // this.checkStart();
                // this.setBtns(false,tablevo.nowTime);
                this.sidepot.showAllBet();
                this.showWait(tablevo.tableStatus == 0);
                this.myIsAct = false;
                // this.isLiangpaiClick = false;
                proxy.isHuanZhuoClick = false;
            }
            this.checkBanker();
            //  if (room.getProxy().currentType == room.TYPE.FAST) {               
            //     this.setChildVisable(this.fastFoldBtn, true, this.right2btns);
            // } else {
            //     this.setChildVisable(this.fastFoldBtn, false, this.right2btns);
            // }
            if (this.isVideo()) {
                //  this.setChildVisable(this.bottombtns, false,this);
                this.setChildVisable(this.videoComp, true, this);
                this.videoComp.play();
                // this.videoComp.tweenShowBtns();
                this.btndashang.visible = false;
                //  this.setChildVisable(this.paijubtn, false, this.righttopbtns);
                //  this.setChildVisable(this.goumaibtn, false, this.righttopbtns);
                //  this.setChildVisable(this.replaybtn, true, this);
                //  if (user.getProxy().svrRoleId == null) {
                //      this.setChildVisable(this.btnbak,false,this);
                //  }
                //  this.setChildVisable(this.jubaobtn, record.getProxy().currentInof != null, this);
                this.setChildVisable(this.playComp, false, this);
            }
            else {
                this.setChildVisable(this.videoComp, false, this);
                this.setChildVisable(this.playComp, true, this);
                this.playComp.refVOBtns();
                this.videoComp.stop();
                var type = room.getProxy().currentType;
                this.btndashang.visible = !user.getProxy().willJoinMatchRoom && type != 8 /* FREE */ && type != -1; // TODO 当前暂时无法在sng中修改银子。等有接口再优化
            }
        };
        /***是否回放 */
        PlayCardsUIMoudleComp.prototype.isVideo = function () {
            return playcards.getProxy().playvideovo != null;
        };
        PlayCardsUIMoudleComp.prototype.checkLive = function () {
            if (playcards.getProxy().isLive) {
                utils.NativeUtils.openVedio(playcards.getTableVO().dealer);
                this.effect.eyemv.visible = this.effect.fapaimv.visible = this.bgimg.visible = false;
                this.addEventListener(eui.UIEvent.RESIZE, this.changeSize, this);
                this.allcardsGroup.y = (768 - this.stage.stageHeight) * 0.5 + (this.stage.stageHeight - 140);
                this.allcardsGroup.visible = false;
                this.sidepot.y = 480;
                this.tableMessGroup.y = (768 - this.stage.stageHeight) * 0.5 + 10;
                this.tableMessGroup.horizontalCenter = NaN;
                this.tableMessGroup.x = (1136 - this.stage.stageWidth) * 0.5 + 100;
                this.tableMesslab.textColor = 0xFFFFFF;
                this.messbg.visible = true;
                utils.SoundUtils.setPlayBgSoundvolume(0);
                RES.loadGroup("playgift", 10);
            }
            else {
                utils.NativeUtils.closeVedio();
                this.effect.eyemv.visible = this.effect.fapaimv.visible = this.bgimg.visible = true;
                this.allcardsGroup.y = 300;
                this.allcardsGroup.visible = true;
                this.sidepot.y = 268;
                this.removeEventListener(eui.UIEvent.RESIZE, this.changeSize, this);
                this.tableMessGroup.y = 411;
                this.tableMessGroup.horizontalCenter = 0;
                this.messbg.visible = false;
                this.tableMesslab.textColor = 0x9dffbf;
                utils.SoundUtils.setPlayBgSoundvolume(1);
            }
            this.checkdealer();
            this.zhuangimg.resetxy();
            for (var i = 0, len = 9; i < len; i++) {
                var item = this.allItem[i];
                item.resetLive();
                this.allmoney[i].resetxy();
            }
            this.playComp.resetLive();
            this.sidepot.resetLive();
        };
        /***更新荷官状态 */
        PlayCardsUIMoudleComp.prototype.checkdealer = function () {
            if (playcards.getProxy().isLive) {
                var state = playcards.getTableVO().dealerstate;
                this.playComp.setChildVisable(this.playComp.dealergroup, true, this.playComp);
                this.playComp.dealermess.text = gameabc.ResourceBundleUtil.getMessage("DEALERSTATE_" + state);
                this.playComp.dealergroup.visible = state != 0 /* IDLE */;
                this.allcardsGroup.visible = state == 3 /* LEAVE_SHORT_TIME */ || state == 5 /* WILL_COME_BACK */;
            }
            else
                this.playComp.setChildVisable(this.playComp.dealergroup, false, this.playComp);
        };
        /**
         * 玩家加入
         */
        // public addJoin(vo:appvos.JoinPlayerVO):void{
        //     var tablevo = getTableVO();
        //     for(var i: number = 0,len: number = tablevo.joinPlayerVO.length;i < len;i++) {
        //         var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
        //         if(join.roleId == vo.roleId) {                 
        //             tablevo.joinPlayerVO[i] = vo;
        //             break;
        //         }
        //     }
        //     if(i == tablevo.joinPlayerVO.length)
        //         tablevo.joinPlayerVO.push(vo);
        //     if (vo.roleId == this.getRoleId() {
        //         vo.avatarID =user.getProxy().svrHeadId.toString();
        //         getProxy().myJoinPlayerVO = vo;
        //     }else{
        //             __SEND_NOTIFICATION(app.NetAction.GET_HEAD_INFO,[vo.roleId]);//获取玩家头像
        //      }
        //      this.showWait();
        // }
        PlayCardsUIMoudleComp.prototype.getRoleId = function () {
            if (this.isVideo()) {
                return playcards.getProxy().playvideovo.roleid;
            }
            return user.getProxy().svrRoleId;
        };
        /**
         * 设置自己的头像avatar
         */
        PlayCardsUIMoudleComp.prototype.setMyHeadAvatar = function (vo) {
            if (playcards.getProxy().isSingle)
                return;
            if (user.getProxy().svrHeadId == 0) {
                __SEND_NOTIFICATION(app.NetAction.GET_HEAD_INFO, [vo.roleId]); //获取玩家头像
            }
            else {
                vo.avatarID = user.getProxy().svrHeadId.toString();
            }
        };
        /**
         * 玩家入座
         * @param vo
         */
        PlayCardsUIMoudleComp.prototype.addPlay = function (vo) {
            var seat = vo.seatId;
            var changeSeat = false;
            if (vo.roleId == user.getProxy().svrRoleId) {
                this.setMyHeadAvatar(vo);
                playcards.getProxy().mySeat = seat;
                playcards.getProxy().mySeatvo = vo;
                changeSeat = true;
                this.playComp.setBtns();
            }
            else {
                if (!playcards.getProxy().isSingle)
                    __SEND_NOTIFICATION(app.NetAction.GET_HEAD_INFO, [vo.roleId]); //获取玩家头像
                if (room.getProxy().currentType != 4 /* SNG */)
                    tip.popSysTopTip(vo.name + "玩家进入了牌局");
            }
            this.allItem[seat].setData(vo);
            if (changeSeat) {
                var px = (playcards.getProxy().mySeat - playcards.getProxy().midSeat);
                if (px < 0)
                    px += 9;
                if (px > 4)
                    px = -1;
                this.resetAllXY(px);
            }
            if (room.getProxy().currentType != 4 /* SNG */ && room.getProxy().currentType != 5 /* MTT */)
                this.showWait(changeSeat);
            // this.checkStart();
        };
        /**
         * 玩家离开座子
         * @param value 玩家id
         */
        // public removePlay(id:number):void{
        //     var tablevo = getTableVO();
        //     if(id== user.getPlayerInfo().roleId) {
        //         getProxy().mySeat = -1;   
        //         getProxy().mySeatvo = null;
        //         this.close();
        //         return;
        //     }        
        //     for(var i: number = 0,len: number = tablevo.seatPlayerVO.length;i < len;i++) {
        //         var play: appvos.SeatPlayerVO = tablevo.seatPlayerVO[i];
        //         if(play.roleId == id) {
        //             this.allItem[play.seatId].setData(null);
        //             tablevo.seatPlayerVO.splice(i,1)
        //             this.setChildVisable(this.allmoney[play.seatId],false,this.tableGroup);
        //             break;
        //         }
        //     }
        //      this.showWait();
        // }
        /**
         * 玩家座子站起
         * @param seatid 座位id
         */
        PlayCardsUIMoudleComp.prototype.removeSeat = function (seatid, type) {
            if (this.effect.isPlayover) {
                if (this.allItem[seatid].playvo != null) {
                    this.allItem[seatid].playvo.outType = type;
                    return;
                }
            }
            if (seatid == playcards.getProxy().mySeat) {
                playcards.getProxy().mySeat = -1;
                playcards.getProxy().mySeatvo = null;
                // 如果站起的是自己，并且之前请求换桌。
                if (playcards.getProxy().isHuanZhuoClick) {
                    // 如果牌局还没结束，增加等待时间。
                    var waitTime = 800;
                    if (playcards.getTableVO().tableStatus == 1) {
                        waitTime = 1800;
                    }
                    // __OPEN_MOUDLE(AppReg.PRELOAD);
                    __OPEN_PRELOAD();
                    egret.setTimeout(playcards.getProxy().change, playcards.getProxy(), waitTime);
                    // 如果是排队房，这里需要主动请空桌子，服务端不会发11104协议。
                    if (room.getProxy().isWaitingQueue) {
                        this.removeAllItem();
                    }
                }
                else if (room.getProxy().current) {
                    var currentType = room.getProxy().currentType;
                    var nomoney = currentType != 4 /* SNG */ && currentType != 5 /* MTT */ && currentType != 3 /* VIP */ && this.allItem[seatid].playvo != null && this.allItem[seatid].playvo.canContinue == 2; //!room.getProxy().permit(room.getProxy().current) 
                    if (nomoney || type == 1) {
                        if (room.getProxy().currentType == 8 /* FREE */ && nomoney) {
                            user.getProxy().freeFlag = true;
                        }
                        else {
                            if (nomoney)
                                user.getProxy().notMoney();
                        }
                        playcards.getProxy().outbakfun();
                    }
                    return;
                }
                // this.setChildVisable(this.biaoqingbtn,false,this.bottombtns);
                this.playComp.setBtns();
                // 如果站起的是自己，则把作为转回0
                this.resetAllXY();
            }
            else if (this.allItem[seatid].playvo != null)
                tip.popSysTopTip(this.allItem[seatid].playvo.name + "玩家离开了牌局");
            // var tablevo = getTableVO(); 
            this.allItem[seatid].setData(null);
            this.setChildVisable(this.allmoney[seatid], false, this.allitemsGroup);
            this.showWait();
            // this.checkStart();
        };
        // private checkChange(evt:egret.Event):void{
        //     var check: eui.CheckBox = evt.target;
        //     if(check.selected){
        //         for (var i: number = 0; i < 3; i++) {
        //             if (this.allcheck[i] != check) {
        //                 this.updateCheckBox(this.allcheck[i], false);
        //             } else {
        //                 this.updateCheckBox(this.allcheck[i],true);
        //             }
        //         }
        //     } else {
        //         this.updateCheckBox(check,false);
        //     }
        // }
        /**
         * 是否显示开始按钮
         */
        // public checkStart():void{           
        //     var tablevo = getTableVO();
        //     var canstart: b\olean = tablevo.roleId == user.getRoleVO().roleId  && tablevo.tableStatus==0
        //      this.setChildVisable(this.startbtn,canstart,this.tableGroup);
        // }
        /**
         * 新的牌局开始重置桌面
         */
        PlayCardsUIMoudleComp.prototype.start = function (sbsit, bbsit, allvo, ante) {
            if (ante === void 0) { ante = 0; }
            //自动补充筹码
            var proxy = playcards.getProxy();
            if (proxy.isAutoAddBet && proxy.mySeat > -1)
                __PVO().i(playcards.getTableVO().minJoinMoney * playcards.getTableVO().maxMagnification).to(app.NetAction.MATCH_TAKEIN);
            for (var i = 0; i < 5; i++) {
                this.allCard[i].hideLight();
                this.setChildVisable(this.allCard[i], false, this.allcardsGroup);
            }
            var tableSize = playcards.getTableVO().tableSize;
            var sbBet = playcards.getTableVO().sbBet;
            var bbBet = proxy.nowMaxAddBet = playcards.getTableVO().bbBet;
            proxy.nowMaxAddBetAll = proxy.nowMaxBet = bbBet + playcards.getTableVO().preBet;
            //            var bbBet = getProxy().nowMaxAddBet = getProxy().nowMaxBet = getTableVO().bbBet;
            for (var i = 0; i < tableSize; i++) {
                var seatvo = this.allItem[i].playvo;
                var add = null;
                if (seatvo) {
                    var infovo = allvo[i];
                    if (infovo) {
                        seatvo.reset(true);
                        seatvo.nowBet = infovo.betNum;
                        add = infovo.gameResult;
                        if (seatvo.roleId == user.getProxy().svrRoleId) {
                            playcards.getProxy().lineHistory.push(seatvo.nowBet);
                            playcards.getProxy().lineHistoryFixed.push(0);
                        }
                        if (i == proxy.mySeat && infovo.addBetNum != null && infovo.addBetNum > 0) {
                            var str = "自动补充" + FormatUtils.wan(infovo.addBetNum) + (room.getProxy().currentType == 8 /* FREE */ ? "金币" : "彩豆");
                            if (!proxy.isSingle && !this.isVideo() && user.getProxy().svrGameData)
                                str += "，当前账户余额为" + (room.getProxy().currentType == 8 /* FREE */ ? FormatUtils.wan(user.getProxy().freeGold - seatvo.nowBet) : FormatUtils.wan(user.getProxy().svrGameData.silver - seatvo.nowBet));
                            tip.popSysTopTip(str);
                            if (seatvo.roleId == user.getProxy().svrRoleId) {
                                playcards.getProxy().lineHistoryFixed.pop();
                                playcards.getProxy().lineHistoryFixed.push(seatvo.nowBet - infovo.addBetNum);
                            }
                        }
                    }
                    else
                        seatvo.reset(false);
                    if (add == null) {
                        if (i == sbsit) {
                            add = sbBet + ante;
                        }
                        else if (i == bbsit) {
                            add = bbBet + ante;
                        }
                        else {
                            // if (ante > 0) {
                            add = ante;
                        }
                    }
                    seatvo.totalBet = seatvo.turnBet = add;
                    this.showBetNum(i, add);
                    playcards.getTableVO().totalBet += seatvo.totalBet;
                }
                else
                    this.setChildVisable(this.allmoney[i], false, this.allitemsGroup);
                this.allItem[i].restPlay();
            }
            this.checkBanker();
            this.sidepot.setalldata([]);
            this.sidepot.showAllBet();
            this.showWait();
            this.playComp.refRank();
            this.playComp.clearLiangPaiTimer();
            this.playComp.liangPaiEndFunc();
        };
        /*显示庄位*/
        PlayCardsUIMoudleComp.prototype.checkBanker = function () {
            if (playcards.getTableVO() != null && playcards.getTableVO().banker > -1 && playcards.getTableVO().tableStatus == 1) {
                this.setChildVisable(this.zhuangimg, true, this.tableGroup);
                this.zhuangimg.resetxy();
            }
            else
                this.setChildVisable(this.zhuangimg, false, this.tableGroup);
        };
        /**
         * 玩家操作
         * @param seatid  玩家座位号
         * @param action  玩家命令
         * @param betNum 下注金额
         */
        PlayCardsUIMoudleComp.prototype.playAction = function (seatid, action, betNum, effect) {
            if (effect === void 0) { effect = true; }
            var nowplay = this.allItem[seatid];
            nowplay.playAction(action, effect);
            if (action == playcards.getProxy().ACT_FOLD && effect) {
                this.effect.playfold(nowplay);
            }
            var tablevo = playcards.getTableVO();
            if (betNum > 0 && nowplay.playvo != null) {
                nowplay.playvo.nowBet -= betNum;
                nowplay.playvo.turnBet += betNum;
                nowplay.playvo.totalBet += betNum;
                nowplay.refMoneylab();
                tablevo.totalBet += betNum;
                if (effect)
                    this.effect.showAddBet(seatid, nowplay.playvo.turnBet, betNum);
                else
                    this.showBetNum(seatid, nowplay.playvo.turnBet);
                var max = Math.max(nowplay.playvo.turnBet, playcards.getProxy().nowMaxBet);
                if (max > playcards.getProxy().nowMaxBet) {
                    var add = max - playcards.getProxy().nowMaxAddBetAll;
                    if (add >= playcards.getProxy().nowMaxAddBet) {
                        playcards.getProxy().nowMaxAddBet = add;
                        playcards.getProxy().nowMaxAddBetAll = max;
                    }
                    playcards.getProxy().nowMaxBet = max;
                }
            }
            this.sidepot.showAllBet();
            this.playComp.setBtns();
        };
        /**
         * cd结束
         */
        PlayCardsUIMoudleComp.prototype.cdover = function () {
            var isTalk = Math.random() < 0.1;
            if (isTalk) {
                this.effect.dealerCDOverTalk();
            }
            this.playComp.trustAction();
            //  if (DEBUG) {
            //      this.playComp.showTrust();
            //      return;
            // }          
            // if(room.getProxy().currentType != room.TYPE.SNG)//赛事放不踢出
            playcards.getProxy().outTime++;
            if (playcards.getProxy().outTime == 2) {
                if (room.getProxy().currentType == 4 /* SNG */ || room.getProxy().currentType == 5 /* MTT */ || playcards.getProxy().isSingle) {
                    this.playComp.showTrust();
                }
                else {
                    playcards.getProxy().outTime = 0;
                    tip.Alert.show("您连续两次下注超时，是不是太累呢？先休息下吧！");
                    playcards.getProxy().outbakfun();
                }
            }
        };
        /**
         * 座位重新排
         * @param px 0不需要移动位子 <0 左边移动 >0右边移动
         */
        PlayCardsUIMoudleComp.prototype.resetAllXY = function (px) {
            if (px === void 0) { px = 0; }
            for (var i = 0; i < 9; i++) {
                this.allItem[i].resetxy(px);
                this.allmoney[i].resetxy();
            }
            this.zhuangimg.resetxy();
        };
        PlayCardsUIMoudleComp.prototype.updateInfoTip = function (labelvo) {
            for (var i = 0; i < 9; i++) {
                if (this.allItem[i] && this.allItem[i].playvo && this.allItem[i].playvo.roleId == labelvo.userId) {
                    this.allItem[i].showLabeEvent(labelvo);
                    this.allItem[i].showHead();
                }
            }
        };
        /**设置筹码数量 */
        PlayCardsUIMoudleComp.prototype.showBetNum = function (seatid, betNum) {
            var money = this.allmoney[seatid];
            if (isNaN(betNum) || betNum == 0 || betNum == null) {
                this.setChildVisable(money, false, this.allitemsGroup);
            }
            else {
                this.setChildVisable(money, true, this.allitemsGroup, 0);
                money.setMoney(betNum);
            }
        };
        PlayCardsUIMoudleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            _super.prototype.touchBindButtonHandler.call(this, clickTarget);
            switch (clickTarget) {
                case this.btndashang:
                    //      if (DEBUG) {
                    //     // getProxy().isLive = !getProxy().isLive;
                    //     // this.checkLive();
                    //   __PVO().i(1, 0,5).to(app.NetAction.GLXY_MESSAGEVO_REQ_GUESS_CARD);
                    //          return;
                    //    }
                    if (playcards.getProxy().mySeat > -1) {
                        var time = egret.getTimer();
                        if (time - this.sendtime < 100)
                            return;
                        this.sendtime = time;
                        var mess = "CHAT_" + (301 + Math.floor(Math.random() * 10));
                        __PVO().i(playcards.getProxy().mySeat, playcards.getProxy().dashangchar).s(mess).to(app.NetAction.MATCH_SEND_GIFT);
                        mc2sdk.event(52901 /* PLAYCARD_DILA */);
                    }
                    else
                        tip.popSysCenterTip("您没有坐下，无法打赏", tip.TIPS_TYPE.TIPS_WARNING);
                    break;
                case this._btn_zidongqipai:
                    mammon.getProxy()._zidongqipai = !mammon.getProxy()._zidongqipai;
                    if (mammon.getProxy()._zidongqipai) {
                        this._btn_zidongqipai.label = "取消自动";
                    }
                    else {
                        this._btn_zidongqipai.label = "自动弃牌";
                    }
            }
        };
        /*显示牌型提示*/
        PlayCardsUIMoudleComp.prototype.showTip = function () {
            if (this.tipview == null) {
                this.tipview = new playcards.PlayCardTipComp();
            }
            this.mainview.addChild(this.tipview);
            this.tipview.show();
        };
        /***显示升盲 */
        PlayCardsUIMoudleComp.prototype.timeoutAlert = function (timeout) {
            egret.clearInterval(this.timeoutAlertTime);
            match.getProxy().setBetUpInterval(this.intervalalert, this, timeout);
            //以下逻辑移到以上的Proxy中(并增加了时间同步)
            // var blinds = match.getProxy().currentMatchVO.blinds;
            // var times: number = 0;
            // for (var i: number = 0, len: number = blinds.length; i < len; i++){
            //     var vo = blinds[i];
            //     times += vo.time;
            //     if (times >= timeout) {
            //         vo = blinds[i + 1];
            //         if (vo) {
            //             this.intervalalert(times - timeout , vo, i);
            //             // this.timeoutAlertTime =  egret.setTimeout(this.alertUpBB, this, (times - timeout) * 1000, vo, i);
            //         }
            //         match.getProxy().betIndex = i;
            //       break;
            //     }                  
            // }
        };
        PlayCardsUIMoudleComp.prototype.alertUpBB = function (vo, index) {
            var mess = "";
            if (vo.antiBlinds > 0)
                mess = " ,前注：" + vo.antiBlinds;
            tip.popSysCenterTip("下局盲注将升至：" + FormatUtils.wan(vo.smallBlinds) + "/" + FormatUtils.wan(vo.bigBlinds) + mess);
            var blinds = match.getProxy().currentMatchVO.blinds;
            vo = blinds[index + 1];
            if (vo)
                this.intervalalert(vo.time, vo, index + 1);
            // this.timeoutAlertTime = egret.setTimeout(this.alertUpBB, this, vo.time * 1000, vo, index + 1);
        };
        PlayCardsUIMoudleComp.prototype.intervalalert = function (time, vo, index) {
            match.getProxy().currentMatchVO.blindsIndex = index;
            egret.clearInterval(this.timeoutAlertTime);
            this.bettime = time;
            this.playComp.setLeftTime(this.bettime);
            this.timeoutAlertTime = egret.setInterval(this.setLeftTime, this, 1000, vo, index);
        };
        PlayCardsUIMoudleComp.prototype.setLeftTime = function (vo, index) {
            if (this.bettime >= 0) {
                this.playComp.setLeftTime(this.bettime);
                this.bettime--;
            }
            else {
                egret.clearInterval(this.timeoutAlertTime);
                this.alertUpBB(vo, index);
            }
        };
        /***显示等待玩家(isfirst进来的时候没在打牌) */
        PlayCardsUIMoudleComp.prototype.showWait = function (isfrist) {
            if (isfrist === void 0) { isfrist = false; }
            var num = 0;
            var talbevo = playcards.getTableVO();
            if (talbevo != null) {
                if (!this.effect.isPlayover && talbevo.tableStatus == 0) {
                    for (var i = 0; i < 9; i++) {
                        if (this.allItem[i].playvo != null) {
                            num++;
                            if (num > 1)
                                break;
                        }
                    }
                }
                playcards.getProxy().checkOUT(num < 2 && talbevo.tableStatus == 0 && playcards.getProxy().isPlayCard && room.getProxy().current && !room.getProxy().isNormal);
            }
            if (talbevo == null || ((isfrist || num < 2) && !this.effect.isPlayover && talbevo.tableStatus == 0)) {
                if (talbevo == null || playcards.getProxy().mySeat > -1 || (room.getProxy().current && room.getProxy().isAntiCheating)) {
                    this.addWait();
                }
                else if (this.wait != null)
                    this.wait.removeFromParent();
            }
            else if (this.wait != null && talbevo.tableStatus != 0)
                this.wait.removeFromParent();
            if (this.wait != null && this.wait.parent) {
                var type;
                if (room.getProxy().currentType == 5 /* MTT */) {
                    if (num < 2)
                        type = 2;
                    else
                        type = 3;
                }
                else if (talbevo == null || num < 2)
                    type = 1;
                else
                    type = 0;
                this.wait.showType(type);
                if (room.getProxy().currentType == 4 /* SNG */) {
                    this.sendNotification(app.constant.AppMediatorConst.UPDATE_MATCH_NUMPLAYERS);
                }
                for (var i = 0; i < 5; i++) {
                    this.setChildVisable(this.allCard[i], false, this.allcardsGroup);
                }
                for (var i = 0, len = this.allItem.length; i < len; i++) {
                    var item = this.allItem[i];
                    if (item.playvo) {
                        item.restPlay();
                        item.playvo.reset(item.playvo.isPlay);
                        item.playover();
                    }
                }
                if (talbevo != null) {
                    talbevo.totalBet = 0;
                }
                this.sidepot.clearAll();
            }
        };
        PlayCardsUIMoudleComp.prototype.addWait = function () {
            if (this.wait == null) {
                this.wait = new playcards.WaitComp();
            }
            this.tableGroup.addChild(this.wait);
        };
        /**购买保险 */
        PlayCardsUIMoudleComp.prototype.showSafe = function (data) {
            if (data.intValues[0] == -1) {
                this.effect.showMess(605, 95, "当前反杀牌数＞14或平手，不激活保险！", this.effect.fapaimv.parent, "left");
                return;
            }
            else if (!this.isVideo() && data.intValues[0] == playcards.getProxy().mySeat) {
                playcards.getProxy().buySafe = 1;
                this.effect.tweenHideWnd();
            }
            else {
                playcards.getProxy().buySafe = 2;
                // this.addWait();
                // this.wait.showType(4);//4等待其他用户购买保险中
                // this.wait.bgrect.visible = true;
                if (this.buyItem && this.buyItem.sendMess)
                    this.buyItem.sendMess.close();
                this.buyItem = this.allItem[data.intValues[0]];
                this.effect.showItemMess(this.buyItem, this.buyItem.playvo.name + "购买保险中");
                if (this.buyItem.sendMess)
                    this.buyItem.sendMess.clearTimeout();
            }
            if (this.safecomp == null)
                this.safecomp = new playcards.PlaycardSafeComp();
            this.addChild(this.safecomp);
            this.safecomp.show(data);
        };
        PlayCardsUIMoudleComp.prototype.hideSafe = function () {
            if (this.buyItem && this.buyItem.sendMess)
                this.buyItem.sendMess.close();
            this.buyItem = null;
            playcards.getProxy().buySafe = 0;
            if (this.safecomp != null)
                this.safecomp.removeFromParent();
            if (this.wait)
                this.wait.removeFromParent();
            this.effect.tweenShowWnd();
        };
        /**在线人数量 */
        PlayCardsUIMoudleComp.prototype.getPlayerNum = function () {
            var num = 0;
            for (var i = 0; i < 9; i++) {
                if (this.allItem[i].playvo != null) {
                    num++;
                }
            }
            return num;
        };
        /**移除所有人 显示等待 */
        PlayCardsUIMoudleComp.prototype.removeAllItem = function () {
            var vo = playcards.getTableVO();
            if (vo != null) {
                vo.tableStatus = 0;
                if (vo.whoplay > -1)
                    this.allItem[vo.whoplay].removeCD();
            }
            for (var i = 0, len = this.allItem.length; i < len; i++) {
                var item = this.allItem[i];
                item.setData(null);
                item.visible = false;
                this.setChildVisable(this.allmoney[i], false, this.allitemsGroup);
            }
            this.checkBanker();
            this.showWait();
        };
        PlayCardsUIMoudleComp.prototype.cancelHuntMC = function () {
            for (var i = 0; i < this.allItem.length; i++) {
                this.allItem[i].cancelMC();
            }
        };
        //  openvideo() {
        //      var myPlayer = nep.neplayer("my-video", [], [this.ready]);
        //      myPlayer.setDataSource("http://v03a795c4.live.126.net/live/7ce23cdde59f4c08804ed22c6f282d6c.flv");
        //  }
        //  ready() {
        // }
        /**一些数据清理 普通房折线图 好友状态 */
        PlayCardsUIMoudleComp.prototype.someDataClean = function () {
            user.getProxy().friendStatus = 1 /* NULL */;
            __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [user.getProxy().friendStatus, -1]);
            playcards.getProxy().lineHistory = [];
            playcards.getProxy().lineHistoryFixed = [];
            playcards.getProxy().cgNumber = null;
            if (room.getProxy().currentType == 8 /* FREE */)
                this.sendNotification(app.NetAction.TOOL_RILVER, AppConst.GAME_ID_FREE);
        };
        PlayCardsUIMoudleComp.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            playcards.getProxy().removeTextureAtlas();
            RES.destroyRes("play");
            RES.destroyRes("card");
            // this.clearLiangPaiTimer();
            // if(this.moneySelect)
            //     this.moneySelect.dispose();
            // if(this.outmenu)
            //     this.outmenu.dispose();
            if (this.playComp) {
                this.playComp.dispose();
            }
            if (this.effect)
                this.effect.dispose();
            if (this.allItem) {
                for (var i = 0; i < 9; i++) {
                    this.allItem[i].dispose();
                }
            }
        };
        return PlayCardsUIMoudleComp;
    }(app.base.BaseSceneUIMoudleComponent));
    playcards.PlayCardsUIMoudleComp = PlayCardsUIMoudleComp;
    __reflect(PlayCardsUIMoudleComp.prototype, "playcards.PlayCardsUIMoudleComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardsUIMoudleComp.js.map