module smallGame {
    /*** 
* @author 
*
*/
    export class GameTurnUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        btnClose:eui.Image;

        card0:playcards.GameCardItem;
        card1:playcards.GameCardItem;
        card2:playcards.GameCardItem;
        card3:playcards.GameCardItem;
        card4:playcards.GameCardItem;

        cardArr:playcards.GameCardItem[] =[];

        okBtn:eui.Button;

        ovenArr:any[] =[];

        numTxt:eui.Label;
        consume:number = 100;

        clickNum:number =0
        firstData: number[] = [];

        winImag:eui.Image;
        winGroup:eui.Group;

        successGroup:eui.Group;
        cuccTxt:eui.Label;
        info:playcards.CardsResult


        plGroup:eui.Group;
        btnHllp:eui.Image;
        spImag:eui.Image;

        clikcBool:boolean = true;

        plArr:number[] =[0,2,3,4,5,6,7,8,20,50];
        plNum:number =0;

        //钱钱钱 
        monyNum:number = 0;
        LOC_KEY:string = "SmallGameCoin"+AppReg.GAME_FIRST;

        public constructor() {
            super();
             this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "resource/app_skin/smallGame/GameTurnUIMoudleSkin.exml";
        }
        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            // this.card0.setBackId(3)
            //  this.card0.turnOver()
            this.bindButton(this.okBtn,false);
            this.cardArr.push(this.card0)
             this.cardArr.push(this.card1)
              this.cardArr.push(this.card2)
               this.cardArr.push(this.card3)
                this.cardArr.push(this.card4)
            this.bindButton(this.card0,false);
            this.bindButton(this.card1,false);
            this.bindButton(this.card2,false);
            this.bindButton(this.card3,false);
            this.bindButton(this.card4,false);
            this.bindButton(this.btnClose)
            this.bindButton(this.btnHllp)

            this.bindButton(this.successGroup,false);
             this.bindButton(this.plGroup,false);
            

            this.monyNum = smallGame.getCoin()// = 1000;
            if(!this.monyNum)
            {
                this.monyNum=0;
            }
            this.initialEvent()
        }
        public opening(): void
        {
//             this.toggle1.selected =setting.getProxy().getShock()?true:false ;
        }
        
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            if(this.clikcBool)
            {
                switch(clickTarget)
                {
                    case this.okBtn:
                     this.firstEvent();
                    break;
                    case this.btnClose:
                     this.close();
                    break;
                    case this.successGroup:
                    this.initialEvent();
                    break;

                    case this.btnHllp:
                     this.plGroup.visible =true;;
                    break;

                    case this.plGroup:
                     this.plGroup.visible =false;;
                    break;

                    default:
                    this.cilckEvent(clickTarget);
                    break;
                }
            }
            
                
        }
        private initialEvent():void
        {
            this.spImag.visible =false;
            this.plNum =0;
             this.clikcBool =true;
            this.successGroup.visible =false;
             this.okBtn.touchEnabled =true;
            this.clearTimeout();
             this.showNumEvent();
            this.clickNum =0;
            this.winGroup.visible =false;
             this.firstData = playcards.getProxy().m_cbCardData.concat();
             this.card0.hideLight();
             this.card1.hideLight();
              this.card2.hideLight();
               this.card3.hideLight();
                this.card4.hideLight();

        }
         ovenTimeOut:number = -1;
        clearTimeout():void {
            if(this.ovenTimeOut!=-1) {
                egret.clearTimeout(this.ovenTimeOut)
                this.ovenTimeOut = -1;
            }
        }
        private firstEvent():void
        {
            var okArr:any[] =[];
            if(this.clickNum==0)
            {
                this.ovenArr = playcards.getProxy().getRoamdCards(5);
                 var len = this.cardArr.length
                this.card0.setBackId( this.ovenArr[0])
                this.card0.turnOver()
                this.card1.setBackId( this.ovenArr[1])
                this.card1.turnOver()
                this.card2.setBackId( this.ovenArr[2])
                this.card2.turnOver()
                this.card3.setBackId( this.ovenArr[3])
                this.card3.turnOver()
                this.card4.setBackId( this.ovenArr[4])
                this.card4.turnOver()
                this.monyNum-=this.consume;
                this.showNumEvent();
            }else{
                var newArr = playcards.getProxy().getRoamdCards(this.clickNum);
                var len = this.cardArr.length
                for(var i:number = 0; i != len; i++) 
                {
                    var item = this.cardArr[i] as playcards.GameCardItem;
                    if(item&&item.cardid==null)
                    {
                         this.ovenArr[i] = newArr[0]
                         item.setBackId(newArr[0])
                         item.turnOver()
                         newArr.splice(0,1)
                    }
                }
            }
            this.info = playcards.getProxy().getCardResult( this.ovenArr)
            if(this.info.type)
            {
                 this.winGroup.visible =true;
                  this.winImag.source ="img_word_poker_win_"+Number(this.info.type+1)+"_png";
                  this.plNum = this.plArr[this.info.type]*this.consume;
                  this.monyNum+= this.plNum;
                  this.okBtn.touchEnabled =false;
                  this.clearTimeout();
                  this.clikcBool =false;
                  this.playTxtEvent(false);
                 this.ovenTimeOut = egret.setTimeout(this.successEvent,this,2000);
            }else{
                if(this.clickNum==0)
                {
                     this.clearTimeout();
                     this.ovenTimeOut = egret.setTimeout(this.playTxtEvent,this,500);
                }else{
                      this.okBtn.touchEnabled =false;
                      this.clikcBool =false
                      this.clearTimeout();
                      this.spImag.visible =true;
                     this.playTxtEvent(false);
                     this.ovenTimeOut = egret.setTimeout(this.ovenOutEvent,this,2000);
                }
            }
        }
       successEvent():void
        {
             this.showNumEvent();
            this.cuccTxt.text ="恭喜获得："+this.plNum;
             this.successGroup.visible =true;
             this.clikcBool =true;
        }
        ovenOutEvent():void
        {
            this.initialEvent()
        }
        playTxtEvent(bool:boolean=true):void
        {
            for(var i:number = 0; i != 5; i++) 
            {
                var item = this.cardArr[i] as playcards.GameCardItem;
                if(item)
                {
                     item.txtLabel.visible =bool;
                }
            }
        }
        private cilckEvent(item:any):void
        {
            // this.tableMesslab.visible =false;
            var clickItem = item as playcards.GameCardItem;
            if(clickItem.cardid)
            {
                clickItem.txtLabel.visible =false;
                clickItem.hideLight()
                this.clickNum++
             }
        }
        showNumEvent():void
        {
            this.numTxt.text = this.monyNum.toString();
            smallGame.setCoin(this.monyNum);
        }

        private clickBackEvent(): void {
            this.close();
        }
        public dispose():void {
            this.clearTimeout();
            super.dispose();
        }
    }

}
