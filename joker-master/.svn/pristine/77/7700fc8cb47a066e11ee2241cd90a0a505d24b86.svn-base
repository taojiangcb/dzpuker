module friend {
    export class DealerOnlineListUIMoudle extends app.base.BaseSceneUIMoudleComponent {
        list: eui.List
        tiplabel: eui.Label;
        public constructor() {
            super();
            this.horizontalCenter = 0;
            this.verticalCenter = -20;
            this.skinName = "DealerOnlineListSkin";
        }
        createComplete(event: egret.Event): void {
            super.createComplete(event);
            this.list.itemRenderer = DealerFollowLabel;
            this.initList(this.uiOpenData);
        }
        initList(data: any[]) {
            if (data == null || data.length == 0) {
                this.tiplabel.visible = true;
            } else {
                this.tiplabel.visible = false;
                var onlineData: any[] = [];
                for (var i = 0; i < data.length; i++) {
                    data[i]["type"] = DEALERLABEL_TYPE.ONLINE;
                    if (data[i].online != 0 && data[i].userid != user.getProxy().svrRoleId) onlineData.push(data[i]);
                }
                this.list.dataProvider = new eui.ArrayCollection(onlineData);
            }
        }
        public dispose(): void {
            __PVO().to(app.NetAction.REQ_DEALER_FOCUS_LIST);
            super.dispose();
        }
    }
}