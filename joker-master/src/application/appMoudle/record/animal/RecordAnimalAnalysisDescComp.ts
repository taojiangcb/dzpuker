module record {
	/** 
	 * 行为分析组件
	 */
	export class RecordAnimalAnalysisDescComp extends gameabc.UICustomComponent {
		private _comp_header: RecordAnimalHeaderComp; // 头像组件
		private _txt_djs:eui.Label; 	// 对局数
		private _txt_rjl:eui.Label; 	// 入局率
		private _txt_wtsd:eui.Label; 	// 摊牌率
		private _txt_pfr:eui.Label; 	// 翻牌前加注率
		private _txt_af:eui.Label; 		// 激进度
		private _txt_lss:eui.Label; 	// 猎杀数
		
		private _txt_description:eui.Label;  	// 风格描述

		private lastUserData:Object;    		// 原始的user data
		private changedUserData:Object; 		// 修改后的user data
		

		/**
		 * 用户信息
		 */
		get userInfo():appvos.UserInfoVO{
			return user.getProxy().playInfoVO;
		}

		public constructor() {
			super();
		}
		
		// 初始化
		private init():void{
			this.updateUI();
		}

		public createComplete(evt:egret.Event){
			super.createComplete(evt);
			this._comp_header._setOnAnalysisUI();
		}

		public dispose(){
			super.dispose();
		}

		// 更新ui数据
        private refreshUIData(dataObj:Object):void{
            this._txt_djs.text = (win.getProxy().hand+"")=="NaN"?
							"0":win.getProxy().hand+""; 		            // 对局数
			this._txt_rjl.text = dataObj["rjl"]+"%";						// 入局率
			this._txt_wtsd.text = dataObj["wtsd"]+"%";						// 摊牌率
			this._txt_pfr.text = dataObj["pfr"]+"%";						// 翻牌前加注率
			this._txt_af.text = dataObj["af"]+"";							// 激进度
			this._txt_lss.text = (this.changedUserData["huntKill"]+"")=="NaN"?
							"0":this.changedUserData["huntKill"]+"";		// 猎杀数
        }
		/**
		 * 更新ui中数据和图像等内容
		 */
		public updateUI():void{
            if(!RecordSingleObject._getSingle().validateUserData(this.changedUserData)) return;// 数据验证不通过直接跳出
			var dataObj = RecordSingleObject._getSingle()._getNeedUpdateUIData(this.changedUserData);
			this.refreshUIData(dataObj);
			// 设置动物头像
			RecordSingleObject._getSingle().setAnimalTypeIndexByUserdata(
				dataObj["rjl"],dataObj["af"],dataObj["wtsd"],dataObj["pfr"]);// 判断当前动物形象
			
			// 新手保护
			RecordSingleObject._getSingle()._protectNewPlayer(this.userInfo.joinHand);
			
			// 更新animal描述数据
			var type = RecordSingleObject._getSingle().getCurrentAnimalType();
            this._comp_header.updateAnimalHeaderUi(type);

			// 更新descrtion
			this._txt_description.text = RecordSingleObject._getSingle().getTypeDesc(type);
			win.getProxy().cleanData();//清空缓存数据
		}

		/**
		 * 设置进入牌局时user的数据
		 */
		public setLastUserInfo(data:Object){
			if(!this.userInfo) return;
			this.lastUserData = data;
			this.changedUserData = {  // 计算牌局差，得到入局后打牌的数据
				joinHand : this.userInfo.joinHand - data["joinHand"],
                totalHand : this.userInfo.totalHand - data["totalHand"],
                raiseWhenPreflop : this.userInfo.raiseWhenPreflop - data["raiseWhenPreflop"],
                betOrRaiseTime : this.userInfo.betOrRaiseTime - data["betOrRaiseTime"],
                callTime : this.userInfo.callTime - data["callTime"],
                raiseTime : this.userInfo.raiseTime - data["raiseTime"],
                tmHand : this.userInfo.tmHand - data["tmHand"],
                continueBetTime : this.userInfo.continueBetTime - data["continueBetTime"],
                betOrRaiseHand : this.userInfo.betOrRaiseHand - data["betOrRaiseHand"],
                spreadHand : this.userInfo.spreadHand - data["spreadHand"],
                winDivBB : this.userInfo.winDivBB - data["winDivBB"],
				huntKill : this.userInfo.huntKill - data["huntKill"]
			};
		    this.init();
		}
		
	}
}