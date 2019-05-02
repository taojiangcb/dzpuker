module bill {
    export class BillUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private list: eui.List;
        private closeButton: eui.Image;
        private timeLabel: eui.Label;
        private countLabel: eui.Label;
        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
            this.skinName = "BillUIMoudleSkin";
        }
        createComplete(event: egret.Event): void {
            this.bindButton(this.closeButton);
            this.initList();
        }
        initList() {
            var time: number = Math.ceil(this.uiOpenData.time / 60);
            var hour: number = Math.floor(time / 60);
            var min: number = time - hour * 60;
            this.timeLabel.text = hour > 0? hour + "小时" + min + "分钟":  min + "分钟";
            this.countLabel.text = this.uiOpenData.count + "局";
            this.uiOpenData.cvos.sort(function(a,b) {
                return b.winNum - a.winNum;
            });
            this.list.dataProvider = new eui.ArrayCollection(this.uiOpenData.cvos);
            this.list.itemRenderer = BillUILabel;
        }
        protected touchBindButtonHandler(clickTarget: egret.DisplayObject): void {
            switch (clickTarget) {
                case this.closeButton:
                    this.close();
                    break;
                default:
                    break;
            }
        }
    }
}