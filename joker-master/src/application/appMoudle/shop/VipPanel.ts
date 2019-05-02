/**
 * Created by JiangTao on 2016/4/7.
 */
module shop {
    export class VipPanel {
        uiModule:ShopWinModule;

         //面板是否是显示状态
        $active:boolean = false;
        vipView:eui.Group = null;
        vipTable:eui.List;

        buyVip1:eui.Button;
        buyVip2:eui.Button;
        buyVip3:eui.Button;
        buyVip4:eui.Button;
        buyVip5:eui.Button;
        txtVipField:eui.Label;
        downTimeId:number = 0;

        constructor(view:ShopWinModule) {
            this.uiModule = view;
        }

        init():void {
            this.vipView = this.uiModule.vipView;
            this.vipTable = this.uiModule.vipTable;
            this.vipTable.itemRenderer = shop.VipRowItemRenderer;

            this.buyVip1 = this.uiModule.buyVip1;
            this.buyVip2 = this.uiModule.buyVip2;
            this.buyVip3 = this.uiModule.buyVip3;
            this.buyVip4 = this.uiModule.buyVip4;
            this.buyVip5 = this.uiModule.buyVip5;

            this.txtVipField = this.uiModule.txtVipField;

            __BIND_CLICK(this.buyVip1);
            __BIND_CLICK(this.buyVip2);
            __BIND_CLICK(this.buyVip3);
            __BIND_CLICK(this.buyVip4);
            __BIND_CLICK(this.buyVip5);

            this.btnListener();
        }

        initDatas():void {
            var tables:shop.VIPRowData[] = shop.getProxy().createVipDataView();
            var dataProvider:eui.ArrayCollection = new eui.ArrayCollection(tables);
            this.vipTable.dataProvider = dataProvider;
        }

        private btnListener():void {
            this.buyVip1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
            this.buyVip2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
            this.buyVip3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
            this.buyVip4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
            this.buyVip5.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        }

        private btnRemoveListener():void {
            this.buyVip1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
            this.buyVip2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
            this.buyVip3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
            this.buyVip4.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
            this.buyVip5.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
        }

        touchHandler(event:egret.TouchEvent):void {
            var tag:egret.DisplayObject = event.currentTarget;
            var templateId:number = 0;
            if (tag == this.buyVip1) {
                templateId = 1;
            }
            else if (tag == this.buyVip2) {
                templateId = 2;
            }
            else if (tag == this.buyVip3) {
                templateId = 3;
            }
            else if (tag == this.buyVip4) {
                templateId = 4
            }
            else if (tag == this.buyVip5) {
                templateId = 5;
            }
            PaymentInterface.payForProduct("orderId","productId111","productName","productPrice","productCount","roleId","roleName","roleGrade","roleBalance","serverId","notifyUrl","ext")
               

            var myVipTemplate:number = user.getProxy().vipInfo.vipTemplateId;
            if(templateId < myVipTemplate) {
                var pop_str:string = gameabc.getMessage("NOT_BUY_LOW_VIP");
                tip.popSysBottomTip(pop_str);
                return;
            }

            var viptempate:shop.VIPTemplateVO = shop.getProxy().getVipTemplateById(templateId);
            if (viptempate) {
                var title:string = gameabc.getMessage("BUY_VIP_TITLE");
                var str_param:string = gameabc.getMessage("BUY_MEMBER_PROMPT",viptempate.price,viptempate.name);
                tip.Alert.show(str_param,title,tip.CONFIRM,(flag:number,data:any)=>{
                    if(flag == tip.YES) {
                        var param:appvos.ParamVO = new appvos.ParamVO();
                        param.intValues = [templateId];
                        __SEND_NOTIFICATION(app.NetAction.BUY_VIP,param);
                    }
                },null,this,true)
            }
        }

        vipTiming():void {
            if (this.downTimeId > 0) {
                egret.clearInterval(this.downTimeId);
                this.downTimeId = 0;
            }

            var vipState:number = user.getProxy().vipIsExpired;
            if (vipState == 0) {
                this.downTimeId = egret.setInterval(this.updateTimeing,this,1000);
                this.updateTimeing();
            }
            else if (vipState == 1) {
                this.txtVipField.text = gameabc.getMessage("VIP_IS_EXPIRED");
            }
            else {
                this.txtVipField.text = gameabc.getMessage("DEFAULT_VIP_STATE");
            }
        }

        updateTimeing():void {
             var downTime:number = user.getProxy().vipInfo.rewardEndTime - app.SystemTimer.getServerTime();
                    var date_str:string = DateUtils.DayTimeStampFormat(downTime / 1000);
                    this.txtVipField.text = user.getProxy().vipName + ":" + date_str;
        }

        dispose():void {
            if(this.buyVip1) __UNBIND_CLICK(this.buyVip1);
            if(this.buyVip2) __UNBIND_CLICK(this.buyVip2);
            if(this.buyVip3) __UNBIND_CLICK(this.buyVip3);
            if(this.buyVip4) __UNBIND_CLICK(this.buyVip4);
            if(this.buyVip5) __UNBIND_CLICK(this.buyVip5);
            this.btnRemoveListener();

             if (this.downTimeId > 0) {
                egret.clearInterval(this.downTimeId);
                this.downTimeId = 0;
            }

        }

        set active(val:boolean) {
            this.$active = val;
            this.vipView.visible = this.$active;
        }

        get active():boolean {
            return this.$active;
        }
    }
}