module record {
	export class RecordAnalysisMediator extends puremvc.Mediator{
		 static NAME: string = "RecordAnalysisMediator";

        public constructor(viewComponent: Object = null) {
            super(RecordAnalysisMediator.NAME,viewComponent);
			
        }

		public get view(): RecordAnimalAnalysisUIMoudleComp {
            return this.viewComponent;
		}
        // 监听notification
        listNotificationInterests():string[] {
            return [
                app.constant.AppMediatorConst.UP_PLAY_INFO_DATA,
            ];
			 
        }
        // 处理notification
        handleNotification(notification:puremvc.INotification):void {
            switch(notification.getName()) {
				 case app.constant.AppMediatorConst.UP_PLAY_INFO_DATA:
                    this.view.setDescritpion();
                    break;
					
            }
        }

      
	}
}