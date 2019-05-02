var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    var RoleVO = (function () {
        function RoleVO() {
            this.roleId = 0; //ID
            this.name = ""; //名称
            this.sex = 0; //性别
            this.silver = 0; //银两
            this.avatarID = ""; //头像
            this.vipLevel = 0; //VIP
        }
        return RoleVO;
    }());
    appvos.RoleVO = RoleVO;
    __reflect(RoleVO.prototype, "appvos.RoleVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=RoleVO.js.map