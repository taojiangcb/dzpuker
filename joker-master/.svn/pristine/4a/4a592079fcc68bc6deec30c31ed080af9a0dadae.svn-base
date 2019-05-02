module uicomps {
	/**
	 *
	 * @author 
	 *
	 */
    export class ButtonGroup {
    	
        list: eui.ToggleButton[];
        selectedButton: eui.ToggleButton;
        itemClick: Function;
        itemThisObj: any;
        	
        add(button: eui.ToggleButton):void {
            if (this.list==null) {
                this.list = new Array();
            }
            this.list.push(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
        }

        onclick(evt:egret.TouchEvent):void {
            this.select(evt.target);
            if(this.itemClick != null) this.itemClick.apply(this.itemThisObj,[evt]); 
        }

        select(button: eui.ToggleButton): void {
            if(this.selectedButton != null) {
                this.selectedButton.selected = false;
            }
            this.selectedButton = button;
            this.selectedButton.selected = true;
        }
        selectIndex(index:number): void {
            var btn: eui.ToggleButton = this.list[index];
            if(btn!=null) this.select(btn);
        }
        getSelectIndex():number
        {
            return this.list.indexOf(this.selectedButton);
        }
        dispose():void {
            if(this.list != null) {
                for(var i: number = 0;i < this.list.length; ++i) {
                    this.selectedButton = this.list[i];
                    this.selectedButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);      
                }
            }
            if(this.selectedButton != null) {
                this.selectedButton = null;
            }
        }
	
	}
}
