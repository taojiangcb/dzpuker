module cy {
    export class SlotCommand extends cy.ToolCommand {
        TASKMSG:string = "TASKMSG";
        sendHandler(data: any, stream: SrsStreamWriter): void {
            if (data instanceof Array) {
                var gameid = data[1];
                data = data[0];
            } else {
                gameid = AppConst.GAME_ID;
            }
            super.sendHandler(data,stream);
            switch (this.action) {
                case app.NetAction.PROCESS_XYID_REQ_DO_SLOT:
                    stream.putInt(20);                               //askId
                    stream.putInt(2);        //numid;                           //type
                    break;
            }
        }

        resultHandler(stream:SrsStreamReader):void {
            switch(this.action) {
                case app.NetAction.PROCESS_XYID_RESP_DO_SLOT:
                    // var numid:number = stream.getInt();
                    // var areaId:number = stream.getInt();
                    break;
            }
        }
    }
}