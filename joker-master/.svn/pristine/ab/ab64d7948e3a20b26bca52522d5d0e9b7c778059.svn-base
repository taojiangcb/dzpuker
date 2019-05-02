module happy {
	/**
	 *
	 * @author 
	 *
	 */
    export class HappyNotSeatItem extends uicomps.BaseItemCilckRenderer {
        
       
        // avatar: uicomps.AvatarImage;
		//  namelab: eui.Label;
		//   numlab: eui.Label;


       // info: appvos.HLCPlayerVO;
       item1:eui.Component;
        item2:eui.Component;
         item3:eui.Component;
        
        public constructor() {
            super();
            this.skinName = "HappyNotSeatItemSkin";
        }
        
        public createComplete(event: egret.Event): void {
            super.createComplete(event);
        }
        dataChanged(): void {
            this.item1.visible =false;
            this.item2.visible =false;
            this.item3.visible =false;
            if(this.data) {
                if(this.data[0]) this.showNotSeatEvent(this.item1,this.data[0]);
                 if(this.data[1]) this.showNotSeatEvent(this.item2,this.data[1]);
                  if(this.data[2]) this.showNotSeatEvent(this.item3,this.data[2]);
            }
        }
        showNotSeatEvent(ui:eui.Component,info:any):void
        {
            ui.visible =true;
            ui["namelab"].text = info.name;
            ui["numlab"].text = FormatUtils.wan4(info.totalBet)+"";
            ui["avatar"].source = user.getProxy().getHeadStr(Number(info.avatarID));
        }
	}
}
