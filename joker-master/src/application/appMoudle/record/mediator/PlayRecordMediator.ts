/**

 */
module record {
    export class PlayRecordMediator extends app.mvc.AbstractMediator {

        static NAME: string = "PlayRecordMediator";

        public constructor(viewComponent: Object = null) {
            super(PlayRecordMediator.NAME,viewComponent);
        }

        listNotificationInterests():string[] {
            return [
                app.constant.AppMediatorConst.UP_RECORD_DATA,
            ];
        }

        handleNotification(notification:puremvc.INotification):void {
            switch(notification.getName()) {
                case app.constant.AppMediatorConst.UP_RECORD_DATA:
                    if(this.uiModule) {
                        this.uiModule.showList(record.getProxy().indexTab)
                    }
                    break;
            }
        }

        // updateDisconverTables(res:room.TableVO[]):void {
        updateDisconverTables(res:any):void {
            if(this.uiModule) {
               // this.uiModule.updateTableDatas(res);
            }
        }

        get uiModule(): record.PlayRecordUIMoudleComp {
            return <record.PlayRecordUIMoudleComp>__GET_MOUDLE_COMP(AppReg.APP_PLAY_RECORD);
        }

    }
}