var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var record;
(function (record) {
    /**
 *
 * @author
 *
 */
    var RecordHistoryItemRender = (function (_super) {
        __extends(RecordHistoryItemRender, _super);
        function RecordHistoryItemRender() {
            var _this = _super.call(this) || this;
            _this.skinName = "RecordHistoryItemRenderSkin";
            return _this;
        }
        RecordHistoryItemRender.prototype.createComplete = function (evt) {
            _super.prototype.createComplete.call(this, evt);
            this.addButton(this.btn1);
            this.addButton(this.btn2);
            this.addButton(this.btn3);
        };
        RecordHistoryItemRender.prototype.click = function (tag) {
            var json = this.data;
            if (json == null)
                return;
            switch (tag) {
                case this.btn1:
                    record.getProxy().getLocalVideo(json);
                    if (json.video == null)
                        tip.popSysCenterTip("记录不存在");
                    else
                        record.getProxy().currentInof = this.data;
                    record.getProxy().playVideo(this.data.video);
                    break;
                case this.btn2:
                    record.getProxy().collectionRecord(json);
                    // record.getProxy().getLocalVideo(json);
                    // if (json.video == null)
                    //     tip.popSysCenterTip("记录不存在");
                    // else {
                    //     // var url: string = utils.NativeUtils.getURL() + "?video=" + json.video.toString();
                    //     // __OPEN_MOUDLE(AppReg.APP_QR, url);
                    //     if(record.getProxy().collRecord.length < 5 ) {
                    //         if(record.getProxy().getCollById(json.handNum)){
                    //                 tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS4"))
                    //             return;
                    //         }
                    //             var param: appvos.ParamVO = new appvos.ParamVO();                      
                    //             record.getProxy().indexDate = this.data
                    //             record.getProxy().getLocalVideo(json);
                    //             var a = this.data.toArrayBuffer();
                    //             param.data = [a];
                    //             param.strValues = [app.NetAction.DZ_RECORD_ADD];
                    //             __SEND_NOTIFICATION(app.NetAction.DZ_RECORD_ADD,param);                           
                    //     }else{
                    //             tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS2"))
                    //     }
                    // }
                    break;
                case this.btn3:
                    var param = new appvos.ParamVO();
                    param.strValues = [user.getProxy().svrRoleId.toString()];
                    param.longValues = [json.id];
                    __SEND_NOTIFICATION(app.NetAction.DZ_RECORD_DEL, param);
                    //record.getProxy().removeTableById(this.data.id)
                    break;
            }
        };
        RecordHistoryItemRender.prototype.dataChanged = function () {
            //            var sendData: any = {
            //                carID: info.carID,
            //                id: num++,
            //                type: info.type,
            //                smallBlinds: info.smallBlinds,
            //                bigBlinds: info.bigBlinds,
            //                winNum: info.winNum,
            //                timeNum: info.timeNum,
            //            };
            if (this.data) {
                var json = this.data;
                if (record.getProxy().indexTab == 3) {
                    this.btn2.visible = false;
                    this.btn3.visible = true;
                }
                else {
                    this.btn2.visible = true;
                    this.btn3.visible = false;
                }
                if (json) {
                    this.card1.source = playcards.getProxy().getCardName(json.myCard[0]);
                    this.card2.source = playcards.getProxy().getCardName(json.myCard[1]);
                    this.txt1.text = gameabc.ResourceBundleUtil.getMessage("PLAY_ROOM_HEAD_CARD", json.handNum);
                    this.txt2.text = gameabc.ResourceBundleUtil.getMessage("PLAY_ROOM_TIPS_TIPS" + json.type) + ":" + FormatUtils.wan(json.smallBlinds) + "/" + FormatUtils.wan(json.bigBlinds);
                    this.txt3.text = FormatUtils.wan(json.winNum);
                    if (json.winNum > 0)
                        this.txt3.text = "+" + this.txt3.text;
                    var nowTime = new Date().getTime();
                    var timeStamp = (nowTime - json.timeNum) / 1000;
                    var day = Math.floor(timeStamp / 3600 / 24);
                    var hour = Math.floor((timeStamp % (3600 * 24)) / 3600);
                    var minute = Math.floor(timeStamp % 3600 / 60);
                    var strTim = "";
                    if (day) {
                        strTim = day + "天前";
                    }
                    else if (hour) {
                        strTim = hour + "小时前";
                    }
                    else {
                        strTim = minute + "分钟前";
                    }
                    this.txt4.text = strTim; //DateUtils.dateFormat(new Date(json.timeNum),"yyyy-MM-dd");
                }
                else {
                    this.card1.source = playcards.CardItem.backSrc;
                    this.card2.source = playcards.CardItem.backSrc;
                    var strTim = "";
                    this.txt1.text = strTim;
                    this.txt2.text = strTim;
                    this.txt3.text = strTim;
                    this.txt3.text = strTim;
                    this.txt4.text = strTim;
                }
            }
        };
        return RecordHistoryItemRender;
    }(uicomps.BaseItemCilckRenderer));
    record.RecordHistoryItemRender = RecordHistoryItemRender;
    __reflect(RecordHistoryItemRender.prototype, "record.RecordHistoryItemRender");
})(record || (record = {}));
//# sourceMappingURL=RecordHistoryItemRender.js.map