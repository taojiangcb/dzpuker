module playcards {
    import StringUtils = gameabc.StringUtils;
    /**打牌操作 */
    export class PlayCardsPlayComp extends gameabc.UICustomComponent {
        public view:PlayCardsUIMoudleComp;
        private moneySelect:PlayCardSelectMoneyComp;//选择筹码
        private chatview: PlayCardsChatComp;//表情
        private chatMessview: PlaycardsChatMessComp;//聊天
        private giftview: PlayCardsGiftComp;//礼物
        private outmenu:PlayCardOutMenuComp;//退出菜单
        private btnbak:eui.Image;//退出
        private paijubtn:eui.Image;//牌局回顾
        private goumaibtn:eui.Image;//购买
        public btnrank:eui.Group;//排行按钮
        public ranklab:eui.BitmapLabel;//排行名次
        public leftNumlab:eui.Label;//mtt剩余人数
        private l1btn:eui.Group;//左边第一个按钮
        private l2btn:eui.Group;//左边第二个按钮
        private l3btn:eui.Group;//左边第三个按钮
        private l1btnlab:eui.Image;//左边第一个按钮文字
        private l2btnlab:eui.Image;//左边第二个按钮文字
        private l3btnlab:eui.Image;//左边第三个按钮文字
        private r1btn:eui.Group;//右边第一个按钮
        private r2btn: eui.Group;//右边第二个按钮
        public rangqicheck:eui.CheckBox;//让或弃
        public rangpaicheck:eui.CheckBox;//自动让牌


        public r2checkimg:eui.Image;//自动让牌文字
        public r2checkfnt:eui.BitmapLabel;//自动跟文字
        public gencheck:eui.CheckBox;//任意跟
        private allcheck:eui.CheckBox[];
        private r2btnlab:eui.Image;
        private r2btnfnt:eui.BitmapLabel;
        public genNum:number = 0;
        private r3btn:eui.Group;//右边第三个按钮
        private r3btnlab:eui.Image;
        private r4btn:eui.Group;//右坐下按钮
        private biaoqingbtn:eui.Image;//表情按钮
        // private yuyinbtn: eui.Image;//语音按钮        
        public leftbtns:eui.Group;//左边按钮；
        public rightbtns:eui.Group;//右边按钮；
        public right2btns:eui.Group;//右边2按钮；
        public right3btns:eui.Group;//右边3按钮；
        public righttopbtns:eui.Group;//右边顶按钮
        public r4btnlab:eui.Image;//坐下 亮牌文字
        public r5btn:eui.Image; // 快速换桌
        public sngWheel:playcards.SngWheelComp;//幸运转盘动画组件
        public sngWheelLabel:eui.BitmapLabel;//幸运转盘左上角的奖励文本

        public sngWheelGroup:eui.Group;//幸运转盘左上角的奖励提示区
        // private chatbtns: eui.Group;//聊天按钮；
        public bottombtns: eui.Group;//底按钮
        public bottombg: eui.Image;//底图
        public trustview:eui.Group;//托管中
        public isLiangpaiClick:boolean = false;//点击过亮牌按钮
        public liangPaiTimer:number; // 亮牌按钮在盘局结束后5秒内有效
        public winnerCanShowCard:boolean = false;
        public static LIANG_PAI_TIME:number = 5000;
        public fastFoldBtn:eui.Group;   // 快速弃牌按钮
        private is2Blind:boolean = false;
        private is3Blind:boolean = false;
        private is4Blind:boolean = false;
        //猜牌
        public cggp:eui.Group;//猜牌组件
        private cgbtns:eui.Group;
        private cgbtn1:eui.Group;
        private cgbtn2:eui.Group;
        private cgbtn3:eui.Group;
        private cgbtn4:eui.Image;//换牌
        private cglb1:eui.Label;//押注描述
        private cglb2:eui.Label;//押注倍率
        private cglb3:eui.Label;
        private cglb4:eui.Label;
        private cglb5:eui.Label;
        private cglb6:eui.Label;//押注成功

        btnCaiShen:eui.Group;                   //财神按钮
        txtCaiShen:eui.BitmapLabel;             //财神文本
        armatureCaiShen:dragonBones.Armature;      //财神动画
        // _group_caishenDes:eui.Group;            //财神倒计时

        // btnTreasure:eui.Image;
        missionBox:mission.MissionBox;

        public liaotianbtn:eui.Image;
        public chatlab: eui.Label;
        public bottomview:eui.ViewStack;
        public sitbtn: eui.Group;//真人德州旁观坐下
        public giftbtn:eui.Image;//荷官送礼
        public messTextFlow: Array<egret.ITextElement>;
        public timeout: number; 
		public dealermess:eui.Label;
		public dealergroup:eui.Group;

        btnGoldTreen:playcards.PlayGoldTreeBtnComp      //摇钱树按钮

        public constructor() {
            super();
            this.skinName = "PlayCardsPlaySkin";
            this.percentWidth = 100;
            this.percentHeight = 100;
            // this.view = view;
        }

        public setChildVisable(dis:egret.DisplayObject, visable:boolean, parent:egret.DisplayObjectContainer):void {
            if (dis != null) {
                if (visable) {
                    if (dis.parent == null)
                        parent.addChild(dis);
                } else if (dis.parent != null)
                    dis.parent.removeChild(dis);
            }
        }

        public createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.bindButton(this.btnbak);
            this.bindButton(this.paijubtn);
            this.bindButton(this.goumaibtn);
            this.bindButton(this.l1btn);
            this.bindButton(this.l2btn);
            this.bindButton(this.l3btn);
            this.bindButton(this.r1btn);
            this.bindButton(this.r2btn);
            this.bindButton(this.r3btn);
            this.bindButton(this.r4btn);
            this.bindButton(this.r5btn);
            this.bindButton(this.biaoqingbtn);
            this.bindButton(this.fastFoldBtn);
            this.bindButton(this.btnrank);
            this.bindButton(this.trustview, false);
            //猜牌按钮
            this.bindButton(this.cgbtn1);
            this.bindButton(this.cgbtn2);
            this.bindButton(this.cgbtn3);
            this.bindButton(this.cgbtn4);
            this.bindButton(this.liaotianbtn);
            this.bindButton(this.sitbtn);
            this.bindButton(this.giftbtn);
            this.bindButton(this.btnCaiShen);
            this.bindButton(this.btnGoldTreen);
            this.bindButton(this.btnChengzhang);
//           this.bindButton(this.btntask);
//            var missionTipData = tip.createOrGetTipData(AppConst.COUNT_SUB_TAG.MISSION_MOUDLE);
//            this.missionTipUI= new tip.CountTipUI(missionTipData);
//            this.missionTipUI.x = 60;
//            this.missionTipUI.y = 10;
//            this.btntask.addChild(this.missionTipUI);
            this.setChildVisable(this.sngWheel, false, this);
            this.setChildVisable(this.sngWheelGroup, false, this);
            this.setChildVisable(this.trustview, false, this);
            this.setChildVisable(this.btnGoldTreen, false, this);
            this.removeBtnChengzhang();
            this.setChildVisable(this.leftbtns, false, this.bottombtns);
            this.setChildVisable(this.rightbtns, false, this.bottombtns);
            this.setChildVisable(this.right2btns, false, this.bottombtns);
            this.setChildVisable(this.cggp, false, this.bottombtns);
			this.setChildVisable(this.dealergroup, false, this);
            this.allcheck = [this.rangqicheck, this.rangpaicheck, this.gencheck];
            this.rangqicheck.addEventListener(egret.Event.CHANGE, this.checkChange, this);
            this.rangpaicheck.addEventListener(egret.Event.CHANGE, this.checkChange, this);
            this.gencheck.addEventListener(egret.Event.CHANGE, this.checkChange, this);

            this.missionBox.fatherGroup = this;

            var bonesFactory:dragonBones.EgretFactory = gameabc.addAssetsToBonesFactory(AppReg.APP_PLAYCARDS,
                "caishensongfu1_json",
                "caishensongfu1_texture_png",
                "caishensongfu1_texture_json");
            this.armatureCaiShen = bonesFactory.buildArmature("MovieClip","caishensongfu");
            this.armatureCaiShen.display.x = 38;
            this.armatureCaiShen.display.y = 48;
            this.btnCaiShen.addChildAt(<egret.DisplayObject>this.armatureCaiShen.display, 0);
            dragonBones.WorldClock.clock.add(this.armatureCaiShen);
            this.armatureCaiShen.animation.gotoAndStop("caishensongfu");

            this.addBtnChengzhang();
            // this.armatureCaiShen.addEventListener(dragonBones.AnimationEvent.COMPLETE,()=> {
            //     console.log("play end !!!");
            //     this.armatureCaiShen.display.visible = false;
            //     dragonBones.WorldClock.clock.remove(this.armatureCaiShen);
            // },this)

        }

        public removeParent():void {
            if (this.outmenu)
                this.outmenu.removeFromParent();
            egret.clearTimeout(this.timeout);
            this.chatlab.text = "";
            this.messTextFlow = null;
        }

        private checkChange(evt:egret.Event):void {
            var check:eui.CheckBox = evt.target;
            if (check.selected) {
                for (var i:number = 0; i < 3; i++) {
                    if (this.allcheck[i] != check) {
                        this.updateCheckBox(this.allcheck[i], false);
                    } else {
                        this.updateCheckBox(this.allcheck[i], true);
                    }
                }
            } else {
                this.updateCheckBox(check, false);
            }
        }

        public updateCheckBox(chkBox:eui.CheckBox, selected:boolean):void {
            chkBox.selected = selected;
        }

        /**初始化设置按钮 */
        public refVOBtns():void {
            var tablevo = getTableVO();
            this.isLiangpaiClick = false;
            var roomtype = room.getProxy().currentType;
            //  roomtype = room.TYPE.SNG;//测试用
//             if (roomtype == room.TYPE.NORMAL || roomtype == room.TYPE.FAST)
//                 this.setChildVisable(this.btntask, true, this);
//             else {
//                 this.setChildVisable(this.btntask, false, this);          
//             }           
            this.setChildVisable(this.sngWheel, false, this);
            this.setChildVisable(this.sngWheelGroup, false, this);
            if (tablevo == null) {
                // this.setChildVisable(this.bottombtns, false, this);
                this.bottomview.visible = false;
                this.setChildVisable(this.paijubtn, false, this);
                this.setChildVisable(this.goumaibtn, false, this);
                this.setChildVisable(this.btnrank, false, this.righttopbtns);
                this.setChildVisable(this.btnCaiShen, false, this);
                this.setChildVisable(this.btnGoldTreen, false, this);
     
                this.removeBtnChengzhang();
                // this.setChildVisable(this.btnTreasure, false, this.bottombtns);
            } else {
                // this.setChildVisable(this.bottombtns, true, this);
                 this.bottomview.visible = true;
                this.setChildVisable(this.paijubtn, true, this.righttopbtns);
                this.setChildVisable(this.goumaibtn,roomtype == room.TYPE.VIP&& !getProxy().isSingle, this.righttopbtns);
                this.setChildVisable(this.btnrank, roomtype == room.TYPE.SNG||roomtype == room.TYPE.MTT, this.righttopbtns);
                this.setBtns(false, tablevo.nowTime);
                if (roomtype == room.TYPE.FAST) {
                    this.setChildVisable(this.fastFoldBtn, true, this.right2btns);
                } else {
                    this.setChildVisable(this.fastFoldBtn, false, this.right2btns);
                }
                if (roomtype == room.TYPE.SNG) {
                    if (!match.getProxy().currentMatchVO.wheelPlayed) {
                        if (this.sngWheel == null) {
                            this.sngWheel = new playcards.SngWheelComp();
                            this.sngWheel.horizontalCenter = this.sngWheel.verticalCenter = 0;
                        }
                        this.setChildVisable(this.sngWheel, true, this);
                        this.sngWheel.completeListener = this.onSngWheelComplete;
                        this.sngWheel.completeThisObj = this;
                        this.sngWheel.playAndGoto(match.getProxy().currentMatchVO.wheelBonus);
                        match.getProxy().currentMatchVO.wheelPlayed = true;
                        __SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_MATCH_NUMPLAYERS, -1);
                    } else {
                         this.setChildVisable(this.sngWheelGroup, true, this);
                    }
                }

                if (roomtype == room.TYPE.SNG
                    || roomtype == room.TYPE.MTT
                    || roomtype == room.TYPE.VIP
                    || roomtype == room.TYPE.PK
                    || roomtype == room.TYPE.FREE
                    || roomtype == room.TYPE.GRIL
                    // || (roomtype == room.TYPE.NORMAL&&
                    // user.getProxy().currentRoom.maxBank!=40000&&
                    // user.getProxy().currentRoom.maxBank!=400000&&
                    // user.getProxy().currentRoom.maxBank!=2000&&
                    // user.getProxy().currentRoom.maxBank!=10000
                    // )
                    ) {
                    this.setChildVisable(this.btnCaiShen, false, this);
                    //  this.setChildVisable(this.btnTreasure, false, this.bottombtns);
                }
                else {
                    //  this.setChildVisable(this.btnCaiShen, true, this);
                    //  this.updateBtnCaiShen();
                    //  this.setChildVisable(this.btnTreasure, true, this.bottombtns);
                }

                /**摇钱树按钮只在金币房显示*/
                if(room.getProxy().currentType == room.TYPE.FREE) {
                    this.setChildVisable(this.btnGoldTreen,true,this);
                    this.btnGoldTreen.initData();
                    
                    if (this.checkChengzhang()) {
                        this.removeBtnChengzhang();
                    }else this.addBtnChengzhang();
                    // mission.getProxy().getServerList(AppConst.GAME_ID_FREE);
                }
            }
         
            this.resetLive();
            this.refRank();
            this.refJoin();
            if (this.chatMessview) {
                this.chatMessview.removeFromParent(true);
                this.chatMessview = null;
            }
        }
        public refJoin(): void{
            // var id = user.getProxy().svrRoleId;
            // var tablevo = getTableVO();
            // var myinJoin: boolean = false;
            // if (tablevo) {
            //      for (var i = 0,  len = tablevo.joinPlayerVO.length; i < len; i++) {
            //         var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
            //         if (join.roleId == id) {
            //             myinJoin = true;
            //             break;
            //         }
            //     }
            // }
            
            this.bottomview.selectedIndex = getProxy().getMyJoin() ? 1 : 0;
        }
        public resetLive(): void{
            if (getProxy().isLive) {
                // this.btnCaiShen.bottom = NaN;
                this.btnCaiShen.x = 150;
                this.missionBox.right = 200;
                this.bottombg.alpha = 1;
                // this.missionBox.bottom = NaN;
            } else {
                this.btnCaiShen.x = 12;
                // this.btnCaiShen.bottom = 82;
                this.missionBox.right = 20;
                this.bottombg.alpha = 0.45;
                // this.missionBox.bottom = 100;
            }
        }
        private onSngWheelComplete():void {
            this.setChildVisable(this.sngWheelGroup, true, this);
            this.sngWheelLabel.text = String(match.getProxy().currentMatchVO.wheelBonus);
            
        }

        /**刷新排名 */
        public refRank():void {
            if (this.btnrank.parent != null) {
                var roomtype = room.getProxy().currentType;
                if (roomtype == room.TYPE.SNG) {
                     var rank:number = 1;
                    if (getProxy().mySeatvo != null) {
                        //  var mybet: number = getProxy().mySeatvo.nowBet+getProxy().mySeatvo.totalBet;
                        //  var tablevo = getProxy().tableVO;
                        //  var seat: number = getProxy().mySeat;
                        //  var seatvo: appvos.SeatPlayerVO;
                        //  for (var i: number = 0,len:number = tablevo.seatPlayerVO.length; i < len; i++){
                        //      seatvo = tablevo.seatPlayerVO[i];
                        //      if (seatvo.seatId != seat&&seatvo.nowBet+seatvo.totalBet>mybet) {
                        //          rank++;
                        //      }
                        //  }
                        rank = getProxy().getRank(getProxy().mySeatvo.nowBet + getProxy().mySeatvo.totalBet, getProxy().mySeat);
                     }
                  
                    this.ranklab.text ="第"+ rank +"名";
                    // this.leftNumlab.text = "";
                } else if (roomtype == room.TYPE.MTT) {
                   
                    __SEND_NOTIFICATION(app.NetAction.REQ_PLAYER_RANK);
                }
               
            }
        }
        /**涨盲倒计时 */
        public setLeftTime(num:number): void{          
                this.leftNumlab.textFlow = <Array<egret.ITextElement>>[
                        { text: "涨盲时间:" },
                        { text: DateUtils.DayTimeStampFormat2(num) ,style: {"textColor": 0xffffff}}
                     ]
        }
        /**
         * 设置按钮
         */
        public setBtns(isPlayOver:boolean = false, nowtime:number = 0):void {
            

            var tablevo:appvos.TexasTableVO = getTableVO();
            if (tablevo.whoplay > -1)
                this.view.allItem[tablevo.whoplay].playcd(nowtime);
            if (this.view.isVideo()) {
                return;
            }
            var proxy: PlayCardsProxy = getProxy();
            var currentType = room.getProxy().currentType;
            // 玩家站起时，不现实购买筹码按钮
            this.goumaibtn.visible = proxy.mySeat > -1;
            this.setChildVisable(this.r5btn, !getProxy().isHuanZhuoClick
                && currentType == room.TYPE.FAST && proxy.mySeatvo && proxy.mySeatvo.isFold, this.bottombtns);
            if (tablevo.whoplay != -1 && tablevo.whoplay == proxy.mySeat) {//轮到我操作
                // // @ch自动弃牌
                // var flag = true;
                //@ch 自动弃牌
                if(DEBUG&&mammon.getProxy()._zidongqipai){
                    proxy.sendAction([getProxy().ACT_FOLD]);
                    return;
                }
                utils.SoundUtils.playEffectSound(utils.SoundUtils.kaishixingdong);
                this.view.myIsAct = true;
                if (proxy.isTrust) {
                    this.trustAction();
                    return;
                }
                if (this.right2btns.parent != null) {
                    
                    this.setChildVisable(this.right2btns, false, this.bottombtns);
                    this.setChildVisable(this.right3btns, false, this.bottombtns);
                    if (this.rangqicheck.selected) {//让或弃
                        if (this.isRangpai()) {//过
                            proxy.sendAction([proxy.ACT_CHECK]);
                        }
                        else {//弃牌
                            proxy.sendAction([proxy.ACT_FOLD]);
                        }
                        return;
                    } else if (this.rangpaicheck.selected) {//自动让牌
                        if (this.isRangpai()) {
                            proxy.sendAction([proxy.ACT_CHECK]);
                            return;
                        } else if (this.genNum == this.getGenNum() /*proxy.nowMaxBet - proxy.mySeatvo.turnBet*/) {
                            if (this.isAllin()) {//allin
                                proxy.sendAction([proxy.ACT_ALLIN]);
                            } else proxy.sendAction([proxy.ACT_CALL]);
                            return;
                        }
                    } else if (this.gencheck.selected) {//任意跟
                        if (this.isRangpai())
                            proxy.sendAction([proxy.ACT_CHECK]);
                        else if (this.isAllin()) {//allin
                            proxy.sendAction([proxy.ACT_ALLIN]);
                        } else
                            proxy.sendAction([proxy.ACT_CALL]);
                        return;
                    } 
                }
                this.view.effect.showIsMyTurn(true);
                this.r3btn.touchEnabled = proxy.canaddBet() || this.isAllin();
                this.r3btn.alpha = this.r3btn.touchEnabled ? 1 : 0.5;
                this.setChildVisable(this.biaoqingbtn, false, this.bottombtns);
                if (this.isRangpai()) {
                    this.r2btnfnt.text = "";
                    this.r2btnlab.source = "img_word_play_ranpai_png"//让牌
                } else if (this.isAllin()) {
                    this.r2btnlab.source = "img_word_play_allin_png"//显示Allin
                    this.r2btnfnt.text = "";
                }
                else {
                    this.r2btnfnt.text = "跟" + FormatUtils.wan(this.getGenNum() /*proxy.nowMaxBet - proxy.mySeatvo.turnBet*/);//显示跟  紫色跟
                    this.r2btnlab.source = ""// "img_word_play_gengzhu1_png"//显示跟注
                }
                this.setChildVisable(this.leftbtns, true, this.bottombtns);
                var max:number = proxy.addMaxBet();
                var min:number = proxy.addMinBet();
                this.isShowDichi();

                var bet:number = proxy.getTotalBet();
                if (this.is2Blind) {
                    this.l1btnlab.source = "img_word_play_2dm_png";
                    this.setLab(bet + bet, this.l1btnlab, this.l1btn, min, max);
                } else {
                    this.l1btnlab.source = "img_word_play_2dc_png";
                    this.setLab(Math.floor(bet / 2), this.l1btnlab, this.l1btn, min, max);
                }

                if (this.is3Blind) {
                    this.l2btnlab.source = "img_word_play_3dm_png";
                    this.setLab(bet + bet + bet, this.l2btnlab, this.l2btn, min, max);
                } else {
                    this.l2btnlab.source = "img_word_play_3dc_png";
                    this.setLab(Math.floor(bet * 2 / 3), this.l2btnlab, this.l2btn, min, max);
                }

                if (currentType == room.TYPE.PK) {
                    this.l3btn.touchEnabled = true;
                    this.l3btn.alpha = 1;
                    this.l3btnlab.source = "img_word_play_allin_png"; 
                }else if (this.is4Blind) {
                    this.l3btnlab.source = "img_word_play_4dm_png";
                    this.setLab(bet + bet + bet + bet, this.l3btnlab, this.l3btn, min, max);
                } else {
                    this.l3btnlab.source = "img_word_play_1dc_png";
                    this.setLab(bet, this.l3btnlab, this.l3btn, min, max);
                }

//                var mess:string = "服务端权限:"
//                var nAntePower:number = proxy.AntePower;
//                if(nAntePower & proxy.MAP_EXIT) 
//                    mess+="弃牌,"
//                if(nAntePower & proxy.MAP_DOWNANTE) 
//                    mess+="下注,"
//                if(nAntePower & proxy.MAP_FOLLOWANTE) 
//                    mess+="跟注,"
//                if(nAntePower & proxy.MAP_ALLIN) 
//                    mess+="ALLIN,"
//                if(nAntePower & proxy.MAP_RAISE) 
//                    mess+="加注"   
//               this.servermes.text = mess;     
            } else {
//                this.servermes.text = "";  
                this.view.effect.showIsMyTurn(false);

                if (tablevo.whoplay > -1 && tablevo.tableStatus > 0 && proxy.mySeat > -1 && proxy.mySeatvo.isPlay && !proxy.mySeatvo.isFold && !proxy.mySeatvo.isAllIn && !this.view.myIsAct) {
                    this.setChildVisable(this.right2btns, true, this.bottombtns);//快捷按钮
                    if (this.isRangpai()) {
                        this.r2btnfnt.text = "";
                        this.r2btnlab.source = "img_word_play_ranpai_png"//让牌
                        this.r2checkimg.visible = true//自动让牌文字
                        this.r2checkfnt.text = "";//自动跟文字
                    } else {
                        this.r2checkimg.visible = false//自动让牌文字
                        var gen = this.getGenNum()
                        if (this.genNum != gen/*proxy.nowMaxBet - proxy.mySeatvo.turnBet*/) {
                            this.updateCheckBox(this.rangpaicheck, false);
                        }
                        this.genNum = gen;
                        this.r2checkfnt.text = "跟" + FormatUtils.wan4(gen);//自动根文字 黄色跟字
                    }
                } else {
                    this.setChildVisable(this.right2btns, false, this.bottombtns);
                }
                if (isPlayOver) {
                    this.clearLiangPaiTimer();
                    this.liangPaiTimer = egret.setTimeout(this.liangPaiEndFunc, this, PlayCardsPlayComp.LIANG_PAI_TIME);
                }
                this.setChildVisable(this.right3btns, (room.getProxy().current && (currentType == room.TYPE.VIP||currentType == room.TYPE.PK)  && proxy.mySeat == -1) || this.isLiangpai(), this.bottombtns);
                if (proxy.mySeat == -1) {
                    this.r4btnlab.source = "img_word_play_sitdown_png";//坐下
                } else
                    this.r4btnlab.source = "img_word_play_jiesuliangpai_png";//结束亮牌
                this.setChildVisable(this.biaoqingbtn, getProxy().mySeat > -1, this.bottombtns);
                if (this.moneySelect != null && this.moneySelect.parent)
                    this.moneySelect.removeFromParent();
                this.showBtns(true);
            }

        }

        private setLab(value:number, lbtnlab:eui.Image, lbtn:eui.Group, min:number, max:number):void {
            lbtn.touchEnabled = value >= min && value <= max && getProxy().canaddBet();
            lbtn.alpha = lbtn.touchEnabled ? 1 : 0.5;
        }

        /**可以跟的筹码数量 */
        private getGenNum():number {
            var proxy = getProxy();
            return Math.min(proxy.nowMaxBet - proxy.mySeatvo.turnBet, proxy.mySeatvo.nowBet)
        }

        /**
         * 是否是让牌   true 让牌 false 跟注
         */
        public isRangpai():boolean {
            var p = getProxy()
            return p.nowMaxBet <= p.mySeatvo.turnBet
        }

        /**
         * 是否allin
         */
        public isAllin():boolean {
            return getProxy().nowMaxBet - getProxy().mySeatvo.turnBet >= getProxy().mySeatvo.nowBet;
        }

        /**
         * 坐标按钮显示底池文字
         * X2盲 vs 1/3底池， 谁大显示谁
         */
        private isShowDichi():void {
            if (getTableVO().globalCards && getTableVO().globalCards.length > 0) {
                this.is2Blind = this.is3Blind = this.is4Blind = false;
                return;
            }
            var bet:number = getProxy().getTotalBet();
            var bb:number = getTableVO().bbBet;
            var myTurnBet:number = getProxy().mySeatvo.turnBet;

            this.is2Blind = 2 * bb - myTurnBet >= bet / 2;
            this.is3Blind = this.is2Blind && 3 * bb - myTurnBet >= bet * 2 / 3;
            this.is4Blind = this.is3Blind && 4 * bb - myTurnBet >= bet;
        }

        /**
         *  首先玩家坐下 + 没点过亮牌
         *  并且：
         *  1. 弃牌状态 or 2. 玩家胜利(未比牌)+牌局结束状态
         *
         */
        private isLiangpai():boolean {
            var theProxy:PlayCardsProxy = getProxy();
            return !this.isLiangpaiClick && theProxy.mySeatvo != null
                && (theProxy.mySeatvo.isFold || (getTableVO().tableStatus == 0 && theProxy.mySeatvo.myCard.length > 0 && this.winnerCanShowCard));
        }

        public clearLiangPaiTimer():void {
            egret.clearTimeout(this.liangPaiTimer);
            this.liangPaiTimer = 0;
        }

        /**
         * 5秒后，如果亮牌按钮还在，则关闭
         */
        public liangPaiEndFunc():void {
            this.liangPaiTimer = 0;
            if (this.right3btns && this.right3btns.parent && getProxy().mySeat != -1) {
                this.setChildVisable(this.right3btns, false, this.bottombtns);
            }
        }

        /*显示按钮*/
        public showBtns(value:boolean):void {
            this.leftbtns.visible = value;
            this.rightbtns.visible = value;
        }

        /**显示加注界面 */
        private showAddBet():void {
            if (this.moneySelect == null)
                this.moneySelect = new PlayCardSelectMoneyComp();
            if (this.moneySelect.parent == null) {
                this.addChild(this.moneySelect);
                this.moneySelect.show();
                this.showBtns(false);
            }
        }

        /**显示托管 */
        public showTrust():void {
            this.setChildVisable(this.trustview, true, this);
            this.trustview.visible = true;
            getProxy().isTrust = true;
        }

        /**取消托管 */
        public hideTrust():void {
            this.setChildVisable(this.trustview, false, this);
            __PVO().to(app.NetAction.MATCH_HEART_BEAT);
            getProxy().isTrust = false;
            getProxy().outTime = 0;
        }

        /**托管操作 */
        public trustAction(): void {
            // if (DEBUG) {
            //     if (this.isRangpai()) //加
            //         getProxy().addBet(0);
            //     else//跟
            //         getProxy().sendAction([getProxy().ACT_CALL], false);
            //     return;
            // }
            if (this.isRangpai()) //过
                getProxy().sendAction([getProxy().ACT_CHECK], false);
            else//弃牌
                getProxy().sendAction([getProxy().ACT_FOLD], false);
        }

        public showCardGuess(show:boolean) {
            if (show) {
                // var playvo: appvos.SeatPlayerVO = getProxy().mySeatvo;
                // var total = playvo.numWins + playvo.numLosts + playvo.numPeaces;
                // if (total <= 10) return;
                if (user.getProxy().playInfoVO && user.getProxy().playInfoVO.totalHand >= 10) {
                    getProxy().cgTime = null;
                    getProxy().cgMoney = null;
                    this.setCardGuess();
                    this.cggp.y = 90;
                    this.cglb6.visible = false;
                    this.cggp.visible =  this.cgbtns.visible = true;
                    this.setChildVisable(this.cggp, true, this.bottombtns);
                    egret.Tween.get(this.cggp).to({y: -5}, 130);
                } else {
                    __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
                }
            } else {
                this.setChildVisable(this.cggp, false, this.bottombtns);
            }
        }

        public setCardGuess() {
            if (getProxy().cgNumber === null || getProxy().cgNumber === undefined) getProxy().cgNumber = Math.floor(Math.random() * getProxy().cgStakeRules.length);
            var cgNumber = getProxy().cgNumber;
            this.cglb1.text = getProxy().cgStakeRules[cgNumber][0];
            var mb = user.getProxy().currentRoom.maxBank;
            var i = mb == 40000 ? 1 : 2;
            this.cglb2.text = getProxy().cgStakeRules[cgNumber][i] + "倍";
            var bb = user.getProxy().currentRoom.bigBlinds;
            this.cglb3.text = (getProxy().cgStakeTimes[0] * bb).toString();
            this.cglb4.text = (getProxy().cgStakeTimes[1] * bb).toString();
            this.cglb5.text = (getProxy().cgStakeTimes[2] * bb).toString();
        }

        public sendCardGuess() {
            __PVO().i(getProxy().cgNumber + 1, getProxy().cgTime).to(app.NetAction.GLXY_MESSAGEVO_REQ_GUESS_CARD);
        }

        public finishCardGuess() {
            mc2sdk.event(mc2sdk.EVENT_TYPE.CARD_GUESS, [getProxy().cgNumber + 1, getProxy().cgTime]);
            this.cgbtns.visible = false;
            getProxy().cgMoney = getProxy().cgStakeTimes[getProxy().cgTime] * user.getProxy().currentRoom.bigBlinds;
            this.cglb6.textFlow = <Array<egret.ITextElement>>[
                {text: "投注\"", style: {"textColor": AppConst.TextColors.white}},
                {
                    text: getProxy().cgStakeRules[getProxy().cgNumber][0],
                    style: {"textColor": AppConst.TextColors.yellow}
                },
                {text: "\"", style: {"textColor": AppConst.TextColors.white}},
                {text: getProxy().cgMoney.toString(), style: {"textColor": AppConst.TextColors.yellow}},
                {text: "金额成功，请等待下局开奖", style: {"textColor": AppConst.TextColors.white}}
            ];
            this.cglb6.visible = true;
        }
        public addMess(id: number, mess: string,char:number=0): void{
            var rname: string;
            var tablevo = getTableVO();
            id = user.getProxy().getRoleId(id);
            for (var i = 0,  len = tablevo.joinPlayerVO.length; i < len; i++) {
                var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
                if (join.roleId == id) {
                    rname = join.name
                    break;
                }
            }
            if (rname) {
                 if (this.messTextFlow == null) {
				 this.messTextFlow = <Array<egret.ITextElement>>[];
                } 
                 if (char > 0) {
                     mess = gameabc.ResourceBundleUtil.getMessage("CHAT_" + char);
                     this.messTextFlow.push({ text:rname + "：", style: { "textColor": 0xff9900 } });
                     this.messTextFlow.push({ text: mess + "\n", style: { "textColor": 0xFFFFCC } });
                       this.chatlab.textFlow = <Array<egret.ITextElement>>[
                       { text: rname + "：", style: { "textColor": 0xff9900 } },
                       { text: mess + "\n", style: { "textColor": 0xFFFFCC } }
                    ]
                    
                 } else {
                       this.messTextFlow.push({ text: rname + "：", style: { "textColor": 0xAF8EBB } });
                       this.messTextFlow.push({ text: mess + "\n" });
                       this.chatlab.textFlow = <Array<egret.ITextElement>>[
                        { text: rname + "：", style: { "textColor": 0xAF8EBB } },
                        { text: mess + "\n" }
                    ]
                }
                while (this.messTextFlow.length > 100) {
                    this.messTextFlow.shift();
                }
              
                if (this.chatMessview && this.chatMessview.parent) {
                    this.chatMessview.refText(this.messTextFlow);
                }
				egret.clearTimeout(this.timeout);
				this.timeout = egret.setTimeout(this.clearChatlab,this,10000);
            }
           
        }
		private clearChatlab(): void{
			this.chatlab.text = "";
		}
        protected touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            super.touchBindButtonHandler(clickTarget);
            switch (clickTarget) {
                case this.btnbak:
                    //    if (this.view.isVideo()) {
                    //        getProxy().outbakfun();
                    //    } else {
                    mc2sdk.event(mc2sdk.EVENT_TYPE.PLAYCARD_MENU);
                    if (user.getProxy().willJoinMatchRoom) {
                        if (room.getProxy().currentType == room.TYPE.MTT){
                            var mttVO = match.getProxy().currentMatchVO;
                            if (mttVO.startTime > match.getSvrTime()){
                                playcards.getProxy().outbakfun(); //比赛没开始直接退
                            } else {
                                playcards.getProxy().outAlert();
                            }
                        } else {
                            playcards.getProxy().out();
                        }
                    } else {
                        if (this.outmenu == null) {
                            this.outmenu = new PlayCardOutMenuComp();
                            this.outmenu.view = this.view;
                        }
                        this.addChild(this.outmenu);
                        this.outmenu.refBtns();
                    }
                    break;
                case this.paijubtn:
                    __OPEN_MOUDLE(AppReg.APP_PLAY_REVIEW, null, null, null, this.view.mainview);
                    break;
                //  case this.startbtn://房主开始
                //     __SEND_MESSAGE_COMMAD(app.NetAction.MATCH_START);
                //  break;
                case this.goumaibtn:
                    // if(this.test==null)
                    //     this.test = new TestPlaycardsUIComp();
                    // this.mainview.addChild(this.test);
                    __OPEN_MOUDLE(AppReg.APP_PLAY_BUY, null, null, null, this.view.mainview);
                    // if (DEBUG) {               
                        //     PlayCardsUIMediator.index = null;
                        //   __PVO().i(1, 0,5).to(app.NetAction.GLXY_MESSAGEVO_REQ_GUESS_CARD);
                    //    return;
                //    }

                    break;
                case this.l1btn:
                    if (!this.is2Blind) {// 1/2底池
                        var totalBet:number = Math.floor(getProxy().getTotalBet() / 2);
                    } else { // 2x 大盲
                        totalBet = getTableVO().bbBet + getTableVO().bbBet - getProxy().mySeatvo.turnBet;
                    }
                    getProxy().addBet(totalBet);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.ADDBET_B1, room.getProxy().current.svrOfsId);
                    break;
                case this.l2btn:
                    if (!this.is3Blind) {// 2/3底池
                        totalBet = Math.floor(getProxy().getTotalBet() * 2 / 3);
                    } else { // 3x 大盲
                        totalBet = getTableVO().bbBet + getTableVO().bbBet + getTableVO().bbBet - getProxy().mySeatvo.turnBet;
                    }
                    getProxy().addBet(totalBet);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.ADDBET_B2, room.getProxy().current.svrOfsId);
                    break;
                case this.l3btn:
                    if (room.getProxy().currentType == room.TYPE.PK) {//pk allin
                        totalBet = getProxy().mySeatvo.nowBet;                   
                    }else if (!this.is4Blind) {// 1x底池
                        totalBet = getProxy().getTotalBet();
                    } else { // 4x 大盲
                        totalBet = getTableVO().bbBet + getTableVO().bbBet + getTableVO().bbBet + getTableVO().bbBet - getProxy().mySeatvo.turnBet;
                    }
                    getProxy().addBet(totalBet);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.ADDBET_B3, room.getProxy().current.svrOfsId);
                    break;
                case this.biaoqingbtn://表情按钮
                    if (this.chatview == null) {
                        this.chatview = new PlayCardsChatComp()
                    }
                    if (this.chatview.parent == null) {
                        this.view.mainview.addChild(this.chatview);
                        this.chatview.show();
                    }
                    else
                        this.chatview.close();
                    break;
                case this.liaotianbtn://聊天
                   
                    if (this.chatMessview == null) {
                        this.chatMessview = new PlaycardsChatMessComp()
                    }
                    if (this.chatMessview.parent == null) {
                        this.view.mainview.addChild(this.chatMessview);
                        this.chatMessview.refText(this.messTextFlow);
                    }
                    else
                        this.chatMessview.close();
                    break;   
                case this.r1btn://弃牌
                    getProxy().sendAction([getProxy().ACT_FOLD]);
                    break;
                case this.r2btn:
                    if (this.isRangpai()) {//过
                        getProxy().sendAction([getProxy().ACT_CHECK]);
                    } else if (this.isAllin()) {//allin
                        getProxy().sendAction([getProxy().ACT_ALLIN]);
                    }
                    else {//跟注
                        getProxy().sendAction([getProxy().ACT_CALL]);
                    }
                    break;
                case this.r3btn://下注
                    this.showAddBet();
                    break;
                case this.r4btn://坐下 结束亮牌
                    if (this.isLiangpai()) {
                        this.isLiangpaiClick = true;
                        __PVO().to(app.NetAction.MATCH_SHOW_CARD);
                        this.setChildVisable(this.right3btns, false, this.bottombtns);
                    }
                    else {
                        if (room.getProxy().currentType == room.TYPE.PK) {
                            __SEND_NOTIFICATION(app.constant.AppMediatorConst.DRAG_IN_SIT_DOWN);
                        } else {
                             var value:number = getTableVO().minJoinMoney * getTableVO().maxMagnification;
                             __PVO().i(value).to(app.NetAction.MATCH_TAKEIN);
                        }                     
                    }
                    break;
                case this.sitbtn://真人德州旁观坐下
                    // __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SITE);
                    __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[2]);//从旁观荷官的状态站起
                    user.getProxy().autoSit(1,false);
                    break;   
                case this.giftbtn:                  
                    if (this.giftview == null) {
                        this.giftview = new PlayCardsGiftComp()
                    }
                    if (this.giftview.parent == null) {
                        this.view.mainview.addChild(this.giftview);                  
                    }
                    else
                        this.giftview.close();
                    break;   
                case this.r5btn: // 快速换桌
                case this.fastFoldBtn: // 快速弃牌
                    getProxy().change();
                    break;
