/**
 * Created by JiangTao on 2016/4/5.
 */
module shop {
    export class PropPanel implements gameabc.IDisposer{

        uiModule:ShopWinModule;
        itemList:eui.List;

        //面板是否是显示状态
        $active:boolean = false;

        constructor(view:ShopWinModule) {
            this.uiModule = view;
        }

        init():void {
            this.itemList = this.uiModule.itemList;
            this.itemList.itemRenderer = item.PropInfoItem;
        }

        initDatas():void {
            var dataProvider:eui.ArrayCollection = new eui.ArrayCollection(item.getProxy().allPropDatas);
            this.itemList.dataProvider = dataProvider;
        }

        dispose():void {
        }

        set active(val:boolean) {
            this.$active = val;
            this.itemList.visible = this.$active;
        }

        get active():boolean {
            return this.$active;
        }
    }
}