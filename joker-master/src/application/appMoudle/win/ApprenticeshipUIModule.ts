module win {
	/**
	 * 出师、成长奖励引导
	 */
	export class ApprenticeshipUIModule extends app.base.BaseSceneUIMoudleComponent {
		_btn_youxi: eui.Group;//跳到游戏场
        _btn_saishi: eui.Group;//跳到赛市场
        _btn_close: eui.Image;
        jinbeiLight: eui.Image;// 金杯的光效

        _txt_info1: eui.Label;//出师文字描述第一行
        _txt_info2: eui.Label;//出师文字描述第二行

		public constructor() {
			super();
            this.skinName = "ApprenticeshipUIModuleSkin";
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
		}

		public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            this.bindButton(this._btn_close,true);
            this.bindButton(this._btn_saishi,true);
            this.bindButton(this._btn_youxi,true);
            egret.Tween.get(this.jinbeiLight,{"loop":true}).to({"rotation":360},3000);  
        }

        public opening(): void {
           this._txt_info1.text = gameabc.getMessage("Apprenticeship_INFO1");
		   this._txt_info2.text = gameabc.getMessage("Apprenticeship_INFO2");
        }


        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this._btn_close:
                    this.close();
                    break;
				case this._btn_saishi:
                    this.close();
					__OPEN_PRE_MOUDLE(AppReg.MATCH_MAIN, null, [AppReg.APP_MAIN_UI]);
					break;
                case this._btn_youxi:
                    this.close();
                    __OPEN_PRE_MOUDLE(AppReg.ROOM, null, [AppReg.APP_MAIN_UI]);
                    break;
            }

        }
       
        public dispose(): void {
            super.dispose();
        }
	}
}