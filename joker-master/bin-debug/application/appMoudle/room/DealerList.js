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
    var DealerList = (function (_super) {
        __extends(DealerList, _super);
        function DealerList() {
            return _super.call(this) || this;
        }
        DealerList.prototype.commitProperties = function () {
            var change = this.$dataProviderChanged;
            _super.prototype.commitProperties.call(this);
            if (change) {
                this.layout["ischange"] = false;
                this.scrollH = 150;
            }
        };
        return DealerList;
    }(eui.List));
    room.DealerList = DealerList;
    __reflect(DealerList.prototype, "room.DealerList");
})(room || (room = {}));
//# sourceMappingURL=DealerList.js.map