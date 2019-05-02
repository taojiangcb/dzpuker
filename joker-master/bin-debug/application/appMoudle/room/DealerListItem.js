var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var room;
(function (room) {
    var DealerListItem = (function (_super) {
        __extends(DealerListItem, _super);
        function DealerListItem() {
            var _this = _super.call(this) || this;
            _this.scale = 1;
            _this.skinName = "DealerListItemSkin";
            _this.width = 200;
            _this.height = 400;
            _this.group.y = 200;
            return _this;
        }
        DealerListItem.prototype.changeScale = function (scrollH) {
            var midx = this.parent.width * 0.5;
            var scale = Math.sin((1 - (this.width * 0.5 + this.x - scrollH) / midx) * Math.PI / 2 + Math.PI / 2); //Math.abs(1-(this.width*0.5+this.x-scrollH) / midx) //
            this.scale = this.group.scaleX = this.group.scaleY = 0.6 + scale / 2;
            return this.scale;
        };
        DealerListItem.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.addButton(this.group, false);
        };
        DealerListItem.prototype.dataChanged = function () {
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
                var source;
                if (true)
                    source = "tempassets/dealershow/img_dealer.png";
                else
                    source = "http://download.zgsjl8.com/dz/dealer/img_dealer.png";
                this.headimg.source = this.tweenheadimg.source = this.data.dealerInfoVO.faceid ? this.data.dealerInfoVO.faceid : source;
                this.statusimg.source = this.data.dealerInfoVO.online ? "icon_zaixian_zr_png" : "icon_lixianzhong_zr_png";
                this.clickimg.visible = this.data.dealerInfoVO.online ? true : false;
                this.signgroup.visible = this.data.dealerInfoVO.online ? false : true;
                this.titlelabel.textFlow = [
                    { text: this.data.dealerInfoVO.name, style: { "textColor": AppConst.TextColors.yellow } },
                    { text: "的" + FormatUtils.wan(this.data.roomVO.maxBank) + "场" }
                ];
                this.blindlabel.text = "(" + FormatUtils.wan(this.data.roomVO.smallBlinds) + "/" + FormatUtils.wan(this.data.roomVO.bigBlinds) + ")";
                this.group.visible = true;
                this.numlab.text = this.data.roomVO.online.toString();
            }
            else
                this.group.visible = false;
        };
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
        DealerListItem.prototype.click = function (tag) {
            if (tag == this.group) {
                if (1) {
                    this.tweenheadimg.visible = true;
                    this.tweenheadimg.alpha = 1;
                    this.tweenheadimg.scaleX = this.tweenheadimg.scaleY = 1;
                    egret.Tween.removeTweens(this.tweenheadimg);
                    egret.Tween.get(this.tweenheadimg).to({ alpha: 0, scaleX: 2, scaleY: 2 }, 300).call(this.tweencomp, this);
                }
                else {
                    tip.popSysCenterTip("荷官不在线");
                }
            }
        };
        DealerListItem.prototype.tweencomp = function () {
            this.tweenheadimg.visible = false;
            user.gotoRoom(this.data.roomVO);
        };
        return DealerListItem;
    }(uicomps.BaseItemCilckRenderer));
    room.DealerListItem = DealerListItem;
    __reflect(DealerListItem.prototype, "room.DealerListItem");
})(room || (room = {}));
//# sourceMappingURL=DealerListItem.js.map