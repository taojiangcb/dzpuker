var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var happy;
(function (happy) {
    var HookUIModule = (function (_super) {
        __extends(HookUIModule, _super);
        function HookUIModule() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/app_skin/playcards/HookUIModule.exml";
            return _this;
        }
        HookUIModule.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.hook_btn.touchChildren = false;
            this.hook_btn.touchEnabled = true;
            this.bindButton(this.btnClose);
            this.bindButton(this.hook_btn);
            this.bindButton(this.condition1, false);
            this.bindButton(this.condition2, false);
            this.bindButton(this.condition3, false);
            this.bindButton(this.edit_1);
            this.bindButton(this.edit_2);
            this.bindButton(this.edit_3);
            this.bindButton(this.profit_1, false);
            this.bindButton(this.profit_2, false);
            this.bindButton(this.over_num, false);
            this.bindButton(this.bet_full, false);
            this.bindButton(this.bet_1, false);
            this.bindButton(this.bet_2, false);
            this.coditionGroup = new eui.RadioButtonGroup();
            this.betGroup = new eui.RadioButtonGroup();
            this.condition1.group = this.condition2.group = this.condition3.group = this.coditionGroup;
            this.bet_full.group = this.bet_1.group = this.bet_2.group = this.betGroup;
            this.dataChanged();
        };
        HookUIModule.prototype.touchBindButtonHandler = function (tag) {
            var _this = this;
            var btn = tag;
            var minBank = room.getProxy().current ? room.getProxy().current.minBank : 0;
            var hkInfo = happy.getProxy().hookInfo;
            if (btn == this.btnClose) {
                this.close();
            }
            else if (btn == this.hook_btn) {
                this.saveHook();
                if (happy.getProxy().hookingFlag) {
                    //开始新的一轮挂机,累计清0
                    hkInfo.totalProfit = hkInfo.gameCount = hkInfo.betCount = 0;
                    mc2sdk.event(50059 /* HOOK_50059 */);
                    this.close();
                }
                else {
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_HOOK);
                    mc2sdk.event(50060 /* HOOK_50060 */);
                }
            }
            else if (btn == this.edit_1 || (btn == this.profit_1 && hkInfo.profitValue == 0)) {
                uicomps.KeyboardUIMoudleComp.show(function (value) {
                    if (value) {
                        mc2sdk.event(50057 /* HOOK_50057 */);
                        hkInfo.profitValue = value;
                        _this.profit_label.text = FormatUtils.wan5(value);
                    }
                    else {
                        _this.profit_1.selected = false;
                        if (value == 0) {
                            hkInfo.profitValue = value;
                            _this.profit_label.text = FormatUtils.wan5(value);
                        }
                    }
                }, this, hkInfo.profitValue == 0 ? "" : hkInfo.profitValue.toString());
            }
            else if (btn == this.edit_2 || (btn == this.profit_2 && hkInfo.loosValue == 0)) {
                uicomps.KeyboardUIMoudleComp.show(function (value) {
                    if (value) {
                        mc2sdk.event(50058 /* HOOK_50058 */);
                        hkInfo.loosValue = value;
                        _this.loose_label.text = FormatUtils.wan5(value);
                    }
                    else {
                        _this.profit_2.selected = false;
                        if (value == 0) {
                            hkInfo.loosValue = value;
                            _this.loose_label.text = FormatUtils.wan5(value);
                        }
                    }
                }, this, hkInfo.loosValue == 0 ? "" : hkInfo.loosValue.toString());
            }
            else if (btn == this.edit_3 || (btn == this.over_num && hkInfo.over_count == 0)) {
                uicomps.KeyboardUIMoudleComp.show(function (value) {
                    if (value) {
                        hkInfo.over_count = value;
                        _this.over_label.text = value.toString() + "局";
                    }
                    else {
                        _this.over_num.selected = false;
                        if (value == 0) {
                            hkInfo.over_count = value;
                            _this.over_label.text = value.toString() + "局";
                        }
                    }
                }, this, hkInfo.over_count == 0 ? "10" : hkInfo.over_count.toString());
            }
            else if (btn == this.condition1) {
                mc2sdk.event(50051 /* HOOK_50051 */);
            }
            else if (btn == this.condition2) {
                mc2sdk.event(50052 /* HOOK_50052 */);
            }
            else if (btn == this.condition3) {
                mc2sdk.event(50053 /* HOOK_50053 */);
            }
            else if (btn == this.bet_full) {
                mc2sdk.event(50054 /* HOOK_50054 */);
            }
            else if (btn == this.bet_1) {
                mc2sdk.event(50055 /* HOOK_50055 */);
            }
            else if (btn == this.bet_2) {
                mc2sdk.event(50056 /* HOOK_50056 */);
            }
        };
        HookUIModule.prototype.close = function () {
            _super.prototype.close.call(this);
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_HOOK);
        };
        /**
         * 数据发生变动的时候刷新
         */
        HookUIModule.prototype.dataChanged = function () {
            var hookInfo = happy.getProxy().hookInfo;
            if (hookInfo) {
                this.game_num.text = hookInfo.gameCount.toString() + "局";
                this.bet_num.text = hookInfo.betCount.toString() + "局";
                this.profit_number.text = FormatUtils.wan5(hookInfo.totalProfit);
                var winRatio = hookInfo.winRatio;
                if (winRatio == happy.WIN_RATIO.zero) {
                    this.condition1.selected = true;
                    this.condition2.selected = this.condition3.selected = false;
                }
                else if (winRatio == happy.WIN_RATIO.fifty) {
                    this.condition2.selected = true;
                    this.condition1.selected = this.condition3.selected = false;
                }
                else if (winRatio == happy.WIN_RATIO.forty) {
                    this.condition3.selected = true;
                    this.condition2.selected = this.condition1.selected = false;
                }
                var bet = hookInfo.betMode;
                if (bet == happy.BET.fold) {
                    this.bet_2.selected = this.bet_full.selected = false;
                    this.bet_1.selected = true;
                }
                else if (bet == happy.BET.folds) {
                    this.bet_1.selected = this.bet_full.selected = false;
                    this.bet_2.selected = true;
                }
                else if (bet == happy.BET.min) {
                    this.bet_1.selected = this.bet_full.selected = false;
                    this.bet_full.selected = true;
                }
                this.profit_1.selected = this.profit_2.selected = this.over_num.selected = false;
                var stopMode = hookInfo.stopProfit;
                if (stopMode) {
                    this.profit_1.selected = true;
                }
                stopMode = hookInfo.stopLoose;
                if (stopMode) {
                    this.profit_2.selected = true;
                }
                stopMode = hookInfo.stopCount;
                if (stopMode) {
                    this.over_num.selected = true;
                }
                this.profit_label.text = FormatUtils.wan5(hookInfo.profitValue);
                this.loose_label.text = FormatUtils.wan5(hookInfo.loosValue);
                this.over_label.text = hookInfo.over_count.toString() + "局";
                var bets = room.getProxy().current ? room.getProxy().current.addBlinds : [0, 0, 0];
                this.bet_num1.text = FormatUtils.wan5((bets[1] * 10 * happy.getProxy().addTimes));
                this.bet_num2.text = FormatUtils.wan5((bets[2] * 2 * happy.getProxy().addTimes));
                this.changeMask();
            }
        };
        /**
         * 保存挂机参数
         */
        HookUIModule.prototype.saveHook = function () {
            var winRatio = 0;
            if (this.coditionGroup.selection == this.condition1) {
                winRatio = happy.WIN_RATIO.zero;
            }
            else if (this.coditionGroup.selection == this.condition2) {
                winRatio = happy.WIN_RATIO.fifty;
            }
            else if (this.coditionGroup.selection == this.condition3) {
                winRatio = happy.WIN_RATIO.forty;
            }
            var bigs = room.getProxy().current ? room.getProxy().current.addBlinds : [0, 0, 0];
            var bigBlinds = room.getProxy().current ? room.getProxy().current.bigBlinds : 0;
            var betMode = happy.BET.min;
            var betValue = 0;
            if (this.betGroup.selection == this.bet_1) {
                betValue = bigs[1] * 10 * happy.getProxy().addTimes;
                betMode = happy.BET.fold;
            }
            else if (this.betGroup.selection == this.bet_2) {
                betValue = bigs[2] * 2 * happy.getProxy().addTimes;
                betMode = happy.BET.folds;
            }
            else if (this.betGroup.selection == this.bet_full) {
                betValue = bigBlinds * 2 * happy.getProxy().addTimes;
                betMode = happy.BET.min;
            }
            var hookInfo = happy.getProxy().hookInfo;
            if (hookInfo) {
                hookInfo.stopProfit = this.profit_1.selected;
                hookInfo.stopLoose = this.profit_2.selected;
                hookInfo.stopCount = this.over_num.selected;
                hookInfo.betMode = betMode;
                hookInfo.betValue = betValue;
                hookInfo.winRatio = winRatio;
            }
            happy.getProxy().hookingFlag = !happy.getProxy().hookingFlag;
            this.changeMask();
        };
        /**
         * 挂机判断
         */
        HookUIModule.prototype.changeMask = function () {
            if (happy.getProxy().hookingFlag) {
                this.maskRect.visible = true;
                this.hooking.visible = true;
                this.imgHooklabel.source = "img_assistant_tzgj_png";
            }
            else {
                this.maskRect.visible = false;
                this.hooking.visible = false;
                this.imgHooklabel.source = "img_assistant_ksgj_png";
            }
        };
        return HookUIModule;
    }(app.base.BaseWndUIMoudleComponent));
    happy.HookUIModule = HookUIModule;
    __reflect(HookUIModule.prototype, "happy.HookUIModule");
})(happy || (happy = {}));
//# sourceMappingURL=HookUIModule.js.map