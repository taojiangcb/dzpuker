module happy{
    /**
  *胜负统计
  * @author 
  *
  */
    export class HappyStatUIMoudle extends app.base.BaseWndUIMoudleComponent {
        
        btnColse:eui.Image;
         public bgimage: eui.Rect;

        private tabButton1: eui.ToggleButton;
        private tabButton2: eui.ToggleButton;

         private tarbar: uicomps.ButtonGroup;
        private currentTab: number;

        private viewStackUI: eui.ViewStack;


        fristList:eui.List;
        collection: eui.ArrayCollection;
        
        public constructor() {
            super();
             this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "HappyStatUIMoudleSkin";
        }
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.bgimage);
            this.registerMediator(HappyStatUIMediator);

             this.fristList.itemRenderer = HappyStatItem;

            this.tarbar = new uicomps.ButtonGroup();
            this.tarbar.add(this.tabButton1);
            this.tarbar.add(this.tabButton2);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;
            this.tarbar.select(this.tabButton1);
        }
        public opening(): void {

             __PVO().to(app.NetAction.GLXY_REQ_WIN_HISTORY);
               this.showEvent();
        }
         public showEvent(arr:number[]=null): void {
             if(arr)
             {
                 var newArr:number[] =[];
                if(this.collection == null) {
                            this.collection = new eui.ArrayCollection();
                    }
                     var len:number = arr.length;
                     var max = -1;
                     if(len>10)
                     {
                         max = len-10;
                     }else{
                         max =0;
                     }
                     while(--len >= 0) {
                         newArr.push(arr[len]);
                     }
                    this.collection.source =newArr;
                    this.fristList.dataProvider = this.collection;
             }
            
        }
         protected touchHandler(event: egret.TouchEvent): void {
            var tag: egret.DisplayObject = event.currentTarget;
            this.touchBindButtonHandler(tag);
         }
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget)
                {
                  case this.bgimage:
                    this.clickBackEvent();
                    break;

                     case this.tabButton1:
                    this.viewStackUI.selectedIndex = 0;
                break;
                case this.tabButton2:
                    this.viewStackUI.selectedIndex = 1;
                    break;
                }
                
        }
        private clickBackEvent(): void {
            this.close();
        }
        
        public dispose(): void {
            app.mvc.AppFacade.getInstance().removeMediator(HappyStatUIMediator.NAME)
            super.dispose();
        }
    }
 
}
