module bank {
    /**
 *普通场
 * @author 
 *
 */
    export class BankTransferComp extends gameabc.UICustomComponent {
        //text1: eui.Label;
        //text2: eui.Label;
        
        private infoComp1:eui.Component;
        private infoComp2: eui.Component;
        
        
        //钱数按钮
        private btn1: eui.Button;
        private btn2: eui.Button;
        private btn3: eui.Button;
        private btn4: eui.Button;
        private numTxt: eui.EditableText;

        //处理钱数
       private numAll: number = 0;
        private addNum: number = 0;
       private firstBtnNum: number = 0;

        
        private btnCZ: eui.Image;
       private btnOK1: eui.Button;
        private btnOK2: eui.Button;
        private btnClear: eui.Button;
        
        
        //箭头
        private tmTween: egret.Tween;
        private tmTween1: egret.Tween;
        private jtImage: eui.Image;
        private jtImage1: eui.Image;
        private jtId: number
        
        /** 1是取款 2是存款 */
        public compType:number =1;

        private choice: eui.UIComponent;
        
        private minsilver: number = 5000;//钱庄最小保留5000;
      //  dropComp:alien.DropDown

        public constructor() {
            super();
            this.skinName = "BankTransferCompSkin"
        }
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.btn1);
            this.bindButton(this.btn2);
            this.bindButton(this.btn3);
            this.bindButton(this.btn4);
            this.bindButton(this.btnOK1);
            this.bindButton(this.btnOK2);
            this.bindButton(this.btnClear);
            this.bindButton(this.infoComp1,false)
            this.bindButton(this.btnCZ);
            this.upEvent();

            this.starEvent();
            this.jtId = egret.setTimeout(this.starEvent1,this,500);
            
