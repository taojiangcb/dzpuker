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
    var HappyBetItemComp = (function (_super) {
        __extends(HappyBetItemComp, _super);
        // public xnum: eui.Image;
        function HappyBetItemComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "HappyBetItemSkin";
            _this.allMoney = [];
            return _this;
        }
        HappyBetItemComp.prototype.clear = function () {
            this.allmoneylab.text = "";
            this.mymoneylab.text = "";
            /*this.xnum.visible =*/
            this.resultbg.visible = false;
            this.showLight(false, 0);
            this.removeAllMoney();
            this.resetSelect();
        };
        /**是否可以加注 */
        HappyBetItemComp.prototype.resetSelect = function () {
            var id = Number(this.name);
            var canAddbet = happy.getProxy().canAddbet(id);
            if (canAddbet > 0) {
                this.canAddimg.visible = true;
                this.addLab.source = "img_word_happy_djxz_png";
            }
            else {
                this.canAddimg.visible = false;
                this.addLab.source = "img_word_happy_ydsx_png";
            }
            // if (canAddbet ==0) {
            this.cardimg.source = "icon_happy_p_" + (id + 1) + "_png";
            // } else
            // this.cardimg.source = "icon_happy_p_" + (id + 1) + "1_png";
            this.addLab.visible = canAddbet != -1;
        };
        HappyBetItemComp.prototype.removeAllMoney = function () {
            for (var i = this.allMoney.length - 1; i > -1; i--) {
                this.allMoney[i].remove();
            }
            this.allMoney = [];
        };
        HappyBetItemComp.prototype.setBet = function (value) {
            if (value > 0) {
                this.allmoneylab.text = FormatUtils.wan(value) + "";
            }
            else {
                this.allmoneylab.text = "";
            }
        };
        HappyBetItemComp.prototype.setMyBet = function (value) {
            if (value > 0) {
                this.mymoneylab.textColor = 0xffffff;
                this.mymoneylab.text = FormatUtils.wan(value) + "";
                this.resultbg.visible = true;
            }
            else {
                this.mymoneylab.text = "";
                this.resultbg.visible = false;
            }
        };
        HappyBetItemComp.prototype.showAddBet = function (fromx, fromy, moneytype, sound) {
            if (sound === void 0) { sound = utils.SoundUtils.chipfly; }
            if (this.allMoney.length > 100)
                this.allMoney.shift().remove(); //筹码上线100个 
            var tox = 5 + Math.random() * 80 + this.x;
            var toy = 30 + Math.random() * 40 + this.y;
            var money = happy.MoveImage.fromPool();
            money.source = moneytype;
            this.parent.addChild(money);
            money.goto(fromx, fromy, tox, toy, 500, sound);
            this.allMoney.push(money);
            if (sound != null) {
                var index = Number(this.name);
                this.setBet(happy.getTableVO().allbets[index]);
                this.setMyBet(happy.getProxy().mySeatvo.getBet(index));
            }
        };
        HappyBetItemComp.prototype.showBet = function (endVO, remove) {
            var len = this.allMoney.length;
            if (len > 0 && endVO.allShowPos.length > 0) {
                endVO.itemlen = Math.ceil(len / endVO.allShowPos.length);
                for (var i = len - 1; i > -1; i--) {
                    var xy = endVO.getXY(i);
                    if (remove)
                        var money = this.allMoney.pop();
                    else
                        money = this.allMoney[i];
                    money.goto(money.x, money.y, xy[0], xy[1], remove ? 1000 : 500, null, remove, remove ? xy[3] * 20 : 0);
                }
            }
        };
        HappyBetItemComp.prototype.showLight = function (value, type) {
            if (value) {
                if (type > playcards.CardsResult.FLUSH) {
                    if (this.lightmv == null) {
                        this.lightmv = new egret.MovieClip(happy.getProxy().getFaceFactory().generateMovieClipData("light"));
                        this.lightmv.x = -13;
                        this.lightmv.y = 18;
                        this.lightmv.touchEnabled = false;
                    }
                    this.addChild(this.lightmv);
                    this.lightmv.play(-1);
                }
                else
                    this.betwinimg.visible = true;
            }
            else {
                this.betwinimg.visible = false;
                if (this.lightmv) {
                    this.lightmv.stop();
                    this.lightmv.removeFromParent();
                }
            }
        };
        HappyBetItemComp.prototype.showType = function (win, type) {
            var add = 0;
            if (happy.getProxy().myEndInfo) {
                add = happy.getProxy().myEndInfo.posWin[Number(this.name)];
            }
            if (add > 0) {
                this.mymoneylab.text = "+" + FormatUtils.wan(add);
                this.mymoneylab.textColor = 0xE7B877;
                this.resultbg.visible = true;
                this.mymoneylab.visible = true;
            }
            else if (add < 0) {
                this.mymoneylab.text = FormatUtils.wan(add);
                this.mymoneylab.textColor = 0xB9B9B9;
                this.resultbg.visible = true;
                this.mymoneylab.visible = true;
            }
            // var addstr: string = "1";
            // if(win) addstr = ""
            // if (type > 1) {
            // 	this.xnum.visible = true;
            // 	this.xnum.source = "img_word_happy_x" + type + addstr + "_png";
            // }else this.xnum.visible = false;
            this.showLight(win, type);
        };
        return HappyBetItemComp;
    }(gameabc.UICustomComponent));
    happy.HappyBetItemComp = HappyBetItemComp;
    __reflect(HappyBetItemComp.prototype, "happy.HappyBetItemComp");
})(happy || (happy = {}));
//# sourceMappingURL=HappyBetItemComp.js.map