module guichu {
    export class GuiChuWheelItemComp extends gameabc.UICustomComponent {
        bg: eui.Image;
        image: eui.Image;
        constructor(index: number, isBg = false) {
            super();
            this.skinName = "GuiChuWheelItemCompSkin";
            this.anchorOffsetX = 64;
            this.anchorOffsetY = 240;
            this.x = this.y = 280;
            this.rotation = 15 * index;
            this.bg.visible = isBg;
            this.image.visible = !isBg;
            if (isBg) {
                this.bg.source = "guichu_wheel_xzq_" + (index % 2 + 1) + "_png";
            } else {
                this.image.source = "guichu_icon_hs_s_" + (getProxy().WHEEL_ITEMS[index] + 1) + "_png";
            }
        }
        createComplete(event: egret.Event) {
            super.createComplete(event);
        }
        
    }
}