module sng {

    
    export class SngMoudle extends app.base.BaseSceneUIMoudleComponent {

        listItem1:SngRenderer
        listItem2:SngRenderer
        listItem3:SngRenderer

        rendererList:SngRenderer[];

        txtCou:eui.Label;

        infoButton:eui.Image;
        rwardButton:eui.Image;

        public constructor() {
            
    		super();
    		this.skinName = "SngSkin";
            
		}

        public createComplete(event: egret.Event): void {

            super.createComplete(event);
            this.rendererList = [this.listItem1,this.listItem2,this.listItem3];
            this.registerMediator(SngMediator);

            this.bindButton(this.infoButton);
            this.bindButton(this.rwardButton);

            this.updateData();
            this.updateCoin();
            this.playTween();

            // this.wheelComp.playAndGoto(7758258);
            this.wheelComp.removeFromParent();
            __SEND_NOTIFICATION(app.NetAction.REQGETMATCHLIST);
        }

        wheelComp:playcards.SngWheelComp;
        
        playTween():void {
            for(var i=0; i<3; ++i) {
                egret.Tween.removeTweens(this.rendererList[i]);
                this.rendererList[i].y = 452 + 145 * i;
                this.rendererList[i].alpha = 0;
                egret.setTimeout(this.tweenTo, this, 60*i+(i*i*2)+300, this.rendererList[i], 170+145*i);
            }
        }
        tweenTo(obj:any, y:number):void {
            egret.Tween.get(obj).to({y:y,alpha:1},220,egret.Ease.sineOut);
        }


        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch(clickTarget) {
                case this.infoButton:
                    __OPEN_MOUDLE(AppReg.SNG_RULE);
                    return;
                case this.rwardButton:
                    __OPEN_MOUDLE(AppReg.CURRENT_MATCH_INFO);
                    return;
            }
        }

        updateData():void {
            for(var i = 0; i < 3; ++i) {
                var item = this.rendererList[i];
                item.data = match.getProxy().sngList[i];
            }
        }


        updateCoin():void {
            if(user.getProxy().svrGameData != null) {
                this.txtCou.text = FormatUtils.qian(user.getProxy().svrGameData.silver) + "";
            }
        }


        close():void {
            __CLOSE_ALLMOUDLE_OPEN(AppReg.APP_MAIN_UI);
        }

    }
}