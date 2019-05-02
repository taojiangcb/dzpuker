module happy{
    /**
  *上庄列表
  * @author 
  *
  */
    export class HappyUpperUIMoudle extends app.base.BaseWndUIMoudleComponent {
        
        btnColse:eui.Image;

        nameTxt:eui.Label;
        /****上庄列表 */
        lisTxt:eui.Label;

        /**上庄按钮 */        
        szBtn:eui.Group;
        /**上庄文字 */        
        szlab:eui.Image;


        fristList:eui.List;
        collection: eui.ArrayCollection;
        /**我是否已经上庄 */
         hasMy: boolean;
        txtNum:eui.Label;
        public constructor() {
            super();
            this.skinName = "HappyUpperUIMoudleSkin";
        }
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.btnColse);
            this.bindButton(this.szBtn);
            this.fristList.itemRenderer = HappyUpperItemComp;
        }
        public opening(): void {
            this.showEvent();
        }
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget)
                {
                case this.btnColse:
                    this.clickBackEvent();
                    break;
                 case this.szBtn://上庄
                    this.clickBackEvent();
                    var vo = getTableVO();
                    if (vo != null) {
                         if (this.hasMy) {//下庄                     
                             if (vo.gameStatus == 1 && getProxy().mySeatvo.showPos == 1) {
                                tip.Alert.show("牌局尚未结束，点击确定，将在牌局结束后退出庄家", "", tip.CONFIRM, this.outbakfun, null, this)
                                //  tip.popSysCenterTip("正在下注，您不能下庄....",tip.TIPS_TYPE.TIPS_WARNING);
                             } else {
                                 __PVO().to(app.NetAction.GLXY_REQ_CHANGE_BANKER);
                                 tip.popSysCenterTip("离开上庄列表");
                            }  
                        } else {//上庄       
                             if (getProxy().addBank())
                                   tip.popSysCenterTip("排队等待上庄");
                        }
                    }
                    break;
                }
                
        }
        private outbakfun(type: number = tip.YES): void {
            if (type == tip.YES) {
                if (getTableVO().gameStatus == 1)
                    getProxy().outState = 2;
                else __PVO().to(app.NetAction.GLXY_REQ_CHANGE_BANKER);
            }
        }
        private clickBackEvent(): void {
            this.close();
        }
        
        public showEvent(): void {
             if(this.collection == null) {
                 this.collection = new eui.ArrayCollection();
            }
             var nosetArr = [];
            if(happy.getProxy().tableVO&&happy.getProxy().tableVO.allPlayerVO)
            {
                var allPlayerVO = happy.getProxy().tableVO.allPlayerVO;
                var bankWaiter = getProxy().bankWaiter;
                var myset = getProxy().mySeatvo.seatId;
                this.hasMy = false;
                for (var i: number = 0; i < bankWaiter.length; i++){
                    var vo = allPlayerVO[bankWaiter[i]];
                    if (vo != null) {
                        nosetArr.push(vo);
                        if (vo.seatId == myset) this.hasMy = true;
                    }
                }               
             }
            if (this.hasMy) this.szlab.source = "img_word_happy_xz_png";
            else this.szlab.source = "img_word_happy_sz2_png";
            this.collection.source =nosetArr;
            this.fristList.dataProvider = this.collection;
            this.lisTxt.text = "上庄列表（"+nosetArr.length+"）";
        }
        public dispose(): void {
            super.dispose();
        }
    }
 
}
