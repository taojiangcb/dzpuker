module setting {
	/**
	 *
	 * @author 
	 *
	 */
    export class PCSetItem extends uicomps.BaseItemCilckRenderer {
        
        label2: eui.Label;
        labelText:eui.Label;
        btnCheck:eui.CheckBox;

        public constructor() {
            super();
            this.skinName = "PCSetItemSkin";
        }

        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.labelText.visible = false;
            this.btnCheck.addEventListener(egret.Event.CHANGE,this.checkBoxChangeHandler,this);
        }
        private checkBoxChangeHandler(evt:egret.Event):void {
           setting.getProxy().setType(this.btnCheck.selected ? 1 : 0,this.data.index);
        }
        
        dataChanged(): void {
            
            this.btnCheck.visible =true;
            if(this.data.index == "1" 
                || this.data.index == "3"
                ||(this.data.index == "2" 
                && egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE 
                && egret.Capabilities.os=="Android")) {
                this.btnCheck.enabled = true;
                this.alpha =1;
                this.labelText.visible = false;
            }
            else {
                this.btnCheck.enabled =false;
                this.alpha = 0.3;
            }

            if(this.data.index == "5") {
                this.btnCheck.visible =false;
                this.labelText.visible = true;
                this.labelText.text = AppConst.VERSION_STR;
                this.visible = true;
            }

            this.label2.text = String(this.data.label);
            this.btnCheck.selected = setting.getProxy().getSettType(this.data.index)==0 ? false : true;
        }
        
        click(tag: egret.DisplayObject): void {
            // __PVO().to(app.NetAction.);
        }
        
	}
}
