var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/5.
 */
var shop;
(function (shop) {
    /**
     * 当前界面显示的页卡选项
     */
    var SHOP_PAGE;
    (function (SHOP_PAGE) {
        SHOP_PAGE[SHOP_PAGE["none"] = 0] = "none";
        SHOP_PAGE[SHOP_PAGE["shopping"] = 1] = "shopping";
        SHOP_PAGE[SHOP_PAGE["vip"] = 2] = "vip";
        SHOP_PAGE[SHOP_PAGE["myBag"] = 3] = "myBag";
    })(SHOP_PAGE = shop.SHOP_PAGE || (shop.SHOP_PAGE = {}));
    var ShopWinModule = (function (_super) {
        __extends(ShopWinModule, _super);
        function ShopWinModule() {
            var _this = _super.call(this) || this;
            //当前显示的页卡
            _this.curPage = 0;
            _this.skinName = "resource/app_skin/shop/ShopModuleSkin.exml";
            return _this;
        }
        ShopWinModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.tabGroup = new uicomps.ButtonGroup();
            this.tabGroup.add(this.btnBuyChip);
            // this.tabGroup.add(this.btnVip);
            this.bindButton(this.btnVip);
            this.tabGroup.add(this.btnItem);
            this.tabGroup.itemThisObj = this;
            this.tabGroup.itemClick = this.touchHandler;
            // this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backHandler,this)
            this.bindButton(this.btnBack);
            this.shopPanel = new shop.ShoppingPanel(this);
            this.shopPanel.init();
            this.vipPanel = new shop.VipPanel(this);
            this.vipPanel.init();
            this.propPanel = new shop.PropPanel(this);
            this.propPanel.init();
            var openPage = this.uiOpenData > 0
                ? this.uiOpenData
                : shop.SHOP_PAGE.shopping;
            this.setCurPage(openPage);
            if (openPage == shop.SHOP_PAGE.shopping) {
                this.tabGroup.select(this.btnBuyChip);
            }
            else if (openPage == shop.SHOP_PAGE.vip) {
                this.tabGroup.select(this.btnVip);
            }
            this.updateSilver();
            shop.getProxy().getGoodsDate();
            __SEND_NOTIFICATION(app.NetAction.GET_PROP_ATTRS);
        };
        ShopWinModule.prototype.setCurPage = function (val) {
            if (this.curPage == val)
                return;
            this.curPage = val;
            if (this.curPage == shop.SHOP_PAGE.shopping) {
                this.vipPanel.active = false;
                this.shopPanel.active = true;
                this.propPanel.active = false;
                this.shopPanel.initDatas();
            }
            else if (this.curPage == shop.SHOP_PAGE.vip) {
                this.shopPanel.active = false;
                this.vipPanel.active = true;
                this.propPanel.active = false;
                this.vipPanel.vipTiming();
                this.vipPanel.initDatas();
            }
            else if (this.curPage == shop.SHOP_PAGE.myBag) {
                this.shopPanel.active = false;
                this.vipPanel.active = false;
                this.propPanel.active = true;
                this.propPanel.initDatas();
            }
        };
        //显示当前的银两
        ShopWinModule.prototype.updateSilver = function () {
            if (user.getProxy().svrGameData) {
                this.numSiler.text = FormatUtils.wan(user.getProxy().svrGameData.silver) + "";
            }
            else {
                this.numSiler.text = "0";
            }
        };
        //tab页按钮触发
        ShopWinModule.prototype.touchBindButtonHandler = function (clickTarget) {
            if (clickTarget == this.btnBuyChip) {
                this.setCurPage(shop.SHOP_PAGE.shopping);
            }
            else if (clickTarget == this.btnVip) {
                var strMsg = gameabc.getMessage("FUNCTION_NO_TIPS");
                tip.SystemCenterTooltip.showTip(strMsg);
                //                this.setCurPage(shop.SHOP_PAGE.vip);
                // this.btnBuyChip.selected = true;
                this.btnVip.selected = false;
            }
            else if (clickTarget == this.btnItem) {
                // var strMsg:string = gameabc.getMessage("FUNCTION_NO_TIPS");
                // tip.SystemCenterTooltip.showTip(strMsg);
                this.setCurPage(shop.SHOP_PAGE.myBag);
            }
            else if (clickTarget == this.btnBack) {
                this.close();
            }
        };
        // backHandler(event:egret.TouchEvent):void {
        // __CLOSE_MOUDLE(AppReg.SHOP_WIN);
        //     this.close();
        // }
        ShopWinModule.prototype.dispose = function () {
            // if(this.btnBack) {
            //     this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.backHandler,this);
            // }
            if (this.tabGroup) {
                this.tabGroup.dispose();
                this.tabGroup = null;
            }
            if (this.shopPanel) {
                this.shopPanel.dispose();
            }
            if (this.vipPanel) {
                this.vipPanel.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        return ShopWinModule;
    }(app.base.BaseSceneUIMoudleComponent));
    shop.ShopWinModule = ShopWinModule;
    __reflect(ShopWinModule.prototype, "shop.ShopWinModule");
})(shop || (shop = {}));
//# sourceMappingURL=ShopWinModule.js.map