module happy {
	export class EndShowBetVO {
		allShowPos: number[];
		allShowXY: number[][];
		xyindexNum: Object ;
		itemlen: number;
		public constructor() {
			this.allShowPos = [];
			this.allShowXY = [];
			this.xyindexNum = {};
		}
		hasPos(pos): boolean{
			return this.allShowPos.indexOf(pos) > -1;
		}
		getXY(index:number): number[]{
			var i: number = Math.floor(index / this.itemlen);
			var xy: number[] = this.allShowXY[i];
			var key = xy[2];
			var num: number;
			if (this.xyindexNum[key] == null) {
				num = this.xyindexNum[key] = 0;
			} else num = this.xyindexNum[key];
			this.xyindexNum[key] = num + 1; 
			if (num > 25) num = 0;//上限25
			xy[3] = num;
			return xy;
		}
	}
}