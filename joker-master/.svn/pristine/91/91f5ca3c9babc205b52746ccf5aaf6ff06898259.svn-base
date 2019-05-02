module record {
	/**
	 * 行为分析主界面
	 * */
	export class RecordAnimalAnalysisUIMoudleComp extends app.base.BaseSceneUIMoudleComponent {
		private _btn_close: eui.Image;			// 关闭按钮
		private _btn_ok: eui.Button;			// 确定按钮
		private _btn_share_weixin: eui.Group;	// 微信分享按钮

		private _comp_animal_analysis: RecordAnimalAnalysisDescComp;  // 行为分析描述

		public constructor() {
			super();
			this.skinName = "resource/app_skin/record/record_animal/RecordAnimalAnalysisUIMoudleSkin.exml";
		}

		public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            this.bindButton(this._btn_close, true);
//            this.bindButton(this._btn_ok, true);
			this.bindButton(this._btn_share_weixin, true);
			// if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) // 本地运行
			// {
			// 	this.setButtonVis(false);
			// } else {
			// 	this.setButtonVis(true);
			// }
			// 注册mediator
			app.mvc.AppFacade.getInstance().registerMediator(new RecordAnalysisMediator(this));
			// 发送更新事件
			__SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
			
			
        }

		touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this._btn_close:
				case this._btn_ok:
					this.close(); break;

				case this._btn_share_weixin:  	// 微信
					// if (egret.Capabilities.os == "Android") {
                    //     platform.shardShow("行为分析","","先赚1个亿，来边锋德州达成小目标");
                    // } else {
                    //     tip.popSysCenterTip("此功能尚未开放，敬请期待");
                    // }
					platform.shardShow("行为分析","先赚1个亿，来边锋德州达成小目标");
					mc2sdk.event(mc2sdk.EVENT_TYPE.RECORD_ANALYSIS_SHARE);
					 break;

					
            }
        }

		public dispose(): void {
			app.mvc.AppFacade.getInstance().removeMediator(RecordAnalysisMediator.NAME)
            super.dispose();
        }

		/**
		 * 设置按钮按键显示
		 */
		private setButtonVis(visible: boolean): void {
			this._btn_ok.visible = visible;
            this._btn_share_weixin.visible = !visible;
		}

		/**
		 * 设置行为分析描述
		 */
		public setDescritpion() {
			if(this.uiOpenData){
				this._comp_animal_analysis.setLastUserInfo(this.uiOpenData);
			}
		}

	}
}