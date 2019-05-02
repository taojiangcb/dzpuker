module room {
	/**
	 *
	 * @author 
	 *
	 */
    export class TableRenderer extends uicomps.BaseItemCilckRenderer {
        
        blindsLabel: eui.Label;
        numPlayersLabel: eui.Label;
        maxBankLabel:eui.Label;
        maxBankLabelBlack:eui.Label;
        bgImage:eui.Image;
        fastImg:eui.Image;
        
        antiImage:eui.Image;
        antiLabel:eui.Label;
        
        public constructor() {
            super();
            this.touchChildren = false;
            this.touchEnabled = true;
            this.skinName = "TableItemSkin";
            this.antiImage.visible = false;
            this.antiLabel.visible = false;
            this.addButton(this.bgImage);
            var len = this.numChildren;
            for (var i=0; i<len; ++i) {
                var dpo = this.getChildAt(i);
                dpo.touchEnabled = dpo==this.bgImage;
            }
        }
        
        get roomVO(): appvos.RoomVO {
            return this.data;
        }
        
        
        setBgType(index:number):void {
            switch(index){
                case 0:
                    this.bgImage.source = "icon_chouma4_png";
                    return;
                case 1:
                    this.bgImage.source = "icon_chouma5_png";
                    return;
                case 2:  case 3: case 4: case 5:
                    this.bgImage.source = "icon_chouma3_png";
                    return;

            }
        }
        
        dataChanged(): void {
            if (this.roomVO==null) return;
            var max = FormatUtils.qian(this.roomVO.maxBank);
            this.maxBankLabel.text = this.maxBankLabelBlack.text = max;
            
            var sb = FormatUtils.qian(this.roomVO.smallBlinds);
            var bb = FormatUtils.qian(this.roomVO.bigBlinds);
            this.blindsLabel.text = "盲注:"+ sb + "/" + bb;
            this.numPlayersLabel.text = ""+this.roomVO.online;
            if (this.roomVO.isFast || this.roomVO.isInsurance) {
                var imageStr = "";
                if (this.roomVO.isFast && this.roomVO.isInsurance) imageStr = "icon_jisu_baoxian_room_png";
                else if (this.roomVO.isFast) imageStr = "icon_jisu_room_png";
                else if (this.roomVO.isInsurance) imageStr = "icon_baoxian_room_png";
                this.fastImg.source = imageStr;
                this.fastImg.visible = true;
            } else this.fastImg.visible = false;

            if (this.roomVO.anti > 0) {
                this.antiImage.visible = true;
                this.antiLabel.visible = true;
                var at = FormatUtils.qian(this.roomVO.anti);
                this.antiLabel.text = at + "必下";
            } else {
                this.antiImage.visible = false;
                this.antiLabel.visible = false;
            }

        }
        
        click(tag: egret.DisplayObject): void {
            
        }
        
	}
}
