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
    var FriendMailUIMoudle = (function (_super) {
        __extends(FriendMailUIMoudle, _super);
        function FriendMailUIMoudle() {
            var _this = _super.call(this) || this;
            _this.horizontalCenter = 0;
            _this.verticalCenter = -20;
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            _this.skinName = "FriendMailUIMoudleSkin";
            return _this;
        }
        FriendMailUIMoudle.prototype.onComplete = function () {
            __REGISTER_MEDIATOR(friend.FriendMailUIMediator, this);
        };
        FriendMailUIMoudle.prototype.opening = function () {
            __SEND_NOTIFICATION(app.NetAction.REQ_GET_USER_FRIEND_REQUEST);
        };
        FriendMailUIMoudle.prototype.initRequestList = function (data) {
            this.tipLabel.visible = data ? false : true;
            this.reqList.dataProvider = new eui.ArrayCollection(data);
            this.reqList.itemRenderer = friend.FriendMailLabel;
        };
        FriendMailUIMoudle.prototype.dispose = function () {
            __REMOVE_MEDIATOR(friend.FriendMailUIMediator);
            _super.prototype.dispose.call(this);
        };
        return FriendMailUIMoudle;
    }(app.base.BaseSceneUIMoudleComponent));
    friend.FriendMailUIMoudle = FriendMailUIMoudle;
    __reflect(FriendMailUIMoudle.prototype, "friend.FriendMailUIMoudle");
})(friend || (friend = {}));
//# sourceMappingURL=FriendMailUIMoudle.js.map