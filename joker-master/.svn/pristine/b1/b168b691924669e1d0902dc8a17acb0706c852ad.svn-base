module appvos {

	export class ParamVO {
		
		public strValues: string[] = [];
		public intValues: number[] = [];
		public longValues: number[] = [];
        public data: any[] = [];

		
		public constructor(data: any = null) {
			if(data != null) {
                var vo: any = AppGlobal.getMessage("ParamVO").decode(data);
                this.setData(vo);
            }
		}
		
		public setData(vo: any): void {
			if(vo == null) {
                return;
            }
			
			var i: number = 0; var len: number = 0;
			this.strValues = [];len = vo.strValues.length;for(i = 0;i < len;i++) {this.strValues[i] = vo.strValues[i];}

			this.intValues = [];len = vo.intValues.length;for(i = 0;i < len;i++) {this.intValues[i] = vo.intValues[i];}

			this.longValues = [];len = vo.longValues.length;for(i = 0;i < len;i++) {this.longValues[i] = vo.longValues[i] == null ? 0 : vo.longValues[i].toNumber();}

			this.data = [];len = vo.data.length;for(i = 0;i < len;i++) {this.data[i] = vo.data[i];}

			vo = null;
		}
		
		// fixToLong():void {
		// 	var len = this.longValues.length;
		// 	for(var i = 0; i < len; ++i) {
		// 		if (this.longValues[i] instanceof Number) {
		// 			this.longValues[i] = dcodeIO.Long.fromNumber(this.longValues[i]);
		// 		}
		// 	}
		// }
		getProtoVO(): any {
			var vo: any = AppGlobal.getMessageVO("ParamVO");
			vo.intValues = this.intValues;
			vo.strValues = this.strValues;
			var i: number = 0; var len: number = 0;
			vo.longValues = []; len = this.longValues.length; for (i = 0; i < len; i++) { vo.longValues[i] = __SET_INT64(this.longValues[i]); }
			vo.data = this.data;
			return vo;
		}
	}
}
