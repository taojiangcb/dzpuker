module app {
	export class HappyNetCommand extends GameCommand{
		public constructor() {
			super();
		}
		public resultHandler(action: string, param: appvos.ParamVO): void {        
			switch (action) {
				case NetAction.GLXY_RESP_TABLE_VO:
				 	mc2sdk.event(mc2sdk.EVENT_TYPE.ON_LOIGN_STEP_5);	
				    happy.getProxy().tableVO = new appvos.HLCTableVO(param.data[0]);                
                    var ui: happy.HappyUIMoudleComp = __GET_MOUDLE_COMP(AppReg.APP_HAPPY) as  happy.HappyUIMoudleComp;
                    if (ui == null || ui.parent == null) {                                         
						// var except = [AppReg.APP_HAPPY, AppReg.PRELOAD];
						//  var arr = gameabc.UIManager.instance.getOpenList(except);                           
                        //  __OPEN_PRE_MOUDLE(AppReg.APP_HAPPY, null, arr);  
						happy.getProxy().openMoudle();         
                    } else {
                        ui.refVO();
                    }	
					break;	
				case NetAction.GLXY_RESP_BANK_WAITER:
					happy.getProxy().bankWaiter = param.intValues;
					break;	
			}
		}
	}
}