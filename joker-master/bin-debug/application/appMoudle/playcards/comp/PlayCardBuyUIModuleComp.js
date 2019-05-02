var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JiangTao on 2016/4/21.
 */
var playcards;
(function (playcards) {
    /**
     * 带入购买界面
     */
    var PlayCardBuyUIModuleComp = (function (_super) {
        __extends(PlayCardBuyUIModuleComp, _super);
        // barbg:eui.Image;//滑条背景
        function PlayCardBuyUIModuleComp() {
            var _this = _super.call(this) || this;
            //this.horizontalCenter=0;
            //this.verticalCenter=0;
            _this.skinName = "resource/app_skin/playcards/buy/PlayBuyModuleSkin.exml";
            return _this;
        }
        PlayCardBuyUIModuleComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.tabGroup = new uicomps.ButtonGroup();
            this.tabGroup.add(this.btnDragIn);
            this.tabGroup.add(this.btnBuyChip);
            this.tabGroup.itemThisObj = this;
            this.tabGroup.itemClick = this.touchHandler;
            this.tabGroup.select(this.btnDragIn);
            this.bindButton(this.okBtn);
            this.bindButton(this.btnClose);
            this.blindsSettingHSlider.addEventListener(egret.Event.CHANGE, this.onBlindsSetting, this);
            // this.blindsSettingHSlider.thumb.addEventListener(egret.Event.RESIZE, this.onBlindsSetting, this);
            //            if(getProxy().mySeatvo)
            var laycardProxy = playcards.getProxy();
            var nowBet = 0;
            var totalBet = 0;
            if (laycardProxy.mySeatvo) {
                nowBet = laycardProxy.mySeatvo.nowBet ? laycardProxy.mySeatvo.nowBet : 0;
                totalBet = laycardProxy.mySeatvo.totalBet ? laycardProxy.mySeatvo.totalBet : 0;
            }
            this.txtChip.text = (user.getProxy().svrGameData.silver - nowBet - totalBet).toString(); // getProxy().mySeatvo.nowBet+""//user.getPlayerInfo().silver.toString();
            var tablevo = playcards.getTableVO();
            this.autoDragIn.selected = laycardProxy.isAutoAddBet;
            this.autoDragIn.addEventListener(egret.Event.CHANGE, this.changeSelecte, this);
            this.txtMin.text = tablevo.minJoinMoney + "";
            this.txtMax.text = (tablevo.minJoinMoney * tablevo.maxMagnification) + "";
            this.blindsSettingHSlider.minimum = 1;
            this.blindsSettingHSlider.value = this.blindsSettingHSlider.maximum = tablevo.maxMagnification;
            //            this.txtDragChip.text = (this.blindsSettingHSlider.value * tablevo.minJoinMoney).toString();
            //            this.barbg.height = 0;
            this.onBlindsSetting();
            if (this.uiOpenData != null) {
                this.viewStack.selectedIndex = this.uiOpenData;
                this.tabGroup.selectIndex(this.viewStack.selectedIndex);
            }
            if (AppConst.LOGING_CAN_BOOL == false) {
                shop.getProxy().getGoodsDate();
            }
            this.itemList.itemRenderer = shop.ShopItemItemRenderer;
        };
        PlayCardBuyUIModuleComp.prototype.upGoodsDate = function () {
            var dataProvider = new eui.ArrayCollection(shop.getProxy().shopItems);
            this.itemList.dataProvider = dataProvider;
        };
        //tab页按钮触发
        PlayCardBuyUIModuleComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btnDragIn:
                    this.viewStack.selectedIndex = 0;
                    break;
                case this.btnBuyChip:
                    if (AppConst.LOGING_CAN_BOOL) {
                        this.btnBuyChip.selected = false;
                        this.btnDragIn.selected = true;
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
                    }
                    else {
                        this.viewStack.selectedIndex = 1;
                    }
                    break;
                case this.btnClose:
                    this.close();
                    break;
                case this.okBtn:
                    var value = this.blindsSettingHSlider.value * playcards.getTableVO().minJoinMoney;
                    __PVO().i(value).to(app.NetAction.MATCH_TAKEIN);
                    // 增加提示
                    if (playcards.getProxy().mySeatvo) {
                        if (value > playcards.getProxy().mySeatvo.nowBet) {
                            tip.SystemCenterTooltip.showTip("下局牌局开始时，将自动补充筹码到" + FormatUtils.wan(value) + "。", tip.TIPS_TYPE.TIPS_CORRECT);
                        }
                        else if (value >= room.getProxy().current.maxBank) {
                            tip.SystemCenterTooltip.showTip("当前牌桌内筹码已超过最大值，无法补充!", tip.TIPS_TYPE.TIPS_WARNING);
                        }
                        else {
                            tip.SystemCenterTooltip.showTip("补充筹码无法小于当前牌桌筹码!", tip.TIPS_TYPE.TIPS_WARNING);
                        }
                    }
                    this.close();
                    break;
            }
        };
        PlayCardBuyUIModuleComp.prototype.changeSelecte = function () {
            playcards.getProxy().isAutoAddBet = this.autoDragIn.selected;
        };
        PlayCardBuyUIModuleComp.prototype.onBlindsSetting = function (evt) {
            if (evt === void 0) { evt = null; }
            this.txtDragChip.text = (this.blindsSettingHSlider.value * playcards.getTableVO().minJoinMoney).toString();
            // this.barbg.height = (this.blindsSettingHSlider.value-this.blindsSettingHSlider.minimum) * this.blindsSettingHSlider.width/(this.blindsSettingHSlider.maximum-this.blindsSettingHSlider.minimum); //this.blindsSettingHSlider.thumb.x;
            //  console.log( this.blindsSettingHSlider.value+","+this.blindsSettingHSlider.maximum+","+this.blindsSettingHSlider.width)
        };
        return PlayCardBuyUIModuleComp;
    }(app.base.BaseWndUIMoudleComponent));
    playcards.PlayCardBuyUIModuleComp = PlayCardBuyUIModuleComp;
    __reflect(PlayCardBuyUIModuleComp.prototype, "playcards.PlayCardBuyUIModuleComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardBuyUIModuleComp.js.map