var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/6.
 */
var shop;
(function (shop) {
    var ShopMediator = (function (_super) {
        __extends(ShopMediator, _super);
        function ShopMediator(name, view) {
            return _super.call(this, ShopMediator.NAME, view) || this;
        }
        ShopMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.PAY_SUCCEED_ALERT,
                app.constant.AppMediatorConst.BUY_VIP_SUCCEED,
                app.constant.AppMediatorConst.COVERAGE_VIP_SUCCEED,
                app.constant.AppMediatorConst.PAY_SUCCEED_ITMES,
                app.NetAction.RE_GET_PROP_ATTRS
            ];
        };
        ShopMediator.prototype.handleNotification = function (notification) {
            var notificationName = notification.getName();
            var prompt_str = "";
            switch (notificationName) {
                case app.constant.AppMediatorConst.PAY_SUCCEED_ALERT:
                    prompt_str = gameabc.getMessage("BUY_PAY_SUCCEED");
                    tip.popSysBottomTip(prompt_str);
                    this.shopView.updateSilver();
                    break;
                case app.constant.AppMediatorConst.BUY_VIP_SUCCEED:
                    var vipInfo = notification.getBody();
                    var vipTemplate = shop.getProxy().getVipTemplateById(vipInfo.vipTemplateId);
                    var days = ((vipInfo.rewardEndTime - vipInfo.vipGenerate) / DateUtils.DAY_TIME) - Math.max(0, Math.floor((app.SystemTimer.getServerTime() - vipInfo.vipGenerate) / DateUtils.DAY_TIME));
                    prompt_str = gameabc.getMessage("BUY_MEMBER_SUCCEED", vipTemplate.name, days);
                    //award.show(prompt_str, "img_word_shop_goumaichenggong_png", vipTemplate.presenter,
                    //    (reward:number)=> {
                    //        var silver:number = user.getProxy().roleVo.silver;
                    //        user.getProxy().roleVo.silver = Number(silver) + Number(reward);
                    //        if (this.shopView) this.shopView.updateSilver();
                    //        tip.popSysTip("+" + reward);
                    //    }, [vipTemplate.presenter], this);
                    this.showReward(prompt_str, vipTemplate.presenter);
                    if (this.shopView && this.shopView.vipPanel) {
                        this.shopView.vipPanel.vipTiming();
                    }
                    break;
                case app.constant.AppMediatorConst.COVERAGE_VIP_SUCCEED:
                    var vipInfo = notification.getBody()[0];
                    var vipTemplate = shop.getProxy().getVipTemplateById(vipInfo.vipTemplateId);
                    var silverAdd = Number(notification.getBody()[1]);
                    prompt_str = gameabc.getMessage("CONVERAGE_VIP_SUCCEED");
                    //award.show(prompt_str, "img_word_shop_goumaichenggong_png", silverAdd + vipTemplate.presenter,
                    //    (reward:number)=> {
                    //        var silver:number = user.getProxy().roleVo.silver;
                    //        user.getProxy().roleVo.silver = Number(silver) + Number(reward);
                    //        if (this.shopView) this.shopView.updateSilver();
                    //        tip.popSysTip("+" + reward);
                    //    }, [vipTemplate.presenter + silverAdd],this);
                    this.showReward(prompt_str, vipTemplate.presenter + silverAdd);
                    if (this.shopView && this.shopView.vipPanel) {
                        this.shopView.vipPanel.vipTiming();
                    }
                    break;
                case app.constant.AppMediatorConst.PAY_SUCCEED_ITMES:
                    if (this.shopView && this.shopView.shopPanel) {
                        this.shopView.shopPanel.initDatas();
                    }
                    if (this.playBuyView) {
                        this.playBuyView.upGoodsDate();
                    }
                    break;
                case app.NetAction.RE_GET_PROP_ATTRS:
                    if (this.shopView && this.shopView.propPanel) {
                        this.shopView.propPanel.initDatas();
                    }
                    break;
            }
        };
        ShopMediator.prototype.showReward = function (prompt_str, silver) {
            var _this = this;
            award.show(prompt_str, "img_word_shop_goumaichenggong_png", silver, function (reward) {
                var silver = user.getPlayerInfo().silver;
                user.getPlayerInfo().silver = Number(silver) + Number(reward);
                if (_this.shopView)
                    _this.shopView.updateSilver();
                tip.popSysBottomTip("+" + reward);
            }, [silver], this);
        };
        Object.defineProperty(ShopMediator.prototype, "playBuyView", {
            get: function () {
                return __GET_MOUDLE_COMP(AppReg.APP_PLAY_BUY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopMediator.prototype, "shopView", {
            get: function () {
                return __GET_MOUDLE_COMP(AppReg.SHOP_WIN);
            },
            enumerable: true,
            configurable: true
        });
        return ShopMediator;
    }(app.mvc.AbstractMediator));
    ShopMediator.NAME = "__SHOP_MEDIATOR__";
    shop.ShopMediator = ShopMediator;
    __reflect(ShopMediator.prototype, "shop.ShopMediator");
})(shop || (shop = {}));
//# sourceMappingURL=ShopMediator.js.map