module playcards {
	/**
	 * 桌子上玩家
	 * @author 
	 *
	 */
	export class PlayCardsItemComp  extends  gameabc.UICustomComponent{
    	public static CD_TIME:number = 12000;
        private maingrop: eui.Group;//弃牌时候半透明
        public rankgrop: eui.Group;//sng排名
        public ranklab:eui.BitmapLabel;//sng排名文字
        private rimg: eui.Image;//标签名字
        private headgroup:eui.Group;//头像
        // private headbg: eui.Image;//头像背景
        private headimg:eui.Image;//头像
        public namelab:eui.Label;//玩家名称
        private moneylab: eui.Label;//钱数量
       /* private moneygroup: eui.Group;//钱图标*/
        // private sitdowmlab:eui.Label;//坐下文字
        // private soundimg:eui.Image;//说话图片
        private vipimg:eui.Image;//vip图片
        public card1: CardItem;//牌1图片
        public card2: CardItem;//牌2图片
        public topimg: eui.Image;//头顶图片
        // private cardtypeimg:eui.Image;//牌型
        // private cardtypegrop:eui.Group;
        private cardtypelab:eui.Label;//牌型
        // private cardTypeBg:eui.Image;
        private lightMV:gameabc.MovieClip;//结束胜利
        public playvo: appvos.SeatPlayerVO;
        // public cdLabel: eui.BitmapLabel;
        // private cdContainer:egret.DisplayObjectContainer;
        // private cdBitmap:egret.Bitmap;
        private cdshape: CDShape;//
        private angle: number = 0;
        private winpect: eui.Group;//胜率
        private prelab: eui.BitmapLabel;//胜率文字
        private bgimg: eui.Image;//头像
        private noInimg: eui.Image;//不在等待
        // private r:number;
        public static arllx: number[] = [504,225,105,150,322,685,860,893,794];
        public static arlly: number[] = [492, 468, 340, 168, 85, 85, 170, 335, 468];
        public static arll6x: number[] = [504,225,309,691,897,793];
        public static arll6y: number[] = [492,468,83,83,256,469];
        public static arll5x: number[] = [504,225,309,691,793];
        public static arll5y: number[] = [492, 468, 83, 83, 469];
        public static arll3x: number[] = [504,105,897];
        public static arll3y: number[] = [492, 290, 290];
        
        public static livex: number[] = [115,115,115,-15,-15,-15,-200,-200,-200];
        public static livey: number[] = [100,250,400,400,250,100,-200,-200,-200];
        
        public rankbg: eui.Image;
        public index: number;
        
        public sendMess: MessItem;
        private shakemove: gameabc.ShakeMove;
          /** type 0 自己 1 其他玩家 2 结束翻牌*/
        private cardType: number;
        public CARD_SCALE:number = 0.72;

        public userLabelVO:appvos.UserLabelVO;

		public constructor() {
            super();           
            this.cdshape = new CDShape();
    		this.touchEnabled = false;
		}
		 public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.maingrop.touchEnabled = true;
            this.maingrop.touchChildren = false;
            this.bindButton(this.maingrop);
            this.rimg.visible = false;
        }
        
        /**
         * TODO
         * 汉字最多5个字,超过5个则显示4个汉字+..
         * 英文最多8个字，超过显示6个字母+..
         */ 
        private updateUserName(newName:string):void {
            var textSize:number = 17;
            var textLen:number = 0;
            var textBold:boolean = true;
            var isSelf: boolean = this.isMy(true);
            if (newName) {
                var nameLen: number = newName.length;
                for(var i: number = 0;i < nameLen; i++) {
                    var charASC: number = newName.charCodeAt(i);
                    if (charASC < 128) {
                        textLen++;
                    } else {
                        textLen += 2;
                    }
                    
//                    if(textLen >= 14) {
//                        newName = newName.substring(0, i - 2) + "..";
//                        break;
//                    }
                }
            }
            
//            if(textLen > 12) {
//                textSize = 11;
//                textBold = false;
//            } else 
            if (textLen > 11) {
                textSize = 12;
                textBold = false;
            } else if(textLen > 9) {
                textSize = 12;
                textBold = false;
            } else if(textLen > 8) {
                textSize = 14;
            } else if(textLen > 7) {
                textSize = 15;
            } else if(textLen > 5) {
                textSize = 16;
            }
            
            if(!isSelf) {
                textSize--;
            }
            
            this.namelab.size = textSize;
//            this.namelab.bold = textBold;
            this.namelab.text = newName;
        }
        