//              case this.btntask://任务
//                    __OPEN_PRE_MOUDLE(AppReg.APP_MISSION,[mission.OPEN_TYPE.room],null,null, this.view.mainview);//,
//                  break;     
                case this.btnrank://排行
                    if(room.getProxy().currentType == room.TYPE.SNG)
                        __OPEN_PRE_MOUDLE(AppReg.CURRENT_MATCH_INFO, null, null, null, this.view.mainview);
                    else if (room.getProxy().currentType == room.TYPE.MTT)
                        __OPEN_PRE_MOUDLE(AppReg.MTT_STATE, 1, null, null, this.view.mainview);
                    break;
                case this.trustview://托管
                    this.hideTrust();
                    break;
                case this.cgbtn1:
                    getProxy().cgTime = 0;
                    this.sendCardGuess();
                    break;
                case this.cgbtn2:
                    getProxy().cgTime = 1;
                    this.sendCardGuess();
                    break;
                case this.cgbtn3:
                    getProxy().cgTime = 2;
                    this.sendCardGuess();
                    break;
                case this.cgbtn4:
                    if (++getProxy().cgNumber >= getProxy().cgStakeRules.length) getProxy().cgNumber = 0;
                    this.setCardGuess();
                    break;
                case this.btnCaiShen:
                    //__OPEN_PRE_MOUDLE(AppReg.MAMMON, null, null, null, this.view.mainview);
                    __OPEN_PRE_MOUDLE(AppReg.newMammon, null, null, null, this.view.mainview);
                    break;
                case this.btnChengzhang:
                    __OPEN_PRE_MOUDLE(AppReg.APP_ChengZhang,null, null, null, this.view.mainview);
                    break;   
                case this.btnGoldTreen:
                    __OPEN_PRE_MOUDLE(AppReg.APP_GOLD_TREE,null, null, null, this.view.mainview);
                    break;
                // case this.btnTreasure:
                //     __OPEN_PRE_MOUDLE(AppReg.APP_TREASURE, null, null, null, this.view.mainview);
                //     break;
            }
        }
        /**财神按钮显示走服务器配置
         * 无推送不显示
         */
        _showCaishen():void{ 
            this.setChildVisable(this.btnCaiShen, true, this);
            
        }
        /**更新财神btn相关内容及特效 */
        updateBtnCaiShen():void {
            // var totalRound:number = playcards.getTableVO().caishentime;
            // var nowRound:number = playcards.getTableVO().caishenround;
            // // 更改财神显示的文字
            // this.txtCaiShen.text = gameabc.StringUtils.formatString("{0}/{1}", nowRound, totalRound);
            // // dragonBones.WorldClock.clock.add(this.armatureCaiShen);
            // // this.armatureCaiShen.display.visible = true;
            // this.armatureCaiShen.animation.play("caishensongfu",1);

            
            var totalNum = mammon.getProxy()._totalPoolNum>=0?mammon.getProxy()._totalPoolNum:0;
            // 更改财神显示的文字
            this.txtCaiShen.text = gameabc.StringUtils.formatString("{0}", totalNum);
            
            this.armatureCaiShen.animation.play("caishensongfu",1);
        }

        /**更新财神倒计时的描述框 */
        updateCaishenDesc(lastNum: number): void{
            //改成通用冒泡方法 zhj
            if(lastNum<=10 && lastNum >=0){
                // this._group_caishenDes.visible = true;
                this.view.effect.showMess(-5, this.height - 250, "财神奖励\n即将开奖", this,"bottom");
            }
            // else {
            //     this._group_caishenDes.visible = false;
            // }
            // egret.setTimeout(()=>{this._group_caishenDes.visible = false;},this,3000);
        }

        /** 添加成长按钮动画 */
        btnChengzhang: eui.Group;
        mvChengzhang: dragonBones.Movie;
        addBtnChengzhang() {
            if (this.mvChengzhang==null) {
                 gameabc.addMovieGroup("chengzhang_ske_dbmv", "chengzhang_tex_png", AppReg.APP_PLAYCARDS);
                this.mvChengzhang = gameabc.buildMovie("MovieClip", AppReg.APP_PLAYCARDS);
                this.mvChengzhang.x = this.mvChengzhang.y = 30;     
                this.btnChengzhang.addChild(this.mvChengzhang);
            }
            if(this.cangetChengzhang)
                 this.mvChengzhang.play(null);
            this.setChildVisable(this.btnChengzhang, true, this);

        }
        /**移除成长按钮 */
        removeBtnChengzhang() {
              if (this.mvChengzhang) {
                  this.mvChengzhang.stop();
            }
              this.setChildVisable(this.btnChengzhang, false, this);
        }
        /**有成长可以领取 */
        cangetChengzhang: boolean;
        /**检查是否有成长可领 */
        checkChengzhang(): boolean{
            this.cangetChengzhang= false;//当前是否可领取
            var json = RES.getRes("chengzhang_json");
             var myuser = user.getProxy().playInfoVO;
            if (json&&myuser) {
                 var data = json.data;
                var totalget: number = 0;//已经获得积分          
                for (var i: number = 0, len: number = data.length; i < len; i++){
                    totalget += Math.min(Number(myuser[data[i].num]),Number(data[i].maxnum))* Number(data[i].mark);
                }
                var gift = json.gift;//可领奖积分列表 可能不是顺序
                var giftItem = json.giftItem;//可领奖物品列表
                var getgift:string[] =myuser.rewardrecord;
                var max: number = 0;//积分上限
                var giftindex: number = gift.length-1;//当前显示
                
                for (var i: number = 0, len: number = gift.length; i < len; i++){
                    var g: number = Number(gift[i]);
                    max = Math.max(g, max);
                    if (totalget >= g) {
                        var nohas: boolean = getgift.indexOf(i+"") == -1;
                        if (nohas) {//满足 没领过
                            giftindex = i;
                            this.cangetChengzhang = true;
                            break;
                        }
                    } else if (!this.cangetChengzhang && i < giftindex) {
                        giftindex = i;
                    }
                }
            }
            if (this.cangetChengzhang) {
                this.view.effect.showMess(-5, this.height - 250, "成长奖励\n可领取", this, "bottom");
                if(this.mvChengzhang)
                    this.mvChengzhang.play(null);
                // if (!this.tipBox.visible) {
                //    this.tipBox.visible = true;
                //    this.tipBox.alpha = 0;
                //    this.tipBox.x = 0;
                //     egret.Tween.removeTweens(this.tipBox);
                //     egret.Tween.get(this.tipBox)
                //     .to({alpha:1,x:-266},300,egret.Ease.sineOut)
                //     .wait(3000)
                //     .set({visible:false});
                //     }
            // } else {
            //     this.tipBox.visible = false;
            } else {
                if(this.mvChengzhang)
                    this.mvChengzhang.stop();
           }
            return totalget >= max && !this.cangetChengzhang;//出师
        }
        public dispose():void {
            super.dispose();
            this.clearLiangPaiTimer();
            if (this.missionBox) this.missionBox.removeFromParent(true);
            if (this.armatureCaiShen) {              
                dragonBones.WorldClock.clock.remove(this.armatureCaiShen);
                gameabc.destoryFactory(AppReg.APP_PLAYCARDS);
                this.armatureCaiShen.dispose();
            }
             if (this.mvChengzhang) {
                  this.mvChengzhang.stop();
                  this.mvChengzhang.dispose();
                  this.btnChengzhang.addChild(this.mvChengzhang);
                  this.mvChengzhang = null
                
            }
//           if (this.missionTipUI)
//               this.missionTipUI.dispose();  
            if (this.sngWheel)
                this.sngWheel.dispose();
                this.sngWheel = null;
            if (this.moneySelect)
                this.moneySelect.dispose();
            if (this.outmenu)
                this.outmenu.dispose();
            if (this.btnGoldTreen)
                this.btnGoldTreen.dispose();
            if (gameabc.hasMovieGroup(AppReg.APP_PLAYCARDS)) {
                gameabc.removeMovieGroup(AppReg.APP_PLAYCARDS);
            }
        }
    }
}

