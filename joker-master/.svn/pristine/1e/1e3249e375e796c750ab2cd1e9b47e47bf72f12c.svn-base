module playcards {
    export class PlaycardsChengZhangTipComp extends app.base.BaseWndUIMoudleComponent {
        public view:eui.ViewStack;
        public v0_type2_txt:eui.Label;
        public v0_type6_txt:eui.Label;
        public v0_type0_txt:eui.Label;
        public v1_type6_txt:eui.Label;
        public v1_type0_txt:eui.Label;
        public btnClose:eui.Image;

         constructor(){
            super();
            this.skinName = "PlaycardsChengZhangTipSkin"
        }
         createComplete(event: egret.Event): void {
             super.createComplete(event);
             var index = Math.min(2, this.uiOpenData);
             this.view.selectedIndex = index;
             this.bindButton(this.btnClose);
             if (index == 0) {//强手
                 var total = getProxy().POWER_S;//同花
                 var strs = getProxy().POWER_STR;
                 var item: number[];
                 var str: string = "";
                 var max = 18;
                 for (var i: number = 2, len: number = total.length; i < len; i++){
                     item = total[i];
                     for (var j: number = 2, jlen: number = item.length; j < jlen; j++){
                         if (item[j] >= max) {
                             if (str != "") str += "、";
                             str += strs[i] + "和" + strs[j];
                         }
                     }
                 }
                 this.v0_type6_txt.text = str;
                 str = "";
                 var str2: string = "";
                 total = getProxy().POWER_O;//非同花
                  for (var i: number = 2, len: number = total.length; i < len; i++){
                     item = total[i];
                     for (var j: number = 2, jlen: number = item.length; j < jlen; j++){
                         if (item[j] >= max) {
                             if (i != j) {
                                  if (str != "") str += "、";
                                    str += strs[i] + "和" + strs[j];
                             } else {
                                 if (str2 != "") str2 += "、";
                                    str2 += strs[i] + "和" + strs[j];
                             }
                         }
                     }
                 }
                 this.v0_type2_txt.text = str2;
                 this.v0_type0_txt.text = str;
             } else if (index == 1){//弱手
                    var total = getProxy().POWER_S;//同花
                 var strs = getProxy().POWER_STR;
                 var item: number[];
                 var str: string = "";
                 var min = 10;
                 for (var i: number = 5, len: number = total.length; i < len; i++){
                     item = total[i];
                     for (var j: number = 5, jlen: number = item.length; j < jlen; j++){
                         if (item[j] <=min) {
                             if (str != "") str += "、";
                             str += strs[i] + "和" + strs[j];
                         }
                     }
                 }
                 this.v1_type6_txt.text = str;
                 str = "";
                 total = getProxy().POWER_O;//非同花
                  for (var i: number = 5, len: number = total.length; i < len; i++){
                     item = total[i];
                     for (var j: number = 5, jlen: number = item.length; j < jlen; j++){
                         if (item[j] <= min) {                       
                                  if (str != "") str += "、";
                                    str += strs[i] + "和" + strs[j];                        
                         }
                     }
                 }
                 this.v1_type0_txt.text = str;
             }
         } 
         touchBindButtonHandler(tag: egret.DisplayObject): void {
             switch (tag) {
                 case this.btnClose:
                     this.close();
                     break;
             }
         }
    }
}