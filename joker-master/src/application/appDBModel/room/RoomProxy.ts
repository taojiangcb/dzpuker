module room {
    
    export function getProxy():RoomProxy {
        return __GET_PROXY(RoomProxy);
    }
    
    export const enum CONFIG {
        INTERNAL, //内网配置
        PUBLIC, //外网配置
        AUTO_SRS, //正式配置
        MINE_57, //自己的内网配置
        BF_TEST //边锋平台的配置(仅测试)
    }
    
    export function setServer(cfgId:number=1):void {
        switch (cfgId) {
            case CONFIG.PUBLIC:
                getProxy().room1 = getProxy().pRoom1;
                getProxy().room2 = getProxy().pRoom2;
                getProxy().room3 = getProxy().pRoom3;
                getProxy().room4 = getProxy().pRoom4;
                getProxy().room5 = getProxy().pRoom5;
                getProxy().room6 = getProxy().pRoom6;
                getProxy().anteList = getProxy().pAnteList;
                break;
            case CONFIG.AUTO_SRS:
                getProxy().room1 = getProxy().zRoom1;
                getProxy().room2 = getProxy().zRoom2;
                getProxy().room3 = getProxy().zRoom3;
                getProxy().room4 = getProxy().zRoom4;
                getProxy().room5 = getProxy().zRoom5;
                getProxy().room6 = getProxy().zRoom6;
                getProxy().anteList = getProxy().zAnteList;
                break;
            case CONFIG.MINE_57:
                getProxy().room1 = getProxy().mRoom1;
                getProxy().room2 = getProxy().mRoom2;
                getProxy().room3 = getProxy().mRoom3;
                getProxy().room4 = getProxy().mRoom4;
                getProxy().room5 = getProxy().mRoom5;
                getProxy().room6 = getProxy().mRoom6;
                getProxy().room7 = getProxy().mRoom7;
                getProxy().anteList = getProxy().mAnteList;
                break;
            case CONFIG.BF_TEST:
                getProxy().room1 = getProxy().bRoom1;
                getProxy().room2 = getProxy().bRoom1;
                getProxy().room3 = getProxy().bRoom3;
                getProxy().anteList = getProxy().mAnteList;
                break;
            default:
                getProxy().room1 = getProxy().iRoom1;
                getProxy().room2 = getProxy().iRoom2;
                getProxy().room3 = getProxy().iRoom3;
                getProxy().room4 = getProxy().iRoom4;
                getProxy().room5 = getProxy().iRoom5;
                getProxy().room6 = getProxy().iRoom6;
                getProxy().room7 = getProxy().iRoom7;
                getProxy().anteList = getProxy().iAnteList;
                break;
        }
    }
    
    /**  客户端定义的房间类型     */
    export const enum TYPE {
        NULL = -1,
        /**初级房(未启用) */
        BASIC,  
        /**中级房*/
        NORMAL, 
        /**急速房 */
        FAST,   
        /**私人房 */
        VIP,  
        /**坐满即玩赛事房*/  
        SNG,    
        /**多人赛事房(未启用) */
        MTT,
        /** 欢乐城房间 */
        HAPPY,
        /** 二人德州房 */
        PK,
        /** 免费金币房 */
        FREE,
        /** 真人普通桌 */
        GRIL
    }
    
    
    export const enum SVR_MODE {
        AUTO = 4,               //自动房间
        NORMAL = 6,             //普通房间
        ANTI_CHEATING = 201,    //防作弊房
        MATCH = 303
    }    

    
	/**
	 *
	 * @author 
	 *
	 */
    export class RoomProxy extends app.mvc.AbsractProxy {
        public static NAME:string = "room_proxy";

        constructor(proxyName?: string, data?: any){
            super(room.RoomProxy.NAME);
        }

        /** 房间里的桌子(客户端自己维护的,桌子上有座位列表，座位上有人) */
        tableList:TableVO[];
        /** 房间里站着的人 */
        standupPlayers:PlayerVO[];
        /** 荷官秀列表 */
        dealerList: appvos.DealerTableVO[];
        /** 所有荷官列表 */
        allDealerList: appvos.DealerInfoVO[];

        /** 进入房间成功后，要刷新房间列表，并更新当前房间状态 */
        resetRoom():void {
            this.tableList = [];
            this.standupPlayers = [];
        }
        
        /** 当前是否存在没有密码且有人的桌子 */
        hasNoPassTable:boolean;
        
        /** 房间里的桌子一直存在，这个函数用于返回要显示的列表 */
        get displayTableList():TableVO[]{
            var displayList = [];
            var len = this.tableList.length;
            this.hasNoPassTable = false;
            for (var i=1; i<len; ++i) {
                var tableVO = this.tableList[i];
                
                if (tableVO!=null&&tableVO.svrTableInfo.havePwd) {
                    continue; //跳过密码桌
                }

                // 有几张显示几张的逻辑 =========================================
                if (!this.isEmptyTable(i)) {
                    this.hasNoPassTable = true;
                    displayList.push(tableVO);
                }
                // ============================================================
                // 上下两套逻辑，选择一条执行
                // 最少保证6张桌子的逻辑 ========================================
                // 剩下的桌子+显示的桌子 总共少于6张，则空桌也显示
                // if ((len-i) + displayList.length <= 6) {
                //     displayList.push(tableVO);
                //     if (!this.isEmptyTable(i)) {
                //         this.hasNoPassTable = true; //桌子没密码，且有人，则记录
                //     }
                // } else if(this.isEmptyTable(i)) {
                //     continue; //桌子上没人，不显示
                // } else {
                //     this.hasNoPassTable = true; //桌子没密码，且有人，则记录
                //     displayList.push(tableVO); //桌子没密码，但有人，显示
                // }
                // ============================================================
            }
            return displayList;
        }
        
        getNumPlayers(table:TableVO):number {
            var numPlayers = 0;
            var len = table.sit.length;
            for (var i=0; i<len; ++i) {
                if (table.sit[i] != null) numPlayers++;
            }
            return numPlayers;
        }
        
        
        searchPlayer(roleId:number, add:boolean=false):PlayerVO {
            var len = this.standupPlayers.length;
            for (var i=0; i<len; ++i) {
                var player = this.standupPlayers[i];
                if (roleId == player.roleId) {
                    return player;
                }
            }
            len = this.tableList.length;
            for (i=1; i<len; ++i) {
                var table = this.tableList[i];
                if (table==null) continue;
                var sitArr = table.sit;
                var len2 = sitArr.length;
                for (var j=0; j<len2; ++j) {
                    var player = sitArr[j];
                    if (player!= null && player.roleId == roleId) {
                        return player;
                    }
                }
            }
            
            if (add) {
                var player = new PlayerVO();
                player.roleId = roleId;
            }
            
            return player;
        }
        
        /** 根据tableId(序号)找到tableInfo对象 */
        updateTableInfo(tableInfo:cyvos.TableInfo):void {
            var tableId = tableInfo.svrId;
            var tableVO = this.tableList[tableId];
            if (tableVO==null) {
                tableVO = new TableVO();
                tableVO.sit = [];
                this.tableList[tableId] = tableVO;
            }
            tableVO.svrTableInfo = tableInfo;
        }
        
        updatePlayerInfo(stateInfo:cyvos.PlayerStateInfo):void;
        updatePlayerInfo(playerInfo:cyvos.PlayerInfo):void;
        updatePlayerInfo(data:any):void {   
            
            if (!getProxy().isNormal) return;
            if (this.tableList==null||this.tableList.length==0) return;
            
            if (data instanceof cyvos.PlayerStateInfo) {
                var stateInfo:cyvos.PlayerStateInfo = data;
                var player = this.searchPlayer(stateInfo.roleId, true);
                if (player.tableId > 0) {
                    this.tableList[player.tableId].sit[player.sitId] = null;
                }
                player.state = stateInfo.state;
                player.tableId = stateInfo.tableId;
                player.sitId = stateInfo.sitorder;
            }
            
            else if (data instanceof cyvos.PlayerInfo) {
                var playerInfo:cyvos.PlayerInfo = data;
                var player = this.searchPlayer(playerInfo.roleId, true);
                if (player.tableId > 0) { //如果本来坐着，那就站起来
                    this.tableList[player.tableId].sit[player.sitId] = null;
                }
                player.state = playerInfo.state;
                player.tableId = playerInfo.tableId;
                player.sitId = playerInfo.sitorder;
            }

            if (player.tableId > 0) {
                this.tableList[player.tableId].sit[player.sitId] = player;
            } else {
                this.standupPlayers.push(player);
            }
            // console.log("玩家["+player.roleId+"] 桌号:"+player.tableId+" 座位号:"+player.sitId+" 状态:"+player.state);
        }
        
        
        /** 随机找一个空位，全满返回-1 */
        searchEmptySit(tableId:number):number {
            var sitArr = this.tableList[tableId].sit;
            var len = this.tableList[tableId].svrTableInfo.chairs;
            if(this.currentType==room.TYPE.GRIL) len-=1; //荷官房最后一个位置不能坐
            //随机找个位置
            var i = Math.floor(Math.random()*len);
            //往后找看看有没有空位
            for(var j=i; j<len; ++j) {
                if (sitArr[j] == null) return j;
            }
            //往前找看看有没有空位
            while (--i > -1) {
                if (sitArr[i] == null) break;
            }
            return i;
        }
        
        
        /** 验证是否为空桌 */
        isEmptyTable(tableId:number):boolean {
            if (this.tableList[tableId]==null) return false;
            var sitArr = this.tableList[tableId].sit;
            var i = sitArr.length;
            while (--i > -1) {
                if (sitArr[i] != null) return false;
            }
            return true;
        }
        
        
        /** 找一张空桌子，找不到返回-1 */
        searchEmptyTable():number {
            var times = 5;
            while (--times > -1) {
                var tableId = Math.floor(Math.random()*98)+1;
                if (this.isEmptyTable(tableId)) return tableId;
            }
            for (var j=tableId; j<100; ++j) {
                if (this.isEmptyTable(j)) return j;
            }
            while (--tableId > -1) {
                if (this.isEmptyTable(tableId)) break;
            }
            return tableId;
        }
        
        
        createJoinId(tableId:number):string {
            var psd:number = Math.floor(Math.random()*89)+10;
            var index = 0, i = 0, ri = 0;
            var len4 = this.room4.length;
            var len6 = this.room6.length;
            for(i=0; i<len4||i<len6; ++i) {
                if(i<len6 && this.room6[i] == user.getProxy().currentRoom) {
                    index = i;
                    ri = 6;
                    break;
                }
                if(i<len4 && this.room4[i] == user.getProxy().currentRoom) {
                    index = i;
                    ri = 4;
                    break;
                }
            }
            // 两位密码 两位房号 两位桌号
            return psd * 10000 + ri * 1000 + index * 100 + tableId + "";
        }
        
        parseTableId(joinNumber:string):number {
            return parseInt(joinNumber) % 100;
        }
        
        parseTablePsd(joinNumber:string):string {
            return "VIP" + joinNumber; //自定义一个有规律的密码格式
        }
        
        /** 屌丝房 */
        room1:appvos.RoomVO[];
        /** 免费金币房 */
        room2:appvos.RoomVO[];
        /** 急速房 */
        room3:appvos.RoomVO[];
        /** VIP房间 */
        room4:appvos.RoomVO[];
        /** 欢乐城房间 */
        room5:appvos.RoomVO[];
        /** 二人德州房间 */
        room6:appvos.RoomVO[];
        /** 真人荷官房间 */
        room7:appvos.RoomVO[];
        /** 真人荷官列表 */
        dealers:appvos.DealerTableVO[];
        /** 前注 */
        anteList:number[][];
        
         /**道具配置 
          *
          * charmObj[价格 魅力值 魅力积分，对方魅力值，对方魅力积分]
          * 
          */
        public magiclistdata: Object[] = [
            { label: 'magic_bomb_1',char: 301,charmList:[200,0,1,-1,0]},
            { label: 'magic_flower_2',char: 302,price:100,charmList:[200,0,0,1,1]},
            { label: 'magic_chicken_2',char: 303,price:100,charmList:[200,0,1,-1,0]}, 
            { label: 'magic_egg_1',char: 304,price:100,charmList:[200,0,1,-1,0]}
        ];
        //打赏配置
         public rewardData: number[] = [200,1,1,0,0];
        
        //内网配置 90
        iRoom1:appvos.RoomVO[] = [
            this.createNormalRoom(101,  100,   200,    1000,    40000,   214, 15028, 4, false, 0,[1,1,1,1,1]),
            this.createNormalRoom(102,  200,   400,   10000,    80000,   215, 15028, 201,false,0,[2,2,2,2,2]),
            this.createNormalRoom(103,  500,  1000,   20000,   400000,   223, 15129, 201,false,0,[5,5,5,5,5]),
            this.createNormalRoom(104, 3000,  6000,  360000,  1200000,   224, 15130, 201, false, 20000,[30,30,30,30,30]),
        ];

        iRoom2:appvos.RoomVO[] = [
            this.createFreeRoom(201,   50,    100,     600,     2000,   302, 15155)
        ];

        iRoom3: appvos.RoomVO[] = [
            this.copyRoomToFast(301, this.iRoom1[0]),
            this.copyRoomToFast(302, this.iRoom1[1]),
            this.copyRoomToFast(303, this.iRoom1[2]),
            this.copyRoomToFast(304, this.iRoom1[3])
        ];

        iRoom4: appvos.RoomVO[] = [
            this.createNormalRoom(401,  5000,  10000,  200000,  1000000,     216, 15140,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(402, 10000,  20000,  400000,  2000000,     266, 15141,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(403, 20000,  40000,  800000,  4000000,     267, 15142,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(404, 50000, 100000, 2000000, 10000000,     268, 15143,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(405,100000, 200000, 4000000, 20000000,     269, 15144,   6, true,0,[100,100,100,100,100])
        ];

        iRoom5: appvos.RoomVO[] = [
            this.createHappyRoom(501,  100, [ 100, 1000, 10000],   20000,   1000,   100000,   188,  301, 15050, 4,[2,2,2,2,2]),
            this.createHappyRoom(502,  100, [ 100, 1000, 10000],   20000,   1000,   100000,   188,  301, 15050, 4,[2,2,2,2,2]),
            this.createHappyRoom(503, 1000, [1000, 1000, 10000],  100000,  10000,  1000000,  1888,  309, 15049, 4,[2,2,2,2,2])
        ];

        iRoom6:appvos.RoomVO[] = [
            this.createPKRoom(601,  10,   20,      200,   1000000,  272, 15151),
            this.createPKRoom(602, 1000,  2000, 100000,   5000000,  273, 15152),
            this.createPKRoom(603, 2000,  4000, 1000000,  20000000, 274, 15153)
        ];

        iRoom7:appvos.RoomVO[] = [
            this.createGirlRoom(701,  100,   200,    1000,    40000,   225, 15131)
        ];

        iDealers:appvos.DealerTableVO[] = [
        ];


        iAnteList: number[][] = [
            [0,   20000,   40000],
            [0,   50000,  100000],
            [0,  200000,  400000],
            [0,  400000,  800000],
            [0, 1000000, 2000000]
        ];


        //边锋平台的配置
        bRoom1:appvos.RoomVO[] = [
            this.createNormalRoom(101, 100,   200,    1000,    40000,  4808,  705574,  4,   false,     0, [1,1,1,1,1])
        ];
        
        bRoom3:appvos.RoomVO[] = [
            this.copyRoomToFast(301, this.bRoom1[0])
        ];

        //内网配置57 
        mRoom1:appvos.RoomVO[] = [
            this.createNormalRoom(101,    10,    20,     500,     2000,   5001, 101,   6, false, 0,[1,1,1,1,1]),
        ];

        mRoom2:appvos.RoomVO[] = [
            this.createFreeRoom(201,   50,    100,     600,     2000,   6000, 2) 
        ];

        mRoom3: appvos.RoomVO[] = [
            this.copyRoomToFast(301, this.mRoom1[0]),
            // this.copyRoomToFast(302, this.mRoom1[1]),
            // this.copyRoomToFast(303, this.mRoom1[2]),
            // this.copyRoomToFast(304, this.mRoom1[3]),
        ];

        mRoom4: appvos.RoomVO[] = [
            this.createNormalRoom(401,  5000,  10000,  200000,  1000000,     216, 15140,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(402, 10000,  20000,  400000,  2000000,     266, 15141,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(403, 20000,  40000,  800000,  4000000,     267, 15142,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(404, 50000, 100000, 2000000, 10000000,     268, 15143,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(405,100000, 200000, 4000000, 20000000,     269, 15144,   6, true,0,[100,100,100,100,100])
        ];

        mRoom5: appvos.RoomVO[] = [
            this.createHappyRoom(501,  100, [ 100, 1000, 10000],   20000,   1000,   100000,   188, 7000,     3, 4,[2,2,2,2,2]),
            this.createHappyRoom(502,  100, [ 100, 1000, 10000],   20000,   1000,   100000,   188, 7000,     3, 4,[2,2,2,2,2]),
            this.createHappyRoom(503, 1000, [1000, 1000, 10000],  100000,  10000,  1000000,  1888,  309, 15049, 4,[2,2,2,2,2])
        ];

        mRoom6:appvos.RoomVO[] = [
            this.createPKRoom(601,  10,   20,      200,   1000000,  266, 15141),
            this.createPKRoom(602, 1000,  2000, 100000,   5000000,  266, 15141),
            this.createPKRoom(603, 2000,  4000, 1000000,  20000000, 266, 15141)
        ];

        mRoom7:appvos.RoomVO[] = [
            this.createGirlRoom(701,  100,   200,    1000,    40000,   225, 15131)
        ];

        mDealers:appvos.DealerTableVO[] = [
        ];

        mAnteList: number[][] = [
            [0,   20000,   40000],
            [0,   50000,  100000],
            [0,  200000,  400000],
            [0,  400000,  800000],
            [0, 1000000, 2000000]
        ];

        
        
        //外网配置 71
        pRoom1:appvos.RoomVO[] = [
            this.createNormalRoom(101,    10,    20,     500,     2000,   3953, 427,   6, false, 0,[1,1,1,1,1]),
            // this.createNormalRoom(101,  100,   200,    1000,    40000,   3739, 4039,   4, false,     0, [ 1, 1, 1, 1, 1]),
            //this.createNormalRoom(102, 1000,  2000,   40000,   200000,   3741, 4040,   4, false,     0, [ 5, 5, 5, 5, 5]),
            //this.createNormalRoom(103, 3000,  6000,  360000,  1200000,   3742, 4041,   4, false, 20000, [30,30,30,30,30])
        ];

        pRoom2:appvos.RoomVO[] = [
            this.createFreeRoom(201,    50,    100,     600,     2000,   3900, 4118)
        ];

        pRoom3: appvos.RoomVO[] = [
            this.copyRoomToFast(301,this.pRoom1[0]),
            // this.copyRoomToFast(302,this.pRoom1[1]),
            // this.copyRoomToFast(303,this.pRoom1[2])
        ];
        pRoom4: appvos.RoomVO[] = [
            this.createNormalRoom(401,  5000,  10000,  200000,  1000000,     3752, 4051,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(402, 10000,  20000,  400000,  2000000,     3753, 4052,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(403, 20000,  40000,  800000,  4000000,     3754, 4053,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(404, 50000, 100000, 2000000, 10000000,     3755, 4054,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(405,100000, 200000, 4000000, 20000000,     3756, 4055,   6, true,0,[100,100,100,100,100])
        ];
        pRoom5: appvos.RoomVO[] = [
            this.createHappyRoom(501,  100, [ 100, 1000, 10000],  20000,   1000,   100,   188,  3835, 4096, 4,[2,2,2,2,2]),
            this.createHappyRoom(502,  100, [ 100, 1000, 10000],  20000,   1000,   100,   188,  3835, 4096, 4,[2,2,2,2,2]),
            //this.createHappyRoom(  100, [ 100, 1000, 10000],  20000,   1000,   100,   188,  3836, 4097, 4,[2,2,2,2,2]),
            this.createHappyRoom(503, 1000, [1000,10000, 50000], 100000,  10000,  1000,  1888,  3837, 4098, 4)
        ];
        pRoom6:appvos.RoomVO[] = [
            this.createPKRoom(601, 10,     20,     200,   1000000, 3892, 4111),
            this.createPKRoom(602,1000,  2000,  100000,   5000000, 3893, 4112),
            this.createPKRoom(603,2000,  4000, 1000000,  20000000, 3894, 4113)
        ];
        pAnteList: number[][] = [
            [0,   20000,   40000],
            [0,   50000,  100000],
            [0,  200000,  400000],
            [0,  400000,  800000],
            [0, 1000000, 2000000]
        ];
        
        
        //正式配置
        zRoom1:appvos.RoomVO[] = [
            // id="4011" roomid="4154"
            this.createNormalRoom(101,    10,    20,     500,     2000,   4011, 4154,   6, false, 0,[1,1,1,1,1]),
            // this.createNormalRoom(101,  10,    20,     500,     2000,  3946,  4126,   4,   false,     0, [1,1,1,1,1]),
            // this.createNormalRoom(102,  50,   100,    4000,    10000,  3947,  4127,   4,   false,     0, [1,1,1,1,1], 8000),
            // this.createNormalRoom(103, 100,   200,    8000,    40000,  3804,  4085,   4,   false,     0, [1,1,1,1,1], 16000),
            // this.createNormalRoom(104, 500,  1000,   40000,   400000,  3805,  4086,  201,  false,     0, [5,5,5,5,5], 80000, true),
//            this.createNormalRoom(105,3000,6000,360000,1200000,3806,4087,201,false,20000,[30,30,30,30,30],800000)
        ];

        zRoom2:appvos.RoomVO[] = [
            this.createFreeRoom(201,    50,    100,     600,     2000,   3902, 4119)
        ];

        zRoom3: appvos.RoomVO[] = [
            this.copyRoomToFast(301,this.zRoom1[0]),
            // this.copyRoomToFast(302,this.zRoom1[1]),
            // this.copyRoomToFast(303,this.zRoom1[2]),
            // this.copyRoomToFast(304,this.zRoom1[3])
//            this.copyRoomToFast(305,this.zRoom1[4])
        ];
        zRoom4: appvos.RoomVO[] = [
            this.createNormalRoom(401,  5000,  10000,  1000000,   2000000,   3808, 4088,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(402, 10000,  20000,  1000000,   4000000,   3808, 4088,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(403, 20000,  40000,  2000000,  10000000,   3808, 4088,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(404, 50000, 100000,  5000000,  20000000,   3808, 4088,   6, true,0,[100,100,100,100,100]),
            this.createNormalRoom(405,100000, 200000, 10000000,  60000000,   3808, 4088,   6, true,0,[100,100,100,100,100])
        ];
        zRoom5: appvos.RoomVO[] = [
            this.createHappyRoom(501,  100, [ 100, 1000, 10000],  20000,   1000,   100,   188,  3846, 4102, 4,[2,2,2,2,2]),
            this.createHappyRoom(502,  100, [ 100, 1000, 10000],  20000,   1000,   100,   188,  3847, 4103, 4,[2,2,2,2,2]),
            this.createHappyRoom(503, 1000, [1000,10000, 50000], 100000,  10000,  1000,  1888,  3848, 4104, 4)
        ];
        zRoom6:appvos.RoomVO[] = [
            this.createPKRoom(601,   10,    20,     200,   1000000, 3895, 4114),
            this.createPKRoom(602, 1000,  2000,  100000,   5000000, 3896, 4115),
            this.createPKRoom(603, 2000,  4000, 1000000,  20000000, 3897, 4116)
        ];
        zAnteList: number[][] = [
            [0,   20000,   40000],
            [0,   50000,  100000],
            [0,  200000,  400000],
            [0,  400000,  800000],
            [0, 1000000, 2000000]
        ];        

        /** 根据银两返回满足最小带入的房间 */
        getRoomVOFromMinSilver(silver:number,roomList:appvos.RoomVO[]):appvos.RoomVO {
            var i = roomList.length; //最后一个房间不参与匹配
            while (--i > -1) {
                if (silver > roomList[i].tuijianMinBank) {
                    return roomList[i];
                }
            }
            return null;
        }




        getRoomVOByRoomId(roomId: number,isFast: boolean = false): appvos.RoomVO {
            if(isFast) {
                var len = this.room3.length;
                for(var i = 0;i < len;++i) {
                    if(this.room3[i].svrRoomId == roomId) {
                        return this.room3[i];
                    }
                }
            } else {
                var len = this.room1.length;
                for(var i = 0;i < len;++i) {
                    if(this.room1[i].svrRoomId == roomId) {
                        return this.room1[i];
                    }
                }
                var len = this.room2.length;
                for(var i = 0;i < len;++i) {
                    if(this.room2[i].svrRoomId == roomId) {
                        return this.room2[i];
                    }
                }
                var len = this.room5.length;
                for (i = 0; i<len; ++i) {
                    if (this.room5[i].svrRoomId == roomId) {
                        return this.room5[i];
                    }
                }
                var len = this.room7.length;
                for (i = 0; i < len; ++i) {
                    if (this.room7[i].svrRoomId == roomId) {
                        return this.room7[i];
                    }
                }
            }
            return null;
        }

        getRoomVOByOfsId(ofsId: number,isFast: boolean = false): appvos.RoomVO {
            if(isFast) {
                var len = this.room3.length;
                for(var i = 0;i < len;++i) {
                    if(this.room3[i].svrOfsId == ofsId) {
                        return this.room3[i];
                    }
                }
            } else {
                var len = this.room1.length;
                for(var i = 0;i < len;++i) {
                    if(this.room1[i].svrOfsId == ofsId) {
                        return this.room1[i];
                    }
                }

                // var len = this.room2.length;
                // for(var i = 0;i < len;++i) {
                //     if(this.room2[i].svrOfsId == ofsId) {
                //         return this.room2[i];
                //     }
                // }

                len = this.room5.length;
                for (i = 0; i<len; ++i) {
                    if (this.room5[i].svrOfsId == ofsId) {
                        return this.room5[i];
                    }
                }
            }
            return null;
        }



        getRoomVOByJoinNumber(joinNumber:string):appvos.RoomVO {
            if(!/^\d{6}$/.test(joinNumber)) return null;
            var index:number = parseInt(joinNumber.charAt(3));
            var ri:number = parseInt(joinNumber.charAt(2));
            return ri==4?this.room4[index]:this.room6[index];
        }

        getRoomVOByCtId(ctId:number):appvos.RoomVO {
            var roomList = [this.room1,this.room2,this.room3,this.room4,this.room5,this.room6,this.room7];
            var roomLength = roomList.length;
            for (var i=0; i<roomLength; ++i) {
                var subRooms = roomList[i];
                var subRoomsLength = subRooms.length;
                for (var j=0; j<subRoomsLength; ++j) {
                    if (subRooms[j].ctId == ctId) return subRooms[j];
                }
            }
            return null;
        }

        updateRoomVOFromSvr(xmlStr:string):void {
            var xml = egret.XML.parse(xmlStr);
            var xmlNodes = xml.children;
            var len = xmlNodes.length;
            for (var i=0; i<len; ++i) {
                var xmlNode = <egret.XML><any>xmlNodes[0];
                if (xmlNode.name == "room") {
                    var ctId:number;
                    var roomVO = room.getProxy().getRoomVOByCtId(ctId);
                    roomVO.svrOfsId
                    roomVO.svrRoomId
                }
            } 
        }




        createPKRoom(ctId:number, smallBlinds: number, bigBlinds: number,
                     minBank: number,maxBank: number,
                     ofsId:number, roomId:number,
                     svrMode:number=6, isVip:boolean=false,anti:number=0,
                     charmList:any[] =[]):appvos.RoomVO {
            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.maxBank = maxBank;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.svrMode = svrMode;
            roomVo.isVip = isVip;
            roomVo.anti = anti;
            roomVo.charmList = charmList;
            roomVo.type = room.TYPE.PK;
            return roomVo;
        }

        createFreeRoom(ctId:number, smallBlinds: number, bigBlinds: number,
                     minBank: number,maxBank: number,
                     ofsId:number, roomId:number):appvos.RoomVO {
            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.maxBank = maxBank;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.type = room.TYPE.FREE;
            roomVo.svrMode = 4;
            roomVo.isVip = false;
            return roomVo;
        }

        createGirlRoom(ctId:number, smallBlinds: number, bigBlinds: number,
                     minBank: number,maxBank: number,
                     ofsId:number, roomId:number):appvos.RoomVO {
            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.maxBank = maxBank;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.type = room.TYPE.GRIL;
            roomVo.svrMode = 6;
            roomVo.isVip = false;
            return roomVo;

        }

        createGirlTable(ctId:number, tableId:number=0, photo:string=""):appvos.DealerTableVO {
            var table = new appvos.DealerTableVO();
            table.roomVO = this.getRoomVOByCtId(ctId);
            table.photo = "";
            return table;
        }
        
        
        createNormalRoom(ctId:number, smallBlinds: number, bigBlinds: number,
                            minBank: number,maxBank: number,
                            ofsId:number, roomId:number, 
                            svrMode:number=4, isVip:boolean=false,anti:number=0,
                            charmList:any[] =[], tuijianMinBank:number = 0, isInsurance: boolean = false):appvos.RoomVO {

            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.maxBank = maxBank;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.svrMode = svrMode;
            roomVo.isVip = isVip;
            roomVo.anti = anti;
            roomVo.charmList = charmList;

            roomVo.type = isVip ? room.TYPE.VIP : room.TYPE.NORMAL; 
            roomVo.tuijianMinBank = tuijianMinBank == 0 ? roomVo.minBank : tuijianMinBank;
            roomVo.isInsurance = isInsurance;
            return roomVo;
        }

        /** 最小投注、可以投注筹码量、最大投注、最小带入、普通座位带入、服务费、普通投注、投注上限
         * charmList[价格，魅力，魅力积分，对方魅力，对方魅力积分]
         */
        createHappyRoom(ctId:number, smallBlinds: number, addBlinds:number[], bigBlinds: number,
                            minBank: number, normalBank:number, service: number, 
                            ofsId:number, roomId:number, svrMode:number=4,charmList:number[] =[]):appvos.RoomVO {
            var roomVo = new appvos.RoomVO();
            roomVo.ctId = ctId;
            roomVo.smallBlinds = smallBlinds;
            roomVo.addBlinds = addBlinds;
            roomVo.bigBlinds = bigBlinds;
            roomVo.minBank = minBank;
            roomVo.normalBank = normalBank;
            roomVo.service = service;
            roomVo.svrOfsId = ofsId;
            roomVo.svrRoomId = roomId;
            roomVo.svrMode = svrMode;
            roomVo.charmList = charmList;

            roomVo.type = room.TYPE.HAPPY; 
           
            return roomVo;
        }

        copyRoomToFast(ctId:number, roomVO:appvos.RoomVO):appvos.RoomVO {
            var fastRoomVo = new appvos.RoomVO();
            fastRoomVo.ctId = ctId;
            fastRoomVo.smallBlinds = roomVO.smallBlinds;
            fastRoomVo.bigBlinds = roomVO.bigBlinds;
            fastRoomVo.minBank = roomVO.minBank;
            fastRoomVo.maxBank = roomVO.maxBank;
            fastRoomVo.svrOfsId = roomVO.svrOfsId;
            fastRoomVo.svrRoomId = roomVO.svrRoomId;
            fastRoomVo.svrMode = roomVO.svrMode;
            fastRoomVo.anti = roomVO.anti;
            fastRoomVo.isFast = true;
            fastRoomVo.type = room.TYPE.FAST;
            fastRoomVo.charmList = roomVO.charmList;
            
            fastRoomVo.tuijianMinBank = roomVO.tuijianMinBank;
            fastRoomVo.isInsurance = roomVO.isInsurance;
            return fastRoomVo;
        }
        
        /** 是否允许进入(判断筹码是否足够) */
        permit(roomVO:appvos.RoomVO):boolean {
            if (roomVO==null||user.getProxy().svrGameData==null) return false;
            if (roomVO.type == room.TYPE.SNG) return true;
            var silver = user.getProxy().svrGameData.silver;
            var limit = roomVO.minBank;
            return silver >= limit;
        }

        MIN_SILVER_LIMITED:number = 2000;
        MIN_GOLD_LIMITED:number = 600;

        /**
         * 进入极带游戏房
         */
        fastRoom():void {
            console.log("极速游戏");
            var silver = user.getProxy().svrGameData.silver;
            var roomVO = room.getProxy().getRoomVOFromMinSilver(silver, room.getProxy().room3);
            if (roomVO == null) {
                var gold:number = user.getProxy().freeGold;
                var goldMis:mission.MissionVO[] = mission.getProxy().getclvMissionInfos(mission.MissionType.godTree,mission.MissionSubType.god_tree);
                if((goldMis.length > 0 && goldMis[0].status != mission.MissionState.obtaining) || gold >= this.MIN_GOLD_LIMITED) {
                    this.goldRoom();
                }
                else {
                    user.getProxy().openMoney();
                } 
            } 
            else {
                user.gotoRoom(roomVO);
            }
        }

        /**
         * 进入金币房游戏
         */
        goldRoom(): void {
           // if (DEBUG) {
           //     user.gotoRoom(getProxy().room2[0]);
            //    return;
            //}
            var silver:number = user.getProxy().svrGameData
                ? user.getProxy().svrGameData.silver
                :0;

            var gold:number = user.getProxy().freeGold;
            if (silver > this.MIN_SILVER_LIMITED) {
                tip.popSysCenterTip("您的彩豆财富大于2000，请前往其他场次进行游戏");
            }

            else if (gold < this.MIN_GOLD_LIMITED) {
                var m: mission.MissionVO[] = mission.getProxy().getclvMissionInfos(mission.MissionType.free_broke,mission.MissionSubType.free_broke);
                if (user.getProxy().freeFlagCancel == true && m.length > 0 && m[0].status == 1) {
                    __OPEN_PRE_MOUDLE(AppReg.APP_FREEBROKE, m[0]);
                } else __OPEN_PRE_MOUDLE(AppReg.APP_GOLD_TREE);
            }
            
            else {
                console.log("进入金币房")
                user.gotoRoom(getProxy().room2[0]);
            }
        }

        /** 当前房间对象 */
        get current():appvos.RoomVO {
            if (user.getProxy().currentRoom) return user.getProxy().currentRoom;
            else {
                var noRoom = new appvos.RoomVO();
                noRoom.type = room.TYPE.NULL;
                return noRoom;
            }
        }
        
        /** 当前房间类型 */
        get currentType(): number {
            return this.current == null ? -1 : this.current.type;
        }
    

        
        /**是防作弊房间 无旁观*/
        public get isAntiCheating(): boolean {
            return this.current && this.current.svrMode == SVR_MODE.ANTI_CHEATING;
        }
        
        /**是手动房，有旁观*/
        public get isNormal(): boolean {
            return this.current && this.current.svrMode == SVR_MODE.NORMAL;
        }

        /** 是否排队机制 */
        public get isWaitingQueue(): boolean {
            return this.current && this.current.svrMode == SVR_MODE.ANTI_CHEATING;
        }

        public get isHappyCity():boolean {
            return this.current && this.current.type == room.TYPE.HAPPY;
        }

        public get isMatch():boolean {
            return this.current && this.current.svrMode == SVR_MODE.MATCH;
        }
        public getFakeDealerTableVO(): appvos.DealerTableVO {
            var dealerTableVO: appvos.DealerTableVO = new appvos.DealerTableVO();
            dealerTableVO.roomVO = this.getFakeRoomVO();
            dealerTableVO.dealerInfoVO = this.getFakeDealerInfoVO();
            dealerTableVO.numPlayers = 0;
            return dealerTableVO;
        }

        public getFakeDealerInfoVO(): appvos.DealerInfoVO {
            var dealerInfoVO = new appvos.DealerInfoVO();
            dealerInfoVO.name = "大明哥";
            dealerInfoVO.online = 0;
            return dealerInfoVO;
        }

        public getFakeRoomVO(): appvos.RoomVO {
            // var roomVO = new appvos.RoomVO();
            // roomVO.maxBank = 40000;
            // roomVO.smallBlinds = 100;
            // roomVO.bigBlinds = 200;
            // roomVO.online = Math.floor(Math.random() * 10);
            var roomVO = this.room7[0];
            return roomVO;
        }

        public findNormalRoomByMaxBank(maxBank: number): appvos.RoomVO {
            for (var i = 0; i < this.room1.length; i++) {
                if (this.room1[i].maxBank == maxBank) return this.room1[i];
            }
            return null;
        }
	}
}
