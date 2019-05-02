module cyvos {
    
    export class MatchPlazaInfo implements cy.IServerSuruct {

        gameId:number;          //比赛的游戏id
        matchId:number;
        subId:number;
        status:number;
        players:number;
        startTime:number;		//比赛开始创建时间(报名)
        endTime:number;			//比赛结束时间(比赛彻底无效, 不再创建)

        flag:number; //后添加的属性，标识是否报名


        decode(inputStream: cy.SrsStreamReader): void {
            this.gameId = inputStream.getInt();
            this.matchId = inputStream.getInt();
            this.subId = inputStream.getInt();
            this.status = inputStream.getByte();
            this.players = inputStream.getInt();
            this.startTime = inputStream.getInt();
            this.endTime = inputStream.getInt();
        }

        encode(outputStream: cy.SrsStreamWriter): void {

        }


    }
}