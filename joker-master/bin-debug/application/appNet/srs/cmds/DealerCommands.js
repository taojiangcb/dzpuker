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
    var DealerCommands = (function (_super) {
        __extends(DealerCommands, _super);
        function DealerCommands() {
            return _super.apply(this, arguments) || this;
        }
        /**
         * 流程为：1(正常); 2(发牌异常); 3(重新发牌)
         * 1: SERVER->DEALER:[3001]; DEALER->SERVER:[2001]; DEALER->SERVER:[2002]; SERVER->DEALER:[3002];
         * 2: SERVER->DEALER:[3001]; DEALER->SERVER:[2001]; SERVER->DEALER:[3003]; 这里直接跳到3
         * 3: DEALER->SERVER:[2003]; SERVER->DEALER:[3004];
         */
        DealerCommands.prototype.sendHandler = function (data, action, paramVO) {
            // this.sendPackage.sProcessID = 1;
            // this.sendPackage.nAppID = user.getProxy().currentRoom.svrOfsId;
            switch (action) {
                case app.NetAction.DTS_START_DEAL_CARD:
                    paramVO.intValues = [0];
                    break;
                case app.NetAction.DTS_CARD_DATA:
                    //int[0] 第几轮 int[1] 座位号 string[0] 12,10,11
                    paramVO.intValues = [data[0], data[1]];
                    paramVO.strValues = [data[2]];
                    break;
                case app.NetAction.DTS_REPEAT_DEAL_CARD:
                    paramVO.intValues = [0];
                    break;
            }
            console.log("==dealer==sendHandler - action", action, paramVO.intValues, paramVO.strValues);
        };
        DealerCommands.prototype.resultHandler = function (action, paramVO) {
            console.log("==dealer==resultHandler - action", action);
            var dp = dealer.getProxy();
            switch (action) {
                case app.NetAction.STD_CAN_START_DEAL_CARD:
                    // 这里需要转发到小型机，告诉哪些小型机需要扫描了。
                    //long[] 0 hands 1 flop 2 turn 3 river ; int[] 0 1 2 3 4  
                    dp.players = paramVO.intValues;
                    dp.dealcardType = paramVO.longValues[0];
                    if (paramVO.longValues[0] == 0) {
                        this.sendNotification(app.constant.AppMediatorConst.CLEAR_TABLE_PLAYER_UI);
                    }
                    console.log("==dealer==resultHandler - action=3001", action, paramVO.longValues, paramVO.intValues);
                    break;
                case app.NetAction.STD_DEAL_CARD_END:
                    break;
                case app.NetAction.STD_DEAL_CARD_ERROR:
                    break;
                case app.NetAction.STD_CAN_REPEAT_DEAL_CARD:
                    break;
            }
        };
        return DealerCommands;
    }(app.GameCommand));
    app.DealerCommands = DealerCommands;
    __reflect(DealerCommands.prototype, "app.DealerCommands");
})(app || (app = {}));
//# sourceMappingURL=DealerCommands.js.map