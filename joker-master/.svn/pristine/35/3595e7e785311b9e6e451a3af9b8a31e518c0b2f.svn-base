module room {
	/**
	 *
	 * @author 
	 *
	 */
    export class Table2Renderer extends uicomps.BaseItemCilckRenderer {
        
        blindsLabel: eui.Label;
        numPlayersLabel: eui.Label;
        maxBankLabel:eui.Label;
        continer:eui.Group;
        
        txt3:eui.Label;
        tableIdTxt:eui.Label;

        public constructor() {
            super();
            this.skinName = "TableItem2Skin";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.addButton(this.continer,true);
            this.continer.touchChildren = false;
        }
        
        get tableVo(): TableVO {
            return this.data;
        }
        
        get roomVo():appvos.RoomVO {
            // return this.tableVo.roomInfo;
            return user.getProxy().currentRoom;
        }
        
        
        dataChanged(): void {
            if(this.tableVo==null || this.roomVo==null) return;
            var sb = FormatUtils.qian(this.roomVo.smallBlinds);
            var bb = FormatUtils.qian(this.roomVo.bigBlinds);
            this.blindsLabel.text =  "盲注:" + sb + '/' + bb;
            this.maxBankLabel.text = FormatUtils.qian(this.roomVo.maxBank)+"带入";
            this.txt3.text = room.getProxy().getNumPlayers(this.tableVo)+"/9";
            this.tableIdTxt.text = "桌号:" + this.tableVo.svrTableInfo.svrId;
        }
        
        click(tag: egret.DisplayObject): void {
            super.click(tag);
            var tableId = this.tableVo.svrTableInfo.svrId;
            var sitId = room.getProxy().searchEmptySit(tableId);
            __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[1,tableId,sitId,""]);//坐下
        }
	}
}
