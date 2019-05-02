module fiveCard {

	export class ChrooseItemButton extends gameabc.UICustomComponent {

		labelImg:eui.Image;
		typeData:number = 0;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/fiveCard/ChrooseItemButtonSkin.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
		}

		commitProperties():void {
			super.commitProperties();
			if(this.labelImg) {
				this.labelImg.source = "img_word_gameUI_play" + (this.typeData + 1) + "_png";
			}
		}

		setTypeData(val:number):void {
			this.typeData = val;
			if(this.initialized) {
				this.labelImg.source = "img_word_gameUI_play" + (this.typeData + 1) + "_png";
			}
			else {
				this.invalidateProperties();
			}
		}

		getTypeName():string {
			var names:string[] = [
				"高牌","一对","两对","三条","同花","葫芦","四条","同花顺","皇家同花顺"
			];
			return names[this.typeData]; 
		}
	}
}