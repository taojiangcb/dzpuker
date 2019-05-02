module joker {
	export class JokerRoomCommand extends app.GameCommand {
		public constructor() {
			super();
		}

		execute(notification:puremvc.INotification):void {
			super.execute(notification);
		}
        
        resultHandler(action:string, paramVO:appvos.ParamVO):void {
			var datas:any[] = null;
			switch(action) {
				case app.NetAction.JOKER_RESP_TABLE_VO:
					datas = paramVO.data;
					if(datas && datas.length > 0) {
						var tableInfo:appvos.PMTableVO = new appvos.PMTableVO(datas[0]);
						getProxy().setTableInfo(tableInfo);
						cy.log("获取到桌子信息",0);
					}
					break;
				case app.NetAction.JOKER_RESP_ANTE:
					datas = paramVO.data;
					if(datas && datas.length > 0) {
						var betInfo:appvos.PMInfoVO = new appvos.PMInfoVO(datas[0]);
						getProxy().setBetInfo(betInfo);
						cy.log("获取到下注信息");
					}
					break;

			}
		}
	}
}