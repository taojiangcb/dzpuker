module record {
    /*** 战绩专业术语
* @author 
*
*/
    export class RecordInfoUIMoudleComp extends app.base.BaseSceneUIMoudleComponent {
        
        public bgimage: eui.Rect;

        btnClose:eui.Image;
        okBtn:eui.Group;
        info:any

         private majorInfoUI: RecordMajorICompInfo;
        public constructor() {
            super();
            this.skinName = "resource/app_skin/record/RecordInfoUIMoudleCompSkin.exml";
        }

        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            
            
            this.bindButton(this.bgimage);
            this.bindButton(this.btnClose);
            this.bindButton(this.okBtn)
            
        }
        public opening(): void
        {
            if(this.uiOpenData)
            {
                this.info = this.uiOpenData;
                this.majorInfoUI.txtVpip.text = this.info.vpip + "%";
                this.majorInfoUI.txtPer.text = this.info.pfr + "%";
                this.majorInfoUI.txtAf.text = this.info.af + "";
                this.majorInfoUI.txt3b.text = this.info.b3 + "%";
                this.majorInfoUI.txtStl.text = this.info.stl + "%";
                this.majorInfoUI.txtCd.text = this.info.cd + "%";
                this.majorInfoUI.txtWtsd.text = this.info.wtsd + "%";
                this.majorInfoUI.txtBs.text = this.info.bs+""; 
            }
        }
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.btnClose:
                 case this.bgimage:
                  case this.okBtn:
                this.clickBackEvent();
                break;
            }
        }
        
        private clickBackEvent(): void {
            this.close();
        }
        get dataModel(): RecordProxy {
            return <RecordProxy>__GET_PROXY(RecordProxy);
        }
        public dispose():void {
            app.mvc.AppFacade.getInstance().removeMediator(RecordMediator.NAME)
            super.dispose();
        }
    }

}
