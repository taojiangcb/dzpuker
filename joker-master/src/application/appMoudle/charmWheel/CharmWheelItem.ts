module charmWheel {
    export class CharmWheelItem extends eui.ItemRenderer {
        label: eui.Label;
        image: eui.Image;
        light: eui.Image;
        id: number;
        public constructor(label: string, image: string, id: number, rotation: number) {
            super();
            this.skinName = "CharmWheelItemSkin";
            this.once(eui.UIEvent.CREATION_COMPLETE ,()=>{
                this.init(label, image, id, rotation);
            }, this)
        }
        init(label: string, image: string, id: number, rotation: number) {
            this.id = id;
            this.label.text = label;
            // this.label.textColor = AppConst.TextColors.lightPurple;
            this.image.source = image;
            if (id == 9) {
                this.image.scaleX = 0.9;
                this.image.scaleY = 0.9;
            } else if (id == 6 || id == 7 || id == 8) {
                this.image.scaleX = 0.5;
                this.image.scaleY = 0.5;
            } else if (id == 5) {
                this.image.scaleX = 0.6;
                this.image.scaleY = 0.6;
            }
            this.anchorOffsetX = 60;
            this.anchorOffsetY = 190;
            this.x = 190;
            this.y = 190;
            this.rotation = rotation * 36;
        }
        showLight() {
            egret.Tween.get(this.label).to({scaleX: 1.2, scaleY: 1.2}).wait(1000).to({scaleX: 1, scaleY: 1});
            var sx = this.image.scaleX;
            var sy = this.image.scaleY;
            egret.Tween.get(this.image).to({scaleX: sx * 1.2, scaleY: sy * 1.2}).wait(1000).to({scaleX: sx, scaleY: sy});
            this.light.visible = true;
            egret.setTimeout(()=>{
                this.light.visible = false;
            }, this, 1000, true);
        }
        itemLight() {
            this.light.visible = true;
            egret.setTimeout(()=>{
                this.light.visible = false;
            }, this, 800, true);
        }
    }
}