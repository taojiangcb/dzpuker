module app {
	export class RollNoticeCommand extends app.NetStateHttpCommand {

		public constructor() {
			super();
		}

		get url():string {
			return AppConst.CONNECT_SERVER.notice;
		}

		responseHandler(action:string,paramVO:appvos.ParamVO):void {
			var len:number = paramVO.data.length;
			while(--len > -1) {
				var pbData:any = AppGlobal.getMessageVO("GoGoNoticeShowVO",paramVO.data[len])
				if(pbData) {
					var noticeInfo:notice.RollNoticeVO = new notice.RollNoticeVO(pbData);
					tip.popSysRollTopTip(noticeInfo.content);
				}
			}
		}
	}
}