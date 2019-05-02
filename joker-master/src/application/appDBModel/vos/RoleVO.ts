module appvos {

	export class RoleVO {
		
		public roleId: number = 0;//ID

		public name: string = "";//名称

		public sex: number = 0;//性别

		public silver: number = 0;//银两

		public avatarID: string = "";//头像

		public vipLevel: number = 0;//VIP
		
        public vipTime: number;//VIP到期时间

		public MaxWin: number;//最大赢取

		public totalHand: number;//总手数

		public winHand: number;//最终胜利手数

		public flopHand: number;//进入翻牌手数

		public maxCard: number;//最大成牌

		public spreadHand: number;//摊牌手数

		public highCardHand: number;//高牌手数

		public onePairHand: number;//对子手数

		public twoPairsHand: number;//两对手数

		public threeKindHand: number;//三条手数

		public fullHouseHand: number;//葫芦手数

		public fourKindHand: number;//四条手数

		public straightHand: number;//顺子手数

		public flushHand: number;//同花手数

		public straightFlushHand: number;//同花顺手数

		public callWinHand: number;//跟注胜利手数

		public callHand: number;//跟注局手数

		public raiseWinHand: number;//加注胜利手数

		public raiseHand: number;//加注局手数

		public allinWinHand: number;//allin胜利手数

		public spreadWinHand: number;//河牌摊牌胜利手数

		public foldWinHand: number;//弃牌胜利局手数

		public haveBetHand: number;//（跟注或下注或加注）行为手数

		public raiseWhenPreflop: number;//翻牌前加注行为手数

		public betOrRaiseTime: number;//（下注的次数+加注的次数）

		public callTime: number;//跟注的次数

		public raiseTime: number;//在他人下注，有人加注之后的再加注手数

		public continueBetTime: number;//上轮已经下注或者加注，这次又加注或者下注手数

		public betOrRaiseHand: number;//下注或者加注手数

		public winDivBB: number;//赢的大盲数量之和

		public allinHand: number;//allin手数

		public tmHand: number;//偷盲手数

		public tmWinHand: number;//偷盲胜利手数

		public score: number;//历史输赢

        public bureau: number;//总局数
        
        public huntKill: number;//玩家allin输光，就算猎杀。赢的人猎杀+1
        
        public master:number;//大师分
        
        public masterLV: number;//大师等级

	}
}
