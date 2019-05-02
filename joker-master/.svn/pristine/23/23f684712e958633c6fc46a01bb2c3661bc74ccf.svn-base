module myInfo {
    /**
     *我的信息面板
     * @author
     *
     */
    export class MyInfoUIMoudleComp extends app.base.BaseWndUIMoudleComponent {

        // public bgimage:eui.Rect;

        private group_wrap : eui.Group; //最外层的group 用来适用不同界面的高度
        private tabButton1:eui.ToggleButton;
        private tabButton2:eui.ToggleButton;
        private tarbar:uicomps.ButtonGroup;

        private infoType1:MyInfoComp1; //基本的8项信息
        private infoType2:MyInfoComp2;
        


        private currentCom:any;

        private usID:eui.Label;

        /**名字性别**/
        private iconInfo1:eui.Component;
        /**筹码**/
        private iconInfo2:eui.Component;
        /**VIP 剩余时间**/
        private iconInfo3:eui.Component;

        private roleVO:cyvos.PlayerInfo;
        
        private playVO: appvos.UserInfoVO;
        
        private avtar: uicomps.AvatarImage;

        /** 实名认证 */
        private btnDianjiyanzheng:eui.Image;
        private imgYiyanzheng:eui.Image;

        backButton:eui.Image;


        complaintButton:eui.Button;
        buddyButton:eui.Button;
        dataButton2:eui.Button;

        recordButton:eui.Button;
        dataButton:eui.Button;
        fristList:eui.List;

        public constructor() {
            super();
            this.skinName = "MyInfoUIMoudleSkin";
        }

        public createComplete(event:egret.Event):void {
            super.createComplete(event);

            app.mvc.AppFacade.getInstance().registerMediator(new MyInfoUIMoudMediator(this));

            this.bindButton(this.avtar,false);
            this.infoType1.bottom = 85; //个人信息界面，下面有按钮，所以底框向上留出位置
            this.bindButton(this.recordButton)
            this.bindButton(this.dataButton)
            this.bindButton(this.backButton);
            // this.bindButton(this.bgimage, false);

            this.complaintButton.visible = false;
            this.buddyButton.visible = false;
            this.dataButton2.visible = false;
            this.fristList.visible = false;

            // this.infoType1.btnRecord.visible = true;
            // this.infoType2.btn1.visible = true;
            // this.infoType2.btn2.visible = true;

            this.btnDianjiyanzheng.visible = false;
            this.imgYiyanzheng.visible = false;
            this.bindButton(this.btnDianjiyanzheng);

            this.group_wrap.height = 390;
            
        }

        public addedToStage(evt:egret.Event):void {
            this.showEvent();
        }
        public opening(): void
        {
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO,[user.getProxy().svrRoleId]);
            this.showEvent();
        }
        public showEvent():void {
            if(user.getProxy().svrGameData) {
                var vo = new cyvos.PlayerInfo();
                vo.numWins = user.getProxy().svrGameData.numWins;
                vo.numLosts = user.getProxy().svrGameData.numLosts;
                vo.numPeaces = user.getProxy().svrGameData.numPeaces;
                vo.numEscapes = user.getProxy().svrGameData.numEscapes;
                this.roleVO = vo;
            }
            this.playVO = user.getProxy().playInfoVO;
            this.avtar.source = user.getProxy().getHeadStr(user.getProxy().svrHeadId);
            this.currentCom = this.infoType1;
            this.currentCom.setData(this.roleVO,this.playVO);
            this.infoType2.setData(this.roleVO,this.playVO);
            this.usID.text = "ID: " + user.getProxy().svrRoleId;

            // 是自己的界面
            // 判断是否认证过，和是否需要认证
            if(!antiSystem.isRNV()) {
                this.btnDianjiyanzheng.visible = true;
                this.imgYiyanzheng.visible = false;
            } 
            else {
                this.btnDianjiyanzheng.visible = false;
                this.imgYiyanzheng.visible = true;
            }

            if (cyvos.PLAYER_SEX.FEMALE == user.getProxy().sex) {
                this.iconInfo1["icon"].source = "icon_info_sex0_png";
            } else {
                this.iconInfo1["icon"].source = "icon_info_sex1_png";
            }

            this.iconInfo1["label"].text = user.getProxy().svrName;

            this.iconInfo2["icon"].source = "icon_caoma_png";
            if(user.getProxy().svrGameData) {
                this.iconInfo2["label"].text = FormatUtils.spot(user.getProxy().svrGameData.silver);
            }
           

            this.iconInfo3["icon"].source = "icon_vip_png";
            var nextTime = 0//this.roleVO.vipTime - app.SystemTimer.getServerTime();
            if (nextTime < 0) {
                nextTime = 0;
            }
            this.iconInfo3["label"].text = "未开放"//gameabc.ResourceBundleUtil.getMessage("RESIDUAL_TIME") + DateUtils.formatTime5(nextTime, ['天', '时']);
        }

        protected touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            switch (clickTarget) {
                case this.btnDianjiyanzheng:
                    __OPEN_PRE_MOUDLE(AppReg.APP_RELAN_NAME);
                    this.close();
                    break;
                case this.avtar:
                 this.clickBackEvent()
                   __OPEN_PRE_MOUDLE(AppReg.APP_HEAD);
                break;
                // case this.bgimage:
                //     this.clickBackEvent()
                //     break;

                case this.tabButton1:
                    this.currentCom.visible = false;
                    this.currentCom = this.infoType1;
                    this.currentCom.visible = true;
                    this.currentCom.setData(this.roleVO,this.playVO);
                    break;
                case this.tabButton2:
                    this.tabButton1.selected = true;
                    this.tabButton2.selected = false;
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"));
//                    this.currentCom.visible = false;
//                    this.currentCom = this.infoType2;
//                    this.currentCom.visible = true;
//                    this.currentCom.setData(this.roleVO);
                    break;
                case this.backButton:
                        this.close();
                    break;
                case this.infoType1.btnRecord2:
                case this.recordButton:
                        // if(record.getProxy().isOpen)
                        // {
                            // this.clickBackEvent()
                            __OPEN_PRE_MOUDLE(AppReg.APP_PLAY_RECORD,null,[AppReg.APP_MY_INFO])
                        // }else{
                        //     tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))
                        // }
                    break;

                case this.infoType1.btnRecord:
                case this.dataButton2:
                case this.dataButton:
                    //  tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("FUNCTION_NO_TIPS"))
                    // this.clickBackEvent()
                    __OPEN_PRE_MOUDLE(AppReg.APP_RECORD, null, [AppReg.APP_MY_INFO])
                    break;
            }
        }

        public agShowEvent():void {
            this.currentCom.showEvent()
        }

        private clickBackEvent():void {
            this.close();
        }

        private btnCancellHandler(event:egret.TouchEvent):void {

        }

        public dispose():void {
            app.mvc.AppFacade.getInstance().removeMediator(MyInfoUIMoudMediator.NAME)
            super.dispose();
        }
    }
}
