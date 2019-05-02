module record {
	/**
	 * 动物头像组件，调用时需根据情况设置ui类型
	 *   */
	export class RecordAnimalHeaderComp extends gameabc.UICustomComponent {
		private _img_header:eui.Image;
		// private _txt_header:eui.Label;
		private _img_type:eui.Image;
		private _group_header:eui.Group;
		private _img_header_source:string[] = [	// header 资源
				"img_bianselong_info_png",
				"img_mianyang_info_png",
				"img_fengniu_info_png",
				"img_shayu_info_png",
				"img_ruoji_info_png",
				"img_shuta_info_png",
				"img_hongyantu_info_png",
				"img_xiaochouyu_info_png"
		]; 
		private _img_type_source:string[] = [ // type资源
				"iw_bianselong_info_png",
				"iw_mianyang_info_png",
				"iw_fengniu_info_png",
				"iw_shayu_info_png",
				"iw_ruoji_info_png",
				"iw_shuta_info_png",
				"iw_hongyantu_info_png",
				"iw_xiaochouyu_info_png"];

		public constructor() {
			super();
		}

		public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
        }

        public dispose(): void {
            super.dispose();
        }

		/**
		 * 更新动物头像及类别
		 */
		public updateAnimalHeaderUi(index:any):void{
			this.updateAnimalHeaderImg(index);
			this.updateAnimalTypeImg(index);
		}
		
		// 更新头像
		private updateAnimalHeaderImg(index:any):void{
			if(index>=this._img_header_source.length) index = 0;
			this._img_header.source = this._img_header_source[index];
		}

		// 更新类别图像
		private updateAnimalTypeImg(index:any):void{
			if(index >= this._img_type_source.length) index = 0;
			this._img_type.source = this._img_type_source[index];
		}

		/**
		 * 如是行为分析页面则需调用该方法
		 * */ 
		public _setOnAnalysisUI():void{
			this._img_type.x = 410;
			//this._group_header.scrollEnabled = false;
		}
		/**
		 * 如是行为战绩统计页面则需调用该方法
		 */
		public _setOnRecordUI():void{
			this._img_type.x = 11;
			//this._group_header.scrollEnabled = true;
		}
	}
}