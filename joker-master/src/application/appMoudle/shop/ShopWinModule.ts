/**
 * Created by JiangTao on 2016/4/5.
 */
module shop {

    /**
     * 当前界面显示的页卡选项
     */
    export enum SHOP_PAGE {
        none = 0,
        shopping = 1,
        vip,
        myBag
    }

    export class ShopWinModule extends app.base.BaseSceneUIMoudleComponent {

        itemList:eui.List;
        itemShopList:eui.List;
        vipView:eui.Group;
        vipTable:eui.List;

        btnBuyChip:eui.ToggleButton;
        btnVip:eui.ToggleButton;
        btnItem:eui.ToggleButton;
        tabGroup:uicomps.ButtonGroup;
        btnBack:eui.Button;

        numSiler:eui.BitmapLabel;           //当前银子数
        txtVipField:eui.Label;

        buyVip1:eui.Button;
        buyVip2:eui.Button;
        buyVip3:eui.Button;
        buyVip4:eui.Button;
        buyVip5:eui.Button;

        //******页卡控制********
        shopPanel:shop.ShoppingPanel;       //购买筹码页卡控制
        vipPanel:shop.VipPanel;             //vip页卡控制

        propPanel:shop.PropPanel;           //道具
        
        //当前显示的页卡
        curPage:SHOP_PAGE = 0;

        constructor(){
            super();
            this.skinName = "resource/app_skin/shop/ShopModuleSkin.exml";
        }
        
        createComplete(event:egret.Event):void {
            super.createComplete(event);

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

            var openPage:number = this.uiOpenData > 0
                ? this.uiOpenData
                : shop.SHOP_PAGE.shopping;
            this.setCurPage(openPage);

            if(openPage == shop.SHOP_PAGE.shopping) {
                this.tabGroup.select(this.btnBuyChip);
            }
            else if(openPage == shop.SHOP_PAGE.vip) {
                this.tabGroup.select(this.btnVip);
            }
            
            this.updateSilver();
            
            shop.getProxy().getGoodsDate();
             __SEND_NOTIFICATION(app.NetAction.GET_PROP_ATTRS);
        }

        setCurPage(val:shop.SHOP_PAGE):void {
            if(this.curPage == val) return;
            this.curPage = val;
            if(this.curPage == shop.SHOP_PAGE.shopping) {
                this.vipPanel.active = false;
                this.shopPanel.active = true;
                this.propPanel.active = false;
                this.shopPanel.initDatas();
            }
            else if(this.curPage == shop.SHOP_PAGE.vip) {
                this.shopPanel.active = false;
                this.vipPanel.active = true;
                this.propPanel.active = false;
                this.vipPanel.vipTiming();
                this.vipPanel.initDatas();
            } else if(this.curPage == shop.SHOP_PAGE.myBag) {
                this.shopPanel.active = false;
                this.vipPanel.active = false;
                 this.propPanel.active = true;
                this.propPanel.initDatas();
            }
            
        }

        //显示当前的银两
        updateSilver():void {
            if(user.getProxy().svrGameData) {
                this.numSiler.text = FormatUtils.wan(user.getProxy().svrGameData.silver) + "";
            } else {
                this.numSiler.text = "0";
            }
        }

        //tab页按钮触发
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            if(clickTarget == this.btnBuyChip) {
                this.setCurPage(shop.SHOP_PAGE.shopping);
            }
            else if(clickTarget == this.btnVip) {
                var strMsg:string = gameabc.getMessage("FUNCTION_NO_TIPS");
                tip.SystemCenterTooltip.showTip(strMsg);
//                this.setCurPage(shop.SHOP_PAGE.vip);
                // this.btnBuyChip.selected = true;
                this.btnVip.selected = false;
                // this.btnItem.selected = false;
            } 
            else if(clickTarget == this.btnItem) {
                // var strMsg:string = gameabc.getMessage("FUNCTION_NO_TIPS");
                // tip.SystemCenterTooltip.showTip(strMsg);
                this.setCurPage(shop.SHOP_PAGE.myBag);
                // this.btnBuyChip.selected = true;
                // this.btnVip.selected = false;
                // this.btnItem.selected = false;
            } else if (clickTarget == this.btnBack) {
                this.close();
            }
        }

        // backHandler(event:egret.TouchEvent):void {
            // __CLOSE_MOUDLE(AppReg.SHOP_WIN);
        //     this.close();
        // }

        dispose():void {
            // if(this.btnBack) {
            //     this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.backHandler,this);
            // }

            if(this.tabGroup) {
                this.tabGroup.dispose();
                this.tabGroup = null;
            }

            if(this.shopPanel) {
                this.shopPanel.dispose();
            }

            if(this.vipPanel) {
                this.vipPanel.dispose();
            }

            super.dispose();
        }
    }
}