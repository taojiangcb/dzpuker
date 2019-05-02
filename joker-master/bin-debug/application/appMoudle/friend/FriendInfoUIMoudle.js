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
    var FriendInfoUIMoudle = (function (_super) {
        __extends(FriendInfoUIMoudle, _super);
        function FriendInfoUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = -20;
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            _this.skinName = "PokerInfoUIMoudleSkin";
            return _this;
        }
        FriendInfoUIMoudle.prototype.onComplete = function () {
            this.deleteLabel = new eui.Label;
            this.deleteLabel.text = "删除好友";
            this.deleteLabel.left = 20;
            this.deleteLabel.bottom = 50;
            this.addChild(this.deleteLabel);
            this.bindButton(this.deleteLabel);
        };
        FriendInfoUIMoudle.prototype.opening = function () {
            this.friendId = this.uiOpenData;
        };
        FriendInfoUIMoudle.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.deleteLabel:
                    __SEND_NOTIFICATION(app.NetAction.REQ_ADD_USER_FRIEND_DELETE, this.friendId);
                    this.close();
                    break;
                default:
                    break;
            }
        };
        return FriendInfoUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    friend.FriendInfoUIMoudle = FriendInfoUIMoudle;
    __reflect(FriendInfoUIMoudle.prototype, "friend.FriendInfoUIMoudle");
})(friend || (friend = {}));
//# sourceMappingURL=FriendInfoUIMoudle.js.map