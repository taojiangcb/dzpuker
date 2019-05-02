// TypeScript file

module appvos {


    /**
     * 初始化时的桌子信息
     */
    export class ZPTableVO {

        gTableId:number = 0;                    //房间ID
        roleId:number = 0;                      //房主ID(当前机号)
        roomName:string = "";                   //房间名称
        tableSize:number = 0;                   //桌子人数
        gameStatus:number = 0;                  //游戏状态
        timeLast:number = 0;                    //倒计时剩余
        PlayerVO:ZPPlayerVO[] = [];             //玩家列表
        winHistory:number = 0;                  //历史记录
        stockNum:number = 0;                    //总奖池
        FreeNum:number = 0;                     //免费次数
        nowTime:number = 0;                     //当前时间  
        nowTimeLast:number = 0;                 //当前状态持续到
        seatID: number = 0;                     //位置号
        totalMoney: number = 0;                 //总筹码
        constructor(data:any) {
            if (data != null) {
				var vo: any = AppGlobal.getMessage("ZPTableVO").decode(data);
                this.setData(vo);
            }
        }

        setData(data:any):void {
            if(data) {
                this.gTableId = data.gTableId;
                this.roleId = data.roleId;
                this.roomName = data.roomName;
                this.tableSize = data.tableSize;
                this.gameStatus = data.gameStatus;
                this.timeLast = data.timeLast;
                if(data.PlayerVO) {
                    this.PlayerVO = [];
                    var len:number = data.PlayerVO.length;
                    var pItem:ZPPlayerVO;
                    for(var i:number = 0; i < len; i++) {
                        pItem = new ZPPlayerVO();
                        pItem.setData(data.PlayerVO[i]);
                        this.PlayerVO.push(pItem);
                    }
                }
                this.winHistory = data.winHistory;
                this.stockNum = data.stockNum;
                this.seatID = data.seatID;
                this.totalMoney = data.totalMoney;
                this.FreeNum = data.FreeNum;
                this.nowTime = data.nowTime;
                this.nowTimeLast = data.nowTimeLast;
            }
            else {
                this.clear();
            }
        }

        clear():void {
            this.gTableId = 0;
            this.roleId = 0;
            this.roomName = ""
            this.tableSize = 0;
            this.gameStatus = 0;
            this.timeLast = 0;
            this.PlayerVO = [];
            this.winHistory = 0;
            this.stockNum = 0;
        }
    }
}
