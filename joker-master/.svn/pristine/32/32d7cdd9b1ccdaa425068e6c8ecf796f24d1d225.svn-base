/**
 * Created by JiangTao on 2016/4/6.
 */
module shop {
    export class ShopMediator extends app.mvc.AbstractMediator {
        
        static NAME:string = "__SHOP_MEDIATOR__";
        constructor(name?:string,view?:any){
            super(ShopMediator.NAME,view);
        }

        listNotificationInterests():string[] {
            return [
                app.constant.AppMediatorConst.PAY_SUCCEED_ALERT,
                app.constant.AppMediatorConst.BUY_VIP_SUCCEED,
                app.constant.AppMediatorConst.COVERAGE_VIP_SUCCEED,
                app.constant.AppMediatorConst.PAY_SUCCEED_ITMES,
                app.NetAction.RE_GET_PROP_ATTRS
            ];
        }

        handleNotification(notification:puremvc.INotification):void {
            var notificationName:string = notification.getName();
            var prompt_str:string = "";
            switch(notificationName) {
                case app.constant.AppMediatorConst.PAY_SUCCEED_ALERT:
                    prompt_str = gameabc.getMessage("BUY_PAY_SUCCEED");
                    tip.popSysBottomTip(prompt_str);
                    this.shopView.updateSilver();
                    break;
                case app.constant.AppMediatorConst.BUY_VIP_SUCCEED:
                    var vipInfo:appvos.VipVO = <appvos.VipVO>notification.getBody();
                    var vipTemplate:shop.VIPTemplateVO = shop.getProxy().getVipTemplateById(vipInfo.vipTemplateId);
                    var days:number = ((vipInfo.rewardEndTime - vipInfo.vipGenerate) / DateUtils.DAY_TIME) - Math.max(0,Math.floor((app.SystemTimer.getServerTime() - vipInfo.vipGenerate) / DateUtils.DAY_TIME));
                    prompt_str = gameabc.getMessage("BUY_MEMBER_SUCCEED", vipTemplate.name, days);
                    //award.show(prompt_str, "img_word_shop_goumaichenggong_png", vipTemplate.presenter,
                    //    (reward:number)=> {
                    //        var silver:number = user.getProxy().roleVo.silver;
                    //        user.getProxy().roleVo.silver = Number(silver) + Number(reward);
                    //        if (this.shopView) this.shopView.updateSilver();
                    //        tip.popSysTip("+" + reward);
                    //    }, [vipTemplate.presenter], this);
                    this.showReward(prompt_str,vipTemplate.presenter);
                    if(this.shopView && this.shopView.vipPanel) {
                        this.shopView.vipPanel.vipTiming();
                    }
                    break;
                case app.constant.AppMediatorConst.COVERAGE_VIP_SUCCEED:
                    var vipInfo:appvos.VipVO = <appvos.VipVO>notification.getBody()[0];
                    var vipTemplate:shop.VIPTemplateVO = shop.getProxy().getVipTemplateById(vipInfo.vipTemplateId);
                    var silverAdd:number = Number(notification.getBody()[1]);
                    prompt_str = gameabc.getMessage("CONVERAGE_VIP_SUCCEED");
                    //award.show(prompt_str, "img_word_shop_goumaichenggong_png", silverAdd + vipTemplate.presenter,
                    //    (reward:number)=> {
                    //        var silver:number = user.getProxy().roleVo.silver;
                    //        user.getProxy().roleVo.silver = Number(silver) + Number(reward);
                    //        if (this.shopView) this.shopView.updateSilver();
                    //        tip.popSysTip("+" + reward);
                    //    }, [vipTemplate.presenter + silverAdd],this);
                    this.showReward(prompt_str,vipTemplate.presenter + silverAdd);
                    if(this.shopView && this.shopView.vipPanel) {
                        this.shopView.vipPanel.vipTiming();
                    }
                    break;
                    
                case app.constant.AppMediatorConst.PAY_SUCCEED_ITMES:
                    if(this.shopView && this.shopView.shopPanel) {
                        this.shopView.shopPanel.initDatas();
                    }
                    if(this.playBuyView) {
                        this.playBuyView.upGoodsDate();
                    }
                break

                 case app.NetAction.RE_GET_PROP_ATTRS:
                    if(this.shopView && this.shopView.propPanel) {
                        this.shopView.propPanel.initDatas();
                    }
                break
            }
        }

        showReward(prompt_str:string,silver:number):void {
            award.show(prompt_str, "img_word_shop_goumaichenggong_png", silver,
                (reward:number)=> {
                    var silver:number = user.getPlayerInfo().silver;
                    user.getPlayerInfo().silver = Number(silver) + Number(reward);
                    if (this.shopView) this.shopView.updateSilver();
                    tip.popSysBottomTip("+" + reward);
                }, [silver], this);
        }
        get playBuyView(): playcards.PlayCardBuyUIModuleComp {
            return <playcards.PlayCardBuyUIModuleComp>__GET_MOUDLE_COMP(AppReg.APP_PLAY_BUY);
        }
        get shopView():shop.ShopWinModule{
            return <shop.ShopWinModule>__GET_MOUDLE_COMP(AppReg.SHOP_WIN);
        }
    }
}