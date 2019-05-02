var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var treasure;
(function (treasure) {
    function getProxy() {
        return __GET_PROXY(TreasureProxy);
    }
    treasure.getProxy = getProxy;
    var TreasureProxy = (function (_super) {
        __extends(TreasureProxy, _super);
        function TreasureProxy(name, data) {
            var _this = _super.call(this, TreasureProxy.NAME, data) || this;
            _this.rate = 1.1;
            _this.progressiveData = [
                ["5000", "icon_shop_box4_png", 50070 /* TREASURE_5K */],
                ["2万", "icon_shop_box5_png", 50071 /* TREASURE_2W */],
                ["5万", "icon_shop_box6_png", 50072 /* TREASURE_5W */],
                ["10万", "icon_shop_box1_png", 50073 /* TREASURE_10W */],
                ["50万", "icon_shop_box2_png", 50074 /* TREASURE_50W */],
                ["100万", "icon_shop_box3_png", 50075 /* TREASURE_100W */]
            ];
            return _this;
        }
        TreasureProxy.prototype.testData1 = function () {
            var data = [{
                    id: 0,
                    userId: 714,
                    userName: "714",
                    faceid: "",
                    buyNum: 1000,
                    totalNum: 5000,
                    openTime: 0,
                    count: 714,
                    state: 1,
                    createTime: 0,
                    iconId: 0,
                    roomType: 0,
                    treasrueDBId: 0,
                    title: "",
                }];
            return data;
        };
        return TreasureProxy;
    }(app.mvc.AbsractProxy));
    TreasureProxy.NAME = "TreasureProxy";
    treasure.TreasureProxy = TreasureProxy;
    __reflect(TreasureProxy.prototype, "treasure.TreasureProxy");
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureProxy.js.map