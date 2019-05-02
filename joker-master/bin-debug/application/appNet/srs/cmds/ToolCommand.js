var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var cy;
(function (cy) {
    /**
     * @author huangkan
     *  与SRS连接的登录环节命令集，登录过程的连接选择状态在此完成
     */
    var ToolCommand = (function (_super) {
        __extends(ToolCommand, _super);
        function ToolCommand() {
            return _super.apply(this, arguments) || this;
        }
        ToolCommand.prototype.sendHandler = function (data, stream) {
            this.sendPackage.sProcessID = 62;
            this.sendPackage.nAppID = 0;
            switch (this.action) {
                // 请求查询银子 
                case app.NetAction.TOOL_RILVER:
                    // var numId = data==null ?
                    //     user.getProxy().svrNumId : data&0xffffffff;
                    var numId = user.getProxy().svrNumId;
                    stream.putInt(data != null ? data : 0);
                    stream.putInt(numId);
                    stream.putInt(data != null ? data : AppConst.GAME_ID);
                    stream.putInt(user.getProxy().svrAreaId);
                    return;
                //请求查询房间的在线人数
                case app.NetAction.TOOL_NUMPLAYERS:
                    stream.putInt(user.getProxy().svrAreaId);
                    var len = data.length;
                    stream.putInt(len);
                    for (var i = 0; i < len; ++i) {
                        stream.putInt(data[i]);
                    }
                    return;
                case app.NetAction.TOOL_TEMP_SESSION:
                    stream.putInt(0);
                    stream.putInt(user.getProxy().svrAreaId);
                    stream.putInt(user.getProxy().svrNumId);
                    stream.putInt(0); //source
                    stream.putHex(user.getProxy().svrSession);
                    stream.putStr(user.getProxy().svrName);
                    if (data instanceof Function) {
                        utils.TempSessionUtils.receiver_call.push(data);
                    }
                    console.log("svrSession: " + user.getProxy().svrSession);
                    return;
                case app.NetAction.GET_PROP_ATTRS:
                    stream.putInt(0).putInt(AppConst.GAME_ID);
                    return;
                //四个参数分别为：道具、数量、参数、priceId
                case app.NetAction.USE_EPROPS:
                    stream.putInt(user.getProxy().svrAreaId);
                    stream.putInt(user.getProxy().svrNumId);
                    stream.putInt(data[0]);
                    stream.putInt(data[1]);
                    stream.putStr(data[2] == null ? "" : data[2]);
                    stream.putInt(data[3]);
                    stream.putInt(0);
                    return;
                case app.NetAction.REQ_PLAYERPLACE:
                    stream.putInt(0).putInt(user.getProxy().svrAreaId).putInt(user.getProxy().svrNumId);
                    return;
                case app.NetAction.REQ_FILEVER:
                    return;
                case app.NetAction.REQ_FILE:
                    stream.putInt(0).putInt(0).putInt(user.getProxy().svrAreaId).putInt(0).putShort(0);
                    return;
            }
        };
        ToolCommand.prototype.resultHandler = function (stream) {
            switch (this.action) {
                //返回请求查询银子
                case app.NetAction.RE_TOOL_RILVER:
                    var askid = stream.getInt();
                    var flag = stream.getByte();
                    if (flag == 0) {
                        var data = stream.getSuruct(cyvos.PlayerGameData);
                        if (askid == AppConst.GAME_ID_FREE) {
                            if (data.roleId == user.getProxy().svrRoleId) {
                                user.getProxy().freeGold = data.silver;
                                //刷新金币显示
                                this.sendNotification(mission.MissionMediator.UPDATE_GOLD_TREE);
                            }
                            this.sendNotification(app.constant.AppMediatorConst.UPDATE_FREE_GOLD);
                        }
                        else {
                            if (data.roleId == user.getProxy().svrRoleId) {
                                user.getProxy().svrGameData = data;
                            }
                            user.getProxy().svrPlayerGameDataDepot[data.roleId] = data;
                            this.sendNotification(app.constant.AppMediatorConst.UPDATE_COIN);
                        }
                    }
                    else {
                        mc2sdk.event(54005 /* RILVER_FAILED */, flag);
                        cy.log("获取自己的游戏数据失败 flag=" + flag, 32 /* UNDEFINE */);
                    }
                    return;
                //返回请求查询房间的在线人数
                case app.NetAction.RE_TOOL_NUMPLAYERS:
                    var flag = stream.getByte();
                    if (flag == 0) {
                        var len = stream.getInt();
                        for (var i = 0; i < len; ++i) {
                            var roomId = stream.getInt();
                            var numPlayers = stream.getInt();
                            var roomVO = room.getProxy().getRoomVOByRoomId(roomId);
                            if (roomVO != null) {
                                roomVO.online = numPlayers;
                            }
                            var roomVO = room.getProxy().getRoomVOByRoomId(roomId, true);
                            if (roomVO != null) {
                                roomVO.online = numPlayers;
                            }
                            __SEND_NOTIFICATION(app.constant.AppMediatorConst.PLAYER_NUMBER_UPDATE);
                        }
                        if (user.getProxy().drivingNumPlayers) {
                            tip.popSysCenterTip("刷新成功", tip.TIPS_TYPE.TIPS_CORRECT);
                        }
                    }
                    else {
                        cy.log("获取房间人数失败", 32 /* UNDEFINE */);
                        tip.popSysCenterTip("获取房间人数失败", tip.TIPS_TYPE.TIPS_WARNING);
                    }
                    user.getProxy().drivingNumPlayers = false;
                    return;
                case app.NetAction.RE_TOOL_TEMP_SESSION:
                    var askid = stream.getInt();
                    var flag = stream.getByte();
                    if (flag == 0) {
                        user.getProxy().svrTmpSession = stream.getHex(16);
                        // 服务端的逻辑是如下，和gethex后用format结果相同
                        // console.log("F->"+user.getProxy().formatSvrTmpSession);
                        // var d1 = stream.getUInt(-16);
                        // var d2 = stream.getUShort();
                        // var d3 = stream.getUShort();
                        // var d4s = stream.getHex(2);
                        // var d5s = stream.getHex(6);
                        // var s = 
                        // d1.toString(16).toUpperCase()+'-'+
                        // d2.toString(16).toUpperCase()+'-'+
                        // d3.toString(16)+'-'+
                        // d4s.toUpperCase()+'-'+
                        // d5s.toUpperCase();
                        // console.log("S->"+s);
                        var source = stream.getInt(); //不知道啥用~
                        /**
                         * 拿到templateSession之后回调所需要的处理过程
                         */
                        utils.TempSessionUtils.receiver_call.forEach(function (element) {
                            element();
                        });
                        utils.TempSessionUtils.receiver_call = [];
                    }
                    else {
                        if (flag == 72) {
                            console.log("账号在其他设备登陆，请先注销其他设备账号登陆" + flag);
                            tip.popSysCenterTip("账号在其他设备登陆，请先注销其他设备账号登陆", tip.TIPS_TYPE.TIPS_WARNING);
                        }
                        else if (flag == 74) {
                            console.log("账号过期请重登" + flag);
                            tip.popSysCenterTip("账号过期请重登", tip.TIPS_TYPE.TIPS_WARNING);
                        }
                        else {
                            console.log("获取Session失败" + flag);
                            tip.popSysCenterTip("获取Session失败" + flag, tip.TIPS_TYPE.TIPS_WARNING);
                            __CLOSE_MOUDLE(AppReg.APP_BANK);
                        }
                    }
                    return;
                case app.NetAction.RE_GET_PROP_ATTRS:
                    var flag = stream.getByte();
                    var askId = stream.getInt();
                    if (flag == 0) {
                        item.getProxy().clearAllData();
                        var yb = stream.getInt();
                        var charm = stream.getInt();
                        var contribution = stream.getInt();
                        var attSize = stream.getByte();
                        var propArr = [];
                        for (var i = 0; i < attSize; ++i) {
                            var attId = stream.getInt();
                        }
                        var propsSize = stream.getByte();
                        for (var i = 0; i < propsSize; ++i) {
                            var propsId = stream.getInt();
                            var propsCount = stream.getInt();
                            propArr[i] = item.getProxy().updatePropData(propsId, propsCount);
                        }
                        var timeSize = stream.getByte();
                        for (var i = 0; i < timeSize; ++i) {
                            var timepropsId = stream.getInt();
                            var time = stream.getUInt();
                        }
                        for (var i = 0; i < propsSize; ++i) {
                            var TimeEnd = stream.getUInt();
                            if (propArr[i] != null) {
                                propArr[i].timeEnd = TimeEnd;
                            }
                        }
                    }
                    return;
                case app.NetAction.RE_USE_EPROPS:
                    var flag = stream.getByte();
                    var areaId = stream.getInt();
                    var numId = stream.getInt();
                    var propsId = stream.getInt();
                    var count = stream.getInt();
                    var useYb = stream.getInt();
                    var param = stream.getStr();
                    var toNumId = stream.getInt();
                    var toAreaId = stream.getInt();
                    var askId = stream.getInt();
                    return;
                case app.NetAction.RESP_PLAYERPLACE:
                    user.getProxy().places = [];
                    var count = stream.getByte(4);
                    for (var i = 0; i < count; ++i) {
                        var place = stream.getSuruct(cyvos.PlayerPlace);
                        user.getProxy().places[i] = place;
                    }
                    return;
                case app.NetAction.RESP_FILEVER:
                    return;
                case app.NetAction.RESP_FILE:
                    var askid = stream.getInt();
                    var flag = stream.getByte();
                    var fileName = stream.getStr(); //文件名
                    var totalPak = stream.getShort(); //总包数
                    var currPak = stream.getShort(); //当前包数
                    var pakLength = stream.getShort(); //包长度
                    var pak = stream.getHex(pakLength); //包内容
                    //room.getProxy().updateRoomVOFromSvr(xmlStr);
                    return;
                case app.NetAction.MSGBOX:
                case app.NetAction.POPUP_MSGBOX:
                    var msgbox = stream.getSuruct(cyvos.MsgBox);
                    console.log(msgbox.szCaption);
                    console.log(msgbox.szText);
                    return;
            }
        };
        return ToolCommand;
    }(cy.SrsCommand));
    cy.ToolCommand = ToolCommand;
    __reflect(ToolCommand.prototype, "cy.ToolCommand");
})(cy || (cy = {}));
//# sourceMappingURL=ToolCommand.js.map