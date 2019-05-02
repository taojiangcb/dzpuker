/**
 * 历史战绩列表
 */
module record {

    export function getProxy():RecordProxy {
        return __GET_PROXY(RecordProxy);
    }

    export class RecordProxy extends app.mvc.AbsractProxy {

        static NAME:string = "__RECORD_PROXY__";

        //战绩列表
        // public tableVos: room.TableVO[] = [];
        
        /****收藏牌局***/
        public collRecord:appvos.DZRecordVO[] =[];
        
        /****本地缓存牌局100***/
        public allRecord: appvos.DZRecordVO[] ;
        public allRecordStr: string[] ;
        
        /****赢钱***/
        // private winRecord: appvos.DZRecordVO[] ;
        
        public recordKey:string = "PLAY_RECORD_DATA_ITEM"
        
        public recordNum: string = "PLAY_CLLRECORD_DATA_NUM"
        public indexTab:number =1;
        
        public indexDate:appvos.DZRecordVO =null;
        
        //如果返回没有或者最后一页
        public isBool:boolean = false;

        //当前回顾VO
        public currentInof:appvos.DZRecordVO;

        // isOpen: boolean = false;
        
        constructor(data?:any) {
            super(RecordProxy.NAME, data);           
        }

        initDate():void
        {
            var allStr:String = gameabc.LocalSO.getItem(this.recordKey);
           this.allRecord = [];
           if (allStr) {
               var arr: any[] = []
               this.allRecordStr = allStr.split(',');
               this.strTOVO();
               // this.strToJosn(allStr, this.allRecord);
               // this.allRecord = arr.sort(this.timerFunction).concat()
               // this.winRecord = arr.sort(this.compareFunction).concat()
           } else this.allRecordStr = [];
        }
        /****赢钱***/
        public getwinRecord():appvos.DZRecordVO[] {
            var winRecord = this.allRecord.concat().sort(this.compareFunction);
            return winRecord;
        }
        private timerFunction(a: any,b: any): number {
            return b.handNum - a.handNum
        }
        
        openFeed():void
        {
            var arr = record.getProxy().allRecord
            if(arr.length > 0) {
                __OPEN_PRE_MOUDLE(AppReg.APP_FEED,[arr[0],1])
            } else {
                tip.popSysCenterTip("没有牌局记录哦！",tip.TIPS_TYPE.TIPS_WARNING)
            }
        }
        
        private compareFunction(a: any,b: any): number {
            return b.winNum - a.winNum
        }
        private strTOVO(): void{           
            for(var i: number = 0,len:number = this.allRecordStr.length;i < len;i++){
                var jStr = this.allRecordStr[i];
                var vo = new appvos.DZRecordVO();             
                try {
                    vo.setString(jStr); 
                    this.allRecord.push(vo);
                } catch (e) {
                     this.allRecord.push(null);
                    console.log("DZRecordVO  decode error :"+jStr)
                }
                 
            }
        }
        // private strToJosn(str:string,_in:any[]):void
        // {
        //    var strArr =  str.substring(1).split("|")
        //    if(strArr.length)
        //    {
        //        for(var i: number = 0;i < strArr.length;i++)
        //        {
        //            var jStr = strArr[i]
        //            if(jStr)
        //            {
        //                _in.push(JSON.parse(jStr))
        //            }
        //        }
        //     }
            
        // }
        /**
         * 添加一个牌局信息到对列号
         * */
        addRecord(recvo: appvos.DZRecordVO,videovo:appvos.PlayCardsVideoVO): void {
             
            if(this.allRecord==null)return;
            if(this.getTableById(recvo.handNum) == null) {
                 var strL = gameabc.LocalSO.getItem(this.recordNum);
                 var num: number = 1;
                 if(strL) {
                     num = Number(strL);
                     num++
                 }
                 gameabc.LocalSO.setItem(this.recordNum,num.toString());
                 recvo.handNum = num; 
                 recvo.key = "video:" + videovo.startTime;
                 recvo.timeNum = videovo.startTime;
                 if (this.allRecord.length > 99) {
                     var vo = this.allRecord.pop();
                     if (vo) {
                         var key: string = vo.key;
                         gameabc.LocalSO.removeItem(key);  
                     }
                     this.allRecordStr.pop();
                }
                 this.allRecord.unshift(recvo);
                 this.allRecordStr.unshift(recvo.toString());
                var allstr = this.allRecordStr.toLocaleString()
                gameabc.LocalSO.setItem(this.recordKey,allstr);
                gameabc.LocalSO.setItem(recvo.key, videovo.toString());
               
             }
            
        }
        /**播放录像 */
        playVideo(videovo: appvos.PlayCardsVideoVO): void{
            // __CLOSE_MOUDLE(AppReg.APP_PLAY_RECORD);
            playcards.getProxy().videovo = videovo;
            videovo = videovo.clone();
            playcards.getProxy().tableVO = videovo.tablevo;
            playcards.getProxy().playvideovo = videovo;
            var ui: playcards.PlayCardsUIMoudleComp = __GET_MOUDLE_COMP(AppReg.APP_PLAYCARDS) as playcards.PlayCardsUIMoudleComp;
            if (ui == null || ui.parent == null) {
                
                    // var arr = gameabc.UIManager.instance.openList.concat();
                    // __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, arr);
                playcards.getProxy().openMoudle();
              
            } else {
                ui.refVO();
            }
            
        }
        /**获取录像vo */
        getVideoVO(key:string): appvos.PlayCardsVideoVO {
            var str: string = gameabc.LocalSO.getItem(key);
            if (str) {
                var videovo: appvos.PlayCardsVideoVO = new appvos.PlayCardsVideoVO();
                videovo.setString(str);
                return videovo
            }
            return null;
        }
        /**获取本地录像vo */
        public getLocalVideo(vo: appvos.DZRecordVO ): void {
           
            if(vo != null && vo.video == null) {
                vo.video = this.getVideoVO(vo.key)
            }
        }
          /**
         * 添加一收藏牌局
         * */
        addCollRecord(val:any):any
        {
            var len = this.collRecord.length;
            var bool:boolean =true;
            while(--len > -1) {
                var tableRoot = this.collRecord[len];
                if(tableRoot.id == val.id) {
                    bool = false;
                    break ;
                }
            }
            if(bool)
            {
                if(this.allRecord.length>=100)
                {
                    this.allRecord.splice(0,1);
                }
                this.collRecord.push(val)
                return val
            }
           return null;
        }
         
