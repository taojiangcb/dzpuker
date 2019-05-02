module playcards {

    export const enum OPEN_PARAM{
        NORMAL = 0,//普通打开
        WAITING, //界面先打开，实际游戏没有开始
        SINGLE,//单机游戏
        CONNECT_GS, //连接游戏服时执行的打开命令
        NONE //只打开牌局界面，看到桌子，但什么都没有
    }

	/**
	 *
	 * @author 
	 *
	 */
    export class PlayCardsUIMoudleComp extends app.base.BaseSceneUIMoudleComponent{
        public tableGroup: eui.Group;//
         public effectui: eui.Component;//特效层
        public mainview: eui.Group;//弹出框显示层
       public bgimg:eui.Image;
        public btndashang: eui.Image;//打赏按钮
        private tableMesslab:eui.Label;//房间信息
        // private qrbtn:eui.Image;//二维码
        // private startbtn:eui.Group;//开始按钮
        public allmoney: Array<PlayCardMoneyComp>;   
        public allitemsGroup: eui.Group;
        private money0: PlayCardMoneyComp;
        private money1: PlayCardMoneyComp;
        private money2: PlayCardMoneyComp;
        private money3: PlayCardMoneyComp;
        private money4: PlayCardMoneyComp;
        private money5: PlayCardMoneyComp;
        private money6: PlayCardMoneyComp;
        private money7: PlayCardMoneyComp;
        private money8: PlayCardMoneyComp;      
        public  allItem: Array<PlayCardsItemComp>;
        private item0: PlayCardsItemComp;
        private item1: PlayCardsItemComp;
        private item2: PlayCardsItemComp;
        private item3: PlayCardsItemComp;
        private item4: PlayCardsItemComp;
        private item5: PlayCardsItemComp;
        private item6: PlayCardsItemComp;
        private item7: PlayCardsItemComp;
        private item8: PlayCardsItemComp;   
        public allcardsGroup: eui.Group;
        private card1: CardItem;
        private card2: CardItem;
        private card3: CardItem;
        private card4: CardItem;
        private card0: CardItem;
        public allCard: Array<CardItem>;       
        public jbctip:eui.Group;//金币房提示
        private zhuangimg:PlayCardBankerImg;//庄家图片
        public sidepot:PlaycardsSidePotComp;//边池
        public effect: PlayCardsUIEffect;//动画演示
        public videoComp: PlayCardsVideoComp;//回放控制;
        public playComp: PlayCardsPlayComp;//打牌控制按钮
        private tipview: PlayCardTipComp;//牌局提示
        public wait: WaitComp;//等待玩家
        public cgReward: eui.Group;
        public cgLabel: eui.BitmapLabel;
        public tableFreeLabel: eui.Image;
        public tableMessGroup: eui.Group;
        public messbg: eui.Image;
        public safecomp: PlaycardSafeComp;

        public _btn_zidongqipai:eui.Button;// @ch 自动弃牌
        // public treasureBtn: eui.Label;
      
//        private servermes:eui.Label;//服务端信息
        // public replaybtn: eui.Button;//重播按钮
        // public jubaobtn: eui.Group;//举报按钮
        public myIsAct:boolean;//我是否操作过
        public constructor() {
    		super();
            this.skinName = "PlayCardsUIMoudleCompSkin";          
		}
        public setChildVisable(dis: egret.DisplayObject,visable: boolean,parent:egret.DisplayObjectContainer,num:number=-1): void {
            if(dis!=null){
                if(visable) {
                    if (dis.parent == null) {
						if (parent == this)parent.addChildAt(dis, this.numChildren - 1);
						else if(parent== this.tableGroup) parent.addChildAt(dis, parent.numChildren - 2);
                   	    else {
                            if (num == -1) parent.addChild(dis);
                            else  parent.addChildAt(dis, num);
                        } 
					}
                       
                } else if(dis.parent != null)
                    dis.parent.removeChild(dis);
            }       
        }
        definePreload(preloadData: gameabc.UIPreloadData, intoLoadCb: Function): void{      
            if( user.getProxy().willJoinMatchRoom)
                 preloadData.preRes.push("s9_bg_play_bg2_jpg");
            else 
                 preloadData.preRes.push("s9_bg_play_bg_jpg");
            super.definePreload(preloadData,intoLoadCb);
        }
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
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
            this.bindButton(this._btn_zidongqipai,true);
            // this.bindButton(this.treasureBtn);
            // this.bindButton(this.replaybtn);
            // this.bindButton(this.jubaobtn);
            // this.setChildVisable(this.btndashang,false,this.tableGroup);
            this.setChildVisable(this.money1,false,this.allitemsGroup);
            this.setChildVisable(this.money2,false,this.allitemsGroup);
            this.setChildVisable(this.money3,false,this.allitemsGroup);
            this.setChildVisable(this.money4,false,this.allitemsGroup);
            this.setChildVisable(this.money5,false,this.allitemsGroup);
            this.setChildVisable(this.money6,false,this.allitemsGroup);
            this.setChildVisable(this.money7,false,this.allitemsGroup);
            this.setChildVisable(this.money8,false,this.allitemsGroup);
            this.setChildVisable(this.money0,false,this.allitemsGroup);
            this.setChildVisable(this.zhuangimg, false, this.tableGroup);
            this.setChildVisable(this.jbctip, false, this.tableGroup);
            // this.setChildVisable(this.leftbtns,false,this.bottombtns);
            // this.setChildVisable(this.rightbtns,false,this.bottombtns);
            // this.setChildVisable(this.right2btns, false, this.bottombtns);
            // this.setChildVisable(this.replaybtn, false, this);
            //  this.setChildVisable(this.jubaobtn, false, this);
            // this.setChildVisable(this.startbtn,false,this.tableGroup);
            this.allCard = [this.card0,this.card1,this.card2,this.card3,this.card4];
            this.allItem = [this.item0,this.item1,this.item2,this.item3,this.item4,this.item5,this.item6,this.item7,this.item8];
            this.allmoney = [this.money0,this.money1,this.money2,this.money3,this.money4,this.money5,this.money6,this.money7,this.money8];
            // this.allcheck = [this.rangqicheck,this.rangpaicheck,this.gencheck];
            // this.rangqicheck.addEventListener(egret.Event.CHANGE,this.checkChange,this);
            // this.rangpaicheck.addEventListener(egret.Event.CHANGE,this.checkChange,this);
            // this.gencheck.addEventListener(egret.Event.CHANGE,this.checkChange,this);
            this.effect = new PlayCardsUIEffect(this);
            this.cgReward.visible = false;
            this.playComp.view = this;
            this.videoComp.view = this;// = new PlayCardsVideoComp(this);
            if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB)
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
             this.tableMesslab.addEventListener(egret.TextEvent.LINK, function (e:egret.TextEvent) {
                 tip.popSysCenterTip("加入房间输入房间id:"+  getProxy().joinNumber +"可加入此房间"); 
            }, this);
        }
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
        public addParent():void{
          super.addParent();
         
          getProxy().isPlayCard = true;  
          getProxy().nextLeave = false;
          if (this.initialized) {
            //  if(utils.NativeUtils.getURLObj()['live']) 
            //      getProxy().isLive = true;
              var opendata = getProxy().opendata;
            
             //本来放在外面处理，因为存在多个入口，现在放到界面里处理
            if (opendata == OPEN_PARAM.WAITING||opendata ==OPEN_PARAM.SINGLE||opendata ==OPEN_PARAM.CONNECT_GS||opendata ==OPEN_PARAM.NONE) {
                getProxy().tableVO = null;
                getProxy().playvideovo = null;
                getProxy().mySeat = -1;
                getProxy().mySeatvo = null;           
            }
            if (opendata == OPEN_PARAM.CONNECT_GS) {
                 getProxy().opendata = null; 
                __SEND_NOTIFICATION(app.NetAction.CONNECT_GS);
            } 
            user.getProxy().freeFlag = false;
              this.effect.show();              
                this.registerMediator(PlayCardsUIMediator);              
                if (opendata == OPEN_PARAM.SINGLE) {
                    getProxy().isSingle = true;
                    __REGISTER_MEDIATOR(PlaycardsServerMediator, this);
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_START);
                } 
                this.refVO();
                utils.SoundUtils.playBgSound(utils.SoundUtils.sng_bg, 0.6);
                RES.loadGroup("playeffect", 10);
                var type = room.getProxy().currentType;
                if (type == room.TYPE.FREE) {
                    this.jbctip.alpha = 1;
                    this.setChildVisable(this.jbctip, true, this.tableGroup);
                    egret.setTimeout(this.timeHideFreeTip, this, 4000);
                } else this.jbctip.removeFromParent();

                if (user.getProxy().willJoinMatchRoom) {
                    this.bgimg.source = "s9_bg_play_bg2_jpg";  
                    this.effect.fapaimv.y = 203; 
                    this.effect.fapaimv.x = 504;
                    this.effect.eyemv.x = 545;  
                    this.effect.eyemv.y = 122;  
                } else {
                    this.bgimg.source = "s9_bg_play_bg_jpg";                     
                    this.effect.fapaimv.y = 183;  
                     this.effect.fapaimv.x = 508;
                    this.effect.eyemv.x = 549;    
                    this.effect.eyemv.y = 101;
                }
            }

            //刷新MissionBox的状态
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.AWAKEN_MISSION_BOX);              
        }
        private timeHideFreeTip(): void { 
			egret.Tween.get(this.jbctip).to({alpha:0},500).call(this.jbctip.removeFromParent,this.jbctip)
		}
        private changeSize(): void{
            this.allcardsGroup.y = (768 - this.stage.stageHeight) * 0.5 + (this.stage.stageHeight - 140);
			this.tableMessGroup.y =  (768 - this.stage.stageHeight) * 0.5;
            this.zhuangimg.resetxy();
             for (var i: number = 0, len: number = 9; i < len; i++) {   
                     this.allItem[i].resetxy();
                     this.allmoney[i].resetxy();
             } 
        }
        public removeParent(): void {          
            super.removeParent();
            this.someDataClean();          
            this.unregisterMediator();
            if (getProxy().isSingle) {
                getProxy().isSingle = false;
                __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_END);
                __REMOVE_MEDIATOR(PlaycardsServerMediator);
            }
            if(getTableVO()!=null&&getTableVO().whoplay > -1)
                this.allItem[getTableVO().whoplay].removeCD();
            getProxy().isPlayCard = false;
            getProxy().checkOUT(false);
            egret.clearInterval(this.timeoutAlertTime);
            utils.SoundUtils.playBgSound(utils.SoundUtils.game_bgm);
            if (this.playComp) {
                this.playComp.hideTrust();
                this.playComp.removeParent();   
            }
            if (this.effect && this.effect.isPlayover) this.effect.playOverEnd();
            if (this.videoComp) {
                 this.videoComp.stop();
                 this.videoComp.nowvideo = null;
            }
               
            while(this.mainview && this.mainview.numChildren>0){
                var aa:egret.DisplayObject = this.mainview.getChildAt(this.mainview.numChildren-1);
                 if(aa instanceof app.base.BaseUIMoudleComponent||aa instanceof PlaycardsUIComp)
                    aa.close(); 
                else {
                    aa.removeFromParent(true);
                }
            }
            RES.destroyRes("playeffect");
            getProxy().removeGiftTextureAtlas();
            win.getProxy().isOpen();//牌局结束打开结算；
            getProxy().isLive = false;
            user.getProxy().willJoinMatchRoom = false;
            getProxy().safeResult = null;  
            getProxy().buySafe = 0;
            utils.NativeUtils.closeVedio();
            this.hideSafe();
            this.removeEventListener(eui.UIEvent.RESIZE, this.changeSize, this);
             __SEND_NOTIFICATION(gameabc.UIConstants.PRE_LOAD_VISABLE,true);
        }
        
        /**
         * 刷新桌子的盲注和前注信息
         */ 
        public refreshAnteAndBlind(tablevo:appvos.TexasTableVO):void {
            // winproxy中数据缓存
            win.getProxy().getEnterData();
            // 发送财神请求
            mammon.getProxy()._sendMammonAction();
            var roomVO: appvos.RoomVO = user.getProxy().currentRoom;             
            var proxy = getProxy();
            var messStr: string="";
            if (roomVO != null && roomVO.type == room.TYPE.SNG && match.getProxy().currentMatchVO.entryFee) {
                messStr += FormatUtils.qian(match.getProxy().currentMatchVO.entryFee) + "场  ";
            }
           
            if(tablevo) { // 如果桌子存在，则使用桌子的盲注信息
                messStr += "盲注：" + FormatUtils.wan(tablevo.sbBet) + "/" + FormatUtils.wan(tablevo.bbBet);                    
                if (tablevo.preBet > 0) {
                     messStr += "  (前注：" + FormatUtils.wan(tablevo.preBet) + ")";
                }
                if (tablevo.cardmode == 1)
                     messStr += "  扑克牌:5-A";
            } else if(roomVO != null){
                 messStr += "盲注：" + FormatUtils.wan(roomVO.smallBlinds) + "/" + FormatUtils.wan(roomVO.bigBlinds);
            }
            // // 临时方案。
            // if(roomVO != null && roomVO.smallBlinds == 100 && roomVO.type == room.TYPE.NORMAL) {
            //         messStr += "  扑克牌:5-A";
            // }  
            // 如果roomvo 是空（比如播放录像），那么用tablevo来判断。正是方案！@wx
            if((tablevo != null && tablevo.roomtype == 1) || (roomVO != null && roomVO.type == room.TYPE.FREE) ) {
                if (this.tableFreeLabel == null) {
                    this.tableFreeLabel = new eui.Image("icon_jinbichang_png");
                    this.tableFreeLabel.x = - 75;
                    this.tableFreeLabel.y = 6;
                    this.tableMessGroup.addChildAt(this.tableFreeLabel, 0);
                 }
                messStr += "  限注(1倍底池)";
            } else {
                if (this.tableFreeLabel != null) {
                    this.tableFreeLabel.removeFromParent(true);
                    this.tableFreeLabel = null;
                }
            }
            if (proxy.joinNumber != null) {
                // 
                if (room.TYPE.PK == room.getProxy().currentType&&(tablevo==null||tablevo.tableStatus==0)) {//(room.TYPE.PK == room.getProxy().currentType||room.TYPE.VIP == room.getProxy().currentType)&&
                     this.tableMesslab.textFlow = <Array<egret.ITextElement>>[
                        { text: messStr },
                        { text: " 房间ID：" + proxy.joinNumber ,style: {"href" : "event:text event triggered","textColor": 0xffffff, "size": 30}}
                     ]
                } else {
                    messStr += " 房间ID：" + proxy.joinNumber;
                    this.tableMesslab.textFlow = null;
                    this.tableMesslab.text = messStr; 
                }      
            }else 
               this.tableMesslab.text = messStr;       
        }
        
        public refVO(): void{
            this.checkLive();
             for (var i: number = 0; i < 5; i++) { 
                this.allCard[i].hideLight();
                this.setChildVisable(this.allCard[i],false,this.allcardsGroup);
            }
            
             var tablevo = getTableVO();
             this.refreshAnteAndBlind(tablevo);
             this.playComp.setChildVisable(this.playComp.cggp, false, this.playComp.bottombtns);

             if (tablevo == null) {
                 console.log("tablevo==null");
                 if (getProxy().opendata == OPEN_PARAM.NONE) {
                     this.sendNotification(app.constant.AppMediatorConst.MATCH_NONEOPEN);
                     getProxy().opendata = null;
                 }else
                     this.showWait();
                 for (var i: number = 0; i < 9; i++) {
                      this.allItem[i].visible = false;
                      this.showBetNum(i,NaN);
                 }
                //  this.setChildVisable(this.bottombtns, false,this);
                //  this.setChildVisable(this.paijubtn, false, this);
                //  this.setChildVisable(this.goumaibtn, false, this);
                //   this.setChildVisable(this.jubaobtn, false, this);
                //  return;
             } else {
                   var proxy = getProxy();     
                    PlayCardsItemComp.CD_TIME = tablevo.timeCount * 1000;
                    
                    var allrole: Array<appvos.SeatPlayerVO> = tablevo.seatPlayerVO;
                    var roleobj:Object = {};
                    var myid: number =  this.getRoleId();
                    proxy.mySeat = -1;
                    proxy.mySeatvo = null;
                    if(allrole){
                        for(var i: number = 0,len: number = allrole.length;i < len;i++) {
                            var play: appvos.SeatPlayerVO = allrole[i];
                             if (play.roleId == myid) {
                       			 this.setMyHeadAvatar(play);
                       			 proxy.mySeatvo = play;
                      			 proxy.mySeat = play.seatId;
                             } else {
                                  if (!getProxy().isSingle)
                                      __SEND_NOTIFICATION(app.NetAction.GET_HEAD_INFO,[play.roleId]);//获取玩家头像
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
                    var item: PlayCardsItemComp;
                    proxy.nowMaxBet = 0;
                    proxy.nowMaxAddBetAll = 0;
                    proxy.nowMaxAddBet = 0;
                    for(var i: number = 0;i < 9;i++) {
                        if (i < tablevo.tableSize) {
                        item = this.allItem[i]
                        item.visible = true;
                            item.setData(roleobj[i])
                            if (item.playvo != null) {
                                this.showBetNum(i, item.playvo.turnBet);
                                var max: number = Math.max(item.playvo.turnBet,proxy.nowMaxBet) 
                                if(max >proxy.nowMaxBet){
                                        var add: number = max - proxy.nowMaxAddBetAll;
                                        if(add >= proxy.nowMaxAddBet){
                                            proxy.nowMaxAddBet = add;
                                            proxy.nowMaxAddBetAll = max;
                                        }
                                            proxy.nowMaxBet = max;
                                }
                            }                       
                            else
                                this.showBetNum(i,NaN);
                        } else {
                            this.allItem[i].visible = false;
                            this.showBetNum(i,NaN);
                        }                 
                    } 
                    this.resetAllXY();
                    this.effect.addGlobalCards(tablevo.globalCards,tablevo.pots,false)
                    // this.checkStart();
                   
                    // this.setBtns(false,tablevo.nowTime);
                    this.sidepot.showAllBet(); 
                    this.showWait(tablevo.tableStatus==0);
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

                this.setChildVisable( this.videoComp,true,this)
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
             } else {
                 this.setChildVisable(this.videoComp,false,this);
                 this.setChildVisable(this.playComp, true, this); 
                 this.playComp.refVOBtns();                
                 this.videoComp.stop();
                 var type = room.getProxy().currentType;
                 this.btndashang.visible = /*type != room.TYPE.SNG&&type != room.TYPE.MTT*/!user.getProxy().willJoinMatchRoom && type != room.TYPE.FREE && type!=-1; // TODO 当前暂时无法在sng中修改银子。等有接口再优化
                //  this.setChildVisable(this.bottombtns, true, this); 
                // this.setChildVisable(this.paijubtn, true, this.righttopbtns);
                // this.setChildVisable(this.goumaibtn, true, this.righttopbtns);
                // this.setChildVisable(this.replaybtn, false, this);
                // this.setChildVisable(this.jubaobtn, false, this);
            }    
        }
        /***是否回放 */
        public isVideo(): boolean{
           return getProxy().playvideovo!=null
        }
        
        public checkLive() {
            if (getProxy().isLive) {
                     utils.NativeUtils.openVedio(getTableVO().dealer);
                     this.effect.eyemv.visible = this.effect.fapaimv.visible = this.bgimg.visible = false;
                     this.addEventListener(eui.UIEvent.RESIZE, this.changeSize, this);
                     this.allcardsGroup.y = (768 - this.stage.stageHeight) * 0.5 + (this.stage.stageHeight - 140);					 
					 this.allcardsGroup.visible = false;
					 this.sidepot.y = 480;
                     this.tableMessGroup.y = (768 - this.stage.stageHeight) * 0.5+10;
                     this.tableMessGroup.horizontalCenter = NaN;
                     this.tableMessGroup.x = (1136 - this.stage.stageWidth) * 0.5 + 100;
                     this.tableMesslab.textColor = 0xFFFFFF;              
                     this.messbg.visible = true;
                     utils.SoundUtils.setPlayBgSoundvolume(0); 
                     RES.loadGroup("playgift", 10);
            } else {
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
            for (var i: number = 0, len: number = 9; i < len; i++) { 
                var item = this.allItem[i];
                item.resetLive();
                this.allmoney[i].resetxy();
            } 
            this.playComp.resetLive();
            this.sidepot.resetLive();
        }
        /***更新荷官状态 */
        public checkdealer(): void{
            if (getProxy().isLive) {
                var state: number = getTableVO().dealerstate;
                this.playComp.setChildVisable(this.playComp.dealergroup, true, this.playComp);
                this.playComp.dealermess.text = gameabc.ResourceBundleUtil.getMessage("DEALERSTATE_" + state);
                this.playComp.dealergroup.visible = state != dealer.DealerState.IDLE;
                this.allcardsGroup.visible = state == dealer.DealerState.LEAVE_SHORT_TIME||state == dealer.DealerState.WILL_COME_BACK;
                
            } else
                 this.playComp.setChildVisable(this.playComp.dealergroup, false, this.playComp);     
       } 
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
        public getRoleId(): number{
            if (this.isVideo()) {
              return  getProxy().playvideovo.roleid;
            }
            return user.getProxy().svrRoleId;
        }
        
        /**
         * 设置自己的头像avatar
         */ 
        private setMyHeadAvatar(vo: appvos.SeatPlayerVO): void {
            if (getProxy().isSingle)
                return;    
            if(user.getProxy().svrHeadId == 0) {
                __SEND_NOTIFICATION(app.NetAction.GET_HEAD_INFO,[vo.roleId]);//获取玩家头像
            } else {
                vo.avatarID = user.getProxy().svrHeadId.toString();
            }
        }
        /**
         * 玩家入座
         * @param vo
         */
        public addPlay(vo: appvos.SeatPlayerVO):void{
            var seat: number = vo.seatId;
            var changeSeat: boolean  = false;
            if(vo.roleId == user.getProxy().svrRoleId){
                this.setMyHeadAvatar(vo);
                getProxy().mySeat = seat;
                getProxy().mySeatvo = vo;
                changeSeat = true;
                this.playComp.setBtns();
                // this.setChildVisable(this.biaoqingbtn,true,this.bottombtns);
            }else 
            {
                if (!getProxy().isSingle)
                    __SEND_NOTIFICATION(app.NetAction.GET_HEAD_INFO, [vo.roleId]);//获取玩家头像
                if(room.getProxy().currentType != room.TYPE.SNG)
                     tip.popSysTopTip(vo.name + "玩家进入了牌局");                
            }
            this.allItem[seat].setData(vo);
            if(changeSeat){
                var px:number = (getProxy().mySeat - getProxy().midSeat)
                if(px < 0) px+=9;
                if(px>4) px = -1;
                this.resetAllXY(px);
               
            }
            if(room.getProxy().currentType != room.TYPE.SNG&&room.getProxy().currentType != room.TYPE.MTT )//mtt和sng不显示等待
                this.showWait(changeSeat);
            // this.checkStart();
        }
        
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
        public removeSeat(seatid: number,type:number): void {
            if (this.effect.isPlayover) {//正在播放结算等结算完成后移除
                if (this.allItem[seatid].playvo != null) {
                    this.allItem[seatid].playvo.outType = type;
                    return;
                }
            }
            if (seatid == getProxy().mySeat) {
                 getProxy().mySeat = -1;
                getProxy().mySeatvo = null;
                // 如果站起的是自己，并且之前请求换桌。
                if(getProxy().isHuanZhuoClick){
                    // 如果牌局还没结束，增加等待时间。
                    var waitTime: number = 800;
                    if (getTableVO().tableStatus == 1) {
                        waitTime = 1800;
                    }
                        
                    // __OPEN_MOUDLE(AppReg.PRELOAD);
                    __OPEN_PRELOAD();
                    egret.setTimeout(getProxy().change,getProxy(),waitTime);
                    // 如果是排队房，这里需要主动请空桌子，服务端不会发11104协议。
                    if (room.getProxy().isWaitingQueue) {
                        this.removeAllItem();
                    }
                } else if (room.getProxy().current ) {   /**&& room.getProxy().isAntiCheating */
                    var currentType =  room.getProxy().currentType 
                    var nomoney =currentType!= room.TYPE.SNG&&currentType!=room.TYPE.MTT&&currentType!=room.TYPE.VIP&& this.allItem[seatid].playvo != null && this.allItem[seatid].playvo.canContinue == 2;//!room.getProxy().permit(room.getProxy().current) 
                    if (nomoney|| type == 1) {//没钱 或超时离开房间
                        if(room.getProxy().currentType == room.TYPE.FREE && nomoney) {
                            user.getProxy().freeFlag = true;
                        } else {
                            if(nomoney) user.getProxy().notMoney();  
                        }
                        getProxy().outbakfun();
                    }                      
                    return;
                } 
                
                // this.setChildVisable(this.biaoqingbtn,false,this.bottombtns);
                this.playComp.setBtns();
                // 如果站起的是自己，则把作为转回0
                this.resetAllXY();
               
            }else  if( this.allItem[seatid].playvo!=null)
                tip.popSysTopTip(this.allItem[seatid].playvo.name + "玩家离开了牌局");     
            // var tablevo = getTableVO(); 
            this.allItem[seatid].setData(null); 
            this.setChildVisable(this.allmoney[seatid], false, this.allitemsGroup);
            this.showWait();
            // this.checkStart();
        } 
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
        public start(sbsit:number,bbsit:number,allvo:Object, ante:number = 0):void{
            //自动补充筹码
            var proxy: PlayCardsProxy = getProxy();

            if(proxy.isAutoAddBet && proxy.mySeat > -1) __PVO().i(getTableVO().minJoinMoney * getTableVO().maxMagnification).to(app.NetAction.MATCH_TAKEIN);
              
            for (var i: number = 0; i < 5; i++) { 
                this.allCard[i].hideLight();
                this.setChildVisable(this.allCard[i],false,this.allcardsGroup);
            }
            var tableSize = getTableVO().tableSize;
            var sbBet = getTableVO().sbBet;
            var bbBet = proxy.nowMaxAddBet = getTableVO().bbBet;
            proxy.nowMaxAddBetAll = proxy.nowMaxBet = bbBet + getTableVO().preBet; 
//            var bbBet = getProxy().nowMaxAddBet = getProxy().nowMaxBet = getTableVO().bbBet;
            for(var i: number = 0;i < tableSize;i++) {              
                var seatvo = this.allItem[i].playvo;
                var add: number =null;
                if(seatvo){                 
                    var infovo: appvos.GameEndInfoVO = allvo[i];
                    if (infovo) {
                        seatvo.reset(true);
                        seatvo.nowBet = infovo.betNum; 
                        add = infovo.gameResult;
                        if (seatvo.roleId == user.getProxy().svrRoleId) {
                            getProxy().lineHistory.push(seatvo.nowBet);
                            getProxy().lineHistoryFixed.push(0);
                        }                 
                        if (i == proxy.mySeat && infovo.addBetNum != null && infovo.addBetNum > 0) {
                            var str: string = "自动补充" + FormatUtils.wan(infovo.addBetNum) + (room.getProxy().currentType == room.TYPE.FREE? "金币": "彩豆");              
                            if (!proxy.isSingle&&!this.isVideo()&& user.getProxy().svrGameData) str += "，当前账户余额为" + (room.getProxy().currentType == room.TYPE.FREE? FormatUtils.wan(user.getProxy().freeGold - seatvo.nowBet): FormatUtils.wan(user.getProxy().svrGameData.silver - seatvo.nowBet));
                            tip.popSysTopTip(str);
                            if (seatvo.roleId == user.getProxy().svrRoleId) {
                                getProxy().lineHistoryFixed.pop();
                                getProxy().lineHistoryFixed.push(seatvo.nowBet - infovo.addBetNum);
                            }
                        }
                    } else seatvo.reset(false);

                     if(add==null){
                        if(i == sbsit) {
                            add = sbBet + ante ;
                        } else if(i == bbsit) {
                            add = bbBet + ante; 
                        } else {
                            // if (ante > 0) {
                                add = ante;
                            // }
                        }
                    }
                    seatvo.totalBet = seatvo.turnBet = add
                    this.showBetNum(i, add);
                    getTableVO().totalBet += seatvo.totalBet;
                } else this.setChildVisable(this.allmoney[i],false,this.allitemsGroup);   
                 this.allItem[i].restPlay();      
            }
            this.checkBanker();
            this.sidepot.setalldata([]);
            this.sidepot.showAllBet(); 
            this.showWait();
            this.playComp.refRank();
            this.playComp.clearLiangPaiTimer();
            this.playComp.liangPaiEndFunc();
        }
        /*显示庄位*/
        public checkBanker():void{
            if(getTableVO()!=null&& getTableVO().banker>-1&&getTableVO().tableStatus==1){
                this.setChildVisable(this.zhuangimg,true,this.tableGroup);
                this.zhuangimg.resetxy();
            }else 
                this.setChildVisable(this.zhuangimg,false,this.tableGroup);
        }
        
        /**
         * 玩家操作
         * @param seatid  玩家座位号
         * @param action  玩家命令
         * @param betNum 下注金额
         */
        public playAction(seatid: number,action: number,betNum:number,effect:boolean=true):void{
            var nowplay = this.allItem[seatid];
            nowplay.playAction(action,effect);
            if (action == getProxy().ACT_FOLD&&effect) {//弃牌播放动画              
                this.effect.playfold(nowplay);
                // this.playComp.setBtns(); 下面重复了 先去掉
            }
            var tablevo = getTableVO();
            if(betNum>0&&nowplay.playvo!=null){
                nowplay.playvo.nowBet -= betNum;               
                nowplay.playvo.turnBet += betNum;
                nowplay.playvo.totalBet += betNum;
                nowplay.refMoneylab();
                tablevo.totalBet += betNum;
                if(effect)  this.effect.showAddBet(seatid, nowplay.playvo.turnBet, betNum);
                else  this.showBetNum(seatid,nowplay.playvo.turnBet)
                var max: number = Math.max(nowplay.playvo.turnBet,getProxy().nowMaxBet) 
                if(max > getProxy().nowMaxBet){
                    var add: number = max - getProxy().nowMaxAddBetAll;
                    if(add >= getProxy().nowMaxAddBet){
                        getProxy().nowMaxAddBet = add;
                        getProxy().nowMaxAddBetAll = max;
                    }
                    getProxy().nowMaxBet = max;
                }
                // for(var i = 0,len = tablevo.joinPlayerVO.length;i < len;i++) {
                //     var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
                //     if(join.roleId == nowplay.playvo.roleId) {
                //         join.nowBet = nowplay.playvo.nowBet;
                //         break;
                //     }
                // }
            } 
            this.sidepot.showAllBet();  
            this.playComp.setBtns();
        }

        /**
         * cd结束
         */
        public cdover(): void{
            var isTalk: boolean = Math.random() < 0.1;
            if (isTalk) {
                this.effect.dealerCDOverTalk();
            }
             this.playComp.trustAction();
            //  if (DEBUG) {
            //      this.playComp.showTrust();
            //      return;
            // }          
            // if(room.getProxy().currentType != room.TYPE.SNG)//赛事放不踢出
            getProxy().outTime++;
            if(getProxy().outTime == 2) {//连续超时2次 站起
                if (room.getProxy().currentType == room.TYPE.SNG||room.getProxy().currentType == room.TYPE.MTT ||getProxy().isSingle) {//赛事房间 或者单机托管
                    this.playComp.showTrust();
                } else {
                    getProxy().outTime = 0;
                    tip.Alert.show("您连续两次下注超时，是不是太累呢？先休息下吧！");
                    getProxy().outbakfun();
                }
            }                
        }
       

        /**
         * 座位重新排 
         * @param px 0不需要移动位子 <0 左边移动 >0右边移动
         */
        private resetAllXY(px:number=0):void{       
            for(var i: number = 0;i < 9;i++) {                  
                this.allItem[i].resetxy(px);
                this.allmoney[i].resetxy();
            }
             this.zhuangimg.resetxy();
        }
        

        public updateInfoTip(labelvo:appvos.UserLabelVO):void{
            for(var i: number = 0;i < 9;i++) {
                if(this.allItem[i] && this.allItem[i].playvo && this.allItem[i].playvo.roleId==labelvo.userId){
                    this.allItem[i].showLabeEvent(labelvo);
                    this.allItem[i].showHead();
                }              
            }
        } 
        
  
        /**设置筹码数量 */        
        public showBetNum(seatid: number, betNum: number): void{
             var money = this.allmoney[seatid];
             if (isNaN(betNum) || betNum == 0 || betNum == null) {
                this.setChildVisable(money,false,this.allitemsGroup);
            }else {              
                this.setChildVisable(money,true,this.allitemsGroup,0);
                money.setMoney(betNum);
            }
        }
        private sendtime: number = 0;
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            super.touchBindButtonHandler(clickTarget);
            switch(clickTarget){         
                case this.btndashang://打赏按钮
                    //      if (DEBUG) {
                    //     // getProxy().isLive = !getProxy().isLive;
                    //     // this.checkLive();
                        
                    //   __PVO().i(1, 0,5).to(app.NetAction.GLXY_MESSAGEVO_REQ_GUESS_CARD);
                    //          return;
                    //    }
                    if (getProxy().mySeat > -1) {
                        var time: number = egret.getTimer();
                        if (time - this.sendtime < 100)
                            return;
                        this.sendtime = time;
                        var mess: string = "CHAT_" + (301 + Math.floor(Math.random() * 10));
                        __PVO().i(getProxy().mySeat, getProxy().dashangchar).s(mess).to(app.NetAction.MATCH_SEND_GIFT);
                        mc2sdk.event(mc2sdk.EVENT_TYPE.PLAYCARD_DILA);
                    } else tip.popSysCenterTip("您没有坐下，无法打赏", tip.TIPS_TYPE.TIPS_WARNING);
                    break;
                    
                case this._btn_zidongqipai:
                    mammon.getProxy()._zidongqipai =!mammon.getProxy()._zidongqipai;
                    if(mammon.getProxy()._zidongqipai){
                        this._btn_zidongqipai.label = "取消自动";
                    }else{
                        this._btn_zidongqipai.label = "自动弃牌";
                    }
             }
        }

        /*显示牌型提示*/
        public showTip():void{
            if(this.tipview==null){
               this.tipview = new PlayCardTipComp(); 
            }
            this.mainview.addChild(this.tipview);
            this.tipview.show();
        }

       public timeoutAlertTime: number;
        /***显示升盲 */
        public timeoutAlert(timeout: number): void{
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
        }
        private alertUpBB(vo: appvos.MatchBlindsVO, index: number): void{
            var mess: string = "";
            if (vo.antiBlinds > 0)
                mess = " ,前注：" + vo.antiBlinds;   
            tip.popSysCenterTip("下局盲注将升至：" + FormatUtils.wan(vo.smallBlinds) + "/" + FormatUtils.wan(vo.bigBlinds)+mess);
            var blinds = match.getProxy().currentMatchVO.blinds;
            vo = blinds[index + 1];
           
            if (vo) this.intervalalert(vo.time , vo, index + 1);
               // this.timeoutAlertTime = egret.setTimeout(this.alertUpBB, this, vo.time * 1000, vo, index + 1);
        }
        private bettime: number;
        private intervalalert(time:number,vo: appvos.MatchBlindsVO, index: number): void{
            match.getProxy().currentMatchVO.blindsIndex = index;
            egret.clearInterval(this.timeoutAlertTime);
            this.bettime = time;
            this.playComp.setLeftTime(this.bettime);
            this.timeoutAlertTime = egret.setInterval(this.setLeftTime,this,1000,vo,index);
        }
        private setLeftTime(vo: appvos.MatchBlindsVO, index: number): void{
            if (this.bettime >= 0) {
                
                this.playComp.setLeftTime(this.bettime);
                this.bettime--;
            } else {
                egret.clearInterval(this.timeoutAlertTime);
                this.alertUpBB(vo,index)
            }
            
        }
        /***显示等待玩家(isfirst进来的时候没在打牌) */
        public showWait(isfrist: boolean = false): void{
              
            var num: number = 0;
            var talbevo = getTableVO();
            if (talbevo != null) {
                 if (!this.effect.isPlayover&&talbevo.tableStatus==0) {   
              
                    for (var i: number = 0; i < 9; i++) {
                        if (this.allItem[i].playvo != null) {
                            num++;
                            if (num > 1) break;
                        }
                    }
                }
                 getProxy().checkOUT(num < 2 && talbevo.tableStatus == 0 && getProxy().isPlayCard && room.getProxy().current &&!room.getProxy().isNormal);
            }
           
             if (talbevo==null||((isfrist||num < 2) && !this.effect.isPlayover && talbevo.tableStatus == 0)) {
                 if(talbevo == null || getProxy().mySeat > -1 || (room.getProxy().current && room.getProxy().isAntiCheating)) {
                     this.addWait();
                } else if (this.wait != null)
                     this.wait.removeFromParent();
                // if (talbevo != null) {
                //      for(var i: number = 0;i < 5;i++) {              
                //         this.setChildVisable(this.allCard[i],false,this.tableGroup);
                //     }
                //     for (var i: number = 0, len: number = this.allItem.length; i < len; i++) {   
                //         var item = this.allItem[i];
                //         if (item.playvo) {
                //             item.restPlay();
                //             item.playvo.reset();
                //             item.playover();
                //         }
                //     } 
                //     talbevo.totalBet = 0; 
                //     this.sidepot.clearAll();
                // }              
            }else if (this.wait != null&& talbevo.tableStatus!=0)
                this.wait.removeFromParent();
             if (this.wait != null && this.wait.parent) {
                 var type: number;
                 if (room.getProxy().currentType == room.TYPE.MTT) {
                     if (num < 2)
                         type = 2;
                     else type = 3;
                 }  else if (talbevo == null || num < 2)
                     type = 1;
                 else type = 0;
                 this.wait.showType(type);    
                 if (room.getProxy().currentType == room.TYPE.SNG) {
                     this.sendNotification(app.constant.AppMediatorConst.UPDATE_MATCH_NUMPLAYERS);
                 }
                 for(var i: number = 0;i < 5;i++) {              
                    this.setChildVisable(this.allCard[i],false,this.allcardsGroup);
                }
                for (var i: number = 0, len: number = this.allItem.length; i < len; i++) {   
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
        }
        public addWait(): void{
             if (this.wait == null) {
                this.wait = new WaitComp();
             }
             this.tableGroup.addChild(this.wait);
        }
        private buyItem:PlayCardsItemComp;
        /**购买保险 */
        public showSafe(data: appvos.ParamVO): void{
          
            if (data.intValues[0] == -1) {//没触发保险
                this.effect.showMess(605, 95, "当前反杀牌数＞14或平手，不激活保险！", this.effect.fapaimv.parent, "left");
                return;
            }
           else if (!this.isVideo()&&  data.intValues[0] == getProxy().mySeat) {
                 getProxy().buySafe = 1;               
                this.effect.tweenHideWnd();
            } else {
               
                getProxy().buySafe = 2;
                // this.addWait();
                // this.wait.showType(4);//4等待其他用户购买保险中
                // this.wait.bgrect.visible = true;
                if (this.buyItem && this.buyItem.sendMess)
                    this.buyItem.sendMess.close();
                this.buyItem = this.allItem[data.intValues[0]];
                this.effect.showItemMess(this.buyItem, this.buyItem.playvo.name + "购买保险中");
                if( this.buyItem.sendMess)
                    this.buyItem.sendMess.clearTimeout();
            }
      
        if (this.safecomp == null)
             this.safecomp = new PlaycardSafeComp();
             this.addChild(this.safecomp);
             this.safecomp.show(data);
        }
        public hideSafe(): void{
              if (this.buyItem && this.buyItem.sendMess)
                this.buyItem.sendMess.close();
              this.buyItem = null;
            getProxy().buySafe = 0;
            if (this.safecomp != null)
                this.safecomp.removeFromParent(); 
            if (this.wait)
                this.wait.removeFromParent();  
             this.effect.tweenShowWnd();
        }
        /**在线人数量 */
        public getPlayerNum(): number{
            var num: number = 0;
            for (var i: number = 0; i < 9; i++) {
                 if (this.allItem[i].playvo != null) {
                     num++;         
                }
            }
            return num;
        }
        /**移除所有人 显示等待 */
         public removeAllItem(): void{
             var vo = getTableVO()
             if ( vo!= null) {
                 vo.tableStatus = 0;
                 if(vo.whoplay > -1)
                     this.allItem[vo.whoplay].removeCD();
             }     
             for (var i: number = 0, len: number = this.allItem.length; i < len; i++) {   
                 var item = this.allItem[i];
                 item.setData(null);
                 item.visible = false;
                 this.setChildVisable(this.allmoney[i],false,this.allitemsGroup); 
             } 
             this.checkBanker();    
             this.showWait();
        }

        cancelHuntMC(){
            for (var i = 0; i < this.allItem.length; i++) {
                this.allItem[i].cancelMC();
            }
        }
        
        //  openvideo() {

        //      var myPlayer = nep.neplayer("my-video", [], [this.ready]);
        //      myPlayer.setDataSource("http://v03a795c4.live.126.net/live/7ce23cdde59f4c08804ed22c6f282d6c.flv");
        //  }
        //  ready() {
            
        // }
        /**一些数据清理 普通房折线图 好友状态 */
        someDataClean() {
            user.getProxy().friendStatus = user.ROOM_TYPE.NULL;
             __SEND_NOTIFICATION(app.NetAction.REQ_CHANGE_USER_STATUS, [user.getProxy().friendStatus, -1]);
             getProxy().lineHistory = [];
             getProxy().lineHistoryFixed = [];
             playcards.getProxy().cgNumber = null;
             if (room.getProxy().currentType == room.TYPE.FREE)
                this.sendNotification(app.NetAction.TOOL_RILVER, AppConst.GAME_ID_FREE);
        }
      
        public dispose():void{
            super.dispose();
            getProxy().removeTextureAtlas();
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
                for(var i: number = 0;i < 9;i++) {
                    this.allItem[i].dispose();
                }    
            }
             
        }
	}
}
