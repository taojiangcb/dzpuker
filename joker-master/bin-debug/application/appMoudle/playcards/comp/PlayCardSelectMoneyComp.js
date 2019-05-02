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
    var PlayCardSelectMoneyComp = (function (_super) {
        __extends(PlayCardSelectMoneyComp, _super);
        function PlayCardSelectMoneyComp() {
            var _this = _super.call(this) || this;
            _this.skinName = "PlayCardsSelectMoneySkin";
            _this.percentWidth = 100;
            _this.percentHeight = 100;
            return _this;
        }
        PlayCardSelectMoneyComp.prototype.createComplete = function (event) {
            _super.prototype.createComplete.call(this, event);
            this.moneySlider.addEventListener(egret.Event.CHANGE, this.changevalue, this);
            this.bindButton(this.bgimage);
            this.bindButton(this.clickbtn);
            this.bindButton(this.l1btn);
            this.bindButton(this.l2btn);
            this.bindButton(this.l3btn);
            this.bindButton(this.l4btn);
            this.bindButton(this.l5btn);
            this.bindButton(this.bgimg, false);
            this.show();
        };
        PlayCardSelectMoneyComp.prototype.show = function () {
            if (this.initialized) {
                this.tip.visible = false;
                var vo = playcards.getProxy().mySeatvo;
                //最小加注一个大盲 如果是小忙首次加注至少到2倍大忙
                //    var min: number = vo.turnBet == getTableVO().sbBet ? getTableVO().bbBet * 2 - vo.turnBet : getProxy().nowMaxBet - vo.turnBet+ getTableVO().bbBet;
                this.moneySlider.value = this.moneySlider.minimum = playcards.getProxy().addMinBet(); //Math.min(vo.nowBet,min) ;
                this.moneySlider.maximum = playcards.getProxy().addMaxBet();
                this.moneySlider.snapInterval = playcards.getTableVO().bbBet;
                // this.moneytiplab.text = this.moneylab.text = FormatUtils.wan(this.moneySlider.value);
                // this.moneylab.visible = this.moneySlider.value < this.moneySlider.maximum;
                // this.moneyimg.visible = !this.moneylab.visible;
                this.changevalue(null);
                var all = playcards.getProxy().getTotalBet();
                this.setLab(Math.floor(all * 1.5), this.l1btnlab, this.l1btn);
                this.setLab(Math.floor(all * 2), this.l2btnlab, this.l2btn);
                this.setLab(Math.floor(all * 2.5), this.l3btnlab, this.l3btn);
                this.setLab(Math.floor(all * 3), this.l4btnlab, this.l4btn);
                this.setLab(vo.nowBet, null, this.l5btn);
                this.barbg.height = this.moneySlider.minimum == this.moneySlider.maximum ? this.barbg.maxHeight : 0;
            }
        };
        PlayCardSelectMoneyComp.prototype.setLab = function (lbet, lbtnlab, lbtn) {
            lbtn.name = lbet.toString();
            if (lbtnlab)
                lbtnlab.text = FormatUtils.wan(lbet);
            lbtn.touchEnabled = lbet <= this.moneySlider.maximum && lbet >= this.moneySlider.minimum;
            lbtn.alpha = lbtn.touchEnabled ? 1 : 0.5;
            lbtn.visible = lbtnlab != null || lbtn.touchEnabled;
        };
        //        public getMoney():number{
        //            return this.moneySlider.value;
        //        }
        //        public isMax():boolean{
        //            return this.moneySlider.value == this.moneySlider.maximum ;
        //        }
        PlayCardSelectMoneyComp.prototype.changevalue = function (event) {
            this.moneytiplab.text = FormatUtils.wan(this.moneySlider.value);
            this.moneylab.text = "加" + this.moneytiplab.text;
            this.tip.visible = true;
            this.tip.y = this.moneySlider.y + this.moneySlider.thumb.y;
            this.barbg.height = (this.moneySlider.value - this.moneySlider.minimum) * this.barbg.maxHeight / (this.moneySlider.maximum - this.moneySlider.minimum); //this.moneySlider.height- this.moneySlider.thumb.y-40;
            this.moneylab.visible = this.moneySlider.value < playcards.getProxy().mySeatvo.nowBet; //this.moneySlider.maximum;
            this.moneyimg.visible = !this.moneylab.visible;
        };
        PlayCardSelectMoneyComp.prototype.touchHandler = function (event) {
            var tag = event.currentTarget;
            if (tag == this.bgimg) {
                // console.log(event.localY + "," + (this.moneySlider.y + this.moneySlider.thumb.y));
                if (event.localY < this.moneySlider.y + this.moneySlider.thumb.y) {
                    this.moneySlider.value += this.moneySlider.snapInterval;
                    if (this.moneySlider.value > this.moneySlider.maximum)
                        this.moneySlider.value = this.moneySlider.maximum;
                }
                else {
                    this.moneySlider.value -= this.moneySlider.snapInterval;
                    if (this.moneySlider.value < this.moneySlider.minimum)
                        this.moneySlider.value = this.moneySlider.minimum;
                }
                this.changevalue(null);
            }
            else
                this.touchBindButtonHandler(tag);
        };
        PlayCardSelectMoneyComp.prototype.touchBindButtonHandler = function (clickTarget) {
            __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SHOWBTNS, true);
            switch (clickTarget) {
                case this.clickbtn:
                    this.addBet();
                    mc2sdk.event(50038 /* ADDBET_R */, room.getProxy().current.svrOfsId);
                    break;
                case this.l1btn:
                    playcards.getProxy().addBet(Number(clickTarget.name));
                    mc2sdk.event(50033 /* ADDBET_1 */, room.getProxy().current.svrOfsId);
                    break;
                case this.l2btn:
                    playcards.getProxy().addBet(Number(clickTarget.name));
                    mc2sdk.event(50034 /* ADDBET_2 */, room.getProxy().current.svrOfsId);
                    break;
                case this.l3btn:
                    playcards.getProxy().addBet(Number(clickTarget.name));
                    mc2sdk.event(50035 /* ADDBET_3 */, room.getProxy().current.svrOfsId);
                    break;
                case this.l4btn:
                    playcards.getProxy().addBet(Number(clickTarget.name));
                    mc2sdk.event(50036 /* ADDBET_4 */, room.getProxy().current.svrOfsId);
                    break;
                case this.l5btn:
                    playcards.getProxy().addBet(this.moneySlider.maximum);
                    mc2sdk.event(50037 /* ADDBET_5 */, room.getProxy().current.svrOfsId);
                    break;
            }
            //    if(clickTarget == this.clickbtn)  {
            //        this.addBet();
            //    } else if (clickTarget ==this.l5btn){ 
            //         getProxy().addBet(this.moneySlider.maximum);
            //    }else if (clickTarget.name) {
            //        getProxy().addBet(Number(clickTarget.name));
            //    }            
            this.removeFromParent();
        };
        /**
         * 下注
         */
        PlayCardSelectMoneyComp.prototype.addBet = function () {
            //            var act: number;
            //            var money = this.moneySlider.value;
            //            if(this.moneySlider.value == this.moneySlider.maximum ) {
            //                act = getProxy().ACT_ALLIN
            //            } else if(getProxy().nowMaxBet > 0)
            //                act = getProxy().ACT_RAISE;
            //            else act = getProxy().ACT_BET;
            //            __SEND_MESSAGE(app.NetAction.MATCH_ACTION,[act,money]);
            playcards.getProxy().addBet(this.moneySlider.value);
        };
        return PlayCardSelectMoneyComp;
    }(gameabc.UICustomComponent));
    playcards.PlayCardSelectMoneyComp = PlayCardSelectMoneyComp;
    __reflect(PlayCardSelectMoneyComp.prototype, "playcards.PlayCardSelectMoneyComp");
})(playcards || (playcards = {}));
//# sourceMappingURL=PlayCardSelectMoneyComp.js.map