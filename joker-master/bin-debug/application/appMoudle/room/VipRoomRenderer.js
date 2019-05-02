var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    var VipRoomRenderer = (function (_super) {
        __extends(VipRoomRenderer, _super);
        function VipRoomRenderer() {
            return _super.apply(this, arguments) || this;
        }
        Object.defineProperty(VipRoomRenderer.prototype, "roomVO", {
            get: function () {
                return this.dataPropert.value;
            },
            enumerable: true,
            configurable: true
        });
        VipRoomRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.txtLabel.text = FormatUtils.qian(this.roomVO.smallBlinds)
                + "/" + FormatUtils.qian(this.roomVO.bigBlinds);
        };
        VipRoomRenderer.prototype.click = function (tag) {
            _super.prototype.click.call(this, tag);
            // user.getProxy().currentRoom = this.roomVO;
            // __SEND_NOTIFICATION(app.NetAction.JOIN_ROOM);
        };
        return VipRoomRenderer;
    }(uicomps.ChrooseMenuItemRenderer));
    room.VipRoomRenderer = VipRoomRenderer;
    __reflect(VipRoomRenderer.prototype, "room.VipRoomRenderer");
})(room || (room = {}));
//# sourceMappingURL=VipRoomRenderer.js.map