module appvos {

	export class HLCCardVO {
		
		
		public posId: number;//位置号 庄0  系统 1 2 3 4  

		public card: number[];//牌

		
		public constructor(data: any = null) {
			if(data != null) {
				var vo: any = AppGlobal.getMessage("HLCCardVO").decode(data);
                this.setData(vo);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			this.posId = vo.posId;
            this.card = vo.card;
			vo = null;
		}
		
	}
}
