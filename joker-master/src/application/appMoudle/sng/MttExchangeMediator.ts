module match {
	export class MttExchangeMediator extends app.mvc.AbstractMediator {

		static NAME:string = "__MttExchangeMediator__";

		static UPDATE_PRODUCT_LIST:string = "updateProductList_exchange"; 	//刷新列表显示
		static UPDATE_PRODUCT_ITEM:string ="updateProductItem"; 				//更新某单项数据
		static EXCHANGE_RESULT:string = "exchange_mtt_result";				//兑换成功
		static EXCHANGE_CODE_RESULT:string = "exchange_code_succeed";		//兑换激活成功
		static EXCHANGE_HISTORY:string = "exchangeHistory";					//兑换历史记录

		public constructor(view?:any) {
			super(MttExchangeMediator.NAME,view);
		}

		listNotificationInterests():string[] {
			return [
				MttExchangeMediator.UPDATE_PRODUCT_LIST,
				MttExchangeMediator.UPDATE_PRODUCT_ITEM,
				MttExchangeMediator.EXCHANGE_RESULT,
				MttExchangeMediator.EXCHANGE_CODE_RESULT,
				MttExchangeMediator.EXCHANGE_HISTORY
			];
		}

		handleNotification(notification:puremvc.INotification):void {
			var name:string = notification.getName();
			switch(name) {
				case MttExchangeMediator.UPDATE_PRODUCT_LIST:
					var view:match.MttProductUIModule = this.getProductListView();
					if(view) {
						view.updateList();
					}
					break;
				case MttExchangeMediator.UPDATE_PRODUCT_ITEM:
					break;
				case MttExchangeMediator.EXCHANGE_RESULT:
					__CLOSE_MOUDLE(AppReg.MTT_EXCHANGE);
					break;
				case MttExchangeMediator.EXCHANGE_CODE_RESULT:
					__CLOSE_MOUDLE(AppReg.MTT_EXCHANGE_CODE);
					break;
				case MttExchangeMediator.EXCHANGE_HISTORY:
					var ls:match.HitoryVO[] = notification.getBody();
					var win:match.MttExchangeHistoryUIModule = this.getHistoryListView();
					if(win){
						win.fullDatas(ls);
					}
					break;
			}
		}

		getProductListView():match.MttProductUIModule {
			if(__IS_MOUDLE_OPEN(AppReg.MTT_PRODUCT)) {
				return <match.MttProductUIModule>__GET_MOUDLE_COMP(AppReg.MTT_PRODUCT);
			}
		}

		getHistoryListView():match.MttExchangeHistoryUIModule {
			if(__IS_MOUDLE_OPEN(AppReg.MTT_EXCHANGE_HISTORY)) {
				return <match.MttExchangeHistoryUIModule>__GET_MOUDLE_COMP(AppReg.MTT_EXCHANGE_HISTORY);
			}
		}
	}
}