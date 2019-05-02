var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    var RoomMoudle = (function (_super) {
        __extends(RoomMoudle, _super);
        function RoomMoudle() {
            var _this = _super.call(this) || this;
            //vipbtn动画延迟id
            _this.delayId = 0;
            _this.roomLen = room.getProxy().room1.length;
            _this.TOTLE_LEN = 4;
            _this.ROOM_GUIDETYPE_1W = 10000;
            _this.ROOM_GUIDETYPE_4W = 40000;
            _this.ROOM_GUIDETYPE_40W = 400000;
            _this.autoLoadId = -1;
            _this.autoStep = 180000; //自动刷新人数间隔
            _this.horizontalCenter = 0;
            _this.verticalCenter = 0;
            _this.skinName = "RoomSkin";
            return _this;
        }
        RoomMoudle.prototype.createComplete = function (event) {
            var _this = this;
            _super.prototype.createComplete.call(this, event);
            this.drawCircle();
            this.buttonGroup = new uicomps.ButtonGroup();
            this.buttonGroup.add(this.room1Button);
            // this.buttonGroup.add(this.room2Button);
            this.buttonGroup.add(this.room3Button);
            if (user.getProxy().svrAreaId == cy.AREA_GAMETEA) {
                this.buttonGroup.add(this.room4Button);
            }
            else {
                this.room4Button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    tip.popSysCenterTip("FUNCTION_NO_TIPS");
                    _this.room4Button.selected = false;
                }, this);
            }
            //            this.buttonGroup.add(this.room5Button);
            this.room5Button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                tip.popSysCenterTip("FUNCTION_NO_TIPS");
                _this.room5Button.selected = false;
            }, this);
            this.buttonGroup.itemClick = this.touchHandler;
            this.buttonGroup.itemThisObj = this;
            var data = RES.getRes("mc_main_light_json");
            var texture = RES.getRes("mc_main_light_png");
            var mcFactory = new egret.MovieClipDataFactory(data, texture);
            // this.vipCreateButton = new egret.MovieClip(mcFactory.generateMovieClipData("BtnKaifang"));
            // this.vipCreateButton.gotoAndPlay("BtnKaifang",1);
            // this.vipCreateButton.touchEnabled = true;
            // this.vipCreateButton.addEventListener(egret.Event.COMPLETE,(event:egret.Event) => {
            //     if(this.delayId > 0) {
            //         egret.clearTimeout(this.delayId);
            //     }
            //     this.delayId = egret.setTimeout(()=>{
            //         this.vipCreateButton.gotoAndPlay("BtnKaifang",1);
            //     },this,2000);
            // },this);
            // this.vipGroup.addChildAt(this.vipCreateButton,0);
            this.bindButton(this.backButton);
            // this.bindButton(this.btnAdd);
            this.bindButton(this.coinArea, false);
            this.bindButton(this.fastJoinButton);
            // this.bindButton(this.vipCreateButton);
            this.bindButton(this.joinButton);
            this.bindButton(this.btnUp);
            this.bindButton(this.fastModeButton);
            this.bindButton(this.listModeButton);
            this.bindButton(this.billButton);
            this.bindButton(this.listItem0);
            // this.addEventListener(egret.Event.ADDED_TO_STAGE,(event:egret.Event)=> {
            //     this.vipCreateButton.gotoAndPlay("BtnKaifang",1);
            // },this);
            this.addMeditator();
            // var layout = new eui.TileLayout();
            // layout.horizontalGap = 30;
            // layout.verticalGap = 20;
            // layout.paddingTop = 20;
            // layout.paddingLeft = 20;
            // layout.paddingRight = 20;
            // this.tableList2.layout = layout;    
            // this.tableList2.itemRenderer = Table2Renderer;
            //普通游戏房人数选择暂时关闭
            this.menuBar.visible = false;
            this.menuBar.pageSize = 2;
            var datas = [
                { label: "6人桌" },
                { label: "9人桌" }
            ];
            this.menuBar.itemRenderer = uicomps.ChrooseMenuItemRenderer;
            this.menuBar.dataProvider = datas;
            this.menuBar2.focusCD = 500;
            this.menuBar2.pageSize = 3;
            this.menuBar2.itemRenderer = room.VipRoomRenderer;
            this.menuBar2.dataProvider = room.getProxy().room4;
            this.menuBar2.addEventListener(egret.Event.CHANGE, this.changeVipRoom, this);
            this.menuBar2.visible = false;
            for (var i = 0; i < this.TOTLE_LEN; ++i) {
                var item = this["listItem" + (i + 1)];
                if (i < this.roomLen) {
                    item.setBgType(i);
                    this.bindButton(item);
                }
                else {
                    item.removeFromParent(true);
                }
            }
            this.buttonGroup.select(this.room1Button);
            this.touchBindButtonHandler(this.room1Button);
            this.playTween();
            this.addDebugTouch();
            utils.SoundUtils.loadSound();
            if (!platform.isGTPCChannel()) {
            }
            this.addDragonBones();
        };
        RoomMoudle.prototype.addParent = function () {
            _super.prototype.addParent.call(this);
            user.getProxy().loginDataInit();
        };
        RoomMoudle.prototype.updateFreeBrokeMission = function () {
            if (user.getProxy().freeFlag == true && user.getProxy().roomState != 2 /* IN */) {
                if (user.getProxy().freeGold <= room.getProxy().MIN_GOLD_LIMITED) {
                    var missions = mission.getProxy().getclvMissionInfos(mission.MissionType.free_broke, mission.MissionSubType.free_broke);
                    if (missions.length > 0) {
                        var m = missions[0];
                        if (m.status == 1) {
                            __OPEN_PRE_MOUDLE(AppReg.APP_FREEBROKE, m);
                        }
                        else {
                            if (user.getProxy().freeFlag == true)
                                user.getProxy().notMoney("金币不足，请点击免费房领取摇钱树奖励", true);
                        }
                        user.getProxy().freeFlag = false;
                    }
                }
                else {
                    user.getProxy().freeFlag = false;
                }
            }
        };
        RoomMoudle.prototype.updateCoin = function () {
            if (user.getProxy().svrGameData != null) {
                this.txtCou.text = FormatUtils.qian(user.getProxy().svrGameData.silver) + "";
            }
        };
        Object.defineProperty(RoomMoudle.prototype, "selectVipRoom", {
            get: function () {
                return this.menuBar2.selectItemData;
            },
            enumerable: true,
            configurable: true
        });
        RoomMoudle.prototype.changeVipRoom = function (p) {
            // console.log("changeVipRoom");
        };
        RoomMoudle.prototype.gotoVipRoom = function () {
            // if(this.tableList2.selectedIndex==-1||
            // user.getProxy().currentRoom!=this.selectVipRoom) {
            //     user.gotoRoom(this.selectVipRoom);
            // } else {
            //     this.updateVipTable();
            // }
            // TODO, @hk selectVipRoom 有概率是空(可能是渲染问题,需要去查ChrooseMenu的原因), 在此处需要做处理.
            //只能进第二个房间(暂时关闭其他房间)
            if (user.getProxy().currentRoom == room.getProxy().room4[1]) {
                this.updateVipTable();
            }
            else {
            }
        };
        RoomMoudle.prototype.gotoNormalRoom = function () {
            if (this.selectNormalRoom != null) {
                if (true) {
                    user.gotoRoom(this.selectNormalRoom);
                }
                else if (room.getProxy().permit(this.selectNormalRoom)) {
                    if (this.isMidRoomGuid()) {
                        this.openMidRoomGuid();
                    }
                    else {
                        user.gotoRoom(this.selectNormalRoom);
                    }
                }
                else {
                    var tipStr = gameabc.ResourceBundleUtil.getMessage("ROOM_PERMIT", FormatUtils.wan(this.selectNormalRoom.minBank));
                    user.getProxy().openMoney();
                }
            }
        };
        RoomMoudle.prototype.isMidRoomGuid = function () {
            this.guideRoom = null;
            var silver = user.getProxy().svrGameData.silver;
            var nowDate = this.getNowStringDate();
            var localDate = gameabc.LocalSO.getItem("MIDROOMGUID" + user.getProxy().svrRoleId);
            if (localDate != null && localDate == nowDate)
                return false;
            if (silver >= this.selectNormalRoom.maxBank * 10) {
                this.guideRoom = this.getRoomVOBySilver(silver, room.getProxy().room1);
                return this.guideRoom == null ? false : true;
            }
            return false;
        };
        RoomMoudle.prototype.openMidRoomGuid = function () {
            var maxBank = this.selectNormalRoom.maxBank;
            var guidMaxBank = this.guideRoom.maxBank;
            var yesBtnImage = guidMaxBank < 10000 ? "iw_qianwang" + guidMaxBank / 1000 + "kchang_room_png" : "iw_qianwang" + guidMaxBank / 10000 + "wanchang_room_png";
            var noBtnImage = maxBank < 10000 ? "iw_qianwang" + maxBank / 1000 + "kchang_room_png" : "iw_qianwang" + maxBank / 10000 + "wanchang_room_png";
            tip.Alert.show("您的彩豆更适合前往" + FormatUtils.wan(guidMaxBank) + "游戏场，是否与新的牌友切磋牌技？", null, tip.CONFIRM_CHECK_NEW, function (type) {
                if (type === void 0) { type = tip.YES; }
                if (type == tip.YES) {
                    this.selectNormalRoom = this.guideRoom;
                }
                user.gotoRoom(this.selectNormalRoom);
                gameabc.LocalSO.setItem("MIDROOMGUID" + user.getProxy().svrRoleId, this.getNowStringDate());
            }, null, this, null, null, yesBtnImage, noBtnImage);
        };
        RoomMoudle.prototype.getRoomVOBySilver = function (silver, roomList) {
            var i = roomList.length;
            while (--i > -1) {
                if (silver >= roomList[i].maxBank) {
                    if (this.selectNormalRoom.maxBank == roomList[i].maxBank)
                        return null;
                    return roomList[i];
                }
            }
            return null;
        };
        RoomMoudle.prototype.getNowStringDate = function () {
            var date = new Date();
            var stringDate = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
            return stringDate;
        };
        RoomMoudle.prototype.updateVipTable = function () {
            this.tableList2.dataProvider = new eui.ArrayCollection(room.getProxy().displayTableList);
        };
        RoomMoudle.prototype.addMeditator = function () {
            this.registerMediator(room.RoomUIMediator);
        };
        RoomMoudle.prototype.getVirtualTableList = function (roomVO) {
            var arr = [];
            for (var i = 0; i < 6; ++i) {
                var tableVo = new room.TableVO();
                tableVo.roomInfo = roomVO;
                arr.push(tableVo);
            }
            return arr;
        };
        Object.defineProperty(RoomMoudle.prototype, "currentRoomList", {
            get: function () {
                switch (this.buttonGroup.selectedButton) {
                    case this.room1Button:
                        return room.getProxy().room1;
                    // case this.room2Button:
                    //     return room.getProxy().room2;
                    case this.room3Button:
                        return room.getProxy().room3;
                    case this.room4Button:
                        return room.getProxy().room4;
                    case this.room5Button:
                        return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        RoomMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.room1Button:
                    this.showNormalGroup();
                    this.loadListData(room.getProxy().room1);
                    this.loadListData(room.getProxy().room2);
                    mc2sdk.event(50004 /* ROOMTAB_NORMAL */);
                    break;
                case this.room5Button:
                    this.showDealerGroup();
                    room.getProxy().dealerList = [];
                    this.sortDealerList();
                    __PVO().to(app.NetAction.REQ_DEALER_LIST);
                    // __PVO().l(4294967499).to(app.NetAction.REQ_DEALER_INFO);
                    // __PVO().l(4294967510).to(app.NetAction.REQ_DEALER_INFO);
                    //4294967499 4294967510
                    break;
                // case this.room2Button:
                //     this.showNormalGroup();
                //     this.loadListData(room.getProxy().room2);
                //     break;
                case this.room3Button:
                    this.showNormalGroup();
                    this.loadListData(room.getProxy().room3);
                    mc2sdk.event(50005 /* ROOMTAB_FAST */);
                    break;
                case this.listItem1:
                case this.listItem2:
                case this.listItem3:
                case this.listItem4:
                case this.listItem5:
                case this.listItem6:
                    this.selectNormalRoom = clickTarget.roomVO;
                    this.gotoNormalRoom();
                    break;
                case this.fastJoinButton:
                    // var silver = user.getProxy().svrGameData.silver;
                    // var roomVO = room.getProxy().getRoomVOFromMinSilver(silver,this.currentRoomList);
                    // this.selectNormalRoom = roomVO;
                    // mc2sdk.event(mc2sdk.EVENT_TYPE.ROOM_FAST);
                    // this.gotoNormalRoom();
                    room.getProxy().fastRoom();
                    break;
                case this.room4Button:
                    this.showJoinGroup();
                    this.gotoVipRoom();
                    mc2sdk.event(50006 /* ROOMTAB_VIP */);
                    break;
                // case this.vipCreateButton:
                //     __OPEN_MOUDLE(AppReg.CREATE_ROOM,null,[AppReg.ROOM]);
                //     mc2sdk.event(mc2sdk.EVENT_TYPE.VIP_CREATE);
                //     break;
                case this.joinButton:
                    __OPEN_MOUDLE(AppReg.JOIN_VIP_ROOM);
                    mc2sdk.event(50010 /* VIP_JOIN */);
                    break;
                case this.fastModeButton:
                    mc2sdk.event(50032 /* VIP_ROOM_TAB */);
                    room.getProxy().displayTableList;
                    if (!room.getProxy().hasNoPassTable) {
                        tip.popSysCenterTip("当前无公开私人房牌局，不如自己组局邀请好友一起玩牌！");
                    }
                    else {
                        this.showVipGroup();
                        this.gotoVipRoom();
                    }
                    break;
                case this.listModeButton:
                    this.showJoinGroup();
                    return;
                // case this.btnAdd:
                case this.coinArea:
                    user.getProxy().openShop();
                    break;
                case this.btnUp:
                    user.getProxy().drivingNumPlayers = true;
                    this.loadListData(this.currentRoomList);
                    mc2sdk.event(50007 /* ROOM_REFRESH */);
                    break;
                case this.billButton:
                    __OPEN_PRE_MOUDLE(AppReg.APP_BILL);
                    mc2sdk.event(50025 /* VIP_BILL */);
                    // __SEND_NOTIFICATION(app.NetAction.REQ_BILL_GET);
                    break;
                case this.listItem0:
                    // __OPEN_PRE_MOUDLE(AppReg.APP_GOLD_TREE);
                    //user.gotoRoom(getProxy().room2[0]);
                    //进入金币房
                    room.getProxy().goldRoom();
                    break;
            }
        };
        RoomMoudle.prototype.showNormalGroup = function () {
            this.vipGroup.visible = false;
            this.roomGroup.visible = true;
            this.roomScroller.visible = true;
            this.tableList2.visible = false;
            this.btnUp.visible = true;
            this.fastModeButton.visible = false;
            this.listModeButton.visible = false;
            this.billButton.visible = false;
            this.buttomGroup.visible = true;
            this.dealerGroup.visible = false;
            this.topRightGroup.visible = true;
            __CLOSE_MOUDLE(AppReg.JOIN_VIP_ROOM);
            // this.playTween();//每次切换都播放6个icon的飞入动画
        };
        RoomMoudle.prototype.showJoinGroup = function () {
            this.roomGroup.visible = false;
            this.roomScroller.visible = false;
            this.vipGroup.visible = false;
            this.tableList2.visible = false;
            this.btnUp.visible = false;
            // this.fastModeButton.visible = true;
            this.listModeButton.visible = false;
            this.billButton.visible = true;
            this.buttomGroup.visible = false;
            this.dealerGroup.visible = false;
            this.topRightGroup.visible = true;
            __OPEN_MOUDLE(AppReg.JOIN_VIP_ROOM);
        };
        RoomMoudle.prototype.showVipGroup = function () {
            this.roomGroup.visible = false;
            this.roomScroller.visible = false;
            this.vipGroup.visible = false;
            this.tableList2.visible = true;
            this.btnUp.visible = false;
            // this.menuBar2.selectItemIndex = 1; //默认第二个
            this.fastModeButton.visible = false;
            // this.listModeButton.visible = true;
            this.billButton.visible = false;
            this.buttomGroup.visible = false;
            this.dealerGroup.visible = false;
            this.topRightGroup.visible = true;
            __CLOSE_MOUDLE(AppReg.JOIN_VIP_ROOM);
        };
        RoomMoudle.prototype.showDealerGroup = function () {
            this.vipGroup.visible = false;
            this.roomGroup.visible = true;
            this.roomScroller.visible = false;
            this.tableList2.visible = false;
            this.btnUp.visible = true;
            this.fastModeButton.visible = false;
            this.listModeButton.visible = false;
            this.billButton.visible = false;
            this.buttomGroup.visible = false;
            this.dealerGroup.visible = true;
            this.topRightGroup.visible = false;
            __CLOSE_MOUDLE(AppReg.JOIN_VIP_ROOM);
        };
        RoomMoudle.prototype.drawCircle = function () {
            var xCenter = 99;
            var yCenter = 106;
            var shape = new egret.Shape();
            this.normalListGroup.addChildAt(shape, 0);
            var graphics = shape.graphics;
            graphics.beginFill(0x9992bc, 0.2);
            graphics.lineStyle(0, 0x000000);
            graphics.drawCircle(116, 135, 90);
            for (var i = 1; i <= this.roomLen; i++) {
                graphics.drawCircle(this["listItem" + i].x + xCenter, this["listItem" + i].y + yCenter, 104);
            }
            var smallCircle = [210, 402, 630, 822, 1050, 1242];
            for (var i = 0; i < this.roomLen; i++) {
                graphics.drawCircle(smallCircle[i], 210, 10);
            }
        };
        RoomMoudle.prototype.playTween = function () {
            var yPosition = [21, 182, 31, 182, 31, 182, 31];
            for (var i = 0; i <= this.roomLen; ++i) {
                egret.Tween.removeTweens(this["listItem" + i]);
                // this["listItem"+i].y = 334;
                this["listItem" + i].y = 452;
                this["listItem" + i].alpha = 0;
                // egret.setTimeout(this.tweenTo, this, 60*i+(i*i*2)+300, this["listItem"+i], 34);
                // egret.setTimeout(this.tweenTo, this, 60*i+(i*i*2)+300, this["listItem"+i], 102);
                egret.setTimeout(this.tweenTo, this, 60 * i + (i * i * 2) + 300, this["listItem" + i], yPosition[i]);
            }
            // for(var i=4; i<=6; ++i) {
            //     egret.Tween.removeTweens(this["listItem"+i]);
            //     this["listItem"+i].y = 570;
            //     this["listItem"+i].alpha = 0;
            //     egret.setTimeout(this.tweenTo, this, 60*i+(i*i*2)+300, this["listItem"+i], 270);
            // }
        };
        RoomMoudle.prototype.tweenTo = function (obj, y) {
            var value = 1;
            if (obj == this.listItem0 && user.getProxy().svrGameData && user.getProxy().svrGameData.silver >= 1000) {
                value = 0.6;
            }
            egret.Tween.get(obj).to({ y: y, alpha: value }, 220, egret.Ease.sineOut);
        };
        RoomMoudle.prototype.loadListData = function (arr) {
            var roomIdArr = [];
            for (var i = 0; i < arr.length; ++i) {
                if (arr != room.getProxy().room2)
                    this["listItem" + (i + 1)].data = arr[i];
                roomIdArr.push(arr[i].svrRoomId);
            }
            this.sendNotification(app.NetAction.TOOL_NUMPLAYERS, roomIdArr);
            if (this.autoLoadId != -1) {
                egret.clearTimeout(this.autoLoadId);
            }
            this.autoLoadId = egret.setTimeout(this.loadListData, this, this.autoStep, arr);
        };
        RoomMoudle.prototype.updateRoomList = function () {
            for (var i = 0; i < this.roomLen; ++i) {
                this["listItem" + (i + 1)].dataChanged();
            }
            var freeNumPlayers = room.getProxy().room2[0].online;
            if (freeNumPlayers != null) {
                this.freeNumPlayersLabel.text = freeNumPlayers.toString();
                this.freeNumPlayersGroup.visible = freeNumPlayers == 0 ? false : true;
            }
        };
        RoomMoudle.prototype.updateDealerList = function (data) {
            room.getProxy().dealerList = [];
            var roomids = [];
            for (var i = 0; i < data.length; i++) {
                var dealerTableVO = new appvos.DealerTableVO();
                dealerTableVO.dealerInfoVO = data[i];
                room.getProxy().dealerList.push(dealerTableVO);
                var roomVO = dealerTableVO.getRoomVOById(dealerTableVO.dealerInfoVO.roomid);
                if (roomVO && roomVO.svrRoomId)
                    roomids.push(roomVO.svrRoomId);
            }
            __SEND_NOTIFICATION(app.NetAction.TOOL_NUMPLAYERS, roomids);
        };
        RoomMoudle.prototype.sortDealerList = function () {
            if (room.getProxy().dealerList == null)
                return;
            var len = room.getProxy().dealerList.length;
            if (len < 5) {
                for (var i = 0; i < 5 - len; i++) {
                    room.getProxy().dealerList.push(room.getProxy().getFakeDealerTableVO());
                }
            }
            for (var i = 0; i < room.getProxy().dealerList.length; i++) {
                room.getProxy().dealerList[i].updateRoomVO();
            }
            room.getProxy().dealerList.sort(function (a, b) {
                if (b.dealerInfoVO.online != a.dealerInfoVO.online) {
                    return b.dealerInfoVO.online - a.dealerInfoVO.online;
                }
                else {
                    return b.numPlayers - a.numPlayers;
                }
            });
            var temp = room.getProxy().dealerList[0];
            room.getProxy().dealerList[0] = room.getProxy().dealerList[3];
            room.getProxy().dealerList[3] = room.getProxy().dealerList[2];
            room.getProxy().dealerList[2] = temp;
            var list = [null, null].concat(room.getProxy().dealerList, null, null);
            this.dealerGroup.dealerlist.dataProvider = new eui.ArrayCollection(list);
        };
        RoomMoudle.prototype.addDragonBones = function () {
            var _this = this;
            gameabc.addMovieGroup("fastroombutton_ske_dbmv", "fastroombutton_tex_png", AppReg.ROOM);
            var db1 = gameabc.buildMovie("MovieClip", AppReg.ROOM);
            db1.scaleX = db1.scaleY = 1.12;
            db1.x = 250;
            db1.y = 63;
            db1.visible = false;
            // db1.play("2W");
            this.listItem1.addChild(db1);
            var db2 = gameabc.buildMovie("MovieClip", AppReg.ROOM);
            db2.scaleX = db2.scaleY = 1.12;
            db2.x = 250;
            db2.y = 63;
            db2.visible = false;
            // db2.play("4w");
            this.listItem2.addChild(db2);
            var db3 = gameabc.buildMovie("MovieClip", AppReg.ROOM);
            db3.scaleX = db3.scaleY = 1.12;
            db3.x = -12;
            db3.y = 200;
            db3.visible = false;
            // db3.play("8w");
            this.listItem3.addChild(db3);
            var db4 = gameabc.buildMovie("MovieClip", AppReg.ROOM);
            db4.scaleX = db4.scaleY = 1.12;
            db4.x = -272;
            db4.y = 65;
            db4.visible = false;
            // db4.play("40W");
            this.listItem4.addChild(db4);
            var delayTime = 1000;
            db1.addEventListener(egret.Event.COMPLETE, function () {
                egret.setTimeout(function () {
                    db2.visible = true;
                    db2.play("4w", 1);
                }, _this, delayTime, true);
            }, this);
            db2.addEventListener(egret.Event.COMPLETE, function () {
                egret.setTimeout(function () {
                    db3.play("8w", 1);
                    db3.visible = true;
                }, _this, delayTime, true);
            }, this);
            db3.addEventListener(egret.Event.COMPLETE, function () {
                egret.setTimeout(function () {
                    db4.visible = true;
                    db4.play("40W", 1);
                }, _this, delayTime, true);
            }, this);
            db4.addEventListener(egret.Event.COMPLETE, function () {
                egret.setTimeout(function () {
                    db1.visible = true;
                    db1.play("2W", 1);
                }, _this, delayTime, true);
            }, this);
            egret.setTimeout(function () {
                db1.visible = true;
                db1.play("2W", 1);
            }, this, 1000, true);
        };
        RoomMoudle.prototype.close = function () {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
        };
        RoomMoudle.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.listItem0) {
                egret.Tween.removeTweens(this.listItem0);
            }
            if (gameabc.hasMovieGroup(AppReg.ROOM)) {
                gameabc.removeMovieGroup(AppReg.ROOM);
            }
            if (this.autoLoadId != -1) {
                egret.clearTimeout(this.autoLoadId);
            }
        };
        return RoomMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    room.RoomMoudle = RoomMoudle;
    __reflect(RoomMoudle.prototype, "room.RoomMoudle");
})(room || (room = {}));
//# sourceMappingURL=RoomMoudle.js.map