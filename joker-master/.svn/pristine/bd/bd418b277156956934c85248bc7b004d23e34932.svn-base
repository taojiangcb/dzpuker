module room {
    export class CreateRenderer extends uicomps.BaseItemCilckRenderer {
       
        
        maxBankLabel2:eui.Label;
        maxBankLabel1:eui.Label;
        blindsLabel:eui.Label;
        bodyGroup: eui.Group;
        
        public constructor() {
            super();
            this.skinName = "CreateRoomRendererSkin";
        }
        
        protected click(tag: egret.DisplayObject): void {
           this.currentState = "down";
        }
        
        get roomVO(): appvos.RoomVO {
            return this.data;
        }
        
        dataChanged(): void {
            var sb = FormatUtils.qian(this.roomVO.smallBlinds);
            var bb = FormatUtils.qian(this.roomVO.bigBlinds);
            var bk = FormatUtils.qian(this.roomVO.maxBank);
            this.maxBankLabel1.text = this.maxBankLabel2.text = bk;
            this.blindsLabel.text = "盲注:"+ sb + "/" + bb;
            if(this.itemIndex!=1) {
                //(暂时关闭其他房间)
                this.enabled = false;
                this.alpha = .5;
                this.removeButton(this);
                this.blindsLabel.text = "暂未开放"
            } else {
                this.enabled = true;
                this.alpha = 1;
                this.addButton(this,false);
            }
            this.setYPosition();
            this.drawCircle();
        }
        setYPosition() {
            if (this.itemIndex % 2 == 0) {
                this.bodyGroup.top = 20;
            } else {
                this.bodyGroup.bottom = -20;
            }
        }
        drawCircle() {
            var shape = new egret.Shape();
			this.bodyGroup.addChildAt(shape, 0);
            var graphics = shape.graphics;
            graphics.beginFill(0x9992bc, 0.2);
            graphics.lineStyle(0, 0x000000);
            graphics.drawCircle(98, 124, 90);
            if (this.itemIndex != 0) {
                var shape1 = new egret.Shape();
                this.addChildAt(shape1, 0);
                var graphics1 = shape1.graphics;
                graphics1.beginFill(0x9992bc, 0.2);
                graphics1.lineStyle(0, 0x000000);
                graphics1.drawCircle(-2.5, 220, 10);
            }
        }
    }
}