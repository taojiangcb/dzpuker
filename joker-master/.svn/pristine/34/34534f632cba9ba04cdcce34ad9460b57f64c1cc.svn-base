module guichu {

	export class GuichuRoomCommand extends app.GameCommand {
		public constructor() {
			super();
		}

		execute(notification:puremvc.INotification):void {
			super.execute(notification);
		}
        
        resultHandler(action:string, paramVO:appvos.ParamVO):void {
            //抽象函数保持空，可减少子类忽略super引发的错误
			switch(action) {
				
				case app.NetAction.GUICHU_RESP_ANTE:
					var roleId:number = paramVO.intValues[0];			//下注的玩家
					var betIndex:number = paramVO.intValues[1];			//下注的位置
					var freeIndex: number = paramVO.intValues[2];		//1为免费
					var betTimes: number = paramVO.intValues[3];		//下注次数
					var betValue:number = paramVO.longValues[0];		//下注筹码
					var betRemain:number = paramVO.longValues[1];		//剩下的筹码
					guichu.getProxy().updatePlayInfo(roleId,betIndex,betValue,betRemain,freeIndex,betTimes);
					break;
				case app.NetAction.GUICHU_RESP_TABLE_VO:
					var tableVo = new appvos.ZPTableVO(paramVO.data[0]);
					/**
					 * 同步服务器时间
					 */
					guichu.gameLogic().syncServerTime(tableVo.nowTime);
					tableVo.timeLast = Math.max(0, tableVo.timeLast * 1000);
					getProxy().timeGet = egret.getTimer();
					//初始化或者更新桌子信息
					console.log("GUICHU_RESP_TABLE_VO:" + tableVo.timeLast);
					guichu.getProxy().updateTableInfo(tableVo);
					break;
				
				case app.NetAction.GUICHU_RESP_GAME_START:
					//下注倒计时
					//var downTime:number = paramVO.intValues[0];
					var now:number = paramVO.longValues[0];
					var over:number = paramVO.longValues[1];

					//下注倒计时
					var d2:number = guichu.gameLogic().fiexDownTime(now,over);

					if(guichu.getProxy().zpTable) {
						guichu.getProxy().zpTable.timeLast = d2;
						guichu.getProxy().zpTable.nowTime = now;
						guichu.getProxy().zpTable.nowTimeLast = over;
					}
					getProxy().timeGet = egret.getTimer();
					guichu.getProxy().changeStage(guichu.GAME_STATE.GAME_BET,d2);

					console.log("GUICHU_RESP_GAME_START:" + d2);

					break;
				case app.NetAction.GUICHU_RESP_GAME_END:
					//游戏结束
					// var downTime:number = paramVO.intValues[0];
					var now:number = paramVO.longValues[0];
					var over:number = paramVO.longValues[1];
					var rewardPool: number = paramVO.longValues[2];
					if (rewardPool) getProxy().rewardPool = rewardPool;
					//开奖发奖倒计时
					var d2:number = guichu.gameLogic().fiexDownTime(now,over);
					getProxy().timeGet = egret.getTimer();

					if(guichu.getProxy().zpTable) {
						guichu.getProxy().zpTable.timeLast = d2;
						guichu.getProxy().zpTable.nowTime = now;
						guichu.getProxy().zpTable.nowTimeLast = over;
					}
					/**
					 * 玩家结算
					 */
					var gameEndInfo:appvos.ZPGameEndVO = new appvos.ZPGameEndVO(paramVO.data[0]);
					// console.log("server: card = " + gameEndInfo.card + " showrand = " + gameEndInfo.showrand);
					guichu.getProxy().zpGamEndVO = gameEndInfo;
					guichu.getProxy().changeStage(guichu.GAME_STATE.GAME_ROLL,d2);
					// __SEND_NOTIFICATION(GuiChuModuleMediator.UPDATE_REWARD_POOL, rewardPool);
					console.log("GAME_STATE.GAME_ROLL:" + d2);
					break;
				case app.NetAction.GUICHU_RESP_ANTE_TEST:
					var v1: number = paramVO.intValues[0];
					var v2: number = paramVO.longValues[0];
					__SEND_NOTIFICATION(GuiChuModuleMediator.GUICHU_TEST_BACK, [v1, v2]);
					break;
			}
        }

		// execute(notification:puremvc.INotification):void {
		// 	super.execute(notification);
		// }

		//  sendHandler(data: any,stream: cy.SrsStreamWriter): void {
        //     super.sendHandler(data,stream);
		// 	switch (this.action) {
		// 		case app.NetAction.GUICHU_REQ_HEART_BEAT:
		// 			stream.putInt(0);
		// 			break;
		// 		case app.NetAction.GUICHU_REQ_ANTE:
		// 			stream.putInt(data.targetIndex);			//注位置 1-7
		// 			stream.putLong(data.AmountBet);				//下注额
		// 			break;
		// 	}
		//  }

		// resultHandler(stream: cy.SrsStreamReader): void {
		// 	switch(this.action) {
		// 		case app.NetAction.GUICHU_RESP_TABLE_VO:
		// 			var tableVo = stream.getSuruct(appvos.ZPTableVO);
		// 			break;
		// 	}
		// }
	}
}