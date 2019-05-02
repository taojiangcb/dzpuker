module myInfo {

	export class TipBgColor {
		// Blue, Gray, Red, Yellow
		public static Blue:number = 1;
		public static Red:number = 2;
		public static Gray:number = 3;
		public static Yellow:number = 4;
		public static Green:number = 5;
	};

	export class InfoTip extends gameabc.UICustomComponent {

		private txtTip: eui.Label;

		private imgBgLight:eui.Image;
		private imgBg:eui.Image;

		public tipBgType:number;// 根据 TipBgColor 值获取 
		
		public constructor() {
			super();
            this.skinName ="InfoTipSkin";
			this.touchChildren = false;
		}

		public createComplete(event: egret.Event): void {
			
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {

        }

		public get tipStr():string{
			return /*this.txtTip.text +*/ '';
		}

		public setLight(islight:boolean = false):void{
			this.imgBgLight.visible = islight;
		}

		/**
		 * 设置数据
		 * @param vo
		 */
        public setData(color:number=0, tipstr:string = '', islight:boolean = false): void {
			var w:number = 110;
			var tip:string = "";
			if (color == 1) {
				this.imgBg.source = "img_tip_blue_png";//
				tip = "手紧型"
			} else if (color == 2) {
				this.imgBg.source = "img_tip_red_png";//
				tip = "手松型"
			} else if (color == 3) {
				this.imgBg.source = "img_tip_gray_png";//
				tip = "跟注站"
			} else if (color == 4) {
				this.imgBg.source = "img_tip_yellow_png";//
				tip = "鱼"
			} else if (color == 5) {
				this.imgBg.source = "btn_custom_tip_bg_png";//
				w = 136;
				if(tipstr.length > 4){
					tip = tipstr.slice(0, 4) + "...";
				}else{
					tip = tipstr;
				}
			}
			this.imgBgLight.visible = islight;
			this.txtTip.width = w;
			this.txtTip.text = tip;
			this.tipBgType = color;
        }

	}
}