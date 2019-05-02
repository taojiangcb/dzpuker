var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var login;
(function (login) {
    var LoginServerListItem = (function (_super) {
        __extends(LoginServerListItem, _super);
        function LoginServerListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ServerListItemSkin";
            return _this;
        }
        LoginServerListItem.prototype.dataChanged = function () {
            this.nameLabel.text = this.data.label;
        };
        return LoginServerListItem;
    }(uicomps.BaseItemCilckRenderer));
    login.LoginServerListItem = LoginServerListItem;
    __reflect(LoginServerListItem.prototype, "login.LoginServerListItem");
})(login || (login = {}));
//# sourceMappingURL=LoginServerListItem.js.map