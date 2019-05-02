var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var HappyNetCommand = (function (_super) {
        __extends(HappyNetCommand, _super);
        function HappyNetCommand() {
            return _super.call(this) || this;
        }
        HappyNetCommand.prototype.resultHandler = function (action, param) {
            switch (action) {
                case app.NetAction.GLXY_RESP_TABLE_VO:
                    mc2sdk.event(59005 /* ON_LOIGN_STEP_5 */);
                    happy.getProxy().tableVO = new appvos.HLCTableVO(param.data[0]);
                    var ui = __GET_MOUDLE_COMP(AppReg.APP_HAPPY);
                    if (ui == null || ui.parent == null) {
                        // var except = [AppReg.APP_HAPPY, AppReg.PRELOAD];
                        //  var arr = gameabc.UIManager.instance.getOpenList(except);                           
                        //  __OPEN_PRE_MOUDLE(AppReg.APP_HAPPY, null, arr);  
                        happy.getProxy().openMoudle();
                    }
                    else {
                        ui.refVO();
                    }
                    break;
                case app.NetAction.GLXY_RESP_BANK_WAITER:
                    happy.getProxy().bankWaiter = param.intValues;
                    break;
            }
        };
        return HappyNetCommand;
    }(app.GameCommand));
    app.HappyNetCommand = HappyNetCommand;
    __reflect(HappyNetCommand.prototype, "app.HappyNetCommand");
})(app || (app = {}));
//# sourceMappingURL=HappyNetCommand.js.map