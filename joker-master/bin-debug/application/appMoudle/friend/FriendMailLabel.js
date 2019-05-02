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
    var FriendMailLabel = (function (_super) {
        __extends(FriendMailLabel, _super);
        function FriendMailLabel() {
            var _this = _super.call(this) || this;
            _this.skinName = "FriendMailLabelSkin";
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplete, _this);
            return _this;
        }
        FriendMailLabel.prototype.onComplete = function () {
            gameabc.BindleButtonUtils.bindClickByTarget(this.addButton);
            gameabc.BindleButtonUtils.bindClickByTarget(this.refuseButton);
            this.addButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
            this.refuseButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        };
        FriendMailLabel.prototype.onClickButton = function (event) {
            var target = event.currentTarget;
            switch (target) {
                case this.addButton:
                    if (user.getProxy().friendNum >= user.getProxy().MAXFRIENDNUM)
                        tip.popSysCenterTip("您的好友数已达上限！", tip.TIPS_TYPE.TIPS_WARNING);
                    else
                        __SEND_NOTIFICATION(app.NetAction.REQ_ADD_USER_FRIEND, this.data.fid);
                    break;
                case this.refuseButton:
                    __SEND_NOTIFICATION(app.NetAction.REQ_REFUSE_ADD_FRIEND, this.data.fid);
                    break;
                default:
                    break;
            }
        };
        FriendMailLabel.prototype.dataChanged = function () {
            if (this.data.faceid)
                this.faceidImage.source = "img_Default_Avatar_" + this.data.faceid + "_png";
            this.fNameLabel.text = this.data.fName;
            this.timeLabel.text = DateUtils.dateFormat(new Date(this.data.time * 1000), "yyyy-MM-dd");
        };
        return FriendMailLabel;
    }(eui.ItemRenderer));
    friend.FriendMailLabel = FriendMailLabel;
    __reflect(FriendMailLabel.prototype, "friend.FriendMailLabel");
})(friend || (friend = {}));
//# sourceMappingURL=FriendMailLabel.js.map