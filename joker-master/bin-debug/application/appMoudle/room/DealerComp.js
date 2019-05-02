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
    var DealerComp = (function (_super) {
        __extends(DealerComp, _super);
        function DealerComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "DealerCompSkin";
            return _this;
        }
        /*该模块被创建完成后的回调函数*/
        DealerComp.prototype.createComplete = function (event) {
            this.initialized = true;
            this.dealerlist.itemRenderer = room.DealerListItem;
            // var list: appvos.DealerTableVO[] = [null, null].concat(room.getProxy().room7, null, null);
            // this.dealerlist.dataProvider = new eui.ArrayCollection(list);
            var layout = new room.DealerLayout();
            layout.setList(this.dealerlist);
            this.scroll = this.scroller.$Scroller[8];
            this.scroller.bounces = false;
            // this.animation = this.scroll.animation;
            // var that = this;
            // this.animation.endFunction = function(){
            // 	this.finishScrolling();
            // }
        };
        return DealerComp;
    }(gameabc.UICustomComponent));
    room.DealerComp = DealerComp;
    __reflect(DealerComp.prototype, "room.DealerComp");
})(room || (room = {}));
//# sourceMappingURL=DealerComp.js.map