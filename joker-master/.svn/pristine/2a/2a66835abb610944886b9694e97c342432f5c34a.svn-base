module guichu {
    export class GuiChuRuleModule extends app.base.BaseSceneUIMoudleComponent {
        button1: eui.Image;
        button2: eui.Group;
        rule1: eui.Label;
        rule2: eui.Label;
        constructor() {
            super();
            this.verticalCenter = -20;
            this.horizontalCenter = 0;
            this.skinName = "GuiChuRuleModuleSkin";
        }
        createComplete(event:egret.Event) {
            super.createComplete(event);
            this.rule1.text = GuiChuModuleProxy.RULE_1;
            this.rule2.text = GuiChuModuleProxy.RULE_2;
            this.bindButton(this.button1);
            this.bindButton(this.button2);
        }
        touchBindButtonHandler(clickTarget:egret.DisplayObject):void {
            switch (clickTarget) {
                case this.button1:
                case this.button2:
                    __CLOSE_MOUDLE(AppReg.GUICHU_RULE);
                    break;
            }
        }
    }
}