            this.numTxt.multiline =false
            this.numTxt.prompt = "请输入金额"
             this.numTxt.text ="";
            this.choice["fristList"].addEventListener(egret.Event.CHANGE,this.itemclick,this);
           // this.dropComp.items =["wwww","bbbb","ccccc"]

        }
        private itemclick(): void{
            var obj = this.choice["fristList"].selectedItem;
            this.choice.visible =false;
            if(this.uiModule.quickAccount)
            {
                this.uiModule.quickAccount.currentGame = obj;
                this.uiModule.quickAccount.gameMoneyEvent(this.uiModule.quickAccount.currentGame[0]);
               // this.upEvent();
            }

        }
        private starEvent(): void {
            this.jtImage.x = 273;
            this.jtImage.alpha = 1;

             if(this.tmTween)
             {
                  egret.Tween.removeTweens(this.jtImage);
                  this.tmTween =null;
             }
             this.tmTween = egret.Tween.get(this.jtImage).to({alpha:0,x:330 },1000).call(this.openTweenComple,this)
        }
        private openTweenComple(): void {
            this.starEvent();
        }

        private starEvent1(): void {
            this.jtImage1.x = 273;
            this.jtImage1.alpha = 1;
             if(this.tmTween1)
             {
                  egret.Tween.removeTweens(this.jtImage1);
                  this.tmTween1 =null;
             }
             this.tmTween1 = egret.Tween.get(this.jtImage1).to({alpha:0,x:330 },1000).call(this.openTweenComple1,this)
        }

        private openTweenComple1(): void {
            this.starEvent1()
        }
        private gameArrColl:eui.ArrayCollection;
        public upEvent(): void {
            this.numAll =0;
            this.choice.visible =false;
            if(this.compType == 1) {
                this.bindButton(this.choice,false)
                this.btnOK1.visible = true;
                this.btnOK2.visible = false;
                this.infoComp1["btnDowd"].visible =true;

                 var gameType:number =28

                if(this.uiModule.quickAccount&&this.uiModule.quickAccount.allGameArr) {
                    this.choice["fristList"].itemRenderer = BankChoiceItem;
                    if(this.gameArrColl==null) {
                        this.gameArrColl = new eui.ArrayCollection();  
                    }

                    this.gameArrColl.source = this.uiModule.quickAccount.allGameArr;
                    this.choice["fristList"].dataProvider =  this.gameArrColl;
                    gameType = this.uiModule.quickAccount.currentGame[0]
                }

                this.infoComp1["iconType"].source = "icon_bank_game_"+gameType+"_png";
                this.infoComp1["iconTxt"].source = "img_bank_game_"+gameType+"_png";

                this.infoComp2["iconType"].source = "icon_bank_game_" + AppConst.GAME_ID + "_png";
                this.infoComp2["iconTxt"].source = "img_bank_game_" + AppConst.GAME_ID + "_png";

                if(user.getProxy().svrGameData) {
                    if(gameType == 28) {
                        this.infoComp1["text1"].text = "" + user.getProxy().bankSilver;
                    } else {
                        this.infoComp1["text1"].text = "" + this.uiModule.quickAccount.currentMony;
                    }
                    this.infoComp2["text1"].text = "" + user.getProxy().svrGameData.silver;
                }
                
            } else {
                this.infoComp1["btnDowd"].visible =false;
                this.btnOK2.visible = true;
                this.btnOK1.visible = false;
                this.infoComp2["iconType"].source   = "icon_bank_game_28_png";
                this.infoComp2["iconTxt"].source = "img_bank_game_28_png";
                this.infoComp1["iconType"].source = "icon_bank_game_417_png";
                this.infoComp1["iconTxt"].source = "img_bank_game_417_png";
                if(user.getProxy().svrGameData)
                {
                    this.infoComp1["text1"].text = "" + user.getProxy().svrGameData.silver;
                    this.infoComp2["text1"].text = "" + user.getProxy().bankSilver;
                }
                //this.infoComp1["txtMony"].text = "彩豆"//gameabc.ResourceBundleUtil.getMessage("GAME_MONEY_NAME_1")
               // this.infoComp2["txtMony"].text = "银子"//gameabc.ResourceBundleUtil.getMessage("GAME_MONEY_NAME_2")

            }
        }

        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            this.addNum = 0;
            var btnNum: number = 0;
            switch(clickTarget) {
                 case this.btnCZ:
                 __CLOSE_MOUDLE(AppReg.APP_BANK);
                 user.getProxy().openShop();
                    break;
                case this.btn1:
                    this.addNum += 100000;
                    btnNum = 1;
                    break;
                case this.btn2:
                    this.addNum += 500000;
                    btnNum = 2
                    break;
                case this.btn3:
                    this.addNum += 1000000;
                    btnNum = 2;
                    break;
                case this.btn4:
                    this.addNum += 10000000;
                    btnNum = 4;
                    break;

                case this.btnOK1:
                case this.btnOK2:
                    this.numAll = Number(this.numTxt.text);
                    this.okBtnHandler();
                    break;

                case this.btnClear:
                    this.numAll = 0
                    this.numTxt.text = this.numAll.toString()
                    break;
                case this.infoComp1:
                    if(this.compType == 2) {
                        this.choice.visible =false;    
                    } else {
                        this.choice.visible =true;
                    }
                break;
                case this.choice:
                    this.choice.visible =false;
                break;


            }
            if(this.addNum) {
                this.firstBtnNum = btnNum;
                this.numAll += this.addNum
                if(this.compType==1)
                {
                    var nowMoney: number = Number(this.infoComp1["text1"].text);
                    if(user.getProxy().svrGameData && nowMoney < (this.numAll)) {
                        this.numAll = nowMoney;
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("BANK_INSUFFICIENT",this.uiModule.quickAccount.currentGame[1]));
                    } 
                }else{
                    if(user.getProxy().svrGameData && (user.getProxy().svrGameData.silver-this.minsilver) < (this.numAll)) {
                        this.numAll = Math.max(0, user.getProxy().svrGameData.silver - this.minsilver);
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("BANK_GAME_INSUFFICIENT"));
                    } 
                }
                this.numTxt.text = this.numAll.toString();
            }
        }
        okBtnHandler():void
        {
            if(this.compType == 1) {
                if(this.numAll == 0) {
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("BANK_INSUFF_NO_YL"),tip.TIPS_TYPE.TIPS_WARNING)
                    return;
                }
                var mony 
                if (this.uiModule.quickAccount) {
                    if(this.uiModule.quickAccount.currentGame[0]==28)
                    {
                        mony =  user.getProxy().bankSilver;
                    }else{
                        mony =  this.uiModule.quickAccount.currentMony;
                    }
                     if(user.getProxy().svrGameData && mony >= (this.numAll)) {
                        this.toHttpEvent();
                    } else {
                        tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("BANK_INSUFFICIENT",this.uiModule.quickAccount.currentGame[1]),tip.TIPS_TYPE.TIPS_WARNING)
                    }
                }
               
            }else{
                if(user.getProxy().svrGameData && (user.getProxy().svrGameData.silver-this.minsilver) >= (this.numAll)) {
                    this.toHttpEvent();
                } else {
                    tip.popSysCenterTip(gameabc.ResourceBundleUtil.getMessage("BANK_GAME_INSUFFICIENT"),tip.TIPS_TYPE.TIPS_WARNING)
                }
            }
        }
        toHttpEvent(): void {
            if(this.uiModule) {
                if(this.uiModule.quickAccount) {
                    if(this.compType == 1) {
                        var gameID = this.uiModule.quickAccount.currentGame[0]
                        if(gameID==28)//是钱庄用钱庄接口 
                        {
                             this.uiModule.quickAccount.takeAccount(this.numAll);
                        }else{
                            this.uiModule.quickAccount.gameToGameAccount(this.numAll,gameID);
                        }
                        
                    }else{
                        this.uiModule.quickAccount.saveCode(this.numAll);
                    }
                } else {
                    tip.popSysCenterTip("重新再试！",tip.TIPS_TYPE.TIPS_WARNING)
                }
            }
        }
        get uiModule(): bank.BankUIMoudle {
            return <bank.BankUIMoudle>__GET_MOUDLE_COMP(AppReg.APP_BANK);
        }
        public dispose(): void {
            if(this.jtId > 0) {
                egret.clearTimeout(this.jtId)
            }
             if(this.tmTween)
             {
                  egret.Tween.removeTweens(this.jtImage);
                  this.tmTween =null;
             }

              if(this.tmTween1)
             {
                  egret.Tween.removeTweens(this.jtImage1);
                  this.tmTween1 =null;
             }
           
            if(this.choice["fristList"])
            {
                 this.choice["fristList"].removeEventListener(egret.Event.CHANGE,this.itemclick,this);
            }
            this.choice =null;
            this.gameArrColl =null;
            this.unbindButton(this.btn1);
            this.unbindButton(this.btn2);
            this.unbindButton(this.btn3);
            this.unbindButton(this.btn4);
            this.unbindButton(this.btnOK1);
            this.unbindButton(this.btnOK2);
            this.unbindButton(this.btnClear);
            this.unbindButton(this.infoComp1,false)
            this.infoComp1 =null;
            this.infoComp2=null;
            super.dispose();
        }
    }
}

