module happy {
	export class HappyRewardMoudle extends app.base.BaseWndUIMoudleComponent{
		public btnColse:eui.Image;
		public imgget:eui.Image;
		public labget:eui.BitmapLabel;
		public totalreward:eui.BitmapLabel;
		public card1:eui.Image;
		public card2:eui.Image;
		public card3:eui.Image;
		public card4:eui.Image;
		public card5:eui.Image;
		public totalget: eui.Label;
		public datelab: eui.Label;
		public rolelist: eui.List;
		public nogetlab: eui.Label;
		public rewardgrop:eui.Group;
		public titleimg:eui.Image;//标题文本

		public constructor() {
			super();
			this.skinName = "HappyRewardSkin";
		}
		public createComplete(event: egret.Event): void {
            super.createComplete(event);
			this.bindButton(this.btnColse);
			//BULLETIN|房间ID|彩金值|奖励牌型|奖励总额|奖励时间|奖励局号|奖励时候奖池|当前局号|奖励账号1|奖励账号2|奖励账号3|奖励金额1|奖励金额2|奖励金额3|个人获奖金额|个人获奖局号
			var bets = this.uiOpenData;
            this.totalreward.text = FormatUtils.wan(Number(bets[7]));
			if (bets[3] > 0) {
				this.nogetlab.visible = false;
				this.rewardgrop.visible = true;
				var cards = playcards.getProxy().getPlayMaxCards(Math.floor(bets[3]));
				var rest = playcards.getProxy().getCardResult(cards);		
				this.card1.source = playcards.getProxy().getCardName(rest.allvos[0].value); 
				this.card2.source = playcards.getProxy().getCardName(rest.allvos[1].value); 
				this.card3.source = playcards.getProxy().getCardName(rest.allvos[2].value); 
				this.card4.source = playcards.getProxy().getCardName(rest.allvos[3].value); 
				this.card5.source = playcards.getProxy().getCardName(rest.allvos[4].value); 
				this.totalget.text = FormatUtils.wan(Number(bets[4]));
				var date = new Date(bets[5] * 1000);
				this.datelab.text = (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
				if (bets[6] == bets[8]) {//当前中奖
					this.titleimg.source = "img_word_happy_cj_png";
				}else 
					this.titleimg.source = "img_word_happy_slcj_png";
				if (bets[6] == bets[16]) {//自己中奖
					this.imgget.source = "img_word_happy_gxzj_png";
					this.labget.text = FormatUtils.wan(Number(bets[15]));
					this.imgget.x = 191;
				} else {
					this.imgget.source = "img_word_happy_wzj_png";
					this.labget.text = "";
					this.imgget.x = 282;
				}
				var ids: number[] = [];
				var allrole: Object[] = [];
				
				if (bets[9] > 0) {
					ids.push(4294967296.0 + Number(bets[9]));
					var obj = {};
							obj["rank"] = 1;
							// obj["roleId"] = roleid;
							obj["avatarID"] = user.getProxy().getHeadStr(0) ;
							obj["role"] = "";
							obj["money"] = FormatUtils.wan(Number(bets[12]));
							allrole.push(obj);
				}
				if (bets[10] > 0) {
					ids.push(4294967296.0 + Number(bets[10]));
						var obj = {};
							obj["rank"] = 2;
							// obj["roleId"] = roleid;
							obj["avatarID"] = user.getProxy().getHeadStr(0) ;
							obj["role"] = "";
							obj["money"] = FormatUtils.wan(Number(bets[13]));
							allrole.push(obj);
				} 
				if (bets[11] > 0) {
					ids.push(4294967296.0 + Number(bets[11]));
						var obj = {};
							obj["rank"] = 3;
							// obj["roleId"] = roleid;
							obj["avatarID"] = user.getProxy().getHeadStr(0) ;
							obj["role"] = "";
							obj["money"] = FormatUtils.wan(Number(bets[14]));
							allrole.push(obj);
				}
				if(allrole.length>0)
			        this.rolelist.dataProvider = new eui.ArrayCollection(allrole);
				if (ids.length > 0) {
					__SEND_NOTIFICATION(app.NetAction.PROCESS_XYID_REQ_GET_USER_LIST,ids);
				}
			} else {
				this.imgget.source = "img_word_happy_wzj_png";
				this.labget.text = "";
				this.imgget.x = 282;
				this.nogetlab.visible = true;
				this.rewardgrop.visible = false;
			}
		}
		public refList(body): void{
			var allrole: Object[] = [];
			var len = body.length;
			var bets = this.uiOpenData;
			for (var j: number = 0; j < 3; j++){
				var roleid: number = 4294967296.0+Number(bets[9 + j]);
				if ( roleid> 0) {
					for (var i: number = 0; i < len; i++) {
						var vo: appvos.UserInfoVO = body[i];
						if (vo.roleId == roleid) {
							var obj = {};
							obj["rank"] = j+1;
							obj["roleId"] = roleid;
							obj["avatarID"] = user.getProxy().getHeadStr(Number(vo.avatarID)) ;
							obj["role"] = vo.name;
							obj["money"] = FormatUtils.wan(Number(bets[12 + j]));
							allrole.push(obj);
							break;
						}
					}			
				}
			}
			if(allrole.length>0)
			  this.rolelist.dataProvider = new eui.ArrayCollection(allrole);
		}
		protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            super.touchBindButtonHandler(clickTarget);
            switch (clickTarget) {
				case this.btnColse:
					this.close();	
					break;	
			}
		}	
	}
}