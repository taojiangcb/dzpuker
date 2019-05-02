var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bill;
(function (bill) {
    var BillUIMediator = (function (_super) {
        __extends(BillUIMediator, _super);
        function BillUIMediator(uicomponent) {
            if (uicomponent === void 0) { uicomponent = null; }
            var _this = _super.call(this, BillUIMediator.NAME, uicomponent) || this;
            _this.bmvos = [];
            _this.bvos = [];
            return _this;
        }
        Object.defineProperty(BillUIMediator.prototype, "view", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        BillUIMediator.prototype.listNotificationInterests = function () {
            return [
                app.constant.AppMediatorConst.UP_BILL,
                app.constant.AppMediatorConst.OPEN_BILL_SUB
            ];
        };
        BillUIMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var consts = app.constant.AppMediatorConst;
            switch (notification.getName()) {
                case app.constant.AppMediatorConst.UP_BILL:
                    this.handle(data);
                    break;
                case app.constant.AppMediatorConst.OPEN_BILL_SUB:
                    this.openSub(data);
                    break;
                default:
                    break;
            }
        };
        BillUIMediator.prototype.handle = function (vo) {
            for (var i = 0; i < vo.data.length; i++) {
                var bmvo = new bill.BillMainVO();
                bmvo.id = i;
                bmvo.time = vo.longValues[i * 2 + 1];
                var param = new appvos.ParamVO(vo.data[i]);
                var bvo = new bill.BillVO();
                bvo.time = param.intValues[0];
                bvo.count = param.intValues[1];
                if (param.intValues[2] != null) {
                    bmvo.blind = FormatUtils.wan(param.intValues[2] / 2) + "/" + FormatUtils.wan(param.intValues[2]);
                }
                else {
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
        };
        BillUIMediator.prototype.openSub = function (data) {
            __OPEN_MOUDLE(AppReg.APP_BILL_SUB, this.bvos[data]);
        };
        return BillUIMediator;
    }(app.mvc.AbstractMediator));
    BillUIMediator.NAME = "__BillUIMediator__";
    bill.BillUIMediator = BillUIMediator;
    __reflect(BillUIMediator.prototype, "bill.BillUIMediator");
})(bill || (bill = {}));
//# sourceMappingURL=BillUIMediator.js.map