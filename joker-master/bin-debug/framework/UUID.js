var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/5/4.
 */
var gameabc;
(function (gameabc) {
    var UUID = (function () {
        function UUID() {
        }
        /**
         * 生成一个唯一标识id,重装游戏或者清除数据后此标识会重新生成。
         * @returns {string}
         */
        UUID.generateH5UUID = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                return platform.DEVICE_ID;
            }
            var sName = "bfdz_uuid";
            if (this.h5uuid == "") {
                this.h5uuid = gameabc.LocalSO.getItem(sName);
                if (typeof this.h5uuid == "undefine" || this.h5uuid == "" || this.h5uuid == null) {
                    this.h5uuid = String(new Date().getTime());
                    gameabc.LocalSO.setItem(sName, this.h5uuid);
                }
            }
            return this.h5uuid;
        };
        /**
         * 由原生的native传入设备的uuid
         */
        UUID.setMobileUUID = function (uuid) {
            platform.DEVICE_ID = uuid;
        };
        return UUID;
    }());
    //web端建立的uuid
    UUID.h5uuid = "";
    gameabc.UUID = UUID;
    __reflect(UUID.prototype, "gameabc.UUID");
})(gameabc || (gameabc = {}));
//# sourceMappingURL=UUID.js.map