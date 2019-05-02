/**
 * Created by JiangTao on 2016/4/27.
 */
module svrDebug {
    export class DebugLoginModule extends app.base.BaseWndUIMoudleComponent {

        public radio1: eui.RadioButton;
        public radio5: eui.RadioButton;
        public radio3: eui.RadioButton;
        public radio2: eui.RadioButton;
        public radio6: eui.RadioButton;
        public radio4: eui.RadioButton;
        public radio7: eui.RadioButton;
        public radio8: eui.RadioButton;
        public btnLogin: eui.Button;

        radioGroup:eui.RadioButtonGroup;

        constructor() {
            super();
            this.skinName = "resource/app_skin/login/DebugLoginSkin.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.radioGroup = new eui.RadioButtonGroup();

            this.radio1.group = this.radioGroup;
            this.radio2.group = this.radioGroup;
            this.radio3.group = this.radioGroup;
            this.radio4.group = this.radioGroup;
            this.radio5.group = this.radioGroup;
            this.radio6.group = this.radioGroup;
            this.radio7.group = this.radioGroup;
            this.radio8.group = this.radioGroup;

            this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.Event)=>{

                AppGlobal.DebugRoleId = this.radioGroup.selectedValue;
                if (cy.srsServer == null) cy.srsServer = new svrDebug.DebugServer("127.0.0.1",7777);
                cy.srsServer.connect();

                __OPEN_PRE_MOUDLE(AppReg.APP_MAIN_UI);
                __CLOSE_MOUDLE_UI(this);

            },this)
        }
    }
}