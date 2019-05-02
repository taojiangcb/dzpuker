var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var friend;
(function (friend) {
    var TYPE;
    (function (TYPE) {
        TYPE[TYPE["FRIEND"] = 0] = "FRIEND";
        TYPE[TYPE["FRIEND_ADD"] = 1] = "FRIEND_ADD";
        TYPE[TYPE["DEALER_FOLLOW"] = 2] = "DEALER_FOLLOW";
    })(TYPE = friend.TYPE || (friend.TYPE = {}));
    var FriendUIMoudle = (function (_super) {
        __extends(FriendUIMoudle, _super);
        function FriendUIMoudle() {
            var _this = _super.call(this) || this;
            _this.openType = TYPE.FRIEND;
            _this.horizontalCenter = 0;
            _this.verticalCenter = -20;
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            _this.skinName = "FriendUIMoudleSkin";
            return _this;
        }
        FriendUIMoudle.prototype.onComplete = function () {
            __REGISTER_MEDIATOR(friend.FriendUIMediator, this);
            if (this.uiOpenData)
                this.openType = this.uiOpenData;
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
            this.friendList.itemRenderer = friend.FriendLabel;
            this.dealerFollowList.itemRenderer = friend.DealerFollowLabel;
        };
        FriendUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
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
                    mc2sdk.event(50029 /* FRIEND_MAIL */);
                    break;
                case this.faceAddButton:
                    __OPEN_PRE_MOUDLE(AppReg.APP_FRIEND_FACEADD);
                    mc2sdk.event(50026 /* FRIEND_FACE */);
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
                    }
                    else if (searchId == user.getProxy().svrRoleId) {
                        tip.popSysCenterTip("无法查找自己");
                        return;
                    }
                    __SEND_NOTIFICATION(app.NetAction.REQ_SEARCH_USER_FRIEND, searchId);
                    mc2sdk.event(50028 /* FRIEND_SEARCH */);
                case this.refreshbtn:
                    __PVO().to(app.NetAction.REQ_DEALER_FOCUS_LIST);
                    break;
                case this.moredealerbtn:
                    __PVO().to(app.NetAction.REQ_DEALER_LIST);
                    break;
            }
        };
        FriendUIMoudle.prototype.opening = function () {
            // __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND);
        };
        FriendUIMoudle.prototype.changeType = function (type) {
            if (this.type == type)
                return;
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
        };
        FriendUIMoudle.prototype.changeButton = function (type) {
            var isChoosen;
            isChoosen = type == TYPE.FRIEND;
            this.leftButtonBg.source = isChoosen ? "btn_tab_right_2_png" : "btn_tab_right_1_png";
            this.leftButtonWord.source = isChoosen ? "tab_haoyou_zr_1_png" : "tab_haoyou_zr_0_png";
            this.leftButtonWord.verticalCenter = isChoosen ? 0 : 0;
            isChoosen = type == TYPE.FRIEND_ADD;
            this.rightButtonBg.source = isChoosen ? "btn_tab_left_2_png" : "btn_tab_left_1_png";
            this.rightButtonWord.source = isChoosen ? "tab_tianjia_zr_1_png" : "tab_tianjia_zr_0_png";
            this.rightButtonWord.verticalCenter = isChoosen ? 0 : 0;
            isChoosen = type == TYPE.DEALER_FOLLOW;
            this.midButtonBg.source = isChoosen ? "btn_tab_center_2_png" : "btn_tab_center_1_png";
            this.midButtonWord.source = isChoosen ? "tab_guanzhu_zr_1_png" : "tab_guanzhu_zr_0_png";
            this.midButtonWord.verticalCenter = isChoosen ? 0 : 0;
        };
        FriendUIMoudle.prototype.initFriendList = function (data) {
            user.getProxy().friendNum = data.length;
            this.numberlabel.text = data.length + "/" + user.getProxy().MAXFRIENDNUM;
            this.tipLabel.visible = data.length == 0 ? true : false;
            for (var i = 0; i < data.length; i++) {
                data[i]["type"] = friend.LABEL_TYPE.FRIEND;
            }
            data.sort(function (a, b) {
                return b.status - a.status;
            });
            var dataProvider = new eui.ArrayCollection(data);
            this.friendList.dataProvider = dataProvider;
            this.friendList.itemRenderer = friend.FriendLabel;
        };
        FriendUIMoudle.prototype.getSearchResult = function (data) {
            var dataProvider;
            if (data) {
                data["type"] = friend.LABEL_TYPE.ADD;
                dataProvider = new eui.ArrayCollection([data]);
            }
            else {
                dataProvider = new eui.ArrayCollection([]);
                tip.popSysCenterTip("无所查找用户");
            }
            this.friendSearchList.dataProvider = dataProvider;
            this.friendSearchList.itemRenderer = friend.FriendLabel;
        };
        FriendUIMoudle.prototype.vipsit = function () {
            user.getProxy().vipSit(user.getProxy().friendRoomid.toString());
        };
        FriendUIMoudle.prototype.updateDealerFollowGroup = function (dataArray) {
            this.dealerFollowTipLabel.visible = dataArray.length == 0 ? true : false;
            this.followDealerList = dataArray;
            // for (var i = 0; i < dataArray.length; i++) {
            //     dataArray[i]["type"] = DEALERLABEL_TYPE.FOLLOW;
            //     if (dataArray[i].userid != user.getProxy().svrRoleId) this.followDealerList.push(dataArray[i]);
            // }
            this.followDealerList = this.sortDealerInfoData(this.followDealerList);
            this.dealerFollowList.dataProvider = new eui.ArrayCollection(this.followDealerList);
        };
        FriendUIMoudle.prototype.openDealerOnlineList = function (dataArray) {
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
            var newDataArray = [];
            for (var i = 0; i < dataArray.length; i++) {
                if (this.isNotInFollowList(dataArray[i]))
                    newDataArray.push(dataArray[i]);
            }
            newDataArray = this.sortDealerInfoData(newDataArray);
            __OPEN_MOUDLE(AppReg.APP_DEALERONLINELIST, newDataArray);
        };
        FriendUIMoudle.prototype.sortDealerInfoData = function (data) {
            data.sort(function (a, b) {
                if (a.online != b.online) {
                    return b.online - a.online;
                }
                else {
                    return a.userid - b.userid;
                }
            });
            return data;
        };
        FriendUIMoudle.prototype.isNotInFollowList = function (data) {
            for (var i = 0; i < this.followDealerList.length; i++) {
                if (data.userid == this.followDealerList[i].userid)
                    return false;
            }
            return true;
        };
        FriendUIMoudle.prototype.dispose = function () {
            __REMOVE_MEDIATOR(friend.FriendUIMediator);
            _super.prototype.dispose.call(this);
        };
        return FriendUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    friend.FriendUIMoudle = FriendUIMoudle;
    __reflect(FriendUIMoudle.prototype, "friend.FriendUIMoudle");
})(friend || (friend = {}));
//# sourceMappingURL=FriendUIMoudle.js.map