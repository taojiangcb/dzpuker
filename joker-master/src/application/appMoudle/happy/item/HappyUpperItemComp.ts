module happy {
	/**
	 *
	 * @author 
	 *
	 */
    export class HappyUpperItemComp extends uicomps.BaseItemCilckRenderer {
        
       
        avatar: uicomps.AvatarImage;
		 namelab: eui.Label;
		  numlab: eui.Label;
        indexlab:eui.Label;

        info: appvos.HLCPlayerVO;
        
        public constructor() {
            super();
            this.skinName = "HappyUpperItemCompSkin";
        }
        
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
        }
        dataChanged(): void {
            if(this.data) {
                this.info = this.data;
                this.indexlab.text = Number(this.itemIndex+1)+"";
                this.namelab.text = this.info.name;
                  this.numlab.text = FormatUtils.wan4(this.info.totalBet)+"";
                this.avatar.source = user.getProxy().getHeadStr(Number(this.info.avatarID));
            }
        }
	}
}
