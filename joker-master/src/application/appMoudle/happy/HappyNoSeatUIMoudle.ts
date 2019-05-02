module happy{
    /**
  *无座玩家列表
  * @author 
  *
  */
    export class HappyNoSeatUIMoudle extends app.base.BaseWndUIMoudleComponent {
        
        btnColse:eui.Image;
        nameTxt:eui.Label;

        fristList:eui.List;
        collection: eui.ArrayCollection;

        txtNum:eui.Label;
        public constructor() {
            super();
           
            this.skinName = "HappyNoSeatUIMoudleSkin";
        }
        public createComplete(event: egret.Event): void {
            super.createComplete(event);

            this.bindButton(this.btnColse);

             this.fristList.itemRenderer = HappyNotSeatItem;
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
                    
                }
                
        }
        private clickBackEvent(): void {
            this.close();
        }
        
        public showEvent(): void {
             if(this.collection == null) {
                    this.collection = new eui.ArrayCollection();
            }
            var nosetArr = []
            if(happy.getProxy().tableVO&&happy.getProxy().tableVO.noSeatPlayerVO)
            {
                var playerVO = happy.getProxy().tableVO.noSeatPlayerVO;
                for(var i:number =0;i<playerVO.length;i++)
                {
                    var newIndex = Math.floor(i/3);
                    if(nosetArr[newIndex] == null)
                    {
                        nosetArr[newIndex] = [];
                    }
                    nosetArr[newIndex].push(playerVO[i]);
                }
            }
            this.collection.source =nosetArr;
            this.fristList.dataProvider = this.collection;
            this.txtNum.text = "当前无座玩家共有"+playerVO.length+"人";
        }
       
        public dispose(): void {
            super.dispose();
        }
    }
 
}
