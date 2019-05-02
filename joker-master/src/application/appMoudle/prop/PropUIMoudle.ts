module item {
    /**
  *道具界面相关
  * @author 
  *
  */
    export class PropUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        
        btnColse:eui.Image;
        bgimage: eui.Rect;
        nameTxt:eui.Label;

        fristList:eui.List;
        collection: eui.ArrayCollection;
        notTxt:eui.Label;

        public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "PropUIMoudleSkin";
        }

        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.bgimage);
            this.bindButton(this.btnColse);
            app.mvc.AppFacade.getInstance().registerMediator(new PropUIMoudleMediator(this));
            item.getProxy().getItemDate();
            this.fristList.itemRenderer = PropInfoItem;
        }

        public opening(): void {
            this.showEvent();
        }

        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                    case this.bgimage:
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

            if(item.getProxy().allPropDatas.length) {
                this.notTxt.visible =false;
            } 
            else {
                this.notTxt.visible =true;
            }
            this.collection.source = item.getProxy().allPropDatas;
            this.fristList.dataProvider = this.collection;
        }
       
        public dispose(): void {
            app.mvc.AppFacade.getInstance().removeMediator(PropUIMoudleMediator.NAME)
            super.dispose();
        }
    }
 
}
