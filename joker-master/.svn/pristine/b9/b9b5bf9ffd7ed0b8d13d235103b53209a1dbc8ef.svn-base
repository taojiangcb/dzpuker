module playcards {
	export class PlaycardSafeComp extends gameabc.UICustomComponent {

		public bggroup:eui.Group;
		public bgimg:eui.Image;
		public view:eui.ViewStack;
		public gcard0:eui.Image;
		public gcard1:eui.Image;
		public gcard2:eui.Image;
		public gcard3:eui.Image;
		public gcard4:eui.Image;
		public item0:eui.Group;
		public icard00:eui.Image;
		public icard01:eui.Image;
		public iname0:eui.Label;
		public imoney0:eui.Label;
		public item1:eui.Group;
		public icard10:eui.Image;
		public icard11:eui.Image;
		public iname1:eui.Label;
		public imoney1:eui.Label;
		public item2:eui.Group;
		public icard20:eui.Image;
		public icard21:eui.Image;
		public iname2:eui.Label;
		public imoney2:eui.Label;
		public allcards:eui.Group;
		public cardnum:eui.BitmapLabel;
		public xnum:eui.Label;
		public btn_min:eui.Group;
		public btn_capital:eui.Group;
		public btn_profit:eui.Group;
		public btn_max:eui.Group;
		public img_light:eui.Image;
		public mess:eui.Group;
		public txt_toubao:eui.BitmapLabel;
		public txt_kepei:eui.BitmapLabel;
		public fristbuy:eui.Label;
		public quxiaoBtn:eui.Group;
		public toubaoBtn:eui.Group;
		public lefttimelab:eui.Label;
		public bgrect:eui.Rect;
		public puker_img:eui.Image;
		public wordimg:eui.Image;

	



		public allbtn: eui.Group[];
		public data: appvos.ParamVO;
		private timesid: number;
		private lefttime: number;
		private select: number;
		private time: number;
		public constructor() {
			super();
            this.skinName = "PlaycardSafeSkin";
			this.percentWidth = 100;
			this.percentHeight = 100;

		}
		/*该模块被创建完成后的回调函数*/
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
			this.bindButton(this.btn_min, false);
			this.bindButton(this.btn_capital, false);
			this.bindButton(this.btn_profit, false);
			this.bindButton(this.btn_max, false);
			this.bindButton(this.quxiaoBtn);
			this.bindButton(this.toubaoBtn);
			this.allbtn = [this.btn_min, this.btn_capital, this.btn_profit, this.btn_max];
        }
		public show(data: appvos.ParamVO): void {
			this.view.selectedIndex = getProxy().buySafe - 1;
			if (getProxy().buySafe == 1) {
				this.bggroup.visible = true;
				this.select = null;
				this.data = data;
				this.xnum.text = "x" + (data.intValues[1] / 10+1);
				egret.clearInterval(this.timesid);
				this.timesid = egret.setInterval(this.updatatime, this, 1000);
				this.lefttime = data.intValues[2];
				this.updatatime();
				this.img_light.visible = this.mess.visible = false;
				var max: number = this.data.longValues[3];
				var isSelect: boolean = false;
				for (var i: number = 0; i < 3; i++) {
					this.allbtn[i].alpha = this.data.longValues[i] > 0 && this.data.longValues[i] <= max ? 1 : 0.3;
					this.allbtn[i].touchEnabled = this.allbtn[i].alpha == 1;
					if (!isSelect&&this.allbtn[i].touchEnabled) {
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
					return CardVO.getCardValue(Number(a)) - CardVO.getCardValue(Number(b));
				});

				for (var i: number = 0, len: number = data.strValues.length; i < len; i++) {
					var image: eui.Image = new eui.Image();
					image.scaleX = image.scaleY = 0.35;
					image.source = getProxy().getCardName(Number(data.strValues[i]));
					this.allcards.addChild(image);
				}				
				for (var i: number = 0; i < 3; i++){
					this["item" + i].visible = false;
					this["item" + i].vo = null;
				}
                this.showItem(0, getProxy().mySeatvo);
				var allrole = getTableVO().seatPlayerVO;
				var my = getProxy().mySeat
				var index: number = 1;
				for (var i: number = 0; i < allrole.length; i++){
					var player = allrole[i]
					if (player.isPlay && !player.isFold && player.seatId != my) {
						this.showItem(index, player);
						index++;
						if (index > 2)
							break;	
					}
				}
				this.cardnum.text = data.strValues.length + "";
				this.showGlobalCards();
			} else {
				this.time = 0;
				this.bggroup.visible = false;
				egret.Ticker.getInstance().register(this.advanceTime, this);
				//   var item = this.allItem[data.intValues[0]];
				//   this.effect.showItemMess(item, item.playvo.name + "购买保险中");
				// var p = item.localToGlobal(0, 0);
				// this.messitem.messlab.text = item.playvo.name + "购买保险中";
				// this.messitem.px = p.x;
				// this.messitem.py = p.y;
				// this.messitem.autoState();
			}

		}
		private showItem(index: number, vo: appvos.SeatPlayerVO): void{
			if (vo) {
				this["item" + index].visible = true;
				this["item" + index].vo = vo;
				this["iname" + index].text = vo.name;
				this["icard"+index+"0"].source = getProxy().getCardName(vo.myCard[0]);
				this["icard"+index+"1"].source = getProxy().getCardName(vo.myCard[1]);
				this["imoney"+index].text =vo.winRate==-1?"": Math.floor(vo.winRate*100) + "%";
			}
		}
		public showGlobalCards(): void{
			var allcard = getTableVO().globalCards;
			for (var i: number = 0; i < 5; i++){
				var card:eui.Image = this["gcard"+i]
				if (allcard.length > i) {
					card.source = getProxy().getCardName(allcard[i]);
					card.visible = true;
				}else card.visible = false;
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
		}
		public showItemCards(): void{
			if (getTableVO().globalCards.length > 0) {
				 playcards.getProxy().updateRate();
				 for (var i: number = 0; i < 3; i++){
					var vo = this["item" + i].vo
					if ( vo!= null) {
						this["imoney" + i].text = vo.winRate == -1 ? "" : Math.floor(vo.winRate * 100) + "%";
						this["icard"+i+"0"].source = getProxy().getCardName(vo.myCard[0]);
						this["icard"+i+"1"].source = getProxy().getCardName(vo.myCard[1]);
					}
				}
			}
		}
		public advanceTime(time: number) {
            this.time += time / 5;
			this.puker_img.rotation = this.time;
		}
		private updatatime(): void {
			if (this.lefttime < 0) {
				this.quxiao();
			}
			this.lefttimelab.text = "(" + this.lefttime + ")";
			this.lefttime--;
		}
		public hide(): void {
			egret.Ticker.getInstance().unregister(this.advanceTime, this);
			egret.clearInterval(this.timesid);
			this.removeFromParent();
		}
		private quxiao(): void {
			var type: number;
			if (this.lefttime >= 0) {
				type = 1;
			} else {
				if (this.btn_min.alpha == 1)
					type = 3;
				else  type = 2;
			}
			var str: string = getTableVO().gameStatus + "," + this.xnum.text + "," + type;
			mc2sdk.event(mc2sdk.EVENT_TYPE.PLAYCARD_SAFE_CANEL, str);
			__PVO().l(0).to(app.NetAction.REQ_BUYINSURE);
			this.hide();
		}
		private selectBtn(clickTarget: egret.DisplayObject): void{
				this.img_light.visible = this.mess.visible = true;
				this.img_light.x = this.mess.x = clickTarget.x;
				this.select = Number(clickTarget.name);
				var toubao = this.data.longValues[this.select];
				var cangetwan = FormatUtils.wan(toubao * (this.data.intValues[1] / 10+1));
				var toubaowan = FormatUtils.wan(toubao)
				this.txt_toubao.text = toubaowan;
				this.txt_kepei.text = cangetwan;
				this.fristbuy.visible = clickTarget == this.btn_min;
		}
		protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
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
						var str: string = getTableVO().gameStatus + "," + this.xnum.text + "," + this.select;
						mc2sdk.event(mc2sdk.EVENT_TYPE.PLAYCARD_SAFE_SUBMIT, str);
						this.hide();
					} else {
						tip.popSysCenterTip("请先选择投保额度", tip.TIPS_TYPE.TIPS_WARNING)
					}

					break;
				default:
					break;
			}

        }
	}
}