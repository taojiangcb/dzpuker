module uicomps {
	export class DragInUIMoudle extends app.base.BaseWndUIMoudleComponent {

		public titleimg:eui.Image;
		// public btn1:eui.Button;
		// public btn4:eui.Button;
		// public btn5:eui.Button;
		// public btn6:eui.Button;
		// public btn7:eui.Button;
		// public btn9:eui.Button;
		// public delButton:eui.Button;
		// public btn0:eui.Button;
		// public enterButton:eui.Button;
		// public btn2:eui.Button;
		// public btn3:eui.Button;
		// public btn8:eui.Button;

		public enterButton:eui.Button;
		public delButton:eui.Button;


		_comp_subKeyBoard:SubKeyBoardComp;
		public textLblBg0:eui.Image;
		public btnClear:eui.Image;
		public textLblBg:eui.Image;
		public btnGoBank:eui.Image;

		txtInput:eui.BitmapLabel;
		txtTotal:eui.BitmapLabel;
		btnClose:eui.Image;

		btnds:egret.DisplayObject[] = [];

		/**
		 * 当前输入的数字
		 */
		inputValue:number = 0;

		/**
		 * 玩家携带的总额
		 */
		totalValue:number = 0;

		/**
		 * 最小带入所需筹码
		 * @type {number}
		 */
		needSilver:number = 0;

		/**
		 * 最大带入筹码
		 * @type {number}
		 */
		maxSilver:number = 0;


		/**
		 * 是否显示close按钮
		 * @type {boolean}
         */
		showCloseBtn:boolean = false;


		closeCallback:(val:number)=>void;
		callObj:any;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/comp/DragInUIModuleSkin.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.enterButton = this._comp_subKeyBoard.enterButton;
			this.delButton = this._comp_subKeyBoard.delButton;

			this.btnds = [
				this.enterButton,this.delButton,
				this.btnClear, this.btnGoBank, this.btnClose
			];
			/**绑定0-9数字按键事件 */
			this._comp_subKeyBoard.inputButtonArray.forEach(element=>{
				this.bindButton(element);
			})

			this.btnds.forEach(element => {
				this.bindButton(element);
			});
			__REGISTER_MEDIATOR(DragInMediator,this);
		}

		opening() {
			if (this.uiOpenData) {
				this.updateTotalSilver();
				this.needSilver = this.uiOpenData.minSilver;
				this.maxSilver = this.uiOpenData.maxSilver;
				this.closeCallback = this.uiOpenData.callBack;
				this.callObj = this.uiOpenData.callObj;

				if(uicomps.DEFAULT_NEED_SILVER > 0) {
					this.txtInput.text = uicomps.DEFAULT_NEED_SILVER.toString();
				}
				else {
					if(this.uiOpenData.defaultMin) {
						this.txtInput.text = this.needSilver.toString();
					}
					else {
						if(this.totalValue < this.maxSilver) {
							this.txtInput.text = this.totalValue.toString();
						}
						else {
							this.txtInput.text = this.maxSilver.toString();
						}
					}
				}

				this.btnClose.visible = this.uiOpenData.showCloseBtn;
				this.btnGoBank.visible = this.uiOpenData.showBankBtn;
			}
		}

		updateTotalSilver():void {
			if (this.initialized) {
				this.totalValue = user.getProxy().svrGameData ? user.getProxy().svrGameData.silver : 0;
				this.txtTotal.text = this.totalValue.toString();
			}
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			var btn:egret.DisplayObject = tag;
			for(var i=0; i<10; ++i) {
                if (this._comp_subKeyBoard.inputButtonArray[i] == tag) {
                    this.onInput(i); return;
                }
            }
			if (this.enterButton == btn) {

				this.generatorValue();

				if (this.inputValue > this.maxSilver) {
					var msg:string = gameabc.getMessage("DRAG_MAX_MSG", this.maxSilver);
					tip.popSysCenterTip(msg);
					this.txtInput.text = this.maxSilver.toString();
					return;
				}

				if (this.inputValue > this.totalValue) {
					tip.popSysCenterTip("DRAG_IN_OF")
					return;
				}

				if (this.inputValue < this.needSilver) {
					var msg:string = gameabc.getMessage("DRAG_MIN_MSG", this.needSilver);
					tip.popSysCenterTip(msg)
					this.txtInput.text = this.needSilver.toString();
					return;
				}

				this.closeCallback.call(this.callObj, this.inputValue);

				uicomps.DEFAULT_NEED_SILVER = this.inputValue;
				mc2sdk.event(mc2sdk.EVENT_TYPE.SITDOWN_PK);
				this.close();

			}
			else if (this.btnClear == btn) {
				this.txtInput.text = "0";
				this.inputValue = 0;
			}
			else if (this.btnClose == btn) {
				if(this.callObj){
					this.closeCallback.call(this.callObj, -1);
				}
				this.close();
			}
			else if (this.btnGoBank == btn) {
				__OPEN_PRE_MOUDLE(AppReg.APP_BANK);
			}
			else if (this.delButton == btn) {
				if (this.txtInput.text.length > 0) {
					var input:string = this.txtInput.text;
					input = input.substr(0, input.length - 1);
					this.txtInput.text = input.length>0?input:"0";
				}
			}
		}

		generatorValue():void {
			this.inputValue = this.txtInput.text == "" ? 0 : parseInt(this.txtInput.text);
		}

		onInput(val:number) {
			//如当前为0则不能直接加字符串
			//最大长度限制到10位
			if (this.txtInput.text.length < 10) {
				if(this.txtInput.text=="0"){
					this.txtInput.text = val.toString();
				}else{
					this.txtInput.text += val.toString();
				}
			}
		}

		dispose():void {
			__REMOVE_MEDIATOR(DragInMediator);
			super.dispose();
		}
	}
}