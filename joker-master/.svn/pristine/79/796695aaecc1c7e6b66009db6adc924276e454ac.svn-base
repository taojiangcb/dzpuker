module room {
    export class VipRoomRenderer extends uicomps.ChrooseMenuItemRenderer {
        
        get roomVO():appvos.RoomVO {
            return this.dataPropert.value;
        }
        
        dataChanged():void {
            super.dataChanged();
            this.txtLabel.text = FormatUtils.qian(this.roomVO.smallBlinds) 
            + "/" + FormatUtils.qian(this.roomVO.bigBlinds);
        }
        
        click(tag:egret.DisplayObject):void {
            super.click(tag);
            // user.getProxy().currentRoom = this.roomVO;
            // __SEND_NOTIFICATION(app.NetAction.JOIN_ROOM);
        }
        
    }
}