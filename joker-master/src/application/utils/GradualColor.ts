/**
 *	一个色阶工具类，添加若干个颜色形成虚拟渐变色，并通过参数获取渐变过渡中任何点的颜色值。 
	* @author huangkan
	* 
	*/
class GradualColor {
	
	protected colors:ColorValue[] = [];
	protected allPorwer:number=0;
	
	/** 添加一个颜色 并设定他的占比*/
	public addColor(value:number, power:number=1):void {
		if(this.allPorwer==0&&power!=0) this.addColor(value,0);
		var color:ColorValue = new ColorValue();
		color.p = this.allPorwer + power;
		// color.a = (value >> 24) & 255;
		color.r = (value >> 16) & 255;
		color.g = (value >> 8) & 255;
		color.b = (value & 0xFF);
		this.colors.push(color);
		this.allPorwer += power;
	}
	
	/** 输入一个比例值，返回色条上的颜色，最左为0，最右为1 */
	public getColor(ratio:number):number {
		if (this.colors.length == 0) {
			return 0xFFFFFF;
		}
		var color:ColorValue;
		if (ratio >= 1) {
			color = this.colors[this.colors.length - 1];
			return /*(color.a << 24) +*/ (color.r << 16) + (color.g << 8) + color.b;
		} else if (ratio <= 0) {
			color = this.colors[0];
			return /*(color.a << 24) +*/ (color.r << 16) + (color.g << 8) + color.b;
		} else {
			var i:number = this.colors.length - 1;
			while (--i > -1) {
				color = this.colors[i];
				var cr:Number = color.p / this.allPorwer;
				if (ratio > cr) break;
			}
			var targetColor:ColorValue = this.colors[i+1];
			var colorRatio:number = color.p / this.allPorwer;
			var targetRatio:number = targetColor.p / this.allPorwer;
			var gapRatio:number = (ratio - colorRatio) / (targetRatio - colorRatio);
			// var a:number = (targetColor.a - color.a) * gapRatio + color.a;
			var r:number = (targetColor.r - color.r) * gapRatio + color.r;
			var g:number = (targetColor.g - color.g) * gapRatio + color.g;
			var b:number = (targetColor.b - color.b) * gapRatio + color.b;
			return /*(a << 24) +*/ (r << 16) +(g << 8) + (b);
		}
	}
}

class ColorValue {
	// public a:number;
	public r:number;
	public g:number;
	public b:number;
	public p:number;
}