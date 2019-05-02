module tip {
    
    export const YES: number = 0x0001;//点击确定(左边的按钮)
    export const NO: number = 0x0002;//点击取消(右边的按钮)
    export const CLOSE: number = 0;//点击旁边关闭
    export const ALERT: number = 0x0001;// 提醒
    export const CONFIRM: number = 0x0002;// 确认
    export const CONFIRM_CHECK: number = 0x0003;
    export const CONFIRM_CONTINUE: number = 0x0004;
    export const CONFIRM_CHECK_NEW: number = 0x0005;
    export const CHARM_ALERT: number = 0x0006;
    
	/**
	 *
	 * @author Wang Xing
	 * 确认\取消窗口 
	 */
	export class Alert extends app.base.BaseWndUIMoudleComponent {
		public constructor() {
            super();
//            this.isShowCloseButton = false;
            this.skinName = "resource/app_skin/comp/AlertSkin.exml";
		}
		
        // ======== 参数 ======== //
        public type:number; // ALERT OR CONFIRM
        public obj:any;
        public callBackFunc:Function;
        public thisObject: any;
        public content:string;
        public htmlContent: egret.ITextElement[];
        public yesBtnImg:string;
        public noBtnImg:string;
        public model:boolean;
        public str_title:string = gameabc.getMessage("STR_PROMPT");
        // ========== ui组件 ========== //
        public okBtn: eui.Group;
        public okimg: eui.Image;
        public cancelBtn: eui.Group;
        public cancelimg: eui.Image;
        public checkBox: eui.CheckBox;
        public textLbl: eui.Label;
        public textLblBg: eui.Image;
        public yesBtnIcon: egret.DisplayObject;
        public modelBg:eui.Rect;
        public txtTitle:eui.Label;
        public iconTitle: eui.Label;
        public closeBtn: eui.Image;

        public textLblGroup: eui.Group;
        public btnGroup: eui.Group;
        // public newCheckBoxGroup: eui.Group;
        // public newCheckBox: eui.CheckBox;

        /**
         * 显示Alert组件入口
         * handler(yesOrNo, checkBoxSelected, params) or handler(yesOrNo, params)
         * 
         */ 
        public static show(content:any,
                           strTitle?:string,
                           type:number = tip.ALERT,
                           handler:Function = null,
                           obj: any = null,
                           thisObject: any = null,
                           model: boolean = false,
                           icon:egret.DisplayObject = null,
                           yesBtnImg:string = null,
                           noBtnImg:string = null):tip.Alert {

            __OPEN_MOUDLE(AppReg.ALERT);
            var alertWnd: tip.Alert = __GET_MOUDLE_COMP(AppReg.ALERT) as tip.Alert;
            alertWnd.str_title = strTitle && strTitle.length > 0
                ? strTitle
                : "";// gameabc.getMessage("STR_PROMPT");
            alertWnd.type = type;
            alertWnd.obj = obj;
            if(content instanceof Array) {
                alertWnd.htmlContent = content;                
            } else {
                alertWnd.content = content;
            }

            console.log(content);
            
            alertWnd.callBackFunc = handler;
            alertWnd.thisObject = thisObject;
            alertWnd.yesBtnIcon = icon;
            alertWnd.yesBtnImg = yesBtnImg;
            alertWnd.noBtnImg = noBtnImg;
            alertWnd.model = model;
            alertWnd.init();
            return alertWnd;
        }
        
        public dispose():void {
            this.unbindButton(this.okBtn);
            this.unbindButton(this.cancelBtn);
            this.callBackFunc = null;
            this.thisObject = null;
            super.dispose();
        }
        
        public closeAndClear():void {
            this.callBackFunc = null;
            this.thisObject = null;
            this.obj = null;
            this.close();
        }
        
        protected touchBindButtonHandler(clickTarget:egret.DisplayObject):void
		{
    		switch(clickTarget) {
                case this.okBtn:
                    if(this.callBackFunc != null && this.thisObject != null) {
                        if(this.checkBox.visible) {
                            this.callBackFunc.call(this.thisObject,tip.YES,this.checkBox.selected, this.obj);
                        } else {
                            this.callBackFunc.call(this.thisObject,tip.YES,this.obj);
                        }
                    }
                    
                    this.closeAndClear();
                    break;
                case this.closeBtn:
                case this.cancelBtn:
                    if(this.callBackFunc != null && this.thisObject != null) {
                            this.callBackFunc.call(this.thisObject,tip.NO,this.obj);
                    }

                    this.closeAndClear();
                    break;
                case this.modelBg://点击旁边关闭 
                     if(this.callBackFunc != null && this.thisObject != null) {
                         this.callBackFunc.call(this.thisObject,0,this.obj);
                    }
                    this.closeAndClear();
                break    
    		}
        }
        
        /**
         * 初始化方法
         */ 
        public init():void {
            if (this.content) {
                this.textLbl.text = this.content;                
            } else {
                this.textLbl.textFlow = this.htmlContent;  
            }
            this.closeBtn.visible = false;
            this.bindButton(this.closeBtn);
            this.bindButton(this.okBtn, true);
            this.bindButton(this.cancelBtn, true);
            this.checkBox.visible = false;
            if(this.yesBtnIcon) {
                this.yesBtnIcon.x = this.okBtn.x;
                this.yesBtnIcon.y = this.okBtn.y;
                this.addChild(this.yesBtnIcon);                
            }
            
            if(this.type != tip.ALERT) {
                if(this.type == CONFIRM_CHECK) {
                    this.cancelBtn.visible = false;
                    this.checkBox.visible = true;
                    this.checkBox.label = gameabc.ResourceBundleUtil.getMessage("NO_CUE");
                }
                if (this.type == CONFIRM_CHECK_NEW) {
                    this.textLbl.textAlign = "left";
                    // this.okimg.source = "iw_qianwang40wanchang_room_png";
                    // this.cancelimg.source = "iw_qianwang4wanchang_room_png";
                }
                if (this.type == CHARM_ALERT) {
                    this.okimg.source = "img_word_alert_qudapai_png";
                    this.okBtn.horizontalCenter = 0;
                    this.cancelBtn.visible = false;
                    this.closeBtn.visible = true;
                }
            } else {
                this.cancelBtn.visible = false;
                this.okBtn.horizontalCenter = 0;
            }
            this.modelBg.visible = this.model;
            if (this.model)
                this.bindButton(this.modelBg, false);  
            if(this.str_title=="")
            {
                this.iconTitle.visible = true;
                this.txtTitle.visible = false;
            }else{
                this.txtTitle.text = this.str_title;
                this.iconTitle.visible = false;
                this.txtTitle.visible = true;
            }
            
             this.resetBtnLabel();
        }
       
        private resetBtnLabel():void {
            if (this.yesBtnImg) {
                this.okimg.source = this.yesBtnImg;
            } //else this.okimg.source  = "img_word_info_queding_png";
            if(this.noBtnImg) {
                this.cancelimg.source = this.noBtnImg;
            }//else this.cancelimg.source = "img_word_info_quxiao_png";
        }
        public get featherSpace(): egret.DisplayObjectContainer {
            return AppRoot.gameLayer.loadLayer;
        }
	}
}
