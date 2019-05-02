module cy {

    /**
     * @author huangkan
     *  与SRS连接的登录环节命令集，登录过程的连接选择状态在此完成
     */
    export class LoginCommand extends SrsCommand {
        sendHandler(data:any, stream:SrsStreamWriter):void {
            switch (this.action) {
                //发送登录指令：data参数包含了账号与密码(其余状态固定)
                case app.NetAction.CMDT_PLAYERCONNECT:
                    cy.niceSelect = null;                         //清空最佳负载缓存
                    stream.putByte(2)                             //客户端类型
                        .putByte(user.getProxy().loginUserType)   //玩家类型
                        .putInt(cy.srsServer.connectSrs.areaId)   //区域ID
                        .putStr(user.getProxy().loginName);       //用户账号
                    if (user.getProxy().loginUserType == user.LOGIN_TYPE.SESSION) {
                        stream.putHex(user.getProxy().loginPass); //SESSION值
                    } else {
                        stream.putStr(user.getProxy().loginPass); //用户密码
                    }
                    var hdid = user.getProxy().hardwareId;
                    var mobileId = platform.DEVICE_ID;
                    stream.putStr(hdid == null ? "" : hdid)       //老硬件识别码
                        .putInt(AppConst.VERSION_ID)              //游戏版本号
                        .putInt(parseInt(platform.CHANNE_ID))     //渠道号
                        .putInt(mc2sdk.Mc2Sdk.deviceType)         //系统版本号(魔方的客户端类型标识)
                        .putStr(mobileId)                         //有猫腻，新硬件识别码
                        .putInt(AppConst.GAME_ID)                 //发送GAMEID
                    return;

                case app.NetAction.GET_SRS_LOAD:
                    stream.putShort(0);                           //查询组内所有SRS服务器负载情况
                    return;

                case app.NetAction.CMDT_REQPROCESSAPP:
                    stream.putShort(data);
                    return;
            }
        }

        resultHandler(stream:SrsStreamReader):void {
            switch (this.action) {
                case app.NetAction.RE_GET_SRS_LOAD:
                    var len = stream.getUShort();
                    var reFlag = false; //是否超过负载健康值
                    for (var i = 0; i < len; ++i) {
                        var appId = stream.getUShort();
                        var load = stream.getUShort();
                        var srs = cy.searchSrsServer(appId);
                        if (srs != null) {
                            srs.load = load;
                            //如果当前服务器负载已大于健康值(3000),则寻找最佳服务器
                            if (AppConst.CONNECT_SERVER == srs) {
                                console.log("load:curr=" + srs.load);
                                reFlag = load > 3000;
                            }
                        }
                    }

                    //测试逻辑，有概率强制随机更换服务器
                    // if (Math.random()<.5) {
                    //     cy.niceSelect = cy.getSrsIp();
                    //     console.log("test:best="+cy.niceSelect.load+",appid="+cy.niceSelect.appId);
                    //     cy.closeConnection(cy.niceSelect);
                    //     return;
                    // }

                    if (reFlag && cy.searchNiceServer() != srs) {
                        mc2sdk.event(mc2sdk.EVENT_TYPE.SRS_RECONNECT);
                        console.log("load:best=" + cy.niceSelect.load + ",appid=" + cy.niceSelect.appId);
                        cy.closeConnection(cy.niceSelect);
                    } 
                    else {
                        this.sendNotification(app.NetAction.CMDT_PLAYERCONNECT);
                    }
                    return;


                //服务端需要令牌
                case app.NetAction.CMDT_REQEAUTH:
                    var nOfsAppId = stream.getInt();
                    var nSAskId = stream.getInt();
                    var cbEType = stream.getByte();
                    var cbSubEType = stream.getByte();
                    var szNum = stream.getStr();
                    return;


                // 服务端推送一键登录的相关信息过来
                case app.NetAction.CMDT_PTPUSHMSG:
                    var nAskId = stream.getInt();
                    var szMsg = stream.getStr();
                    return;

                //服务端响应登录
                case app.NetAction.CMDT_PLAYERDATA:
                
                    var cbFlag = stream.getByte();                      //错误号
                    var nAreaID = stream.getInt();                      //区号(即brandId)
                    var nNumId = stream.getInt();                       //数字账号
                    var roleId = nAreaID * 4294967296.0 + nNumId;       //合并数字ID
                    var szNickName = stream.getStr();                   //玩家昵称
                    user.getProxy().propertURL = stream.getStr();       //实名认证登记地址
                    
                    console.log('areaId=' + nAreaID);
                    console.log('numId=' + nNumId);
                    console.log('flag=' + cbFlag);

                    if (cbFlag != 0) mc2sdk.event(mc2sdk.EVENT_TYPE.LOGIN_FAIELD, cbFlag);

                    if (cbFlag == 1) {
                        var szMsg = "登录失败 " + szMsg + " [ID:" + cbFlag + "]";
                        
                        //    var szMsg = stream.getStr();                      //错误信息
                        //tip.popSysCenterTip("登录失败 " + szMsg + " [ID:" + cbFlag + "]", tip.TIPS_TYPE.TIPS_WARNING);
                        cy.srsServer.close();
                        this.sendNotification(app.constant.AppMediatorConst.LOGIN_FAILED,szMsg);
                        return;
                    }

                    //边锋平台账号绑定注册茶苑账号
                    else if (cbFlag == 2) {
                        var sdoid:string = user.getProxy().loginName;
                        var AD:String = "0";
                        var registerURL:string = AppConst.BFPT_TO_GAMET_REG_URL;
                        sdoid = "sdoid=" + sdoid;
                        AD = "AD=" + AD;
                        registerURL += sdoid + "&" + AD;

                        // if(egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                        //     utils.NativeUtils.nativeCall(utils.NATIVE_CMD.OPEN_URL,registerURL);
                        // }
                        // else if(egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                        //    window.open(registerURL);
                        // }

                        utils.NativeUtils.openurl(registerURL);
                        cy.srsServer.close();
                        this.sendNotification(app.constant.AppMediatorConst.LOGIN_FAILED);
                        return;
                    }

                    else if (cbFlag != 0) {
                        this.tipError(cbFlag, "登录失败");
                        cy.srsServer.close();
                        this.sendNotification(app.constant.AppMediatorConst.LOGIN_FAILED);
                        return;
                    }

                    if (stream.getAvailable() >= 16) {
                        var sessionID = stream.getHex(16);
                    }

                    user.getProxy().svrRoleId = roleId;
                    user.getProxy().svrName = szNickName;
                    if (user.getProxy().svrSession == null) {
                        user.getProxy().svrSession = sessionID;
                    }

                    // 查询比赛列表服的数量，选一个连接(负载均衡用)
                    // if (AppConst.CONNECT_SERVER.roomType == room.CONFIG.INTERNAL) {
                        // match.getProxy().sngListAppId = 258;
                        // match.getProxy().mttListAppId = 2258;
                    // } else {
                        // this.sendNotification(app.NetAction.CMDT_REQPROCESSAPP, 11);//更新SNG列表服的appid
                        // this.sendNotification(app.NetAction.CMDT_REQPROCESSAPP, 72);//更新MTT列表服的appid
                    // }

                    // console.log("svrSession: " + user.getProxy().svrSession);
                    //发送23号指令，获取玩家数据
                    this.sendNotification(app.NetAction.CMDT_REQPLAYERPLUSDATA);
                    return;

                //接受24号指令(23号回复)，保存玩家数据
                case app.NetAction.CMDT_RESPPLAYERPLUSDATA:

                    user.getProxy().svrUserInfoBytesCache = stream.stream;
                    var playerPlusData:user.ReqPlayerPlusData = user.getProxy().reqPlayerPlusData;
                    playerPlusData.userid = stream.getStr();
                    playerPlusData.ptid = stream.getStr();
                    playerPlusData.ptnumid = stream.getStr();
                    playerPlusData.nickname = stream.getStr();
                    playerPlusData.identity = stream.getStr();
                    playerPlusData.sex = stream.getByte();
                    playerPlusData.head = stream.getInt();
                    playerPlusData.right = stream.getInt();
                    console.log("right="+playerPlusData.right);
                    playerPlusData.regtime = stream.getUInt();
                    playerPlusData.vipid = stream.getInt();
                    playerPlusData.vipendtime = stream.getUInt();
                    playerPlusData.ip = stream.getInt();
                    playerPlusData.osver = stream.getInt();
                    playerPlusData.clienttype = stream.getInt();
                    //playerPlusData.keylen = stream.getByte();
                    playerPlusData.key = stream.getStr();
                    playerPlusData.elimited = stream.getInt();
                    playerPlusData.eprotected = stream.getInt();
                    playerPlusData.protectedurl = stream.getStr();

                    //*************获取用户信息**********************
                    AppGlobal.isLoginFlag = false;
                    // guichu.loginLogiC().loginSucceedFlag = false;
                    this.sendNotification(app.NetAction.SET_PLAY_INFO, [user.getProxy().svrRoleId]);
                    //********如果5秒自定义模块没有返回信息就强行进入登录**********
                    this.sendNotification(app.constant.AppMediatorConst.FORCE_LOGIN);
                    return;

                case app.NetAction.CMDT_RESPPROCESSAPP:
                    var count = stream.getUShort();
                    var processId = stream.getUShort();
                    var appIds = [];
                    var logStr = "processId:"+processId+" has appId:";
                    for (var i = 0; i < count; ++i) {
                        appIds[i] = stream.getInt();
                        logStr += " " + appIds[i];
                    }
                    console.log(logStr);
                    if (processId == 72 || processId == 11) {
                        var r = Math.floor(Math.random() * count);
                        // match.getProxy().sngListAppId = appIds[r];
                    }
                    return;

            }
        }
    }
}
