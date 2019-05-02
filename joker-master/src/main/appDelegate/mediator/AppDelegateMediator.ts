module app {

	export class AppDelegateMediator extends app.mvc.AbstractMediator {

		static NAME:string = "__AppDelegateMediator__";

		public constructor(name?:string,viewComponent?:any) {
			super(AppDelegateMediator.NAME,viewComponent);
		}

		public listNotificationInterests(): any[] {
            return [
                // app.constant.AppMediatorConst.JOIN_ROOM_SUCCEED,		//进和房间成功	
				// app.constant.AppMediatorConst.LOGIN_OUT,				//注消
				// app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION		//重新登录
            ];
        }

        public handleNotification(notification: puremvc.INotification): void {
			switch(notification.getName()) {
			}
		}
	}
}