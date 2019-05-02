module win {
      export function getProxy():WinProxy {
        return __GET_PROXY(WinProxy);
    }
    
    export class WinProxy extends app.mvc.AbsractProxy {
        static NAME:string = "__WIN_PROXY__"
        /**房间BB数***/
        bb:number =0;
        /**进房间打牌手数***/
        hand:number =0;
        /**进房间总盈利数***/
        winNum:number =0;
        /**时间***/
        _timeNum:number =0;
        /**打开ui的类型 */
        type:number  = 0;
        /**进入牌局时数据 */
        _enterData:Object;
        /**是否最后一次领取成长奖励 */
        _isApprenticeship:boolean = false;
        /**是否是没钱导致离开游戏 */
        _isNoMoney:boolean = false;
        /**是否清空了缓存的数据 */
       private isClean:boolean = true;

        constructor(name?:string,data?:any) {
            super(WinProxy.NAME,data);
        }
        
        playOven(winNum:number,bb:number):void
        {
            this.hand++;
            this.winNum+=winNum;
            this.bb=bb;
            if(this._timeNum==0)
            {
                this._timeNum = new Date().getTime()
            }
        }

        /**
         * 结算跳转
         */
        isOpen():void 
        {  
            var roomVO: appvos.RoomVO = user.getProxy().currentRoom;    
            // mtt 和 sng房不弹出行为分析
            if(!roomVO || roomVO.type == room.TYPE.SNG || roomVO.type == room.TYPE.MTT){ 
                this.cleanData();
                return;
            }

            if(this.hand>=12)
            {
                var mul:number = this.winNum/this.bb
                if(mul<300){
                    this.type = 1;
                }
                else if(mul>300){
                    this.type = 2;
                }
            }
            if(this._isApprenticeship&&roomVO.type==room.TYPE.FREE){
                this.type = 3;
            }
            
            this._openModule();
        }

        /**根据type打开页面
         * 试用时需先限制type
         * type>0
         */
        _openModule():void{
            if(this.type)
            {   
                switch(this.type){
                    case 1://行为分析
                        if(this._enterData["joinHand"]!=undefined){
                            __OPEN_PRE_MOUDLE(AppReg.APP_RECORD_ANALYSIS,this._enterData);
                        }else{
                            this.cleanData();
                        }
                        break;
                    case 2://盈利反馈
                        __OPEN_PRE_MOUDLE(AppReg.APP_PLAY_OVEN);
                        break;
                    case 3://出师引导
                        this.cleanData();
                        __OPEN_PRE_MOUDLE(AppReg.WIN_APPRENTICESHIP);
                }
            }else{
                this.cleanData(); 
            }
        }

        get timeNum():string
        {
            var str:string ="";
            var now = new Date().getTime() -this._timeNum;
            str = DateUtils.dateFormat(now,DateUtils.HMS);
            return str;
        }

        cleanData():void
        {
            this.hand =0;
            this.winNum =0;
            this.bb =0;
            this._timeNum =0;
            this.type =0;


            this._enterData = {};
            this.isClean = true;
            this._isApprenticeship = false;
            this._isNoMoney = false;
        }

        /**
         * 获取进入游戏时的玩家对局数据
         * 注：对局数据存储在_enterData
         */
        getEnterData(){
            if(!this.isClean){ // 如果是未清空的数据则直接跳出
                return;
            }

            this.isClean = false;  // 进入时把isClean设置为false，标识有数据

            var userInfo = user.getProxy().playInfoVO;
            // var freeGold = user.getProxy().freeGold;
            if(userInfo == null) {
                this._enterData = {};
                return;
            }
            var obj = {
                joinHand : userInfo.joinHand,
                totalHand : userInfo.totalHand,
                raiseWhenPreflop : userInfo.raiseWhenPreflop,
                betOrRaiseTime : userInfo.betOrRaiseTime,
                callTime : userInfo.callTime,
                raiseTime : userInfo.raiseTime,
                tmHand : userInfo.tmHand,
                continueBetTime : userInfo.continueBetTime,
                betOrRaiseHand : userInfo.betOrRaiseHand,
                spreadHand : userInfo.spreadHand,
                winDivBB : userInfo.winDivBB,
                huntKill : userInfo.huntKill
                // freeGold : freeGold
            };
            this._enterData = obj;

            

        }
         
    }
}

