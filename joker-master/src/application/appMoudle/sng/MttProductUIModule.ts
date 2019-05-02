module match {
	export class MttProductUIModule extends app.base.BaseWndUIMoudleComponent {


		public list_product:eui.List;
		public btnClose:eui.Image;
		public btnExchangeNum:eui.Group;
		public btnHistory:eui.Group;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/sng/product/MttProductListUIModule.exml";
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);

			var listLayout:eui.VerticalLayout = new eui.VerticalLayout();
			listLayout.gap = 0;

			this.list_product.itemRenderer = match.MttProductItemRenderer;
			this.list_product.layout = listLayout;

			this.bindButton(this.btnExchangeNum);
			this.bindButton(this.btnHistory);
			this.bindButton(this.btnClose);
			
			__REGISTER_MEDIATOR(MttExchangeMediator)
			// match.getProductProxy().updateProductList();//话费列表
			match.getProductProxy().updateRedpackList();//红包列表
		}

		updateList():void {
			var listData:eui.ArrayCollection = new eui.ArrayCollection(getProductProxy().product_list);
			this.list_product.dataProvider = listData;
		}

		updateItem(productInfo:MTTProductVO):void {
			var listData:eui.ArrayCollection = <eui.ArrayCollection>this.list_product.dataProvider;
			if(listData){
				listData.itemUpdated(productInfo);
			}
			
		}

		touchBindButtonHandler(tag:egret.DisplayObject):void {
			if(tag == this.btnExchangeNum) {
				__OPEN_PRE_MOUDLE(AppReg.MTT_EXCHANGE_CODE);
			}
			else if(tag == this.btnHistory) {
				__OPEN_PRE_MOUDLE(AppReg.MTT_EXCHANGE_HISTORY);
			}
			else if(tag == this.btnClose){
				this.close();
			}
		}

		dispose():void {
			__REMOVE_MEDIATOR(MttExchangeMediator);
			super.dispose();
		}
	}
}