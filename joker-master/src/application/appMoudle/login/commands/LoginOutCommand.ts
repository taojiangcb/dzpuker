module login {
	export class LoginOutCommand extends puremvc.SimpleCommand {
		public constructor() {
			super();
		}

		execute(notification:puremvc.INotification):void {
			user.getProxy().gameBool = false;
            gameabc.LocalSO.USERID = "";
            // gameabc.LocalSO.PREFIX = "";
           
            user.getProxy().clearAllData();
            record.getProxy().clearAllTables();
            mission.getProxy().dispose();
            item.getProxy().clearAllData();
            match.getProxy().clearAllData();

            //清除时间循环监听的函数
            app.SystemTimer.removeAllListeners();
            tip.clearSysCenterTimeTooltip();
            tip.clearSysTopTimeTooltip();

            app.mvc.AppFacade.getInstance().removeCommand(app.NetAction.SRS_CLOSE);
            cy.srsServer.close();

            AppGlobal.isLoginFlag = false;
            guichu.loginLogiC().clearforceLogin();

            // if(__IS_MOUDLE_OPEN(AppReg.LOGIN)) {
            //     var loginUI:login.LoginMoudle = <login.LoginMoudle>__GET_MOUDLE_COMP(AppReg.LOGIN);
            //     loginUI.reGamelogin();
            // } 
            // else {
            //     //打开登录界面
            //     // __CLOSE_ALLMOUDLE_OPEN(AppReg.LOGIN);
            //     __CLOSE_ALLMOUDLE_OPEN(AppReg.DEBUGLOGIN);
            // }
            user.getProxy().singFalg = false;
            
			/**
             * 如果是h5的渠道就可以直接刷新界面
             */
            if(platform.CHANNE_ID == platform.CHANNE_IDS.H5.toString()) {
                var url:string = "http://download.zgsjl8.com/dz/h5/index.html";
                if(document.location) {
                    url = document.URL;
                    var local_urls:string[] = url.split("?");
                    if(local_urls.length > 0) {
                        document.location.href = local_urls[0];
                    } else {
                        document.location.href = url;
                    }
                }
            }
		}
	}
}