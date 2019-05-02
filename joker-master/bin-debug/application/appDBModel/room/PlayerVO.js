var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var room;
(function (room) {
    /**
     *
     * @author
     *
     */
    var PlayerVO = (function () {
        function PlayerVO() {
        }
        return PlayerVO;
    }());
    room.PlayerVO = PlayerVO;
    __reflect(PlayerVO.prototype, "room.PlayerVO");
})(room || (room = {}));
//# sourceMappingURL=PlayerVO.js.map