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
    var TYPE_FACE2FACE;
    (function (TYPE_FACE2FACE) {
        TYPE_FACE2FACE[TYPE_FACE2FACE["ENTER"] = 0] = "ENTER";
        TYPE_FACE2FACE[TYPE_FACE2FACE["ROOM"] = 1] = "ROOM";
    })(TYPE_FACE2FACE = friend.TYPE_FACE2FACE || (friend.TYPE_FACE2FACE = {}));
    var FriendFaceAddUIMoudle = (function (_super) {
        __extends(FriendFaceAddUIMoudle, _super);
        function FriendFaceAddUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = -20;
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            _this.skinName = "FriendFaceAddUIMoudleSkin";
            _this.delButton = _this._comp_subKeyBoard.delButton;
            _this.enterButton = _this._comp_subKeyBoard.enterButton;
            return _this;
        }
        FriendFaceAddUIMoudle.prototype.onComplete = function () {
            var _this = this;
            __REGISTER_MEDIATOR(friend.FriendFaceAddUIMediator, this);
            // this.roomText.prompt = "输入4位数字进行添加 (注：数字不能连号不能相同)";
            this.roomText.addEventListener(egret.Event.CHANGE, this.onInputChange, this);
            this.roomText.maxChars = 4;
            this.changeType(TYPE_FACE2FACE.ENTER);
            this.bindButton(this.roomButton);
            this.bindButton(this.goBackButton);
            this.bindButton(this.addFriendsButton);
            this.bindButton(this.enterButton);
            this.bindButton(this.delButton);
            this._comp_subKeyBoard.inputButtonArray.forEach(function (item) {
                _this.bindButton(item);
            });
        };
        FriendFaceAddUIMoudle.prototype.onInputChange = function () {
            // console.log("onChange");
            // var a = this.roomText.text.length == 0;
            this.infoLabel.visible = Boolean(this.roomText.text.length == 0);
        };
        FriendFaceAddUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.goBackButton:
                    if (this.type == TYPE_FACE2FACE.ENTER) {
                        __OPEN_MOUDLE(AppReg.APP_FRIEND_MAIN, friend.TYPE.FRIEND_ADD);
                        this.close();
                    }
                    else if (this.type == TYPE_FACE2FACE.ROOM) {
                        this.changeType(TYPE_FACE2FACE.ENTER);
                    }
                    break;
                case this.enterButton:
                case this.roomButton:
                    var s = this.roomText.text;
                    if (isNaN(parseInt(s)) || s.length !== 4 || (s[0] == s[1] && s[1] == s[2] && s[2] == s[3]) ||
                        (parseInt(s[0]) - parseInt(s[1]) == 1 && parseInt(s[1]) - parseInt(s[2]) == 1 && parseInt(s[2]) - parseInt(s[3]) == 1) ||
                        (parseInt(s[0]) - parseInt(s[1]) == -1 && parseInt(s[1]) - parseInt(s[2]) == -1 && parseInt(s[2]) - parseInt(s[3]) == -1)) {
                        tip.popSysCenterTip("输入数字格式错误");
                        return;
                    }
                    __SEND_NOTIFICATION(app.NetAction.REQ_ADD_USER_FRIEND_FACE2FACE, parseInt(this.roomText.text));
                    break;
                case this.addFriendsButton:
                    if (this.roomFriendData.length == 0)
                        return;
                    var data = [];
                    data.push(parseInt(this.roomNumber));
                    for (var i = 0; i < this.dataProvider.length; i++) {
                        data.push(this.roomFriendData[i].uid);
                    }
                    if (user.getProxy().friendNum + data.length >= user.getProxy().MAXFRIENDNUM)
                        tip.popSysCenterTip("您的好友数已达上限！", tip.TIPS_TYPE.TIPS_WARNING);
                    else
                        __SEND_NOTIFICATION(app.NetAction.REQ_ADD_FACE2FACE_FRIEND, data);
                    mc2sdk.event(50027 /* FRIEND_ADD */);
                    break;
                case this.delButton:
                    var len = this.roomText.text.length;
                    if (len > 0) {
                        this.roomText.text = this.roomText.text.substring(0, len - 1);
                        this.onInputChange();
                    }
                    break;
                default:
                    break;
            }
            if (this.roomText.text.length >= 4)
                return;
            for (var i = 0; i < 10; i++) {
                if (this._comp_subKeyBoard.inputButtonArray[i] == clickTarget) {
                    this.roomText.text += String(i);
                    this.onInputChange();
                }
            }
        };
        FriendFaceAddUIMoudle.prototype.changeType = function (type) {
            if (this.type == type)
                return;
            this.type = type;
            switch (type) {
                case TYPE_FACE2FACE.ENTER:
                    this.roomGroup.visible = false;
                    this.enterGroup.visible = true;
                    break;
                case TYPE_FACE2FACE.ROOM:
                    this.enterGroup.visible = false;
                    this.roomGroup.visible = true;
                    break;
                default:
                    break;
            }
        };
        FriendFaceAddUIMoudle.prototype.enterRoom = function (data) {
            switch (this.type) {
                case TYPE_FACE2FACE.ENTER:
                    if (this.roomText.text !== this.roomNumber) {
                        this.roomNumber = this.roomText.text;
                        // var timer = new egret.Timer(3 * 60 * 1000, 1);
                        // timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,function() {
                        //     this.roomNumber = "0";
                        //     this.changeType(TYPE_FACE2FACE.ENTER);
                        //     tip.popSysCenterTip("互加好友已超时");
                        // },this);
                        // timer.start();
                        this.roomFriendData = [];
                    }
                    this.roomNumberLabel.text = this.roomText.text;
                    this.changeType(TYPE_FACE2FACE.ROOM);
                    break;
                case TYPE_FACE2FACE.ROOM:
                    break;
                default:
                    break;
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].uid !== user.getProxy().svrRoleId) {
                    for (var j = 0; j < this.roomFriendData.length; j++) {
                        if (this.roomFriendData[j] == data[i])
                            break;
                    }
                    if (j == this.roomFriendData.length)
                        this.roomFriendData.push(data[i]);
                }
            }
            this.dataProvider = new eui.ArrayCollection(this.roomFriendData);
            this.friendList.dataProvider = this.dataProvider;
            this.friendList.itemRenderer = friend.FriendFaceAddLabel;
        };
        FriendFaceAddUIMoudle.prototype.addFriendsSuccess = function () {
            tip.popSysCenterTip("好友申请已发送");
        };
        FriendFaceAddUIMoudle.prototype.dispose = function () {
            __REMOVE_MEDIATOR(friend.FriendFaceAddUIMediator);
            _super.prototype.dispose.call(this);
        };
        return FriendFaceAddUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    friend.FriendFaceAddUIMoudle = FriendFaceAddUIMoudle;
    __reflect(FriendFaceAddUIMoudle.prototype, "friend.FriendFaceAddUIMoudle");
})(friend || (friend = {}));
//# sourceMappingURL=FriendFaceAddUIMoudle.js.map