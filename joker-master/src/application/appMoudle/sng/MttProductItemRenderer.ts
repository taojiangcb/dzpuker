module match {
	export class MttProductItemRenderer extends uicomps.BaseItemCilckRenderer {

		public imgCard:eui.Image;
		public btnExchange:eui.Image;
		public txtMemo:eui.Label;
		public txtCount:eui.Label;

		public constructor() {
			super();
			this.skinName = "resource/app_skin/sng/product/MttProductItem.exml";
			this.touchEnabled = false;
			this.touchChildren = true;
		}

		createComplete(event:egret.Event):void {
			super.createComplete(event);
			this.addButton(this.btnExchange,true);
		}

		get productVO():match.MTTProductVO {
			return this.data instanceof match.MTTProductVO ? this.data : null;
		}
		get redpackVO():match.MTTRedpackVO {
			return this.data instanceof match.MTTRedpackVO ? this.data : null;
		}

		dataChanged():void {

			if (this.productVO != null) {
				var memo_str:string = '<font color="#ffbd35">{0}</font><font color="#c4d3b8">{1}</font>';
				memo_str = gameabc.StringUtils.formatString(memo_str,this.productVO.title,this.productVO.desc);
				this.txtMemo.textFlow = utils.HtmlTextUtils.transferHtmlText(memo_str);

				var count_str:string = '您当前可以兑<font color="#ffbd35">{0}</font>次'
				count_str = gameabc.StringUtils.formatString(count_str,this.productVO.num);
				this.txtCount.textFlow = utils.HtmlTextUtils.transferHtmlText(count_str);

				this.imgCard.source = this.productVO.pic + "_png";
			}

			else if (this.redpackVO != null) {
				this.txtMemo.text = "兑换红包需关注游戏茶苑公众号（gameteacom）";
				var count_str:string = gameabc.StringUtils.formatString('您当前可以兑<font color="#ffbd35">{0}</font>次',this.redpackVO.num);
				this.txtCount.textFlow = utils.HtmlTextUtils.transferHtmlText(count_str);
				this.imgCard.source = "img_hongbao_bg_mtt_png";
			}


		}

		click(tag:egret.DisplayObject):void {
			if(tag == this.btnExchange) {
				if (this.productVO != null) {
					__OPEN_PRE_MOUDLE(AppReg.MTT_EXCHANGE,{ptInfo:this.data});
				} else if (this.redpackVO != null) {
					match.getProductProxy().exchangeRedpack(this.redpackVO);
				}
			}
		}
	}
}