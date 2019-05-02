module bill {
    export class BillUIMediator extends app.mvc.AbstractMediator {
        static NAME:string = "__BillUIMediator__";
        private bmvos: BillMainVO[] = [];
        private bvos: BillVO[] = [];
        constructor(uicomponent:any = null) {
            super(BillUIMediator.NAME,uicomponent);
        }
        
        public get view(): BillMainUIMoudle {
            return this.viewComponent;
        }

        public listNotificationInterests(): Array<any> {
            return [
                app.constant.AppMediatorConst.UP_BILL,
                app.constant.AppMediatorConst.OPEN_BILL_SUB
            ];
        }
        
        public handleNotification(notification: puremvc.INotification): void {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch(notification.getName()) {
                case app.constant.AppMediatorConst.UP_BILL:
                    this.handle(data);
                    break;
                case app.constant.AppMediatorConst.OPEN_BILL_SUB:
                    this.openSub(data);
                    break;
                default: 
                    break;
            }
        }
        private handle(vo: appvos.ParamVO): void{
            for (var i = 0; i < vo.data.length; i++) {
                var bmvo: BillMainVO = new BillMainVO();
                bmvo.id = i;
                bmvo.time = vo.longValues[i * 2 + 1];
                var param: appvos.ParamVO = new appvos.ParamVO(vo.data[i]);
                var bvo: BillVO = new BillVO();
                bvo.time = param.intValues[0];
                bvo.count = param.intValues[1];
                if (param.intValues[2] != null) {
                    bmvo.blind = FormatUtils.wan(param.intValues[2]/2) + "/" + FormatUtils.wan(param.intValues[2]);
                } else {
                    bmvo.blind = "未知";
                }
                for (var j = 0; j < param.data.length; j++) {
                    var cvo = new playcards.CountVO();
                    var index = j * 3;
                    cvo.roleid = param.longValues[index];
                    cvo.total = FormatUtils.wan(param.longValues[index + 1]);
                    cvo.winNum = param.longValues[index + 2] - param.longValues[index + 1];
                    cvo.win = FormatUtils.wan(cvo.winNum);
                    cvo.name = FormatUtils.protoToGBK(param.data[j]);
                    if (cvo.roleid == user.getProxy().svrRoleId) {
                        bmvo.gain += cvo.winNum;
                    }
                    bvo.cvos.push(cvo);
                }
                this.bmvos.push(bmvo);
                this.bvos.push(bvo);
            }
            this.view.initList(this.bmvos);
        }
        openSub(data: any) {
            __OPEN_MOUDLE(AppReg.APP_BILL_SUB, this.bvos[data]);
        }
    }
}