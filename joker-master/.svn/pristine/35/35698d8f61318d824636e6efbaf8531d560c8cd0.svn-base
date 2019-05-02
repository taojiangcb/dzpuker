module test {
	export class NativeTest extends app.base.BaseWndUIMoudleComponent {

		public lnBtn:eui.Button;
		public shardBtn:eui.Button;
		public closeBtn:eui.Button;
		public wxBtn:eui.Button;
		public updateBtn:eui.Button;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/test/NativeTest.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.bindButton(this.lnBtn);
			this.bindButton(this.shardBtn);
			this.bindButton(this.closeBtn);
			this.bindButton(this.wxBtn);	
			this.bindButton(this.updateBtn);
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			switch(tag) {
				case this.closeBtn:
					this.close();
					break;
				case this.wxBtn:
					platform.toWeChat();
					console.log("跳转到微信。。。");
					break;
				case this.lnBtn:
					/**
					 * 本地消息推送测试
					 */
					var lnNotification = {
						title:"12306",                      //提示title            
						time:15,                            //相隔触发时间 时间单位:s(秒)
						content:"这是一条测试消息",            //本地推送消息的内容
						userData:{                          //推送时带入的参数 可以在消息接收回时处理(例如{"param":"7799","identityKey":"keykeykey"})
							identityKey:"123"               //消息的key 相同key的消息会被覆盖以最后一次的为准
						}
					}

					var jsonNoti:string = JSON.stringify(lnNotification);
        			platform.pushLocalNotice(lnNotification);
        			console.log("本地消息被调用啦！！！");			
					break;

				case this.shardBtn:
					var paramArray: string[]  = [];
					// paramArray[0] = "mytitle";
					// paramArray[1] = "http://sharesdk.cn";
					// paramArray[2] = "mytext";
					// paramArray[3] = "http://f1.sharesdk.cn/imgs/2014/02/26/owWpLZo_638x960.jpg";
					// paramArray[4] = "http://sharesdk.cn";
					// paramArray[5] = "mycomment";
					// paramArray[6] = "ShareSDK";
					// paramArray[7] = "http://sharesdk.cn";
					// UserInterface.callFunctionArray(UserInterface.FUNCTION_SHOW_SHARE, paramArray);
					platform.shardShow("这是一条测试","这是测式的内容","",null,"");
					console.log("分享被调用了");
					break;
				case this.updateBtn:
					platform.updateDownload();
					console.log("强行更新被调用了");
					break;
			}
		}
	}
}

