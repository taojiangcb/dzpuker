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
    var InfoTipCmd = (function (_super) {
        __extends(InfoTipCmd, _super);
        function InfoTipCmd() {
            return _super.call(this) || this;
        }
        InfoTipCmd.prototype.sendHandler = function (data, action, paramVO) {
            switch (action) {
                case app.NetAction.REQ_GET_USER_LABELS:
                    paramVO.intValues = [0];
                    break;
                case app.NetAction.REQ_ADD_LABEL:
                    paramVO.intValues = [data[0]]; // 字符串
                    paramVO.longValues = [data[2]]; // 字符串
                    paramVO.strValues = [data[1]]; // 字符串
                    break;
            }
            console.log("==infotip==sendHandler - action", action, paramVO.intValues, paramVO.strValues, paramVO.longValues);
        };
        InfoTipCmd.prototype.resultHandler = function (action, paramVO) {
            console.log("==infotip==resultHandler - action", action, paramVO.intValues, paramVO.strValues, paramVO.longValues, paramVO.data);
            var dp = user.getProxy();
            switch (action) {
                case app.NetAction.RESP_GET_USER_LABELS:
                    dp.myTipList = paramVO.data;
                    dp.myTipList.push(null); // 要在最后加上一个null，来提现+号按钮 
                    break;
                case app.NetAction.RESP_ADD_LABEL:
                    var labelvo = new appvos.UserLabelVO(paramVO.data[0]);
                    console.log(labelvo);
                    __SEND_NOTIFICATION(app.constant.AppMediatorConst.INFO_TIP_UPDATE, labelvo);
                    break;
                // case app.NetAction.RESP_DEL_LABEL: //服务器返回删除标签状态
                // 	var tid:number = paramVO.longValues[0];
                // 	this.delCellInTips(tid);
                // break;
                // case app.NetAction.RESP_DO_LABEL: //服务器返回标记标签状态 
                // break;
                case app.NetAction.MTT_RESPMATCHMSG:
                    var flag = paramVO.intValues[0];
                    var matchId = paramVO.intValues[1];
                    var subId = paramVO.intValues[2];
                    var sr = paramVO.intValues[3];
                    var delta = paramVO.intValues[4];
                    var msg = FormatUtils.protoToGBK(paramVO.data[0]);
                    console.log("flag=" + flag + " msg=" + msg);
                    var json = JSON.parse(msg);
                    if (flag == 1) {
                        var matchVO = match.getProxy().getMatch(matchId);
                        if (matchVO == null) {
                            console.log("跑马灯消息:但找不到matchID=" + matchId + "的比赛");
                            return;
                        }
                        var rewardVO = matchVO.rewards[json.rank - 1];
                        if (rewardVO == null || rewardVO.coin == null) {
                            console.log("跑马灯消息:找不到奖励");
                            return;
                        }
                        var str1, str2, rewardStr;
                        //恭喜{0}在{1}中夺冠，奖励彩豆{2}
                        if (rewardVO.coin > 0) {
                            str1 = "彩豆" + FormatUtils.wan(rewardVO.coin);
                        }
                        if (rewardVO.propNum > 0) {
                            //暂不支持其他道具，只能是红包，改的话要重构下道具系统
                            str2 = "现金红包" + rewardVO.propNum + "个";
                        }
                        if (str1 != null && str2 != null) {
                            rewardStr = str1 + ',' + str2;
                        }
                        else if (str1 != null) {
                            rewardStr = str1;
                        }
                        else if (str2 != null) {
                            rewardStr = str2;
                        }
                        var str = gameabc.getMessage("MTT_LIGHT", json.nickname, matchVO.name, rewardStr);
                        tip.popSysRollTopTip(str);
                    }
                    else if (flag == 2) {
                        //恭喜{0}在幸运转轮赛中获得{1}倍奖金，真是太幸运了！
                        var str = gameabc.getMessage("SNG_HIGHWHEEL", json.nickname, json.rate);
                        tip.popSysRollTopTip(str);
                    }
                    return;
            }
        };
        InfoTipCmd.prototype.delCellInTips = function (id) {
            var dp = user.getProxy();
            var list = dp.myTipList;
            for (var i = 0; i < list.length; i++) {
                if (list[i] == null) {
                    continue;
                }
                var tip = list[i];
                if (tip.id == id) {
                    dp.myTipList.splice(i, 1);
                    break;
                }
            }
        };
        return InfoTipCmd;
    }(app.MoudleCommand));
    app.InfoTipCmd = InfoTipCmd;
    __reflect(InfoTipCmd.prototype, "app.InfoTipCmd");
})(app || (app = {}));
//# sourceMappingURL=InfoTipCmd.js.map