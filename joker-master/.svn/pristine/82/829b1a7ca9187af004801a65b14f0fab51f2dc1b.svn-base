module antiSystem {

	export let ANTI_KEY:string = "antiKey";
	
	export function getProxy():antiSystem.AntiProxy {
		return __GET_PROXY(AntiProxy);
	}

	/**
     * 是否已经实名登记了
     * @returns {boolean}
     */
    export function isRNV():boolean {
        return user.getProxy().propertURL == "";
    };
	
    export function isOpenAnti():boolean {
        return gameabc.getConfig("ANTI_POWER") == "true";
    }

    export function needAnti():boolean {
        return !isRNV() && isOpenAnti();
    }

	export class AntiProxy extends app.mvc.AbsractProxy implements IAntiVO {
		static NAME:string = "__AntiProxy__";
		totalRunTime:number = 0;
		totalOutTime:number = 0;
		lastTime:number = 0;
		hour1Flag:boolean = false;
		hour2Flag:boolean = false;

		public constructor(name:string,data:any = null) {
			super(AntiProxy.NAME,data);
		}

		/**
		 * 防沉迷时间校验
		 */
		validateAntiInit():void {
			var json_str:string = gameabc.LocalSO.getItem(antiSystem.ANTI_KEY);
			if(json_str) {
				var oldAnti:IAntiVO = JSON.parse(json_str);
				var nowTime:number = new Date().getTime();
				var outTime:number = nowTime - oldAnti.lastTime;
				oldAnti.totalOutTime += outTime;
				var outHour:number = oldAnti.totalOutTime / 1000 / 36000;
				if(outHour >= 5) {
					this.initAnti();
				} 
				else {
					this.totalRunTime = oldAnti.totalRunTime;
					this.totalOutTime = oldAnti.totalOutTime;
					this.lastTime = oldAnti.lastTime;
					this.hour1Flag = oldAnti.hour1Flag;
					this.hour2Flag = oldAnti.hour2Flag;
				}
			}
			else {
				this.initAnti();
			}
		}


		/**
		 * 初始化防沉迷数据
		 */
		initAnti():void {
			this.totalRunTime = 0;
			this.totalOutTime = 0;
			this.lastTime = 0;
			this.hour1Flag = this.hour2Flag = false;
			this.saveTimer();
		}

		/**
		 * 保存当前时间
		 */
		saveTimer():void {
			var aTime:IAntiVO = {
				totalOutTime:this.totalOutTime,
				totalRunTime:this.totalRunTime,
				lastTime:this.lastTime,
				hour1Flag:this.hour1Flag,
				hour2Flag:this.hour2Flag,
			};
			var newJson = JSON.stringify(aTime);
			gameabc.LocalSO.setItem(ANTI_KEY,newJson);
		}

		getHour():number {
			return this.totalRunTime / 1000 / 36000;
        }

		dispose():void {
			super.dispose()
		}
	}

	export interface IAntiVO {
		totalOutTime:number;
		totalRunTime:number;
		lastTime:number;
		hour1Flag:boolean;
		hour2Flag:boolean;
	}
}