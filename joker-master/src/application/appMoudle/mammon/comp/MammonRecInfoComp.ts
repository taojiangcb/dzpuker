module mammon {
	export class MammonRecInfoComp extends gameabc.UICustomComponent {
		private _txt_recordTime:eui.Label;  // 中奖时间
		private _txt_record:eui.Label;		// 中奖记录

		private _time:number;      // 中奖时间
		private _userName:string;  // 中奖人
		private _num:number;	   // 中奖金额

		public constructor(time:number,userName:string,num:number) {
			super();
			this.skinName = "resource/app_skin/mammon/comp/MammonRecInfoComp.exml";
			
			this._time = time;
			this._userName = userName;
			this._num = num;

			
			
		}

		public createComplete(event:egret.Event):void {
            super.createComplete(event);

			// 更新ui数据
			this.setUIData(getProxy().getRecordTime(this._time),this._userName,this._num+'');
        }

		/**
		 * 设置uidata
		 * @param _time 中奖时间字符串
		 * @param _userName 中奖玩家name
		 * @param _num 中奖金额数目
		 */
		setUIData(_time:string = null, _userName:string =null ,_num:string = null):void{
			var textFlow;
			this._txt_recordTime.text = _time?_time:"01-01 01:00";
			if(_num.length>0 && _userName.length>0){
				 textFlow = utils.HtmlTextUtils.appendHtmlText(null,"恭喜玩家",AppConst.TextColors.white);
				 textFlow = utils.HtmlTextUtils.appendHtmlText(textFlow,_userName,AppConst.TextColors.darkYellow);
				 textFlow = utils.HtmlTextUtils.appendHtmlText(textFlow,"获得奖池",AppConst.TextColors.white);
				 textFlow = utils.HtmlTextUtils.appendHtmlText(textFlow,_num+"彩豆",AppConst.TextColors.darkYellow);
				 this._txt_record.textFlow = textFlow;
			}
		}
	}
}