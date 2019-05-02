var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var main;
(function (main) {
    /**
     *
     * @author
     *
     */
    var AppMainUIMoudelComp = (function (_super) {
        __extends(AppMainUIMoudelComp, _super);
        function AppMainUIMoudelComp() {
            var _this = _super.call(this) || this;
            /**
             * 按钮动画延迟时间
             * @type {number}
             */
            _this.delayTime = 0;
            /**
             * 德州游戏
             * @type {number}
             */
            _this.delayDzTime = 0;
            _this.delayZtTime = 0;
            _this.skinName = "resource/app_skin/AppMainUISkin.exml";
            return _this;
        }
        AppMainUIMoudelComp.prototype.createComplete = function (event) {
            var _this = this;
            user.getProxy().isGameOpen = setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType1);
            if (user.getProxy().isGameOpen == 1) {
                this.currentState = "EditState";
            }
            else {
                this.currentState = "NormalState";
            }
            // this.btnLabar.visible = false;
            _super.prototype.createComplete.call(this, event);
            this.registerMediator(main.AppMainUIMediator);
            this.bindButton(this.btnSet);
            this.bindButton(this.btnNotice);
            this.bindButton(this.btnMail);
            this.bindButton(this.btnMission);
            this.bindButton(this.btnZhan);
            this.bindButton(this.btnShop);
            this.bindButton(this.btnHlc);
            this.bindButton(this.btnCharmwheel);
            this.bindButton(this._btn_friend);
            this.bindButton(this.fastButton);
            this.bindButton(this.roomButton);
            this.bindButton(this.matchButton);
            this.bindButton(this.main_left_bar, false);
            this.bindButton(this.hendIcon, false);
            this.bindButton(this.imgMeiNv, false);
            if (user.getProxy().isGameOpen != 0) {
                this.bindButton(this.btnGame1, false);
                this.bindButton(this.btnGame2, false);
                this.bindButton(this.btnGame3, false);
                this.bindButton(this.banckBtn, false);
            }
            if (AppConst.SLOT_OPEN) {
                this.bindButton(this.btnLabar);
            }
            this.btnLabar.visible = AppConst.SLOT_OPEN;
            this.hendIcon.mask = this.hendMask;
            var data = RES.getRes("mc_eff_shop_btn_json");
            var texture = RES.getRes("mc_eff_shop_btn_png");
            var mcFactory = new egret.MovieClipDataFactory(data, texture);
            this.mc_btn_shop = new egret.MovieClip(mcFactory.generateMovieClipData("mc_eff_shop_btn"));
            this.mc_btn_shop.play(-1);
            this.mc_btn_shop.x = 5;
            this.mc_btn_shop.y = 5;
            this.btnShop.addChild(this.mc_btn_shop);
            this.main_Bg.setChildIndex(this.imgMeiNv, this.main_Bg.numChildren - 1);
            // var data = RES.getRes("meilizhuanpan_json");
            // var texture = RES.getRes("meilizhuanpan_png");
            // var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
            // this.mc_btn_meilizhuanpan = new egret.MovieClip(mcFactory.generateMovieClipData("meilizhuanpan"));
            // this.mc_btn_meilizhuanpan.play(-1);
            // this.mc_btn_meilizhuanpan.x = 0;
            // this.mc_btn_meilizhuanpan.y = 0;
            // this.btnCharmwheel.addChild(this.mc_btn_meilizhuanpan);
            this.addDragonBonesAnimation();
            if (setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType4, egret.RuntimeType.WEB)) {
                this.mc_btn_zt_first = new egret.MovieClip(mcFactory.generateMovieClipData("pok_new_light"));
                this.mc_btn_zt_first.play(1);
                this.mc_btn_zt_first.touchEnabled = false;
                this.btnHlc.addChildAt(this.mc_btn_zt_first, 3);
                this.mc_btn_zt_first.addEventListener(egret.Event.COMPLETE, this.gotoPlayZt, this);
                this.mc_btn_dz_first = new egret.MovieClip(mcFactory.generateMovieClipData("pok_light"));
                this.mc_btn_dz_first.x = -10;
                this.mc_btn_dz_first.play(1);
                this.mc_btn_dz_first.touchEnabled = false;
                this.btnHlc.addChildAt(this.mc_btn_dz_first, 4);
                this.mc_btn_dz_first.addEventListener(egret.Event.COMPLETE, function (event) {
                    _this.mc_btn_dz_first.visible = false;
                    if (_this.delayDzTime > 0) {
                        egret.clearTimeout(_this.delayDzTime);
                    }
                    _this.delayDzTime = egret.setTimeout(function () {
                        _this.mc_btn_dz_first.visible = true;
                        _this.mc_btn_dz_first.gotoAndPlay("pok_light", 1);
                    }, _this, 4000);
                }, this);
                this.btnHlc.visible = true;
            }
            else {
                this.btnHlc.visible = false;
            }
            if (gameabc.LocalSO.getItem("PROP_ITEM_NUM") == "1") {
                tip.updateTip(AppConst.COUNT_SUB_TAG.PROP_MOUDLE, 1);
            }
            utils.SoundUtils.loadSound();
            egret.setTimeout(this.loadPlayCard, this, 1000);
            /**************任务countTip数据和组件**********************/
            var missionTipData = tip.getTipData(AppConst.COUNT_SUB_TAG.MISSION_MOUDLE);
            this.missionTipUI = new tip.CountTipUI(missionTipData);
            this.missionTipUI.x = 60;
            this.missionTipUI.bottom = 60;
            this.btnMission.addChild(this.missionTipUI);
            /*********************************************************/
            var mailTipData = tip.getTipData(AppConst.COUNT_SUB_TAG.MAIL_MOUDLE);
            this.mailTipUI = new tip.CountTipUI(mailTipData);
            this.mailTipUI.x = 60;
            this.mailTipUI.bottom = 60;
            this.btnMail.addChild(this.mailTipUI);
            /**********************friend红点***********************************/
            var friendTipData = tip.getTipData(AppConst.COUNT_SUB_TAG.FRIEND_MOUDLE_SUB);
            this.friendTipUI = new tip.CountTipUI(friendTipData);
            this.friendTipUI.x = 60;
            this.friendTipUI.bottom = 60;
            //this.btnSet.addChild(this.friendTipUI);
            this._btn_friend.addChild(this.friendTipUI);
            // 这里判断是否显示钱庄按钮 
            var isShowBank = user.getProxy().isShowBank();
            this.btnZhan.visible = isShowBank;
            this.btnNotice.visible = !isShowBank;
            this.btnHlc.visible = isShowBank;
            //this.btnMission.addChild(this.mailTipUI);
            //打开实名认证
            // __SEND_NOTIFICATION(anti.AntiMediator.VERIFICATION_NAME);
            //重置玩家的房间状态（临时增加，测试用）
            //user.getProxy().resetRoomState();
            this.addDebugTouch();
        };
        AppMainUIMoudelComp.prototype.gotoPlayZt = function () {
            var _this = this;
            this.mc_btn_dz_first.visible = true;
            this.mc_btn_dz_first.gotoAndPlay("pok_light", 1);
            if (this.delayDzTime > 0) {
                egret.clearTimeout(this.delayDzTime);
            }
            if (this.delayZtTime > 0) {
                egret.clearTimeout(this.delayZtTime);
            }
            this.delayZtTime = egret.setTimeout(function () {
                _this.mc_btn_zt_first.visible = true;
                _this.mc_btn_zt_first.gotoAndPlay("pok_new_light", 1);
            }, this, 2000);
        };
        AppMainUIMoudelComp.prototype.gameEvent = function () {
            if (user.getProxy().isGameOpen == 0) {
                user.getProxy().gameBool = true;
            }
            else {
                this.banckBtn.visible = user.getProxy().gameBool;
                this.btnHlc.visible = user.getProxy().isShowBank();
                this.imgMeiNv.visible = user.getProxy().gameBool;
                this.main_center.visible = user.getProxy().gameBool;
                this.gameBtnGroup.visible = !user.getProxy().gameBool;
                this.gameBtnGroup.touchEnabled = false;
            }
        };
        AppMainUIMoudelComp.prototype.loadPlayCard = function () {
            RES.loadGroup("play");
            RES.loadGroup("card");
            // RES.loadConfig("s9_bg_play_bg_jpg");
            // uicomps.confirmNeedSilver(true,1000,(val:number)=>{
            //    console.log("the param is " + val);
            //},this);
        };
        /**
         * 进入主界面时的动画处理
         */
        AppMainUIMoudelComp.prototype.addParent = function () {
            var _this = this;
            _super.prototype.addParent.call(this);
            this.getMailNum();
            if (this.armature_mc) {
                this.armature_mc.display.removeFromParent();
            }
            if (this.initialized) {
                //if (this.mc_left) this.mc_left.gotoAndPlay("Left_Light", -1);
                //if (this.mc_right) this.mc_right.gotoAndPlay("Right_Light", -1);
                //if (this.mc_screen) this.mc_screen.gotoAndPlay("Screen_Light", -1);
                if (this.mc_btn_shop)
                    this.mc_btn_shop.play(-1);
                this.main_left_bar.x = -this.main_left_bar.width;
                egret.Tween.get(this.main_left_bar).to({ x: 0 }, 300, egret.Ease.sineOut);
                var delay = 300;
                var btns = [
                    this.fastButton, this.roomButton, this.matchButton
                ];
                var i = 0;
                for (i = 0; i != btns.length; i++) {
                    var ui = btns[i];
                    egret.Tween.removeTweens(ui);
                    delay -= 200;
                    ui.x = ui.width;
                    egret.Tween.get(ui)
                        .wait(delay)
                        .to({ x: 0 }, 300, egret.Ease.sineOut);
                    delay += 300;
                }
                btns = [
                    this.btnSet, this._btn_friend, this.btnMail, this.btnMission, this.btnZhan, this.btnNotice, this.btnShop, this.btnHlc,
                    this.btnCharmwheel, this.btnLabar
                ];
                var btnsY = [
                    529, 529, 529, 529, 529, 529, 525, 400, 400, 400, 531
                ];
                for (i = 0; i != btns.length; i++) {
                    var ui = btns[i];
                    egret.Tween.removeTweens(ui);
                    delay -= 200;
                    ui.y = btnsY[i] + 230;
                    egret.Tween.get(ui)
                        .wait(delay)
                        .to({ y: btnsY[i] }, 300, egret.Ease.backOut);
                    delay += 300;
                }
                egret.Tween.removeTweens(this.imgMeiNv);
                delay -= 1000;
                if (this.eyemv != null)
                    this.eyemv.visible = false;
                this.imgMeiNv.x = 220;
                this.imgMeiNv.alpha = 0;
                egret.Tween.get(this.imgMeiNv) // 美女图片
                    .wait(delay)
                    .to({ x: 194, alpha: 1 }, 700, egret.Ease.sineOut)
                    .call(function () {
                    if (_this.armature_mc == null) {
                        var boneFactory = gameabc.getBonesFactory(AppReg.APP_MAIN_UI);
                        _this.armature_mc = boneFactory.buildFastArmature("MovieClip");
                        _this.armature_mc.display.touchEnabled = false;
                        _this.armature_mc.display.y = (600 >> 1) - 10;
                        _this.armature_mc.display.x = -388 >> 1;
                        dragonBones.WorldClock.clock.add(_this.armature_mc);
                        _this.main_right_bar.addChild(_this.armature_mc.display);
                        _this.armature_mc.animation.play("zhujiemianUI", -1);
                    }
                    else {
                        _this.main_right_bar.addChild(_this.armature_mc.display);
                        _this.armature_mc.animation.play(null, -1);
                    }
                    if (_this.eyemv == null) {
                        var textures = [RES.getRes("mv_dealer_0_png"), RES.getRes("mv_dealer_1_png"), RES.getRes("mv_dealer_2_png")];
                        _this.eyemv = new gameabc.MovieClip(textures);
                        _this.main_center.addChild(_this.eyemv);
                        _this.eyemv.x = 377.5;
                        _this.eyemv.y = 181;
                        _this.eyemv.loopdelayTime = 3;
                        _this.eyemv.loop = true;
                        _this.eyemv.play(-1);
                    }
                    else
                        _this.eyemv.visible = true;
                }, this);
                this.gameEvent();
                __CLOSE_MOUDLE(AppReg.LOGIN);
            }
        };
        AppMainUIMoudelComp.prototype.opening = function () {
            user.getProxy().loginDataInit();
            /**
             * 如果没有签到就自动打开签到界面
             */
            if (!user.getProxy().singFalg) {
                egret.setTimeout(function () {
                    if (mission.getProxy().isNotSign()) {
                        __OPEN_PRE_MOUDLE(AppReg.APP_SIGN);
                        user.getProxy().singFalg = true;
                    }
                }, this, 1000);
            }
        };
        AppMainUIMoudelComp.prototype.showDate = function () {
            this.txtName.text = user.getProxy().svrName;
            if (user.getProxy().svrGameData) {
                this.txtCou.text = FormatUtils.wan(user.getProxy().svrGameData.silver) + "";
            }
            this.hendIcon.source = user.getProxy().getHeadStr(user.getProxy().svrHeadId);
            // this.hendIcon.x = this.headGroup.width - this.hendIcon.width >> 1;
        };
        AppMainUIMoudelComp.prototype.openGongGao = function () {
            var param = new appvos.ParamVO();
            param.strValues = [platform.CHANNE_ID.toString()];
            param.longValues = [0];
            __SEND_NOTIFICATION(app.NetAction.NOTICE_GET_MANY, param);
        };
        AppMainUIMoudelComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnHlc:
                    __OPEN_PRE_MOUDLE(AppReg.APP_HAPPY_MAIN, null, [AppReg.APP_MAIN_UI]);
                    break;
                case this.btnCharmwheel:
                    __OPEN_PRE_MOUDLE(AppReg.APP_CHARMWHEEL, null, [AppReg.APP_MAIN_UI]);
                    // __OPEN_PRE_MOUDLE(AppReg.SLOT,null,[AppReg.APP_MAIN_UI]);
                    break;
                // case this.btnTreasure://夺宝奇兵
                //     __OPEN_PRE_MOUDLE(AppReg.APP_TREASURE, null, [AppReg.APP_MAIN_UI]);
                //     break;
                case this.btnNotice: //公告
                case this.main_left_bar:
                    this.openGongGao();
                    break;
                case this.btnZhan:
                    //tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))
                    //                    if(AppConst.LOGING_CAN_BOOL) {
                    if (user.getProxy().isGameOpen) {
                        this.openGongGao();
                    }
                    else {
                        __OPEN_PRE_MOUDLE(AppReg.APP_BANK);
                    }
                    break;
                case this._btn_friend:
                    __OPEN_PRE_MOUDLE(AppReg.APP_FRIEND_MAIN);
                    break;
                case this.btnMission:
                    // 打开任务
                    __OPEN_PRE_MOUDLE(AppReg.APP_MISSION);
                    mc2sdk.event(50048 /* MISSION_BTN */);
                    break;
                case this.btnMail:
                    //platform.shardShow("这是一个测试","这是一条分享的测试内容");
                    __OPEN_PRE_MOUDLE(AppReg.APP_MAIL);
                    break;
                case this.fastButton:
                    if (AppGlobal.isSvrDebug) {
                        //进行调试工具去打牌，调服务端代码
                        __SEND_NOTIFICATION(app.NetAction.DEBUG_CMDT_PLAYERCONNECT, [AppGlobal.DebugRoleId]);
                    }
                    else {
                        //进入极速房间
                        room.getProxy().fastRoom();
                    }
                    mc2sdk.event(50001 /* FAST_GAME */);
                    break;
                case this.roomButton:
                    __OPEN_PRE_MOUDLE(AppReg.ROOM, null, [AppReg.APP_MAIN_UI]);
                    mc2sdk.event(50002 /* NORMAL_GAME */);
                    break;
                //                case this.freeButton:
                //                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))//
                //                   // __OPEN_MOUDLE(AppReg.MTT,null,[AppReg.APP_MAIN_UI]);
                //                    break;
                case this.matchButton:
                    //if (setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType3, egret.RuntimeType.WEB) == 0) {
                    //    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                    //} else {
                    //    __OPEN_PRE_MOUDLE(AppReg.SNG, null, [AppReg.APP_MAIN_UI]);
                    //}
                    // __OPEN_PRE_MOUDLE(AppReg.SNG,null,[AppReg.APP_MAIN_UI]);//发布版本
                    //__CLOSE_ALLMOUDLE_OPEN(AppReg.MATCH_MAIN);
                    // __OPEN_PRE_MOUDLE(AppReg.SNG,null,[AppReg.APP_MAIN_UI]);//发布版本
                    // __OPEN_PRE_MOUDLE(AppReg.MATCH_MAIN,null,[AppReg.APP_MAIN_UI]);
                    //                    __OPEN_PRE_MOUDLE(AppReg.SNG,null,[AppReg.APP_MAIN_UI]);//发布版本
                    __OPEN_PRE_MOUDLE(AppReg.MATCH_MAIN, null, [AppReg.APP_MAIN_UI]);
                    break;
                case this.btnShop:
                    user.getProxy().openShop();
                    mc2sdk.event(50003 /* MAIN_MALL */);
                    break;
                case this.btnSet:
                    // __OPEN_PRE_MOUDLE(AppReg.APP_SETTING_TYPE);
                    // __OPEN_PRE_MOUDLE(AppReg.APP_TAG);
                    this.addChild(this.moreTag = new main.MoreTagMoudle());
                    break;
                case this.hendIcon:
                    __OPEN_PRE_MOUDLE(AppReg.APP_MY_INFO);
                    break;
                case this.imgMeiNv:
                    // __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS,playcards.OPEN_PARAM.SINGLE,[AppReg.APP_MAIN_UI]);
                    __OPEN_PRE_MOUDLE(AppReg.APP_HEAD);
                    break;
                case this.btnGame1:
                    user.getProxy().gameBool = true;
                    this.gameEvent();
                    break;
                case this.banckBtn:
                    user.getProxy().gameBool = false;
                    this.gameEvent();
                    break;
                case this.btnGame2:
                    __OPEN_PRE_MOUDLE(AppReg.SG_CLEAR, null, [AppReg.APP_MAIN_UI]);
                    break;
                case this.btnGame3:
                    __OPEN_PRE_MOUDLE(AppReg.FIVE_CARD, null, [AppReg.APP_MAIN_UI]);
                    break;
                case this.btnLabar:
                    __OPEN_PRE_MOUDLE(AppReg.SLOT, null, [AppReg.APP_MAIN_UI]);
                    break;
            }
        };
        //public gotoRoom():void {
        //    var silver = user.getProxy().svrGameData.silver;
        //    var roomVO = room.getProxy().getRoomVOFromMinSilver(silver, room.getProxy().room3);
        //    if (roomVO == null) {
        //        user.getProxy().openMoney();
        //        return;
        //    }
        //    user.gotoRoom(roomVO);
        //}
        AppMainUIMoudelComp.prototype.initNotice = function (data) {
            if (data.length == 0) {
                tip.popSysCenterTip("暂无公告");
            }
            else {
                __OPEN_PRE_MOUDLE(AppReg.APP_NOTICE, data);
            }
        };
        AppMainUIMoudelComp.prototype.getMailNum = function () {
            var paramVO = new appvos.ParamVO();
            paramVO.longValues = [parseInt(platform.CHANNE_ID), user.getProxy().svrRoleId];
            __SEND_NOTIFICATION(app.NetAction.IMS_READ_NUM, paramVO);
            //好友请求邮件
            __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND_REQUEST);
        };
        AppMainUIMoudelComp.prototype.showRedPoint = function (isShow) {
            //            this.mailRedPoint.visible = isShow;
        };
        AppMainUIMoudelComp.prototype.addDragonBonesAnimation = function () {
            var boneFactory = gameabc.addAssetsToBonesFactory(AppReg.APP_MAIN_UI, "mainui_json", "mainui_texture_png", "mainui_texture_json");
            this.happyAnimation = boneFactory.buildFastArmature("MovieClip");
            this.happyAnimation.display.touchEnabled = false;
            this.happyAnimation.display.x = this.happyAnimation.display.y = 60;
            dragonBones.WorldClock.clock.add(this.happyAnimation);
            this.btnHlc.addChild(this.happyAnimation.display);
            this.happyAnimation.animation.play("jiujiudezhou", -1);
            gameabc.addMovieGroup("meilizhuanlun_icon_ske_dbmv", "meilizhuanlun_icon_tex_png", AppReg.APP_MAIN_UI);
            var movie = gameabc.buildMovie("MovieClip", AppReg.APP_MAIN_UI);
            movie.x = movie.y = 60;
            movie.play(null);
            this.btnCharmwheel.addChild(movie);
            if (AppConst.SLOT_OPEN) {
                var boneFactory = gameabc.addAssetsToBonesFactory(AppReg.APP_MAIN_UI, "slot_icon_json", "slot_icon_texture_png", "slot_icon_texture_json");
                this.slotAnimation = boneFactory.buildFastArmature("SlotIcon");
                this.slotAnimation.display.touchEnabled = false;
                this.slotAnimation.display.x = this.slotAnimation.display.y = 60;
                dragonBones.WorldClock.clock.add(this.slotAnimation);
                this.btnLabar.addChild(this.slotAnimation.display);
                this.slotAnimation.animation.play(null, -1);
            }
            if (this.hlcmv == null) {
                var textures = [RES.getRes("mv_hlc_0_png"), RES.getRes("mv_hlc_1_png")];
                this.hlcmv = new gameabc.MovieClip(textures, 6);
                this.btnHlc.addChildAt(this.hlcmv, 0);
                this.hlcmv.loop = true;
                this.hlcmv.play(-1);
            }
        };
        AppMainUIMoudelComp.prototype.restartGame = function () {
            if (this.initialized) {
                this.txtName.text = "";
                this.txtCou.text = "";
            }
        };
        AppMainUIMoudelComp.prototype.goinHandler = function () {
        };
        AppMainUIMoudelComp.prototype.dispose = function () {
            if (this.delayTime > 0) {
                egret.clearTimeout(this.delayTime);
            }
            if (this.delayDzTime > 0) {
                egret.clearTimeout(this.delayDzTime);
            }
            if (this.delayZtTime > 0) {
                egret.clearTimeout(this.delayZtTime);
            }
            if (this.missionTipUI) {
                this.removeFromParent(true);
            }
            if (this.eyemv)
                this.eyemv.dispose();
            if (this.hlcmv)
                this.hlcmv.dispose();
            if (this.armature_mc) {
                dragonBones.WorldClock.clock.remove(this.armature_mc);
                dragonBones.WorldClock.clock.remove(this.happyAnimation);
                gameabc.destoryFactory(AppReg.APP_MAIN_UI);
            }
            if (this.slotAnimation) {
                dragonBones.WorldClock.clock.remove(this.slotAnimation);
            }
            if (gameabc.hasMovieGroup(AppReg.APP_MAIN_UI)) {
                gameabc.removeMovieGroup(AppReg.APP_MAIN_UI);
            }
            __REMOVE_MEDIATOR(main.AppMainUIMediator);
            // app.mvc.AppFacade.getInstance().removeMediator(AppMainUIMediator.NAME);
            _super.prototype.dispose.call(this);
        };
        return AppMainUIMoudelComp;
    }(app.base.BaseSceneUIMoudleComponent));
    main.AppMainUIMoudelComp = AppMainUIMoudelComp;
    __reflect(AppMainUIMoudelComp.prototype, "main.AppMainUIMoudelComp");
})(main || (main = {}));
//# sourceMappingURL=AppMainUIMoudelComp.js.map