        // private saveLocal(str: string,info: any):void
        //  {
        //      var newStr:string =""
        //      var len = this.allRecord.length;
        //      while(--len > -1) {
        //          var tableRoot = this.allRecord[len];
        //          if(tableRoot) {
        //              var sendData: any = {
        //                  myCard: tableRoot.myCard,
        //                  id: tableRoot.id,
        //                  handNum: tableRoot.handNum,
        //                  type: tableRoot.type,
        //                  smallBlinds: tableRoot.smallBlinds,
        //                  bigBlinds: tableRoot.bigBlinds,
        //                  winNum: tableRoot.winNum,
        //                  timeNum: tableRoot.timeNum,
        //              };
        //              var jsonData: string = JSON.stringify(sendData);
        //              newStr += "|" + jsonData
        //          }
        //      }
        //      gameabc.LocalSO.setItem(str,newStr);
        //  }

        /**
         * 获取一个牌局的数据信息
         * @tableid 牌局id
         **/
        getTableById(id: number): any {
             var len = this.allRecord.length;
             while(--len > -1) {
                 var tableRoot = this.allRecord[len];
                 if(tableRoot.handNum == id) {
                     return tableRoot;
                 }
             }
             return null;
         }
         
        getCollById(id: number): any {
            var len = this.collRecord.length;
            while(--len > -1) {
                var tableRoot = this.collRecord[len];
                if(tableRoot.handNum == id) {
                    return tableRoot;
                }
            }
            return null;
        }

        /**
         * 删除一条收藏牌局数据
         * */
         removeTableById(id:number):boolean {
             var i:number = 0;
             var len: number = this.collRecord.length;
             var flag:boolean = false;
             for(i; i != len;) {
                 if(this.collRecord[i].id == id) {
                     var delTable: any = this.collRecord[i];
                     this.collRecord.splice(i,1);
                     len = this.collRecord.length;
                     __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_RECORD_DATA,delTable);
                    flag = true;
                } else {
                    i++;
                }
             }
             return flag;
         }
        /**
         * 牌局收藏
         * **/
         collectionRecord(json:appvos.DZRecordVO):void
         {
              record.getProxy().getLocalVideo(json);
                    if (json.video == null)
                        tip.popSysCenterTip("记录不存在");
                    else {
                        // var url: string = utils.NativeUtils.getURL() + "?video=" + json.video.toString();

                        // __OPEN_MOUDLE(AppReg.APP_QR, url);

                        if(record.getProxy().collRecord.length < 5 ) {
                            if(record.getProxy().getCollById(json.handNum)){
                                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS4"))
                                return;
                            }
                                var param: appvos.ParamVO = new appvos.ParamVO();                      
                                record.getProxy().indexDate =json
                                record.getProxy().getLocalVideo(json);
                                var a = json.toArrayBuffer();
                                param.data = [a];
                                param.strValues = [app.NetAction.DZ_RECORD_ADD];
                                __SEND_NOTIFICATION(app.NetAction.DZ_RECORD_ADD,param);                           
                        }else{
                                tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS2"))
                        }
                    }
         }

        /**
         * 刷新或者添加一条牌局数据信息
         * **/
        // updateTableInfo(tableInfo:room.TableVO):void {
            
        // }
        clearAllTables():void {
            this.collRecord =[];
            this.allRecord = [];
            // this.winRecord = [];
        }

        dispose():void {
            this.clearAllTables();
            super.dispose();
        }
    }
}