module room {
	export class DealerListItem extends uicomps.BaseItemCilckRenderer{
		public group: eui.Group;
		public scale: number = 1;
		public headimg: eui.Image;
		public tweenheadimg: eui.Image;
		public numlab:eui.Label;
		public statusimg: eui.Image;
		public clickimg: eui.Image;
		public signgroup: eui.Group;
		public titlelabel: eui.Label;
		public blindlabel: eui.Label;

		public constructor() {
			super();
			this.skinName = "DealerListItemSkin";
			this.width = 200;
			this.height = 400;
			this.group.y = 200;
		}
	
		public changeScale(scrollH:number): number{
			var midx = this.parent.width * 0.5;

			var scale = Math.sin((1-(this.width*0.5+this.x-scrollH) / midx)*Math.PI/2 +Math.PI/2)//Math.abs(1-(this.width*0.5+this.x-scrollH) / midx) //
			this.scale = this.group.scaleX = this.group.scaleY = 0.6 + scale / 2;
			return this.scale;
		}
		 public createComplete(evt: egret.Event): void {     
			 super.createComplete(evt);
			 this.addButton(this.group, false);
        } 
		dataChanged() {
			if (this.data) {
				// var roomVO: appvos.RoomVO = this.getRoomVOById(this.data.roomid);
				// if (roomVO == null) roomVO = room.getProxy().getFakeRoomVO();
				// else __SEND_NOTIFICATION(app.NetAction.TOOL_NUMPLAYERS, [roomVO.svrRoomId]);
				// this.roomVO = roomVO;
				// var dealerTabelVO = new appvos.DealerTableVO();
				// dealerTabelVO.roomVO = roomVO;
				// dealerTabelVO.photo = this.data.faceid;
				// dealerTabelVO.tableId = this.data.tableid;
				// dealerTabelVO.numPlayers = 0;
				// this.dealerTabelVO = dealerTabelVO;
				// this.data as appvos.DealerTableVO;
				var source: String;
				if (DEBUG) source = "tempassets/dealershow/img_dealer.png";
				else source = "http://download.zgsjl8.com/dz/dealer/img_dealer.png";
				this.headimg.source = this.tweenheadimg.source = this.data.dealerInfoVO.faceid? this.data.dealerInfoVO.faceid: source;
				this.statusimg.source = this.data.dealerInfoVO.online? "icon_zaixian_zr_png": "icon_lixianzhong_zr_png";
				this.clickimg.visible = this.data.dealerInfoVO.online? true: false;
				this.signgroup.visible = this.data.dealerInfoVO.online? false: true;
				this.titlelabel.textFlow = <Array<egret.ITextElement>>[
					{text: this.data.dealerInfoVO.name, style: {"textColor": AppConst.TextColors.yellow}},
					{text: "的" + FormatUtils.wan(this.data.roomVO.maxBank) + "场"}
				]
				this.blindlabel.text = "(" + FormatUtils.wan(this.data.roomVO.smallBlinds) + "/" + FormatUtils.wan(this.data.roomVO.bigBlinds) + ")";
				this.group.visible = true;
				this.numlab.text = this.data.roomVO.online.toString();
			} else this.group.visible = false;
		}

		// getRoomVOById(roomid: number): appvos.RoomVO {
		// 	var roomVO: appvos.RoomVO = null;
		// 	for (var i = 0; i < room.getProxy().room7.length; i++) {
		// 		if (roomid == room.getProxy().room7[i].roomVO.svrOfsId) {
		// 			roomVO = room.getProxy().room7[i].roomVO;
		// 			break;
		// 		}
		// 	}
		// 	return roomVO;
		// }

		// updatePlayerNumber() {
		// 	if (this.roomVO && this.roomVO.svrRoomId)
		// 	this.numlab.text = room.getProxy().getRoomVOByRoomId(this.roomVO.svrRoomId).online.toString();
		// 	else this.numlab.text = "0";
		// }
 		/**
         * 按钮点击  tag 点中的显示对象
         * */
        protected click(tag: egret.DisplayObject): void {
			if (tag == this.group) {
				if (1) {//this.data.dealerInfoVO.online != 0) {
					this.tweenheadimg.visible = true;
					this.tweenheadimg.alpha = 1;
					this.tweenheadimg.scaleX = this.tweenheadimg.scaleY = 1;
					egret.Tween.removeTweens(this.tweenheadimg);
					egret.Tween.get(this.tweenheadimg).to({alpha:0,scaleX:2,scaleY:2},300).call(this.tweencomp,this);
				} else {
					tip.popSysCenterTip("荷官不在线");
				}
		   }
		 }
		private tweencomp(): void{
			this.tweenheadimg.visible = false;
			user.gotoRoom(this.data.roomVO);
		}
	}
}