module appvos {

	export class MessageVO {
		
		
		public action: number;

		public phase: number;

		public data: ParamVO;

		public sendAt: number;

		public futureId: number;

		public clientNumId: string;

		public name: string;

		public errorCode: number;

		public isEncrypt: boolean;

		public token: string;

		public seqNum: number;//杩斿洖鍊?

		sourceData: any;
		
		public constructor(data: any = null) {
			if(data != null) {
                this.sourceData = AppGlobal.getMessage("MessageVO").decode(data);
                this.setData(this.sourceData);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			this.action = vo.action;

			this.phase = vo.phase;

			if(vo.data) { this.data = new ParamVO(); this.data.setData(vo.data); } else { this.data = null; }

			this.sendAt = vo.sendAt == null ? 0 : vo.sendAt.toNumber();

			this.futureId = vo.futureId == null ? 0 : vo.futureId.toNumber();

			this.clientNumId = vo.clientNumId;

			this.name = vo.name;

			this.errorCode = vo.errorCode;

			this.isEncrypt = vo.isEncrypt;

			this.token = vo.token;

			this.seqNum = vo.seqNum;

			vo = null;
		}
		
	}
}
