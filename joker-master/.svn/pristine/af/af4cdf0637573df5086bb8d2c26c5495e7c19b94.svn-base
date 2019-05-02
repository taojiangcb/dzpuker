module record {
    /**
 *
 * @author 
 *
 */
    export class RecordHistoryItemRender extends uicomps.BaseItemCilckRenderer {
        
        
        card1:eui.Image;
        card2: eui.Image;
        txt1:eui.Label;
        txt2: eui.Label;
        txt3: eui.Label;
        txt4: eui.Label;
        
        btn1:eui.Image;
        btn2: eui.Image;
        btn3: eui.Image;
        public constructor() {
            super()
            this.skinName = "RecordHistoryItemRenderSkin";   
        }
        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            this.addButton(this.btn1);
            this.addButton(this.btn2);
            this.addButton(this.btn3);
        }
        protected click(tag: egret.DisplayObject): void {
            var json: appvos.DZRecordVO = this.data;
            if (json == null)
                return;    
            switch (tag) {
                case this.btn1://回顾
                    record.getProxy().getLocalVideo(json);
                    if (json.video == null)
                        tip.popSysCenterTip("记录不存在");
                    else
                        record.getProxy().currentInof = this.data;
                        getProxy().playVideo(this.data.video);                 
                   break;
                case this.btn2://收藏
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
                   case this.btn3://删除
                    var param: appvos.ParamVO = new appvos.ParamVO();
                    param.strValues = [user.getProxy().svrRoleId.toString()];
                    param.longValues = [json.id];
                    __SEND_NOTIFICATION(app.NetAction.DZ_RECORD_DEL,param);
                    
                    //record.getProxy().removeTableById(this.data.id)
                       break;
               }
        }
        protected dataChanged(): void {
//            var sendData: any = {
//                carID: info.carID,
//                id: num++,
//                type: info.type,
//                smallBlinds: info.smallBlinds,
//                bigBlinds: info.bigBlinds,
//                winNum: info.winNum,
//                timeNum: info.timeNum,
//            };
            if(this.data)
            {
                var json:appvos.DZRecordVO = this.data;
                if(record.getProxy().indexTab==3)
                {
                    this.btn2.visible =false;
                    this.btn3.visible =true;
                }else{
                    this.btn2.visible = true;
                    this.btn3.visible = false;
                }
                if(json)
                {
                    this.card1.source = playcards.getProxy().getCardName(json.myCard[0]);
                    this.card2.source = playcards.getProxy().getCardName(json.myCard[1]);
                    this.txt1.text = gameabc.ResourceBundleUtil.getMessage("PLAY_ROOM_HEAD_CARD",json.handNum);
                    this.txt2.text = gameabc.ResourceBundleUtil.getMessage("PLAY_ROOM_TIPS_TIPS" + json.type) + ":" + FormatUtils.wan(json.smallBlinds) + "/" + FormatUtils.wan(json.bigBlinds);
                    this.txt3.text = FormatUtils.wan(json.winNum);
                    if(json.winNum > 0) this.txt3.text = "+" + this.txt3.text;                 
                    var nowTime = new Date().getTime()
                    var timeStamp = (nowTime - json.timeNum)/1000
                    var day: number = Math.floor(timeStamp / 3600 / 24);
                    var hour: number = Math.floor((timeStamp % (3600 * 24)) / 3600);
                    var minute: number = Math.floor(timeStamp % 3600 / 60);
                    var strTim:string =""
                    if(day)
                    {
                        strTim = day+"天前"
                    }else if(hour){
                        strTim = hour + "小时前"
                    }else{
                        strTim = minute + "分钟前"                      
                    }
                    
                    this.txt4.text = strTim;//DateUtils.dateFormat(new Date(json.timeNum),"yyyy-MM-dd");
                    
                } else {
                     this.card1.source = playcards.CardItem.backSrc;
                     this.card2.source = playcards.CardItem.backSrc;
                     var strTim: string = ""; 
                    this.txt1.text = strTim;
                    this.txt2.text = strTim;
                    this.txt3.text = strTim;
                    this.txt3.text = strTim;                                   
                                                    
                    this.txt4.text = strTim;
                }
               
            }
            
        }
    }
}
