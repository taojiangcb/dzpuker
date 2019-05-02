module bill {
    export class BillMainUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        private list: eui.List;
        private closeButton: eui.Button;
        private tipLabel: eui.Label;
        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
            this.skinName = "BillMainUIMoudleSkin";
        }
        createComplete(event: egret.Event): void {
            __REGISTER_MEDIATOR(BillUIMediator,this);
            __SEND_NOTIFICATION(app.NetAction.REQ_BILL_GET);
            this.bindButton(this.closeButton);
        }
        initList(data: any[]) {
            if (data.length == 0) {
                this.tipLabel.visible = true;
                return;
            } else {
                 this.tipLabel.visible = false;
            }
            data.sort(function(a,b) {
                return b.time - a.time;
            });
            this.list.dataProvider = new eui.ArrayCollection(data);
            this.list.itemRenderer = BillMainUILabel;
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
        public dispose(): void {
            __REMOVE_MEDIATOR(BillUIMediator);
            super.dispose();
        }
    }
}