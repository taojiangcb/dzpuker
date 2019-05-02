module sng {

	export class SngRuleMoudle extends app.base.BaseWndUIMoudleComponent {


        textLabel:eui.Label;
        closeButton:eui.Image;

        constructor(){
            super();
            this.skinName = "SngRuleSkin";
        }

        createComplete():void {
            this.bindButton(this.closeButton);
            var str = "";
            if (this.uiOpenData == room.TYPE.MTT) {
                str += gameabc.getMessage("MTT_RULE1") + "\r";
                str += gameabc.getMessage("MTT_RULE2") + "\r";
                str += gameabc.getMessage("MTT_RULE3") + "\r";
                str += gameabc.getMessage("MTT_RULE4") + "\r";
                str += gameabc.getMessage("MTT_RULE5") + "\r";
                str += gameabc.getMessage("MTT_RULE6");
            } else {
                str += gameabc.getMessage("SNG_RULE1") + "\r";
                str += gameabc.getMessage("SNG_RULE2") + "\r";
                str += gameabc.getMessage("SNG_RULE3") + "\r";
                str += gameabc.getMessage("SNG_RULE4");
            }
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