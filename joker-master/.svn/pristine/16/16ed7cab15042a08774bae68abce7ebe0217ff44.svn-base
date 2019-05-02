module playcards {
	/**
	 * cd
	 * @author 
	 *
	 */
	export class CDShape  extends egret.Shape{
		public cdWidth: number;
        public cdHeight: number;
		public radius: number;
		public static linecolor: GradualColor;
		private lines: number[];
		private linepotx:  number[];
		private linepoty:  number[];
		private arcpotx: number[];
		private arcpoty:  number[];
		public constructor() {
    		super();
			if (CDShape.linecolor == null) {
	            var color = new GradualColor();				
				// color.addColor(0x00FF00);//绿
				color.addColor(0xFFFF00, 1);//黄
				color.addColor(0xF55905, 2);//橙色
				color.addColor(0xFF0000,2);//红
                CDShape.linecolor = color;				
			}
			this.touchEnabled = false;
		}
		public resize(ismy:boolean): void{
			  if (ismy) {
                    this.cdWidth = 99;
                    this.cdHeight = 145;
                    this.y = -10;
                    this.x = 15;
                } else {
                    this.cdWidth = 82;
                    this.cdHeight = 122;
                    this.y = 4;
                    this.x = 23;        
			}
			  var radius = this.radius = 8;
			  var cdWidth = this.cdWidth;
			  var cdHeight = this.cdHeight;
			  var hw: number = cdWidth * 0.5;
			  this.lines = [hw-radius,cdHeight-radius-radius,cdWidth-radius-radius,cdHeight-radius-radius,hw-radius];
			  this.linepotx = [radius,0,cdWidth-radius,cdWidth,hw];
			  this.linepoty = [0,cdHeight-radius,cdHeight,radius,0];
			  this.arcpotx = [radius,radius,cdWidth-radius,cdWidth-radius];
			  this.arcpoty = [radius,cdHeight-radius,cdHeight-radius,radius];
		}
		/**画线 */
        public draw(angle:number):void {
			if (angle > 1) angle = 1;
            this.graphics.clear();
            this.graphics.lineStyle(4, CDShape.linecolor.getColor(angle));
			var hw: number = this.cdWidth * 0.5;
			var radius = this.radius;			
			var total: number = (this.cdWidth + this.cdWidth + this.cdHeight + this.cdHeight) * (1-angle);
			this.graphics.moveTo(hw, 0);
			
			for (var i: number = 0; i < 4; i++){
				var lx = this.linepotx[i];
				var ly = this.linepoty[i];
				if (total > this.lines[i]) {
					this.graphics.lineTo(lx,ly);
					total -= this.lines[i];
					total = this.drawArc(this.arcpotx[i], this.arcpoty[i], total, radius, 0.75 - 0.25 * i);
				} else break;
			}
			if (total > 0) {				
				switch (i) {
					case 0:
						lx = hw-total;
						ly = this.linepoty[i];
						break;
					case 1:
						lx = this.linepotx[i];
						ly = total+radius;
						break;
					case 2:
						lx =  total+radius;
						ly = this.linepoty[i];	
						break;
					case 3:
						lx = this.linepotx[i];
						ly =this.cdHeight- total-radius;
						break;
					case 4:
					  	lx = this.cdWidth- total-radius;
						ly = this.linepoty[i];
						break;
				}
				this.graphics.lineTo(lx,ly);
			}
		}
		private drawArc(x:number,y:number,total:number,radius:number,startAngle:number ): number{
			var radius2 = radius + radius;
			var pi2 = Math.PI + Math.PI ;
			if (total < radius2) {
				var pec: number = total / radius2;
				this.graphics.drawArc(x, y, radius, startAngle * pi2, (startAngle- pec*0.25) *pi2, true)
				return 0;
			} else {
				this.graphics.drawArc(x, y, radius, startAngle * pi2, (startAngle-0.25) * pi2, true);
				return total - radius2;
			}
				
		}
    }
}
