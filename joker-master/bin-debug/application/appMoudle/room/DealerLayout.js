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
    var DealerLayout = (function (_super) {
        __extends(DealerLayout, _super);
        function DealerLayout() {
            var _this = _super.call(this) || this;
            _this.ischange = false;
            _this.gap = 0;
            _this.verticalAlign = "middle";
            return _this;
        }
        DealerLayout.prototype.setList = function (list) {
            list.layout = this;
            this.dealerlist = list;
            list.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.listchange, this);
        };
        DealerLayout.prototype.updateDisplayListVirtual = function (width, height) {
            _super.prototype.updateDisplayListVirtual.call(this, width, height);
            if (!this.ischange) {
                this.resize();
            }
            this.ischange = true;
        };
        DealerLayout.prototype.listchange = function (evt) {
            if (evt.property == "scrollH") {
                this.resize();
            }
        };
        DealerLayout.prototype.resize = function () {
            var allsortChild = [];
            for (var i = 0, len = this.dealerlist.numChildren; i < len; i++) {
                var item = this.dealerlist.getChildAt(i);
                if (item instanceof room.DealerListItem) {
                    var scale = item.changeScale(this.dealerlist.scrollH);
                    for (var j = 0, jlen = allsortChild.length; j < jlen; j++) {
                        if (allsortChild[j].scale >= scale) {
                            allsortChild.splice(j, 0, item);
                            break;
                        }
                    }
                    if (j == jlen) {
                        allsortChild.push(item);
                    }
                }
            }
            for (var j = 0, jlen = allsortChild.length; j < jlen; j++) {
                this.dealerlist.setChildIndex(allsortChild[j], j);
            }
        };
        return DealerLayout;
    }(eui.HorizontalLayout));
    room.DealerLayout = DealerLayout;
    __reflect(DealerLayout.prototype, "room.DealerLayout");
})(room || (room = {}));
//# sourceMappingURL=DealerLayout.js.map