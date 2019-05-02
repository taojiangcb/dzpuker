var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var playcards;
(function (playcards) {
    /**
     *
     * @author
     *
     */
    var PlayCardOutMenuComp = (function (_super) {
        __extends(PlayCardOutMenuComp, _super);
        function PlayCardOutMenuComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayCardOutMenuSkin";
            _this.right = 0;
            _this.left = 0;
            _this.top = 0;
            _this.bottom = 90;
            return _this;
        }
        PlayCardOutMenuComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.standuobtn, false);
            this.bindButton(this.changebtn, false);
            this.bindButton(this.tipbtn, false);
            this.bindButton(this.outbtn, false);
            this.bindButton(this.tongjibtn, false);
            this.bindButton(this.bgimage, false);
            this.bindButton(this.setbtn, false);
            this.bindButton(this.linebtn, false);
            this.bindButton(this.safebtn, false);
            this.refBtns();
        };
        PlayCardOutMenuComp.prototype.tweenComp = function () {
            this.isTween = false;
        };
        PlayCardOutMenuComp.prototype.refBtns = function () {
            if (this.initialized) {
                this.allgroup.y = -400;
                this.isTween = true;
                egret.Tween.get(this.allgroup).to({ y: 0 }, 200).call(this.tweenComp, this);
                var currentType = room.getProxy().currentType;
                if (currentType == 3 /* VIP */ || currentType == 9 /* GRIL */ || currentType == 7 /* PK */) {
                    this.btnsGroup.addChildAt(this.standuobtn, 1);
                    this.standuobtn.touchEnabled = playcards.getProxy().tableVO != null && playcards.getProxy().mySeat >= 0;
                    this.standuobtn.alpha = this.standuobtn.touchEnabled ? 1 : 0.5;
                }
                else {
                    this.standuobtn.removeFromParent();
                }
                if (currentType == 3 /* VIP */ || currentType == 7 /* PK */) {
                    this.changebtn.removeFromParent();
                    this.linebtn.removeFromParent();
                }
                else {
                    if (currentType == 9 /* GRIL */)
                        this.changebtn.removeFromParent();
                    else {
                        this.btnsGroup.addChildAt(this.changebtn, 1);
                        this.changebtn.touchEnabled = playcards.getProxy().tableVO != null && !playcards.getProxy().isSingle;
                        this.changebtn.alpha = this.changebtn.touchEnabled ? 1 : 0.5;
                    }
                    this.btnsGroup.addChildAt(this.linebtn, 3);
                }
                if (currentType == 3 /* VIP */)
                    this.btnsGroup.addChild(this.tongjibtn);
                else
                    this.tongjibtn.removeFromParent();
                if (room.getProxy().current && room.getProxy().current.isInsurance) {
                    this.btnsGroup.addChild(this.safebtn);
                }
                else {
                    this.safebtn.removeFromParent();
                }
            }
        };
        // /**正在游戏中 */
        // private isInGame(): boolean{
        //     return getProxy().mySeatvo != null && getProxy().mySeatvo.isPlay && !getProxy().mySeatvo.isFold;
        // }
        PlayCardOutMenuComp.prototype.touchBindButtonHandler = function (clickTarget) {
            if (this.isTween)
                return;
            switch (clickTarget) {
                case this.bgimage:
                    this.isTween = true;
                    egret.Tween.get(this.allgroup).to({ y: -400 }, 200).call(this.removeFromParent, this);
                    return;
                case this.standuobtn:
                    playcards.getProxy().stand();
                    break;
                case this.tipbtn:
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SHOWTIP);
                    break;
                case this.changebtn:
                    if (playcards.getProxy().tableVO != null)
                        playcards.getProxy().change();
                    break;
                case this.outbtn:
                    playcards.getProxy().out();
                    break;
                case this.tongjibtn:
                    if (playcards.getProxy().joinNumber) {
                        __PVO().to(app.NetAction.MATCH_GET_INFO);
                    }
                    else {
                        tip.SystemCenterTooltip.showTip("加密私人房才可察看战绩统计.");
                    }
                    break;
                case this.setbtn:
                    __OPEN_PRE_MOUDLE(AppReg.APP_SETTING_TYPE);
                    break;
                case this.linebtn:
                    mc2sdk.event(50065 /* HISTORY_LINE */);
                    __OPEN_PRE_MOUDLE(AppReg.APP_BANK_LINE, [room.getProxy().current.maxBank,
                        playcards.getProxy().lineHistory.length,
                        playcards.getProxy().lineHistory,
                        playcards.getProxy().lineHistoryFixed,
                        happy.ROOM_TYPE.NORMAL]);
                    break;
                case this.safebtn:
                    __OPEN_PRE_MOUDLE(AppReg.SAFE_HELP, null, null, null, this.view.mainview);
                    break;
            }
            this.removeFromParent();
        };
        PlayCardOutMenuComp.prototype.close = function () {
            this.removeFromParent();
        };
        return PlayCardOutMenuComp;
    }(gameabc.UICustomComponent));
    playcards.PlayCardOutMenuComp = PlayCardOutMenuComp;
    __reflect(PlayCardOutMenuComp.prototype, "playcards.PlayCardOutMenuComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardOutMenuComp.js.map