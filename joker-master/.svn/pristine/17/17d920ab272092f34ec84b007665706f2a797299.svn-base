module appvos {

	export class MatchVO {

        /** 比赛ID */ 
        matchId:number = -1;
        /** 报名成功后，会获得subId */
        subId:number = 0;

        /** 报名费 */ 
        entryFee:number;
        /** 税费 */
        tax:number;
        /** 比赛名 */
        name:string;
        /** 开始时间 */
        startTime: number;

        /** 名次奖励 */
        rewards:MatchRewardVO[];

        blinds:MatchBlindsVO[];

        /** 转轮奖励 */
        wheelBonus:number = 0;

        /** 该场比赛转轮的动画是否播放过 */
        wheelPlayed:boolean;

        /** 下场报名自动使用银子 */
        autoCoin:boolean;

        isSigned:boolean;

        /** 复用房间类型的枚举变量 */
        type:number = 0;

        /** 用户排序、折叠 */
        orderId:number = 0;

        myRank:number = 0;

        /** 比赛在线人数 */ 
        numPlayers:number = 0; //比赛中的玩家人数

        numSignups:number = 0; //报名人数

        maxPlayers:number = 7;

        minPlayers: number;//最少人数

        rankList:MttRankVO[] = [];

        remindStepVO:app.TimerStepParam;

        /** 比赛时所在的房间ID */
        gameAppId:number;

        /** 比赛当前状态 */
        svrStatus:number;

        svrConfigInfo:cyvos.MatchConfigInfo;

        signupStartTime:number //开启报名的时间戳

        signupEndTime:number //关闭报名时间

        cancelEndTime:number //退赛截止时间
        
        bet: number = 0;//初始筹码

        blindsIndex:number = 0;//盲注级别

        blindsUpTime:number = 0;//下次升盲时间

        isSignuping:boolean=false;//正在报名

        wasRemind:boolean=false;//是否显示过开赛提醒

        

    }



}
        