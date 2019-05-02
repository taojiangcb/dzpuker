module notice {
	export class RollNoticeVO {
		noticeId:number = 0;
		content:string = "";

		public constructor(pbData?:any) {
			if(pbData) this.setpbData(pbData);
		}

		setpbData(val:any):void {
			if(val) {
				this.noticeId = val.noticeId;
				this.content = val.content;
			}
		}
	}
}