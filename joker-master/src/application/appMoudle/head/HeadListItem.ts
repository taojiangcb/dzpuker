module head {
	/**
	 *
	 * @author 
	 *
	 */
    export class HeadListItem extends uicomps.BaseItemCilckRenderer {
        private mc: egret.MovieClip;
        private mvgroup: eui.Group;
        private headIcon:eui.Image;
        private icon1:eui.Image;
        private icon2: eui.Image;
        public constructor() {
            super();
            this.skinName = "HeadRepItemSkin";
           
        }
        
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
            // this.addButton(this,false);
            // this.touchChildren = false;
        }
        dataChanged(): void {
            if(this.data && this.data !=NaN)
            {
                this.headIcon.source = "img_Default_Avatar_" + this.data + "_png"
            } else {
                this.headIcon.source = "img_Default_Avatar_png"
            }   
            
            this.selectedChange();
        }
        public selectedChange(): void {
            if(this.selected) {
                this.icon1.source = "s9_bg_head_2_png"
            } else {
                this.icon1.source = "s9_bg_head_1_png"
            }
        }
	}
}
