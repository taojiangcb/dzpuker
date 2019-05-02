module feed {
    /**
  *
  * @author 
  *
  */
    export class FeedUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        
        btnColse:eui.Image;
        btnCancel:eui.Button;
        btnOk: eui.Button;
        btnCancel1: eui.Image;
        btnOk1: eui.Button;
        private infoVO:appvos.DZRecordVO;
        
        video:appvos.PlayCardsVideoVO;//回放记录 
        
        userInfo:eui.Component;
        cardInfo:eui.Component;
        
        collection: eui.ArrayCollection;
        
        firstGroup:eui.Group;
        secondGroup:eui.Group;
        
        feedbackRoleIds:string;
        feedbackRoleNames: string;
        
        qqTextInput: eui.TextInput;
        phTextInput: eui.TextInput;
        feedName:eui.Label
        
        isRecordOpen:boolean =false;

        opInfo:appvos.SeatPlayerVO
        
        public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "FeedUIMoudleSkin";
        }
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            app.mvc.AppFacade.getInstance().registerMediator(new FeedUIMoudleMediator(this));
            this.bindButton(this.btnColse);
            this.bindButton(this.btnCancel);
            this.bindButton(this.btnOk);
            this.bindButton(this.btnCancel1);
            this.bindButton(this.btnOk1);
           // this.bindButton(this.cardInfo["btnOk"])
            
            this.userInfo["fristList"].itemRenderer = FeedInfoItem;
            
           // this.qqTextInput.addEventListener(egret.Event.FOCUS_IN,this.inputHandler,this)
            //this.qqTextInput.addEventListener(egret.Event.FOCUS_OUT,this.inputOutHandler,this)
                
            //this.phTextInput.addEventListener(egret.Event.FOCUS_IN,this.inputHandler,this)
           // this.phTextInput.addEventListener(egret.Event.FOCUS_OUT,this.inputOutHandler,this)
        }
        private inputOutHandler(evt:any): void {
            var tag: egret.DisplayObject = evt.currentTarget;
            if(tag==this.qqTextInput)
            {
                if(this.qqTextInput.text == "") {
                    this.qqTextInput.text = "0";
                } 
            }
            if(tag == this.phTextInput) {
                if(this.phTextInput.text == "") {
                    this.phTextInput.text = "0";
                }
            }
        }
        private inputHandler(evt: any): void {
            var tag: egret.DisplayObject = evt.currentTarget;
            if(tag == this.qqTextInput) {
                if(this.qqTextInput.text == "0") {
                    this.qqTextInput.text = "";
                }
            }
            
            if(tag == this.phTextInput) {

                if(this.phTextInput.text == "0") {
                    this.phTextInput.text = "";
                }
            }

        }
        public opening(): void {
            this.secondGroup.visible = false;
            this.firstGroup.visible = true;
            if(this.uiOpenData) {
                if(this.uiOpenData instanceof appvos.DZRecordVO) {
                    this.infoVO = this.uiOpenData;
                } else if(this.uiOpenData instanceof Array){
                    this.infoVO = this.uiOpenData[0];
                    this.opInfo = this.uiOpenData[2];
                    if(this.uiOpenData[1]==1)
                    {
                        this.isRecordOpen = true;
                    }
                }
                record.getProxy().getLocalVideo(this.infoVO);
                this.video = this.infoVO.video;
            }
           // this.cardInfo["jbGroup"].visible = this.isRecordOpen;
            this.showEvent();
        }
        
        public showEvent(): void {
            if(this.collection == null) {
                this.collection = new eui.ArrayCollection();
            }
            var listArr = [];
            if(this.video&&this.video.tablevo)
            {
                var arr: appvos.SeatPlayerVO[] = this.video.tablevo.seatPlayerVO;
                if(arr)
                {
                    for(var i: number = 0;i < arr.length;i++) {
                        var info: appvos.SeatPlayerVO = arr[i]
                        if(info && info.roleId!=user.getProxy().svrRoleId)
                        {
                            var obj  ={};
                            if(this.opInfo&&info.roleId == this.opInfo.roleId)
                            {
                                obj = { info: info,choice: 1 }
                            }else{
                                obj = { info: info,choice: 0 }
                            }
                           
                            listArr.push(obj)
                        }
                    } 
                }
            }
            if(listArr)
            {
                this.collection.source = listArr;
                this.userInfo["fristList"].dataProvider = this.collection;
            }
            this.showCarInof();
        }
        showCarInof():void
        {
            if(this.infoVO)
            {
                this.cardInfo["card1"].source = playcards.getProxy().getCardName(this.infoVO.myCard[0]);
                this.cardInfo["card2"].source = playcards.getProxy().getCardName(this.infoVO.myCard[1]);
                this.cardInfo["txt1"].text = gameabc.ResourceBundleUtil.getMessage("PLAY_ROOM_HEAD_CARD",this.infoVO.handNum);
                this.cardInfo["txt2"].text = gameabc.ResourceBundleUtil.getMessage("PLAY_ROOM_TIPS_TIPS" + this.infoVO.type) + ":" + FormatUtils.wan(this.infoVO.smallBlinds) + "/" + FormatUtils.wan(this.infoVO.bigBlinds);
            }
            
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.btnColse:
                case this.btnCancel:
                case this.btnCancel1:
                this.close();
                break;
                
                case this.btnOk:
                    var tabvo = playcards.getTableVO();
                    var id = user.getProxy().svrNumId;
                    if (tabvo&&tabvo.whiteReporter&&tabvo.whiteReporter.indexOf(id)!=-1 ) {
                        __PVO().i(user.getProxy().getNumId(this.opInfo.roleId)).to(app.NetAction.REQ_REPORT_PLAYER); 
                   } 
                    this.showSecondGroup();
                    if(this.feedbackRoleIds=="")
                    {
                        tip.popSysCenterTip("请选择要举报的人！",tip.TIPS_TYPE.TIPS_WARNING)
                    }else{
                        this.firstGroup.visible = false;
                        this.secondGroup.visible = true;
                    }
                   
                break;
                
                case this.btnOk1://发送数据到服务端
                    
                    // var param: appvos.ParamVO = new appvos.ParamVO();
                    // param.longValues = [__SET_INT64(user.getProxy().svrRoleId)]
                    //param.strValues = [app.NetAction.DZ_FEEDBACK_ADD];
                    var vos  =new appvos.FeedbackVO();
                    vos.id = 0;
                    vos.roleId = user.getProxy().svrRoleId;
                    vos.roleName = user.getProxy().svrName;
                    vos.feedbackRoleIds = this.feedbackRoleIds;
                    vos.feedbackRoleNames = this.feedbackRoleNames;
                    vos.context ="双簧";
                    vos.qq = this.qqTextInput.text;
                    vos.phone = this.phTextInput.text;
                    vos.status =0;
                    vos.video = this.video;
                    vos.createTime = 0;
                    //var a = vos.toArrayBuffer();
                   // param.data = [a];
                    __SEND_NOTIFICATION(app.NetAction.DZ_FEEDBACK_ADD,vos.toArrayBuffer());     
                    
                    this.close();
                    break;
                    
                // case this.cardInfo["btnOk"]:
                //     __OPEN_PRE_MOUDLE(AppReg.APP_PLAY_RECORD);
                // this.close();
                // break;
            }
        }
        showSecondGroup():void
        {
            this.feedbackRoleIds ="";
            this.feedbackRoleNames = "";
            for(var i = 0;i < this.userInfo["fristList"].dataProvider.length;i++) {
                var obj = this.userInfo["fristList"].dataProvider.getItemAt(i)
                if(obj&&obj.choice == 1)
                {
                    if(this.feedbackRoleIds == "" || this.feedbackRoleNames=="")
                    {
                        this.feedbackRoleIds += obj.info.roleId;
                        this.feedbackRoleNames +=  obj.info.name;
                    }else{
                        this.feedbackRoleIds += "," + obj.info.roleId;
                        this.feedbackRoleNames += "," + obj.info.name;
                    }
                    
                }
            }
            this.feedName.text = this.feedbackRoleNames;
        }
       
        public dispose(): void {
            this.qqTextInput.removeEventListener(egret.Event.FOCUS_IN,this.inputHandler,this)
            this.qqTextInput.removeEventListener(egret.Event.FOCUS_OUT,this.inputOutHandler,this)
            this.phTextInput.removeEventListener(egret.Event.FOCUS_IN,this.inputHandler,this)
            this.phTextInput.removeEventListener(egret.Event.FOCUS_OUT,this.inputOutHandler,this)
            app.mvc.AppFacade.getInstance().removeMediator(FeedUIMoudleMediator.NAME)
            super.dispose();
        }
    }
 
}
