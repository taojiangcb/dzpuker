module guichu {
    export class GuiChuRecordComp extends gameabc.UICustomComponent {
        rLabel0: eui.Label;
        rLabel1: eui.Label;
        rLabel2: eui.Label;
        rLabel3: eui.Label;
        rLabel4: eui.Label;
        rLabel5: eui.Label;
        rLabel6: eui.Label;
        rLabels: eui.Label[];
        tGroup: eui.Group;
        constructor() {
            super();
            this.skinName = "GuiChuRecordCompSkin";
        }
        createComplete(event: egret.Event) {
            super.createComplete(event);
            this.rLabels = [this.rLabel0, this.rLabel1, this.rLabel2, this.rLabel3, this.rLabel4, this.rLabel5, this.rLabel6];
        }
        initTRecord(record: number[]) {
            this.tGroup.removeChildren();
            for (var i = 0; i < record.length; i++) {
                var image = new eui.Image("guichu_icon_hs_s_" + (record[i]) + "_png");
                image.scaleX = image.scaleY = 0.58;
                this.tGroup.addChild(image);
            }
        }
        updateHRecord(record: number[]) {
            for (var i = 0; i < this.rLabels.length; i++) {
                this.rLabels[i].text = "x" + record[i];
            }
        }
    }
}