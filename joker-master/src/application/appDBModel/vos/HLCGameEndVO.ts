module appvos {

	export class HLCGameEndVO {
		
		
		public cardVO: HLCCardVO[];//牌信息

		public infoVO: HLCInfoVO[];//玩家结算信息

		
		public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("HLCGameEndVO").decode(data);
                this.setData(vo);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			var i: number = 0; var len: number = 0;
			if(vo.cardVO) { this.cardVO = [];len = vo.cardVO.length;for(i = 0;i < len;i++) {this.cardVO[i] = new HLCCardVO(); this.cardVO[i].setData(vo.cardVO[i]);}} else { this.cardVO = null; }

			if(vo.infoVO) { this.infoVO = [];len = vo.infoVO.length;for(i = 0;i < len;i++) {this.infoVO[i] = new HLCInfoVO(); this.infoVO[i].setData(vo.infoVO[i]);}} else { this.infoVO = null; }

			vo = null;
		}
		
	}
}
