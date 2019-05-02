module friend {
    export class FriendFaceAddLabel extends eui.ItemRenderer {
        private nameLabel: eui.Label;
        private faceImage: eui.Image;
        public constructor() {
            super();
            this.skinName = "FriendFaceAddLabelSkin";
        }
        dataChanged() {
            this.nameLabel.text = this.data.fName;
        }
    }
}