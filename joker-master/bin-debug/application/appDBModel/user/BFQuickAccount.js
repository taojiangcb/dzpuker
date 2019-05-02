var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JiangTao on 2016/5/3.
 */
var user;
(function (user) {
    /**
     * 用户快速注册和快登录
     */
    var BFQuickAccount = (function () {
        function BFQuickAccount() {
            //本地测试
            // private createCodeUrl:string = "http://thirdauth.gametea.local/newmobile/createcode";
            // private createAccountUrl:string = "http://thirdauth.gametea.local/newmobile/createaccount";
            this.createCodeUrl = "https://thirdauth.gametea.com/newmobile/createcode";
            this.createAccountUrl = "https://thirdauth.gametea.com/newmobile/createaccount";
            this.requestUrl = "";
            this.generateCode = "";
        }
        /**
         * 用户快速注册和快速登录
         */
        BFQuickAccount.prototype.generateAccount = function () {
            var quickAccount = this.getQuickAccount();
            if (quickAccount != null && quickAccount != "") {
                //从本地读取账号登录游戏
                this.quick_userid = quickAccount;
                this.quick_pwd = gameabc.LocalSO.getItem(BFQuickAccount.QUICK_PWD);
                this.quick_ptid = gameabc.LocalSO.getItem(BFQuickAccount.QUICK_PTID);
                //发起登录，用户名和密码
                user.getProxy().loginName = this.quick_userid;
                user.getProxy().loginPass = this.quick_pwd;
                user.getProxy().loginUserType = 0 /* GAMETEA */;
                cy.connectSrsServer(AppConst.CONNECT_SERVER);
            }
            else {
                __OPEN_PRELOAD();
                //开始注册
                this.createCode();
            }
        };
        /**
         * 获取code
         */
        BFQuickAccount.prototype.createCode = function () {
            this.requestUrl = this.createCodeUrl;
            var sendData = {
                ip: "",
                mac: gameabc.UUID.generateH5UUID()
            };
            console.log("ip:" + sendData.ip + "mac:" + gameabc.UUID.generateH5UUID());
            var jsonData = JSON.stringify(sendData);
            var dataM = cy.doXorEncrypt(jsonData, cy.getkey1());
            if (this.httpRequest) {
                this.httpRequest.abort();
                this.removeListener(this.httpRequest);
            }
            this.httpRequest = new egret.HttpRequest();
            this.httpRequest.responseType = egret.HttpResponseType.TEXT;
            this.httpListener(this.httpRequest);
            this.httpRequest.open(this.requestUrl, egret.HttpMethod.POST);
            this.httpRequest.send(dataM);
        };
        /**
         * 注册账号
         */
        BFQuickAccount.prototype.createAccount = function () {
            //             appType = 1 安卓 2 ios ， 11 其他
            //             channelid = 渠道id
            //             clientType = 12 web， 14 移动
            //             web 的时候 appType 传11 好了
            var clientType = egret.Capabilities.runtimeType == egret.RuntimeType.WEB ? 12 : 14;
            var appType = 11;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                appType = egret.Capabilities.os == egret.os.OSType.Android ? 1 : 2;
            }
            var channelid = Number(platform.CHANNE_ID);
            var gameId = platform.CHANNE_ID == platform.CHANNE_IDS.DEBUG.toString() ? 5028 : 417;
            this.requestUrl = this.createAccountUrl;
            var data = {
                mac: gameabc.UUID.generateH5UUID(),
                code: this.generateCode,
                gameid: gameId,
                appType: appType,
                channelid: channelid,
                clientType: clientType
            };
            var jsonData = JSON.stringify(data);
            var dataM = cy.doXorEncrypt(jsonData, cy.getkey1());
            console.log("send json:" + jsonData);
            console.log("send dataM:" + dataM);
            if (this.httpRequest) {
                this.httpRequest.abort();
                this.removeListener(this.httpRequest);
            }
            console.log("requestUrl " + this.requestUrl);
            this.httpRequest = new egret.HttpRequest();
            this.httpListener(this.httpRequest);
            this.httpRequest.responseType = egret.HttpResponseType.TEXT;
            this.httpRequest.open(this.requestUrl, egret.HttpMethod.POST);
            this.httpRequest.send(dataM);
        };
        /**
         * 获取已有的快速注册账号
         * @returns {string}
         */
        BFQuickAccount.prototype.getQuickAccount = function () {
            return gameabc.LocalSO.getItem(BFQuickAccount.QUICK_USERID);
        };
        BFQuickAccount.prototype.httpListener = function (request) {
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        BFQuickAccount.prototype.onGetComplete = function (event) {
            var response_data = "";
            var error_msg;
            var error_id = 0;
            if (this.requestUrl == this.createCodeUrl) {
                response_data = JSON.parse(this.httpRequest.response).data;
                var decrypt = cy.doXorDecrypt(response_data, cy.getkey2());
                var jsondata = JSON.parse(decrypt);
                if (jsondata != null) {
                    if (jsondata.error_code == 0) {
                        this.generateCode = jsondata.code;
                        //生成快速注册账号
                        __OPEN_PRELOAD();
                        this.createAccount();
                    }
                    else {
                        error_id = jsondata.error_code;
                        error_msg = jsondata.Msg;
                        tip.popSysCenterTip(error_msg, tip.TIPS_TYPE.TIPS_WARNING);
                        console.log("oncreateCode: " + decrypt);
                        console.log(error_msg);
                        __CLOSE_PRELOAD();
                    }
                }
            }
            else if (this.requestUrl == this.createAccountUrl) {
                response_data = JSON.parse(this.httpRequest.response).data;
                var decrypt = cy.doXorDecrypt(response_data, cy.getkey2());
                var jsondata = JSON.parse(decrypt);
                console.log("recv jsonData : " + jsondata);
                if (jsondata != null) {
                    if (jsondata.error_code == 0) {
                        this.quick_userid = jsondata.userid;
                        this.quick_pwd = jsondata.pwd;
                        this.quick_ptid = jsondata.ptid;
                        gameabc.LocalSO.setItem(BFQuickAccount.QUICK_USERID, this.quick_userid);
                        gameabc.LocalSO.setItem(BFQuickAccount.QUICK_PTID, this.quick_ptid);
                        gameabc.LocalSO.setItem(BFQuickAccount.QUICK_PWD, this.quick_pwd);
                        //发起登录，用户名和密码
                        user.getProxy().loginName = this.quick_userid;
                        user.getProxy().loginPass = this.quick_pwd;
                        user.getProxy().loginUserType = 0 /* GAMETEA */;
                        cy.connectSrsServer(AppConst.CONNECT_SERVER);
                    }
                    else {
                        error_id = jsondata.error_code;
                        error_msg = gameabc.getMessage("QUICK_GRENERATE_ERROR", error_id);
                        //                        tip.popSysCenterTip("oncreateAccount: " + decrypt);
                        tip.popSysCenterTip(error_msg, tip.TIPS_TYPE.TIPS_WARNING);
                        __CLOSE_PRELOAD();
                    }
                }
            }
        };
        BFQuickAccount.prototype.onGetIOError = function (event) {
            alert(event.type);
            console.log("post error");
            __CLOSE_PRELOAD();
        };
        BFQuickAccount.prototype.onGetProgress = function (event) {
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
            //tip.popSysCenterTip("post progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        };
        BFQuickAccount.prototype.removeListener = function (request) {
            request.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        };
        return BFQuickAccount;
    }());
    BFQuickAccount.QUICK_USERID = "QUICK_USERID";
    BFQuickAccount.QUICK_PWD = "QUICK_PWD";
    BFQuickAccount.QUICK_PTID = "QUICK_PTID";
    user.BFQuickAccount = BFQuickAccount;
    __reflect(BFQuickAccount.prototype, "user.BFQuickAccount");
})(user || (user = {}));
//# sourceMappingURL=BFQuickAccount.js.map