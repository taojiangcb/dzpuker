module feed {
	/**
	 *
	 * @author 
	 *
	 */
    export class FeedInfoItem extends uicomps.BaseItemCilckRenderer {
        
        label1: eui.Label;
        
        btnCheck:eui.CheckBox;
        avatar: uicomps.AvatarImage;
        info: appvos.SeatPlayerVO;
        
        public constructor() {
            super();
            this.skinName = "FeedInfoItemSkin";
        }
        
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.btnCheck.addEventListener(egret.Event.CHANGE,this.checkBoxChangeHandler,this);
        }
        private checkBoxChangeHandler(evt: egret.Event): void {
            this.data.choice = this.btnCheck.selected ? 1 : 0,this.data.index;
        }
        dataChanged(): void {
            if(this.data) {
                this.info = this.data.info;
                this.label1.text = this.info.name;
                 this.btnCheck.selected = this.data.choice==0 ? false : true;
                 
                this.avatar.source = user.getProxy().getHeadStr(Number(this.info.avatarID));
            }
        }
        
        click(tag: egret.DisplayObject): void {
            
            // __PVO().to(app.NetAction.);
        }
        
	}
}
