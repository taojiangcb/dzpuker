module app {
	export class MammonCommand extends MoudleCommand{
		public constructor() {
			super();
		}

		sendHandler(data:any, action:string, paramVO:appvos.ParamVO): void {
            switch(action){
				case NetAction.PROCESS_XYID_REQ_CAISHEN_LIST: // 请求获奖记录
					paramVO.intValues = [data];
					break;
			}
        }

		resultHandler(action:string, paramVO:appvos.ParamVO):void {
            switch(action){
				
				case NetAction.PROCESS_XYID_RESP_CAISHEN_LIST:
						/**paramVO 
						 * long(0) 数额
						 * long(1) 时间 
						 * string(0) 名字
						 * 循环 */
						mammon.getProxy()._clearRecordList();	// 清空缓存
						if(paramVO && paramVO.strValues.length >0 && paramVO.longValues.length >0){
							var index = 0;
							while(true){
								var num:number = paramVO.longValues[index*2];
								var time:number = paramVO.longValues[index*2+1];
								var name:string = paramVO.strValues[index];
								if(num >0 && time >0 && name.length > 0){
									mammon.getProxy()._setPoolRecords(time,name,num);
								}
								if(paramVO.strValues[index +1] ==undefined || index == 20){
									break; // 如没有数据则跳出
								}
								index++;
							}
							__SEND_NOTIFICATION(app.constant.AppMediatorConst.UPDATE_MAMMON_POOL_RECORD)
						}
			}
        }
	}
}