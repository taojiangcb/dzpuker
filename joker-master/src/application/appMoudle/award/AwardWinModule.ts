/**
 * Created by JiangTao on 2016/4/8.
 */
module award {

    export function show(contMsg:string,
                         urlTitle:string="img_word_shop_goumaichenggong_png",
                         reward:number = 0,
                         callFunc?:Function,
                         callParams?:any,
                         callObj?:any):void {
        var awardUIModule:gameabc.UIMoudle = __GET_MOUDLE(AppReg.AWARD_WIN);
        if(awardUIModule == null || awardUIModule.uiState != gameabc.UIConstants.UI_STATE_OPEN) {
            var uiParam:Object = {
                contMsg:contMsg,
                titleUrl:urlTitle,
                reward:reward,
                callFunc:callFunc,
                callParams:callParams,
                callObj:callObj
            };
            __OPEN_MOUDLE(AppReg.AWARD_WIN,uiParam);
        }
    }

    export class AwardWinModule extends app.base.BaseUIMoudleComponent {

        public imgTitle: eui.Image;
        public txtMsg: eui.Label;
        public txtAward: eui.Label;
        public btnAward: eui.Button;

        titleUrl:string = "";
        reward:number = 0;
        contMsg:string = "";
        callFunc:Function = null;
        callParams:any;
        callObj:any;

        constructor(){
            super()
            this.skinName = "resource/app_skin/award/AwardWinSkin.exml";
        }

        createComplete(event:egret.Event):void {
            super.createComplete(event);
            this.bindButton(this.btnAward);
        }

        opening():void {
            if(this.uiOpenData) {
                this.titleUrl = this.uiOpenData.titleUrl;
                this.reward = this.uiOpenData.reward;
                this.contMsg = this.uiOpenData.contMsg;
                this.callFunc = this.uiOpenData.callFunc;
                this.callParams = this.uiOpenData.callParams;
                this.callObj = this.uiOpenData.callObj;
            }
        }

        touchBindButtonHandler(clickTarget: egret.DisplayObject):void {
            if(clickTarget == this.btnAward) {
                if(this.callFunc != null) {
                    this.callFunc.call(this.callObj,this.callParams);
                }
            }
            this.close();
        }

        commitProperties():void {
            super.commitProperties();
            var titleTexture:egret.Texture = <egret.Texture>RES.getRes(this.titleUrl);
            this.imgTitle.texture = titleTexture;
            this.txtMsg.text = this.contMsg;
            this.txtAward.text = this.reward.toString();
        }
    }
}