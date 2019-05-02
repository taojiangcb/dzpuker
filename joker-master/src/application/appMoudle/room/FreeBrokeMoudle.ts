module room {
    export class FreeBrokeMoudle extends app.base.BaseSceneUIMoudleComponent {
        btnClose: eui.Group;
        btnGetAward: eui.Group;
        constructor() {
            super();
            this.left = this.top = this.right = this.bottom = 0;
            this.skinName = "FreeBrokeSkin";
        }
        createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.bindButton(this.btnClose);
            this.bindButton(this.btnGetAward);
         }
         touchBindButtonHandler(tag:egret.DisplayObject):void {
            switch(tag) {
                case this.btnClose:
                    user.getProxy().freeFlagCancel = true;
                    this.close();
                    break;
                case this.btnGetAward:
                    user.getProxy().freeFlagCancel = false;
                    mission.getProxy().getAward(this.uiOpenData,AppConst.GAME_ID_FREE);
                    this.btnGetAward.touchEnabled = false;
                    this.btnGetAward.alpha = 0.6;
                    this.close();
                    break;
            }
         }
         dispose() {
             super.dispose();
             this.sendNotification(app.NetAction.TOOL_RILVER, AppConst.GAME_ID_FREE);
         }
    }
}