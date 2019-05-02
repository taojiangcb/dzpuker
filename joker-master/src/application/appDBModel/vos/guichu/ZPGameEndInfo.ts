module appvos {
	export class ZPGameEndInfo {

		card:number = 0;        	//牌信息
  		showrand:number = 0;    	//显示随机
  		infoVO:ZPInfoVO[] = [];   	//玩家结算信息

		public constructor(data:any) {
			if(data) {
				var vo = AppGlobal.getMessage("ZPGameEndVO").decode(data);
				this.setData(vo);
			}
		}

		setData(data:any) {
			if(data) {
				this.card = data.card;
				this.showrand = data.showrand;
				if(data.infoVO) {
					var item:ZPInfoVO;
					var len:number = data.infoVO.length;
					for(var i:number = 0; i < len; i++) {
						item = new ZPInfoVO(data.infoVO[i]);
						this.infoVO.push(item);
					}
				}
			}
			else {
				this.clear();
			}
		}

		clear():void {
			this.card = 0;
			this.showrand = 0;
			this.infoVO = [];
		}
	}
}