module myInfo {
	export class InfoTipEditUIMoudleComp extends app.base.BaseWndUIMoudleComponent {

		private btnTipJinshen: myInfo.InfoTip;
		private btnTipLaojianjuhua: myInfo.InfoTip;
		private btnTipDajiangyou: myInfo.InfoTip;
		private btnTipJingyanfengfu: myInfo.InfoTip;

		private tipList: myInfo.InfoTip[];

		private inputCustomTip: eui.TextInput;
		// private inputCustomTip: eui.EditableText;
		private txtLastDate: eui.Label;

		private btnClose: eui.Image;
		private btnSaveAndClose: eui.Image;

		private userLabelVO: appvos.UserLabelVO;
		private roleVO: appvos.SeeInfoVO;

		private oldType: number = 0;
		private oldDesc: string = "";
		private toBeTipUid: number = 0;
		private modifyTime: number = 0;

		private nowType: number = 0;
		private nowDesc: string = "";

		public constructor() {
			super();
			this.skinName = "InfoTipEditUISkin";
		}
		opening(): void {
            super.opening();
            // user.getProxy().getMyCustomTips()
        }
		public createComplete(event: egret.Event): void {
            super.createComplete(event);
            app.mvc.AppFacade.getInstance().registerMediator(new InfoTipEditMediator(this));

			this.btnTipJinshen.setData(myInfo.TipBgColor.Blue, "手紧型", false);
			this.btnTipLaojianjuhua.setData(myInfo.TipBgColor.Red, "手松型", false);
			this.btnTipDajiangyou.setData(myInfo.TipBgColor.Gray, "跟注站", false);
			this.btnTipJingyanfengfu.setData(myInfo.TipBgColor.Yellow, "鱼", false);

			this.bindButton(this.btnTipJinshen);
			this.bindButton(this.btnTipLaojianjuhua);
			this.bindButton(this.btnTipDajiangyou);
			this.bindButton(this.btnTipJingyanfengfu);
			this.bindButton(this.btnClose);
			this.bindButton(this.btnSaveAndClose);

			this.tipList = [this.btnTipJinshen, this.btnTipLaojianjuhua, this.btnTipDajiangyou, this.btnTipJingyanfengfu]

			var infovo: appvos.UserInfoVO = this.uiOpenData[0];
			if (infovo) {
				this.userLabelVO = infovo.label;
			}
			if (this.userLabelVO) {
				this.oldType = this.userLabelVO.labelType == undefined ? 0 : this.userLabelVO.labelType;
				this.oldDesc = this.userLabelVO.labelName;
				this.modifyTime = this.userLabelVO.modifyTime == undefined ? 0 : this.userLabelVO.modifyTime;
			}
			this.roleVO = this.uiOpenData[1];
			if (this.roleVO) {
				this.toBeTipUid = this.roleVO.roleId == undefined ? 0 : this.roleVO.roleId;
			}
			// console.log(this.userLabelVO, infovo,this.roleVO);
			this.inputCustomTip.text = this.oldDesc;
			if (this.modifyTime > 0) {
				// this.txtLastDate.text = "上次标记：" + DateUtils.getLastDate(this.modifyTime);
				this.txtLastDate.text = "上次标记：" + DateUtils.dateFormat(this.modifyTime*1000,"yyyy年MM月dd日");
			} else {
				this.txtLastDate.text = "";
			}
			this.chkLight(this.oldType);
			this.nowType = this.oldType;
		}

		private chkLight(type:number): void {
			if (type > 0 && type < 5) {
				if (type == 1) {
					this.lightOff();
					this.btnTipJinshen.setLight(true);
				} else if (type == 2) {
					this.lightOff();
					this.btnTipLaojianjuhua.setLight(true);
				} else if (type == 3) {
					this.lightOff();
					this.btnTipDajiangyou.setLight(true);
				} else if (type == 4) {
					this.lightOff();
					this.btnTipJingyanfengfu.setLight(true);
				}
			}else{
				this.lightOff();
			}
		}
		private lightOff(): void {
			for (var i: number = 0; i < this.tipList.length; i++) {
				var tip: myInfo.InfoTip = this.tipList[i];
				tip.setLight(false);
			}
		}

		protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
			console.log(this.oldType, this.nowType);
			var tempType:number = 0;
            switch (clickTarget) {
                case this.btnTipJinshen:
					tempType = 1;
					if(this.nowType == tempType){
						this.nowType = 0;
					}else{
						this.nowType = 1;
					}
					this.chkLight(this.nowType);
                    break;
                case this.btnTipLaojianjuhua:
					tempType = 2;
					if(this.nowType == tempType){
						this.nowType = 0;
					}else{
						this.nowType = 2;
					}
					this.chkLight(this.nowType);
                    break;
                case this.btnTipDajiangyou:
					tempType = 3;
					if(this.nowType == tempType){
						this.nowType = 0;
					}else{
						this.nowType = 3;
					}
					this.chkLight(this.nowType);
                    break;
                case this.btnTipJingyanfengfu:
					tempType = 4;
					if(this.nowType == tempType){
						this.nowType = 0;
					}else{
						this.nowType = 4;
					}
					this.chkLight(this.nowType);
                    break;
                case this.btnClose:
					this.close();
                    break;
                case this.btnSaveAndClose:
					mc2sdk.event(mc2sdk.EVENT_TYPE.EDIT_TIP_SAVE_AND_CLOSE);// 埋点
					
					this.chkSendCmd();
					this.close();
                    break;
			}
		}

		public showEvent(): void {
			// this.inputCustomTip.text = "";
		}

		private chkSendCmd(): void {
			var hasTypeChange: boolean = false;
			var hasDescChange: boolean = false;
			console.log(this.nowType, this.oldType, this.oldDesc, this.inputCustomTip.text);

			if (this.nowType >= 0 && this.nowType != this.oldType) {
				// 类型修改了
				hasTypeChange = true;
			}
			if (this.inputCustomTip.text != this.oldDesc) {
				// 类型修改了
				hasDescChange = true;
			}
			console.log(hasTypeChange, hasDescChange)
			if (hasTypeChange || hasDescChange) {
				__SEND_NOTIFICATION(app.NetAction.REQ_ADD_LABEL, [this.nowType, this.inputCustomTip.text, this.toBeTipUid])
			}
		}

		public dispose(): void {
            app.mvc.AppFacade.getInstance().removeMediator(InfoTipEditMediator.NAME)
            super.dispose();
        }
	}
}