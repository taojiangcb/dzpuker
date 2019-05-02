module mammon {
	export class newMammonUIModule extends app.base.BaseWndUIMoudleComponent {
		private _group_recordList : eui.Group;	// group
		private _btn_close:eui.Image;   // 关闭按钮
		private _txt_poolNum:eui.BitmapLabel; // 池总额
		private _txt_lastNum:eui.BitmapLabel; // 距开奖局数
		private _recordNum = 0;   // 奖池记录数目
		
		/**--------------奖池说明label---------------- */
		private _label_intr1:eui.Label;
		private _label_intr2:eui.Label;
		private _label_intr3:eui.Label;
		/**------------------------------------------ */
		
		public constructor() {
			super();
			this.skinName = "resource/app_skin/mammon/newMammonUIModule.exml"
		}

		createComplete(event:egret.Event):void {
            super.createComplete(event);
			this.bindButton(this._btn_close,true);
			this.init();

			this._label_intr1.text = gameabc.getMessage("MAMMON_INTR_1");
			this._label_intr2.text = gameabc.getMessage("MAMMON_INTR_2");
			this._label_intr3.text = gameabc.getMessage("MAMMON_INTR_3");

        }

		/**初始化 */
		init():void{
			this._resetRecordList();
			this._updateUIData();
		}

		/**
		 * 重置视图中获奖记录列表
		 * 根据mammon缓存的记录池自动生成
		 */
		_resetRecordList(){
			var pool : Array<string[]> = getProxy()._poolRecords;
			if(!pool.length) return; 
			for(var i = 0; i < pool.length; i++ ){
				this._group_recordList.addChild(
					new MammonRecInfoComp(
						parseInt(pool[i][0]),
						pool[i][1],
						parseInt(pool[i][2]))
						);
			
			} 
		}

		/**
		 * 往视图中添加一条获奖记录信息
		 * @param timeSpan 时间戳
		 * @param name 玩家name
		 * @param recordNum 获奖金额
		 */
		_addRecordList(timeSpan:number,name:string,recordNum:number):void{
			var length = this._group_recordList.$children.length;
			if(length >= 20){
				this._group_recordList.removeChildAt(length-1); // 移除最后一位
				this._group_recordList.addChildAt(
					new MammonRecInfoComp(timeSpan,name,recordNum),0
				);
			}
		}

		/**
		 * 更新ui数据，更新前需先更新proxy中的缓存数据
		 */
		_updateUIData():void{
			this._txt_lastNum.text = getProxy()._farToWinning?getProxy()._farToWinning+"":"0";
			this._txt_poolNum.text = getProxy()._getTotalPoolString();
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			switch(tag){
				case this._btn_close:
					this.close();
					break;
				default: this.close();
					break;
			}
		}

		/**关闭模块 */
		close():void{
			super.close();
		}

		
	}
}