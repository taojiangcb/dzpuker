var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var appvos;
(function (appvos) {
    /** 客户端房间类型对象
     * 其中各种参数，使用时请注意……
     * 创建时使用数字(方便与服务端核对，检查)
     * 而实际逻辑判断时，请使用常量 */
    var RoomVO = (function () {
        function RoomVO() {
            /** 在线人数 */
            this.online = 0;
            /** 当个房价价格比例
             * 当个房间魅力比例
             * 当个房间魅力积分比例
             *  当个房间对方魅力比例
             * 当个房间对方魅力积分比例
             */
            this.charmList = [];
        }
        return RoomVO;
    }());
    appvos.RoomVO = RoomVO;
    __reflect(RoomVO.prototype, "appvos.RoomVO");
})(appvos || (appvos = {}));
//# sourceMappingURL=RoomVO.js.map