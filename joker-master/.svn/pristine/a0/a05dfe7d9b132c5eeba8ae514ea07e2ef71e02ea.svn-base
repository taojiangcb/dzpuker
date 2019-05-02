/**
 * Created by taojiang on 16/3/22.
 */
module tip {

    var ui:SystemPromptUI = null;

    export function popSysPrompt(val:string,callFunc?:any,callObj?:any):void {
        if(ui == null) {
            ui = new SystemPromptUI();
        }
        ui.popPrompt(val,callFunc,callObj);
    }

    export class SystemPromptUI extends gameabc.UICustomComponent {

        txtMsg:eui.Label;
        okBtn:eui.Button;
        str_prompt:string = "";

        callFunc:any = null;
        callObj:any = null;

        constructor() {
            super();
            this.skinName = "SystemErrorTipsSkin";
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.Event) => {
                this.removeFromParent();
                if(this.callFunc != null) {
                    this.callFunc.apply(this.callObj);
                }
                this.callFunc = null;
                this.callObj = null;
            },this);
        }

        commitProperties():void {
            super.commitProperties();
            this.txtMsg.text = this.str_prompt;
        }

        popPrompt(val:string,callFunc?:any,callObj?:any):void {
            this.str_prompt = val;
            if(this.initialized) {
                this.txtMsg.text = this.str_prompt;
            }

            this.callFunc = callFunc;
            this.callObj = callObj;

            if(this.parent == null) {
                AppRoot.gameLayer.addChild(this);
            }
        }
    }
}