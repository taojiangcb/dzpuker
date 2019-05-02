module guichu {
    export class GuiChuDailyAwardModule extends app.base.BaseSceneUIMoudleComponent {
        button: eui.Group;
        nb1: eui.Group;
        nb2: eui.Group;
        nb3: eui.Group;
        nbGroup: eui.Group;
        constructor() {
            super();
            this.skinName = "GuiChuDailyAwardModuleSkin";
            this.horizontalCenter = 0;
            this.verticalCenter = -40;
        }
        createComplete(event:egret.Event) {
            super.createComplete(event);
            this.bindButton(this.button);
        }
        touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            switch (clickTarget) {
                case this.button:
                    egret.localStorage.setItem(GuiChuModuleProxy.showDailyAward, user.getProxy().loginName + getProxy().getDateString());
                    this.f();
                    this.close();
                    break;
            }
        }
        f() {
            this.nb1.removeFromParent();
            this.nb2.removeFromParent();
            this.nb3.removeFromParent();
            this.t(this.nb1);
            this.t(this.nb2);
            this.t(this.nb3);
            this.nb1 = null;
            this.nb2 = null;
            this.nb3 = null;
        }
        waitTime: number = 0;
        t(nb: any) {
            var root: GuiChuModule = <guichu.GuiChuModule>__GET_MOUDLE(AppReg.GUICHU).gui;
            var point = this.localToGlobal(nb.x + this.nbGroup.x, nb.y + this.nbGroup.y);
            root.globalToLocal(point.x, point.y, point);
            nb.x = point.x;
            nb.y = point.y;
            root.addChild(nb);
            var tarPoint = root.tableComp.localToGlobal(326.6, 239);
            root.globalToLocal(tarPoint.x, tarPoint.y, tarPoint);
            this.waitTime++;
            egret.Tween.get(nb).wait(this.waitTime*50).to({x: tarPoint.x, y: tarPoint.y}, 300, egret.Ease.sineIn).call(()=>{
                getProxy().freeNum++;
                __SEND_NOTIFICATION(GuiChuModuleMediator.GUICHU_FREE_END);
                egret.Tween.removeTweens(nb);
                nb.removeFromParent(true);
            });
        }
    }
}