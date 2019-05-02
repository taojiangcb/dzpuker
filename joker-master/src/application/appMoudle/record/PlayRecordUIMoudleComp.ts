module record {
    /**
  * 牌局记录模块
  * @author 
  *
  */
    export class PlayRecordUIMoudleComp extends app.base.BaseSceneUIMoudleComponent {
        
        private tabButton1: eui.ToggleButton;
        private tabButton2: eui.ToggleButton;
        private tabButton3: eui.ToggleButton;
        private tarbar: uicomps.ButtonGroup;
        
        private btnClose:eui.Image;
        
        handList:eui.List;
        noBg:eui.Group;
        txtTips:eui.Label;
        noTxt: eui.Label;
        winarr: any[];
        public constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.skinName = "resource/app_skin/record/PlayRecordUIMoudleCompSkin.exml";
        }
         

        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            this.tarbar = new uicomps.ButtonGroup();
            this.tarbar.add(this.tabButton1);
            this.tarbar.add(this.tabButton2);
            this.tarbar.add(this.tabButton3);
            this.tarbar.itemThisObj = this;
            this.tarbar.itemClick = this.touchHandler;
            this.bindButton(this.btnClose)
            this.winarr = record.getProxy().getwinRecord();
            app.mvc.AppFacade.getInstance().registerMediator(new PlayRecordMediator(this));
            this.tarbar.select(this.tabButton1);          
            this.handList.itemRenderer = RecordHistoryItemRender;
            this.showList(1);
            if(record.getProxy().collRecord.length==0)
            {
                var param: appvos.ParamVO = new appvos.ParamVO();
                param.strValues = [user.getProxy().svrRoleId.toString()]
                __SEND_NOTIFICATION(app.NetAction.DZ_RECORD_GET_MANY,param);
            }
        }
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.tabButton1:
                    this.showList(1)
                    break;
                case this.tabButton2:
                    this.showList(2)
                    break;
                case this.tabButton3:
                
                    this.showList(3)
                    break;

                case this.btnClose:
                    this.clickBackEvent()
                    break;
            }
        }
        public showList(index:number):void
        {
            record.getProxy().indexTab = index;
            var _arr:any[]
            switch(index)
                {
                    case 1:
                    this.txtTips.text = gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS1");
                    _arr =  record.getProxy().allRecord;
                    break;
                    case 2:
                    this.txtTips.text = gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS1");
                        _arr = this.winarr;
                        break;
                    case 3:
                    this.txtTips.text = gameabc.ResourceBundleUtil.getMessage("PLAY_RECORD_TIPS2");
                    _arr = record.getProxy().collRecord;
                    _arr = _arr.sort(this.collRecordFunction)
                        break;
                }
            
            if(_arr&&_arr.length)
            {
                this.handList.visible = true;
                this.noBg.visible = false;
                this.handList.dataProvider = new eui.ArrayCollection(_arr); 
            }else{
                this.handList.visible =false;
                this.noBg.visible = true;
                if(index==3)
                {
                    this.noTxt.text = gameabc.ResourceBundleUtil.getMessage("PLAY_NO_RECORD_TIPS2");
                }else{
                    this.noTxt.text = gameabc.ResourceBundleUtil.getMessage("PLAY_NO_RECORD_TIPS1");
                }
            }
            
        }
        private collRecordFunction(a: any,b: any): number {
            return b.id - a.id
        }
        private clickBackEvent(): void {
            this.close();
        }
        get dataModel(): RecordProxy {
            return <RecordProxy>__GET_PROXY(RecordProxy);
        }
        public dispose(): void {
            app.mvc.AppFacade.getInstance().removeMediator(PlayRecordMediator.NAME)
            super.dispose();
        }
        
        
        
    }
 
}
