module happy {
	export class HappyBetItemComp extends gameabc.UICustomComponent{

        public allMoney: MoveImage[];
		public canAddimg:eui.Image;
		public allmoneylab:eui.BitmapLabel;
		public resultbg:eui.Image;
		public mymoneylab:eui.Label;
		public betwinimg:eui.Image;
		public cardimg:eui.Image;
		public addLab: eui.Image;
		public lightmv: egret.MovieClip;
		// public xnum: eui.Image;
		public constructor() {
			super();
			this.skinName = "HappyBetItemSkin";
			this.allMoney = [];
		}
		public clear(): void{
			this.allmoneylab.text = "";
			this.mymoneylab.text = "";
            
			/*this.xnum.visible =*/  
			this.resultbg.visible = false;
			this.showLight(false,0);
			this.removeAllMoney();
			this.resetSelect();
		}
		/**是否可以加注 */
		public resetSelect(): void{
			var id:number = Number(this.name)
			var canAddbet = getProxy().canAddbet(id);
			if (canAddbet > 0) {
				this.canAddimg.visible = true;				
				this.addLab.source = "img_word_happy_djxz_png";
			} else {
				this.canAddimg.visible = false;				
				this.addLab.source = "img_word_happy_ydsx_png";	
			}
			// if (canAddbet ==0) {
				this.cardimg.source = "icon_happy_p_" + (id+1) + "_png";
			// } else
				// this.cardimg.source = "icon_happy_p_" + (id + 1) + "1_png";
            this.addLab.visible = canAddbet != -1;
		}
		public removeAllMoney(): void{
			for (var i: number = this.allMoney.length - 1; i > -1; i--){
				this.allMoney[i].remove();
			}
			this.allMoney = [];
		}
		public setBet(value:number): void{
			if (value > 0) {
				this.allmoneylab.text = FormatUtils.wan(value) + "";
			} else {
				this.allmoneylab.text = "";
			}
		}
		public setMyBet(value:number): void{
			if (value > 0) {
				this.mymoneylab.textColor = 0xffffff;
				this.mymoneylab.text = FormatUtils.wan(value) + "";
				this.resultbg.visible = true;
			} else {
				this.mymoneylab.text = "";
				this.resultbg.visible = false;
			}
		}
		public showAddBet(fromx: number, fromy: number, moneytype: string, sound: string = utils.SoundUtils.chipfly): void{	
			if(this.allMoney.length>100) this.allMoney.shift().remove();//筹码上线100个 
			var tox: number = 5 + Math.random() * 80+ this.x;
			var toy: number = 30 + Math.random() * 40+this.y;
			var money: MoveImage = MoveImage.fromPool();
			money.source = moneytype;
			this.parent.addChild(money);
			money.goto(fromx, fromy, tox, toy,500,sound);
			this.allMoney.push(money);
			if (sound != null) {//排除庄飞的筹码更新
				var index:number = Number(this.name)
				this.setBet(getTableVO().allbets[index]);
				this.setMyBet(getProxy().mySeatvo.getBet(index));
			}
		}
		public showBet(endVO:EndShowBetVO,remove:boolean): void{
			var len: number = this.allMoney.length;
			if (len > 0 && endVO.allShowPos.length > 0) {
				endVO.itemlen = Math.ceil(len / endVO.allShowPos.length);
				for (var i: number = len-1; i >-1 ; i--){
					var xy = endVO.getXY(i);
					if (remove)
						var money = this.allMoney.pop();
					else money = this.allMoney[i];
					money.goto(money.x,money.y,xy[0],xy[1],remove?1000:500,null,remove,remove?xy[3]*20:0);
				}
			}
		}
		public showLight(value: boolean,type:number): void{
			if (value) {
				if (type > playcards.CardsResult.FLUSH) {
					if (this.lightmv == null) {
						this.lightmv = new egret.MovieClip(getProxy().getFaceFactory().generateMovieClipData("light")); 
						this.lightmv.x = -13;
						this.lightmv.y = 18;
						this.lightmv.touchEnabled = false;						
					}
					this.addChild(this.lightmv);
					this.lightmv.play(-1);
				} else 
					this.betwinimg.visible = true;
			} else {
				this.betwinimg.visible = false;
				if (this.lightmv) {
					this.lightmv.stop();
					this.lightmv.removeFromParent();
				}
			} 
				
		}
		public showType(win:boolean,type:number):void{
			var add:number = 0
			if (getProxy().myEndInfo) {
				add = getProxy().myEndInfo.posWin[Number(this.name)];
			}
			if (add > 0) {
				this.mymoneylab.text ="+" + FormatUtils.wan(add);
				this.mymoneylab.textColor = 0xE7B877;
				this.resultbg.visible = true;
				this.mymoneylab.visible = true;	
			} 
			else if (add < 0) {
				this.mymoneylab.text =  FormatUtils.wan(add); 
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
			this.showLight(win,type);
			
		}
		
	}
}