/**
 * Created by JiangTao on 2016/4/5.
 */
module shop {
    export class ShoppingPanel implements gameabc.IDisposer{

        uiModule:ShopWinModule;
        shopList:eui.List;

        //面板是否是显示状态
        $active:boolean = false;

        constructor(view:ShopWinModule) {
            this.uiModule = view;
        }

        init():void {
            this.shopList = this.uiModule.itemShopList;
            this.shopList.itemRenderer = shop.ShopItemItemRenderer;
        }

        initDatas():void {
            var dataProvider:eui.ArrayCollection = new eui.ArrayCollection(shop.getProxy().shopItems);
            this.shopList.dataProvider = dataProvider;
        }

        dispose():void {
        }

        set active(val:boolean) {
            this.$active = val;
            this.shopList.visible = this.$active;
        }

        get active():boolean {
            return this.$active;
        }
    }
}