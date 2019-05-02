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
     *桌子上的筹码
     * @author
     *
     */
    var PlayCardMoneyComp = (function (_super) {
        __extends(PlayCardMoneyComp, _super);
        function PlayCardMoneyComp() {
            var _this = _super.call(this) || this;
            _this.isMany = false;
            _this.isRight = false;
            _this.skinName = "PlayCardsMoneySkin";
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        PlayCardMoneyComp.prototype.setMoney = function (value) {
            this.money = value;
            this.moneylab.text = FormatUtils.wan(value);
            this.moneyicon.source = PlayCardMoneyComp.getIcon(value, this.isMany);
            this.moneyicon.y = this.isMany ? -6 : -1;
            // if (this.isRight) {
            //     this.moneylab.validateNow();
            //      this.anchorOffsetX = this.moneylab.textWidth+25;    
            // }
        };
        PlayCardMoneyComp.prototype.resetxy = function () {
            // if(getProxy().mySeat==-1)
            //     var  px = 0;
            // else    
            //     px = getProxy().mySeat;
            var tableVo = playcards.getTableVO();
            if (tableVo == null) {
                return;
            }
            var index = Number(this.name) - playcards.getProxy().getPX(); //px; 
            var size = tableVo.tableSize;
            if (index < 0)
                index += size;
            this.bgimg.visible = true;
            if (playcards.getProxy().isLive) {
                index = Number(this.name);
                if (index > 2) {
                    this.x = PlayCardMoneyComp.livex[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                }
                else
                    this.x = AppGlobal.stageFullWidth - PlayCardMoneyComp.livex[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                this.y = PlayCardMoneyComp.livey[index] + (768 - AppGlobal.stageFullHeight) * 0.5;
                this.resize(false);
                // this.bgimg.visible = true;
                this.bgimg.source = "img_xiazhu_bg_zr_png";
            }
            else {
                this.bgimg.source = "s9_chip_bg_play_png";
                if (size == 6) {
                    this.x = PlayCardMoneyComp.arll6x[index];
                    this.y = PlayCardMoneyComp.arll6y[index];
                    this.resize(index > 2);
                }
                else if (size == 5) {
                    this.x = PlayCardMoneyComp.arll5x[index];
                    this.y = PlayCardMoneyComp.arll5y[index];
                    this.resize(index > 2);
                }
                else if (size == 3) {
                    this.x = PlayCardMoneyComp.arll3x[index];
                    this.y = PlayCardMoneyComp.arll3y[index];
                    this.resize(index > 1);
                }
                else {
                    this.x = PlayCardMoneyComp.arllx[index];
                    this.y = PlayCardMoneyComp.arlly[index];
                    this.resize(index > 4);
                }
            }
        };
        PlayCardMoneyComp.prototype.resize = function (isright) {
            this.isRight = isright;
            if (isright) {
                this.currentState = "right";
                this.anchorOffsetX = 130;
            }
            else {
                this.currentState = "left";
                this.anchorOffsetX = 0;
            }
        };
        PlayCardMoneyComp.prototype.getIconSource = function () {
            return this.moneyicon.source;
        };
        PlayCardMoneyComp.getIcon = function (value, isMany) {
            var icon;
            var t0;
            var t1;
            var t2;
            if (playcards.getProxy().tableVO != null) {
                var bb = playcards.getProxy().tableVO.bbBet;
                if (isMany) {
                    icon = "1";
                    t0 = bb * 48;
                    t1 = t0 * 120;
                    t2 = t0 * 200;
                }
                else {
                    icon = "";
                    t0 = bb * 3;
                    t1 = t0 * 6;
                    t2 = t0 * 9;
                }
                if (value <= t0) {
                    icon = PlayCardMoneyComp.icon + icon + "0_png";
                }
                else if (value <= t1) {
                    icon = PlayCardMoneyComp.icon + icon + "1_png";
                }
                else if (value <= t2) {
                    icon = PlayCardMoneyComp.icon + icon + "2_png";
                }
                else
                    icon = PlayCardMoneyComp.icon + icon + "3_png";
            }
            else
                icon = PlayCardMoneyComp.icon + icon + "0_png";
            return icon;
        };
        // public static sMoneyItemPool: Array<PlayCardMoneyComp> = [];
        PlayCardMoneyComp.fromPool = function () {
            // if(PlayCardMoneyComp.sMoneyItemPool.length)
            //     return PlayCardMoneyComp.sMoneyItemPool.pop();
            // else
            return new PlayCardMoneyComp();
        };
        PlayCardMoneyComp.toPool = function (money) {
            // money.isMany = false;
            // money.bgimg.visible = false;
            // money.resize(false); 
            // money.anchorOffsetX = 0;
            // if(PlayCardMoneyComp.sMoneyItemPool.length<5&&PlayCardMoneyComp.sMoneyItemPool.indexOf(money) == -1)
            //     PlayCardMoneyComp.sMoneyItemPool.push(money);
        };
        return PlayCardMoneyComp;
    }(eui.Component));
    PlayCardMoneyComp.arllx = [549, 271, 236, 275, 373, 743, 854, 891, 839];
    PlayCardMoneyComp.arlly = [449, 438, 367, 267, 210, 210, 267, 366, 438];
    PlayCardMoneyComp.arll6x = [549, 271, 360, 760, 889, 840];
    PlayCardMoneyComp.arll6y = [449, 438, 210, 210, 290, 438];
    PlayCardMoneyComp.arll5x = [549, 271, 360, 760, 840];
    PlayCardMoneyComp.arll5y = [449, 438, 210, 210, 438];
    PlayCardMoneyComp.arll3x = [549, 222, 902];
    PlayCardMoneyComp.arll3y = [449, 316, 316];
    PlayCardMoneyComp.livex = [95, 95, 95, 7, 7, 7, -200, -200, -200];
    PlayCardMoneyComp.livey = [218, 368, 518, 518, 368, 218, -200, -200, -200];
    PlayCardMoneyComp.icon = "icon_play_chouma_type_";
    playcards.PlayCardMoneyComp = PlayCardMoneyComp;
    __reflect(PlayCardMoneyComp.prototype, "playcards.PlayCardMoneyComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardMoneyComp.js.map