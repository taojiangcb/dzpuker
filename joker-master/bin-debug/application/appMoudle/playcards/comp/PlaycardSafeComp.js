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
    var PlaycardSafeComp = (function (_super) {
        __extends(PlaycardSafeComp, _super);
        function PlaycardSafeComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlaycardSafeSkin";
            _this.percentWidth = 100;
            _this.percentHeight = 100;
            return _this;
        }
        /*该模块被创建完成后的回调函数*/
        PlaycardSafeComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.bindButton(this.btn_min, false);
            this.bindButton(this.btn_capital, false);
            this.bindButton(this.btn_profit, false);
            this.bindButton(this.btn_max, false);
            this.bindButton(this.quxiaoBtn);
            this.bindButton(this.toubaoBtn);
            this.allbtn = [this.btn_min, this.btn_capital, this.btn_profit, this.btn_max];
        };
        PlaycardSafeComp.prototype.show = function (data) {
            this.view.selectedIndex = playcards.getProxy().buySafe - 1;
            if (playcards.getProxy().buySafe == 1) {
                this.bggroup.visible = true;
                this.select = null;
                this.data = data;
                this.xnum.text = "x" + (data.intValues[1] / 10 + 1);
                egret.clearInterval(this.timesid);
                this.timesid = egret.setInterval(this.updatatime, this, 1000);
                this.lefttime = data.intValues[2];
                this.updatatime();
                this.img_light.visible = this.mess.visible = false;
                var max = this.data.longValues[3];
                var isSelect = false;
                for (var i = 0; i < 3; i++) {
                    this.allbtn[i].alpha = this.data.longValues[i] > 0 && this.data.longValues[i] <= max ? 1 : 0.3;
                    this.allbtn[i].touchEnabled = this.allbtn[i].alpha == 1;
                    if (!isSelect && this.allbtn[i].touchEnabled) {
                        this.selectBtn(this.allbtn[i]);
                        isSelect = true;
                    }
                }
                this.quxiaoBtn.touchEnabled = !this.btn_min.touchEnabled;
                this.quxiaoBtn.alpha = this.quxiaoBtn.touchEnabled ? 1 : 0.3;
                this.allcards.removeChildren();
                // for (var i: number = this.allcards.numChildren - 1; i > -1; i--){
                // 	if (this.allcards.getChildAt(i) instanceof eui.Image) {
                // 		this.allcards.removeChildAt(i);
                // 	}
                // }
                data.strValues.sort(function (a, b) {
                    return playcards.CardVO.getCardValue(Number(a)) - playcards.CardVO.getCardValue(Number(b));
                });
                for (var i = 0, len = data.strValues.length; i < len; i++) {
                    var image = new eui.Image();
                    image.scaleX = image.scaleY = 0.35;
                    image.source = playcards.getProxy().getCardName(Number(data.strValues[i]));
                    this.allcards.addChild(image);
                }
                for (var i = 0; i < 3; i++) {
                    this["item" + i].visible = false;
                    this["item" + i].vo = null;
                }
                this.showItem(0, playcards.getProxy().mySeatvo);
                var allrole = playcards.getTableVO().seatPlayerVO;
                var my = playcards.getProxy().mySeat;
                var index = 1;
                for (var i = 0; i < allrole.length; i++) {
                    var player = allrole[i];
                    if (player.isPlay && !player.isFold && player.seatId != my) {
                        this.showItem(index, player);
                        index++;
                        if (index > 2)
                            break;
                    }
                }
                this.cardnum.text = data.strValues.length + "";
                this.showGlobalCards();
            }
            else {
                this.time = 0;
                this.bggroup.visible = false;
                egret.Ticker.getInstance().register(this.advanceTime, this);
            }
        };
        PlaycardSafeComp.prototype.showItem = function (index, vo) {
            if (vo) {
                this["item" + index].visible = true;
                this["item" + index].vo = vo;
                this["iname" + index].text = vo.name;
                this["icard" + index + "0"].source = playcards.getProxy().getCardName(vo.myCard[0]);
                this["icard" + index + "1"].source = playcards.getProxy().getCardName(vo.myCard[1]);
                this["imoney" + index].text = vo.winRate == -1 ? "" : Math.floor(vo.winRate * 100) + "%";
            }
        };
        PlaycardSafeComp.prototype.showGlobalCards = function () {
            var allcard = playcards.getTableVO().globalCards;
            for (var i = 0; i < 5; i++) {
                var card = this["gcard" + i];
                if (allcard.length > i) {
                    card.source = playcards.getProxy().getCardName(allcard[i]);
                    card.visible = true;
                }
                else
                    card.visible = false;
            }
            this.showItemCards();
            // if (allcard.length > 0) {
            // 	 playcards.getProxy().updateRate();
            // 	 for (var i: number = 0; i < 3; i++){
            // 		var vo = this["item" + i].vo
            // 		if ( vo!= null) {
            // 			this["imoney" + i].text = vo.winRate == -1 ? "" : Math.floor(vo.winRate * 100) + "%";
            // 			this["icard"+i+"0"].source = getProxy().getCardName(vo.myCard[0]);
            // 			this["icard"+i+"1"].source = getProxy().getCardName(vo.myCard[1]);
            // 		}
            // 	}
            // }
        };
        PlaycardSafeComp.prototype.showItemCards = function () {
            if (playcards.getTableVO().globalCards.length > 0) {
                playcards.getProxy().updateRate();
                for (var i = 0; i < 3; i++) {
                    var vo = this["item" + i].vo;
                    if (vo != null) {
                        this["imoney" + i].text = vo.winRate == -1 ? "" : Math.floor(vo.winRate * 100) + "%";
                        this["icard" + i + "0"].source = playcards.getProxy().getCardName(vo.myCard[0]);
                        this["icard" + i + "1"].source = playcards.getProxy().getCardName(vo.myCard[1]);
                    }
                }
            }
        };
        PlaycardSafeComp.prototype.advanceTime = function (time) {
            this.time += time / 5;
            this.puker_img.rotation = this.time;
        };
        PlaycardSafeComp.prototype.updatatime = function () {
            if (this.lefttime < 0) {
                this.quxiao();
            }
            this.lefttimelab.text = "(" + this.lefttime + ")";
            this.lefttime--;
        };
        PlaycardSafeComp.prototype.hide = function () {
            egret.Ticker.getInstance().unregister(this.advanceTime, this);
            egret.clearInterval(this.timesid);
            this.removeFromParent();
        };
        PlaycardSafeComp.prototype.quxiao = function () {
            var type;
            if (this.lefttime >= 0) {
                type = 1;
            }
            else {
                if (this.btn_min.alpha == 1)
                    type = 3;
                else
                    type = 2;
            }
            var str = playcards.getTableVO().gameStatus + "," + this.xnum.text + "," + type;
            mc2sdk.event(5097 /* PLAYCARD_SAFE_CANEL */, str);
            __PVO().l(0).to(app.NetAction.REQ_BUYINSURE);
            this.hide();
        };
        PlaycardSafeComp.prototype.selectBtn = function (clickTarget) {
            this.img_light.visible = this.mess.visible = true;
            this.img_light.x = this.mess.x = clickTarget.x;
            this.select = Number(clickTarget.name);
            var toubao = this.data.longValues[this.select];
            var cangetwan = FormatUtils.wan(toubao * (this.data.intValues[1] / 10 + 1));
            var toubaowan = FormatUtils.wan(toubao);
            this.txt_toubao.text = toubaowan;
            this.txt_kepei.text = cangetwan;
            this.fristbuy.visible = clickTarget == this.btn_min;
        };
        PlaycardSafeComp.prototype.touchBindButtonHandler = function (clickTarget) {
            switch (clickTarget) {
                case this.btn_min:
                case this.btn_capital:
                case this.btn_profit:
                case this.btn_max:
                    this.selectBtn(clickTarget);
                    // this.mess.messlab.text = "保费:" + toubaowan + "\n可赔:" + cangetwan;
                    // this.toubaolab.text = toubaowan;
                    // this.weimaizhonglab.text = FormatUtils.wan(getProxy().getTotalBet() - toubao) ;
                    // this.maizhonglab.text = cangetwan;
                    break;
                case this.quxiaoBtn:
                    this.quxiao();
                    break;
                case this.toubaoBtn:
                    if (this.select != null) {
                        __PVO().l(this.data.longValues[this.select]).to(app.NetAction.REQ_BUYINSURE);
                        var str = playcards.getTableVO().gameStatus + "," + this.xnum.text + "," + this.select;
                        mc2sdk.event(5098 /* PLAYCARD_SAFE_SUBMIT */, str);
                        this.hide();
                    }
                    else {
                        tip.popSysCenterTip("请先选择投保额度", tip.TIPS_TYPE.TIPS_WARNING);
                    }
                    break;
                default:
                    break;
            }
        };
        return PlaycardSafeComp;
    }(gameabc.UICustomComponent));
    playcards.PlaycardSafeComp = PlaycardSafeComp;
    __reflect(PlaycardSafeComp.prototype, "playcards.PlaycardSafeComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlaycardSafeComp.js.map