		/**
		 * 设置数据
		 * @param vo
		 */
		public setData(vo:appvos.SeatPlayerVO):void{           
            this.playvo = vo;  
          
            this.changeSize(this.isMy(true))
            // this.setChildVisable(this.soundimg,false);
            this.setChildVisable( this.card1,false);
            this.setChildVisable(this.card2,false);
            this.setChildVisable(this.topimg, false, -1, this.maingrop);
            this.showWinPect(false);
            this.hideCardType();
            // this.setChildVisable(this.chatimg,false,-1,this.maingrop);
            this.setChildVisable(this.vipimg, false, -1, this.maingrop);
           
            // this.checkSitLab();
            this.removeCD();
             this.removeLight();
           
            // this.showLabeEvent();
            this.headgroup.touchEnabled = getProxy().playvideovo==null;
            if(vo==null){
                 this.visible = false;              
                // this.setChildVisable(this.namelab,false);               
                // this.setChildVisable(this.moneylab,false); 
                // this.headimg.source="";
            }else{
                
                this.maingrop.alpha = getTableVO().tableStatus==1&&!vo.isPlay ?0.5:1;
                this.visible = true;              
                this.setChildVisable(this.noInimg, this.isMy() && this.maingrop.alpha == 0.5,-1,this);    
                this.setChildVisable(this.namelab,true,-1,this.maingrop);
                this.setChildVisable(this.moneylab,true,-1,this.maingrop); 
                // if(getTableVO().tableStatus==1) 
                this.showOpenCard();
                // 中途进入游戏
                // 如果其他玩家没有弃牌.则显示牌背
                if(!this.isMy() && getTableVO().tableStatus == 1&&vo.isPlay) {
                    if(vo.isFold) {
                        this.setChildVisable(this.card1,false);
                        this.setChildVisable(this.card2,false);
                        this.maingrop.alpha = 0.5;
                    } else {
                        if (!getProxy().isLive) {
                             this.setChildVisable(this.card1,true);
                             this.setChildVisable(this.card2,true);
                        }
                        this.card1.hideLight();
                        this.card2.hideLight();
                    } 
                }
                this.setRank();
                this.showHead();
                if(vo.isFold){
                    this.setTopImage("img_word_play_qipai_png");
                } else if(vo.isAllIn){
                    this.setTopImage("img_word_play_allin1_png");
                } else {
                    this.updateUserName(vo.name);
                }
               
            }
        }
        /***更新排名信息 */
        public setRank(): void{
            var vo = this.playvo;
            if (vo != null && room.getProxy().currentType == room.TYPE.SNG && vo.nowBet < 0) {
                this.setChildVisable(this.rankgrop, true, 1);
                this.rankgrop.visible = true;
                if (this.isMy(true)) {
                   this.rankbg.scaleX = this.rankbg.scaleY = 1.2;
                }else {
                    this.rankbg.scaleX = this.rankbg.scaleY = 1;
                }
                this.ranklab.text = (-vo.nowBet)+"";// getProxy().getRank(vo.nowBet, vo.seatId)+"";
            } else {     
                this.setChildVisable(this.rankgrop, false);
            }
        }
        public showHead():void
		{
            this.headimg.source = user.getProxy().getHeadStr(Number(this.playvo.avatarID));
		}
		
		/**
         * 显示标签
         */
		public showLabeEvent(vo:appvos.UserLabelVO):void
		{
            this.userLabelVO = vo;
            var str:string = '';
            if(vo && vo.id > 0){
                if(vo.labelName){
                    str = "img_tip_small_green_png"
                }else if(vo.labelType == 1){
                    str = "img_tip_small_blue_png"
                }else if(vo.labelType == 2){
                    str = "img_tip_small_red_png"
                }else if(vo.labelType == 3){
                    str = "img_tip_small_gray_png"
                }else if(vo.labelType == 4){
                    str = "img_tip_small_yellow_png"
                }
                if(str){
                    this.rimg.source = str;
                    this.rimg.visible = true;
                }else{
                    this.rimg.visible = false;
                }
            }else{
                this.rimg.visible = false;
            }
            if(vo && vo.userId == user.getProxy().svrRoleId){
                this.rimg.visible = false;
            }
    		// var str:string =""
            // if(this.playvo){
            //     if(this.playvo.rlabel && this.playvo.rlabel != "") {
            //         str = "icon_play_bg_type10_png";
            //     } else if(this.playvo.rcheck != null) {
            //         str = "icon_play_bg_type" + this.playvo.rcheck + "_png";
            //     }
            // }
            // if(str==""){
            //     this.setChildVisable(this.rimg,false,-1,this.maingrop);
            // }else {
            //     this.rimg.source = str;
            //     this.setChildVisable(this.rimg,true,0,this.maingrop);
            // }
           
		}
        // /**
        //  * 是否显示坐下
        //  */
        // public checkSitLab():void{
        //     var b: boolean = this.playvo == null && getProxy().mySeat == -1
        //     this.setChildVisable(this.sitdowmlab,b);
        // }
		private setChildVisable(dis:egret.DisplayObject,visable:boolean,index:number = -1,parent:egret.DisplayObjectContainer = this):void{
            if(dis){
                if(visable) {
                    if(dis.parent == null){
                        if(index == -1) parent.addChild(dis);
                        else parent.addChildAt(dis,index)
                    }          
                } else if(dis.parent != null)
                    dis.parent.removeChild(dis);
            }      
		}
		public changeSize(isMy:boolean):void{         
            if(isMy){
                this.headgroup.scaleX = this.headgroup.scaleY = 1.2;
                this.vipimg.x = 13;
                this.vipimg.y = 21;
                this.topimg.y = -9;
                this.moneylab.y = 111;
                this.namelab.y = -4;
                // this.namelab.width = 100;
                
//                this.headbg.source = "s9_bg_fangxinditu_png";
            }else{
                this.headgroup.scaleX = this.headgroup.scaleY = 1;
                this.vipimg.x = 16;
                this.vipimg.y = 21;
                this.topimg.y = 4;
                this.namelab.y = 9;
                // this.namelab.width = 84;
                this.moneylab.y = 105;
               
//               this.headbg.source = "icon_play_word_bg_png";
            }
            this.resizeCard(this.isMy()?0:1); 
            if (getProxy().isLive) {
                this.cardtypelab.x = 28;
                this.cardtypelab.y = 78;
                if (this.isMy()) {
                     this.bgimg.source = "s9_head_frame_mine_zr_png";
                    this.bgimg.scale9Grid = new egret.Rectangle(18,69,2,10);
                    this.bgimg.x = -11;
                    this.bgimg.y = -11;
                    this.bgimg.width = 106;
                    this.bgimg.height = 145;
                } else {
                     this.bgimg.source = "s9_head_frame_other_zr_png";
                    this.bgimg.scale9Grid = new egret.Rectangle(7,24,1,2);
                    this.bgimg.x = 0;
                    this.bgimg.y = 0;
                    this.bgimg.width = 85;
                    this.bgimg.height = 124;
                }
            } else {
                this.cardtypelab.x = 116;
                this.cardtypelab.y = 112;
                this.bgimg.source = "icon_play_word_bg_png";
                this.bgimg.scale9Grid = new egret.Rectangle(6, 13, 1, 3);
                this.bgimg.x = 0;
                this.bgimg.y = 0;
                this.bgimg.width = 84;
                this.bgimg.height = 122;
            }
            this.cdshape.resize(isMy);
        }
      
