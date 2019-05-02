module app {
	 export class DealerCommands extends GameCommand {

		/**
         * 流程为：1(正常); 2(发牌异常); 3(重新发牌)
         * 1: SERVER->DEALER:[3001]; DEALER->SERVER:[2001]; DEALER->SERVER:[2002]; SERVER->DEALER:[3002];
         * 2: SERVER->DEALER:[3001]; DEALER->SERVER:[2001]; SERVER->DEALER:[3003]; 这里直接跳到3
         * 3: DEALER->SERVER:[2003]; SERVER->DEALER:[3004];
         */
        
		sendHandler(data:any, action:string, paramVO:appvos.ParamVO): void {
			

			// this.sendPackage.sProcessID = 1;
            // this.sendPackage.nAppID = user.getProxy().currentRoom.svrOfsId;
			
			switch(action) {
				case app.NetAction.DTS_START_DEAL_CARD: //荷官告诉服务器 要开始发牌了
					paramVO.intValues = [0];
				break;
				case app.NetAction.DTS_CARD_DATA: //荷官告诉服务器 每个座位具体的牌面数据，不同参数对应不同牌类型 [0手牌 1翻牌 2转牌 3河牌]
					//int[0] 第几轮 int[1] 座位号 string[0] 12,10,11
					paramVO.intValues = [data[0],data[1]];
					paramVO.strValues = [data[2]];
				break;
				case app.NetAction.DTS_REPEAT_DEAL_CARD: //荷官告诉服务器 荷官主动要求重新发牌
					paramVO.intValues = [0];
				break;
			}
			console.log("==dealer==sendHandler - action",action, paramVO.intValues,paramVO.strValues);
        }
        
        resultHandler(action:string, paramVO:appvos.ParamVO):void {
			console.log("==dealer==resultHandler - action",action);
			var dp:dealer.DealerProxy = dealer.getProxy();
			switch(action) {
				case app.NetAction.STD_CAN_START_DEAL_CARD: //服务器告诉荷官 可以发牌了
					// 这里需要转发到小型机，告诉哪些小型机需要扫描了。
					//long[] 0 hands 1 flop 2 turn 3 river ; int[] 0 1 2 3 4  
					dp.players = paramVO.intValues;
					dp.dealcardType = paramVO.longValues[0];
					if (paramVO.longValues[0] == 0) {
						this.sendNotification(app.constant.AppMediatorConst.CLEAR_TABLE_PLAYER_UI);
					}
					console.log("==dealer==resultHandler - action=3001",action, paramVO.longValues, paramVO.intValues);
				break;
				case app.NetAction.STD_DEAL_CARD_END: //服务器告诉荷官 发牌结束，即：小型机停止检查牌面
				break;
				case app.NetAction.STD_DEAL_CARD_ERROR: //服务器告诉荷官 发牌异常，可以准备重新发牌了
				break;
				case app.NetAction.STD_CAN_REPEAT_DEAL_CARD: //服务器告诉荷官 收到重新发牌处理，同意荷官重新发牌，并且通知玩家清空桌面
				break;

			}
        }

	}
}