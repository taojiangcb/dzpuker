module record {
    /*** 战绩相关界面
* @author 
*
*/
    import Tween = egret.Tween;
    export class RecordUIMoudleComp extends app.base.BaseSceneUIMoudleComponent {
        
        public bgimage: eui.Rect;                // 遮盖层
        private btnClose:eui.Image;              // 关闭按钮
        
        private tabButton1: eui.ToggleButton;    // 综合数据
        private tabButton2: eui.ToggleButton;    // 专业分析
        
        private tarbar: uicomps.ButtonGroup;
        private currentTab: number;              // 当前激活的tab
        
        private majorUI:RecordMajorComp;         // 主要内容组件
        
        private roleVO:appvos.RoleVO;            // 用户信息
        
        private viewStackUI: eui.ViewStack;      // ui容器
        
       // handList: eui.List;
        
        totalTxt: eui.Label;

       // handScroll: eui.Scroller;                    //把局滚动组件
      //  handScrollV: number = 0;
        isUpdateFalg: Boolean = false;
        txtUpdateLabel: eui.Label;                   //上拉列表时显示的刷新label
        
        noBg:eui.Group;
        
        public constructor() {
            super();
            this.skinName = "resource/app_skin/record/RecordUIMoudleCompSkin.exml";
           
        }
        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            
            // btn group组件
            this.tarbar = new uicomps.ButtonGroup();
            this.tarbar.add(this.tabButton1);
            this.tarbar.add(this.tabButton2);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;
            
            app.mvc.AppFacade.getInstance().registerMediator(new RecordMediator(this));
            __SEND_NOTIFICATION(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
            this.tarbar.select(this.tabButton1);
            
            // 绑定button事件
            this.bindButton(this.btnClose);
            this.bindButton(this.bgimage);
            
        }
        public opening(): void
        {
            this.upDataEvent();
            
        }
        
        private upDataEvent():void
        {
            
        }
        
        //牌局列表滚动结束
        scrollEnd(event: egret.Event): void {
            if(this.isUpdateFalg) {
                this.isUpdateFalg = false;
                //获取列表
                this.upDataEvent();
                this.txtUpdateLabel.alpha = 0;
            }
        }
        
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget)
                {
                case this.tabButton1:
                    this.viewStackUI.selectedIndex = 0;
                break;
                case this.tabButton2:
                    this.viewStackUI.selectedIndex = 1;
                    break;
                    
                case this.bgimage:
                case this.btnClose:
                    this.clickBackEvent()
                    break;
                }
                
        }
       

        // 关闭事件
        private clickBackEvent(): void {
            this.close();
        }
        
        
        // 获取user数据
        get dataModel(): RecordProxy {
            return <RecordProxy>__GET_PROXY(RecordProxy);
        }
        public dispose():void {
            app.mvc.AppFacade.getInstance().removeMediator(RecordMediator.NAME)
            super.dispose();
        }

        /**
         * 更新玩家的数据，同时刷新ui中行为描述的相关数据
         */
        public updateDescData():void{
            this.majorUI._updatePlayerInfo();
        }
    }

}
