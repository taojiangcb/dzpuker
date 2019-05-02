var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/4/7.
 */
var shop;
(function (shop) {
    var VipPanel = (function () {
        function VipPanel(view) {
            //面板是否是显示状态
            this.$active = false;
            this.vipView = null;
            this.downTimeId = 0;
            this.uiModule = view;
        }
        VipPanel.prototype.init = function () {
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
        };
        VipPanel.prototype.initDatas = function () {
            var tables = shop.getProxy().createVipDataView();
            var dataProvider = new eui.ArrayCollection(tables);
            this.vipTable.dataProvider = dataProvider;
        };
        VipPanel.prototype.btnListener = function () {
            this.buyVip1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            this.buyVip2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            this.buyVip3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            this.buyVip4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            this.buyVip5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        };
        VipPanel.prototype.btnRemoveListener = function () {
            this.buyVip1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            this.buyVip2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            this.buyVip3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            this.buyVip4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            this.buyVip5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        };
        VipPanel.prototype.touchHandler = function (event) {
            var tag = event.currentTarget;
            var templateId = 0;
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
                templateId = 4;
            }
            else if (tag == this.buyVip5) {
                templateId = 5;
            }
            PaymentInterface.payForProduct("orderId", "productId111", "productName", "productPrice", "productCount", "roleId", "roleName", "roleGrade", "roleBalance", "serverId", "notifyUrl", "ext");
            var myVipTemplate = user.getProxy().vipInfo.vipTemplateId;
            if (templateId < myVipTemplate) {
                var pop_str = gameabc.getMessage("NOT_BUY_LOW_VIP");
                tip.popSysBottomTip(pop_str);
                return;
            }
            var viptempate = shop.getProxy().getVipTemplateById(templateId);
            if (viptempate) {
                var title = gameabc.getMessage("BUY_VIP_TITLE");
                var str_param = gameabc.getMessage("BUY_MEMBER_PROMPT", viptempate.price, viptempate.name);
                tip.Alert.show(str_param, title, tip.CONFIRM, function (flag, data) {
                    if (flag == tip.YES) {
                        var param = new appvos.ParamVO();
                        param.intValues = [templateId];
                        __SEND_NOTIFICATION(app.NetAction.BUY_VIP, param);
                    }
                }, null, this, true);
            }
        };
        VipPanel.prototype.vipTiming = function () {
            if (this.downTimeId > 0) {
                egret.clearInterval(this.downTimeId);
                this.downTimeId = 0;
            }
            var vipState = user.getProxy().vipIsExpired;
            if (vipState == 0) {
                this.downTimeId = egret.setInterval(this.updateTimeing, this, 1000);
                this.updateTimeing();
            }
            else if (vipState == 1) {
                this.txtVipField.text = gameabc.getMessage("VIP_IS_EXPIRED");
            }
            else {
                this.txtVipField.text = gameabc.getMessage("DEFAULT_VIP_STATE");
            }
        };
        VipPanel.prototype.updateTimeing = function () {
            var downTime = user.getProxy().vipInfo.rewardEndTime - app.SystemTimer.getServerTime();
            var date_str = DateUtils.DayTimeStampFormat(downTime / 1000);
            this.txtVipField.text = user.getProxy().vipName + ":" + date_str;
        };
        VipPanel.prototype.dispose = function () {
            if (this.buyVip1)
                __UNBIND_CLICK(this.buyVip1);
            if (this.buyVip2)
                __UNBIND_CLICK(this.buyVip2);
            if (this.buyVip3)
                __UNBIND_CLICK(this.buyVip3);
            if (this.buyVip4)
                __UNBIND_CLICK(this.buyVip4);
            if (this.buyVip5)
                __UNBIND_CLICK(this.buyVip5);
            this.btnRemoveListener();
            if (this.downTimeId > 0) {
                egret.clearInterval(this.downTimeId);
                this.downTimeId = 0;
            }
        };
        Object.defineProperty(VipPanel.prototype, "active", {
            get: function () {
                return this.$active;
            },
            set: function (val) {
                this.$active = val;
                this.vipView.visible = this.$active;
            },
            enumerable: true,
            configurable: true
        });
        return VipPanel;
    }());
    shop.VipPanel = VipPanel;
    __reflect(VipPanel.prototype, "shop.VipPanel");
})(shop || (shop = {}));
//# sourceMappingURL=VipPanel.js.map