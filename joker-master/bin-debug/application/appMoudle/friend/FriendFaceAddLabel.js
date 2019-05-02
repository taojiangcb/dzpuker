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
    var FriendFaceAddLabel = (function (_super) {
        __extends(FriendFaceAddLabel, _super);
        function FriendFaceAddLabel() {
            var _this = _super.call(this) || this;
            _this.skinName = "FriendFaceAddLabelSkin";
            return _this;
        }
        FriendFaceAddLabel.prototype.dataChanged = function () {
            this.nameLabel.text = this.data.fName;
        };
        return FriendFaceAddLabel;
    }(eui.ItemRenderer));
    friend.FriendFaceAddLabel = FriendFaceAddLabel;
    __reflect(FriendFaceAddLabel.prototype, "friend.FriendFaceAddLabel");
})(friend || (friend = {}));
//# sourceMappingURL=FriendFaceAddLabel.js.map