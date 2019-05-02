var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/4.
 */
var shop;
(function (shop) {
    function getProxy() {
        return __GET_PROXY(ShopItemProxy);
    }
    shop.getProxy = getProxy;
    var ShopItemProxy = (function (_super) {
        __extends(ShopItemProxy, _super);
        //quickAccount: shop.ShopHttpAccount;
        function ShopItemProxy(name, data) {
            var _this = _super.call(this, ShopItemProxy.NAME, data) || this;
            _this.itemTempls = [];
            _this.shopItems = [];
            _this.viptemplates = [];
            _this.vipTable = [];
            _this.PROPORTION = 10000;
            _this.initDB();
            return _this;
        }
        ShopItemProxy.prototype.getGoodsDate = function () {
            platform.getGameTeaPay().createList();
        };
        ShopItemProxy.prototype.initDB = function () {
            //初始化模板列表
            this.itemTempls.push(new shop.ItemTemplateVO(3, "铜", "icon_shop_box4_png", 6000, 0, 0, 6));
            this.itemTempls.push(new shop.ItemTemplateVO(4, "银", "icon_shop_box5_png", 300000, 0, 0, 30));
            this.itemTempls.push(new shop.ItemTemplateVO(5, "金", "icon_shop_box6_png", 680000, 0, 0, 68));
            this.itemTempls.push(new shop.ItemTemplateVO(6, "白金", "icon_shop_box1_png", 1280000, 0, 0, 128));
            this.itemTempls.push(new shop.ItemTemplateVO(7, "钻", "icon_shop_box2_png", 3280000, 0, 0, 328));
            this.itemTempls.push(new shop.ItemTemplateVO(8, "宝钻", "icon_shop_box3_png", 6480000, 200, 0, 648));
            this.viptemplates.push(new shop.VIPTemplateVO(1, "铜牌", 20000, 1000, 200, 0, 0, 0, 25, 30));
            this.viptemplates.push(new shop.VIPTemplateVO(2, "银牌", 40000, 3000, 300, 1, 1, 0, 35, 98));
            this.viptemplates.push(new shop.VIPTemplateVO(3, "金牌", 60000, 5000, 500, 1, 1, 0, 50, 198));
            this.viptemplates.push(new shop.VIPTemplateVO(4, "铂金", 80000, 7000, 800, 1, 1, 0, 70, 328));
            this.viptemplates.push(new shop.VIPTemplateVO(5, "皇冠", 100000, 9000, 1000, 1, 1, 1, 100, 648));
        };
        ShopItemProxy.prototype.getTemplateById = function (templateId) {
            var len = this.itemTempls.length;
            while (--len > -1) {
                if (this.itemTempls[len].templateId == templateId) {
                    return this.itemTempls[len];
                }
            }
            return null;
        };
        ShopItemProxy.prototype.getVipTemplateById = function (templateId) {
            var len = this.viptemplates.length;
            while (--len > -1) {
                if (this.viptemplates[len].templateId == templateId) {
                    return this.viptemplates[len];
                }
            }
            return null;
        };
        ShopItemProxy.prototype.getShopItem = function (id) {
            var len = this.shopItems.length;
            while (--len > -1) {
                if (this.shopItems[len].id == id) {
                    return this.shopItems[len];
                }
            }
        };
        ShopItemProxy.prototype.createVipDataView = function () {
            if (this.vipTable.length == 0) {
                var tables = this.viptemplates;
                var row = new shop.VIPRowData();
                row.title = "购买送银子";
                row.values = [tables[0].presenter, tables[1].presenter, tables[2].presenter, tables[3].presenter, tables[4].presenter];
                this.vipTable.push(row);
                row = new shop.VIPRowData();
                row.title = "登录奖励";
                row.values = [tables[0].everydaypull, tables[1].everydaypull, tables[2].everydaypull, tables[3].everydaypull, tables[4].everydaypull];
                this.vipTable.push(row);
                row = new shop.VIPRowData();
                row.title = "查阅牌局数";
                row.values = [tables[0].paiju, tables[1].paiju, tables[2].paiju, tables[3].paiju, tables[4].paiju];
                this.vipTable.push(row);
                row = new shop.VIPRowData();
                row.title = "贵族表情";
                row.values = [tables[0].expression, tables[1].expression, tables[2].expression, tables[3].expression, tables[4].expression];
                row.isSwitch = true;
                this.vipTable.push(row);
                row = new shop.VIPRowData();
                row.title = "贵族魔法表情";
                row.values = [tables[0].nobleExpression, tables[1].nobleExpression, tables[2].nobleExpression, tables[3].nobleExpression, tables[4].nobleExpression];
                row.isSwitch = true;
                this.vipTable.push(row);
                row = new shop.VIPRowData();
                row.title = "私密房权限";
                row.values = [tables[0].openRoom, tables[1].openRoom, tables[2].openRoom, tables[3].openRoom, tables[4].openRoom];
                row.isSwitch = true;
                this.vipTable.push(row);
                row = new shop.VIPRowData();
                row.title = "牌局收藏数";
                row.values = [tables[0].collect, tables[1].collect, tables[2].collect, tables[3].collect, tables[4].collect];
                this.vipTable.push(row);
            }
            return this.vipTable;
        };
        return ShopItemProxy;
    }(app.mvc.AbsractProxy));
    ShopItemProxy.NAME = "__SHOP_ITEM_PROXY__";
    shop.ShopItemProxy = ShopItemProxy;
    __reflect(ShopItemProxy.prototype, "shop.ShopItemProxy");
})(shop || (shop = {}));
//# sourceMappingURL=ShopProxy.js.map