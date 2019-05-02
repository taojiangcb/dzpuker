module uicomps {
	export class DragInMediator extends app.mvc.AbstractMediator {
		static NAME:string = "__DRAG_IN_MEDIATOR__";

		public constructor(view:any) {
			super(DragInMediator.NAME,view);
		}

		listNotificationInterests():string[] {
			return [
				app.constant.AppMediatorConst.UP_USER_INFO_DATA
			]			
		}

		handleNotification(notification:puremvc.INotification):void {
			var name:string = notification.getName();
			switch(name) {
				case app.constant.AppMediatorConst.UP_USER_INFO_DATA:
					if(this.viewComponent) {
						this.viewComponent.updateTotalSilver();
					}
					break;
			}
		}
	}
}