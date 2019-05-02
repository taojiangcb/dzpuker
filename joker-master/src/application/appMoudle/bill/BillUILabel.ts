module bill {
    export class BillUILabel extends eui.ItemRenderer {
        private rankLabel: eui.BitmapLabel;
        private nameLabel: eui.Label;
        private totalLabel: eui.Label;
        private gainLabel: eui.Label;
        public constructor() {
            super();
            this.skinName = "BillUILabelSkin";
        }
        dataChanged() {
            this.rankLabel.text = (this.itemIndex + 1).toString();
            this.nameLabel.text = this.data.name;
            this.totalLabel.text = this.data.total;
            this.gainLabel.text = this.data.win;
        }
    }
}