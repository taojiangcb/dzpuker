module appvos {

	export class UserInfoVO {
		
		
		public totalHand: number;//总局数

		public winHand: number;//胜利局数

		public joinHand: number;//入局数

		public spreadHand: number;//摊牌局数

		public spreadWinHand: number;//摊牌胜利局数

		public maxHandWin: number;//单局最大盈利

		public totalWin: number;//总盈利（只算赢的）

		public maxCard: number;//最大成牌

		public sbHand: number;//小盲位置局数

		public sbJoinHand: number;//小盲位置入局数

		public bbHand: number;//大盲位置局数

		public bbJoinHand: number;//大盲位置入局数

		public buttonHand: number;//庄家位置局数

		public buttonJoinHand: number;//庄家位置入局数

		public otherPosHand: number;//其它位置局数

		public otherPosJoinHand: number;//其它位置入局数
		
		
        public raiseWhenPreflop: number;//翻牌前加注行为手数
        
        public betOrRaiseTime: number;//（下注的次数+加注的次数）
        
        public callTime: number;//跟注的次数
        
        public raiseTime: number;//在他人下注，有人加注之后的再加注手数
        
        public tmHand: number;//偷盲手数
        
        public continueBetTime: number;//上轮已经下注或者加注，这次又加注或者下注手数

        public betOrRaiseHand: number;//下注或者加注手数

        public winDivBB: number;//赢的大盲数量之和

		public avatarID: string;//头像

 		public roleId: number;//玩家ID

		public huntKill: number;//猎杀数

		public label: UserLabelVO;// 标签名

		public huntKillScore: number;//猎杀积分

		public charm:number;//魅力

		public charmScore:number;//魅力积分

		public name: string;//玩家名字

		public nameutf8:string;//名称uft8字符
		public  phoneValidate:number ;					//是否手机验证（0：未验证，1：已验证）	
		public  foldright:number;       			//弃牌
		public  raiseright:number ;        		//加注
		public  raiseperfect:number ;         //价值下注
		public  havesamecolor:number;        //在免费房中拿到同花牌型
		public  havethreesheet:number ;       //在免费房中拿到葫芦牌型
		public  havefoursheet:number ;        //在免费房中拿到四条牌型
		public  rewardrecord:string[] ;             //成长领取记录
		public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("UserInfoVO").decode(data);
                this.setData(vo);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			this.roleId = vo.roleId == null ? 0 : vo.roleId.toNumber();

			this.avatarID = vo.avatarID;

            this.totalHand = vo.totalHand;
            
			this.winHand = vo.winHand;

			this.joinHand = vo.joinHand;

			this.spreadHand = vo.spreadHand;

			this.spreadWinHand = vo.spreadWinHand;

			this.maxHandWin = vo.maxHandWin == null ? 0 : vo.maxHandWin.toNumber();

			this.totalWin = vo.totalWin == null ? 0 : vo.totalWin.toNumber();

			this.maxCard = vo.maxCard == null ? 0 : vo.maxCard.toNumber();

			this.sbHand = vo.sbHand;

			this.sbJoinHand = vo.sbJoinHand;

			this.bbHand = vo.bbHand;

			this.bbJoinHand = vo.bbJoinHand;

			this.buttonHand = vo.buttonHand;

			this.buttonJoinHand = vo.buttonJoinHand;

			this.otherPosHand = vo.otherPosHand;

			this.otherPosJoinHand = vo.otherPosJoinHand;
			
            this.raiseWhenPreflop = vo.raiseWhenPreflop;

            this.betOrRaiseTime = vo.betOrRaiseTime;
    
            this.callTime = vo.callTime;
    
            this.raiseTime = vo.raiseTime;
    
            this.tmHand = vo.tmHand;
    
            this.continueBetTime = vo.continueBetTime;
    
            this.betOrRaiseHand = vo.betOrRaiseHand;
    
            this.winDivBB = vo.winDivBB; 

			 this.huntKill = vo.huntKill;
			 
			 this.huntKillScore = vo.huntKillScore;
			 
			 this.name = vo.name; //FormatUtils.protoToGBK(vo.name);
			// if (vo.nameutf8) this.name = vo.name;
			// else this.name = FormatUtils.protoToGBK(vo.name);

			  this.charm = vo.charm;

			 this.charmScore = vo.charmScore;

			//  this.label = new UserLabelVO(vo.label);
			 this.label = new appvos.UserLabelVO(); if(vo.label) {  this.label.setData(vo.label); } 
			this.phoneValidate= vo.phoneValidate;					//是否手机验证（0：未验证，1：已验证）	
			this.foldright= vo.foldright;       			//弃牌
			this.raiseright= vo.raiseright ;        		//加注
			this.raiseperfect= vo.raiseperfect ;         //价值下注
			this.havesamecolor= vo.havesamecolor;        //在免费房中拿到同花牌型
			this.havethreesheet= vo.havethreesheet ;       				//在免费房中拿到葫芦牌型
			this.havefoursheet= vo.havefoursheet;        				//在免费房中拿到四条牌型
			this.rewardrecord = vo.rewardrecord ? vo.rewardrecord.split(",") : [];             //成长领取记录
			
			vo = null;
		}
	}
}

