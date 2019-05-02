module joker {

	var logic:JokerGameLogic;

	export function gameLogic():JokerGameLogic {
		if(logic == null) {
			logic = new JokerGameLogic();
		}
		return logic;
	}

	export function destoryGameLogic():void {
		if(logic) logic.dispose();
		logic = null;
	}

	export class JokerGameLogic implements games.IGameLogic {

		heartId:number = 0;
		public constructor() {
		}

		/**
		 * 游戏开始
		 */
		gameStart():void{
			var urlData = utils.NativeUtils.getURLObj();
			if (urlData["userid"] == null) {
                __CLOSE_ALLMOUDLE_OPEN(AppReg.JOKER_DEBUG_LOGIN);
            } 
            else {
                __CLOSE_ALLMOUDLE_OPEN(AppReg.JOKER_AUTO_LOGN);
            }
		}

		/**
		 * 开始心跳
		 */
		beginHeart():void{
			egret.clearInterval(this.heartId);
			this.heartId = egret.setInterval(()=>{
				__PVO().to(app.NetAction.JOKER_REQ_HEART_BEAT);
			},this,10000);
		}

		stopHeart():void{
			egret.clearInterval(this.heartId);
		}

		dispose():void{
			this.stopHeart();
		}
	}
}