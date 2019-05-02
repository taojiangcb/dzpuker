var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var room;
(function (room) {
    var TableVO = (function () {
        function TableVO() {
        }
        return TableVO;
    }());
    room.TableVO = TableVO;
    __reflect(TableVO.prototype, "room.TableVO");
})(room || (room = {}));
//# sourceMappingURL=TableVO.js.map