        /*重置牌尺寸 type 0 自己 1 其他玩家 2 结束翻牌 */
		public resizeCard(type:number):void{
            egret.Tween.removeTweens(this.card1);
            egret.Tween.removeTweens(this.card2);
            this.cardType = type
            if(type==0){    
               /* this.headbg.visible =*/this.headimg.visible = true;
               if (getProxy().isLive) {
                   this.card1.x = 24;
                     this.card1.y = 27;
                     this.card1.scaleX = 0.62;
                     this.card1.scaleY = 0.62;
                     this.card1.rotation = 0;
                     this.card2.x = 49;
                     this.card2.y = 27;
                     this.card2.scaleX = 0.62;
                     this.card2.scaleY = 0.62;
                     this.card2.rotation = 0;
                      this.winpect.y = 100;
               } else {
                    this.card1.x = 90;
                    this.card1.y = 23;
                    this.card1.scaleX = this.CARD_SCALE;
                    this.card1.scaleY = this.CARD_SCALE;
                    this.card1.rotation = -12;
                    this.card2.x = 140;
                    this.card2.y = 15;
                    this.card2.scaleX = this.CARD_SCALE;
                    this.card2.scaleY = this.CARD_SCALE;
                    this.card2.rotation = 9;
                    
                    this.winpect.y = 104;
                }
            } else if (type == 1) {
                if (getProxy().isLive) {                
                   
                } else {
                    this.card1.x = 90;
                    this.card1.y = 58;
                    this.card1.scaleX = 0.35;
                    this.card1.scaleY = 0.35;
                    this.card1.rotation = 0;
                    this.card2.x = 114;
                    this.card2.y = 58;
                    this.card2.scaleX = 0.35;
                    this.card2.scaleY = 0.35;
                    this.card2.rotation = 24;
                    
                }
               this.winpect.y = 100;
                /* this.headbg.visible =*/ this.headimg.visible = true;
                 
            } else {
                if (this.isMy(true)) {
                    var toscale: number = 0.73;
                    var tox: number = 17;
                    var tox2: number = 47;
                    var toY:number = 14;
                } else {
                    toscale = 0.62;
                    tox = 24;
                    tox2 = 49;
                    toY = 27;
                }
                 
                egret.Tween.get(this.card1).to({ x: tox,y: toY,scaleX:toscale,scaleY:toscale,rotation: 0 },300,egret.Ease.backOut);
                egret.Tween.get(this.card2).to({ x: tox2,y: toY,scaleX: toscale,scaleY: toscale,rotation: 0},300,egret.Ease.backOut).call(this.turnover,this);
//                this.card1.x = 20;
//                this.card1.y = 27;
//                this.card1.scaleX = 0.6;
//                this.card1.scaleY = 0.6;
//                this.card1.skewX = 0;
//                this.card1.skewY = 0;
//                this.card2.x = 47;
//                this.card2.y = 27;
//                this.card2.scaleX = 0.6
//                this.card2.scaleY = 0.6;
//                this.card2.skewX = 0;
//                this.card2.skewY = 0;              
               /* this.headbg.visible =*/ this.headimg.visible = false;
            }
            
        }
        public resetLive(): void{
            if (getProxy().isLive) {
                if (this.playvo && this.playvo.myCard.length > 0) {
                     
                } else {
                    this.setChildVisable(this.card1, false);
                    this.setChildVisable(this.card2, false);
                }   
             } else {
                if (this.playvo &&( this.playvo.myCard.length > 0||(this.playvo.isPlay&&!this.playvo.isFold))){
                    this.setChildVisable(this.card1, true);
                    this.setChildVisable(this.card2, true);
                 }
             }
            this.changeSize(this.isMy(true));
            this.resetxy();
        }
        private  turnover():void{
            this.card1.turnOver();
            this.card2.turnOver();
        }
        /**
         * 重置位置
         * @param px 0不需要移动位子 <0 左边移动 >0右边移动
         */
        public resetxy(px: number = 0): void {  
           var pindex:number
        //    if(getProxy().mySeat == -1) pindex = 0;
        //    else pindex = getProxy().mySeat;       
           var tableSize: number = getTableVO() ? getTableVO().tableSize : 9;
           var arllx: number[];
           var arlly: number[];
           var islive: boolean = getProxy().isLive;
           
           if (islive) {
               arllx = PlayCardsItemComp.livex;
               arlly = PlayCardsItemComp.livey;
            }
           else if(tableSize == 6) {
               arllx = PlayCardsItemComp.arll6x;
               arlly = PlayCardsItemComp.arll6y;
           } else if(tableSize == 5) {
               arllx = PlayCardsItemComp.arll5x;
               arlly = PlayCardsItemComp.arll5y;
           } else if(tableSize == 3) {
               arllx = PlayCardsItemComp.arll3x;
               arlly = PlayCardsItemComp.arll3y;
           }else{
               arllx = PlayCardsItemComp.arllx;
               arlly = PlayCardsItemComp.arlly;
           }
           var pindex:number = getProxy().getPX();
            var index = Number(this.name) - pindex;
            if(index < 0) index += tableSize;//9;  
            if(index == 0)
                getProxy().midSeat = Number(this.name);
            if (islive) {
                index = Number(this.name);               
                if (index >2) {
                    this.x = arllx[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                } else
                    this.x = AppGlobal.stageFullWidth - arllx[index] + (1136 - AppGlobal.stageFullWidth) * 0.5;
                this.y = arlly[index]+(768-AppGlobal.stageFullHeight)*0.5; 
            } else {
                this.x = arllx[index];
                this.y = arlly[index]; 
            }
            this.index = index;
                return;
            // } else if(px < 0){//向左转
            //     pindex = (this.index + 1) % tableSize;//9;
            // } else {//向右转
            //     pindex = (this.index - 1);
            //     if(pindex < 0) pindex += tableSize;//9;
            // } 
            // this.index = index;
            // egret.Tween.removeTweens(this);
            // this.alpha = 1;
            // var tox: number = this.x + (PlayCardsItemComp.arllx[pindex] - this.x) / 2;
            // var toy: number = this.y + (PlayCardsItemComp.arlly[pindex] - this.y) / 2;
            // egret.Tween.get(this).to({ x: tox,y: toy,alpha: -0.5 },300).call(this.callbak,this,[px]);
        }
        // private callbak(px: number):void{
        //     this.alpha = -0.5;
        //     if(px < 0) {//向左转
        //         var pindex = this.index - 1;
        //         if(pindex < 0) pindex += 9;
        //     } else {//向右转
        //         pindex = (this.index + 1)%9;
        //     }
        //     var tox: number = PlayCardsItemComp.arllx[this.index];
        //     var toy: number = PlayCardsItemComp.arlly[this.index];
        //     this.x = tox - (tox - PlayCardsItemComp.arllx[pindex]) / 2;
        //     this.y = toy - (toy - PlayCardsItemComp.arlly[pindex]) / 2;
        //     egret.Tween.get(this).to({ x: tox,y: toy,alpha: 1 },300);
        // }
        /**
         * 是否是我的位置
         */
        public isMy(checkLive:boolean=false): boolean{          
            return getProxy().mySeat.toString() == this.name && (!getProxy().isLive||!checkLive);
        }
        
        public hideCardType():void {
            this.setChildVisable(this.cardtypelab,false);
            // this.setChildVisable(this.cardTypeBg,false);
            this.cardtypelab.text = "";
        }
     
        /**
         * 结束亮牌
         */
        public showOpenCard(isresult:boolean=false): void {
            var vo = this.playvo;
            if(vo){
                if(vo.myCard.length > 1) {
                    this.setChildVisable(this.card1,true);
                    this.setChildVisable(this.card2,true);
                    // this.card1.setCardId(vo.myCard[0]);
                    // this.card2.setCardId(vo.myCard[1]);
                    if(isresult){                          
                        this.hideCardType();
                        this.card1.cardid = vo.myCard[0];
                        this.card2.cardid = vo.myCard[1];
                        this.resizeCard(2);
                    } else {
                        this.card1.setCardId(vo.myCard[0]);
                        this.card2.setCardId(vo.myCard[1]);
                    }
                }
                this.refMoneylab();

                // if(vo.nowBet)
                //     this.moneylab.text = vo.nowBet.toString();
            }       
        }
        /**牌型已提高一成 */
        public changeCardIndex(): void{
            // 暂时不提高层级。如果需要，应该是提高牌的Y轴。
//            this.setChildIndex(this.card1, this.numChildren - 1);
        }
        /** 刷新显示筹码*/
        public refMoneylab():void{
            if (this.playvo && this.playvo.nowBet != null) {
                if (this.playvo.nowBet >= 0)
                    this.moneylab.text = FormatUtils.wan(this.playvo.nowBet);
                else this.moneylab.text = "";
            }
                 
                    
        }
        /**显示胜率 */
        public showWinPect(show:boolean = true): void{
            if (show&&this.playvo && this.playvo.winRate != -1&&!this.playvo.isFold&&this.playvo.myCard.length>0) {
                this.setChildVisable(this.winpect, true, -1, this.maingrop);
                this.winpect.visible = true;
                this.moneylab.visible = false;
                this.prelab.text = Math.floor(this.playvo.winRate*100) + "%";
                var textLen: number = Math.max(0,4 - this.prelab.text.length);
                this.prelab.x = 62 + textLen * 9;
            } else {
                this.setChildVisable(this.winpect, false,-1,this.maingrop);
                this.moneylab.visible = true;
            }
        }
        public showindex: number = 0;
        /**
         * 发牌显示牌面
         */
        public showCard(effect: boolean = true): void {
            if (effect) {
                if (this.showindex == 0) {                 
                    if (this.isMy()) {
                        this.card1.setBackId(this.playvo.myCard[0]);
                        this.card1.turnOver();
                        this.setChildVisable(this.card1, true);
                    } else if(!getProxy().isLive){
                        this.setChildVisable(this.card1, true);
                        this.card1.setCardBack();
                    }
                        
                } else if (this.showindex == 1) {
                   
                    if (this.isMy()) {
                        this.card2.setBackId(this.playvo.myCard[1]);
                        this.card2.turnOver();
                        this.setChildVisable(this.card2, true);
                    } else if (!getProxy().isLive) {
                        this.card2.setCardBack();
                        this.setChildVisable(this.card2, true);
                    }
                }
                this.showindex++;
            } else {
                if (this.isMy()) {
                    var mycard = this.playvo.myCard;
                    this.card1.setCardId(mycard[0]);
                    this.card2.setCardId(mycard[1]);
                    this.setChildVisable(this.card1, true);
                    this.setChildVisable(this.card2, true);
                } else if (!getProxy().isLive){
                    this.card1.setCardBack();
                    this.card2.setCardBack();
                    this.setChildVisable(this.card1, true);
                    this.setChildVisable(this.card2, true);
                }
            }
        }
        /*点击头像*/
         protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            // if(this.playvo==null){
                // if(getProxy().mySeat==-1){//入座
                //     if(getProxy().myJoinPlayerVO.nowBet > 0)//身上有带人钱直接入座
                //      __PVO().i(Number(this.name),0).to(app.NetAction.MATCH_SIT);
                //     else
                    //  __OPEN_MOUDLE(AppReg.APP_PLAY_BUY,this.name,null,null,this.parent.parent);
                // }                  
            // } else
             if (this.playvo != null && getProxy().playvideovo == null) {//弹出信息
                 if (this.playvo.roleId == user.getProxy().svrRoleId)
                     mc2sdk.event(mc2sdk.EVENT_TYPE.PLAYCARD_CLICK_MY_HEAD);
                 var seeInfo: appvos.SeeInfoVO = new appvos.SeeInfoVO
                 seeInfo.roleId = this.playvo.roleId;
                 seeInfo.seatId = this.playvo.seatId;
                 seeInfo.mySeatId = playcards.getProxy().mySeat;;
                 seeInfo.type = -1;
                 seeInfo.avatarID = this.playvo.avatarID;
                 seeInfo.sex = this.playvo.sex;
                 seeInfo.name = this.playvo.name;
                 seeInfo.nowBet = this.playvo.nowBet;
                 seeInfo.totalBet = this.playvo.totalBet;
                 seeInfo.facecost = getTableVO().bbBet;
                 __OPEN_PRE_MOUDLE(AppReg.APP_POKER_INFO, seeInfo, null, null, this.parent.parent.parent["mainview"])
             }
        }
        
