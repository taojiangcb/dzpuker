module happy {

	export enum STOP_MODE {
		profit = 1,		//赢利
		loss,			//亏损
		gameNumber		//局数
	}

	export enum WIN_RATIO {
		zero=100,				//无条件 100%
		forty=45,				//40%
		fifty=55				//50%
	}

	export enum BET {
		min = 1,		//押满
		fold = 10,		//10倍
		folds = 100		//100倍
	}


	export class HookVO {
		winRatio:number = WIN_RATIO.zero; 		//胜率
		betMode:number = BET.min;				//押注额倍数 1押满,10倍,100倍
		betValue:number = 0;					//押注额

		stopProfit:boolean = false;				//盈利停止
		stopLoose:boolean = false;				//亏损停止
		stopCount:boolean = false;				//超过盘数停止

		profitValue:number = 0;					//赢利
		loosValue:number = 0;					//亏损
		over_count:number = 0;					//结束盘数

		gameCount:number = 0;					//挂机盘数
		betCount:number = 0;					//押注盘数
		totalProfit:number = 0;					//统计盈亏

		public constructor() {
		}
	}
}