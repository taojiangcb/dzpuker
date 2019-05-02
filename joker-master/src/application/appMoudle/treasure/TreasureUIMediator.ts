module treasure {
    export class TreasureUIMediator extends app.mvc.AbstractMediator {
        static NAME:string = "TreasureUIMediator"
        constructor(uicomponent:any = null) {
            super(TreasureUIMediator.NAME,uicomponent);
        }
        
        public get view(): TreasureUIMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            var consts = app.constant.AppMediatorConst;
            return [
                consts.TREASURE_GET_TREASURES,
                consts.TREASURE_OPEN_TREASURES,
                consts.TREASURE_GET_MY_ALL_TREASURES,
                consts.TREASURE_GET_MY_NOW_TREASURES,
                consts.TREASURE_MY_GET_REWARD_RECORD,
                consts.TREASURE_MY_GET_REWARD,
                consts.UPDATE_COIN,
                consts.TREASURE_REFRESH_LIST
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case consts.TREASURE_GET_TREASURES:
                    this.view.initG1l(data);
                    break;
                case consts.TREASURE_OPEN_TREASURES:
                    this.view.initG2l(data);
                    break;
                case consts.TREASURE_GET_MY_ALL_TREASURES:
                    this.view.initG3l1(data);
                    break;
                case consts.TREASURE_GET_MY_NOW_TREASURES:
                    this.view.initG3l2(data);
                    break;
                case consts.TREASURE_MY_GET_REWARD_RECORD:
                    this.view.initG3l3(data);
                    break;
                case consts.TREASURE_MY_GET_REWARD:
                    this.view.getReward(data);
                    break;
                case consts.UPDATE_COIN:
                    this.view.updateCoin();
                    break;
                case consts.TREASURE_REFRESH_LIST:
                    this.view.refreshList();
                    break;
                default: 
                    break;
            }
        }
    }
}