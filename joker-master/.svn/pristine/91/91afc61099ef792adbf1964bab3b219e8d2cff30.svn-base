module room {

	export class VipRuleMoudle extends app.base.BaseWndUIMoudleComponent {


        textLabel:eui.Label;
        closeButton:eui.Image;

        constructor(){
            super();
            this.skinName = "VipRuleSkin";
        }

        createComplete():void {
            this.bindButton(this.closeButton);
            var str = "";
            str += gameabc.getMessage("VIP_RULE1") + "\r";
            str += gameabc.getMessage("VIP_RULE2") + "\r";
            str += gameabc.getMessage("VIP_RULE3") + "\r";
            str += gameabc.getMessage("VIP_RULE4") + "\r";
            str += gameabc.getMessage("VIP_RULE5");
            this.textLabel.text = str; 
        }

         touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
             switch (clickTarget) {
                 case this.closeButton:
                     this.close();
                     return;
             }
         }


    }


}