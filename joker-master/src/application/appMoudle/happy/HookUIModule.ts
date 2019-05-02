module happy {
	export class HookUIModule extends app.base.BaseWndUIMoudleComponent{

		public condition_num2:eui.BitmapLabel;
		public condition_num1:eui.BitmapLabel;
		public condition1:eui.RadioButton;
		public condition2:eui.RadioButton;
		public condition3:eui.RadioButton;
		public bet_num2:eui.BitmapLabel;
		public bet_num1:eui.BitmapLabel;
		public bet_full:eui.RadioButton;
		public bet_1:eui.RadioButton;
		public bet_2:eui.RadioButton;
		public profit_label:eui.Label;
		public loose_label:eui.Label;
		public over_label:eui.Label;
		public over_num:eui.CheckBox;
		public profit_2:eui.CheckBox;
		public profit_1:eui.CheckBox;
		public game_num:eui.Label;
		public bet_num:eui.Label;
		public profit_number:eui.Label;
		public hook_btn:eui.Group;
		public hooking:eui.Label;
		public btnClose:eui.Image;
		imgHooklabel:eui.Image;
		public maskRect:eui.Rect;
		public edit_1:eui.Image;
		public edit_2:eui.Image;
		public edit_3:eui.Image;

		//押注条件
		coditionGroup:eui.RadioButtonGroup;
		//抽注筹码
		betGroup:eui.RadioButtonGroup;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/playcards/HookUIModule.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);

			this.hook_btn.touchChildren = false;
			this.hook_btn.touchEnabled = true;

			this.bindButton(this.btnClose);
			this.bindButton(this.hook_btn);

			this.bindButton(this.condition1,false)
			this.bindButton(this.condition2,false)
			this.bindButton(this.condition3,false)

			this.bindButton(this.edit_1);
			this.bindButton(this.edit_2);
			this.bindButton(this.edit_3);

			this.bindButton(this.profit_1,false);
			this.bindButton(this.profit_2,false);
			this.bindButton(this.over_num,false);

			this.bindButton(this.bet_full,false)
			this.bindButton(this.bet_1,false)
			this.bindButton(this.bet_2,false)

			this.coditionGroup = new eui.RadioButtonGroup();
			this.betGroup = new eui.RadioButtonGroup();

			this.condition1.group = this.condition2.group = this.condition3.group = this.coditionGroup;
			this.bet_full.group = this.bet_1.group = this.bet_2.group = this.betGroup;
			
			this.dataChanged(); 
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			var btn:egret.DisplayObject = tag;
			var minBank:number = room.getProxy().current ?room.getProxy().current.minBank : 0;
			var hkInfo:HookVO = getProxy().hookInfo;
			if(btn == this.btnClose) {
				this.close();
			}
			else if(btn == this.hook_btn) {
				this.saveHook();
				if(getProxy().hookingFlag) {
					//开始新的一轮挂机,累计清0
					hkInfo.totalProfit = hkInfo.gameCount = hkInfo.betCount = 0;
					mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50059);
					this.close();
				} else {
					__SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_HOOK);	
					mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50060);
				} 
			}
			else if(btn == this.edit_1 || (btn == this.profit_1 && hkInfo.profitValue == 0)) {
				uicomps.KeyboardUIMoudleComp.show((value:number)=>{
					if(value) {
						mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50057);
						hkInfo.profitValue = value;
						this.profit_label.text = FormatUtils.wan5(value);
					}	
					else {
						this.profit_1.selected = false;
						if(value == 0){
							hkInfo.profitValue = value;
							this.profit_label.text = FormatUtils.wan5(value);
						} 
					}			
				},this,hkInfo.profitValue == 0 ? "" : hkInfo.profitValue.toString());	
			} 
			else if(btn == this.edit_2 || (btn == this.profit_2 && hkInfo.loosValue == 0)) {
				uicomps.KeyboardUIMoudleComp.show((value:number)=>{				
					if(value) {
						mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50058);
						hkInfo.loosValue = value;
						this.loose_label.text = FormatUtils.wan5(value);
					}
					else {
						this.profit_2.selected = false;
						if(value == 0) {
							hkInfo.loosValue = value;
							this.loose_label.text = FormatUtils.wan5(value);
						}
					}
				},this,hkInfo.loosValue == 0 ? "" : hkInfo.loosValue.toString());	
			}
			else if(btn == this.edit_3 || (btn == this.over_num && hkInfo.over_count == 0)) {
				uicomps.KeyboardUIMoudleComp.show((value: number) => {
					if(value) {
						hkInfo.over_count = value;
						this.over_label.text = value.toString() + "局";
					} 
					else {
						this.over_num.selected = false;
						if(value == 0 ) {
							hkInfo.over_count = value;
							this.over_label.text = value.toString() + "局";
						}
					}
				},this,hkInfo.over_count == 0 ? "10" : hkInfo.over_count.toString() );	
			}
			else if(btn == this.condition1) {
				mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50051);
			} 
			else if(btn == this.condition2) {
				mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50052);
			}
			else if(btn == this.condition3) {
				mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50053);
			}
			else if(btn == this.bet_full) {
				mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50054);
			}
			else if(btn == this.bet_1) {
				mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50055);
			}
			else if(btn == this.bet_2) {
				mc2sdk.event(mc2sdk.EVENT_TYPE.HOOK_50056);
			}
			
		}

        close(): void{
			super.close();
			__SEND_NOTIFICATION(app.constant.AppMediatorConst.HAPPY_HOOK);
		}
		/**
		 * 数据发生变动的时候刷新
		 */
		dataChanged():void {
			var hookInfo:HookVO = getProxy().hookInfo;
			if(hookInfo) {

				this.game_num.text = hookInfo.gameCount.toString() + "局";
				this.bet_num.text = hookInfo.betCount.toString() + "局";
				this.profit_number.text = FormatUtils.wan5(hookInfo.totalProfit);

				var winRatio:number = hookInfo.winRatio;
				if(winRatio == WIN_RATIO.zero) {
					this.condition1.selected = true;
					this.condition2.selected = this.condition3.selected = false;
				} 
				else if(winRatio == WIN_RATIO.fifty ) {
					this.condition2.selected = true;
					this.condition1.selected = this.condition3.selected = false;
				}
				else if(winRatio == WIN_RATIO.forty) {
					this.condition3.selected = true;
					this.condition2.selected = this.condition1.selected = false;
				}

				var bet:number = hookInfo.betMode;
				if(bet == BET.fold) {
					this.bet_2.selected = this.bet_full.selected = false;
					this.bet_1.selected = true;
				}
				else if(bet == BET.folds){
					this.bet_1.selected = this.bet_full.selected = false;
					this.bet_2.selected = true;
				}
				else if(bet == BET.min) {
					this.bet_1.selected = this.bet_full.selected = false;
					this.bet_full.selected = true;
				}

				this.profit_1.selected = this.profit_2.selected = this.over_num.selected = false;
				var stopMode:boolean = hookInfo.stopProfit;
				if(stopMode) {
					this.profit_1.selected = true;
					
				} 
				stopMode = hookInfo.stopLoose;
				if(stopMode) {
					this.profit_2.selected = true;
				}
				stopMode = hookInfo.stopCount;
				if(stopMode) {
					this.over_num.selected = true;
				}

				this.profit_label.text = FormatUtils.wan5(hookInfo.profitValue);
				this.loose_label.text = FormatUtils.wan5(hookInfo.loosValue);
				this.over_label.text = hookInfo.over_count.toString() + "局";

				var bets:number[] = room.getProxy().current ? room.getProxy().current.addBlinds : [0,0,0];
				this.bet_num1.text = FormatUtils.wan5((bets[1] * 10*getProxy().addTimes));
				this.bet_num2.text = FormatUtils.wan5((bets[2] * 2*getProxy().addTimes));
				
				this.changeMask();
			}
		}

		/**
		 * 保存挂机参数
		 */
		saveHook():void {
			var winRatio:number = 0;
			if(this.coditionGroup.selection == this.condition1) {
				winRatio = WIN_RATIO.zero;
			} 
			else if(this.coditionGroup.selection == this.condition2) {
				winRatio = WIN_RATIO.fifty;
			}
			else if(this.coditionGroup.selection == this.condition3) {
				winRatio = WIN_RATIO.forty;
			}

			var bigs:number[] = room.getProxy().current ? room.getProxy().current.addBlinds:[0,0,0];
			var bigBlinds:number = room.getProxy().current ? room.getProxy().current.bigBlinds : 0
			var betMode:number = BET.min;
			var betValue:number = 0;
			if(this.betGroup.selection == this.bet_1) {
				betValue = bigs[1] * 10*getProxy().addTimes;
				betMode = BET.fold;
			}
			else if(this.betGroup.selection == this.bet_2) {
				betValue = bigs[2] * 2*getProxy().addTimes;
				betMode = BET.folds;
			}
			else if(this.betGroup.selection == this.bet_full) {
				betValue = bigBlinds * 2*getProxy().addTimes;
				betMode = BET.min;
			}

			var hookInfo = getProxy().hookInfo;
			if(hookInfo) {

				hookInfo.stopProfit = this.profit_1.selected;
				hookInfo.stopLoose = this.profit_2.selected;
				hookInfo.stopCount = this.over_num.selected;

				hookInfo.betMode = betMode;
				hookInfo.betValue = betValue;
				hookInfo.winRatio = winRatio;

			}

			getProxy().hookingFlag = !getProxy().hookingFlag
			this.changeMask();
		}

		/**
		 * 挂机判断
		 */
		changeMask():void {
			if(getProxy().hookingFlag) {
				this.maskRect.visible = true;
				this.hooking.visible = true;
				this.imgHooklabel.source = "img_assistant_tzgj_png";
			} 
			else {
				this.maskRect.visible = false;
				this.hooking.visible = false;
				this.imgHooklabel.source = "img_assistant_ksgj_png";
			}
		}
	}
}