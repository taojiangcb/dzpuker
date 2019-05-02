module record {
	export class RecordAnimalDescComp extends gameabc.UICustomComponent {
		private _comp_header: RecordAnimalHeaderComp; // 头像组件
		private _txt_rule_1:eui.Label;
		private _txt_rule_2:eui.Label;
		private _txt_rule_3:eui.Label;				  // 风格规则
		private _txt_bianselong:eui.Label;            // 表示特殊的变色龙label
		private _txt_animalDesc:eui.Label;			  // 风格描述

		public constructor() {
			super();
		}

		public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
			this._comp_header._setOnRecordUI();
        }

        public dispose(): void {
            super.dispose();
        }

		/**
		 * 更新打牌风格描述数据
		 * @param: number= typeIndex
		 */
		public updateAnimalDescUi(index:number):void{
			var typeArray = RecordSingleObject._getSingle().getTypeDc(index);
			this._txt_animalDesc.text = typeArray[1];
			if(index==0){ // type为变色龙
				this.setUiByType(false);
				this._txt_bianselong.text = typeArray[2];
			}else{
				this.setUiByType(true);
				this._txt_rule_1.text = typeArray[2];
				this._txt_rule_2.text = typeArray[3];
				this._txt_rule_3.text = typeArray[4];
			}
			this._comp_header.updateAnimalHeaderUi(index);
		}

		// 根据type设置ui的显示隐藏
		private setUiByType(visible:boolean):void{
			this._txt_rule_1.visible = visible;
			this._txt_rule_2.visible = visible;
			this._txt_rule_3.visible = visible;
			this._txt_bianselong.visible = !visible;
		}
	}
}