        /**
         * 播放动作
         * @param act
         */
         public playAction(act: number, effect: boolean = true):void{
            var proxy = getProxy();
//            this.setChildVisable(this.topimg,true);
//            this.namelab.text = ""   
//            this.setChildVisable(this.namelab,false);
            switch(act){
                case proxy.ACT_CALL://跟注 
                    if (effect) {
                       utils.SoundUtils.playEffectSound(utils.SoundUtils.call);  
                       utils.SoundUtils.playEffectSound(utils.SoundUtils.chip);
                    }
                    this.setTopImage("img_word_play_geng_png");
                    break;
                case proxy.ACT_ALLIN://ALLIN   
                    if(this.playvo!=null)
                        this.playvo.isAllIn = true;
                    this.setTopImage("img_word_play_allin1_png");
                    if (effect) {
                         utils.SoundUtils.playEffectSound(utils.SoundUtils.allin);
                         utils.SoundUtils.playEffectSound(utils.SoundUtils.chip);
                         this.playALLIN();    
                    }
                    this.hideCardType();
                    break;
                case proxy.ACT_BET://下注
                    if (effect) {
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.raise);
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.chip);
                    }
                    this.setTopImage("img_word_play_xiazhu_png");                  
                    break;
                case proxy.ACT_CHECK://看牌   
                    if (effect) {
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.check);
                    }         
                    this.setTopImage("img_word_play_guo_png");
                    break;
                case proxy.ACT_RAISE://加注   
                    if (effect) {
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.raise);
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.chip);
                    }     
                    this.setTopImage("img_word_play_jia_png");
                    break;
                case proxy.ACT_FOLD:// 弃牌 
                    if (effect) {
                        utils.SoundUtils.playEffectSound(utils.SoundUtils.fold);
                    }         
                    this.setTopImage("img_word_play_qipai_png");
                    if (this.playvo != null) {
                        this.playvo.isFold = true;
                        if(!this.isMy()){
                            this.playvo.myCard = [];
                            this.qipai();                      
                        } else {
                             if (getProxy().nextLeave) {
                                getProxy().outbakfun();
                            }
                             var currentRoom = user.getProxy().currentRoom;
                            if ( currentRoom && currentRoom.maxBank != 1200000 &&
                                (currentRoom.type == room.TYPE.BASIC ||
                                currentRoom.type == room.TYPE.NORMAL))
                                //  currentRoom.type == room.TYPE.FAST ||
                                // currentRoom.type == room.TYPE.VIP)) 
                                {
                                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_SHOWCG, true);
                                }
                        }
                    }   
                    this.maingrop.alpha = 0.5;
                    break;
            }
            this.removeCD();
        }
        
        /**
         * 设置头顶图片
         * @param source
         */
        public setTopImage(source:string):void{
            if(source == null || source==""){
                
                this.setChildVisable(this.topimg,false,-1,this.maingrop);
                if (this.playvo) {
                    if(this.playvo.isFold){
                        this.setTopImage("img_word_play_qipai_png");
                    } else
                        this.updateUserName(this.playvo.name);
                }
                else this.namelab.text ="";
            }else{
                this.topimg.source = source;
                this.setChildVisable(this.topimg,true,-1,this.maingrop);
                this.namelab.text = ""; 
            }
        }
        

        public showLight():void{
            if(this.lightMV==null){
                this.lightMV = new gameabc.MovieClip(getProxy().getTextures("light"));   
                // this.lightMV = new eui.Image("icon_play_yphxxg_png");
            }         
            if (this.isMy(true)) {
                this.lightMV.x = -11;
                this.lightMV.y = -38;
                this.lightMV.scaleX = 1;
                this.lightMV.scaleY = 1;
               
                // this.lightMV.x = 0;
                // this.lightMV.y = -23;
                // this.lightMV.scaleY = this.lightMV.scaleX = 1.2;
            } else {
                this.lightMV.x = 4;
                this.lightMV.y = -17;
                this.lightMV.scaleX = 0.8;
                this.lightMV.scaleY = 0.81;
               
                // this.lightMV.x = 12;
                // this.lightMV.y = -6;
                // this.lightMV.scaleY = this.lightMV.scaleX = 1;
            }
            // this.setChildVisable(this.lightMV, true, 0, this.maingrop);
            // this.lighttime = 0;
            //  egret.Ticker.getInstance().register(this.lightadvanceTime,this);
        
            var index: number = this.maingrop.getChildIndex(this.headgroup);
            this.setChildVisable(this.lightMV,true,index+1,this.maingrop);
            this.lightMV.play(-1);
            
        }
        
        // private lighttime: number = 0;
        // public lightadvanceTime(time: number) {
        //     this.lighttime += time;
        //     this.lightMV.alpha = (Math.cos(this.lighttime/400)+1)/2; 
        // }
        /**是否显示光效 是赢方 */
        public isShowLight(): boolean{          
            return this.lightMV != null && this.lightMV.parent != null;
        }
        private removeLight(): void{
            //  egret.Ticker.getInstance().unregister(this.lightadvanceTime,this);
             this.setChildVisable(this.lightMV,false);
        }
        /** 播放allin*/
        public playALLIN():void{

            var mv = new gameabc.MovieClip(getProxy().getTextures("allin"));           
             mv.x = -48;
             mv.y = this.topimg.y - 10;
            //mv.x = -11;
            //mv.y = this.topimg.y +0.5;
          
            
           this.topimg.visible = false;
           mv.addEventListener(egret.Event.COMPLETE,this.removeALLIN,this)
           this.addChild(mv);
           mv.play(1); 
        }
        private removeALLIN(evt:egret.Event):void{
            evt.target.removeFromParent(true);
             this.topimg.visible = true;
        }
        /**
         * 新的一轮开始重置
         */
        public restturn():void{
            if(this.playvo ){
                this.setTopImage(null);
                this.playvo.turnBet = 0; 
            }
        }
        /**
        * 新的一局开始重置
        */
        public restPlay(): void {
            if(this.playvo) {
                this.setChildVisable(this.topimg,false);               
                this.setChildVisable(this.card1, false);            
                this.setChildVisable(this.card2,false);
                this.refMoneylab();
                this.playvo.result = null;
                this.updateUserName(this.playvo.name);
                this.resizeCard(this.isMy()?0:1);               
            }else  this.namelab.text = "" ;
             this.card1.hideLight();
             this.card2.hideLight();
             this.maingrop.alpha = 1;   
            this.setChildVisable(this.noInimg,false);    
            this.removeLight();
            this.hideCardType();
            this.showWinPect(false);
        }
        
        /**
         * 打牌结束 
         */
        public playover():void{
            if(this.playvo){
                 this.refMoneylab();
                // if(this.playvo.myCard.length > 1){
                //     this.card1.setCardId(this.playvo.myCard[0]);
                //     this.card2.setCardId(this.playvo.myCard[1]);
                //     this.setChildVisable(this.card1,true);
                //     this.setChildVisable(this.card2,true);
                // }else{
                //     this.setChildVisable(this.card1,false);
                //     this.setChildVisable(this.card2,false);           
                // }
                this.playvo.isPlay = false; 
            }
            this.setRank();
        }
        public qipai(): void{
             if(this.playvo){
                this.refMoneylab();
                if(this.playvo.myCard.length > 1){
                    this.card1.setCardId(this.playvo.myCard[0]);
                    this.card2.setCardId(this.playvo.myCard[1]);
                    this.setChildVisable(this.card1,true);
                    this.setChildVisable(this.card2,true);
                }else{
                    this.setChildVisable(this.card1,false);
                    this.setChildVisable(this.card2,false);           
                }
                this.playvo.isPlay = false; 
            }          
        }
        /**
         * 显示牌型
         * @param talbearr
         */
        public showCardType(isImage:boolean = false):void{
            if(this.playvo.myCard.length > 1 && getTableVO().globalCards.length>2){
                 var allcard = getTableVO().globalCards.concat(this.playvo.myCard)               
                  this.playvo.result = getProxy().getCardResult(allcard); 
                if(isImage){
                    this.setTopImage("img_word_win_type_"+ ( this.playvo.result.type + 1) + "_png");
                } else {
                    if (this.cardType == 2) {
                        // this.cardtypelab.text = "";
                        this.hideCardType();
                    } else {
                       
                         this.cardtypelab.text = gameabc.getMessage("CARDTYPE" + ( this.playvo.result.type + 1)); 
                        //  this.setChildVisable(this.cardTypeBg,true,-1,this.maingrop);
                         this.setChildVisable(this.cardtypelab,true,-1,this);
                    }
                }
            }
        }
        /**
         * 播放操作
         *nowtime 当前已进行时间
         */
        public playcd(nowtime:number=0):void{
            this.setChildVisable(this.topimg,true,-1,this.maingrop);
            this.setTopImage("img_word_play_sikaozhong_png");
            if (isNaN(nowtime))
                nowtime = 0;    
            this.drawCDProgress(nowtime);
        }
        
        private drawCDProgress(nowtime:number=0): void {             
             if (this.shakemove == null)
                this.shakemove = new gameabc.ShakeMove();
             this.setChildVisable(this.cdshape, true, -1, this.maingrop);         
            this.angle = nowtime;
            this.advanceTime(0);
            egret.Ticker.getInstance().register(this.advanceTime,this);
        }
        
        public advanceTime(time: number) {
            var oldangle = this.angle;
            this.angle += time ; 
            var cdtime: number = PlayCardsItemComp.CD_TIME;
            var angle = this.angle / cdtime;
            var halfTime: number = cdtime / 2;
            var time14: number = halfTime / 2;
            this.cdshape.draw(angle);
            if (oldangle < halfTime && this.angle >= halfTime) {
                if(this.isMy()&&getProxy().playvideovo==null) {
                    // utils.NativeUtils.shock();//震动
                    setting.getProxy().shock();
                    utils.SoundUtils.playEffectSound(utils.SoundUtils.halftime); 
                    this.shakemove.go(0, 0, cdtime, 2);
                }
            }
            if (this.angle >= halfTime) {
                this.shakemove.advanceTime(time/ 1000);
                this.card1.anchorOffsetX = this.card2.anchorOffsetX = this.shakemove.x;
                if(this.angle >= halfTime+time14)
                     this.card1.anchorOffsetY = this.card2.anchorOffsetY = this.shakemove.y;
            }
            if(this.angle >= cdtime){//超时弃牌
                this.removeCD();
                if(this.isMy()&&getProxy().playvideovo==null) {
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.MATCH_CDOVER);
                }
            }
        }
        isHuntMC: boolean = false;
        huntGunMC: gameabc.MovieClip;
        huntSmokeMC: gameabc.MovieClip;
        huntTimeout: number = -1;
        huntSmokeTimeout: number = -1;
        isHuntedMC: boolean = false;
        huntedAimMC: gameabc.MovieClip;
        huntedBrokeMC: gameabc.MovieClip;
        huntedBrokeTimeout: number = -1;
        huntedTimeout: number = -1;
        showHuntMC() {
            if (this.isHuntMC) return;
            this.isHuntMC = true;
            this.showGunMC();
            this.huntSmokeTimeout = egret.setTimeout(()=>{this.showSmokeMC();}, this, 1000, true);
            this.huntTimeout = egret.setTimeout(()=>{this.stopHuntMC();}, this, 2000, true);
        }
        showGunMC() {
            if (this.huntGunMC == null) {
                var textures: Array<egret.Texture> = getProxy().getTextures("hunt_gun");
                this.huntGunMC = new gameabc.MovieClip(textures, 10);
                this.huntGunMC.x = 5;
                this.huntGunMC.y = -50;
                this.huntGunMC.addEventListener(egret.Event.COMPLETE, (evt: egret.Event)=>{
                    this.huntGunMC.stopAt(0);
                }, this);
                this.addChild(this.huntGunMC);
            } else {
                this.huntGunMC.visible = true;
            }
            this.huntGunMC.delay = 1;
            this.huntGunMC.play(1);
        }
        showSmokeMC() {
            this.huntSmokeTimeout = -1;
            if (this.huntSmokeMC == null) {
                var textures: Array<egret.Texture> = getProxy().getTextures("hunt_smoke");
                this.huntSmokeMC = new gameabc.MovieClip(textures, 9);
                this.huntSmokeMC.x = -85;
                this.huntSmokeMC.y = -85;
                this.huntSmokeMC.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
                    this.huntSmokeMC.visible = false;
                }, this);
                this.addChild(this.huntSmokeMC);
            } else {
                this.huntSmokeMC.visible = true;
            }
            this.huntSmokeMC.play(1);
            //     this.checkWait();
        }
        stopHuntMC() {
            if (this.huntTimeout != -1) {
                egret.clearTimeout(this.huntTimeout);
                this.huntTimeout = -1;
            }
            if (this.huntSmokeTimeout != -1) {
                egret.clearTimeout(this.huntSmokeTimeout);
                this.huntSmokeTimeout = -1;
            }
            this.huntGunMC.visible = false;
            this.huntSmokeMC.visible = false;
            this.huntGunMC.stopAt(0);
            this.huntSmokeMC.stopAt(0);
            this.isHuntMC = false;
        }
        showHuntedMC() {
            if (this.isHuntedMC) return;
            this.isHuntedMC = true;
            this.showAimMC();
            this.huntedBrokeTimeout = egret.setTimeout(()=>{this.showBrokeMC();}, this, 1000, true);
            this.huntedTimeout = egret.setTimeout(()=>{this.stopHuntedMC();}, this, 2000, true);
        }
        showAimMC() {
            if (this.huntedAimMC == null) {
                var textures: Array<egret.Texture> = getProxy().getTextures("hunt_aim");
                this.huntedAimMC = new gameabc.MovieClip(textures, 10);
                this.huntedAimMC.x = -5;
                this.huntedAimMC.y = 0;
                this.huntedAimMC.addEventListener(egret.Event.COMPLETE, (evt: egret.Event) => {
                    utils.SoundUtils.playEffectSound(utils.SoundUtils.hunt_gun);
                    this.huntedAimMC.visible = false;
                }, this);
                this.addChild(this.huntedAimMC);
            } else {
                this.huntedAimMC.visible = true;
            }
            this.huntedAimMC.play(1);
        }
        showBrokeMC() {
            this.huntedBrokeTimeout = -1;
            if (this.huntedBrokeMC == null) {
                var textures: Array<egret.Texture> = getProxy().getTextures("hunt_screenbroken");
                this.huntedBrokeMC = new gameabc.MovieClip(textures, 10);
                this.huntedBrokeMC.x = 20;
                this.huntedBrokeMC.y = 20;
                this.addChild(this.huntedBrokeMC);
            } else {
                this.huntedBrokeMC.visible = true;
            }
            this.huntedBrokeMC.play(1);
        }
        stopHuntedMC() {
            if (this.huntedTimeout != -1) {
                egret.clearTimeout(this.huntedTimeout);
                this.huntedTimeout = -1;
            } 
            if (this.huntedBrokeTimeout != -1) {
                egret.clearTimeout(this.huntedBrokeTimeout);
                this.huntedBrokeTimeout = -1;
            }
            this.huntedAimMC.visible = false;
            this.huntedBrokeMC.visible = false;
            this.huntedAimMC.stopAt(0);
            this.huntedBrokeMC.stopAt(0);
            this.isHuntedMC = false;
        }
        cancelMC() {
            if (this.isHuntMC) this.stopHuntMC();
            if (this.isHuntedMC) this.stopHuntedMC();
        }

        public removeCD(): void{
            if (this.shakemove != null) {
                this.shakemove.onComplete();
                this.card1.anchorOffsetX = this.card2.anchorOffsetX = 0;
                this.card1.anchorOffsetY = this.card2.anchorOffsetY = 0;
            }                
           egret.Ticker.getInstance().unregister(this.advanceTime,this);
           this.setChildVisable( this.cdshape, false);
            
       }
	}
}
