module happy {
	export class HappyRoomUIMoudle extends app.base.BaseSceneUIMoudleComponent {

		btnGame1:eui.Group;
		btnGame2:eui.Group;
		btnGame3:eui.Group;

		txtDl1:eui.Label;
		txtDl2:eui.Label;
		txtDl3:eui.Label;

		txtNum1:eui.BitmapLabel;
		txtNum2:eui.BitmapLabel;
		txtNum3:eui.BitmapLabel;
		txtNum11:eui.Label;
		txtNum21:eui.Label;
		txtNum31:eui.Label;

		btnBanck:eui.Button;

		public constructor() {
			super();
			this.skinName = "HappyRoomUIMoudleSkin";
			//__OPEN_PRE_MOUDLE
		}

		public createComplete(event:egret.Event):void {
			super.createComplete(event);
			app.mvc.AppFacade.getInstance().registerMediator(new HappyRoomMediator(this));
			this.bindButton(this.btnGame1);
			this.bindButton(this.btnGame2);
			this.bindButton(this.btnGame3);

			this.bindButton(this.btnBanck);

		}

		showRoomEvent():void {
			if (room.getProxy().room5 && room.getProxy().room5.length >= 3) {
				this.txtDl1.text = "" + room.getProxy().room5[0].minBank;
				this.txtDl2.text = "" + room.getProxy().room5[1].minBank;
				this.txtDl3.text = "" + room.getProxy().room5[2].minBank;

				this.txtNum1.text = room.getProxy().room5[0].online + "/99";
				this.txtNum2.text = room.getProxy().room5[1].online + "/99";
				this.txtNum3.text = room.getProxy().room5[2].online + "/99";

				this.txtNum11.text = FormatUtils.wan4(room.getProxy().room5[0].smallBlinds) + "~" + FormatUtils.wan4(room.getProxy().room5[0].bigBlinds);
				this.txtNum21.text = FormatUtils.wan4(room.getProxy().room5[1].smallBlinds) + "~" + FormatUtils.wan4(room.getProxy().room5[1].bigBlinds);
				this.txtNum31.text = FormatUtils.wan4(room.getProxy().room5[2].smallBlinds) + "~" + FormatUtils.wan4(room.getProxy().room5[2].bigBlinds);
			}
		}

		protected touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
			switch (clickTarget) {
				case this.btnBanck:
					this.close();
					__CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
					break;

				case this.btnGame1:
					this.jionRoomEvent(0);

					break;
				case this.btnGame2:
					this.jionRoomEvent(1);

					break;

				case this.btnGame3:
					this.jionRoomEvent(2);
					break;
			}
		}

		private jionRoomEvent(roomid:number = 0):void {
			// //给淼鑫测试，暂时注释
			// if (roomid == 2 && setting.getProxy().getGameConfigValue(AppConst.gameConfigType.gameType5, egret.RuntimeType.WEB) == 0) {
			// 	tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
			// 	return;
			// }
			if (user.getProxy().svrGameData.silver >= room.getProxy().room5[roomid].minBank) {
				user.getProxy().exitToMoudle = AppReg.APP_HAPPY_MAIN;
				user.getProxy().joinRoom(room.getProxy().room5[roomid]);
			} else {
				user.getProxy().openMoney()
			}
		}


		public addParent():void {
			super.addParent();
			var roomIdArr = [];
			for (var i = 0; i < 3; ++i) {
				if (room.getProxy().room5[i]) {
					roomIdArr.push(room.getProxy().room5[i].svrRoomId);
				}
			}
			this.sendNotification(app.NetAction.TOOL_NUMPLAYERS, roomIdArr);
			this.showRoomEvent();
		}

		public dispose():void {
			app.mvc.AppFacade.getInstance().removeMediator(HappyRoomMediator.NAME);
			super.dispose();
		}
	}
}