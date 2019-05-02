module happy {
	export class WaitComp extends gameabc.UICustomComponent{
		public mess:eui.Image;
		public point0:eui.Image;
		public point1:eui.Image;
		public point2:eui.Image;
		public point3:eui.Image;
		public point4:eui.Image;
        public allpoint: eui.Image[];
		public timeid: number;
		private index: number = 0;
		public constructor() {
			super();
			this.skinName = "WaitCompSkin";
		}
		 /*该模块被创建完成后的回调函数*/
        public createComplete(event: egret.Event): void {
            this.initialized = true;
			this.allpoint = [this.point0,this.point1,this.point2,this.point3,this.point4];
        }
		public showBank(value:boolean): void{
			if (value) {
				this.mess.source = "img_word_happy_qddsz1_png";
			} else {
				this.mess.source = "img_word_happy_qddqtwj_png";
			}
			this.visible = true;
			egret.clearInterval(this.timeid);
			this.timeid = egret.setInterval(this.showPoint, this, 1000);
		}
		private showPoint(): void{			
			for (var i: number = 0; i < 5; i++){
				this.allpoint[i].visible = i <= this.index;
			}
			this.index = (this.index + 1) % 5;
		}
		public hide(): void{
			this.visible = false;
			egret.clearInterval(this.timeid);
		}
	}
}