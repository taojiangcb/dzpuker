module appvos {

    export class DealerTableVO {
        dealerInfoVO: DealerInfoVO;
        roomVO:RoomVO;
        tableId:number;
        photo:string;
        numPlayers:number;

        getRoomVOById(roomid: number): appvos.RoomVO {
			var roomVO: appvos.RoomVO = null;
			for (var i = 0; i < room.getProxy().room7.length; i++) {
				if (roomid == room.getProxy().room7[i].svrOfsId) {
					roomVO = room.getProxy().room7[i];
					break;
				}
			}
			return roomVO;
		}

        updateRoomVO() {
            var roomVO = this.getRoomVOById(this.dealerInfoVO.roomid);
            if (roomVO) {
                this.roomVO = roomVO;
            }
            this.numPlayers = this.roomVO.online? this.roomVO.online: 0;
        }
    }
}