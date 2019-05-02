module cyvos {
    
    /**
	 * @author huangkan
	 *  服务端推送的消息对象
	 */
    export class MatchConfigInfo implements cy.IServerSuruct {

        matchProcessId:number;  //比赛服务processid
        gameProcessId:number;   //游戏服务processid
        groupId:number;         //组id

        matchAppId:number;      //所属比赛服务appid
        gameAppId:number;       //游戏服务appid

        gameId:number;          //比赛的游戏id
	    gamekey:string;			//游戏进程

        matchId:number;
        name:string;			//比赛名称
        startType:number;		//比赛开始类型
        startParam:string;		//比赛开始脚本 具体描述信息
        ruleType:number;		//赛制类型
        signupType:number;		//报名类型
        signupDesc:string;		//报名描述信息 type1=1;name1=100两银子;type2=3;name2=xx道具1个;
        intervalTime:number;	//比赛开始间隔时间
        startTime:number;		//比赛开始创建时间(报名)
        endTime:number;			//比赛结束时间(比赛彻底无效, 不再创建)
        matchUrl:string;		//比赛web介绍页面地址
        matchDesc:string;
        matchReward:string;     //比赛奖励



        decode(inputStream: cy.SrsStreamReader): void {
            this.matchProcessId = inputStream.getInt();
            this.gameProcessId = inputStream.getInt();
            this.groupId = inputStream.getInt();

            this.matchAppId = inputStream.getInt();
            this.gameAppId = inputStream.getInt();

            this.gameId = inputStream.getInt();
            this.gamekey = inputStream.getStr();

            this.matchId = inputStream.getInt();
            this.name = inputStream.getStr();
            
            this.startType = inputStream.getInt();
            this.startParam = inputStream.getStr();
            this.ruleType = inputStream.getInt();
            this.signupType = inputStream.getInt();
            this.signupDesc = inputStream.getStr();
            this.intervalTime = inputStream.getInt();
            this.startTime = inputStream.getInt();
            this.endTime = inputStream.getInt();
            this.matchUrl = inputStream.getStr();
            this.matchDesc = inputStream.getStr();
            this.matchReward = inputStream.getStr();
        }

        encode(outputStream: cy.SrsStreamWriter): void {

        }


    }
}