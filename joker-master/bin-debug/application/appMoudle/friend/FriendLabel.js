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
    var LABEL_TYPE;
    (function (LABEL_TYPE) {
        LABEL_TYPE[LABEL_TYPE["FRIEND"] = 0] = "FRIEND";
        LABEL_TYPE[LABEL_TYPE["ADD"] = 1] = "ADD";
        LABEL_TYPE[LABEL_TYPE["INVITE"] = 2] = "INVITE";
    })(LABEL_TYPE = friend.LABEL_TYPE || (friend.LABEL_TYPE = {}));
    var FriendLabel = (function (_super) {
        __extends(FriendLabel, _super);
        function FriendLabel() {
            var _this = _super.call(this) || this;
            _this.skinName = "FriendLabelSkin";
            gameabc.BindleButtonUtils.bindClickByTarget(_this.button);
            _this.button.touchEnabled = false;
            return _this;
        }
        FriendLabel.prototype.dataChanged = function () {
            this.fNameLabel.text = this.data.fName;
            if (this.data.faceid)
                this.faceidImage.source = "img_Default_Avatar_" + this.data.faceid + "_png";
            switch (this.data.type) {
                case LABEL_TYPE.FRIEND:
                    this.buttonLabel.source = "img_word_friend_qkk_png";
                    // this.fNameLabel.text = this.data.fid.toString();//目前没有返回名字，用用户ID代替
                    break;
                case LABEL_TYPE.ADD:
                    this.buttonLabel.source = "img_word_friend_tj_png";
                    // this.fNameLabel.text = this.data.uid.toString();//目前没有返回名字，用用户ID代替
                    break;
                default:
                    break;
            }
            //button
            switch (this.data.type) {
                case LABEL_TYPE.FRIEND:
                    this.checkBox.visible = false;
                    // this.button.visible = true;
                    if (this.data.status == 5 /* PRIVATE */ && this.data.roomId != -1) {
                        this.button.alpha = 1;
                        this.button.visible = true;
                        this.button.touchEnabled = true;
                        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
                    }
                    else {
                        // this.button.visible = false;
                        this.button.alpha = 0.5;
                        this.button.touchEnabled = false;
                        this.button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
                    }
                    this.infoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenFriendInfo, this);
                    break;
                case LABEL_TYPE.ADD:
                    this.checkBox.visible = false;
                    this.button.visible = true;
                    this.button.alpha = 1;
                    this.button.touchEnabled = true;
                    this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
                    break;
                case LABEL_TYPE.INVITE:
                    this.button.visible = false;
                    this.checkBox.visible = this.data.status == 1 /* NULL */ ? true : false;
                default:
                    break;
            }
            if (this.data.status == 0) {
                this.statusLabel.text = "离线";
                this.statusLabel.textColor = 0x7A7A7A;
                this.statusImage.source = "icon_main_lx_png";
            }
            else {
                this.statusLabel.text = FriendLabel.getFriendStatus(this.data.status);
                this.statusLabel.textColor = 0xFFCCFF;
                this.statusImage.source = "icon_main_zx_png";
            }
            // if (this.data.type == LABEL_TYPE.FRIEND) {
            //     if ()
            // }
        };
        FriendLabel.prototype.onClickButton = function (event) {
            var target = event.currentTarget;
            // gameabc.BindleButtonUtils.bindClickByTarget(target);
            switch (this.data.type) {
                case LABEL_TYPE.FRIEND:
                    // room.getProxy().getRoomVOByJoinNumber
                    if (user.getProxy().svrGameData.silver <= 0) {
                        user.getProxy().openMoney();
                    }
                    else {
                        user.getProxy().friendRoomid = this.data.roomId;
                        user.getProxy().joinRoom(room.getProxy().getRoomVOByJoinNumber(this.data.roomId.toString()));
                    }
                    // user.getProxy().vipSit();
                    break;
                case LABEL_TYPE.ADD:
                    if (user.getProxy().friendNum >= user.getProxy().MAXFRIENDNUM)
                        tip.popSysCenterTip("您的好友数已达上限！", tip.TIPS_TYPE.TIPS_WARNING);
                    else
                        __SEND_NOTIFICATION(app.NetAction.REQ_ADD_USER_FRIEND_REQUEST, this.data.uid);
                    break;
                default:
                    break;
            }
        };
        FriendLabel.prototype.onOpenFriendInfo = function () {
            var roleVO = new appvos.SeeInfoVO();
            roleVO.name = this.data.fName;
            roleVO.roleId = this.data.fid;
            roleVO.avatarID = this.data.faceid.toString();
            roleVO.type = -2;
            __OPEN_PRE_MOUDLE(AppReg.APP_POKER_INFO, roleVO, [AppReg.APP_FRIEND_MAIN]);
        };
        FriendLabel.getFriendStatus = function (type) {
            var rv;
            switch (type) {
                case 1 /* NULL */:
                    rv = "正在闲逛";
                    break;
                case 2 /* SMALL */:
                case 3 /* MIDDLE */:
                case 4 /* BIG */:
                    rv = "正在普通房";
                    break;
                case 5 /* PRIVATE */:
                    rv = "正在私人房";
                    break;
                case 6 /* SNG */:
                    rv = "正在SNG";
                    break;
                case 7 /* MTT */:
                    rv = "正在MTT";
                    break;
                case 9 /* PK */:
                    rv = "正在二人房";
                    break;
                case 10 /* FREE */:
                    rv = "正在免费房";
                    break;
                case 8 /* HAPPY */:
                    rv = "正在九九德州";
                    break;
                default:
                    rv = "未知";
                    break;
            }
            return rv;
        };
        return FriendLabel;
    }(eui.ItemRenderer));
    friend.FriendLabel = FriendLabel;
    __reflect(FriendLabel.prototype, "friend.FriendLabel");
})(friend || (friend = {}));
//# sourceMappingURL=FriendLabel.js.map