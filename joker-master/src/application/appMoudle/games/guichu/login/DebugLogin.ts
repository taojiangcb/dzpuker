module guichu {
    export class DebugLogin extends app.base.BaseSceneUIMoudleComponent {
        account: eui.EditableText;
        password: eui.EditableText;
        login: eui.Button;
        serverlist: eui.List;
        iptext: eui.Label;
        constructor() {
            super();
            this.skinName = "DebugLoginSkin";
        }
        createComplete(event:egret.Event) {
            super.createComplete(event);

            __REGISTER_MEDIATOR(guichu.LoginMediator);

            this.password.displayAsPassword = true;
            this.bindButton(this.login);

            this.serverlist.itemRenderer = login.LoginServerListItem;
            this.serverlist.dataProvider = new eui.ArrayCollection(cy.getChrooseSrsList());
            this.serverlist.selectedIndex = 0;
            this.serverlist.visible = false;
            this.serverlist.addEventListener(egret.Event.CHANGE, this.onServerList, this);

            this.iptext.text = this.serverlist.selectedItem.label;
            this.bindButton(this.iptext, false);
            utils.SoundUtils.stopBgSound();

        }
        onServerList() {
            console.log(this.serverlist.selectedIndex);
            this.iptext.text = this.serverlist.selectedItem.label;
            this.serverlist.visible = false;
        }
        touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            switch (clickTarget) {
                case this.login:
                    this.loginEvent();
                    // this.loginSuccess();
                    break;
                case this.iptext:
                    this.serverlist.visible = !this.serverlist.visible;
                    break;
            }
        }
        loginEvent() {
            var srsIp:cy.SrsIp = this.serverlist.selectedItem;
            var loginName:string = this.account.text;
            var loginPass:string = this.password.text;
            guichu.loginLogiC().onLogin(srsIp,loginName,loginPass,guichu.loginLogiC().getUserType());
        }

        dispose():void {
            __REMOVE_MEDIATOR(guichu.LoginMediator);
            super.dispose()
        }
    }
}