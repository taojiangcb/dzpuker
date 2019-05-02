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
    var MatchVirtualCommands = (function (_super) {
        __extends(MatchVirtualCommands, _super);
        function MatchVirtualCommands() {
            return _super.apply(this, arguments) || this;
        }
        MatchVirtualCommands.prototype.execute = function (notification) {
            var process_action = notification.getName().split(app.NetAction.PROCESS_CUT);
            var action = '', process = '', pocsact = '';
            if (process_action.length == 1) {
                action = process_action[0];
            }
            else if (process_action.length == 2) {
                process = process_action[0];
                action = process_action[1];
                pocsact = process + app.NetAction.PROCESS_CUT + action;
            }
            var body = notification.getBody();
            console.log('match virtual command... pocsact:' + pocsact);
            var nConst = app.NetAction;
            var matchProxy = match.getProxy();
            switch (pocsact) {
                case nConst.MTT_REQJOIN:
                    this.sendNotification(app.NetAction.REQGETMATCHLIST); //获取当前可参与的比赛列表
                    return;
                case nConst.REQGETMATCHLIST:
                    var len = matchProxy.mttList.length;
                    //随机产生所有的SUBID，只是为了有值，没啥用
                    for (var i = 0; i < len; ++i) {
                        matchProxy.mttList[i].subId = Math.floor(Math.random() * 999999);
                    }
                    //设定第一场 已报名 已开赛
                    matchProxy.mttList[0].isSigned = true;
                    matchProxy.mttList[0].startTime = match.getSvrTime();
                    //设定第二场 已报名 未开赛 2分钟后开赛
                    matchProxy.mttList[1].isSigned = true;
                    matchProxy.mttList[1].startTime = match.getSvrTime() + 75000;
                    //设定第三场 未报名 未开赛 2小时10秒后开赛
                    matchProxy.mttList[2].isSigned = true;
                    matchProxy.mttList[2].startTime = match.getSvrTime() + 120 * 60000 + 10000;
                    //设定第四场 未报名 未开赛 1小时10秒后开赛
                    var i = matchProxy.mttList.length - 1;
                    matchProxy.mttList[i].isSigned = false;
                    matchProxy.mttList[i].startTime = match.getSvrTime() + 60 * 60000 + 10000;
                    matchProxy.mttList[i].isPhoneBind = true;
                    matchProxy.setMttRemind(matchProxy.mttList[0]);
                    matchProxy.setMttRemind(matchProxy.mttList[1]);
                    matchProxy.setMttRemind(matchProxy.mttList[2]);
                    return;
            }
        };
        return MatchVirtualCommands;
    }(puremvc.SimpleCommand));
    app.MatchVirtualCommands = MatchVirtualCommands;
    __reflect(MatchVirtualCommands.prototype, "app.MatchVirtualCommands");
})(app || (app = {}));
//# sourceMappingURL=MatchVirtualCommands.js.map