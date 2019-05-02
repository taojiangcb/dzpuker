module match {

	export class MttRuleMoudle extends app.base.BaseWndUIMoudleComponent {


        textLabel:eui.Label;
        closeButton:eui.Image;

        constructor(){
            super();
            this.skinName = "MttRuleSkin";
        }

        createComplete():void {
            this.bindButton(this.closeButton);
            var str = "";
            // str += gameabc.getMessage("SNG_RULE1") + "\r";
            // str += gameabc.getMessage("SNG_RULE2") + "\r";
            // str += gameabc.getMessage("SNG_RULE3") + "\r";
            // str += gameabc.getMessage("SNG_RULE4");
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