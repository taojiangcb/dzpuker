module friend {
    export enum TYPE {
        FRIEND,
        FRIEND_ADD,
        DEALER_FOLLOW
    }
    export class FriendUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private openType: TYPE = TYPE.FRIEND;
        private type: TYPE;
        private friendScroller: eui.Scroller;
        private friendAddGroup: eui.Group; //添加好友组
        private leftButton: eui.Group;
        private rightButton: eui.Group;
        private leftButtonBg: eui.Image;
        private leftButtonWord: eui.Image;
        private rightButtonBg: eui.Image;
        private rightButtonWord: eui.Image;
        private friendList: eui.List; // 好友列表
        private friendSearchList: eui.List;
        private mailButton: eui.Group;
        private faceAddButton: eui.Group;
        private contactButton: eui.Group;
        private wechatButton: eui.Group;
        private myIdLabel: eui.Label;
        private searchButton: eui.Button;
        private searchIdText: eui.EditableText;
        private friendGroup: eui.Group; // 我的好友组
        private tipLabel: eui.Label;

        midButton: eui.Group;
        midButtonBg: eui.Image;
        midButtonWord: eui.Image;
        dealerFollowGroup: eui.Group;
        dealerFollowList: eui.List; // 荷官列表
        dealerFollowTipLabel: eui.Label;
        moredealerbtn: eui.Group;
        refreshbtn: eui.Group;
        followDealerList: any[];
        numberlabel: eui.Label;

        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = -20;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
            this.skinName = "FriendUIMoudleSkin";
        }
        onComplete() {
            __REGISTER_MEDIATOR(FriendUIMediator,this);
            if (this.uiOpenData) this.openType = this.uiOpenData;
            this.changeType(this.openType);
            /**红点 */
            var friendMailTipData = tip.getTipData(AppConst.COUNT_SUB_TAG.FRIEND_MOUDLE_MAIL);
            var friendMailTipUI = new tip.CountTipUI(friendMailTipData);
            friendMailTipUI.x = 25;
            friendMailTipUI.bottom = 25;
            this.mailButton.addChild(friendMailTipUI);
            this.myIdLabel.text = user.getProxy().svrRoleId.toString();
            this.searchIdText.prompt = "搜索ID号添加好友";
            this.bindButton(this.leftButton, false);
            this.bindButton(this.rightButton, false);
            this.bindButton(this.midButton, false);
            this.bindButton(this.mailButton);
            this.bindButton(this.faceAddButton);
            this.bindButton(this.contactButton);
            this.bindButton(this.wechatButton);
            this.bindButton(this.searchButton);
            this.bindButton(this.moredealerbtn);
            this.bindButton(this.refreshbtn);

            this.friendList.itemRenderer = FriendLabel;
            this.dealerFollowList.itemRenderer = DealerFollowLabel;
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            var data = parseInt(this.searchIdText.text);
            switch (clickTarget) {
                case this.leftButton:
                    this.changeType(TYPE.FRIEND);
                    break;
                case this.rightButton:
                    this.changeType(TYPE.FRIEND_ADD);
                    break;
                case this.midButton:
                    this.changeType(TYPE.DEALER_FOLLOW);
                    break;
                case this.mailButton:
                    __OPEN_PRE_MOUDLE(AppReg.APP_FRIEND_MAIL);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.FRIEND_MAIL);
                    break;
                case this.faceAddButton:
                    __OPEN_PRE_MOUDLE(AppReg.APP_FRIEND_FACEADD);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.FRIEND_FACE);
                    this.close();
                    break;
                case this.contactButton:
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                    break;
                case this.wechatButton:
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                    break;
                case this.searchButton:
                    var searchId = parseInt(this.searchIdText.text);
                    if (isNaN(searchId)) {
                        tip.popSysCenterTip("输入ID号格式错误");
                        return;
                    } else if (searchId == user.getProxy().svrRoleId) {
                        tip.popSysCenterTip("无法查找自己");
                        return;
                    }
                    __SEND_NOTIFICATION(app.NetAction.REQ_SEARCH_USER_FRIEND,searchId);
                    mc2sdk.event(mc2sdk.EVENT_TYPE.FRIEND_SEARCH);
                case this.refreshbtn:
                    __PVO().to(app.NetAction.REQ_DEALER_FOCUS_LIST);
                    break;
                case this.moredealerbtn:
                    __PVO().to(app.NetAction.REQ_DEALER_LIST);
                    break;
            }
        }
        opening() {
            // __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND);
        }
        changeType(type: TYPE) {
            if (this.type == type) return;
            this.type = type;
            switch (type) {
                case TYPE.FRIEND:
                    this.friendAddGroup.visible = false;
                    this.dealerFollowGroup.visible = false;
                    this.friendGroup.visible = true;
                    __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND);
                    break;
                case TYPE.FRIEND_ADD:
                    this.friendGroup.visible = false;
                    this.dealerFollowGroup.visible = false;
                    this.friendAddGroup.visible = true;
                    break;
                case TYPE.DEALER_FOLLOW:
                    this.friendGroup.visible = false;
                    this.friendAddGroup.visible = false;
                    this.dealerFollowGroup.visible = true;
                    __PVO().to(app.NetAction.REQ_DEALER_FOCUS_LIST);
                    break;
            }
            this.changeButton(type);
        }
        changeButton(type: TYPE) {
            var isChoosen: boolean;
            isChoosen = type == TYPE.FRIEND;
            this.leftButtonBg.source = isChoosen? "btn_tab_right_2_png": "btn_tab_right_1_png";
            this.leftButtonWord.source = isChoosen? "tab_haoyou_zr_1_png": "tab_haoyou_zr_0_png";
            this.leftButtonWord.verticalCenter = isChoosen? 0: 0;
            isChoosen = type == TYPE.FRIEND_ADD;
            this.rightButtonBg.source = isChoosen? "btn_tab_left_2_png": "btn_tab_left_1_png";
            this.rightButtonWord.source = isChoosen? "tab_tianjia_zr_1_png": "tab_tianjia_zr_0_png";
            this.rightButtonWord.verticalCenter = isChoosen? 0: 0;
            isChoosen = type == TYPE.DEALER_FOLLOW;
            this.midButtonBg.source = isChoosen? "btn_tab_center_2_png": "btn_tab_center_1_png";
            this.midButtonWord.source = isChoosen? "tab_guanzhu_zr_1_png": "tab_guanzhu_zr_0_png";
            this.midButtonWord.verticalCenter = isChoosen? 0: 0;
        }
        initFriendList(data: any[]) {
            user.getProxy().friendNum = data.length;
            this.numberlabel.text = data.length + "/" + user.getProxy().MAXFRIENDNUM;
            this.tipLabel.visible = data.length == 0? true: false;
            for (var i = 0; i < data.length; i++) {
                data[i]["type"] = LABEL_TYPE.FRIEND;
            }
            data.sort(function(a,b) {
                return b.status - a.status;
            })
            var dataProvider = new eui.ArrayCollection(data);
            this.friendList.dataProvider = dataProvider;
            this.friendList.itemRenderer = FriendLabel;
        }
        getSearchResult(data: any) {
            var dataProvider: any;
            if (data) {
                data["type"] = LABEL_TYPE.ADD;
                dataProvider = new eui.ArrayCollection([data]);
            }else {
                dataProvider = new eui.ArrayCollection([]);
                tip.popSysCenterTip("无所查找用户");
            }
            this.friendSearchList.dataProvider = dataProvider;
            this.friendSearchList.itemRenderer = FriendLabel;
        }
        vipsit() {
            user.getProxy().vipSit(user.getProxy().friendRoomid.toString());
        }
        updateDealerFollowGroup(dataArray: any[]) {
            this.dealerFollowTipLabel.visible = dataArray.length == 0? true: false;
            this.followDealerList = dataArray;
            // for (var i = 0; i < dataArray.length; i++) {
            //     dataArray[i]["type"] = DEALERLABEL_TYPE.FOLLOW;
            //     if (dataArray[i].userid != user.getProxy().svrRoleId) this.followDealerList.push(dataArray[i]);
            // }
            this.followDealerList = this.sortDealerInfoData(this.followDealerList);
            this.dealerFollowList.dataProvider = new eui.ArrayCollection(this.followDealerList);
        }
        openDealerOnlineList(dataArray: any[]) {
            // var dealerInfo: appvos.DealerInfoVO = new appvos.DealerInfoVO();
            // dealerInfo.faceid = "";
            // dealerInfo.name = "大明哥";
            // dealerInfo.userid = 4294967499;
            // dealerInfo.online = 0;
            // dealerInfo.notice = "大明哥扫六合";
            // var dealerInfo1: appvos.DealerInfoVO = new appvos.DealerInfoVO();
            // dealerInfo1.faceid = "";
            // dealerInfo1.name = "大明哥1";
            // dealerInfo1.userid = 4294967499;
            // dealerInfo1.online = 1;
            // dealerInfo1.notice = "大明哥扫六合";
            // var a = [dealerInfo, dealerInfo1];
            // a = this.sortDealerInfoData(a);
            // __OPEN_MOUDLE(AppReg.APP_DEALERONLINELIST, a);
            var newDataArray: any[] = [];
            for (var i = 0; i < dataArray.length; i++) {
                if (this.isNotInFollowList(dataArray[i])) newDataArray.push(dataArray[i]);
            }
            newDataArray = this.sortDealerInfoData(newDataArray);
            __OPEN_MOUDLE(AppReg.APP_DEALERONLINELIST, newDataArray);
        }
        sortDealerInfoData(data: any[]): any[] {
            data.sort((a, b)=>{
                if (a.online != b.online) {
                    return b.online - a.online;
                } else {
                    return a.userid - b.userid;
                }
            });
            return data;
        }
        isNotInFollowList(data: any): boolean {
            for (var i = 0; i < this.followDealerList.length; i++) {
                if (data.userid == this.followDealerList[i].userid) return false;
            }
            return true;
        }
        public dispose(): void {
            __REMOVE_MEDIATOR(FriendUIMediator);
            super.dispose();
        }
    }
}