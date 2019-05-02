/**

 */
module record {
    export class RecordMediator extends app.mvc.AbstractMediator {

        static NAME: string = "RecordMediator";

        public constructor(viewComponent: Object = null) {
            super(RecordMediator.NAME,viewComponent);
        }
        // 监听notification
        listNotificationInterests():string[] {
            return [
                app.constant.AppMediatorConst.GET_RECORD_TABLES,
                app.constant.AppMediatorConst.UPDATE_RECORD_TABLES,
                app.constant.AppMediatorConst.UP_PLAY_INFO_DATA
            ];
        }
        // 处理notification
        handleNotification(notification:puremvc.INotification):void {
            switch(notification.getName()) {
                case app.constant.AppMediatorConst.GET_RECORD_TABLES:
                    this.initDisconverTables();
                    break;
                case app.constant.AppMediatorConst.UPDATE_RECORD_TABLES:
                    this.updateDisconverTables(notification.getBody());
                    break;
                case app.constant.AppMediatorConst.UP_PLAY_INFO_DATA:
                    this.uiModule.updateDescData(); // 刷新ui中行为描述数据
                    break;
            }
        }

        initDisconverTables():void {
            if(this.uiModule) {
                //this.uiModule.initTableDatas();
            }
        }

        // updateDisconverTables(res:room.TableVO[]):void {
        updateDisconverTables(res:any):void {
            if(this.uiModule) {
               // this.uiModule.updateTableDatas(res);
            }
        }

        

        get uiModule(): record.RecordUIMoudleComp {
            return this.viewComponent;
        }

    }
}