/**
 * Created by JiangTao on 2016/4/21.
 */
module playcards {
    /**
     * 带入购买界面
     */
    export class PlayCardBuyUIModuleComp extends app.base.BaseWndUIMoudleComponent{
        btnDragIn:eui.ToggleButton;
        btnBuyChip:eui.ToggleButton;
        tabGroup:uicomps.ButtonGroup;
        viewStack:eui.ViewStack;
        itemList:eui.List;
        blindsSettingHSlider: eui.HSlider;
        okBtn:eui.Button;//确认
        autoDragIn: eui.CheckBox;//彩豆不足时自动补充到最大买入
        btnClose:eui.Image;//关闭按钮
        txtChip:eui.BitmapLabel;//现有彩豆
        txtDragChip: eui.BitmapLabel; //筹码补充到
        txtMin:eui.Label;//最小买入
        txtMax:eui.Label;//最大买入
        // barbg:eui.Image;//滑条背景
        constructor(){
            super();
            //this.horizontalCenter=0;
            //this.verticalCenter=0;
            this.skinName = "resource/app_skin/playcards/buy/PlayBuyModuleSkin.exml"
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);

            this.tabGroup = new uicomps.ButtonGroup();
            this.tabGroup.add(this.btnDragIn);
            this.tabGroup.add(this.btnBuyChip);

            this.tabGroup.itemThisObj = this;
            this.tabGroup.itemClick = this.touchHandler;
            this.tabGroup.select(this.btnDragIn);

            
            this.bindButton(this.okBtn);
            this.bindButton(this.btnClose);
            this.blindsSettingHSlider.addEventListener(egret.Event.CHANGE,this.onBlindsSetting,this);
            
            // this.blindsSettingHSlider.thumb.addEventListener(egret.Event.RESIZE, this.onBlindsSetting, this);
//            if(getProxy().mySeatvo)
             var laycardProxy: PlayCardsProxy = getProxy();
             var nowBet: number = 0;
             var totalBet: number = 0;
             if(laycardProxy.mySeatvo) {
                 nowBet = laycardProxy.mySeatvo.nowBet ? laycardProxy.mySeatvo.nowBet : 0;
                 totalBet = laycardProxy.mySeatvo.totalBet ? laycardProxy.mySeatvo.totalBet : 0;
             }
             
            this.txtChip.text = (user.getProxy().svrGameData.silver - nowBet - totalBet).toString() ;// getProxy().mySeatvo.nowBet+""//user.getPlayerInfo().silver.toString();
            var tablevo = getTableVO(); 
            
            this.autoDragIn.selected = laycardProxy.isAutoAddBet;
            this.autoDragIn.addEventListener(egret.Event.CHANGE,this.changeSelecte,this)
            this.txtMin.text = tablevo.minJoinMoney+"";
            this.txtMax.text = (tablevo.minJoinMoney*tablevo.maxMagnification)+""; 
            this.blindsSettingHSlider.minimum = 1;
            this.blindsSettingHSlider.value = this.blindsSettingHSlider.maximum = tablevo.maxMagnification;
//            this.txtDragChip.text = (this.blindsSettingHSlider.value * tablevo.minJoinMoney).toString();
//            this.barbg.height = 0;
            this.onBlindsSetting();
            if(this.uiOpenData!=null){            
                this.viewStack.selectedIndex = this.uiOpenData;
                this.tabGroup.selectIndex(this.viewStack.selectedIndex);
            }
            if(AppConst.LOGING_CAN_BOOL==false) {
                 shop.getProxy().getGoodsDate();
            }
            
            this.itemList.itemRenderer = shop.ShopItemItemRenderer;
            
        }
         upGoodsDate():void
         {
             var dataProvider: eui.ArrayCollection = new eui.ArrayCollection(shop.getProxy().shopItems);
             this.itemList.dataProvider = dataProvider;
         }

         //tab页按钮触发
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.btnDragIn:
                    this.viewStack.selectedIndex = 0;
                    break;
                case this.btnBuyChip:
                    if(AppConst.LOGING_CAN_BOOL) {
                        this.btnBuyChip.selected = false;
                        this.btnDragIn.selected = true;
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))
                    } else {
                        this.viewStack.selectedIndex = 1;
                    }
                    break;
                case this.btnClose:
                    this.close();
                    break;
                case this.okBtn:
                    var value: number = this.blindsSettingHSlider.value * getTableVO().minJoinMoney
                    __PVO().i(value).to(app.NetAction.MATCH_TAKEIN);                 
                    // 增加提示
                    if(getProxy().mySeatvo) {
                        if(value > getProxy().mySeatvo.nowBet) {
                            tip.SystemCenterTooltip.showTip("下局牌局开始时，将自动补充筹码到" + FormatUtils.wan(value) + "。", tip.TIPS_TYPE.TIPS_CORRECT);
                        } else if (value >= room.getProxy().current.maxBank) {
                            tip.SystemCenterTooltip.showTip("当前牌桌内筹码已超过最大值，无法补充!",tip.TIPS_TYPE.TIPS_WARNING);
                        } else {
                            tip.SystemCenterTooltip.showTip("补充筹码无法小于当前牌桌筹码!",tip.TIPS_TYPE.TIPS_WARNING);
                        }
                    }
                    this.close();
                    break;
            }
        }
        private changeSelecte():void{
              getProxy().isAutoAddBet = this.autoDragIn.selected;
        }
         onBlindsSetting(evt: egret.Event = null): void {
              this.txtDragChip.text = (this.blindsSettingHSlider.value *  getTableVO().minJoinMoney).toString();
                // this.barbg.height = (this.blindsSettingHSlider.value-this.blindsSettingHSlider.minimum) * this.blindsSettingHSlider.width/(this.blindsSettingHSlider.maximum-this.blindsSettingHSlider.minimum); //this.blindsSettingHSlider.thumb.x;
                //  console.log( this.blindsSettingHSlider.value+","+this.blindsSettingHSlider.maximum+","+this.blindsSettingHSlider.width)
        }
    }
}