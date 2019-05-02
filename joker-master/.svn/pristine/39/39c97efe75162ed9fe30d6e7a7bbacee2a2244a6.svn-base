module happy {
        export function getProxy(): HappyProxy {
                return __GET_PROXY(HappyProxy);
        }
        export function getTableVO(): appvos.HLCTableVO {
                return getProxy().tableVO;
        }
        export class HappyProxy extends app.mvc.AbsractProxy {
                public static NAME = "HappyProxy";
                /** 桌子信息*/
                public tableVO: appvos.HLCTableVO;
                /**界面是否打开 */
                public isPlay: boolean;

                /** * 我的座位信息 */
                public mySeatvo: appvos.HLCPlayerVO;
                /**我的结算信息 */
                public myEndInfo: appvos.HLCInfoVO;
                /**等待上庄玩家 */
                public bankWaiter: number[];
                /**庄的牌值 */
                public bankResult: number;
                // /**庄牌型 */
                // public bankType: number;
                 /**庄牌型 */
                public bankCards: HappyAllCardsComp;
                /**牌局结束时 是否退出  1庄家退出游戏 2庄家下庄 */// 
                public outState: number = 0;
                private faceFactory: egret.MovieClipDataFactory;

                public historyValues:number[] =[];

                private historyWin: any[] = [];
                  /**挂机信息结构 */
                hookInfo: HookVO;
                /**所有奖池 */
                public allWinBet: Object = {};  
                
                public nowLuckyCard: number = null;
                public nextLuckyCard: number = null;
                public changeLuckyCard: boolean;
                /**
                 * 挂机换房间标记
                 */
                // changeHook:boolean = false;

                /**
                 * 是否在挂机中
                 */
                hookingFlag:boolean = false;

                /**
                 * 设置为默认值
                 */
                defaultHook():void {
                        this.hookInfo = new HookVO();
                        // this.changeHook = false;
                        this.hookingFlag = false;
                }
                constructor(name?: string, data?: any) {
                        super(HappyProxy.NAME);
                }
                private alert: tip.Alert;
                /**上限倍数 */
                public addTimes: number = 1;
                /**
                 * 设置牌局输赢
                 * 赢 1 输 0
                 *  */
                public  processingData(newN):void
                {
                      var len:number = this.historyValues.length;
                     if(newN>=0)
                     {
                        if(len>=20)this.historyValues.splice(20,1);
                        this.historyValues.push(newN)
                     }
                }
                 /**
                 * 获取牌局输赢
                 * 10.5% 99.9% 99.9%
                 *  */
                 public getProcessingData():number[]
                 {
                     var winNum:number[] =[0,0,0,0]
                        var aNum:number =0;
                        var bNum:number =0;
                        var cNum:number =0;
                        var dNum:number =0;
                        var len:number = this.historyValues.length;
                        while(--len >= 0) {
                                var single:number= this.historyValues[len];
                                if((single&1)==1) aNum++
                                if((single&2)==2) bNum++
                                if((single&4)==4) cNum++
                                if((single&8)==8) dNum++
                        }
                         len = this.historyValues.length;
                        winNum=[this.numberToEvent(aNum,len),
                        this.numberToEvent(bNum,len),
                        this.numberToEvent(cNum,len),
                        this.numberToEvent(dNum,len)
                        ];
                     return winNum;
                 }

                private numberToEvent(_a:number,_b:number):number
                {
                        var re = Math.floor(_a / _b * 100);
                        if(re) {
                            return re
                        }else{
                                return 0;
                        }
                
                }

                /**关闭  */
                public outRoom(): boolean {
                        if (this.isPlay) {
                                if (this.alert != null) {
                                        this.alert.closeAndClear();
                                        this.alert = null;
                                } else {
                                        if (this.tableVO != null && this.mySeatvo != null && this.tableVO.gameStatus == 1 && this.mySeatvo.showPos == 1)
                                                // tip.popSysCenterTip("正在下注，您不能下庄....", tip.TIPS_TYPE.TIPS_WARNING);
                                                this.alert = tip.Alert.show("牌局尚未结束，点击确定，将在牌局结束后退出游戏", "", tip.CONFIRM, this.outbakfun, null, this)
                                        else {
                                                this.leaveRoom();
                                        }
                                }
                                return false;
                        }
                        return true;
                }
                 /**打开打牌界面 */
                public openMoudle(opendata:any=null): void {
                        if (user.getProxy().exitToMoudle == -1) {
                                var arr = gameabc.UIManager.instance.getOpenList([AppReg.APP_HAPPY, __PRELOAD__]);
                                __OPEN_PRE_MOUDLE(AppReg.APP_HAPPY, opendata, arr);
                        } else {
                                __OPEN_PRE_MOUDLE(AppReg.APP_HAPPY, opendata, [user.getProxy().exitToMoudle]);
                        }
                }
                private outbakfun(type: number = tip.YES): void {
                        if (type == tip.YES) {
                                if (this.tableVO.gameStatus == 1)
                                        this.outState = 1;
                                else this.leaveRoom();
                        }
                }
                public leaveRoom(): void {
                     if (user.getProxy().exitToMoudle == -1) {
                        __CLOSE_MOUDLE(AppReg.APP_HAPPY);
                     } else {
                        __CLOSE_ALLMOUDLE_OPEN(user.getProxy().exitToMoudle,null,[AppReg.ALERT]);
                     }
                        user.getProxy().leaveRoom();
                }
                /**我的筹码 */
                public getMoney(): number {
                        var money: number = 0;
                        if (this.mySeatvo != null) {
                                money = this.mySeatvo.totalBet;
                        } else if (user.getProxy().svrGameData) {
                                money = user.getProxy().svrGameData.silver;
                        }
                        return money;
                }
                /**加注人数量 */
                public getAddNum(): number {
                        var num: number = 0;
                        var vos = this.tableVO.playerVO;
                        for (var i: number = 0, len: number = vos.length; i < len; i++) {
                                var play = vos[i];
                                if (play.posBet1 > 0 || play.posBet2 > 0 || play.posBet3 > 0 || play.posBet4 > 0)
                                        num++;
                        }
                        return num;
                }
                /**上庄 */
                public addBank(): boolean {
                        var money: number = room.getProxy().current.bigBlinds * 100;
                        if (this.getMoney() >= money) {
                                __PVO().to(app.NetAction.GLXY_REQ_BECOME_BANKER);
                                return true;
                        }
                        else {
                                user.getProxy().notMoney("上庄需要筹码大于等于"+FormatUtils.wan(money)+" 您的筹码不足，请回到主界面前往钱庄取款或充值");// tip.popSysCenterTip("筹码达到" + FormatUtils.wan(money) + "上庄..", tip.TIPS_TYPE.TIPS_WARNING);
                                return false;       
                        } 
                                
                }
                /*
                *动画库
                */
                public getFaceFactory(): egret.MovieClipDataFactory {
                        if (this.faceFactory == null) {
                                var data = RES.getRes("happy_mv_json");
                                var txtr = RES.getRes("happy_mv_png");
                                this.faceFactory = new egret.MovieClipDataFactory(data, txtr);
                        }
                        return this.faceFactory;
                }
                 /**
                 * 客户端发送聊天
                 * @param mess 信息
                 * @param send 发送座位号
                 * @param rev 收座位号 -1表情 -2文字 >=0魔法接收座位号
                 * @param messcode 统计用的code 100+ 表情 200+ 文字 300+魔法表情   400+是普通表情  500+是玩家表情
                 * @param l 不为空 收费表情
                 * */
                public sendChat(mess:string,send:number,rev:number,messcode:number,l:any=null):void{
                        var p = __PVO().s(mess).i(send,rev)
                        if(l != null) p.l(messcode);
                        p.to(app.NetAction.GLXY_REQ_CHAT);
                        var code: number;
                        if (rev == -1) code = mc2sdk.EVENT_TYPE.PLAYCARD_FACE + messcode + 300;
                        else code = mc2sdk.EVENT_TYPE.PLAYCARD_FACE + messcode + 200;
                        mc2sdk.event(code, this.tableVO.servicePay);//统计
                }
                public removeFactory(): void {
                        if (this.faceFactory != null) {
                                this.faceFactory.clearCache();
                                this.faceFactory = null;
                        }
                }
                /**可以添加的筹码 */
                public canAddbet(index: number,dec:number=0,add:number=0): number {
                        var vo = this.mySeatvo;
                        var tablevo = this.tableVO;
                        if (vo == null || tablevo == null || tablevo.gameStatus == 0 || room.getProxy().current == null ||  vo.showPos == 1) {
                                return -1;
                        }
                        var total = room.getProxy().current.bigBlinds*getProxy().addTimes;
                        var servicePay = tablevo.servicePay*getProxy().addTimes;
                        if (vo.showPos > 0) {
                           total = total + total;//在座位上的2倍上限 
                           servicePay = servicePay + servicePay; 
                        } 
                        return Math.min(vo.getLeftAdd(servicePay+dec,add),  total- vo.getBet(index));
                }
                public typeNums: number[] = [1,1,1,2,3,3,4,5,6,7];
                /***牌型对应赔率 */
                public typeToAddNum(type:number): number{                    
                        return this.typeNums[type];
                }
        }

}