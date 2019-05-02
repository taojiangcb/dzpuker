module playcards {
	/**
	 * 排队房：房间类型为201、不允许站起旁观
	 *      玩家进入房间后，即进入排队状态
	 *          1) 玩家进入房间成功，收到11041，需要发gameaction，参数1
	 *          2) 如果收到11049，客户端需要发送ready
	 *      玩家站起，就进入排队状态
	 *          1) 收到11104，表示玩家中途进入排队
	 *      玩家快速换桌
	 *          只需要发站起命令，自动进入换桌流程。
	 *      
	 * 普通房： 允许站起旁观
	 *      玩家进入房间，立刻分配桌子（客户端不做特殊处理、等待推送）
	 *          1) 玩家进入房间成功，收到11041,不需要发gameaction
	 *      玩家换桌，(如果正在游戏，先发站起)
	 *          1) 发送换桌命令roomaction,参数5
	 *      
	 */
    export function getProxy(): PlayCardsProxy {
        return __GET_PROXY(PlayCardsProxy);
    }

    export function getTableVO(): appvos.TexasTableVO {
        return getProxy().tableVO;
    }


    export class PlayCardsProxy extends app.mvc.AbsractProxy {
        public static NAME = "PlayCardsProxy";
        /**是否单机 */
        public isSingle: boolean;
        /** * 正在打牌 打牌界面开着*/
        public isPlayCard: boolean;
        /**直播窗口 */
        public isLive: boolean;
        /** 桌子信息*/
        public tableVO: appvos.TexasTableVO;
        /**回放信息 */
        public videovo: appvos.PlayCardsVideoVO;   
        /**正在播放的回放信息 */
        public playvideovo: appvos.PlayCardsVideoVO;        
        /** 我的位置号 0-9   -1没有坐下*/
        public mySeat: number = -1;

        /**
         * 当前正中位置的座位号
         */
        public midSeat: number = 0;
        /**
         * 我的座位信息
         */
        public mySeatvo: appvos.SeatPlayerVO;
        /**位置偏移 */
        private px: number = 0;
        /**
         * 我的加入信息
         */
        public myJoinPlayerVO: appvos.JoinPlayerVO;
        /**
         * 单轮最大下注筹码值
         */
        public nowMaxBet: number;
        /**
         * 单轮最大加注筹码差值
         */
        public nowMaxAddBet: number;
        /**
         * 单轮最大加注筹码后的值
         */
        public nowMaxAddBetAll: number;
        /**超时次数*/
        public outTime:number = 0;
        /***是否在托管 */
        public isTrust: boolean;
        /**下局离开 */
        public nextLeave: boolean;
        /** 点击换桌 */
        public isHuanZhuoClick: boolean = false;

        public lineHistory: number[] = [];
        public lineHistoryFixed: number[] = [];
        /**
          * 自动加注筹码差值
          */
        public get isAutoAddBet(): boolean{
           return  gameabc.LocalSO.getItem("isAutoAddBet")=="1"
        }
        
        /**正在网络打牌 */
        public get isPlayNetCard(): boolean{
            return this.isPlayCard && !this.isSingle;
        }

        public set isAutoAddBet(value:boolean){
             if(value)  var  key = "1";
             else key = "0"
             gameabc.LocalSO.setItem("isAutoAddBet",key)
        }
        /**
         * 我的牌
         */
        // public myCards: number[];
        /*私人房房间id*/
         public joinNumber: string;
        /**开始统计私人房 */
         public beginVipRoom: boolean;
         /** 前注序号 */
         public anteType:number = 0;
         
        /*上局回顾数据*/
        public allResultVO: CardResultVO[];
        /***
         * 游戏子状态 没游戏是0
         */
        // public GAME_STATUS_FREE: number = 0;
        /**
         * 游戏子状态，翻牌前（perflop）
         */
        public GAME_STATUS_PERFLOP: number = 0;
        /**
         * 游戏子状态，翻牌圈（flop）
         */
        public GAME_STATUS_FLOP: number = 1;
        /**
         * 游戏子状态，转牌圈（turn）
         */
        public GAME_STATUS_TURN: number = 2;
        /**
         * 游戏子状态，河牌圈（river）
         */
        public GAME_STATUS_RIVER: number = 3;
        /**
        * 弃牌
        */
        public ACT_FOLD: number = 1;
        /**
        * 看牌
        */
        public ACT_CHECK: number = 2;
        /**
         * 下注
         */
        public ACT_BET: number = 3;
        /**
         * 跟注
         */
        public ACT_CALL: number = 4;

        /**
         * ALLIN
         */
        public ACT_ALLIN: number = 5;

        /**
        * 加注
        */
        public ACT_RAISE: number = 6;

        /**操作权限*/
        public AntePower: number = 0;
        /**弃牌 */
        public MAP_EXIT: number = 0x01;
        /**过牌 */
        public MAP_PASS: number = 0x02;
        /** 下注 */
        public MAP_DOWNANTE: number = 0x04;
        /** 跟注*/
        public MAP_FOLLOWANTE: number = 0x08;
        /**全下*/
        public MAP_ALLIN: number = 0x10;
        /**加注 */
        public MAP_RAISE: number = 0x20;

        /**
    	 * 德州扑克
    	 * 扑克数据
    	 */
        public m_cbCardData: number[] = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,	//方块 2 - A
            14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,	//梅花 2 - A
            27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,	//红桃  2 - A
            40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,	//黑桃 2 - A
        ];
        public allCards: CardVO[] = [];
        // private faceFactory: egret.MovieClipDataFactory;
        private textureAtlas: gameabc.TextureAtlas;
        private giftTextureAtlas: gameabc.TextureAtlas;
        /**猜牌 */
        public cgStakeTimes: number[] = [1, 5, 10];//押注大盲注的倍率
        public cgStakeRules: any[] = [["无A或K，非对子", "1.7", "1.4"],//[选项 4W房汇报倍率 其他汇报倍率]
                                      ["含A或K", "2.3", "3"],
                                      ["含A", "4.5", "6"],
                                      ["对子", "11.5", "15"],
                                      ["AA", "117", "200"]];
        public  facelistdata: Object[] = [
            { label: "crazy", char: 111 },
            { label: "laugh", char: 107 },
            { label: "gj", char: 106 },
            { label: "despise", char: 103 },
            { label: "angry", char: 102 },
            { label: "alot", char: 110 },
            { label: "fascinated", char: 101 },
            { label: "please", char: 104 },
            { label: "blade", char: 108 },
            { label: "break", char: 105 },
            { label: "stun", char: 115 },
            { label: "bye", char: 112 },
            { label: "beg", char: 109 },
            { label: "thought", char: 113 },
            { label: "nuts", char: 116 },
            { label: "shark", char: 114 }];

        public  messlistdata: Object[] = [{ label: "CHAT_201", char: 201 },
            { label: "CHAT_202", char: 202 },
            { label: "CHAT_203", char: 203 },
            { label: "CHAT_204", char: 204 },
            { label: "CHAT_206", char: 206 },
            { label: "CHAT_207", char: 207 },
            { label: "CHAT_208", char: 208 },
            { label: "CHAT_209", char: 209 },
            { label: "CHAT_210", char: 210 },
            { label: "CHAT_211", char: 211 },
            { label: "CHAT_212", char: 212 }
        ];
        public dashangchar: number = 400;
        public  giftlistdata: Object[] = [{ label: "magic_bomb_1", char: 401 ,price:100,type:1},
            { label: "magic_flower_2", char: 402,price:100,type:1 },
            { label: "magic_chicken_2", char: 403,price:100,type:1 },
            { label: "magic_egg_1", char: 404,price:100,type:1 },
            { label: "fireworks", char: 405,price:200,type:2 },
            { label: "heart", char: 406,price:200,type:2 }       
        ];
        public getGiftdata(char:number): any{
            for (var i: number = 0, len: number = this.giftlistdata.length; i < len; i++){
                if (this.giftlistdata[i]['char'] == char) {
                    return this.giftlistdata[i];
                }
            }
            return null;
        }
        public cgNumber: number;
        public cgTime: number;
        public cgMoney: number;
        public isCg: boolean = false;
        /**买保险结果 */
        public safeResult: any[];
        /**等待玩家买保险
         * 0没触发
         * 1自己买
         * 2别人买
         */
        public buySafe: number = 0;
        public constructor() {
            super(PlayCardsProxy.NAME);
            var carddata = this.m_cbCardData;
            var len: number = carddata.length;
            for (var i: number = 0; i < len; ++i) {
                this.allCards[carddata[i]] = (new CardVO(carddata[i]));
            }
            // this.dBfactory = new dragonBones.EgretFactory();

        }
        
        /**
         * 获取一个位置上面玩家信息
         * @tableid 牌局id
         **/
        getPlayVOById(id: number): appvos.SeatPlayerVO {
            var len = this.tableVO.seatPlayerVO.length;
            while(--len > -1) {
                var playVo = this.tableVO.seatPlayerVO[len];
                if(playVo.roleId == id) {
                    return playVo;
                }
            }
            return null;
        }

        /**
         * 获取位置上的一个玩家信息 
         * @id 位置
         */
        getPlayVOBySeat(id:number):appvos.SeatPlayerVO {
            var len:number = this.tableVO.seatPlayerVO.length;
            while(--len > -1) {
                var playVo = this.tableVO.seatPlayerVO[len];
                if(playVo.seatId == id) return playVo;
            }
            return null;
        }
        /**我是否在旁观列表 */
        public getMyJoin(): boolean{
              var id = user.getProxy().svrRoleId;
            var tablevo = getTableVO();
            var myinJoin: boolean = false;
            if (tablevo) {
                 for (var i = 0,  len = tablevo.joinPlayerVO.length; i < len; i++) {
                    var join: appvos.JoinPlayerVO = tablevo.joinPlayerVO[i];
                    if (join.roleId == id) {
                        myinJoin = true;
                        break;
                    }
                }
            }
            return myinJoin;
        }

        /**获取位置偏移 */
        public getPX(): number{
            if(this.mySeat > -1)
                this.px = this.mySeat;
           return this.px
        }
         /**
         * 获取牌
         * @tableid 牌局id
         **/
        public getPlayMaxCards(card: number): any[] {
            var cardStr = card.toString();
            if (cardStr.length % 2) {
                cardStr = "0" + cardStr;
            }
            var allcard = [];
            for (var i: number = 0; i < cardStr.length / 2; i++) {
                allcard.push(Number(cardStr.substr(i * 2, 2)));
            }
            return allcard;
        }
        // /*
        //  *动画库
        //  */
        // public getFaceFactory(): egret.MovieClipDataFactory {
        //     if (this.faceFactory == null) {
        //         var data = RES.getRes("play_mv_json");
        //         var txtr = RES.getRes("play_mv_png");
        //         this.faceFactory = new egret.MovieClipDataFactory(data, txtr);
        //     }
        //     return this.faceFactory;
        // }

        /**获取影片剪辑 */        
        public getTextures(prefix: string = ""): Array<egret.Texture>{
            if (this.textureAtlas == null) {
                var sheet: egret.SpriteSheet = RES.getRes("play_json");
                if (sheet != null) {
                     var sheet2: egret.SpriteSheet = RES.getRes("dealer_json");
                     this.textureAtlas = new gameabc.TextureAtlas([sheet,sheet2]);
                }
                   
                else return [];
            }
            return this.textureAtlas.getTextures(prefix);
        }
          /**获取表情影片剪辑 */  
        public getFaceTextures(prefix: string = ""): Array<egret.Texture> {
            return this.getTextures("chat_motion_" + prefix); 
        }
        public removeTextureAtlas(): void{
            if (this.textureAtlas != null) {
                RES.destroyRes("play_json", true);
                RES.destroyRes("dealer_json", true);
                this.textureAtlas.dispose();
                this.textureAtlas = null;
             }
        }
         /**获取影片剪辑 */        
        public getGiftTextures(prefix: string = ""): Array<egret.Texture>{
            if (this.giftTextureAtlas == null) {
                var sheet: egret.SpriteSheet = RES.getRes("gift_json");
                if (sheet != null) {                    
                     this.giftTextureAtlas = new gameabc.TextureAtlas([sheet]);
                }else return [];
            }
            return this.giftTextureAtlas.getTextures(prefix);
        }
    
        public removeGiftTextureAtlas(): void{
            if (this.giftTextureAtlas != null) {
                RES.destroyRes("gift_json", true);
                this.giftTextureAtlas.dispose();
                this.giftTextureAtlas = null;
             }
        }
        /*
         *骨骼库
         */
        // public dBfactory: dragonBones.EgretFactory;
        /**
         * 下注
         * @param money
         */
        public addBet(money: number): void {
            var act: number;
            var min = this.addMinBet();
            if (money < min)
                money = min;
            if (money >= this.mySeatvo.nowBet) {
                act = this.ACT_ALLIN;
                money = this.mySeatvo.nowBet;
            } else if (this.nowMaxBet > 0)
                act = this.ACT_RAISE;
            else act = this.ACT_BET;
            this.mySeatvo.raiseTime++; 
            var max = this.addMaxBet();
            if (money > max) money = max;
//            __PVO().i(act, money).to(app.NetAction.MATCH_ACTION);
            this.sendAction([act, money]);
        }
        /**是否可以加注 */
        public canaddBet(): boolean{
            return this.mySeatvo.raiseTime < 4;
        }
        /**
         * 客户端发送动作
         * @param ivalue
         * @param reset true 手动点  false cd超时自动
         */
        public sendAction(ivalue:number[],reset:boolean = true):void{
            var pvo = __PVO()
            pvo.paramVO.intValues = ivalue;
            pvo.to(app.NetAction.MATCH_ACTION);
            if (reset) this.outTime = 0; 
              __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SHOWBTNS, false);
         
        }
        /**
         * 客户端发送聊天
         * @param mess 信息
         * @param send 发送座位号
         * @param rev 收座位号 -1表情 -2文字 -3旁观聊天 >=0魔法接收座位号
         * @param messcode 统计用的code 100+ 表情 200+ 文字 300+魔法表情 600旁观聊天
         * @param l 不为空 收费表情
         * */
        public sendChat(mess:string,send:number,rev:number,messcode:number,l:any=null):void{
            var p = __PVO().s(mess).i(send,rev)
            if(l != null) p.l(messcode);
            p.to(app.NetAction.MATCH_CHAT);
            mc2sdk.event(mc2sdk.EVENT_TYPE.PLAYCARD_FACE + messcode, user.getProxy().currentRoom.bigBlinds);//统计
        }
        /**
         * 最小加注数量
         */
        public addMinBet(): number {
            var vo = this.mySeatvo;
            var tablevo = this.tableVO;
            var min: number = this.nowMaxAddBet + this.nowMaxBet - vo.turnBet
            return Math.min(vo.nowBet, min);
        }
        /***
         *最大加注数量
         */
        public addMaxBet(): number{
            var max: number = this.mySeatvo.nowBet;
            if (room.getProxy().currentType == room.TYPE.FREE) {
                max = Math.min(max, this.getTotalBet());
            }
            return max;
        }
        /*获取当前奖池总数*/
        public getTotalBet(): number {
            // var allseat: appvos.SeatPlayerVO[] = this.tableVO.seatPlayerVO;
            // var all: number = 0;
            // for (var i: number = 0, len = allseat.length; i < len; i++) {
            //     all += allseat[i].totalBet;
            // }
            // return all;
            return this.tableVO.totalBet;
        }
        /**
         * 随机获得牌
         * @param len
         */
        public getRoamdCards(len: number): number[] {
            var rennum: number[] = [];
            var carddata = this.m_cbCardData.concat();
            while (rennum.length < len) {
                var index: number = Math.floor(Math.random() * carddata.length);
                rennum.push(carddata[index]);
                carddata.splice(index, 1);
            }
            return rennum;
        }
		/**
		 * 计算牌型
		 * @param cards
		 */
        public getCardResult(cards: number[]): CardsResult {
            
            var allcardvos: CardVO[] = [];//         
            var allLogicvos: Object = {};//同样大小的牌
            var allcolors: CardVO[][] = [[], [], [], []];//同花色的牌

            var sameColorArray: CardVO[];
            var samenumbers: number = 0;//同大小牌的数量
            var maxsamenumber: number = 1;//同样大小牌的数量最多数量
            var maxsamevvalue: number; //同样大小牌的数量最多数量的牌值
            var cardtype: number;//牌型
            var cardvalue: number;//牌值 

            for (var i: number = 0, len: number = cards.length; i < len; i++) {
                var cardvo: CardVO = this.allCards[cards[i]];
                var cardLogicvalue: number = cardvo.cardLogicvalue;
                /////////统计同样大小的牌//////
                if (allLogicvos[cardLogicvalue] != null) {
                    allLogicvos[cardLogicvalue].push(cardvo)
                    if (allLogicvos[cardLogicvalue].length == 2)
                        samenumbers++;
                } else {
                    allLogicvos[cardLogicvalue] = [cardvo];
                }
                var nlen: number = allLogicvos[cardLogicvalue].length;

                if (nlen == maxsamenumber) {
                    maxsamevvalue = Math.max(maxsamevvalue, cardLogicvalue);
                } else if (nlen > maxsamenumber) {
                    maxsamevvalue = cardLogicvalue;
                    maxsamenumber = nlen;
                }
                ////////////排序///////////////
                this.arrAdd(allcardvos, cardvo);
                ////////////统计同花色//////////////
                //                allcolors[cardvo.color].push(cardvo);
                this.arrAdd(allcolors[cardvo.color], cardvo);
                if (allcolors[cardvo.color].length > 4)
                    sameColorArray = allcolors[cardvo.color];
            }

            var result = new CardsResult();
            var isbreak: boolean = false;
            //同花
            if (sameColorArray != null) {
                //检测是不是顺子
                var renarr = this.isSame(sameColorArray);
                if (renarr != null) {//是同花顺
                    if (renarr[0].cardLogicvalue == 13) {//皇家同花顺
                        cardtype = CardsResult.ROYAL;

                        isbreak = true;
                    } else {
                        cardtype = CardsResult.STRAIGHT_FLUSH;
                        isbreak = true;
                    }
                    result.allvos = renarr
                } else {
                    while (sameColorArray.length > 5)
                        sameColorArray.pop();
                    cardtype = CardsResult.FLUSH;
                    result.allvos = sameColorArray;
                }
            }
            if (!isbreak) {
                if (maxsamenumber == 4) {//4条
                    renarr = allLogicvos[maxsamevvalue];
                    //                    for(i = 0,len = allcardvos.length;i<len;i++ ){//找最大非4条的单牌
                    //                        if(allcardvos[i].cardLogicvalue != maxsamevvalue){
                    //                            renarr.push(allcardvos[i]);
                    //                            break;
                    //                        }
                    //                    }
                    this.addArrTO5(renarr, allcardvos, maxsamevvalue) //找最大非4条的单牌
                    cardtype = CardsResult.FOUR_KIND;
                    result.allvos = renarr;
                    isbreak = true;
                } else if (maxsamenumber == 3 && samenumbers > 1) {//存在葫芦                  
                    var secdvalue: number = 0;//第二大对子或3条
                    for (var key in allLogicvos) {
                        var keyvalue: number = Number(key)
                        if (keyvalue != maxsamevvalue && allLogicvos[key].length > 1)
                            secdvalue = Math.max(keyvalue, secdvalue);
                    }
                    var secdvos: CardVO[] = allLogicvos[secdvalue];
                    if (secdvos.length == 3)//如果也是3条 移除一张
                        secdvos.pop();
                    result.allvos = renarr = allLogicvos[maxsamevvalue].concat(secdvos);
                    cardtype = CardsResult.FULL_HOUSE;
                    isbreak = true;

                } else if (sameColorArray != null) {//同花
                    isbreak = true;
                } else {
                    var renarr = this.isSame(allcardvos);//是顺子
                    if (renarr != null) {//是顺子
                        result.allvos = renarr;
                        cardtype = CardsResult.STRAIGHT;
                        isbreak = true;
                    } else if (maxsamenumber == 3) {//是三条
                        renarr = allLogicvos[maxsamevvalue];
                        //                        for(i = 0,len = allcardvos.length;i < len;i++) {//找最大非3条的单牌
                        //                            if(allcardvos[i].cardLogicvalue != maxsamevvalue) {
                        //                                renarr.push(allcardvos[i]);
                        //                                if(renarr.length == 5)
                        //                                    break;
                        //                            }
                        //                        }
                        this.addArrTO5(renarr, allcardvos, maxsamevvalue) //找最大非3条的单牌
                        cardtype = CardsResult.THREE_KIND;
                        result.allvos = renarr
                        isbreak = true;
                    }
                }
            }
            if (!isbreak) {//接下来判断 2对 1对 高牌
                if (maxsamenumber == 2) {//有对子
                    if (samenumbers > 1) {//有两对
                        secdvalue = 0;
                        for (var key in allLogicvos) {
                            keyvalue = Number(key)
                            if (keyvalue != maxsamevvalue && allLogicvos[key].length > 1)
                                secdvalue = Math.max(keyvalue, secdvalue);
                        }
                        var secdvos: CardVO[] = allLogicvos[secdvalue];
                        for (i = 0, len = allcardvos.length; i < len; i++) {//找最大非2条的单牌                               
                            if (allcardvos[i].cardLogicvalue != maxsamevvalue && allcardvos[i].cardLogicvalue != secdvalue) {
                                renarr = [allcardvos[i]];
                                break;
                            }
                        }
                        result.allvos = renarr = allLogicvos[maxsamevvalue].concat(secdvos).concat(renarr) //renarr.concat(secdvos).concat(allLogicvos[maxsamevvalue]);
                        cardtype = CardsResult.TWO_PAIRS;
                    } else {//一个对子
                        renarr = allLogicvos[maxsamevvalue];
                        //                            for(i = 0,len = allcardvos.length;i < len;i++) {//找最大非2条的单牌
                        //                                if(allcardvos[i].cardLogicvalue != maxsamevvalue) {
                        //                                    renarr.push(allcardvos[i]);
                        //                                    if(renarr.length == 5)
                        //                                        break;
                        //                                }
                        //                            }
                        this.addArrTO5(renarr, allcardvos, maxsamevvalue)//添加最大非2条的单牌
                        result.allvos = renarr;//= renarr.concat(secdvos).concat(allLogicvos[maxsamevvalue]);
                        cardtype = CardsResult.ONE_PAIR;
                    }
                } else {//高牌
                    while (allcardvos.length > 5)
                        allcardvos.pop();
                    result.allvos = allcardvos;
                    cardtype = CardsResult.HIGH;
                }
            }

            result.type = cardtype;
            result.allids = cards;
            return result;
        }

        /**
         * 顺序添加数据
         * @param arr
         * @param cardvo
         */
        private arrAdd(arr: CardVO[], cardvo: CardVO): void {
            var j: number;
            var jlen: number;
            var cardLogicvalue: number = cardvo.cardLogicvalue;
            for (j = 0, jlen = arr.length; j < jlen; j++) {
                if (arr[j].cardLogicvalue <= cardLogicvalue)
                    break;
            }
            arr.splice(j, 0, cardvo);
        }

		/**
		 * 添加数据到5条
		 */
        private addArrTO5(renarr: CardVO[], allcardvos: CardVO[], maxsamevvalue: number): void {
            var i: number, len: number
            for (i = 0, len = allcardvos.length; i < len; i++) {
                if (allcardvos[i].cardLogicvalue != maxsamevvalue) {
                    renarr.push(allcardvos[i]);
                    if (renarr.length == 5)
                        break;
                }
            }
        }
        /**
         * 是否是顺子 返回最大顺子
         *  @param cardvo 已排序好的数组
         */
        private isSame(arrvos: CardVO[]): CardVO[] {
            var rearr: CardVO[];
            var liannum: number = 1;
            var lianindex = 0;// arrvos.length - 1;
            rearr = [arrvos[lianindex]];
            for (var j = lianindex; j < arrvos.length - 1; j++) {
                var dec: number = arrvos[j].cardLogicvalue - arrvos[j + 1].cardLogicvalue;
                if (dec == 1) {//连续的
                    liannum++;
                    rearr.push(arrvos[j + 1]);
                    if (rearr.length == 5)
                        return rearr;
                } else if (dec != 0) {//断开的重新查找
                    lianindex = j + 1;
                    rearr = [arrvos[lianindex]];
                    if (arrvos.length - lianindex < 3)
                        return null;
                }
            }
            if (rearr.length == 4 && arrvos[0].cardLogicvalue == 13 && rearr[rearr.length - 1].cardLogicvalue == 1) {//如果是A 2 3 4 5 
                rearr.push(arrvos[0]);
                return rearr;
            }
            return null;
        }
        private fvaleu: number[] = [0x10000, 0x1000, 0x100, 0x10, 0x1]// [0x1,0x10,0x100,0x1000,0x10000,0x100000];

        /**
         * 计算牌型大小
         * @param arr
         */
        public getcardsValue(arr: CardVO[], cardtype: number): number {
            var values: number = 0
            for (var j: number = 0, jlen: number = arr.length; j < jlen; j++) {
                values += arr[j].cardLogicvalue * this.fvaleu[j];
            }
            return values + cardtype * 0x100000;//this.fvaleu[j];
        }
        
        /**
         * 是否含有牌值
         * @param arr 
         * @param cardvalue 服务端牌值
         */
        public hasCards(arr: CardVO[],cardvalue: number):number{
            for(var j: number = 0,jlen: number = arr.length;j < jlen;j++) {
                if(arr[j].value == cardvalue) 
                    return j;
            }
            return -1;
        }
        /**获取图片路径 */
        public getCardName(card: number): string {
            // if (isNaN(card))
            //     console.warn("card error");
            return "card-1-" + card + "_png";
        }
        
        /**正在游戏中 */
        public isInGame(): boolean{
            return this.tableVO && this.tableVO.tableStatus == 1 && this.mySeatvo != null && this.mySeatvo.isPlay && !this.mySeatvo.isFold;
        }
        public stand(): void{
            if (this.isInGame()) {
                this.alert = tip.Alert.show("牌局尚未结束，现在站起已下注的彩豆将不会返回，是否确定要站起？","",tip.CONFIRM,this.standbakfun,null,this)
             }else 
                this.standbakfun();
        }
        /**sng获取排名 */
        public getRank(bet: number, seat: number): number {
            var rank: number = 1;
            var tablevo = this.tableVO;
            var seatvo: appvos.SeatPlayerVO;
            for (var i: number = 0, len: number = tablevo.seatPlayerVO.length; i < len; i++) {
                seatvo = tablevo.seatPlayerVO[i];
                if (seatvo.seatId != seat && seatvo.nowBet + seatvo.totalBet > bet) {
                    rank++;
                }
            }
            return rank;
        }
        private alert: tip.Alert;
        /**退出打牌 返回大厅*/
        public out(): boolean{
            if (this.isPlayCard) {
                if (this.alert != null) {
                    this.alert.closeAndClear();
                    this.alert = null;
                } else {
                    if (this.isInGame()||room.getProxy().currentType==room.TYPE.MTT) {
                        this.outAlert();
                    } else 
                        this.outbakfun();
                }
                return false;
            }
            return true;
        }
        public outAlert():void {
            if(room.getProxy().currentType == room.TYPE.SNG || room.getProxy().currentType == room.TYPE.MTT) {
                this.alert = tip.Alert.show("比赛中途退出,系统将自动托管,是否确定退出？","",tip.CONFIRM,this.outbakfun,null,this,true,null,null,"iw_quxiao_bx_png")
            } else {
                this.alert = tip.Alert.show("牌局尚未结束，现在离开已下注的彩豆将不会返回，是否确定要返回大厅？","",tip.CONFIRM,this.outbakfun,null,this,true,null,null,"iw_xiajulikai_png") 
            }
        }
        private standbakfun(type: number = tip.YES,isout:number=0): void{
            this.alert = null;
            if (type == tip.YES) { 
                console.log("standbakfun:"+isout);
                if (isout!=1&&room.getProxy().currentType == room.TYPE.GRIL) {
                //     __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[2]);
                //     __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[4,1,6]);
                    user.getProxy().currentRoom.standInGirl = true; 
                }
                // else    
                    __PVO().i(isout).to(app.NetAction.MATCH_UP);
                if (this.ispkallin())
                     mc2sdk.event(mc2sdk.EVENT_TYPE.PLAYCARD_PKSTAND);    
            }
        }
        private ispkallin(): boolean{
            return  room.getProxy().currentType == room.TYPE.PK&&this.mySeatvo&&this.mySeatvo.isAllIn&&this.tableVO&&this.tableVO.tableStatus==1
        }
        /**退出打牌界面 */
         public outbakfun(type: number = tip.YES): void {
             this.alert = null;
             if (type == tip.YES && this.isPlayCard) {
                 if (this.playvideovo == null) {                   
                    if (user.getProxy().exitToMoudle == -1) {
                      __CLOSE_MOUDLE(AppReg.APP_PLAYCARDS);
                    } else {
                      __CLOSE_ALLMOUDLE_OPEN(user.getProxy().exitToMoudle,null,[AppReg.ALERT]);
                     }
                    if(this.mySeatvo!=null) 
                        this.standbakfun(tip.YES,1);
                    playcards.getProxy().joinNumber = null;
                    // if(this.tableVO==null){ 
                        // 新逻辑离开桌子是服务端操作
                        if (room.getProxy().currentType == room.TYPE.SNG) {
                            __SEND_NOTIFICATION(app.NetAction.REQCANCELSIGNUP);
                        // } else if(room.getProxy().isNormal) {
                        //    __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[cyvos.ROOM_ACT.STANDUP])
                        } else {
                            user.getProxy().leaveRoom();
                            if(match.getProxy().currentMatchVO!=null) {
                                match.getProxy().currentMatchVO=null;
                                tip.clearSysCenterTimeTooltip();
                                __SEND_NOTIFICATION(app.NetAction.REQGETMATCHLIST);
                            }
                        }
                    // }
                    
                    if (this.ispkallin())
                     mc2sdk.event(mc2sdk.EVENT_TYPE.PLAYCARD_PKOUT);   
                    
                } else  __CLOSE_MOUDLE(AppReg.APP_PLAYCARDS);
             } else if(type == tip.NO){
                this.nextLeave = true;
            } 
            
        }
         public opendata;
        /**打开打牌界面 */
         public openMoudle(opendata: any = null): void {
            this.opendata = opendata;
             if (user.getProxy().exitToMoudle == -1) {
                 var arr = gameabc.UIManager.instance.getOpenList([AppReg.APP_PLAYCARDS, __PRELOAD__]);
                 __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, arr);
             } else {
                 __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, [user.getProxy().exitToMoudle]);
             }
         }
        /**换桌 */
         public change(): void{
            //  __CLOSE_MOUDLE(AppReg.PRELOAD);
             __CLOSE_PRELOAD();
             // 如果是快速房，不提示。
             var ignoreAlert: boolean = room.getProxy().currentType == room.TYPE.FAST;
              if (this.alert != null) {
                    this.alert.closeAndClear();
                    this.alert = null;
                }
             if(!ignoreAlert && this.isInGame()) {
                 this.alert = tip.Alert.show("牌局尚未结束，现在换桌已下注的彩豆将不会返回，是否确定要换桌？","",tip.CONFIRM,this.changebackfun, null, this)
             }else  this.changebackfun();
        }
        
        private changebackfun(type: number = tip.YES): void {
            this.isHuanZhuoClick = true;
            this.alert = null;
            if(type==tip.YES) {
                // 如果游戏还在进行，但是我还坐着，则先发站起
                if(getTableVO().tableStatus == 1 && getProxy().mySeatvo && getProxy().mySeat != -1) {
                    __PVO().to(app.NetAction.MATCH_UP); 
                } else {
                    this.isHuanZhuoClick = false;
                    // 如果是普通房，则发送换桌命令
//                    if (!getProxy().isAntiCheating) {
                         __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[5]);    
//                    } else {
//                        __SEND_NOTIFICATION(app.NetAction.ROOM_ACTION,[1]);
//                    }
                }
            }
         }
        // private outtime: number = 0;  先去掉一分钟没人换桌退出房间
        public checkOUT(value: boolean): void{
        //      egret.clearTimeout(this.outtime);
        //     if (value ) {
        //         this.outtime = egret.setTimeout(this.alertTimeoutClose,this,60000);
        //     }
        }
        // private alertTimeoutClose(): void{
        //     mc2sdk.event(mc2sdk.EVENT_TYPE.ON_LONG_WAIT);
            
        //     if(this.mySeat != -1)
        //         this.changebackfun();//发送换桌
        //     else if(room.getProxy().current && room.getProxy().isWaitingQueue) {
        //         this.outbakfun();
        //         tip.Alert.show("暂时无人加入，回大厅看看吧！");
        //     }
        // }
        /**检查是否在大牌中 */
        public checkIsInRoom(): void{
            if(this.isPlayCard&&this.playvideovo!=null)
            __SEND_NOTIFICATION(app.NetAction.MATC_IN_TABLE);
        }
        public timoOutClose(): void{
             if (this.alert != null) {
                    this.alert.closeAndClear();
                    this.alert = null;
            }
             this.alert = tip.Alert.show("牌局内彩豆不足，是否重新带入？\n倒计时：4", "", tip.ALERT,this.sitDown,null,this);
             this.outclosetime = 3;
             egret.clearTimeout(this.outclosettimer);
            this.outclosettimer = egret.setTimeout(this.timeOutFun,this,1000);  
        }
        /**发送坐下 */
        public sitDown(): void{
            //   var value: number = getTableVO().minJoinMoney * getTableVO().maxMagnification;
            //   __PVO().i(value).to(app.NetAction.MATCH_TAKEIN);
              egret.clearTimeout(this.outclosettimer);
        }
        private timeOutFun(): void{
            this.alert.textLbl.text = "牌局内彩豆不足，是否重新带入？\n倒计时：" + this.outclosetime;
            if (this.outclosetime == 0) {            
                  this.alert.closeAndClear();
                  this.alert = null;
                  this.outbakfun();
                  return;
            }
            this.outclosetime--;
            this.outclosettimer = egret.setTimeout(this.timeOutFun, this, 1000);  
        }
        private outclosettimer: number;
        private outclosetime: number;


        private maxCards:number = 7;
        /** 更新每个玩家的最新胜率 */
        public updateRate():void {
            var pubCards = this.tableVO.globalCards; //桌子上的公共牌 
            var players = this.tableVO.seatPlayerVO; //每个玩家的对象 
            var except = pubCards.concat(); //已经出现的牌(桌上的加玩家手上的)
            var numPlayers = players.length;
            
            //如果还没翻出公共牌，则通过战力表计算胜率
            if (pubCards==null||pubCards.length<3) {
                var allWinRate = 0;
                for (var i=0; i<numPlayers; ++i) {
                    var player = players[i];
                    if (player.isFold||player.myCard==null||player.myCard.length<2) {
                        player.winRate = 0;
                        continue;
                    }
                    var card1 = this.allCards[players[i].myCard[0]]; 
                    var card2 = this.allCards[players[i].myCard[1]];
                    if (card2.cardLogicvalue>card1.cardLogicvalue) {
                        var bCard = card2.cardLogicvalue + 1; 
                        var sCard = card1.cardLogicvalue + 1;
                    } else {
                        var bCard = card1.cardLogicvalue + 1; 
                        var sCard = card2.cardLogicvalue + 1;
                    }
                    if (card1.color==card2.color) {
                        player.winRate = this.POWER_S[bCard][sCard] + 3;
                    } else {
                        player.winRate = this.POWER_O[bCard][sCard] + 3;
                    }
                    allWinRate += player.winRate;
                }
                for (var i=0; i<numPlayers; ++i) {
                    players[i].winRate = players[i].winRate/allWinRate;
                }
                return;
            }
            //如果公共牌已经发完，则直接计算结果，不再模拟翻牌
            if(pubCards.length+2>=this.maxCards) {
                var winner = this.getWinner(pubCards);
                for (var i=0; i<numPlayers; ++i) {
                    //如果是最后一张牌了，不再模拟发牌计算胜率，直接定格。
                    players[i].winRate = players[i].cardPower==winner.cardPower?1:0;
                }
                return;
            }
            //模拟翻出下一张牌，计算每个人的胜率
            for(var i=0; i<numPlayers; ++i) {
                var player = players[i];
                if(player.myCard!=null&&player.myCard.length==2) {
                    except.push(player.myCard[0],player.myCard[1]); //统计已出现的牌
                }
                player.winRate = 0;
            }
            
            var remains = this.m_cbCardData.concat();
            var len = except.length;
            for (var i=0; i<len; ++i) {
                var index = remains.indexOf(except[i]);
                if (index != -1) remains.splice(index,1);
            }

            len = remains.length;
            for (var j=0; j<len; ++j) {
                winner = this.getWinner(pubCards.concat(remains[j]));
                for (var i=0; i<numPlayers; ++i) {
                    if(players[i].cardPower==winner.cardPower) {
                        ++players[i].winRate;
                    }
                }
            }
            for (var i=0; i<numPlayers; ++i) {
                players[i].winRate = players[i].winRate/remains.length;
                if (players[i].winRate>1) players[i].winRate = 1;
            }
        }

        private getWinner(pubCards:number[]):appvos.SeatPlayerVO {
            var players = this.tableVO.seatPlayerVO; //每个玩家的对象
            var len = players.length;
            var maxCardPower = 0;
            var winner;
            for(var i=0; i<len; ++i) {
                var player = players[i];
                if(!player.isFold&&player.myCard!=null&&player.myCard.length==2) {
                    var cards = pubCards.concat(player.myCard);
                    var result = this.getCardResult(cards);
                    var cardPower = this.getcardsValue(result.allvos,result.type);
                    player.cardPower = cardPower;
                    if (cardPower > maxCardPower) {
                        maxCardPower = cardPower;
                        winner = player;
                    }
                }
            }
            return winner;
        }

        getCardGuessReward(): number {
            var mb = user.getProxy().currentRoom.maxBank;
            var i = mb == 40000? 1: 2;
            var time = parseFloat(this.cgStakeRules[this.cgNumber][i]);
            var reward = Math.floor(time * this.cgMoney);
            return reward;
        }
























        //以下常量来自HK86的统计与整理 ----------------------------------
        
		/** flop后听牌总击中概率(千分比，1%=10，注：不是turn+river的和)
		 * 听中概率，根据outs直接从数组中获取击中概率	 */
        FLOP:number[] = [
			0,
			43,   84,   125,  165,  204,
			241,  278,  315,  350,  384,
			417,  450,  481,  512,  541,
			570,  598,  624,  650,  675
		]
		
		/** 转牌时听牌击中概率(千分比，1%=10)	
		 * 听中概率，根据outs直接从数组中获取击中概率	 */		
        TURN:number[] = [
			0,
			21,   43,   64,   85,   106,
			128,  149,  170,  191,  213,
			234,  255,  277,  298,  319,
			340,  362,  383,  404,  426
		];
		
		/** 河牌时听牌击中概率(千分比，1%=10)	
		 * 听中概率，根据outs直接从数组中获取击中概率		 */
        RIVER: number[] = [
			0,
			22,   43,   65,   87,   109,
			130,  152,  174,  196,  217,
			239,  261,  283,  304,  326,
			348,  370,  391,  413,  435
		];
		
		/** 非同花牌战力表，一个抽象数字，不是概率值 */
		POWER_O:number[][] = [
			[],
				[  /*        2    3    4    5    6    7    8    9   T   J   Q   K   A */ ],
                [ 0, 0,/*2*/ 11 ],
                [ 0, 0,/*3*/  1,  11 ],
                [ 0, 0,/*4*/  2,   3,  11 ],
                [ 0, 0,/*5*/  2,   4,   5,  12 ],
                [ 0, 0,/*6*/  1,   3,   4,   6,  13 ],
                [ 0, 0,/*7*/  0,   1,   3,   5,   6,  13 ],
                [ 0, 0,/*8*/  0,   1,   2,   4,   5,   7,  15 ],
                [ 0, 0,/*9*/  1,   1,   1,   3,   4,   6,   8,  18 ],
                [ 0, 0,/*T*/  2,   2,   2,   2,   4,   6,   8,  10, 19 ],
                [ 0, 0,/*J*/  2,   2,   3,   3,   3,   5,   7,   9, 13, 22 ],
                [ 0, 0,/*Q*/  3,   3,   4,   4,   4,   5,   7,   9, 12, 14, 27 ],
                [ 0, 0,/*K*/  4,   5,   5,   5,   6,   6,   7,   9, 13, 14, 18, 32 ],
                [ 0, 0,/*A*/  7,   7,   8,  11,  11,  11,  11,  11, 13, 14, 18, 19, 40 ]
        ];
		
		/** 同花牌战力表，一个抽象数字，不是概率值 */
        POWER_S: number[][] = [
			[],
			[],
			[  	 /*       2    3    4    5    6    7    8    9    T    J    Q    K  */ ],
            [ 0, 0,/*3*/      7 ],
            [ 0, 0,/*4*/      7,   8 ],
            [ 0, 0,/*5*/      8,   9,   10 ],
            [ 0, 0,/*6*/      6,   8,   10,  11 ],
            [ 0, 0,/*7*/      6,   7,    9,  10,  11 ],
            [ 0, 0,/*8*/      6,   6,    8,   9,  11,  12 ],
            [ 0, 0,/*9*/      7,   7,    7,   8,  10,  12,  13 ],
            [ 0, 0,/*T*/      8,   8,    8,   8,  10,  11,  13,  15 ],
            [ 0, 0,/*J*/      8,   9,    9,   9,   9,  11,  13,  15,  18 ],
            [ 0, 0,/*Q*/      9,   10,  10,  10,  11,  11,  13,  15,  18,  19 ],
            [ 0, 0,/*K*/      11,  11,  11,  12,  12,  13,  13,  15,  18,  20,  21 ],
            [ 0, 0,/*A*/      13,  14,  14,  18,  14,  14,  15,  16,  19,  20,  22,  24 ]

        ];
        /**牌字符 */
        POWER_STR: string[] = ["","","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
        //以上常量来自HK86的统计与整理 ----------------------------------
    }
}
