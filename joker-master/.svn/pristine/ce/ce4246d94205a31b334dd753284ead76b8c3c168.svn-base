module bank {
    
    /**
 *
 * @author 
 *
 */
    export class BankUIMoudle extends app.base.BaseSceneUIMoudleComponent {

        viewStack: eui.ViewStack;
        tarbar: uicomps.ButtonGroup;
        
        tabButton1: eui.ToggleButton;
        tabButton2: eui.ToggleButton;
        
        //comper1:BankComp1;
       // comper2:BankComp2;
        
        trankComp1:BankTransferComp;
        trankComp2: BankTransferComp;
        current:any;
        
        private selected:number = 0;
        
        // 20分钟过期
        private sessionTiem :number = 15*60*1000;
        
        quickAccount: bank.BankHttpAccount;
        public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "resource/app_skin/bank/BankUIMoudleSkin.exml";
        }
        createComplete(event: egret.Event): void {
            super.createComplete(event);

            app.mvc.AppFacade.getInstance().registerMediator(new BankUIMoudMediator(this));
            
            this.tarbar = new uicomps.ButtonGroup();
            this.tarbar.add(this.tabButton1);
            this.tarbar.add(this.tabButton2);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;
            this.tarbar.select(this.tabButton1);
            this.viewStack.selectedIndex = 0;
            
            this.trankComp1.compType =1;
            this.trankComp2.compType = 2;
            
            if(this.quickAccount == null) {
                this.quickAccount = new bank.BankHttpAccount();
            }
            if(user.getProxy().roomState == user.ROOM_STATE.IN)
            {
                user.getProxy().leaveRoom();
            }
            this.getSessionEvent();
            this.showEvent();
            // user.gotoRoom(room.getProxy().room4[0]);
            //
        }

        getSessionEvent():void {
            var bool:boolean = true;
            if(user.getProxy().sessionTime) {
                var now = user.getProxy().sessionTime + this.sessionTiem;
                if(app.SystemTimer.sysTime < now) {
                   bool = false;
                }
            }
            
            if(user.getProxy().svrTmpSession == null || user.getProxy().svrTmpSession == "" || bool || user.getProxy().httpToKen==null) {
                this.sendNotification(app.NetAction.TOOL_TEMP_SESSION); 
            }
            else {
                this.quickAccount.gameListEvent() 
                this.quickAccount.gameMoneyEvent(28)
            }
        }

        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.tabButton1:
                    this.viewStack.selectedIndex = 0;
                    this.selected =0;
                    this.trankComp1.upEvent();
                    this.showEvent();
                    break;
                case this.tabButton2:
                    this.viewStack.selectedIndex = 1;
                    this.selected = 1;
                    this.trankComp2.upEvent();
                    this.showEvent();
                    break;
                    
            }

        }
        
        okSetEvent():void {
            if(user.getProxy().svrTmpSession)
            {
                if(this.quickAccount == null) {
                    this.quickAccount = new bank.BankHttpAccount();
                }
                this.quickAccount.toKenEvent() 
            } else {
                
            }
        }


        close():void {
            super.close();
            //进入房间
            if(user.getProxy().currentRoom == null) {
                // console.log("gameId:" + $GAME_ID$);
                guichu.loginLogiC().autoJoinRoom();
            }
        }

        showEvent():void {
            this.trankComp1.upEvent();
            this.trankComp2.upEvent();
//            this.current["text1"].text = user.getProxy().svrGameData.bankSilver;
//            this.current["text2"].text = user.getProxy().svrGameData.silver;
        }
        
        public dispose(): void {
            app.mvc.AppFacade.getInstance().removeMediator(BankUIMoudMediator.NAME);
            if(this.trankComp1)
            {
                    this.trankComp1.dispose();
            }
           if(this.trankComp2)
           {
                this.trankComp2.dispose();
           }
           if(this.quickAccount)
            {
                 this.quickAccount.dispose() 
            }

            if(this.tarbar)
            {
                this.tarbar.dispose();
                this.tarbar =null;
            }
            super.dispose();
        }
    }
    
}

