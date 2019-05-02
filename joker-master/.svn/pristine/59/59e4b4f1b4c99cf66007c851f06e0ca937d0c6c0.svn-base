module head {
/**
 *签到相关界面
 * @author 
 *
 */
    export class HeadReplaceUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        
        public bgimage: eui.Rect;
        private btnColse: eui.Button;
        private txtName:eui.Label;
        private btnOk:eui.Button;
       // private btnCan: eui.Button;
        
        private noHead:eui.Label;
        
        private listdata: string[] = ["1","2","3","4",""];
        private buyData: string[] = ["","","","","","","","","","",""]
        
        /**当前固定头像**/
        private currList: eui.List;
        
        /**商场购买头像**/
        private buyList: eui.List;
        
        private chandID:number;
        
        private myAvat: uicomps.AvatarImage;
        
        private seleIndex: number = 0;
        private collection: eui.ArrayCollection;
        
        private buyCollection: eui.ArrayCollection;
    	public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "resource/app_skin/head/HeadReplaceUIMoudleSkin.exml";
    	}
    	
      public createComplete(event: egret.Event): void {
          super.createComplete(event);
          
          app.mvc.AppFacade.getInstance().registerMediator(new HeadUIMoudMediator(this));

          this.bindButton(this.bgimage,false);
          this.bindButton(this.btnColse);
          this.bindButton(this.btnOk);
          //this.bindButton(this.btnCan);
         
          this.txtName.text = user.getProxy().svrName;
          
          this.currList.addEventListener(egret.Event.CHANGE,this.currItemclick,this);
          this.buyList.addEventListener(egret.Event.CHANGE,this.buyItemclick,this);
          this.chandID = user.getProxy().svrHeadId
              
          this.showAvat()
        }
      private currItemclick(): void {
          this.chandID =this.currList.selectedItem
          this.selectedChange()
          this.showAvat()
      }
      private selectedChange(id:number=-1):void
      {
          for(var i = 0;i < this.currList.dataProvider.length;i++) {
              var item = <head.HeadListItem>this.currList.getElementAt(i);
              if(item.data&&Number(item.data) == id)
              {
                  item.selected =true; 
              }
              item.selectedChange();
          }
      }
      private showAvat():void
      {
          this.myAvat.chroose(true)
          this.myAvat.source = user.getProxy().getHeadStr(this.chandID);
      }
      private buyItemclick(): void {
          this.chandID =this.buyList.selectedItem
      }
      public opening(): void {
          this.showEvent();
      }
      public showEvent():void 
      {
          this.currList.itemRenderer = HeadListItem;
          if(this.collection==null)
          {
              this.collection = new eui.ArrayCollection();
          }
          this.collection.source = this.listdata;
          this.currList.dataProvider = this.collection;
          
          if(this.chandID) {
              this.seleIndex = this.collection.getItemIndex(this.chandID.toString())
          }
          this.currList.selectedIndex = this.seleIndex;
          
          if(this.buyData.length)
          {
              this.noHead.visible = false;
          }else{
              this.noHead.visible = true;
          }
          this.buyList.itemRenderer = HeadListItem;
          if(this.buyCollection ==null)
          {
              this.buyCollection = new eui.ArrayCollection(this.buyData); 
          }
          this.buyList.dataProvider = this.buyCollection;
      }
      
      public changeEvent():void
      {
          this.clickBackEvent()
      }
      protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
          switch(clickTarget) {
             case this.bgimage: 
             case this.btnColse: 
                  this.clickBackEvent()
                  break;
                  
             case this.btnOk:
                  this.sedHeadId();
                  this.chandID =0;
                 break;
                 
                  
          }
      }
      /***
       * 发送选择的头像
       * **/
      private sedHeadId():void
      {
          if(this.chandID!=0)
          {
              __SEND_NOTIFICATION(app.NetAction.SET_HEAD_INFO,[this.chandID.toString()]);
          }
          
      }
      private clickBackEvent(): void
      {
          this.close();
      }
        public dispose(): void {
            this.collection = null;
            this.buyCollection = null;
            app.mvc.AppFacade.getInstance().removeMediator(HeadUIMoudMediator.NAME)
            if(this.buyList)this.buyList.removeEventListener(egret.Event.CHANGE,this.buyItemclick,this);
            if(this.currList)this.currList.removeEventListener(egret.Event.CHANGE,this.currItemclick,this);
            super.dispose();
        }
    	
	}
}
