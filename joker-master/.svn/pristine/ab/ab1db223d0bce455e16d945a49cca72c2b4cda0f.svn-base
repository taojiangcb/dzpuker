module localNotification {
	export class ReceiveLocalNotificationCommand extends puremvc.SimpleCommand {
		
		public constructor() {
			super();
		}

		execute(notification:puremvc.INotification):void {
			var userData:any = notification.getBody();
			switch(userData.identityKey) {
				case "test" : 
					console.log("receive ls begin hander : " + userData.identityKey);
					break;
				default:
					break;
			}
		}

	}
}