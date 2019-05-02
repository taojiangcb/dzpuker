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
    var VirtualServer = (function (_super) {
        __extends(VirtualServer, _super);
        function VirtualServer() {
            var _this = _super.apply(this, arguments) || this;
            _this.delay = 0;
            return _this;
        }
        VirtualServer.prototype.execute = function (notification) {
            var par = notification.getBody();
            var action = par[0];
            var timestamp = par[1];
            var param = par[2];
            var virtualFunction = this["execute" + action];
            if (virtualFunction == null)
                return;
            var responseData = virtualFunction(param, this);
            if (responseData == null)
                return;
            var command = app.NetConfigs.connCache[timestamp];
            var message = new appvos.MessageVO();
            message.data = responseData;
            if (this.delay == 0)
                this.sendClient(command, action, message);
            else
                egret.setTimeout(this.sendClient, this, this.delay, command, action, message);
        };
        VirtualServer.prototype.sendClient = function (command, action, message) {
            if (command == null) {
                this.sendNotification(action, message);
            }
            else {
                command.response(action, message);
            }
        };
        // 虚拟服务器，用于客户端开发，几个重要事项必须牢记
        // 1、函数名以execute+通信协议号命名，否者无效
        // 2、项目发布时所有虚拟服务器代码将被删除
        // 3、每个函数模拟一条服务器逻辑指令，不能以任何形式与函数外的任何参数、变量、常量通信
        // 5、不可以创建任何ParamVO以外的对象(数字、字符、int64、通信VO除外)
        // 6、函数收到的对象是客户端发出的，返回的对象客户端将会收到
        // 7、收到的参数不可直接返回，必须new一个全新VirtualServer.ts的对象作为返回对象。
        VirtualServer.prototype.execute100 = function (param, vsCfg) {
            var responseData = new appvos.ParamVO();
            responseData.intValues = [
                Math.floor(Math.random() * 99999),
                Math.floor(Math.random() * 99999),
                Math.floor(Math.random() * 9999),
                Math.floor(Math.random() * 9999),
                Math.floor(Math.random() * 999),
                Math.floor(Math.random() * 99)
            ];
            vsCfg.delay = 2000;
            return responseData;
        };
        VirtualServer.prototype.execute200 = function (param, vsCfg) {
            var responseData = new appvos.ParamVO();
            responseData.intValues = [
                Math.floor(Math.random() * 99999),
                Math.floor(Math.random() * 99999),
                Math.floor(Math.random() * 9999),
                Math.floor(Math.random() * 9999),
                Math.floor(Math.random() * 999),
                Math.floor(Math.random() * 99),
                Math.floor(Math.random() * 99)
            ];
            return responseData;
        };
        VirtualServer.prototype.execute400 = function (param, vsCfg) {
            var responseData = new appvos.ParamVO();
            var templateId = param.intValues[0];
            var itemTemp = shop.getProxy().getTemplateById(templateId);
            var userPoint = 0;
            if (itemTemp) {
                var consume = itemTemp.price;
                userPoint = user.getPlayerInfo().silver + itemTemp.moneyAdd + itemTemp.moneyNum;
                responseData.longValues = [userPoint];
                return responseData;
            }
            return null;
        };
        VirtualServer.prototype.execute401 = function (param, vsCfg) {
            var responseData = new appvos.ParamVO();
            var vipInfo;
            if (user.getProxy().vipInfo.vipId == 0) {
                vipInfo = new appvos.VipVO();
                vipInfo.vipId = 1;
                vipInfo.vipGenerate = new Date().getTime();
                vipInfo.rewardEndTime = vipInfo.vipGenerate + 31 * DateUtils.DAY_TIME;
                vipInfo.vipTemplateId = param.intValues[0];
                responseData.intValues = [1];
                responseData.data = [vipInfo];
            }
            else if (user.getProxy().vipInfo.vipTemplateId != param.intValues[0]) {
                responseData.intValues = [2]; //
                responseData.longValues = [200000]; //一次性补给之前vip的所有奖励
                vipInfo = new appvos.VipVO();
                vipInfo.vipId = 1;
                vipInfo.vipGenerate = new Date().getTime();
                vipInfo.rewardEndTime = vipInfo.vipGenerate + 31 * DateUtils.DAY_TIME;
                vipInfo.vipTemplateId = param.intValues[0];
                responseData.data = [vipInfo];
            }
            else {
                responseData.intValues = [3];
                var endTime = user.getProxy().vipInfo.rewardEndTime;
                endTime += 31 * DateUtils.DAY_TIME;
                responseData.longValues = [endTime];
            }
            return responseData;
        };
        return VirtualServer;
    }(puremvc.SimpleCommand));
    app.VirtualServer = VirtualServer;
    __reflect(VirtualServer.prototype, "app.VirtualServer", ["app.IVirtualServerConfig"]);
})(app || (app = {}));
//# sourceMappingURL=VirtualServer.js.map