module mammon {
	export class MammonUIMoudle extends app.base.BaseWndUIMoudleComponent {
		
		public progress:eui.ProgressBar;
		public btnClose:eui.Image;
		public txtMessage:eui.Label;
		public silverText:eui.BitmapLabel;
		public progressLabel:eui.Label;
		public okBtn:eui.Group;
		public imgHooklabel0:eui.Image;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/mammon/MammonUIModule.exml"
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.bindButton(this.okBtn);
			this.bindButton(this.btnClose);

			this.fullDataUI();
		}

		fullDataUI():void {
			if(!this.initialized) return;
			if(playcards.getTableVO()) {

				var totalRound:number = playcards.getTableVO().caishentime;
				var nowRound:number = playcards.getTableVO().caishenround;
				var tagRound:number = Math.max(totalRound - nowRound,0);

				var messStr:string = gameabc.getMessage("MAMMON_MSG",tagRound);
				this.txtMessage.text = messStr;
				this.silverText.text = playcards.getTableVO().caishenmoney.toString();

				this.progress.maximum = totalRound;
				this.progress.minimum = 0;

				this.progress.value = nowRound;
				this.progressLabel.text = gameabc.StringUtils.formatString("{0}/{1}局",nowRound,totalRound);
			}
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			var btn = tag;
			if(btn == this.btnClose) {
				this.close();
			}
			else if(btn == this.okBtn) {
				this.close();
			}
		}
	}
}