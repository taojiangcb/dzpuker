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
     *奖池 边池显示
     * @author
     *
     */
    var PlaycardsSidePotComp = (function (_super) {
        __extends(PlaycardsSidePotComp, _super);
        function PlaycardsSidePotComp() {
            var _this = _super.call(this) || this;
            _this.allmoney = [];
            _this.itemwidth = 120;
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        /*显示所有底池*/
        PlaycardsSidePotComp.prototype.showAllBet = function () {
            if (this.sidepotlab == null) {
                this.sidepotlab = new eui.Label();
                this.sidepotlab.textAlign = egret.HorizontalAlign.CENTER;
                this.sidepotlab.width = 200;
                this.sidepotlab.x = -100;
                this.sidepotlab.size = 18;
                //                this.sidepotlab.bold = true;
                this.sidepotlab.textColor = playcards.getProxy().isLive ? 0xFFFFFF : 0x9dffbf;
                this.sidepotlab.y = -28;
                this.addChild(this.sidepotlab);
            }
            var total = playcards.getProxy().getTotalBet();
            if (total > 0)
                this.sidepotlab.text = "总底池:" + FormatUtils.wan(total);
            else
                this.sidepotlab.text = "";
        };
        PlaycardsSidePotComp.prototype.setalldata = function (da) {
            if (da == null)
                da = [];
            if (playcards.getTableVO().gameStatus != playcards.getProxy().GAME_STATUS_PERFLOP && da.length == 0) {
                // var allseat: appvos.SeatPlayerVO[] = getTableVO().seatPlayerVO;
                // var all:number = 0;
                // for(var i: number = 0,len = allseat.length;i<len;i++){
                //     var vo = allseat[i];
                //     all += vo.totalBet;
                // }
                var all = playcards.getProxy().getTotalBet();
                if (all > 0)
                    da = [all];
            }
            var len = da.length;
            if (len == 1 && da[0] == 0) {
                da.pop();
                len = 0;
            }
            // if (len > 0)
            //     getTableVO().totalBet = da[0];
            // else
            //     getTableVO().totalBet = 0;
            var money;
            while (this.allmoney.length != len) {
                if (this.allmoney.length < len) {
                    money = playcards.PlayCardMoneyComp.fromPool();
                    // money.bgimg.visible = getProxy().isLive;
                    money.isMany = true;
                    this.addChild(money);
                    this.allmoney.push(money);
                }
                else if (this.allmoney.length > len) {
                    money = this.allmoney.pop();
                    this.removeChild(money);
                    playcards.PlayCardMoneyComp.toPool(money);
                }
            }
            var c = Math.min(len, 4);
            var px = (-this.itemwidth >> 1) * c;
            for (var i = 0; i < len; i++) {
                money = this.allmoney[i];
                money.setMoney(da[i]);
                money.x = (i % 4) * this.itemwidth + px;
                money.y = 35 * Math.floor(i / 4);
            }
        };
        /*移除最后一个边池*/
        PlaycardsSidePotComp.prototype.removeLastMoney = function () {
            var money;
            money = this.allmoney.pop();
            if (money != null) {
                this.removeChild(money);
                playcards.PlayCardMoneyComp.toPool(money);
                return money;
            }
        };
        PlaycardsSidePotComp.prototype.clearAll = function () {
            if (this.sidepotlab)
                this.sidepotlab.text = "";
            while (this.allmoney.length > 0) {
                this.removeLastMoney();
            }
        };
        PlaycardsSidePotComp.prototype.resetLive = function () {
            var isLive = playcards.getProxy().isLive;
            if (this.sidepotlab != null)
                this.sidepotlab.textColor = isLive ? 0xFFFFFF : 0x9dffbf;
            //  for (var i: number = 0,len =this.allmoney.length  ; i < len; i++) {
            //      this.allmoney[i].bgimg.visible = isLive;
            // }
        };
        return PlaycardsSidePotComp;
    }(eui.Component));
    playcards.PlaycardsSidePotComp = PlaycardsSidePotComp;
    __reflect(PlaycardsSidePotComp.prototype, "playcards.PlaycardsSidePotComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlaycardsSidePotComp.js.map