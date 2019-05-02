module setting {
    /*** 设置相关界面
* @author 
*
*/
    export class APPSetUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        public bgimage: eui.Rect;
        private canceBtn:eui.Button;
        private textName:eui.Label;
        private fristList:eui.List
         //public toggle1:eui.ToggleSwitch; //设置震动
        verTxt: eui.Label;
        private okBtn: eui.Button;
        private btnColse: eui.Button;
        
        public constructor() {
            super();
            if(egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
                this.skinName = "resource/app_skin/setting/PCSetUIMoudleSkin.exml";
            } else {
                this.skinName = "resource/app_skin/setting/APPSetUIMoudleSkin.exml";
            }
        }
        public createComplete(evt: egret.Event): void {
            super.createComplete(evt);
            this.bindButton(this.bgimage, false);
            if(this.okBtn) {
                this.bindButton(this.okBtn);
            }
            if(this.btnColse) {
                this.bindButton(this.btnColse);
            }

            /**
             * 第三方渠道不要显示注销按钮
             */
            var exitValidate:boolean = false;
            if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                if(!platform.isBfdzpkdrChannel()) {
                    exitValidate = true;
                    this.canceBtn.removeFromParent(true);
                } 
            }
            if(!exitValidate) {
                this.bindButton(this.canceBtn);
                if(AppConst.LOGING_CAN_BOOL) {
                    this.canceBtn.visible = false;
                } else {
                    this.canceBtn.visible = true;
                }
            }
            
            this.fristList.itemRenderer = PCSetItem;
            this.textName.text = user.getProxy().svrName+"";
            setting.getProxy().getShock();

            if(platform.isGTChannel()) {
                this.verTxt.visible = true;
                this.verTxt.text = platform.NATIVE_VER;
            }
            else {
                this.verTxt.visible = false;
            }
                
            //this.verTxt.text = gameabc.ResourceBundleUtil.getMessage("VERSION_ID_TIPS") + AppConst.VERSION_STR;
//             this.bindButton(this.toggle1);
//             this.toggle1.selected =setting.getProxy().getShock()?true:false ;
        }
        public opening(): void {
//             this.toggle1.selected =setting.getProxy().getShock()?true:false ;
        }
        
        
        touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.bgimage:
                case this.okBtn:
                case this.btnColse:
                    this.clickBackEvent();
                    break;
                case this.canceBtn:
                    this.clickBackEvent();
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.AGAIN_LOGIN_ACTION);
                break;
                    
            }
        }
        private onEnter(evt: egret.Event = null):void {
           // setting.getProxy().setShock(this.toggle1.selected?1:0);
        }
        private clickBackEvent(): void {
            this.close();
        }
        public dispose():void {
            super.dispose();
        }
    }

}
