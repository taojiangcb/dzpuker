module myInfo {

    /**
     *打牌中的玩家信息
     * @author 
     *
     */
    export class PokerInfoUIMoudle extends app.base.BaseSceneUIMoudleComponent {

        private group_wrap : eui.Group; //最外层的group 用来适用不同界面的高度

        public bgimage: eui.Rect;

        private tabButton1: eui.ToggleButton;
        private tabButton2: eui.ToggleButton;
        private tarbar: uicomps.ButtonGroup;

        private infoType1: MyInfoComp1;
        private infoType2: MyInfoComp2;
        private currentCom: any;

        private usID: eui.Label;

        private mainGroup: eui.Group;

        //        private lv:eui.Label;

        /**名字性别**/
        private iconInfo1: eui.Component;
        /**筹码**/
        private iconInfo2: eui.Component;
        /**VIP 剩余时间**/
        private iconInfo3: eui.Component;

        /**举报,数据分析**/
        // private btnRe1: eui.Group;
        private complaintButton: eui.Button; //举报按钮
        /**添加删除好友 */
        // private btnRe2: eui.Group;
        private buddyButton: eui.Group; //加好友按钮

        /**双黄举报**/
        private bottomGroup: eui.Group;
        private friendGroup: eui.Group;

        /** 标签相关 */
        // private infoTip: myInfo.InfoTip;
        private tipImg:eui.Image;// 小图标(头像边上的标签)
        private btnBianjibiaoqian: eui.Image;
        /** 实名认证 */
        private btnDianjiyanzheng:eui.Image;//点击验证
        private imgYiyanzheng:eui.Image;//已验证


        public roleVO: appvos.SeeInfoVO;
        private playGameData: cyvos.PlayerGameData

        private txtTip: eui.Label;

        private fristList: eui.List

        private avtar: uicomps.AvatarImage;

        private playVO: appvos.UserInfoVO;

        private restoreTimeout: number;


        dataButton:eui.Button;
        recordButton:eui.Button;
        achieveGroup:eui.Group;
        dataButton2:eui.Group;
        magicDataGroup:eui.Group;
        tipLabel:eui.Label;
        fristScroller:eui.Scroller;

        public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            // this.skinName = "resource/app_skin/pokerInfo/PokerInfoUIMoudleSkin.exml";
            this.skinName = "MyInfoUIMoudleSkin";
        }

        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            app.mvc.AppFacade.getInstance().registerMediator(new PokerInfoUIMoudMediato(this));

            // this.bindButton(this.bgimage);
            this.infoType1.bottom = 20; //好友信息右侧下方没有信息
            this.recordButton.visible = false;
            this.dataButton.visible = false;
            this.btnBianjibiaoqian.visible = true;
            this.achieveGroup.visible = false;
            this.dataButton2.visible = false;

            // this.bindButton(this.btnRe1);
            // this.bindButton(this.btnRe2);
            // this.txtTip.visible = false;

            // this.btnBianjibiaoqian.visible = true;
            // this.btnDianjiyanzheng.visible = false;
            // this.imgYiyanzheng.visible = false;

            // this.bindButton(this.btnDianjiyanzheng);
            this.bindButton(this.btnBianjibiaoqian);
            this.bindButton(this.complaintButton);
            this.bindButton(this.buddyButton);
            this.bindButton(this.dataButton2);

            this.fristList.addEventListener(egret.Event.CHANGE, this.itemclick, this);
        }
        private sendtime: number = 0;
        private itemclick(): void {
            var mySeat = this.roleVO.mySeatId;

            if (mySeat == -1) {
                tip.popSysCenterTip("您没有坐下，无法发送表情", tip.TIPS_TYPE.TIPS_WARNING);
                return;
            }

            if (this.roleVO.roleId == user.getProxy().svrRoleId) {
                if (this.roleVO.type == -3) {
                    happy.getProxy().sendChat(this.fristList.selectedItem.label, mySeat, -1, this.fristList.selectedItem.char);
                } else playcards.getProxy().sendChat(this.fristList.selectedItem.label, mySeat, -1, this.fristList.selectedItem.char);
                this.close();
            } else {
                var time: number = egret.getTimer();
                if (time - this.sendtime > 100) {
                    this.sendtime = time;
                    if (this.roleVO.type == -3) {
                        happy.getProxy().sendChat(this.fristList.selectedItem.label, mySeat, this.roleVO.seatId, this.fristList.selectedItem.char, __SET_INT64(1));
                    } else playcards.getProxy().sendChat(this.fristList.selectedItem.label, mySeat, this.roleVO.seatId, this.fristList.selectedItem.char, __SET_INT64(1));
                }
                // 半隐，1秒后关闭。
                // this.mainGroup.alpha = 0;
                // this.bgimage.alpha = 0;
                // this.btnRe1.visible = false;
                // this.txtTip.alpha = 0;
                if(this.parent!=null && this.fristList.parent != this.parent) {
                    var rect = this.fristList.getTransformedBounds(this.parent);
                    this.parent.addChild(this.fristList);
                    this.fristList.x = rect.x + 8;
                    this.fristList.y = rect.y + 23;
                    this.removeFromParent();
                }
                if (this.restoreTimeout != 0) {
                    egret.clearTimeout(this.restoreTimeout);
                }
                this.restoreTimeout = egret.setTimeout(this.restoreWindow, this, 1000);
            }
            this.fristList.selectedIndex = -1;
        }


        juLab: eui.Image;
        xqLab: eui.Image;
        private restoreWindow(): void {
            // this.mainGroup.alpha = 1;
            // this.btnRe1.visible = true;
            // this.txtTip.alpha = 1;
            // this.bgimage.alpha = 0.2;
            this.fristList.removeFromParent();
            this.restoreTimeout = 0;
            this.close(); //魔法表情发好直接关闭界面 by zhj
        }

        public opening(): void {
            if (this.uiOpenData) {
                this.roleVO = this.uiOpenData;
                //__OPEN_MOUDLE(AppReg.PRELOAD);
                if (!playcards.getProxy().isSingle)
                    __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [this.roleVO.roleId]);
                if (this.roleVO.roleId != user.getProxy().svrRoleId)
                    __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND);
            }
            this.showEvent();
            if (this.roleVO == null || this.bgimage == null) return;

            // this.sendNotification(app.NetAction.TOOL_RILVER,this.roleVO.roleId);//获取平台银两
        }
        public showEvent(pvo: any = null): void {

            this.magicDataGroup = this.infoType1["magicDataGroup"];

            if (this.roleVO.type == -2) {
                this.verticalCenter = -20;
                // this.bottomGroup.visible = false;
                // this.friendGroup.visible = true;
                // this.bindButton(this.friendGroup);
            }
            // __CLOSE_MOUDLE(AppReg.PRELOAD);
            if (pvo) this.playVO = pvo;

            this.playGameData = user.getProxy().searchPlayerGameData(this.roleVO.roleId);

            this.avtar.source = user.getProxy().getHeadStr(Number(this.roleVO.avatarID));
            this.currentCom = this.infoType1;
            this.currentCom.setData(this.roleVO, this.playVO);
            this.infoType2.setData(this.roleVO, this.playVO);
            if (this.roleVO.roleId == user.getProxy().svrRoleId) {
                this.usID.text = "ID: " + this.roleVO.roleId;
                // this.juLab.visible = false;
                // this.xqLab.visible = true;
            } else {
                this.usID.text = " "
                // this.juLab.visible = true;
                // this.xqLab.visible = false;
            }


            //          this.lv.text = "Lv.0"//this.roleVO.lv+"";
            if (cyvos.PLAYER_SEX.FEMALE == this.roleVO.sex) {
                this.iconInfo1["icon"].source = "icon_info_sex0_png";
            } else {
                this.iconInfo1["icon"].source = "icon_info_sex1_png";
            }

            this.iconInfo1["label"].text = this.roleVO.name;

            this.iconInfo2["icon"].source = room.getProxy().currentType == room.TYPE.FREE? "icon_free_chouma_png": "icon_caoma_png";
            var caomaNum = (this.roleVO.nowBet + this.roleVO.totalBet)
            if (caomaNum < 0) {
                caomaNum = 0;
            }
            if (!isNaN(caomaNum) && caomaNum !== undefined) {
                this.iconInfo2["label"].text = this.iconInfo2["label"].text = FormatUtils.spot(caomaNum); + "";
            } else {
                this.iconInfo2["label"].text = "保密";
            }
            // if (room.getProxy().currentType == room.TYPE.FREE && user.getProxy().freeGold) {
            //     this.iconInfo2["label"].text = user.getProxy().freeGold + "";
            // }


            this.iconInfo3["icon"].source = "icon_vip_png";
            var nextTime = 0//this.roleVO.vipTime - app.SystemTimer.getServerTime();
            if (nextTime < 0) {
                nextTime = 0
            }
            this.iconInfo3["label"].text = "未开放"//gameabc.ResourceBundleUtil.getMessage("RESIDUAL_TIME")+ DateUtils.formatTime5(nextTime,['天','时']);


            // 自己不显示举报按钮 好友按钮
            if (this.roleVO.roleId == user.getProxy().svrRoleId) {
                
                //显示表情列表，可以快捷发送表情
                this.fristScroller.x = 281;
                this.fristScroller.y = 335;
                this.fristList.itemRenderer = ExpressionFaceItemSmall;
                this.fristList.dataProvider = new eui.ArrayCollection(playcards.getProxy().facelistdata.concat());
                
                // this.infoType1.bottom = 100; //自己在牌局中是可以发送情绪，留出位置
                this.magicDataGroup.verticalCenter = 0;
                this.tipLabel.visible = false;
                // this.txtTip.text = gameabc.ResourceBundleUtil.getMessage("POKER_MY_INFO_TIPS2");

                this.complaintButton.visible = false;
                this.buddyButton.visible = false;
                this.dataButton2.visible = true;

            } else {

                this.dataButton2.visible = false;
                this.buddyButton.visible = true;
                if (this.roleVO.type == -3) {
                    this.complaintButton.visible = false;
                    this.buddyButton.x = 65;
                } else {
                    this.complaintButton.visible = true;
                    this.buddyButton.x = 135;
                    this.magicDataGroup.verticalCenter = 20;
                }


                if(this.roleVO.type == -2) {// 查看好友信息
                    this.fristList.visible = false;
                    this.complaintButton.visible = false;
                    this.buddyButton.visible = true;
                    this.buddyButton.height = 60;
                    this.buddyButton.width = 165;
                    this.buddyButton.x = 47;
                    this.magicDataGroup.verticalCenter = 20;
                    
                    // this.magicDataGroup.verticalCenter = -20;
                } else {
                    if (this.roleVO.roleId != user.getProxy().svrRoleId
                    && (room.getProxy().current 
                    && (room.getProxy().current.type == room.TYPE.SNG
                    || room.getProxy().current.type == room.TYPE.MTT
                    || room.getProxy().current.type == room.TYPE.FREE))) {
                        this.fristList.visible = false;
                    } else {
                        this.fristList.visible = true;
                        this.fristScroller.x = 318;
                        this.fristScroller.bottom = 10;
                        this.group_wrap.height = 450;
                        this.fristScroller.height = 85;
                        this.magicDataGroup.verticalCenter = 0;
                        this.fristList.itemRenderer = ExpressionListItem;
                        this.fristList.dataProvider = new eui.ArrayCollection(room.getProxy().magiclistdata.concat());
                        this.tipLabel.visible = true;
                        var price = room.getProxy().magiclistdata[0]['charmList'][0];
                        price *= room.getProxy().current.charmList[0];
                        this.tipLabel.text = gameabc.getMessage("MAGIC_USER_TIP",price);
                        // this.magicDataGroup.verticalCenter = -50;
                    }
                }


                // var bb: number = this.roleVO.facecost;
                //   if (playcards.getTableVO() != null) {
                //       bb = playcards.getTableVO().bbBet;
                //   } else if (room.getProxy().current != null)
                //       bb = room.getProxy().current.bigBlinds
                // this.txtTip.text = gameabc.ResourceBundleUtil.getMessage("POKER_MY_INFO_TIPS1", FormatUtils.wan(bb));


            }

            // 这里是显示标签的
            if (this.roleVO.roleId != user.getProxy().svrRoleId) {
                // 别的玩家界面
                // this.btnBianjibiaoqian.visible = true;
                if (this.playVO && this.playVO.label) {
                    if(this.playVO.label && this.playVO.label.labelType > 0 && this.playVO.label.labelType < 5){
                        if(this.playVO.label.labelName){
                            this.tipImg.source = "img_tip_small_green_png"
                        }else{
                            this.setTipSmall(this.playVO.label.labelType)
                        }
                        this.tipImg.visible = true;
                    }else{
                        if(this.playVO.label.labelName){
                            this.tipImg.source = "img_tip_small_green_png"
                            this.tipImg.visible = true; 
                        }else{
                            this.tipImg.visible = false;
                        }
                    }
                }else{
                    this.tipImg.visible = false;
                }
                this.btnDianjiyanzheng.visible = false;
                this.imgYiyanzheng.visible = false;
            }else{
                // 是自己的界面
                // 判断是否认证过，和是否需要认证k
                if(!antiSystem.isRNV()) {
                    this.btnDianjiyanzheng.visible = true;
                    this.imgYiyanzheng.visible = false;
                } else {
                    this.btnDianjiyanzheng.visible = false;
                    this.imgYiyanzheng.visible = true;
                }
                this.btnBianjibiaoqian.visible = false;
                this.tipImg.visible = false;
            }
        }
        private setTipSmall(type:number):void{
            if(type == 1){
                this.tipImg.source = "img_tip_small_blue_png";
            }else if(type == 2){
                this.tipImg.source = "img_tip_small_red_png";
            }else if(type == 3){
                this.tipImg.source = "img_tip_small_gray_png";
            }else if(type == 4){
                this.tipImg.source = "img_tip_small_yellow_png";
            }else{
                this.tipImg.source = "img_tip_small_green_png";
            }
        }
        isFriend: boolean;
        buddyButtonLabel: eui.Image;
        friendNum: number;
        updateFriend(data: any[]) {
            this.friendNum = data.length;
            this.isFriend = false;
            for (var i = 0; i < data.length; i++) {
                if (this.roleVO.roleId == data[i].fid) {
                    this.isFriend = true;
                    break;
                }
            }
            this.buddyButtonLabel.source = this.isFriend? "iw_shanchuhaoyou_png": "iw_jiahaoyou_png";

        }
        addFriend() {
            if (this.friendNum >= user.getProxy().MAXFRIENDNUM) tip.popSysCenterTip("您的好友数已达上限！", tip.TIPS_TYPE.TIPS_WARNING);
            else __SEND_NOTIFICATION(app.NetAction.REQ_ADD_USER_FRIEND_REQUEST, this.roleVO.roleId);
        }
        deleteFriend() {
            tip.Alert.show("是否确认删除好友", null, tip.CONFIRM, 
                function (type: number = tip.YES, isout: number = 0) {
                    if (type == tip.YES) {
                        __SEND_NOTIFICATION(app.NetAction.REQ_ADD_USER_FRIEND_DELETE, this.roleVO.roleId);
                    }
                }, null, this);
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.bgimage:
                    this.clickBackEvent()
                    break;

                case this.tabButton1:
                    this.currentCom.visible = false;
                    this.currentCom = this.infoType1;
                    this.currentCom.visible = true;
                    this.currentCom.setData(this.roleVO, this.playVO);
                    break;
                case this.tabButton2:
                    this.currentCom.visible = false;
                    this.currentCom = this.infoType2;
                    this.currentCom.visible = true;
                    this.currentCom.setData(this.roleVO, this.playVO);
                    break;

                case this.dataButton2:
                    __OPEN_PRE_MOUDLE(AppReg.APP_RECORD,null,[AppReg.APP_POKER_INFO]);
                    break;

                // case this.btnRe1:
                case this.complaintButton:
                    if (this.roleVO.roleId == user.getProxy().svrRoleId) {
                        __OPEN_PRE_MOUDLE(AppReg.APP_RECORD);
                        this.close();
                    } else {
                        var arr = record.getProxy().allRecord
                        if (arr.length > 0) {
                            this.clickBackEvent();
                            record.getProxy().getLocalVideo(arr[0]);
                            if (this.inspectIDisOK(arr[0], this.roleVO)) {
                                tip.popSysCenterTip("该用户未参与您的上一手牌局，无法举报！", tip.TIPS_TYPE.TIPS_WARNING)
                            } else {
                                __OPEN_PRE_MOUDLE(AppReg.APP_FEED, [arr[0], 1, this.roleVO]);
                            }

                        } else {
                            tip.popSysCenterTip("没有牌局记录哦！", tip.TIPS_TYPE.TIPS_WARNING)
                        }
                    }
                    break;
                // case this.btnRe2:
                    // if (this.isFriend) this.deleteFriend();
                    // else this.addFriend();
                    // break;
                case this.buddyButton:
                    if (this.isFriend) {
                        this.deleteFriend();
                        mc2sdk.event(mc2sdk.EVENT_TYPE.DELETE_FRIEND);
                    } else {
                        this.addFriend();
                        mc2sdk.event(mc2sdk.EVENT_TYPE.ADD_FRIEND);
                    }
                    break;
                case this.btnBianjibiaoqian: //编辑标签
                    mc2sdk.event(mc2sdk.EVENT_TYPE.CLICK_OTHER_EDIT_TIP);// 埋点
                    __OPEN_PRE_MOUDLE(AppReg.EDIT_ROLE_TIP, [this.playVO, this.roleVO],[AppReg.APP_POKER_INFO]);
                    // __OPEN_PRE_MOUDLE(AppReg.EDIT_ROLE_TIP, [this.playVO, this.roleVO]);
                    // this.close();
                    break;
                case this.btnDianjiyanzheng:
                    __OPEN_PRE_MOUDLE(AppReg.APP_RELAN_NAME);
                    this.close();
                    break;
            }
        }
        inspectIDisOK(recordVO: appvos.DZRecordVO, opInfo: appvos.SeeInfoVO): boolean {
            var bool: boolean = true
            if (recordVO && recordVO.video && recordVO.video.tablevo && recordVO.video.tablevo.seatPlayerVO) {
                var arr: appvos.SeatPlayerVO[] = recordVO.video.tablevo.seatPlayerVO;
                if (arr) {
                    for (var i: number = 0; i < arr.length; i++) {
                        var info: appvos.SeatPlayerVO = arr[i]
                        if (opInfo && info.roleId == opInfo.roleId) {
                            bool = false;
                        }
                    }
                }
            }
            return bool
        }
        private clickBackEvent(): void {
            this.close();
        }
        private btnCancellHandler(event: egret.TouchEvent): void {

        }
        public dispose(): void {
            if (this.fristList) {
                this.fristList.removeEventListener(egret.Event.CHANGE, this.itemclick, this);
                this.fristList.removeFromParent();
            }

            if (this.restoreTimeout != 0) {
                egret.clearTimeout(this.restoreTimeout);
            }
            app.mvc.AppFacade.getInstance().removeMediator(PokerInfoUIMoudMediato.NAME)
            super.dispose();
        }

    }
}
