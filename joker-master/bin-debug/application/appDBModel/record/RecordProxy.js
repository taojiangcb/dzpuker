var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 历史战绩列表
 */
var record;
(function (record) {
    function getProxy() {
        return __GET_PROXY(RecordProxy);
    }
    record.getProxy = getProxy;
    var RecordProxy = (function (_super) {
        __extends(RecordProxy, _super);
        // isOpen: boolean = false;
        function RecordProxy(data) {
            var _this = _super.call(this, RecordProxy.NAME, data) || this;
            //战绩列表
            // public tableVos: room.TableVO[] = [];
            /****收藏牌局***/
            _this.collRecord = [];
            /****赢钱***/
            // private winRecord: appvos.DZRecordVO[] ;
            _this.recordKey = "PLAY_RECORD_DATA_ITEM";
            _this.recordNum = "PLAY_CLLRECORD_DATA_NUM";
            _this.indexTab = 1;
            _this.indexDate = null;
            //如果返回没有或者最后一页
            _this.isBool = false;
            return _this;
        }
        RecordProxy.prototype.initDate = function () {
            var allStr = gameabc.LocalSO.getItem(this.recordKey);
            this.allRecord = [];
            if (allStr) {
                var arr = [];
                this.allRecordStr = allStr.split(',');
                this.strTOVO();
            }
            else
                this.allRecordStr = [];
        };
        /****赢钱***/
        RecordProxy.prototype.getwinRecord = function () {
            var winRecord = this.allRecord.concat().sort(this.compareFunction);
            return winRecord;
        };
        RecordProxy.prototype.timerFunction = function (a, b) {
            return b.handNum - a.handNum;
        };
        RecordProxy.prototype.openFeed = function () {
            var arr = record.getProxy().allRecord;
            if (arr.length > 0) {
                __OPEN_PRE_MOUDLE(AppReg.APP_FEED, [arr[0], 1]);
            }
            else {
                tip.popSysCenterTip("没有牌局记录哦！", tip.TIPS_TYPE.TIPS_WARNING);
            }
        };
        RecordProxy.prototype.compareFunction = function (a, b) {
            return b.winNum - a.winNum;
        };
        RecordProxy.prototype.strTOVO = function () {
            for (var i = 0, len = this.allRecordStr.length; i < len; i++) {
                var jStr = this.allRecordStr[i];
                var vo = new appvos.DZRecordVO();
                try {
                    vo.setString(jStr);
                    this.allRecord.push(vo);
                }
                catch (e) {
                    this.allRecord.push(null);
                    console.log("DZRecordVO  decode error :" + jStr);
                }
            }
        };
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
        RecordProxy.prototype.addRecord = function (recvo, videovo) {
            if (this.allRecord == null)
                return;
            if (this.getTableById(recvo.handNum) == null) {
                var strL = gameabc.LocalSO.getItem(this.recordNum);
                var num = 1;
                if (strL) {
                    num = Number(strL);
                    num++;
                }
                gameabc.LocalSO.setItem(this.recordNum, num.toString());
                recvo.handNum = num;
                recvo.key = "video:" + videovo.startTime;
                recvo.timeNum = videovo.startTime;
                if (this.allRecord.length > 99) {
                    var vo = this.allRecord.pop();
                    if (vo) {
                        var key = vo.key;
                        gameabc.LocalSO.removeItem(key);
                    }
                    this.allRecordStr.pop();
                }
                this.allRecord.unshift(recvo);
                this.allRecordStr.unshift(recvo.toString());
                var allstr = this.allRecordStr.toLocaleString();
                gameabc.LocalSO.setItem(this.recordKey, allstr);
                gameabc.LocalSO.setItem(recvo.key, videovo.toString());
            }
        };
        /**播放录像 */
        RecordProxy.prototype.playVideo = function (videovo) {
            // __CLOSE_MOUDLE(AppReg.APP_PLAY_RECORD);
            playcards.getProxy().videovo = videovo;
            videovo = videovo.clone();
            playcards.getProxy().tableVO = videovo.tablevo;
            playcards.getProxy().playvideovo = videovo;
            var ui = __GET_MOUDLE_COMP(AppReg.APP_PLAYCARDS);
            if (ui == null || ui.parent == null) {
                // var arr = gameabc.UIManager.instance.openList.concat();
                // __OPEN_PRE_MOUDLE(AppReg.APP_PLAYCARDS, null, arr);
                playcards.getProxy().openMoudle();
            }
            else {
                ui.refVO();
            }
        };
        /**获取录像vo */
        RecordProxy.prototype.getVideoVO = function (key) {
            var str = gameabc.LocalSO.getItem(key);
            if (str) {
                var videovo = new appvos.PlayCardsVideoVO();
                videovo.setString(str);
                return videovo;
            }
            return null;
        };
        /**获取本地录像vo */
        RecordProxy.prototype.getLocalVideo = function (vo) {
            if (vo != null && vo.video == null) {
                vo.video = this.getVideoVO(vo.key);
            }
        };
        /**
       * 添加一收藏牌局
       * */
        RecordProxy.prototype.addCollRecord = function (val) {
            var len = this.collRecord.length;
            var bool = true;
            while (--len > -1) {
                var tableRoot = this.collRecord[len];
                if (tableRoot.id == val.id) {
                    bool = false;
                    break;
                }
            }
            if (bool) {
                if (this.allRecord.length >= 100) {
                    this.allRecord.splice(0, 1);
                }
                this.collRecord.push(val);
                return val;
            }
            return null;
        };
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
        RecordProxy.prototype.getTableById = function (id) {
            var len = this.allRecord.length;
            while (--len > -1) {
                var tableRoot = this.allRecord[len];
                if (tableRoot.handNum == id) {
                    return tableRoot;
                }
            }
            return null;
        };
        RecordProxy.prototype.getCollById = function (id) {
            var len = this.collRecord.length;
            while (--len > -1) {
                var tableRoot = this.collRecord[len];
                if (tableRoot.handNum == id) {
                    return tableRoot;
                }
            }
            return null;
        };
        /**
         * 删除一条收藏牌局数据
         * */
        RecordProxy.prototype.removeTableById = function (id) {
            var i = 0;
            var len = this.collRecord.length;
            var flag = false;
            for (i; i != len;) {
                if (this.collRecord[i].id == id) {
                    var delTable = this.collRecord[i];
                    this.collRecord.splice(i, 1);
                    len = this.collRecord.length;
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.UP_RECORD_DATA, delTable);
                    flag = true;
                }
                else {
                    i++;
                }
            }
            return flag;
        };
        /**
         * 牌局收藏
         * **/
        RecordProxy.prototype.collectionRecord = function (json) {
            record.getProxy().getLocalVideo(json);
            if (json.video == null)
                tip.popSysCenterTip("记录不存在");
            else {
                // var url: string = utils.NativeUtils.getURL() + "?video=" + json.video.toString();
                // __OPEN_MOUDLE(AppReg.APP_QR, url);
                if (record.getProxy().collRecord.length < 5) {
                    if (record.getProxy().getCollById(json.handNum)) {
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS4"));
                        return;
                    }
                    var param = new appvos.ParamVO();
                    record.getProxy().indexDate = json;
                    record.getProxy().getLocalVideo(json);
                    var a = json.toArrayBuffer();
                    param.data = [a];
                    param.strValues = [app.NetAction.DZ_RECORD_ADD];
                    __SEND_NOTIFICATION(app.NetAction.DZ_RECORD_ADD, param);
                }
                else {
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS2"));
                }
            }
        };
        /**
         * 刷新或者添加一条牌局数据信息
         * **/
        // updateTableInfo(tableInfo:room.TableVO):void {
        // }
        RecordProxy.prototype.clearAllTables = function () {
            this.collRecord = [];
            this.allRecord = [];
            // this.winRecord = [];
        };
        RecordProxy.prototype.dispose = function () {
            this.clearAllTables();
            _super.prototype.dispose.call(this);
        };
        return RecordProxy;
    }(app.mvc.AbsractProxy));
    RecordProxy.NAME = "__RECORD_PROXY__";
    record.RecordProxy = RecordProxy;
    __reflect(RecordProxy.prototype, "record.RecordProxy");
})(record || (record = {}));
//# sourceMappingURL=RecordProxy.js.map