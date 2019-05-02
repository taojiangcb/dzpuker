module guichu {
	export class GuichuAutoLogin extends app.base.BaseSceneUIMoudleComponent {

		loginTxt:eui.Label;
		intervalId:number = 0;
		numberOf:number = 0;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/guichu/AutoLogin.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			if(this.intervalId > 0) egret.clearInterval(this.intervalId);
			this.intervalId = egret.setInterval(()=>{
				if(this.numberOf > 3) {
					this.numberOf = 0;
				}
				var ts:string = ""
				for(var i:number = 0; i < this.numberOf; i++) {
					ts += ".";
				}
				this.loginTxt.text = "正在登录" + ts;
				this.numberOf++
			},this,300)

			__REGISTER_MEDIATOR(guichu.LoginMediator);
            this.autoLogin();
		}

		private autoLogin():void {

			 /**
             * url传入的参数
             */
            var obj = utils.NativeUtils.getURLObj();
            if (obj["userid"] != null) {
                console.log("url param:" + location.search);
				var loginName:string = URI.decode(obj["userid"]);
				var loginPass:string = "";
				var loginUserType:number = guichu.loginLogiC().getUserType();
				var hardwareId:string = "";
				var svrSession:string = "";
				var ips:cy.SrsIp[] = cy.getChrooseSrsList();
                var ip: cy.SrsIp = obj["srs"] ? this.searchSrsInList(obj["srs"]) : cy.getSrsIp();

                if (obj["pass"] != null) {
					loginPass = obj["pass"];
					loginUserType = guichu.loginLogiC().getUserType();
                } else if (obj["sessionid"] != null) {
					loginUserType = user.LOGIN_TYPE.SESSION;
					loginPass = obj["sessionid"];
                }

                if (obj["hdid"] != null) {
					hardwareId = obj["hdid"];
                }
				// console.log("onLogin funcion 1");
				// tip.Alert.show(location.href + location.search.substring(1),"",tip.CONFIRM,(type:number)=> {
				// 	console.log("onLogin funcion 2");
				// 	if(type == tip.YES) {
				// 		guichu.loginLogiC().onLogin(ip,loginName,loginPass,loginUserType,hardwareId);	
				// 	}
				// },null,this);
				guichu.loginLogiC().onLogin(ip,loginName,loginPass,loginUserType,hardwareId);
            }
		}

		 private searchSrsInList(info:string):cy.SrsIp {
			var ips:cy.SrsIp[] = cy.getChrooseSrsList();
            var i = ips.length;
            while (--i > -1) {
                var data:cy.SrsIp = ips[i];
                if (data.ip.lastIndexOf("." + info) != -1) {
                    return data;
                }
            }
            return ips[0];
        }

		dispose():void {
			if(this.intervalId > 0) egret.clearInterval(this.intervalId);
			__REMOVE_MEDIATOR(guichu.LoginMediator);
			super.dispose();
		}

	}
}