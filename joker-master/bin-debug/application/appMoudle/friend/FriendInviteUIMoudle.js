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
    var FriendInviteUIMoudle = (function (_super) {
        __extends(FriendInviteUIMoudle, _super);
        function FriendInviteUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = -20;
            _this.width = 650;
            _this.height = 450;
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            _this.skinName = "FriendInviteUISkin";
            return _this;
        }
        FriendInviteUIMoudle.prototype.onComplete = function () {
            __REGISTER_MEDIATOR(friend.FriendInviteUIMediator, this);
            this.bindButton(this.inviteButton);
        };
        FriendInviteUIMoudle.prototype.opening = function () {
            __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND);
        };
        FriendInviteUIMoudle.prototype.initInviteList = function (data) {
            // var datasec: any[] = [];
            // for (var i = 0; i < data.length; i++) {
            //     if (data[i].status == user.ROOM_TYPE.NULL) {
            //         data[i]["type"] = LABEL_TYPE.INVITE;
            //         datasec.push(data[i]);
            //     }
            // }
            // this.tipLabel.visible = datasec.length > 0? false: true;
            // this.data = new eui.ArrayCollection(datasec);
            // this.inviteList.dataProvider = this.data;
            // this.inviteList.itemRenderer = FriendLabel;
            this.tipLabel.visible = data.length > 0 ? false : true;
            this.inviteButton.visible = data.length > 0 ? true : false;
            for (var i = 0; i < data.length; i++) {
                data[i]["type"] = friend.LABEL_TYPE.INVITE;
            }
            data.sort(function (a, b) {
                if (a.status == 1 /* NULL */)
                    return -1;
                if (b.status == 1 /* NULL */)
                    return 1;
                return b.status - a.status;
            });
            this.data = new eui.ArrayCollection(data);
            this.inviteList.dataProvider = this.data;
            this.inviteList.itemRenderer = friend.FriendLabel;
        };
        FriendInviteUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.inviteButton:
                    if (this.inviteList.numChildren == 0)
                        return;
                    var data = [];
                    data.push(playcards.getProxy().joinNumber);
                    data.push(user.getProxy().svrName);
                    for (var i = 0; i < this.inviteList.numChildren; i++) {
                        var friendLabel = this.inviteList.getChildAt(i);
                        if (friendLabel.checkBox.selected) {
                            data.push(friendLabel.data.fid.toString());
                        }
                    }
                    __SEND_NOTIFICATION(app.NetAction.REQ_INVITE_FRIEND, data);
                    this.close();
                    break;
                default:
                    break;
            }
        };
        FriendInviteUIMoudle.prototype.dispose = function () {
            __REMOVE_MEDIATOR(friend.FriendInviteUIMediator);
            _super.prototype.dispose.call(this);
        };
        return FriendInviteUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    friend.FriendInviteUIMoudle = FriendInviteUIMoudle;
    __reflect(FriendInviteUIMoudle.prototype, "friend.FriendInviteUIMoudle");
})(friend || (friend = {}));
//# sourceMappingURL=FriendInviteUIMoudle.js.map